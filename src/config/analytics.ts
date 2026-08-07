/**
 * Suivi des conversions Google Ads.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * COMMENT REMPLIR (une seule fois, 5 minutes) :
 *
 * 1. Google Ads > Objectifs > Conversions > "Créer une action de conversion"
 * 2. Choisir "Site Web", entrer mobilclean.fr, puis "Ajouter manuellement
 *    une action de conversion".
 * 3. Créer DEUX actions :
 *      - Catégorie "Contact par téléphone"  → nom : "Clic téléphone site"
 *      - Catégorie "Envoyer un formulaire de prospect" → nom : "Formulaire contact"
 * 4. À l'écran "Installer la balise", Google affiche un extrait du type :
 *      gtag('event', 'conversion', {'send_to': 'AW-123456789/AbC-D_efGh12345'})
 *    → la partie AVANT le "/" est GOOGLE_ADS_ID
 *    → la partie APRÈS le "/" est le label de l'action
 * 5. Reporter les 3 valeurs ci-dessous, puis redéployer.
 *
 * ⚠️ Tant que GOOGLE_ADS_ID est vide, AUCUN script Google n'est chargé et
 * AUCUNE bannière cookies ne s'affiche : le site reste exactement comme avant.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Identifiant du compte Google Ads, format "AW-XXXXXXXXX". Vide = suivi désactivé. */
export const GOOGLE_ADS_ID = "AW-18221889469";

/** Labels des actions de conversion (partie après le "/" du send_to). */
export const CONVERSION_LABELS = {
  /** Clic sur un numéro de téléphone (lien tel:) — action "Contact telephone" */
  phoneClick: "yYhxCIKsz90cEL3v7_BD",
  /** Envoi réussi d'un formulaire de contact ou de devis entreprise — action "Envoi de formulaire de lead" */
  formSubmit: "J2AcCP-rz90cEL3v7_BD",
};

/** Le suivi n'est actif que si un identifiant a été renseigné. */
export const analyticsEnabled = GOOGLE_ADS_ID.trim() !== "";
