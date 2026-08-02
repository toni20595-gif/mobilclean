/**
 * Catalogue boutique — produits d'entretien vendus en ligne.
 *
 * Le paiement / la commande sont gérés par Shopify (Buy Button SDK).
 * `shopifyId` = identifiant PRODUIT Shopify, utilisé pour monter le bouton
 * « Ajouter au panier » dans /boutique.
 *
 * ⚠️ Le `prix` affiché ici est recopié depuis Shopify pour la mise en page et
 * le référencement (données structurées Product). Le prix RÉELLEMENT facturé
 * est toujours celui de Shopify au moment du paiement.
 * → Si un prix change dans l'admin Shopify, le mettre à jour ici aussi.
 *
 * Boutique Shopify : dvn0u6-j4.myshopify.com
 */

export interface Produit {
  id: string;
  shopifyId: string;
  handle: string;
  categorie: string;
  titre: string;
  soustitre: string;
  accroche: string;
  prix: number;
  prixAffiche: string;
  contenance: string;
  image: string;
  alt: string;
  points: string[];
  astuce?: string;
  reserve?: string;
  vedette?: boolean;
}

export const produits: Produit[] = [
  {
    id: "soin-cuir",
    shopifyId: "16060298363205",
    handle: "leather-spot-cleaner",
    categorie: "Soin du cuir",
    titre: "Soin Nourrissant Cuir Premium",
    soustitre: "Lanoline & huile de tournesol",
    accroche:
      "Le cuir est une peau : il sèche, il se tend, puis il finit par se fendre — d'abord sur l'assise du conducteur, ensuite sur le volant. Ce soin lui rend sa souplesse et sa profondeur de teinte, sans le rendre glissant.",
    prix: 29.99,
    prixAffiche: "29,99 €",
    contenance: "100 ml",
    image: "/images/boutique/cuir.jpg",
    alt: "Flacon de soin nourrissant pour cuir automobile, 100 ml",
    points: [
      "Huiles nourrissantes naturelles : lanoline, tournesol",
      "Sans silicone, sans solvant, sans détergent",
      "Sièges, volant, levier, accoudoirs, garnitures",
      "Convient aussi aux canapés cuir et à la maroquinerie",
      "Fini satiné, non gras, sans odeur chimique",
    ],
    astuce:
      "Deux à trois applications par an suffisent. Sur un cuir déjà sec, comptez deux passages à une semaine d'intervalle.",
    reserve: "Ne convient pas au daim, au nubuck ni aux cuirs suédés.",
    vedette: true,
  },
  {
    id: "spray-interieur",
    shopifyId: "16052904165701",
    handle: "car-interior-spray",
    categorie: "Habitacle",
    titre: "Spray Nettoyant Intérieur Auto",
    soustitre: "Multi-surfaces, sans rinçage",
    accroche:
      "Sièges, tableau de bord, plastiques, moquettes. Une vaporisation, un coup de microfibre, c'est propre.",
    prix: 20.0,
    prixAffiche: "20,00 €",
    contenance: "100 ml",
    image: "/images/boutique/interieur.jpg",
    alt: "Spray nettoyant pour intérieur de voiture, 100 ml",
    points: [
      "Tissu, plastique, vinyle, moquette",
      "Sans rinçage, séchage rapide",
      "Fini mat, sans film gras ni brillance artificielle",
      "Élimine les odeurs incrustées",
    ],
    astuce: "Sur une tache ancienne, laissez agir une minute avant d'essuyer.",
  },
  {
    id: "spray-pneus",
    shopifyId: "16052956266821",
    handle: "car-tire-cleaner-spray-decontamination",
    categorie: "Extérieur",
    titre: "Spray Nettoyant Pneus",
    soustitre: "Noir profond, sans frotter",
    accroche:
      "Dissout la poussière de frein et le voile grisâtre qui ternit le caoutchouc. Le noir d'origine revient en quelques secondes, sans frotter.",
    prix: 19.99,
    prixAffiche: "19,99 €",
    contenance: "120 ml",
    image: "/images/boutique/pneus.jpg",
    alt: "Spray nettoyant pour pneus de voiture, 120 ml",
    points: [
      "Convient à tous types de pneus",
      "Formule sans solvant agressif, respecte la gomme",
      "Aussi sur passages de roue et bavettes",
      "Aucun outil nécessaire",
    ],
    astuce: "Appliquez sur pneu froid, à l'ombre, pour un résultat homogène.",
  },
  {
    id: "spray-ceramique",
    shopifyId: "16052955316549",
    handle: "car-coating-spray",
    categorie: "Carrosserie",
    titre: "Spray Protection Céramique Graphène",
    soustitre: "Effet hydrophobe",
    accroche:
      "L'eau perle au lieu de stagner, la peinture reprend de la profondeur, la saleté accroche beaucoup moins entre deux lavages.",
    prix: 19.99,
    prixAffiche: "19,99 €",
    contenance: "120 ml",
    image: "/images/boutique/ceramique.jpg",
    alt: "Spray de protection céramique au graphène pour carrosserie, 120 ml",
    points: [
      "Formule graphène + dioxyde de silicium (SiO₂)",
      "L'eau perle immédiatement",
      "Peinture, vernis, verre, jantes, plastiques extérieurs",
      "S'applique après lavage, section par section",
    ],
    astuce: "Travaillez à l'ombre, sur carrosserie froide. Jamais en plein soleil.",
  },
];

/** Boutique Shopify utilisée pour le paiement. */
export const shopify = {
  domain: "dvn0u6-j4.myshopify.com",
  storefrontAccessToken: "d9ac71392ed41776dddcb153342ad45a",
};

/** Délai de livraison annoncé (obligation d'information — art. L.111-1 code de la consommation). */
export const livraison = {
  delai: "13 à 22 jours",
  zone: "France et Union européenne",
};
