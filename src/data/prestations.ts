// ════════════════════════════════════════════════════════════════════════
//  PRESTATIONS — contenu des pages dédiées (une page par prestation)
//  ──────────────────────────────────────────────────────────────────────
//  Pourquoi ce fichier existe : le site n'avait qu'une page /services qui
//  parlait de tout à la fois. Personne ne cherche « prestations » sur
//  Google — on cherche « nettoyage matelas Mulhouse ». Sans page dédiée
//  par intention de recherche, Google n'a rien à classer.
//
//  Chaque page sert deux canaux à la fois :
//    1. le référencement naturel (une page = une requête précise) ;
//    2. les campagnes Google Ads — une annonce qui atterrit sur une page
//       dédiée a un meilleur score de qualité, donc un coût par clic plus
//       bas, dès le premier jour.
//
//  RÈGLE : chaque champ doit être VRAI et propre à la prestation. Du
//  contenu recopié d'une page à l'autre est traité par Google comme des
//  « doorway pages » et rétrograde tout le site. Aucune donnée inventée
//  ici : tarifs, horaires et méthodes viennent du site existant.
// ════════════════════════════════════════════════════════════════════════

export interface Prestation {
  slug: string;
  /** Nom court, pour la navigation et le fil d'Ariane */
  nom: string;
  /** <title> — c'est la requête visée, avec la ville */
  titreSeo: string;
  /** meta description — écrite pour le taux de clic, pas pour le robot */
  metaDescription: string;
  /** <h1> de la page */
  h1: string;
  /**
   * Bloc de réponse AEO : 40 à 60 mots, factuel, placé tout en haut.
   * C'est ce que ChatGPT, Perplexity et les réponses IA de Google citent.
   */
  reponseCourte: string;
  tarif: string;
  tarifDetail: string;
  duree: string;
  image: string;
  imageAlt: string;
  /** Preuves avant/après — ces photos existent déjà et n'étaient affichées nulle part */
  avantApres: { avant: string; apres: string; legende: string }[];
  /** La méthode, étape par étape — le contenu qui fait la différence */
  methode: { titre: string; texte: string }[];
  inclus: string[];
  /** Pour qui / dans quels cas — cible les recherches « longue traîne » */
  casTypiques: string[];
  /** FAQ propre à la prestation → balisage FAQPage */
  faq: { question: string; reponse: string }[];
  /**
   * Les autres noms sous lesquels les clients cherchent cette prestation.
   * Objectif : couvrir les formulations réelles (« pressing auto »,
   * « shampouinage »…) sans empiler des mots-clés — elles sont expliquées
   * dans un vrai paragraphe, pas listées bêtement.
   */
  appellations: string[];
  noteVocabulaire: string;
  /** Maillage interne : slugs des prestations liées */
  liees: string[];
}

export const prestations: Prestation[] = [
  {
    slug: "nettoyage-interieur-voiture",
    nom: "Intérieur de voiture",
    titreSeo: "Nettoyage intérieur de voiture — Mulhouse, Wittenheim, Haut-Rhin | Mobil Clean",
    metaDescription:
      "Nettoyage complet de l'habitacle à domicile, à Mulhouse et dans le Haut-Rhin : sièges, moquettes, tableau de bord, coffre. À partir de 79 €, en 2h30. Devis gratuit, 7j/7 de 9h30 à 21h.",
    h1: "Nettoyage intérieur de voiture à domicile",
    reponseCourte:
      "Mobil Clean nettoie l'intérieur de votre voiture chez vous, à Mulhouse et dans le Haut-Rhin, sans que vous ayez à vous déplacer. L'intervention dure environ 2h30 et couvre sièges, moquettes, tableau de bord, plastiques et coffre. Tarif à partir de 79 €, sur rendez-vous 7j/7 de 9h30 à 21h.",
    tarif: "À partir de 79 €",
    tarifDetail:
      "Deux formules au choix : Or à 79 € (au lieu de 99 €) et Diamant à 110 €. Le tarif final dépend de la taille du véhicule et de l'état de l'habitacle — il vous est confirmé au devis, avant toute intervention.",
    duree: "Environ 2h30",
    image: "/images/galerie/voiture-acceuil.webp",
    imageAlt: "Habitacle de voiture nettoyé par Mobil Clean à Mulhouse",
    avantApres: [
      {
        avant: "/images/galerie/voiture-avant.webp",
        apres: "/images/galerie/voiture-apres.webp",
        legende: "Habitacle complet — sièges et plastiques remis à neuf",
      },
      {
        avant: "/images/galerie/voiture-avant-2.webp",
        apres: "/images/galerie/voiture-apres-2.webp",
        legende: "Sièges avant — détachage des tissus en profondeur",
      },
      {
        avant: "/images/galerie/voiture-avant-3.webp",
        apres: "/images/galerie/voiture-apres-3.webp",
        legende: "Moquettes et plancher — décrassage complet",
      },
    ],
    methode: [
      {
        titre: "Aspiration complète",
        texte:
          "On commence par vider et aspirer l'ensemble de l'habitacle : sièges, rails, entre-sièges, plancher, coffre et roue de secours. C'est l'étape qui conditionne tout le reste — un tissu encore chargé de poussière ne peut pas être détaché correctement.",
      },
      {
        titre: "Nettoyage vapeur",
        texte:
          "La vapeur décolle les salissures incrustées dans les plastiques, les grilles d'aération, le volant et la console. Elle agit par la chaleur, sans détergent agressif, ce qui évite les traces et les surfaces qui restent collantes.",
      },
      {
        titre: "Traitement des tissus ou du cuir",
        texte:
          "Selon la sellerie : injection-extraction pour les tissus, qui pulvérise la solution puis la réaspire avec les salissures ; nettoyant et nourrissant adaptés pour le cuir, afin de ne pas dessécher la matière.",
      },
      {
        titre: "Désodorisation",
        texte:
          "Les mauvaises odeurs ne viennent pas de l'air mais des textiles. Une fois les tissus traités à la source, la désodorisation finale fixe un résultat durable plutôt que de masquer l'odeur quelques jours.",
      },
    ],
    inclus: [
      "Aspiration complète, coffre inclus",
      "Nettoyage vapeur des plastiques et de la console",
      "Traitement des sièges tissu ou cuir",
      "Moquettes et tapis de sol",
      "Vitres intérieures",
      "Désodorisation",
    ],
    casTypiques: [
      "Remise en état avant la revente ou la restitution d'un véhicule de location longue durée",
      "Voiture familiale : miettes, taches de goûter, sièges auto",
      "Après le transport d'un animal : poils et odeurs incrustés dans les tissus",
      "Véhicule de société ou de fonction à remettre au propre entre deux conducteurs",
    ],
    faq: [
      {
        question: "Faut-il un point d'eau ou une prise électrique ?",
        reponse:
          "Nous arrivons avec notre matériel. Un accès à une prise électrique est le plus pratique ; dites-nous à la réservation si vous n'en avez pas, nous adaptons l'intervention.",
      },
      {
        question: "Est-ce que vous lavez aussi la carrosserie ?",
        reponse:
          "Notre prestation porte sur l'intérieur du véhicule : habitacle, sièges, moquettes, plastiques et coffre. C'est là que se logent les odeurs et les taches, et c'est ce qui compte le plus à la revente.",
      },
      {
        question: "Combien de temps faut-il attendre avant de réutiliser la voiture ?",
        reponse:
          "L'injection-extraction laisse les tissus légèrement humides. En laissant les portes ouvertes ou les vitres entrouvertes après notre passage, l'habitacle est sec en quelques heures selon la saison et l'aération.",
      },
      {
        question: "Les taches anciennes partent-elles vraiment ?",
        reponse:
          "La plupart des taches courantes — alimentaires, boissons, terre, traces de doigts — partent à l'injection-extraction. Certaines taches très anciennes ou ayant déteint sur la fibre peuvent laisser une ombre. Nous vous le disons franchement au devis plutôt qu'après.",
      },
      {
        question: "Intervenez-vous sur mon lieu de travail ?",
        reponse:
          "Oui, du moment que le véhicule est stationné et accessible. Beaucoup de clients nous font intervenir pendant leurs heures de bureau, sur le parking de leur entreprise.",
      },
    ],
    appellations: [
      "pressing auto",
      "pressing automobile",
      "shampouinage des sièges",
      "nettoyage d'habitacle",
      "lavage intérieur de voiture",
      "détailing intérieur",
      "entretien intérieur de véhicule",
      "nettoyage de sièges de voiture",
      "shampouineuse voiture",
      "remise en état d'habitacle",
      "nettoyage de moquette de voiture",
      "désinfection d'habitacle",
    ],
    noteVocabulaire:
      "Vous cherchez peut-être un « pressing auto », un « shampouinage de sièges » ou du « détailing intérieur » : ce sont des appellations différentes pour le même travail. Le terme technique est l'injection-extraction — on pulvérise une solution dans le tissu et on la réaspire aussitôt avec les salissures. « Pressing » vient du fait que le résultat sur un tissu ressemble à celui d'un pressing textile. Peu importe le mot que vous employez en nous appelant : décrivez simplement l'état de votre habitacle.",
    liees: ["nettoyage-canape", "nettoyage-tapis"],
  },

  {
    slug: "nettoyage-matelas",
    nom: "Matelas",
    titreSeo: "Nettoyage de matelas à domicile — Mulhouse, Wittenheim, Haut-Rhin | Mobil Clean",
    metaDescription:
      "Nettoyage de matelas à domicile à Mulhouse et dans le Haut-Rhin : traitement anti-acariens, désodorisation, séchage rapide. À partir de 69 €. Idéal en cas d'allergies. Devis gratuit, 7j/7.",
    h1: "Nettoyage de matelas à domicile",
    reponseCourte:
      "Mobil Clean nettoie votre matelas chez vous, à Mulhouse et dans le Haut-Rhin, par injection-extraction avec traitement anti-acariens et désodorisation. Le matelas reste sur place, aucun transport n'est nécessaire. Tarif à partir de 69 €, sur rendez-vous 7j/7 de 9h30 à 21h.",
    tarif: "À partir de 69 €",
    tarifDetail:
      "Le tarif dépend de la taille du matelas et de son état. Si vous avez plusieurs matelas, ou un matelas et d'autres meubles à traiter, la formule multi-meubles revient moins cher qu'une addition de prestations.",
    duree: "Environ 1h par matelas",
    image: "/images/galerie/matelas-acceuil.webp",
    imageAlt: "Matelas nettoyé à domicile par Mobil Clean dans le Haut-Rhin",
    avantApres: [
      {
        avant: "/images/galerie/matelas-avant.webp",
        apres: "/images/galerie/matelas-apres.webp",
        legende: "Matelas deux places — taches et auréoles éliminées",
      },
      {
        avant: "/images/galerie/matelas2-avant.webp",
        apres: "/images/galerie/matelas2-apres.webp",
        legende: "Matelas d'enfant — traitement anti-acariens complet",
      },
    ],
    methode: [
      {
        titre: "Aspiration profonde",
        texte:
          "Un matelas accumule squames, poussières et déjections d'acariens dans les premiers centimètres de la mousse. L'aspiration profonde retire cette charge sèche avant toute mise en humidité — sinon on ne fait que transformer la poussière en boue.",
      },
      {
        titre: "Détachage ciblé",
        texte:
          "Chaque type de tache appelle un produit différent : transpiration, urine, sang, boissons ne se traitent pas de la même façon. On identifie la nature de la tache avant d'appliquer, jamais l'inverse.",
      },
      {
        titre: "Injection-extraction",
        texte:
          "La machine injecte une solution dans la fibre puis la réaspire immédiatement avec les salissures dissoutes. C'est le point clé : le matelas n'est jamais détrempé, et rien ne reste à l'intérieur en séchant.",
      },
      {
        titre: "Traitement anti-acariens et désodorisation",
        texte:
          "Le traitement anti-acariens s'applique en fin d'intervention, sur un support propre — c'est la seule façon qu'il soit réellement efficace. La désodorisation bio termine le travail sans parfum entêtant.",
      },
    ],
    inclus: [
      "Aspiration profonde des deux faces",
      "Détachage ciblé selon la nature des taches",
      "Injection-extraction",
      "Traitement anti-acariens certifié",
      "Traitement antibactérien",
      "Désodorisation bio",
    ],
    casTypiques: [
      "Allergies ou asthme : acariens, poussière, réveils difficiles",
      "Matelas d'enfant après l'apprentissage de la propreté",
      "Taches de transpiration et auréoles jaunes installées avec le temps",
      "Matelas récupéré d'occasion ou resté longtemps dans une cave ou un garage",
      "Après une maladie, pour repartir sur un support sain",
    ],
    faq: [
      {
        question: "Le matelas est-il réutilisable le soir même ?",
        reponse:
          "Dans la plupart des cas oui. L'injection-extraction retire l'essentiel de l'humidité ; en aérant la pièce après notre passage, le matelas est sec en quelques heures. Pour être tranquille, prenez un créneau en matinée.",
      },
      {
        question: "Le nettoyage élimine-t-il vraiment les acariens ?",
        reponse:
          "L'aspiration profonde retire les acariens et leurs déjections — ce sont ces déjections qui déclenchent les réactions allergiques, pas l'acarien lui-même. Le traitement appliqué ensuite limite leur retour. C'est un vrai soulagement pour les personnes allergiques, sans être une stérilisation définitive : les acariens reviennent avec le temps, d'où l'intérêt d'un passage régulier.",
      },
      {
        question: "Faut-il déplacer le matelas ou le sortir de la chambre ?",
        reponse:
          "Non, on travaille sur place, dans votre chambre. Il suffit que le lit soit défait et que nous puissions accéder aux deux faces du matelas.",
      },
      {
        question: "Les taches d'urine et les odeurs partent-elles ?",
        reponse:
          "Oui dans la grande majorité des cas, à condition de traiter la source et pas seulement la surface : l'urine pénètre en profondeur et l'odeur revient si on se contente de nettoyer le dessus. C'est précisément ce que l'injection-extraction permet de faire.",
      },
      {
        question: "À quelle fréquence faire nettoyer son matelas ?",
        reponse:
          "Une à deux fois par an pour un adulte sans problème particulier, davantage en cas d'allergies, de jeunes enfants ou d'animaux qui dorment sur le lit.",
      },
    ],
    appellations: [
      "shampouinage de matelas",
      "désinfection de matelas",
      "nettoyage de literie",
      "traitement anti-acariens",
      "détachage de matelas",
      "nettoyage de sommier",
      "nettoyer un matelas taché",
      "nettoyage matelas urine",
    ],
    noteVocabulaire:
      "« Shampouinage de matelas », « désinfection de matelas », « traitement anti-acariens » : ces demandes correspondent toutes à la même intervention chez nous. La méthode est l'injection-extraction, suivie d'un traitement anti-acariens. Attention à un abus de langage courant : un nettoyage professionnel n'est pas une stérilisation. On retire les acariens et leurs déjections — ce qui soulage réellement les allergies — mais ils reviennent avec le temps, d'où l'intérêt d'un passage une à deux fois par an.",
    liees: ["nettoyage-canape", "nettoyage-multi-meubles"],
  },

  {
    slug: "nettoyage-canape",
    nom: "Canapé",
    titreSeo: "Nettoyage de canapé à domicile — Mulhouse, Wittenheim, Haut-Rhin | Mobil Clean",
    metaDescription:
      "Nettoyage de canapé à domicile à Mulhouse et dans le Haut-Rhin : tissu, velours, microfibre ou cuir. Injection-extraction, détachage, désodorisation. À partir de 79 €. Devis gratuit, 7j/7.",
    h1: "Nettoyage de canapé à domicile",
    reponseCourte:
      "Mobil Clean nettoie votre canapé chez vous, à Mulhouse et dans le Haut-Rhin, par injection-extraction adaptée au textile : tissu, velours, microfibre ou cuir. Le canapé reste en place. Tarif à partir de 79 €, sur rendez-vous 7j/7 de 9h30 à 21h.",
    tarif: "À partir de 79 €",
    tarifDetail:
      "Le tarif dépend du nombre de places, du type de textile et de l'état du canapé. Un canapé d'angle demande plus de temps qu'un deux places. Le prix vous est confirmé au devis, avant l'intervention.",
    duree: "1h à 2h selon la taille",
    image: "/images/galerie/canape-apres-2.webp",
    imageAlt: "Canapé nettoyé à domicile par Mobil Clean à Mulhouse",
    avantApres: [
      {
        avant: "/images/galerie/canape-avant.webp",
        apres: "/images/galerie/canape-apres.webp",
        legende: "Canapé tissu clair — taches d'usage éliminées",
      },
      {
        avant: "/images/galerie/canape-avant-2.webp",
        apres: "/images/galerie/canape-apres-2.webp",
        legende: "Assise et accoudoirs — fibre ravivée",
      },
    ],
    methode: [
      {
        titre: "Identification du textile",
        texte:
          "Première étape, et la plus importante : un velours, une microfibre, un lin et un cuir ne se nettoient pas avec le même produit ni la même pression. Une microfibre mal traitée marque, un velours mal séché se couche. On vérifie avant de commencer, et on teste sur une zone non visible.",
      },
      {
        titre: "Aspiration et dégagement",
        texte:
          "Aspiration des assises, dossiers, accoudoirs et surtout des interstices entre les coussins, où s'accumulent miettes, poussière et poils d'animaux.",
      },
      {
        titre: "Détachage puis injection-extraction",
        texte:
          "Les taches identifiées sont prétraitées, puis l'ensemble passe à l'injection-extraction : la solution est pulvérisée dans la fibre et réaspirée aussitôt. Aucun résidu de produit ne reste dans le textile, ce qui évite les auréoles au séchage.",
      },
      {
        titre: "Désodorisation et protection optionnelle",
        texte:
          "Désodorisation en finition. Sur demande, un traitement anti-tache peut être appliqué pour que les prochains accidents restent en surface et s'essuient au lieu de pénétrer.",
      },
    ],
    inclus: [
      "Compatible tissu, velours, microfibre et cuir",
      "Aspiration complète, interstices inclus",
      "Détachage ciblé",
      "Injection-extraction",
      "Désodorisation",
      "Protection anti-tache en option",
    ],
    casTypiques: [
      "Canapé clair marqué par l'usage quotidien",
      "Foyer avec animaux : poils, odeurs, traces de pattes",
      "Taches de nourriture, café, vin ou stylo",
      "Canapé en cuir qui ternit et se dessèche",
      "Remise en état avant une vente, une location ou l'arrivée d'un locataire",
    ],
    faq: [
      {
        question: "Mon canapé est en velours, y a-t-il un risque ?",
        reponse:
          "Le velours demande une pression et un séchage maîtrisés, sinon le poil se couche et laisse des zones mates. C'est justement pour ça qu'on identifie le textile et qu'on teste sur une zone cachée avant de traiter l'ensemble.",
      },
      {
        question: "Et pour un canapé en cuir ?",
        reponse:
          "Le cuir ne passe pas à l'injection-extraction. On utilise un nettoyant adapté puis un soin nourrissant, pour retirer le film de saleté sans dessécher la matière ni la ternir.",
      },
      {
        question: "Faut-il déplacer le canapé ?",
        reponse:
          "Non. On travaille sur place, il suffit de pouvoir accéder aux faces à traiter. Un dégagement d'environ un mètre autour du canapé est confortable.",
      },
      {
        question: "Combien de temps pour le séchage ?",
        reponse:
          "Comptez quelques heures selon le textile et l'aération de la pièce. Le canapé est légèrement humide au toucher juste après, jamais trempé.",
      },
      {
        question: "Peut-on traiter le canapé et les fauteuils en même temps ?",
        reponse:
          "Oui, et c'est plus avantageux : la formule multi-meubles regroupe canapé, fauteuils, tapis et matelas en une seule intervention, à tarif groupé.",
      },
    ],
    appellations: [
      "shampouinage de canapé",
      "pressing de canapé",
      "nettoyage de salon en tissu",
      "détachage de canapé",
      "nettoyage de textile d'ameublement",
      "nettoyer un canapé en tissu",
      "nettoyage de canapé en cuir",
      "shampouineuse canapé",
    ],
    noteVocabulaire:
      "« Shampouinage de canapé », « pressing de canapé », « nettoyage de salon en tissu » désignent la même prestation. Le nom technique est l'injection-extraction, parfois appelée shampouinage par extraction. Une précision utile : le cuir ne se traite jamais ainsi. Si votre canapé est en cuir, on utilise un nettoyant puis un soin nourrissant — un professionnel qui vous propose de « shampouiner » du cuir n'a pas compris la matière.",
    liees: ["nettoyage-fauteuil", "nettoyage-multi-meubles"],
  },

  {
    slug: "nettoyage-tapis",
    nom: "Tapis",
    titreSeo: "Nettoyage de tapis à domicile — Mulhouse, Wittenheim, Haut-Rhin | Mobil Clean",
    metaDescription:
      "Nettoyage de tapis à domicile à Mulhouse et dans le Haut-Rhin : injection-extraction, anti-acariens, détachage, séchage rapide. 12 €/m². Devis gratuit, intervention 7j/7 de 9h30 à 21h.",
    h1: "Nettoyage de tapis à domicile",
    reponseCourte:
      "Mobil Clean nettoie vos tapis chez vous, à Mulhouse et dans le Haut-Rhin, par injection-extraction haute pression avec traitement anti-acariens. Tarif de 12 € le mètre carré, sans transport ni dépôt en atelier. Sur rendez-vous 7j/7 de 9h30 à 21h.",
    tarif: "12 € / m²",
    tarifDetail:
      "Tarif au mètre carré, calculé sur les dimensions réelles du tapis. Plusieurs tapis ou un tapis avec d'autres meubles : la formule multi-meubles est plus intéressante.",
    duree: "30 min à 1h par tapis",
    image: "/images/galerie/tapis-service.webp",
    imageAlt: "Tapis nettoyé à domicile par Mobil Clean dans le Haut-Rhin",
    avantApres: [
      {
        avant: "/images/galerie/tapis-avant.webp",
        apres: "/images/galerie/tapis-apres.webp",
        legende: "Tapis de salon — couleurs ravivées en profondeur",
      },
      {
        avant: "/images/galerie/tapis-avant-2.webp",
        apres: "/images/galerie/tapis-apres-2.webp",
        legende: "Zone de passage — encrassement décollé",
      },
    ],
    methode: [
      {
        titre: "Aspiration des deux faces",
        texte:
          "Un tapis retient une quantité de poussière qu'on soupçonne rarement : elle descend jusqu'au dossier et remonte à chaque pas. On aspire l'endroit et l'envers pour décharger la fibre avant traitement.",
      },
      {
        titre: "Détachage",
        texte:
          "Les taches sont traitées une par une avant le passage général. Sur un tapis, une tache ignorée ressort systématiquement au séchage, plus visible qu'avant parce que le reste est devenu propre.",
      },
      {
        titre: "Injection-extraction haute pression",
        texte:
          "La solution est injectée sous pression pour atteindre le fond de la fibre, puis réaspirée avec les salissures. C'est ce qui fait revenir les couleurs : la teinte d'origine n'avait pas passé, elle était couverte par un film de crasse.",
      },
      {
        titre: "Anti-acariens et désodorisation",
        texte:
          "Traitement anti-acariens sur fibre propre, puis désodorisation bio. Le tapis est remis en place, légèrement humide, et sèche en quelques heures.",
      },
    ],
    inclus: [
      "Aspiration endroit et envers",
      "Détachage ciblé",
      "Injection-extraction haute pression",
      "Traitement anti-acariens certifié",
      "Désodorisation bio",
      "Séchage rapide",
    ],
    casTypiques: [
      "Tapis de salon terni par les passages quotidiens",
      "Taches d'animaux, odeurs persistantes",
      "Tapis de chambre d'enfant",
      "Tapis clair ou à poils longs qui a perdu son éclat",
      "Remise en état d'un tapis sorti du grenier ou de la cave",
    ],
    faq: [
      {
        question: "Faut-il emporter le tapis ?",
        reponse:
          "Non, tout se fait chez vous. Pas de dépôt en atelier, pas de tapis à transporter dans le coffre, pas d'attente d'une semaine : on intervient sur place et vous récupérez votre tapis le jour même.",
      },
      {
        question: "Tous les tapis peuvent-ils être traités ?",
        reponse:
          "La grande majorité, oui. Les tapis anciens, en soie ou noués main demandent une prudence particulière : envoyez-nous une photo avant la réservation, on vous dit franchement si on peut intervenir sans risque.",
      },
      {
        question: "Le tapis va-t-il rétrécir ou déteindre ?",
        reponse:
          "C'est le risque d'un tapis détrempé, pas celui de l'injection-extraction, qui réaspire l'eau immédiatement. Sur les tapis colorés, on teste la tenue des couleurs sur une zone discrète avant de traiter l'ensemble.",
      },
      {
        question: "Combien de temps avant de remarcher dessus ?",
        reponse:
          "Quelques heures suffisent dans une pièce aérée. Évitez de remettre les meubles lourds ou de marcher pieds nus dessus tant que la fibre est humide.",
      },
      {
        question: "Comment le tarif au m² est-il calculé ?",
        reponse:
          "Sur les dimensions réelles du tapis, à 12 € le mètre carré. Donnez-nous les mesures approximatives à la réservation et vous connaissez le prix avant qu'on se déplace.",
      },
    ],
    appellations: [
      "shampouinage de tapis",
      "nettoyage de moquette",
      "lavage de tapis",
      "détachage de tapis",
      "nettoyer un tapis à domicile",
      "nettoyage de tapis de salon",
      "nettoyage de grand tapis",
    ],
    noteVocabulaire:
      "« Shampouinage de tapis », « lavage de tapis », « nettoyage de moquette » : même travail, noms différents. La différence qui compte n'est pas le vocabulaire mais la méthode — un tapis détrempé puis mal séché rétrécit ou déteint, alors que l'injection-extraction réaspire l'eau immédiatement. C'est aussi ce qui permet de travailler chez vous sans emporter le tapis en atelier.",
    liees: ["nettoyage-canape", "nettoyage-multi-meubles"],
  },

  {
    slug: "nettoyage-fauteuil",
    nom: "Fauteuil",
    titreSeo: "Nettoyage de fauteuil à domicile — Mulhouse, Wittenheim et Haut-Rhin | Mobil Clean",
    metaDescription:
      "Nettoyage de fauteuil à domicile à Mulhouse et dans le Haut-Rhin : velours, microfibre, cuir synthétique. Injection-extraction, détachage, séchage rapide. 55 €. Devis gratuit, 7j/7.",
    h1: "Nettoyage de fauteuil à domicile",
    reponseCourte:
      "Mobil Clean nettoie vos fauteuils chez vous, à Mulhouse et dans le Haut-Rhin, quel que soit le textile : velours, microfibre ou cuir synthétique. Injection-extraction, détachage et désodorisation, sans résidu ni transport. Tarif 55 € par fauteuil, 7j/7 de 9h30 à 21h.",
    tarif: "55 €",
    tarifDetail:
      "55 € par fauteuil. À partir de deux ou trois pièces, ou en complément d'un canapé, la formule multi-meubles est plus avantageuse qu'un tarif à l'unité.",
    duree: "30 à 45 min par fauteuil",
    image: "/images/galerie/fauteuil-service.webp",
    imageAlt: "Fauteuil nettoyé à domicile par Mobil Clean dans le Haut-Rhin",
    avantApres: [],
    methode: [
      {
        titre: "Identification du textile",
        texte:
          "Velours, microfibre, tissé, cuir synthétique : on vérifie la matière et on teste sur une zone non visible. Un fauteuil a souvent plus de valeur sentimentale qu'un canapé, et parfois plus de fragilité.",
      },
      {
        titre: "Aspiration et interstices",
        texte:
          "Aspiration de l'assise, du dossier, des accoudoirs et du dessous. Sur un fauteuil, le pli entre l'assise et le dossier concentre l'essentiel de ce qui s'accumule.",
      },
      {
        titre: "Détachage et injection-extraction",
        texte:
          "Prétraitement des taches, puis injection-extraction pour retirer la charge en profondeur. Le textile ressort propre, sans film de produit qui le rendrait rêche ou collant.",
      },
      {
        titre: "Désodorisation et séchage",
        texte:
          "Finition par désodorisation. Le fauteuil est à peine humide au toucher et sèche rapidement, d'autant qu'il présente moins de surface qu'un canapé.",
      },
    ],
    inclus: [
      "Compatible tous tissus et cuir synthétique",
      "Aspiration complète",
      "Traitement des taches",
      "Injection-extraction",
      "Désodorisation",
      "Séchage rapide",
    ],
    casTypiques: [
      "Fauteuil de lecture ou de télévision très utilisé",
      "Fauteuil de bureau taché ou qui sent le renfermé",
      "Fauteuil ancien ou hérité, à rafraîchir sans l'abîmer",
      "Assises de salle à manger en tissu",
      "Fauteuil sur lequel dort le chien ou le chat",
    ],
    faq: [
      {
        question: "Traitez-vous aussi les chaises de salle à manger en tissu ?",
        reponse:
          "Oui. Les assises et dossiers en tissu se traitent comme un fauteuil. Dites-nous le nombre de pièces à la réservation, on vous fait un tarif groupé.",
      },
      {
        question: "Et un fauteuil de bureau ?",
        reponse:
          "Sans problème, c'est une demande fréquente. Le dossier en résille et l'assise en mousse se traitent tous les deux, et l'odeur de transpiration part avec la charge retenue dans la mousse.",
      },
      {
        question: "Mon fauteuil est ancien, est-ce risqué ?",
        reponse:
          "On teste toujours sur une zone cachée avant d'intervenir. Sur un fauteuil de valeur ou à la tapisserie fragile, envoyez une photo avant la réservation : on vous dira si on préfère ne pas y toucher.",
      },
      {
        question: "Le déplacement est-il facturé pour un seul fauteuil ?",
        reponse:
          "Le devis est gratuit et vous connaissez le montant total avant qu'on se déplace. Pour une seule petite pièce, il est souvent plus intéressant de grouper avec un canapé, un tapis ou un matelas.",
      },
    ],
    appellations: [
      "shampouinage de fauteuil",
      "nettoyage de chaise en tissu",
      "nettoyage de siège de bureau",
      "détachage de fauteuil",
      "nettoyage d'assise en tissu",
      "nettoyage de fauteuil en velours",
    ],
    noteVocabulaire:
      "« Shampouinage de fauteuil », « nettoyage d'assise », « nettoyage de siège de bureau » relèvent de la même prestation. Les chaises de salle à manger en tissu et les fauteuils de bureau se traitent exactement comme un fauteuil de salon : le dossier en résille et la mousse d'assise retiennent la transpiration, et c'est là que se loge l'odeur.",
    liees: ["nettoyage-canape", "nettoyage-multi-meubles"],
  },

  {
    slug: "nettoyage-multi-meubles",
    nom: "Formule multi-meubles",
    titreSeo: "Nettoyage de canapé, fauteuils, tapis et matelas — formule groupée | Mobil Clean",
    metaDescription:
      "Plusieurs meubles à nettoyer ? Mobil Clean regroupe canapé, fauteuils, tapis et matelas en une seule intervention à domicile, à Mulhouse et dans le Haut-Rhin, à tarif groupé. Devis gratuit.",
    h1: "Formule multi-meubles : tout en une intervention",
    reponseCourte:
      "La formule multi-meubles de Mobil Clean regroupe canapé, fauteuils, tapis et matelas en une seule intervention à domicile, à Mulhouse et dans le Haut-Rhin. Le tarif groupé est plus avantageux que l'addition des prestations à l'unité. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h.",
    tarif: "Sur devis",
    tarifDetail:
      "Le tarif est construit sur la liste de vos meubles et calculé au groupé, donc en dessous de la somme des prestations séparées. Le devis est gratuit et sans engagement : vous savez exactement ce que vous payez avant qu'on se déplace.",
    duree: "Une demi-journée selon le volume",
    image: "/images/galerie/salon.webp",
    imageAlt: "Salon complet nettoyé par Mobil Clean : canapé, fauteuil et tapis",
    avantApres: [
      {
        avant: "/images/galerie/canape-avant-2.webp",
        apres: "/images/galerie/canape-apres-2.webp",
        legende: "Canapé du salon — première pièce traitée",
      },
      {
        avant: "/images/galerie/tapis-avant-2.webp",
        apres: "/images/galerie/tapis-apres-2.webp",
        legende: "Tapis du même salon — traité dans la foulée",
      },
    ],
    methode: [
      {
        titre: "On fait le tour avec vous",
        texte:
          "À l'arrivée, on liste les pièces à traiter et on repère les taches à prétraiter. C'est aussi le moment de vous dire ce qui part sûrement et ce qui laissera peut-être une marque — avant de commencer, pas après.",
      },
      {
        titre: "Un ordre de passage réfléchi",
        texte:
          "On traite dans l'ordre qui vous laisse la pièce utilisable le plus vite, et qui évite de remarcher sur un tapis humide pour aller traiter le canapé. Les matelas passent tôt pour être secs au coucher.",
      },
      {
        titre: "La méthode adaptée à chaque support",
        texte:
          "Chaque pièce garde son traitement propre : injection-extraction sur les textiles, produit spécifique sur le cuir, anti-acariens sur matelas et tapis. Une formule groupée ne veut pas dire un traitement uniforme.",
      },
      {
        titre: "Contrôle final ensemble",
        texte:
          "On repasse sur l'ensemble avec vous avant de partir. Si un résultat ne vous convient pas, on y retourne sur place — c'est l'intérêt de tout traiter en une seule fois.",
      },
    ],
    inclus: [
      "Canapé et fauteuil(s)",
      "Tapis inclus possible",
      "Matelas inclus possible",
      "Tarif groupé avantageux",
      "Une seule intervention, un seul rendez-vous",
      "Contrôle final avec vous",
    ],
    casTypiques: [
      "Grand ménage de printemps sur l'ensemble du salon",
      "Emménagement ou déménagement : tout remettre à neuf d'un coup",
      "Remise en état d'un logement avant une location ou une vente",
      "Après des travaux : poussière déposée sur tous les textiles",
      "Location saisonnière à remettre au propre entre deux séjours",
    ],
    faq: [
      {
        question: "Combien de meubles faut-il pour que ça vaille le coup ?",
        reponse:
          "Dès deux ou trois pièces, le groupé devient plus intéressant qu'un tarif à l'unité, parce qu'il n'y a qu'un déplacement et une seule installation du matériel.",
      },
      {
        question: "Tout est fait le même jour ?",
        reponse:
          "Oui, c'est le principe : un seul rendez-vous. Sur un volume important, comptez une demi-journée. On vous donne une estimation de durée au devis.",
      },
      {
        question: "Peut-on ajouter une pièce le jour de l'intervention ?",
        reponse:
          "Si le temps le permet, oui. Dites-le nous en arrivant, on ajuste le devis avant de commencer plutôt que de vous surprendre à la fin.",
      },
      {
        question: "Est-ce que ça marche aussi pour un bureau ou un local pro ?",
        reponse:
          "Oui. Pour les entreprises, hôtels, garages et locaux professionnels, nous avons une page dédiée avec facturation pro et possibilité de contrat d'entretien.",
      },
    ],
    appellations: [
      "nettoyage de salon complet",
      "nettoyage textile de la maison",
      "pressing à domicile",
      "nettoyage de plusieurs meubles",
      "grand nettoyage textile",
      "nettoyage canapé et tapis",
      "remise en état d'un logement",
    ],
    noteVocabulaire:
      "Certains parlent de « pressing à domicile », d'autres de « grand nettoyage textile » ou simplement de « tout mon salon ». C'est la même chose : une seule intervention, plusieurs pièces, un tarif groupé. L'intérêt n'est pas que technique — il n'y a qu'un déplacement et qu'une installation du matériel, et c'est ce qui fait baisser le prix par pièce.",
    liees: ["nettoyage-canape", "nettoyage-matelas", "nettoyage-tapis"],
  },
];

export const getPrestation = (slug: string) => prestations.find((p) => p.slug === slug);
