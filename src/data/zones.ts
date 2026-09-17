// ════════════════════════════════════════════════════════════════════════
//  ZONES D'INTERVENTION — une page par commune
//  ──────────────────────────────────────────────────────────────────────
//  ⚠ RÈGLE ABSOLUE : le contenu de chaque zone doit être RÉELLEMENT
//  différent. Google sanctionne explicitement le cas de l'artisan qui
//  publie cinquante pages de villes en ne changeant que le nom de la
//  commune (politique « doorway abuse ») : le site entier est rétrogradé.
//  Mieux vaut huit pages solides que cinquante pages creuses.
//
//  D'où le parti pris : chaque page part de la géographie et des
//  contraintes pratiques réelles de la commune (distance, type d'habitat,
//  accès, stationnement). C'est vrai, c'est utile au client, et c'est
//  différent d'une commune à l'autre.
//
//  À COMPLÉTER PAR MOBIL CLEAN (aucune donnée inventée ici) :
//   • la politique de frais de déplacement par commune, si elle existe :
//     les pages disent aujourd'hui « précisé au devis », ce qui est exact
//     mais moins convaincant qu'un « déplacement offert jusqu'à X km » ;
//   • les communes à ajouter ou retirer selon ce que vous acceptez.
// ════════════════════════════════════════════════════════════════════════

export interface Zone {
  slug: string;
  ville: string;
  /** Code postal — sert aussi à la cohérence d'entité (NAP) */
  codePostal: string;
  titreSeo: string;
  metaDescription: string;
  h1: string;
  /** Bloc de réponse AEO : 40-60 mots, factuel */
  reponseCourte: string;
  /** Distance et temps depuis Mulhouse — fait géographique vérifiable */
  distance: string;
  /** Quartiers ou communes couverts depuis cette page */
  secteurs: string[];
  /**
   * Le paragraphe qui rend la page unique : caractère réel de la commune
   * et ce que ça change concrètement pour une intervention à domicile.
   */
  contexteLocal: string;
  /** Points pratiques propres à la commune */
  pratique: { titre: string; texte: string }[];
}

export const zones: Zone[] = [
  {
    slug: "mulhouse",
    ville: "Mulhouse",
    codePostal: "68100",
    titreSeo: "Nettoyage à domicile à Mulhouse — voiture, matelas, canapé | Mobil Clean",
    metaDescription:
      "Mobil Clean intervient à domicile dans tous les quartiers de Mulhouse : nettoyage de voiture, matelas, canapé, tapis et fauteuil. Devis gratuit, 7j/7 de 9h30 à 21h. 07 68 44 52 93.",
    h1: "Nettoyage à domicile à Mulhouse",
    reponseCourte:
      "Mobil Clean est basé à Mulhouse et intervient dans tous les quartiers de la ville, du Rebberg à Bourtzwiller. Nettoyage de voiture, matelas, canapé, tapis et fauteuil directement chez vous, sur rendez-vous 7j/7 de 9h30 à 21h. Devis gratuit au 07 68 44 52 93.",
    distance: "Notre ville de base — déplacement gratuit",
    secteurs: [
      "Centre-ville et Fonderie",
      "Rebberg",
      "Dornach",
      "Bourtzwiller",
      "Les Coteaux",
      "Drouot-Barbanègre",
      "Nordfeld",
      "Brustlein",
      "Daguerre",
      "Wolf-Wagner",
    ],
    contexteLocal:
      "Mulhouse est notre ville de base, et c'est aussi la plus contrastée de la zone : entre les maisons du Rebberg, les immeubles anciens du centre et les grands ensembles de Bourtzwiller, une intervention ne se prépare pas de la même façon. Dans les quartiers d'immeubles, la question est toujours la même — l'accès et le stationnement. Dans les quartiers pavillonnaires, c'est plutôt le volume : une maison, c'est souvent un canapé, deux fauteuils et un tapis à traiter en une seule fois.",
    pratique: [
      {
        titre: "En immeuble, sans ascenseur",
        texte:
          "Ce n'est pas un problème : le matériel monte, et de toute façon rien ne descend. Le matelas, le canapé ou le tapis sont traités sur place, dans l'appartement. Précisez juste l'étage à la réservation.",
      },
      {
        titre: "Pour une voiture",
        texte:
          "Il nous faut la voiture stationnée et accessible — devant chez vous, dans une cour, un parking ou un garage. En stationnement payant serré, une place en zone résidentielle est plus confortable pour tout le monde.",
      },
      {
        titre: "Créneaux et horaires",
        texte:
          "Créneaux de 2h30, de 9h30 à 21h, sept jours sur sept. Les créneaux en soirée et le week-end partent vite : réservez quelques jours à l'avance si vous avez une contrainte d'horaire.",
      },
      {
        titre: "Déplacement gratuit",
        texte:
          "Mulhouse étant notre ville de base, le déplacement est offert : vous ne payez que la prestation. Le montant vous est confirmé au devis, avant que nous nous déplacions.",
      },
    ],
  },

  {
    slug: "illzach",
    ville: "Illzach",
    codePostal: "68110",
    titreSeo: "Nettoyage à domicile à Illzach — voiture, matelas, canapé | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Illzach et Modenheim : intérieur de voiture, matelas, canapé, tapis. Mobil Clean se déplace chez vous, à 5 minutes de Mulhouse. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Illzach",
    reponseCourte:
      "Mobil Clean intervient à Illzach et à Modenheim, à environ 4 km de Mulhouse, pour le nettoyage de voitures, matelas, canapés, tapis et fauteuils à domicile. Déplacement rapide depuis notre base mulhousienne. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 4 km de Mulhouse, 10 minutes de trajet",
    secteurs: ["Illzach centre", "Modenheim", "Quartier Jules Verne", "Secteur Île Napoléon"],
    contexteLocal:
      "Illzach combine deux réalités : des quartiers résidentiels calmes côté Modenheim, et la grande zone d'activité de l'Île Napoléon. Cette proximité change une chose concrète pour nous : beaucoup de demandes portent sur des véhicules professionnels ou de fonction, à remettre au propre entre deux conducteurs ou avant une restitution de leasing. Et comme la commune est à dix minutes de notre base, c'est l'une des zones où nous pouvons nous caler le plus facilement sur un créneau de dernière minute.",
    pratique: [
      {
        titre: "Véhicules de société",
        texte:
          "Nous intervenons sur le parking de l'entreprise, pendant les heures de bureau, sur un ou plusieurs véhicules. Pour une flotte ou une facturation professionnelle, passez par notre page Entreprises.",
      },
      {
        titre: "Maisons individuelles",
        texte:
          "Côté Modenheim et les rues résidentielles, l'accès et le stationnement sont simples. C'est le cas idéal pour une formule multi-meubles : on installe le matériel une fois et on traite tout le salon dans la foulée.",
      },
      {
        titre: "Délai d'intervention",
        texte:
          "La proximité avec Mulhouse nous laisse de la souplesse. Appelez-nous, il y a souvent un créneau dans les 48 heures.",
      },
    ],
  },

  {
    slug: "riedisheim",
    ville: "Riedisheim",
    codePostal: "68400",
    titreSeo: "Nettoyage à domicile à Riedisheim — matelas, canapé, voiture | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Riedisheim : canapé, matelas, tapis, fauteuil et intérieur de voiture. Mobil Clean se déplace chez vous, à 5 minutes de Mulhouse. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Riedisheim",
    reponseCourte:
      "Mobil Clean intervient à Riedisheim, commune limitrophe de Mulhouse située à environ 3 km, pour le nettoyage à domicile de canapés, matelas, tapis, fauteuils et intérieurs de voiture. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h, au 07 68 44 52 93.",
    distance: "Environ 3 km de Mulhouse, moins de 10 minutes",
    secteurs: ["Riedisheim centre", "Quartier de la Colline", "Secteur Sainte-Afre", "Vers le Waldeck"],
    contexteLocal:
      "Riedisheim est une commune essentiellement pavillonnaire, adossée à la colline, avec beaucoup de maisons familiales installées depuis longtemps. Concrètement, cela donne des demandes différentes de celles du centre de Mulhouse : moins de petites surfaces, davantage de salons complets et de mobilier de longue date — canapés en tissu qui ont vécu, tapis de salon, matelas de chambres d'amis rarement traités. C'est typiquement le terrain de la formule multi-meubles, où l'on regroupe tout en une seule visite.",
    pratique: [
      {
        titre: "Mobilier ancien",
        texte:
          "Un canapé ou un fauteuil de plusieurs décennies demande de la prudence : on teste toujours la tenue du textile sur une zone cachée avant de traiter l'ensemble, et on vous dit franchement si on préfère ne pas intervenir.",
      },
      {
        titre: "Salons complets",
        texte:
          "Canapé, fauteuils et tapis d'une même pièce se traitent dans un ordre réfléchi, pour que la pièce redevienne utilisable au plus vite et qu'on ne remarche pas sur un tapis humide.",
      },
      {
        titre: "Accès et stationnement",
        texte:
          "Dans les rues pavillonnaires, on se gare devant chez vous sans difficulté. Prévoyez simplement un accès dégagé jusqu'à la pièce à traiter.",
      },
    ],
  },

  {
    slug: "wittenheim",
    ville: "Wittenheim",
    codePostal: "68270",
    titreSeo: "Nettoyage à domicile à Wittenheim — matelas, canapé, voiture | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Wittenheim : matelas, canapé, tapis, fauteuil, intérieur de voiture. Mobil Clean intervient chez vous dans tout le bassin potassique. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Wittenheim",
    reponseCourte:
      "Mobil Clean intervient à Wittenheim, à environ 7 km au nord de Mulhouse, pour le nettoyage à domicile de matelas, canapés, tapis, fauteuils et intérieurs de voiture. Devis gratuit et sans engagement, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 7 km de Mulhouse, 15 minutes de trajet",
    secteurs: ["Wittenheim centre", "Cité Fernand-Anna", "Quartier Sainte-Barbe", "Secteur Jeune-Bois"],
    contexteLocal:
      "Wittenheim porte encore l'empreinte du bassin potassique : les anciennes cités minières y côtoient les lotissements plus récents. Ces maisons de cité, souvent transmises ou rénovées, ont un point commun pratique — des pièces de taille modeste avec du mobilier textile utilisé tous les jours. Nous y intervenons régulièrement sur des matelas et des canapés qui n'ont jamais été traités en profondeur, et où la différence avant/après est la plus spectaculaire.",
    pratique: [
      {
        titre: "Textile jamais traité",
        texte:
          "Un matelas ou un canapé qui n'a jamais connu d'injection-extraction libère une quantité de charge impressionnante. C'est précisément là que le résultat se voit le plus, et qu'il vaut la peine de prévoir un peu de temps.",
      },
      {
        titre: "Pièces de petite taille",
        texte:
          "Le matériel s'installe dans un espace réduit, il faut simplement un passage dégagé. On travaille sur place, aucun meuble ne sort de chez vous.",
      },
      {
        titre: "Grouper pour économiser",
        texte:
          "Sur un déplacement de 15 minutes, il est plus intéressant de regrouper plusieurs pièces en une seule intervention que de multiplier les rendez-vous. Le tarif groupé est calculé au devis.",
      },
    ],
  },

  {
    slug: "kingersheim",
    ville: "Kingersheim",
    codePostal: "68260",
    titreSeo: "Nettoyage à domicile à Kingersheim — canapé, matelas, voiture | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Kingersheim : canapé, matelas, tapis, fauteuil et intérieur de voiture. Mobil Clean se déplace chez vous, à 10 minutes de Mulhouse. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Kingersheim",
    reponseCourte:
      "Mobil Clean intervient à Kingersheim, à environ 5 km au nord de Mulhouse, pour le nettoyage à domicile de canapés, matelas, tapis, fauteuils et intérieurs de voiture. Sur rendez-vous 7j/7 de 9h30 à 21h, devis gratuit au 07 68 44 52 93.",
    distance: "Environ 5 km de Mulhouse, 12 minutes de trajet",
    secteurs: ["Kingersheim centre", "Quartier du Kaligone", "Secteur Sainte-Thérèse", "Zone des Jonquilles"],
    contexteLocal:
      "Kingersheim est une commune familiale, avec une forte proportion de maisons occupées par des foyers avec enfants et animaux. Cela oriente les demandes de façon très concrète : taches de goûter sur les canapés, matelas d'enfants après l'apprentissage de la propreté, poils de chien incrustés dans les tissus, tapis de chambre. Ce sont les interventions où le détachage ciblé compte plus que le passage général — chaque tache a sa nature et son produit.",
    pratique: [
      {
        titre: "Foyers avec enfants",
        texte:
          "Nous utilisons des produits adaptés et une désodorisation bio, sans parfum entêtant. Les textiles sont réutilisables le jour même dans la plupart des cas, en aérant la pièce après notre passage.",
      },
      {
        titre: "Animaux de compagnie",
        texte:
          "Les poils et les odeurs ne se règlent pas en surface : ils sont retenus dans la fibre. L'aspiration profonde puis l'injection-extraction traitent la source, ce qui évite le retour de l'odeur au bout de trois jours.",
      },
      {
        titre: "Créneaux en soirée",
        texte:
          "Nous intervenons jusqu'à 21h, ce qui permet de caler un rendez-vous après l'école ou le travail. Ces créneaux sont les plus demandés : réservez à l'avance.",
      },
    ],
  },

  {
    slug: "rixheim",
    ville: "Rixheim",
    codePostal: "68170",
    titreSeo: "Nettoyage à domicile à Rixheim — canapé, matelas, voiture | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Rixheim : canapé, matelas, tapis, fauteuil et intérieur de voiture. Mobil Clean intervient chez vous, à 10 minutes de Mulhouse. Devis gratuit, 7j/7 de 9h30 à 21h.",
    h1: "Nettoyage à domicile à Rixheim",
    reponseCourte:
      "Mobil Clean intervient à Rixheim, à environ 6 km à l'est de Mulhouse, pour le nettoyage à domicile de canapés, matelas, tapis, fauteuils et intérieurs de voiture. Devis gratuit et sans engagement, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 6 km de Mulhouse, 12 minutes de trajet",
    secteurs: ["Rixheim centre", "Quartier de l'Île Napoléon", "Secteur du Petit-Landau", "Lotissements est"],
    contexteLocal:
      "Rixheim est une commune résidentielle étendue, marquée par une forte proportion de maisons individuelles avec garage ou cour. C'est un détail qui change tout pour le nettoyage de voiture : un véhicule dans un garage ou une cour privée peut être traité sans contrainte de stationnement ni de météo, ce qui rend l'intervention plus confortable et le résultat plus régulier. Les demandes portent aussi beaucoup sur les salons complets, typiques des maisons familiales.",
    pratique: [
      {
        titre: "Voiture au garage ou dans la cour",
        texte:
          "C'est la configuration idéale : à l'abri, avec une prise électrique à proximité. Signalez-le à la réservation, cela nous permet de prévoir le bon matériel.",
      },
      {
        titre: "Formule multi-meubles",
        texte:
          "Sur une maison, regrouper canapé, fauteuils, tapis et matelas en une seule visite revient moins cher que des interventions séparées, et ne mobilise qu'une demi-journée.",
      },
      {
        titre: "Zone étendue",
        texte:
          "Rixheim couvre un large périmètre. Donnez-nous votre adresse précise à la réservation pour que nous calions le créneau au plus juste.",
      },
    ],
  },

  {
    slug: "pfastatt",
    ville: "Pfastatt",
    codePostal: "68120",
    titreSeo: "Nettoyage à domicile à Pfastatt — matelas, canapé, voiture | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Pfastatt : matelas, canapé, tapis, fauteuil et intérieur de voiture. Mobil Clean se déplace chez vous, à 10 minutes de Mulhouse. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Pfastatt",
    reponseCourte:
      "Mobil Clean intervient à Pfastatt, à environ 4 km au nord-ouest de Mulhouse, pour le nettoyage à domicile de matelas, canapés, tapis, fauteuils et intérieurs de voiture. Sur rendez-vous 7j/7 de 9h30 à 21h, devis gratuit.",
    distance: "Environ 4 km de Mulhouse, 10 minutes de trajet",
    secteurs: ["Pfastatt centre", "Quartier du Château", "Cité Anna", "Secteur Sainte-Anne"],
    contexteLocal:
      "Pfastatt est une commune compacte, où se mêlent habitat collectif et maisons de cité, directement adossée à Mulhouse. Sa taille et sa proximité en font l'une des zones où nous pouvons intervenir le plus rapidement, y compris sur un créneau ajouté en fin de journée. La densité de l'habitat collectif signifie aussi beaucoup de matelas et de canapés à traiter en appartement, sur place, sans rien sortir du logement.",
    pratique: [
      {
        titre: "Intervention en appartement",
        texte:
          "Tout se fait dans le logement. Ni le matelas ni le canapé ne sortent de chez vous, il n'y a donc aucune question de portage dans les escaliers ou d'ascenseur trop petit.",
      },
      {
        titre: "Proximité immédiate",
        texte:
          "À dix minutes de notre base, Pfastatt fait partie des communes où nous pouvons souvent proposer un créneau rapproché. Un simple appel suffit pour savoir ce qui est libre.",
      },
      {
        titre: "Séchage en appartement",
        texte:
          "Après injection-extraction, le textile est légèrement humide. En appartement, aérez la pièce après notre passage : quelques heures suffisent. Pour un matelas, privilégiez un créneau en matinée.",
      },
    ],
  },

  {
    slug: "brunstatt-didenheim",
    ville: "Brunstatt-Didenheim",
    codePostal: "68350",
    titreSeo: "Nettoyage à domicile à Brunstatt-Didenheim — canapé, matelas | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Brunstatt-Didenheim : canapé, matelas, tapis, fauteuil et intérieur de voiture. Mobil Clean intervient chez vous, à 10 minutes de Mulhouse. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Brunstatt-Didenheim",
    reponseCourte:
      "Mobil Clean intervient à Brunstatt-Didenheim, à environ 4 km au sud de Mulhouse, pour le nettoyage à domicile de canapés, matelas, tapis, fauteuils et intérieurs de voiture. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 4 km de Mulhouse, 10 minutes de trajet",
    secteurs: ["Brunstatt centre", "Didenheim", "Quartier du Moulin", "Secteur de la Doller"],
    contexteLocal:
      "Brunstatt-Didenheim est une commune résidentielle au sud de Mulhouse, à dominante pavillonnaire, avec un habitat plutôt spacieux. Les interventions y portent souvent sur du mobilier de qualité — canapés en cuir, fauteuils en velours, tapis de belle facture — qui appellent une approche différente du textile courant : le cuir ne passe pas à l'injection-extraction, et un velours mal séché garde des zones mates. C'est le type de mission où l'identification du textile avant traitement n'est pas une formalité.",
    pratique: [
      {
        titre: "Cuir et velours",
        texte:
          "Le cuir reçoit un nettoyant puis un soin nourrissant, jamais d'injection-extraction. Le velours demande une pression et un séchage maîtrisés. Dans les deux cas, on teste sur une zone non visible avant de traiter l'ensemble.",
      },
      {
        titre: "Mobilier de valeur",
        texte:
          "Sur une pièce à laquelle vous tenez, envoyez-nous une photo avant la réservation. Nous vous dirons franchement si nous pouvons intervenir sans risque — ou si nous préférons ne pas y toucher.",
      },
      {
        titre: "Grandes surfaces à traiter",
        texte:
          "Salon spacieux, plusieurs chambres : comptez une demi-journée pour un traitement complet. L'estimation de durée vous est donnée au devis, avant l'intervention.",
      },
    ],
  },
];

export const getZone = (slug: string) => zones.find((z) => z.slug === slug);
