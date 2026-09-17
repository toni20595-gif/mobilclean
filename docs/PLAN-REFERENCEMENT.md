# Plan de référencement Mobil Clean — ce qui est fait, ce qui reste

Document de travail. Mis à jour au fur et à mesure.

---

## Ce qui est fait côté site

| Chantier | État | Effet mesurable |
|---|---|---|
| Poids des images | ✅ | 17,3 Mo → 4,2 Mo. Accueil : 4,3 Mo → 0,51 Mo d'images |
| Pages par prestation | ✅ | 6 pages dédiées, 750 à 940 mots chacune |
| Pages par zone | ✅ | 8 communes + page hub |
| FAQ | ✅ | Page dédiée + balisage FAQPage |
| Données structurées | ✅ | LocalBusiness, Service, FAQPage, BreadcrumbList |
| Socle AEO / IA | ✅ | Blocs de réponse, `llms.txt`, robots d'IA autorisés |
| Maillage interne | ✅ | Menu, pied de page, fils d'Ariane, liens croisés |
| Photos avant/après | ✅ | Matelas, canapé et tapis enfin affichés |
| Nombre de pages indexables | ✅ | 6 → 22 |

**Ce que ça ne fait pas :** le site ne pilote qu'une partie du référencement
local. Le reste est ci-dessous, et personne ne peut le faire depuis le code.

---

## Ce qui reste — par ordre de rentabilité

### 1. Local Services Ads — à vérifier en premier (5 minutes)

C'est l'emplacement le plus haut de la première page : au-dessus des annonces
classiques, avec la note et les avis, et le client appelle directement depuis
l'annonce. **On paie au contact reçu, pas au clic.**

Le nettoyage fait partie des catégories éligibles en France, mais la
couverture varie selon le métier et la zone.

- [ ] Vérifier l'éligibilité sur le vérificateur Google Local Services, avec
      le code postal **68100** et la catégorie **nettoyage**
- [ ] Si éligible : créer la fiche, lancer la vérification
- [ ] Noter le coût par contact proposé, pour le comparer aux Ads classiques

À savoir : les contacts facturés ne sont pas remboursés, et le format
basculera vers Performance Max en 2027.

### 2. Fiche Google Business — le levier n°1 (1 à 2 heures)

La fiche pèse à elle seule environ **32 %** des signaux du pack local, et
**8 des 10 premiers facteurs** en viennent directement. Une fiche remplie à
100 % performe nettement mieux qu'une fiche partielle.

- [ ] Compléter la fiche à 100 % : catégorie principale et secondaires,
      description, services (reprendre les 6 prestations), zone desservie,
      horaires 9h30–21h, moyens de paiement, attributs
- [ ] Ajouter des photos : avant/après, l'équipe, le matériel, le véhicule
- [ ] Renseigner la section Questions/Réponses en y posant soi-même les
      questions fréquentes (c'est permis et recommandé)
- [ ] **Publier un post par semaine.** Les fiches inactives depuis plus de
      30 jours décrochent au classement. Une photo d'intervention + deux
      lignes suffisent
- [ ] Vérifier que le nom, le téléphone et la zone sont **exactement**
      identiques à ceux du site (cohérence d'entité)

### 3. Avis Google — 16 à 20 % du classement local (à mettre en routine)

C'est le levier le plus puissant qui dépende entièrement de nous. Et c'est la
**régularité** qui compte, plus que le total : mieux vaut 5 avis par mois
pendant six mois que 30 avis d'un coup.

- [ ] Mettre en place la demande systématique après chaque intervention :
      QR code dans le véhicule, ou SMS de remerciement avec le lien
- [ ] Lien direct à utiliser : celui déjà présent dans le code
      (`GOOGLE_AVIS_URL` dans `src/components/Avis.astro`)
- [ ] Répondre à **tous** les avis, y compris les négatifs. Une réponse
      posée à un avis négatif rassure plus qu'un mur de 5 étoiles
- [ ] Objectif : 4,5+ de moyenne, 5 à 10 nouveaux avis par mois

### 4. Google Ads — le trafic immédiat (à lancer quand tu veux)

Les pages d'atterrissage sont déjà en place. Une annonce qui pointe vers une
page dédiée a un meilleur score de qualité, donc **un coût par clic plus bas**.
CPC attendu sur ce type de service local : **1 à 4 €**. Budget de test :
300 €/mois ; pour du volume exploitable : 600 à 1 000 €/mois.

Ciblage géographique : Mulhouse + 15 km. Ne jamais cibler toute la France,
ça fait exploser le CPC.

| Groupe d'annonces | Mots-clés | Page d'atterrissage |
|---|---|---|
| Matelas | nettoyage matelas mulhouse · nettoyer matelas à domicile · nettoyage matelas anti acariens · nettoyage matelas haut-rhin | `/services/nettoyage-matelas` |
| Canapé | nettoyage canapé mulhouse · nettoyage canapé tissu à domicile · nettoyer canapé cuir · détachage canapé haut-rhin | `/services/nettoyage-canape` |
| Voiture | nettoyage intérieur voiture mulhouse · nettoyage siège voiture à domicile · nettoyage habitacle voiture · shampouinage siège voiture | `/services/nettoyage-interieur-voiture` |
| Tapis | nettoyage tapis mulhouse · nettoyer tapis à domicile · nettoyage tapis professionnel haut-rhin | `/services/nettoyage-tapis` |
| Fauteuil | nettoyage fauteuil mulhouse · nettoyage fauteuil tissu · nettoyage chaise tissu | `/services/nettoyage-fauteuil` |
| Multi | nettoyage canapé et tapis · nettoyage salon complet · nettoyage textile maison mulhouse | `/services/nettoyage-multi-meubles` |

- [ ] Créer le compte Ads **au nom de Mobil Clean** (jamais au nom d'une agence)
- [ ] Activer les extensions d'appel : sur ce métier, l'appel convertit mieux
      que le formulaire
- [ ] Le suivi de conversions est déjà câblé dans le site
      (`src/config/analytics.ts`) — vérifier qu'il est bien renseigné
- [ ] Exclure les mots-clés parasites : « emploi », « gratuit », « pas cher »,
      « location machine », « produit »

### 5. Search Console — mesurer, une fois les pages en ligne

- [ ] Soumettre `https://mobilclean.fr/sitemap-index.xml`
- [ ] Demander l'indexation des 16 nouvelles pages (Inspection d'URL)
- [ ] **M'envoyer l'export des 3 derniers mois** : impressions, clics,
      requêtes, pages. C'est le seul arbitre objectif du « mal référencé »,
      et ça dira sur quelles requêtes on est déjà visible sans le savoir

### 6. Liens locaux — le plus long, le plus durable

C'est le domaine où une agence est réellement utile, parce que ça se fait
par téléphone et poignée de main.

- [ ] Annuaires avec nom/téléphone/zone **identiques** au site : Pages Jaunes,
      Apple Business Connect, Bing Places, annuaires locaux du Haut-Rhin
- [ ] Partenariats avec lien : garages, concessions, hôtels, campings,
      agences immobilières, locations saisonnières de la région
- [ ] Presse et blogs locaux de Mulhouse / du Haut-Rhin

---

## Ce qu'il me faut de ta part pour finir le travail

### Avis réels en texte statique (bloquant)

Le widget Featurable charge les avis **en JavaScript depuis un domaine
tiers**. Les crawlers d'IA n'exécutent pas le JavaScript : **tes vrais avis
sont invisibles pour ChatGPT, Perplexity et Claude.**

- [ ] Copier-coller **3 ou 4 vrais avis Google** : texte exact, prénom +
      initiale, prestation concernée, ville si elle est mentionnée

Je les intègre en HTML statique à côté du widget. **Sans `aggregateRating`** :
Google traite comme « self-serving » tout avis sur l'entreprise affiché sur
son propre site, widget tiers compris, ce qui rend la page inéligible aux
étoiles et expose à une action manuelle.

### Faits à confirmer ou corriger dans le code

Aucune donnée n'a été inventée : tout vient du site existant. Ces points
méritent quand même ta validation.

- [ ] **Frais de déplacement par commune.** Le pied de page annonce
      « Gratuit Mulhouse », c'est repris sur `/zones/mulhouse`. Pour les 7
      autres communes, les pages disent « précisé au devis » — exact, mais
      moins convaincant qu'un « déplacement offert jusqu'à X km ».
      À compléter dans `src/data/zones.ts`
- [ ] **Annulation / report de rendez-vous.** La FAQ dit « appelez-nous, on
      trouve un autre créneau ». Si tu appliques des conditions, à préciser
      dans `src/pages/faq.astro`
- [ ] **Durées indiquées** par prestation (`src/data/prestations.ts`) :
      1h par matelas, 1 à 2h pour un canapé, 2h30 pour une voiture,
      30-45 min par fauteuil. À ajuster si ça ne colle pas à la réalité
- [ ] **Communes à ajouter ou retirer** de `src/data/zones.ts` selon ce que
      tu acceptes réellement de couvrir

### Pour renforcer les pages de zone

Les 8 pages de zone sont correctes mais c'est la partie la plus légère du
travail : environ 280 mots réellement propres à chaque commune, le reste
étant l'en-tête, le pied de page et les cartes communes. Ce qui les rendra
solides sur le long terme :

- [ ] Un vrai avis client **de cette commune**, sur la page de la commune
- [ ] Une vraie photo d'intervention faite **dans cette commune**
- [ ] Un cas concret : « intervention à Riedisheim sur un canapé d'angle,
      2 heures, voici le résultat »

Un élément réel par page, et ces pages deviennent inattaquables.

---

## Ce qu'il faut mesurer — et ce qu'il ne faut pas

**Le bon tableau de bord :** nombre d'appels, nombre de réservations, coût par
client acquis.

**Pas la position.** Être premier sur une requête que personne ne tape ne fait
pas sonner le téléphone. Être quatrième sur « nettoyage voiture Mulhouse » le
fait sonner. Si un prestataire propose d'être jugé sur les positions plutôt
que sur les appels, c'est un signal.

**Horizon réaliste :** premiers mouvements à 6-8 semaines sur l'organique,
effet net à 3-6 mois. Les Ads et les Local Services Ads, eux, donnent du
trafic en 24 à 48 heures — ce sont deux canaux différents, pas deux vitesses
du même canal.
