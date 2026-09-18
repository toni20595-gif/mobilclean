// ════════════════════════════════════════════════════════════════════════
//  FAQ GÉNÉRALE — source unique
//  ──────────────────────────────────────────────────────────────────────
//  Utilisée par la page /faq ET par le chatbot. Une seule source, pour
//  qu'une réponse corrigée le soit partout.
//
//  À VÉRIFIER PAR MOBIL CLEAN : paiement, annulation et garantie reprennent
//  ce qui est annoncé ailleurs sur le site. Si votre pratique diffère,
//  corrigez ici — une FAQ qui promet ce que vous ne faites pas se paie en
//  avis négatifs.
// ════════════════════════════════════════════════════════════════════════

export interface QuestionFaq {
  question: string;
  reponse: string;
  /** Mots-clés supplémentaires pour le chatbot (l'utilisateur ne tape pas la question mot pour mot) */
  motsCles?: string[];
}

export interface BlocFaq {
  categorie: string;
  questions: QuestionFaq[];
}

export const faq: BlocFaq[] = [
  {
    categorie: "Avant l'intervention",
    questions: [
      {
        question: "Comment se passe une intervention à domicile ?",
        motsCles: ["deroule", "passe", "comment ca marche", "domicile", "materiel", "sur place"],
        reponse:
          "Nous arrivons chez vous avec tout le matériel : machine d'injection-extraction, nettoyeur vapeur, produits. Nous faisons d'abord le tour des pièces à traiter avec vous pour repérer les taches, puis nous intervenons sur place. Rien ne sort de votre logement : ni le matelas, ni le canapé, ni le tapis.",
      },
      {
        question: "Faut-il être présent pendant l'intervention ?",
        motsCles: ["present", "presence", "absent", "rester", "obligé"],
        reponse:
          "Oui, au moins à l'arrivée et au départ. À l'arrivée pour valider ensemble ce qui est à traiter, au départ pour contrôler le résultat avec nous. Entre les deux, vous faites ce que vous voulez — vous n'avez pas à rester à côté.",
      },
      {
        question: "Quel est le délai pour obtenir un rendez-vous ?",
        motsCles: ["delai", "attente", "vite", "rapidement", "quand", "disponibilite"],
        reponse:
          "Vous choisissez vos disponibilités en ligne et nous confirmons le créneau sous 24 heures. Il y a souvent de la place dans les 48 heures, surtout sur Mulhouse et les communes proches. Les créneaux du week-end et de soirée partent plus vite.",
      },
      {
        question: "Le devis est-il payant ?",
        motsCles: ["devis", "gratuit", "payant", "estimation"],
        reponse:
          "Non. Le devis est gratuit et sans engagement. Vous connaissez le montant total avant que nous nous déplacions — pas de surprise à la fin de l'intervention.",
      },
      {
        question: "Faut-il prévoir de l'eau ou de l'électricité ?",
        motsCles: ["eau", "electricite", "prise", "courant", "branchement"],
        reponse:
          "Un accès à une prise électrique est le plus pratique. Si vous n'en avez pas — une voiture sur un parking, par exemple — dites-le nous à la réservation et nous adaptons l'intervention.",
      },
    ],
  },
  {
    categorie: "Pendant et après",
    questions: [
      {
        question: "Combien de temps dure une intervention ?",
        motsCles: ["duree", "temps", "longtemps", "heures", "creneau"],
        reponse:
          "Nos créneaux sont de 2h30. Un matelas seul prend environ une heure, un canapé une à deux heures selon la taille, un intérieur de voiture complet environ 2h30. Pour plusieurs meubles, comptez une demi-journée — la durée estimée vous est donnée au devis.",
      },
      {
        question: "Combien de temps faut-il pour que ça sèche ?",
        motsCles: ["sechage", "seche", "humide", "mouille", "secher"],
        reponse:
          "Quelques heures dans une pièce aérée. L'injection-extraction réaspire l'eau immédiatement : le textile est légèrement humide au toucher juste après notre passage, jamais détrempé. Pour un matelas, prenez un créneau en matinée pour être tranquille au coucher.",
      },
      {
        question: "Vos produits sont-ils sans danger avec des enfants ou des animaux ?",
        motsCles: ["produits", "danger", "toxique", "enfant", "bebe", "animaux", "chien", "chat", "allergie", "ecologique", "bio"],
        reponse:
          "Nos produits sont choisis pour être utilisés dans des logements occupés, et la désodorisation est bio, sans parfum entêtant. Signalez-nous à la réservation toute allergie, ou la présence de jeunes enfants et d'animaux : nous adaptons les produits en conséquence.",
      },
      {
        question: "Et si le résultat ne me convient pas ?",
        motsCles: ["satisfait", "garantie", "remboursement", "mecontent", "rate", "convient"],
        reponse:
          "Nous contrôlons le résultat avec vous avant de partir, c'est le moment de le dire. Notre engagement est simple : satisfaction garantie, ou nous revenons sans frais supplémentaires.",
      },
      {
        question: "Toutes les taches partent-elles ?",
        motsCles: ["tache", "taches", "detachage", "auréole", "partir", "enlever"],
        reponse:
          "La grande majorité des taches courantes partent. Certaines taches très anciennes, ou qui ont déteint sur la fibre, peuvent laisser une ombre. Nous vous le disons au moment du devis, avant de commencer — pas après.",
      },
    ],
  },
  {
    categorie: "Pratique",
    questions: [
      {
        question: "Quelle est votre zone d'intervention ?",
        motsCles: ["zone", "secteur", "ville", "commune", "deplacement", "kilometre", "loin"],
        reponse:
          "Nous sommes basés à Mulhouse et intervenons dans l'agglomération et tout le Haut-Rhin : Illzach, Riedisheim, Wittenheim, Kingersheim, Rixheim, Pfastatt, Brunstatt-Didenheim et les communes alentour. Si la vôtre n'est pas listée, appelez-nous : nous vous dirons tout de suite si nous pouvons venir.",
      },
      {
        question: "Quels sont vos horaires ?",
        motsCles: ["horaire", "heures", "ouvert", "dimanche", "samedi", "weekend", "soir", "soiree"],
        reponse:
          "Nous intervenons sept jours sur sept, de 9h30 à 21h. Les créneaux en soirée permettent de caler un rendez-vous après le travail, et ceux du week-end sont les plus demandés.",
      },
      {
        question: "Comment régler l'intervention ?",
        motsCles: ["paiement", "payer", "regler", "carte", "especes", "virement", "cheque"],
        reponse:
          "Nous acceptons les espèces, la carte bancaire et le virement. Le règlement se fait à la fin de l'intervention, une fois le résultat validé avec vous.",
      },
      {
        question: "Puis-je annuler ou déplacer mon rendez-vous ?",
        motsCles: ["annuler", "annulation", "reporter", "decaler", "changer", "modifier"],
        reponse:
          "Oui. Appelez-nous au 07 68 44 52 93 dès que vous le savez et nous trouvons un autre créneau. Plus vous prévenez tôt, plus il est facile de vous replacer rapidement.",
      },
      {
        question: "Intervenez-vous pour les entreprises ?",
        motsCles: ["entreprise", "professionnel", "pro", "societe", "hotel", "garage", "bureau", "facture", "flotte"],
        reponse:
          "Oui : hôtels, garages, bureaux, locaux professionnels et flottes de véhicules, avec facturation professionnelle et possibilité de contrat d'entretien. Tout est détaillé sur notre page Entreprises.",
      },
    ],
  },
];
