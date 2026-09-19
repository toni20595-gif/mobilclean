# Les trois outils de l'agent

L'agent vocal ne touche à rien directement : il appelle ces trois outils, qui pointent tous vers **la même URL** — celle du script `google-apps-script/agent-telephonique.gs` déployé en application web.

```
URL      : https://script.google.com/macros/s/……/exec?token=TON-JETON
Méthode  : POST
En-tête  : Content-Type: application/json
```

> **Le jeton voyage dans l'URL**, collé au bout de l'adresse. Ce n'est pas un choix
> de confort : une application web Apps Script ne reçoit **pas** les en-têtes HTTP
> personnalisés, donc l'authentification par en-tête est techniquement impossible.
> Le jeton n'est jamais un paramètre rempli par l'IA — sinon le modèle finirait par
> l'inventer, et l'appel serait rejeté.

> **Suivi de redirection** : une application web Google répond par une redirection 302
> vers `googleusercontent.com`. La plupart des plateformes la suivent d'elles-mêmes. Si
> un outil renvoie une réponse vide, cherche l'option « follow redirects » et active-la.

### Deux dialectes, un seul script

Vapi n'envoie pas le JSON simple montré plus bas : il enveloppe l'appel dans son
propre format (`message.toolCallList`) et attend une réponse à lui (`results[]`).
**Le script reconnaît les deux et répond dans le même dialecte que la question.**

Conséquence pratique : sur Vapi, tu déclares seulement le **nom**, la **description**
et les **paramètres** de chaque outil, plus l'URL du serveur. Vapi fabrique le corps
tout seul. Les blocs « Corps envoyé » ci-dessous décrivent le format simple — ils
servent pour les tests en ligne de commande et pour les autres plateformes.

---

## 1. `consulter_disponibilites`

**Description à donner au modèle** (c'est ce texte qui décide *quand* l'outil est appelé — il compte autant que le code) :

> Donne la liste des créneaux réellement libres dans l'agenda de Mobil Clean pour les 14 prochains jours. À appeler dès que la conversation arrive sur la prise de rendez-vous, et uniquement après avoir identifié la prestation et la commune. N'annonce jamais un créneau sans avoir appelé cet outil.

**Paramètres** : aucun.

**Corps envoyé**
```json
{ "token": "TON-JETON", "action": "dispos" }
```

**Réponse**
```json
{
  "ok": true,
  "nombre": 23,
  "creneaux": [
    { "date": "2026-09-22", "heure": "09:30", "dit": "lundi 22 septembre à 9 h 30" },
    { "date": "2026-09-22", "heure": "13:00", "dit": "lundi 22 septembre à 13 heures" }
  ]
}
```

Le champ **`dit`** est à lire tel quel à voix haute. Les champs `date` et `heure` servent uniquement à la réservation ; ils ne se prononcent jamais.

---

## 2. `reserver_rendez_vous`

**Description à donner au modèle** :

> Pose définitivement le rendez-vous dans l'agenda de Mobil Clean. À n'appeler qu'une fois que tu as le nom, l'adresse complète, le téléphone, la prestation et le créneau choisi par le client. Après un appel réussi, le créneau est bloqué et Antoine est prévenu par e-mail.

**Paramètres**

| Paramètre | Type | Obligatoire | Ce que le modèle doit y mettre |
|---|---|---|---|
| `date` | string | oui | Date du créneau au format `AAAA-MM-JJ`, reprise telle quelle du créneau choisi |
| `heure` | string | oui | `09:30`, `13:00` ou `16:30` — reprise telle quelle |
| `nom` | string | oui | Prénom et nom du client |
| `telephone` | string | oui | Numéro de rappel du client |
| `adresse` | string | oui | Numéro et rue, plus l'étage ou le code d'accès s'il y en a un |
| `ville` | string | non | Commune |
| `prestation` | string | oui | Court : « Intérieur voiture — Diamant », « Canapé 3 places tissu », « 2 matelas »… |
| `estimation` | string | non | Le prix annoncé au client, ex. « à partir de 79 euros » |
| `notes` | string | non | Animaux, allergies, enfants en bas âge, pas de prise électrique, stationnement difficile… |

**Corps envoyé**
```json
{
  "token": "TON-JETON",
  "action": "reserver",
  "date": "2026-09-22",
  "heure": "13:00",
  "nom": "Marie Dupont",
  "telephone": "06 12 34 56 78",
  "adresse": "12 rue du Sauvage, 3e étage",
  "ville": "Mulhouse",
  "prestation": "Canapé 3 places tissu",
  "estimation": "à partir de 79 euros",
  "notes": "Un chat, éviter les produits parfumés"
}
```

**Réponses possibles**

| Réponse | Ce que l'agent doit faire |
|---|---|
| `{ "ok": true, "dit": "lundi 22 septembre à 13 heures", "fin": "15 h 30" }` | Récapituler et confirmer |
| `{ "ok": false, "raison": "creneau_pris", "creneaux": [...] }` | Proposer deux des alternatives renvoyées |
| `{ "ok": false, "raison": "trop_proche" }` | Le créneau est à moins de 12 h — en proposer un autre |
| `{ "ok": false, "raison": "champs_manquants", "champs": ["adresse"] }` | Redemander l'information nommée |
| `{ "ok": false, "raison": "erreur_technique" }` | Basculer sur `demander_rappel`, sans mentionner de panne |

---

## 3. `demander_rappel`

**Description à donner au modèle** :

> Enregistre une demande de rappel et prévient Antoine par e-mail. À utiliser quand tu ne peux pas conclure toi-même : commune hors zone, devis entreprise ou flotte de véhicules, chiffrage multi-meubles, nettoyage de pierres tombales, réclamation, ou question dont tu n'as pas la réponse. Ne termine jamais un appel sans avoir posé un rendez-vous ou appelé cet outil.

**Paramètres**

| Paramètre | Type | Obligatoire | Ce que le modèle doit y mettre |
|---|---|---|---|
| `nom` | string | oui | Prénom et nom, ou raison sociale |
| `telephone` | string | oui | Numéro de rappel |
| `sujet` | string | oui | En trois mots : « hors zone », « devis flotte », « réclamation », « multi-meubles »… |
| `notes` | string | non | Tout ce que le client a expliqué et qui fera gagner du temps à Antoine |

**Corps envoyé**
```json
{
  "token": "TON-JETON",
  "action": "rappel",
  "nom": "Garage Martin",
  "telephone": "03 89 00 00 00",
  "sujet": "devis flotte",
  "notes": "6 véhicules de société, souhaite un contrat trimestriel"
}
```

**Réponse** : `{ "ok": true }`

---

## Vérifier les trois outils sans passer par le téléphone

Une fois le script déployé, colle l'URL et le jeton ci-dessous, puis lance la commande dans un terminal. Si la réponse est du JSON avec `"ok":true`, la plomberie est bonne.

```bash
curl -L "https://script.google.com/macros/s/TON-ID/exec?token=TON-JETON" -H "Content-Type: application/json" -d '{"action":"dispos"}'
```

Deux pièges qui font croire à une panne alors que tout va bien :

- **`-L` est obligatoire.** Google répond par une redirection vers `googleusercontent.com`, où se trouve le vrai contenu. Sans `-L`, la réponse paraît vide.
- **Ne mets JAMAIS `-X POST`.** `-d` suffit à faire un POST. Avec `-X POST`, curl force la méthode *y compris sur la redirection* : Google reçoit alors un POST sans corps et répond `Error 411` ou une page HTML. Le script n'y est pour rien.

Pour vérifier que le dialecte Vapi passe aussi :

```bash
curl -L "https://script.google.com/macros/s/TON-ID/exec?token=TON-JETON" -H "Content-Type: application/json" -d '{"message":{"type":"tool-calls","toolCallList":[{"id":"test1","name":"consulter_disponibilites","arguments":{}}]}}'
```

La réponse doit commencer par `{"results":[{"toolCallId":"test1"`.

## Action de maintenance : `menage`

Hors agent. Supprime tous les rendez-vous des 60 prochains jours dont le titre contient `TEST`, et rien d'autre. Sert à nettoyer après une campagne d'essais.

```bash
curl -L "https://script.google.com/macros/s/TON-ID/exec?token=TON-JETON" -H "Content-Type: application/json" -d '{"action":"menage"}'
```

Elle n'est volontairement pas déclarée dans la table des outils : **l'agent vocal ne peut pas l'appeler.**
