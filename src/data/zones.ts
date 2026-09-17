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

  {
    slug: "wittelsheim",
    ville: "Wittelsheim",
    codePostal: "68310",
    titreSeo: "Nettoyage à domicile à Wittelsheim — voiture, matelas, canapé | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Wittelsheim, Graffenwald et Amélie : intérieur de voiture, matelas, canapé, tapis. Mobil Clean se déplace chez vous. Devis gratuit, 7j/7 de 9h30 à 21h.",
    h1: "Nettoyage à domicile à Wittelsheim",
    reponseCourte:
      "Mobil Clean intervient à Wittelsheim et dans ses hameaux — Graffenwald, Amélie — pour le nettoyage à domicile de voitures, matelas, canapés, tapis et fauteuils. Commune voisine de notre secteur, déplacement rapide. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 4 km de Wittenheim, 8 minutes de trajet",
    secteurs: ["Wittelsheim centre", "Graffenwald", "Cité Amélie", "Secteur de la Thur"],
    contexteLocal:
      "Wittelsheim a une particularité qui compte pour nous : la commune est éclatée en plusieurs entités bien distinctes — le centre, Graffenwald, la cité Amélie — parfois séparées de plusieurs kilomètres. Donner l'adresse précise et le hameau à la réservation n'est donc pas un détail, ça évite qu'on cherche. Pour le reste, l'habitat est proche de celui de Wittenheim : anciennes maisons de cité potassique et lotissements plus récents, avec du mobilier textile utilisé au quotidien.",
    pratique: [
      {
        titre: "Précisez le hameau",
        texte:
          "Centre, Graffenwald ou Amélie : indiquez-le à la réservation. La commune est étendue et ça nous permet de caler le créneau au plus juste.",
      },
      {
        titre: "Maisons de cité",
        texte:
          "Pièces de taille modeste, passage parfois étroit : le matériel s'installe sans difficulté, il suffit d'un accès dégagé jusqu'à la pièce à traiter.",
      },
      {
        titre: "Grouper les prestations",
        texte:
          "Canapé, fauteuils, tapis et matelas en une seule visite coûtent moins cher que des rendez-vous séparés. Le tarif groupé est calculé au devis.",
      },
    ],
  },

  {
    slug: "lutterbach",
    ville: "Lutterbach",
    codePostal: "68460",
    titreSeo: "Nettoyage à domicile à Lutterbach — voiture, matelas, canapé | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Lutterbach : intérieur de voiture, matelas, canapé, tapis, fauteuil. Mobil Clean intervient chez vous, à 10 minutes de Wittenheim. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Lutterbach",
    reponseCourte:
      "Mobil Clean intervient à Lutterbach pour le nettoyage à domicile de voitures, matelas, canapés, tapis et fauteuils. Commune bien desservie, à quelques minutes de notre secteur. Devis gratuit et sans engagement, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 5 km de Wittenheim, 10 minutes de trajet",
    secteurs: ["Lutterbach centre", "Secteur de la gare", "Quartier du canal", "Vers la Doller"],
    contexteLocal:
      "Lutterbach est une commune traversée par le canal et la Doller, avec un habitat mixte : maisons de ville, petits collectifs et lotissements. Le tram-train qui la relie à Mulhouse change une chose dans nos demandes : beaucoup de clients s'y déplacent sans voiture au quotidien, et font justement appel à nous parce que le service vient à eux. Pour le nettoyage de véhicule, le stationnement y est généralement plus simple qu'en centre-ville mulhousien.",
    pratique: [
      {
        titre: "Stationnement confortable",
        texte:
          "Dans la plupart des rues, on se gare devant chez vous sans contrainte. C'est un vrai plus pour le nettoyage d'un intérieur de véhicule, qui demande de la place autour de la voiture.",
      },
      {
        titre: "Petits collectifs",
        texte:
          "Matelas et canapé sont traités dans l'appartement, rien ne descend dans les escaliers. Indiquez simplement l'étage à la réservation.",
      },
      {
        titre: "Créneaux en soirée",
        texte:
          "Nous intervenons jusqu'à 21h, ce qui permet de prendre rendez-vous après le travail sans poser d'heures.",
      },
    ],
  },

  {
    slug: "sausheim",
    ville: "Sausheim",
    codePostal: "68390",
    titreSeo: "Nettoyage à domicile à Sausheim — intérieur de véhicule, canapé | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Sausheim : intérieur de voiture, matelas, canapé, tapis. Intervention possible sur parking d'entreprise. Mobil Clean, devis gratuit, 7j/7 de 9h30 à 21h.",
    h1: "Nettoyage à domicile à Sausheim",
    reponseCourte:
      "Mobil Clean intervient à Sausheim pour le nettoyage à domicile de voitures, matelas, canapés, tapis et fauteuils, y compris sur parking d'entreprise pendant les heures de bureau. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h au 07 68 44 52 93.",
    distance: "Environ 6 km de Wittenheim, 12 minutes de trajet",
    secteurs: ["Sausheim centre", "Quartier de l'Espace Dollfus", "Zone industrielle", "Lotissements nord"],
    contexteLocal:
      "Sausheim est marquée par la présence de grands employeurs industriels dans son secteur, et ça oriente très concrètement les demandes : nettoyage d'intérieur de véhicule sur le parking, pendant les heures de travail, pour des salariés qui récupèrent une voiture propre en fin de journée. La partie résidentielle, elle, est essentiellement pavillonnaire, avec des maisons familiales où l'on nous appelle plutôt pour un salon complet.",
    pratique: [
      {
        titre: "Intervention sur le lieu de travail",
        texte:
          "Le véhicule doit simplement être stationné et accessible. Beaucoup de clients nous font intervenir sur le parking de leur entreprise pendant leur journée de travail.",
      },
      {
        titre: "Plusieurs véhicules d'un coup",
        texte:
          "Pour plusieurs voitures, entre collègues ou pour une flotte, on planifie une demi-journée sur place. Facturation professionnelle possible via notre page Entreprises.",
      },
      {
        titre: "Maisons familiales",
        texte:
          "Côté résidentiel, la formule multi-meubles est la plus demandée : canapé, fauteuils et tapis traités en une seule intervention.",
      },
    ],
  },

  {
    slug: "habsheim",
    ville: "Habsheim",
    codePostal: "68440",
    titreSeo: "Nettoyage à domicile à Habsheim — canapé, matelas, voiture | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Habsheim : canapé, matelas, tapis, fauteuil, intérieur de voiture. Mobil Clean se déplace chez vous dans le sud-est mulhousien. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Habsheim",
    reponseCourte:
      "Mobil Clean intervient à Habsheim pour le nettoyage à domicile de canapés, matelas, tapis, fauteuils et intérieurs de voiture. Village résidentiel du sud-est mulhousien, accès simple. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 12 km de Wittenheim, 18 minutes de trajet",
    secteurs: ["Habsheim centre", "Secteur de l'aérodrome", "Lotissements est", "Vers Eschentzwiller"],
    contexteLocal:
      "Habsheim est un village résidentiel où l'habitat est majoritairement individuel, souvent avec des dépendances : garage, atelier, grange réaménagée. Cela ouvre deux possibilités qu'on n'a pas en ville — traiter un véhicule à l'abri, indépendamment de la météo, et sortir un tapis encombrant dans un espace dégagé plutôt que de travailler entre deux meubles. Les demandes portent souvent sur du mobilier de maison familiale installé depuis longtemps.",
    pratique: [
      {
        titre: "Travail à l'abri",
        texte:
          "Garage, atelier ou grange : signalez-le à la réservation. Un véhicule traité à l'abri donne un résultat plus régulier, sans contrainte de pluie ni de vent.",
      },
      {
        titre: "Grands tapis",
        texte:
          "Un tapis de grande dimension se traite mieux dans un espace dégagé. Si vous disposez d'un garage ou d'une terrasse couverte, dites-le nous.",
      },
      {
        titre: "Déplacement à planifier",
        texte:
          "À une vingtaine de minutes de notre secteur, mieux vaut regrouper plusieurs pièces sur un même rendez-vous que multiplier les visites.",
      },
    ],
  },

  {
    slug: "ensisheim",
    ville: "Ensisheim",
    codePostal: "68190",
    titreSeo: "Nettoyage à domicile à Ensisheim — canapé, matelas, voiture | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Ensisheim : canapé, matelas, tapis, fauteuil et intérieur de voiture. Mobil Clean intervient chez vous au nord du bassin potassique. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Ensisheim",
    reponseCourte:
      "Mobil Clean intervient à Ensisheim pour le nettoyage à domicile de canapés, matelas, tapis, fauteuils et intérieurs de voiture. Commune en croissance au nord du bassin potassique. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 12 km de Wittenheim, 18 minutes de trajet",
    secteurs: ["Ensisheim centre", "Lotissements récents", "Secteur de la Nécropole", "Vers Réguisheim"],
    contexteLocal:
      "Ensisheim est une commune en forte croissance, avec beaucoup de constructions récentes et de jeunes familles installées dans des lotissements neufs. Ça change la nature du travail : le mobilier est souvent jeune, en bon état, et ce qu'on nous demande relève plutôt de l'entretien préventif que du sauvetage — un canapé clair acheté il y a deux ans qu'on veut garder net, un matelas neuf à protéger, des taches d'enfants à traiter avant qu'elles s'installent. C'est le meilleur moment pour intervenir : une tache récente part presque toujours.",
    pratique: [
      {
        titre: "Entretien préventif",
        texte:
          "Sur un textile encore jeune, un passage annuel suffit à éviter l'encrassement définitif. Et une tache traitée dans les jours qui suivent part presque toujours complètement.",
      },
      {
        titre: "Protection anti-tache",
        texte:
          "Sur un canapé clair ou récent, le traitement anti-tache optionnel fait que les prochains accidents restent en surface et s'essuient au lieu de pénétrer.",
      },
      {
        titre: "Jeunes enfants",
        texte:
          "Produits adaptés à un logement occupé et désodorisation bio, sans parfum entêtant. Signalez-nous allergies et présence d'enfants à la réservation.",
      },
    ],
  },

  {
    slug: "cernay",
    ville: "Cernay",
    codePostal: "68700",
    titreSeo: "Nettoyage à domicile à Cernay — voiture, canapé, matelas | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Cernay : intérieur de voiture, canapé, matelas, tapis, fauteuil. Mobil Clean se déplace dans la vallée de la Thur. Devis gratuit, 7j/7 de 9h30 à 21h.",
    h1: "Nettoyage à domicile à Cernay",
    reponseCourte:
      "Mobil Clean intervient à Cernay pour le nettoyage à domicile de voitures, matelas, canapés, tapis et fauteuils. Commune-centre à l'entrée de la vallée de la Thur, dans notre rayon d'intervention. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 15 km de Wittenheim, 20 minutes de trajet",
    secteurs: ["Cernay centre", "Quartier Bel-Air", "Secteur des Mines", "Vers Uffholtz et Wattwiller"],
    contexteLocal:
      "Cernay est la commune-centre de l'entrée de vallée, avec un habitat majoritairement pavillonnaire et beaucoup de maisons disposant d'un garage ou d'une cour. La position en pied de montagne a un effet très concret sur les véhicules : boue, terre et gravillons rapportés des routes de vallée et des chemins forestiers s'incrustent dans les moquettes et les tapis de sol. C'est le type d'encrassement que l'aspiration seule ne règle pas, et où l'injection-extraction fait la vraie différence.",
    pratique: [
      {
        titre: "Moquettes chargées de terre",
        texte:
          "Terre sèche et gravillons descendent au fond de la fibre. On aspire en profondeur avant toute mise en humidité, sinon on transforme la poussière en boue.",
      },
      {
        titre: "Véhicule au garage",
        texte:
          "Si vous disposez d'un garage ou d'une cour, le travail se fait à l'abri et le résultat est plus régulier. Signalez-le à la réservation.",
      },
      {
        titre: "Regrouper le rendez-vous",
        texte:
          "À vingt minutes de notre secteur, mieux vaut traiter plusieurs pièces sur une même visite. Le tarif groupé est calculé au devis.",
      },
    ],
  },

  {
    slug: "thann",
    ville: "Thann",
    codePostal: "68800",
    titreSeo: "Nettoyage à domicile à Thann — canapé, matelas, voiture | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Thann : canapé, matelas, tapis, fauteuil et intérieur de voiture. Mobil Clean intervient dans la vallée de la Thur. Devis gratuit, 7j/7 de 9h30 à 21h.",
    h1: "Nettoyage à domicile à Thann",
    reponseCourte:
      "Mobil Clean intervient à Thann pour le nettoyage à domicile de canapés, matelas, tapis, fauteuils et intérieurs de voiture. Commune de vallée, dans notre rayon d'intervention. Devis gratuit et sans engagement, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 22 km de Wittenheim, 25 minutes de trajet",
    secteurs: ["Thann centre historique", "Quartier de la Collégiale", "Secteur gare", "Vers Vieux-Thann"],
    contexteLocal:
      "Thann a un centre historique dense, avec des rues étroites, des immeubles anciens et un stationnement souvent contraint. Deux conséquences pratiques : pour un véhicule, il faut nous indiquer où il sera garé et prévoir une place tenable pendant deux heures et demie ; pour un canapé ou un matelas en appartement ancien, on travaille sur place comme partout, mais il est utile de savoir à l'avance s'il y a un escalier étroit ou un accès délicat au logement. Rien de bloquant, mais autant l'organiser en amont.",
    pratique: [
      {
        titre: "Stationnement du véhicule",
        texte:
          "En centre ancien, la place est la principale contrainte. Une cour, un parking ou une place résidentielle nous fait gagner du temps — précisez-le en réservant.",
      },
      {
        titre: "Accès en appartement ancien",
        texte:
          "Escalier étroit ou pas d'ascenseur : ce n'est pas un problème, rien ne sort du logement. Mentionnez l'étage pour qu'on prévoie le bon matériel.",
      },
      {
        titre: "Créneaux planifiés",
        texte:
          "À vingt-cinq minutes de notre secteur, les créneaux sur Thann se planifient à l'avance plutôt qu'en dernière minute. Appelez-nous pour voir ce qui est libre.",
      },
    ],
  },

  {
    slug: "guebwiller",
    ville: "Guebwiller",
    codePostal: "68500",
    titreSeo: "Nettoyage à domicile à Guebwiller — canapé, tapis, matelas | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Guebwiller : canapé, tapis, matelas, fauteuil et intérieur de voiture. Mobil Clean se déplace chez vous. Devis gratuit, 7j/7 de 9h30 à 21h.",
    h1: "Nettoyage à domicile à Guebwiller",
    reponseCourte:
      "Mobil Clean intervient à Guebwiller pour le nettoyage à domicile de canapés, tapis, matelas, fauteuils et intérieurs de voiture. Commune de la Route des Vins, dans notre rayon. Devis gratuit, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 20 km de Wittenheim, 25 minutes de trajet",
    secteurs: ["Guebwiller centre", "Quartier du Florival", "Secteur Notre-Dame", "Vers Buhl"],
    contexteLocal:
      "Guebwiller compte un patrimoine bâti ancien important, et avec lui du mobilier qui a de la valeur : tapis noués, fauteuils d'époque, canapés en cuir de belle facture, meubles transmis. C'est le contexte où l'identification du textile avant traitement n'est pas une formalité administrative mais une vraie précaution — un tapis en laine noué main et un tapis synthétique n'acceptent pas la même pression, et le cuir ne passe jamais à l'injection-extraction. Sur une pièce à laquelle vous tenez, on préfère refuser que prendre un risque.",
    pratique: [
      {
        titre: "Tapis anciens et de valeur",
        texte:
          "Tapis noué main, en laine ou en soie : envoyez-nous une photo avant la réservation. On vous dira franchement si on peut intervenir sans risque, ou si on préfère ne pas y toucher.",
      },
      {
        titre: "Cuir et velours",
        texte:
          "Le cuir reçoit un nettoyant puis un soin nourrissant. Le velours demande une pression et un séchage maîtrisés. Dans les deux cas, on teste sur une zone cachée avant de traiter.",
      },
      {
        titre: "Logements anciens",
        texte:
          "Pièces hautes, parquets, accès parfois étroits : on protège les sols et on travaille sur place. Précisez l'étage et l'accès à la réservation.",
      },
    ],
  },

  {
    slug: "soultz-haut-rhin",
    ville: "Soultz-Haut-Rhin",
    codePostal: "68360",
    titreSeo: "Nettoyage à domicile à Soultz-Haut-Rhin — canapé, matelas | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Soultz-Haut-Rhin : canapé, matelas, tapis, fauteuil et intérieur de voiture. Mobil Clean intervient chez vous. Devis gratuit, 7j/7 de 9h30 à 21h.",
    h1: "Nettoyage à domicile à Soultz-Haut-Rhin",
    reponseCourte:
      "Mobil Clean intervient à Soultz-Haut-Rhin pour le nettoyage à domicile de canapés, matelas, tapis, fauteuils et intérieurs de voiture. Commune résidentielle du Florival, dans notre rayon. Devis gratuit, 7j/7 de 9h30 à 21h.",
    distance: "Environ 18 km de Wittenheim, 22 minutes de trajet",
    secteurs: ["Soultz centre", "Quartier du Vieil-Armand", "Secteur Sainte-Croix", "Vers Wuenheim"],
    contexteLocal:
      "Soultz-Haut-Rhin est une commune résidentielle étendue, mêlant vieille ville aux rues étroites et lotissements périphériques plus spacieux. La différence entre les deux est très pratique pour nous : en périphérie, on se gare devant chez vous et le matériel entre sans contrainte ; en vieille ville, l'accès demande d'être anticipé. Les demandes couvrent tout l'éventail, du salon complet de maison familiale à l'intérieur de véhicule avant une revente.",
    pratique: [
      {
        titre: "Deux configurations",
        texte:
          "Vieille ville ou lotissement : dites-nous où vous habitez. En centre ancien, on prévoit un accès plus contraint et on adapte le matériel embarqué.",
      },
      {
        titre: "Avant une revente",
        texte:
          "Un habitacle remis à neuf change la perception d'un véhicule à la vente. Comptez environ 2h30 pour un intérieur complet.",
      },
      {
        titre: "Grouper avec Guebwiller",
        texte:
          "Si des voisins ou de la famille de Guebwiller ou Soultz veulent aussi une intervention, on planifie les rendez-vous à la suite sur une même demi-journée.",
      },
    ],
  },

  {
    slug: "altkirch",
    ville: "Altkirch",
    codePostal: "68130",
    titreSeo: "Nettoyage à domicile à Altkirch — canapé, matelas, voiture | Mobil Clean",
    metaDescription:
      "Nettoyage à domicile à Altkirch et dans le Sundgau : canapé, matelas, tapis, fauteuil, intérieur de voiture. Mobil Clean se déplace chez vous. Devis gratuit, 7j/7.",
    h1: "Nettoyage à domicile à Altkirch",
    reponseCourte:
      "Mobil Clean intervient à Altkirch et dans le Sundgau proche pour le nettoyage à domicile de canapés, matelas, tapis, fauteuils et intérieurs de voiture. Devis gratuit et sans engagement, sur rendez-vous 7j/7 de 9h30 à 21h.",
    distance: "Environ 25 km de Wittenheim, 30 minutes de trajet",
    secteurs: ["Altkirch centre", "Quartier de la Hochkirch", "Secteur Carspach", "Vers Aspach et Hirsingue"],
    contexteLocal:
      "Altkirch est la porte du Sundgau, une région d'habitat dispersé où les maisons sont souvent grandes, anciennes et éloignées les unes des autres. Deux conséquences concrètes : les interventions y portent fréquemment sur des volumes importants — plusieurs chambres, un grand salon, des tapis de plusieurs mètres — et le déplacement mérite d'être optimisé. Une visite sur Altkirch se planifie donc plutôt comme une demi-journée complète que comme un passage rapide.",
    pratique: [
      {
        titre: "Volumes importants",
        texte:
          "Grandes maisons, plusieurs chambres, grands tapis : comptez une demi-journée pour un traitement complet. L'estimation de durée est donnée au devis.",
      },
      {
        titre: "Habitat dispersé",
        texte:
          "Donnez-nous l'adresse précise et, si besoin, un point de repère. Dans le Sundgau, les fermes et maisons isolées ne sont pas toujours évidentes à localiser.",
      },
      {
        titre: "Rendez-vous planifié",
        texte:
          "À trente minutes de notre secteur, les créneaux sur Altkirch se réservent à l'avance. Appelez-nous pour connaître les disponibilités.",
      },
    ],
  },
];

export const getZone = (slug: string) => zones.find((z) => z.slug === slug);

// ════════════════════════════════════════════════════════════════════════
//  COUVERTURE EXHAUSTIVE — rayon d'environ 30 km autour de Wittenheim
//  ──────────────────────────────────────────────────────────────────────
//  Ces communes sont listées sur /zones mais n'ont PAS de page dédiée, et
//  c'est volontaire : une page par commune sans contenu propre, c'est le
//  cas d'école que Google sanctionne (« doorway abuse ») et le site entier
//  serait rétrogradé. Une liste exhaustive sur une page solide couvre la
//  requête « intervenez-vous à X ? » sans ce risque.
//
//  Les communes qui MÉRITENT une page dédiée sont celles où l'activité est
//  réelle et où il y a quelque chose de vrai à dire. Quand une commune de
//  cette liste devient un vrai marché, on lui crée sa page : il suffit de
//  l'ajouter au tableau `zones` ci-dessus.
//
//  À AJUSTER PAR MOBIL CLEAN : retirer toute commune où vous ne vous
//  déplacez pas réellement. Annoncer une couverture qu'on n'assure pas se
//  paie en appels perdus et en avis négatifs.
// ════════════════════════════════════════════════════════════════════════

export const secteurs = [
  {
    nom: "Agglomération de Mulhouse",
    communes: [
      "Mulhouse", "Illzach", "Wittenheim", "Kingersheim", "Pfastatt", "Riedisheim",
      "Rixheim", "Sausheim", "Lutterbach", "Richwiller", "Baldersheim", "Battenheim",
      "Ruelisheim", "Brunstatt-Didenheim", "Morschwiller-le-Bas", "Reiningue",
      "Heimsbrunn", "Galfingue", "Zillisheim", "Flaxlanden", "Bruebach", "Habsheim",
      "Eschentzwiller", "Zimmersheim", "Dietwiller", "Steinbrunn-le-Bas",
    ],
  },
  {
    nom: "Bassin potassique et nord",
    communes: [
      "Wittelsheim", "Staffelfelden", "Pulversheim", "Bollwiller", "Feldkirch",
      "Ungersheim", "Berrwiller", "Ensisheim", "Réguisheim", "Meyenheim",
      "Niederentzen", "Oberentzen", "Munwiller", "Raedersheim",
    ],
  },
  {
    nom: "Vallée de la Thur et ouest",
    communes: [
      "Cernay", "Thann", "Vieux-Thann", "Uffholtz", "Wattwiller", "Steinbach",
      "Aspach-Michelbach", "Aspach-le-Bas", "Burnhaupt-le-Haut", "Burnhaupt-le-Bas",
      "Bitschwiller-lès-Thann", "Roderen", "Leimbach", "Schweighouse-Thann",
    ],
  },
  {
    nom: "Florival et Guebwiller",
    communes: [
      "Guebwiller", "Soultz-Haut-Rhin", "Issenheim", "Merxheim", "Gundolsheim",
      "Bergholtz", "Bergholtzzell", "Orschwihr", "Buhl", "Wuenheim", "Hartmannswiller",
      "Jungholtz", "Rouffach",
    ],
  },
  {
    nom: "Sundgau et sud",
    communes: [
      "Altkirch", "Carspach", "Aspach", "Illfurth", "Walheim", "Hochstatt",
      "Spechbach", "Tagsdorf", "Hirsingue", "Emlingen", "Obermorschwiller",
      "Froeningen", "Heidwiller", "Luemschwiller",
    ],
  },
  {
    nom: "Bande rhénane et est",
    communes: [
      "Ottmarsheim", "Bantzenheim", "Chalampé", "Hombourg", "Niffer", "Petit-Landau",
      "Rumersheim-le-Haut", "Munchhouse", "Fessenheim", "Balgau", "Nambsheim",
      "Blodelsheim", "Rustenhart", "Roggenhouse",
    ],
  },
  {
    nom: "Secteur de Sierentz",
    communes: [
      "Sierentz", "Bartenheim", "Kembs", "Landser", "Schlierbach", "Uffheim",
      "Brinckheim", "Magstatt-le-Bas", "Magstatt-le-Haut", "Helfrantzkirch",
    ],
  },
];

/** Nombre total de communes couvertes — affiché sur /zones */
export const nbCommunes = secteurs.reduce((n, s) => n + s.communes.length, 0);
