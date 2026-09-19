# Monter l'agent téléphonique Mobil Clean

Objectif : quand tu es en intervention et que tu ne décroches pas, l'appel part vers un agent vocal qui connaît l'entreprise, répond aux questions et **pose le rendez-vous directement dans ton agenda Google**.

---

## Le principe à comprendre avant de commencer

**Tu gardes ton 07 68 44 52 93.** On ne change rien à ton numéro, rien sur tes cartes de visite, rien sur le site.

On active un **renvoi conditionnel** : si tu ne décroches pas au bout de 20 secondes, l'opérateur bascule l'appel vers un second numéro, celui de l'agent. Tu décroches quand tu peux ; l'agent ne récupère que ce que tu laisses passer.

```
Client appelle le 07 68 44 52 93
        │
        ├── tu décroches ────────────────► c'est toi, rien ne change
        │
        └── 20 s sans réponse, ou occupé
                  │
                  ▼
            Agent vocal IA
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
   RDV dans ton         Mail « rappel
   agenda Google         à faire »
```

Conséquence directe : **tu ne paies qu'à la minute réellement consommée**, sur les appels que tu aurais de toute façon perdus.

---

## Ce qu'il te faut

| | Quoi | Combien |
|---|---|---|
| 1 | Un compte sur une plateforme d'agent vocal | à la minute, voir plus bas |
| 2 | Un numéro de téléphone français dédié | ~1 à 5 € / mois |
| 3 | Le script Google déjà écrit | gratuit |
| 4 | Ton agenda `mobilclean68@gmail.com` | déjà en place |

---

## Quelle plateforme

**Recommandé : Vapi, avec une voix ElevenLabs en français.**

Vapi fait l'orchestration (écoute, réflexion, outils) et on lui branche ElevenLabs pour la voix. C'est le meilleur compromis : la qualité de voix qui évite qu'un client raccroche au bout de trois secondes, sans payer l'abonnement haut de gamme d'ElevenLabs.

Les alternatives, si Vapi ne te plaît pas :

| Plateforme | Ordre de prix | Pour qui |
|---|---|---|
| **Vapi** (+ voix ElevenLabs) | ~0,10 à 0,25 € / min tout compris | le bon compromis, tout ce qui est écrit ici s'y colle directement |
| **Retell AI** | à partir de ~0,07 $ / min + téléphonie | très bonne latence, même logique d'outils |
| **ElevenLabs Agents** | ~0,07 à 0,30 € / min selon le forfait | la plus belle voix française, plus cher sur les petits forfaits |
| **SaaS français clé en main** | 49 à 300 € / mois | zéro configuration, mais tu ne maîtrises plus le prompt |

**Ce que ça coûte pour toi, concrètement.** Compte des appels de 2 à 4 minutes. À 150 appels manqués par mois, soit environ 450 minutes : **45 à 100 € par mois**. Un seul canapé récupéré dans le mois (79 €) couvre déjà presque la facture — c'est le bon repère pour juger.

> Les tarifs de ces plateformes bougent vite. Vérifie la grille du jour avant de t'engager,
> et commence en paiement à l'usage plutôt qu'en abonnement annuel.

---

## Étape 1 — Le script qui touche à ton agenda

1. Va sur [script.google.com](https://script.google.com), connecté avec **mobilclean68@gmail.com**, et crée un nouveau projet.
2. Colle l'intégralité de `google-apps-script/agent-telephonique.gs`.
3. **Paramètres du projet → Fuseau horaire → (GMT+01:00) Europe/Paris.** Cette case oubliée décale tous les rendez-vous d'une heure.
4. En haut du fichier, remplace `JETON` par une trentaine de caractères au hasard, lettres et chiffres. C'est le mot de passe de ton agenda : garde-le de côté, tu en auras besoin à l'étape 3.
5. Sélectionne la fonction `testerDispos`, clique **Exécuter**, autorise l'accès. Le journal doit afficher une liste de créneaux.
6. **Déployer → Nouveau déploiement → Application Web**
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
7. Copie l'URL qui finit par `/exec`. Garde-la, c'est le point d'entrée de l'agent.

Pour vérifier que tout répond, colle l'URL et ton jeton dans cette commande :

```bash
curl -L -X POST "https://script.google.com/macros/s/TON-ID/exec" -H "Content-Type: application/json" -d '{"token":"TON-JETON","action":"dispos"}'
```

Tu dois voir du texte commençant par `{"ok":true`. Si c'est vide, c'est le `-L` qui manque.

---

## Étape 2 — L'agent et sa voix

Sur la plateforme choisie, crée un agent, puis :

- **Prompt système** → colle tout `agent-telephonique/prompt-systeme.md`.
- **Variables dynamiques** → déclare `date_du_jour` et `numero_appelant`. Sans la date, l'agent ne sait pas ce que « demain » veut dire ; la plupart des plateformes proposent ces deux variables toutes faites.
- **Première phrase** → `Mobil Clean, bonjour ! Qu'est-ce que je peux faire pour vous ?`
- **Langue** → français. Vérifie que la reconnaissance vocale est bien réglée sur le français, pas sur « auto ».
- **Voix** → prends une voix française et **écoute-la lire une phrase avec un prix et une date** avant de valider. C'est là que les voix médiocres se trahissent.
- **Durée maximale d'appel** → 8 minutes. Un appel qui s'éternise est un appel qui a déraillé.
- **Détection de fin de parole** → laisse le réglage par défaut au début, puis allonge-le un peu si l'agent coupe la parole aux gens qui réfléchissent.

---

## Étape 3 — Les trois outils

Crée les trois outils décrits dans `agent-telephonique/outils.md` : `consulter_disponibilites`, `reserver_rendez_vous`, `demander_rappel`.

Tous les trois pointent vers la même URL `/exec`, en POST, avec `Content-Type: application/json`.

Les deux points où ça se joue :
- **le `token` est une valeur fixe** écrite en dur dans le corps, jamais un paramètre rempli par l'IA ;
- **la description de chaque outil** est lue par le modèle pour décider quand l'appeler. Reprends-la mot pour mot depuis `outils.md`, c'est elle qui fait la moitié du travail.

---

## Étape 4 — Le numéro de téléphone

**C'est l'étape la plus lente, prends-la en premier si tu es pressé.**

Un numéro français ne s'achète pas en un clic : la réglementation impose de justifier une adresse en France. Prépare un **justificatif de domicile de moins de 3 mois** et une **pièce d'identité**, au nom de l'entreprise. Compte de quelques heures à quelques jours de validation.

Deux chemins :
- **Twilio**, puis import du numéro dans Vapi. Le plus documenté, mais le dossier réglementaire (« bundle ») est un peu administratif.
- **Un opérateur français** (OVH Telecom, Ringover, Zadarma…) avec un accès SIP. Dossier plus simple à monter depuis la France.

Une fois le numéro actif, rattache-le à ton agent sur la plateforme, et **appelle-le depuis ton portable** pour l'entendre décrocher.

---

## Étape 5 — Le renvoi conditionnel

Dernière étape, et la plus rapide. Depuis le téléphone qui porte le 07 68 44 52 93, compose ces codes comme un appel normal.

**Renvoi si tu ne réponds pas au bout de 20 secondes**
```
**61*+33XXXXXXXXX*11*20#
```

**Renvoi si ta ligne est occupée**
```
**67*+33XXXXXXXXX#
```

**Renvoi si tu es injoignable** (pas de réseau, téléphone éteint)
```
**62*+33XXXXXXXXX#
```

Remplace `+33XXXXXXXXX` par le numéro de l'agent au format international (un `06 12 34 56 78` s'écrit `+33612345678`). Le `20` du premier code est le délai en secondes, réglable de 5 à 30.

**Pour tout annuler d'un coup** : `##002#`

> Ces codes sont le standard GSM et passent chez la plupart des opérateurs français. Si l'un
> d'eux est refusé, le réglage existe aussi dans l'application de ton opérateur, rubrique
> « renvoi d'appel ». Et vérifie que le renvoi est bien inclus dans ton forfait.

---

## Étape 6 — Les tests à faire avant d'ouvrir la ligne

Appelle l'agent toi-même, et coche ces sept cas. Ne mets pas la ligne en service tant que les sept ne passent pas.

1. **Le parcours normal** — « Bonjour, je voudrais faire nettoyer mon canapé. » Tu dois arriver à un RDV posé, et le voir apparaître dans ton agenda.
2. **La question de prix sèche** — « C'est combien ? » L'agent doit poser une question avant de chiffrer, pas lâcher un prix au hasard.
3. **Hors zone** — annonce une commune lointaine, Strasbourg par exemple. L'agent ne doit pas refuser, mais prendre une demande de rappel. Vérifie que le mail arrive.
4. **Le créneau déjà pris** — pose un événement dans ton agenda sur un créneau, puis demande-le à l'agent. Il doit proposer autre chose.
5. **L'entreprise** — « Je gère un garage, j'ai six véhicules. » Aucun prix ne doit sortir : demande de rappel.
6. **La question piège** — « Vous faites les rideaux ? » L'agent ne doit rien inventer.
7. **Le client mécontent** — « Je ne suis pas content de la dernière intervention. » Il ne doit pas se justifier, mais faire remonter.

Vérifie aussi que le rendez-vous de test a bien **l'adresse dans le champ Lieu** : c'est ce qui te permet de lancer l'itinéraire d'un doigt depuis ton agenda.

---

## La première semaine

**Écoute les enregistrements.** Toutes les plateformes les conservent. Dix appels écoutés t'apprendront plus que tout ce qui est écrit ici : tu verras les questions auxquelles l'agent bafouille, et tu complètes le prompt en conséquence.

Le prompt est un fichier de ce dépôt : tu le modifies, tu le recolles, c'est actif à l'appel suivant. Pas de redéploiement, pas d'attente.

**Deux réglages à surveiller :**
- L'agent coupe la parole → allonge le délai de détection de fin de parole.
- L'agent parle trop → la consigne « trois phrases maximum » est dans le prompt ; renforce-la si besoin.

---

## Le cadre légal, en trois lignes

- **Dis que c'est une IA** si on te le demande — c'est déjà dans le prompt, et c'est le sens de la réglementation européenne sur l'IA.
- **Si la plateforme enregistre les appels**, il faut en informer l'appelant. Une phrase d'accueil suffit : « Cet appel peut être enregistré pour améliorer notre service. » Beaucoup d'artisans l'oublient ; ça se règle en dix secondes.
- **Les données collectées** (nom, adresse, téléphone) ne servent qu'au rendez-vous. Elles ne doivent pas partir ailleurs que dans ton agenda et ta boîte mail.

---

## Les fichiers de ce dossier

| Fichier | À quoi il sert |
|---|---|
| `prompt-systeme.md` | Le cerveau de l'agent — à coller dans la plateforme |
| `outils.md` | Les trois outils, champ par champ |
| `INSTALLATION.md` | Ce document |
| `../google-apps-script/agent-telephonique.gs` | Le script qui écrit dans ton agenda |
| `../google-apps-script/dispos-agenda.gs` | L'existant, qui alimente le site — inchangé |
