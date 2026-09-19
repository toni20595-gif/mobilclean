#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════════
#  Déploie l'agent téléphonique sur Apps Script, en une commande.
#
#  À relancer à chaque fois que `agent-telephonique.gs` change. La même
#  URL /exec est conservée : le déploiement existant est MIS À JOUR, il
#  n'en est pas créé un nouveau. Donc rien à retoucher côté Vapi.
#
#  Le jeton secret n'est JAMAIS écrit dans le dépôt. Il vit dans
#  ~/.mobilclean-agent et n'est injecté qu'ici, dans une copie de
#  travail (Code.gs) que git ignore.
# ══════════════════════════════════════════════════════════════════
set -e

CONF="${CONF:-/c/Users/Toni2/.mobilclean-agent}"
ICI="$(cd "$(dirname "$0")" && pwd)"
LIBELLE="agent telephonique web"

JETON=$(grep '^GAS_TOKEN=' "$CONF" | cut -d= -f2-)
if [ -z "$JETON" ]; then
  echo "❌ GAS_TOKEN est vide dans $CONF"
  exit 1
fi

DEPART=$(grep '^GAS_DEPART=' "$CONF" | cut -d= -f2-)
if [ -z "$DEPART" ]; then
  echo "❌ GAS_DEPART est vide dans $CONF"
  exit 1
fi

# Le jeton ET l'adresse de départ sont injectés ici seulement : ni l'un
# ni l'autre ne doit se retrouver publié dans le dépôt GitHub.
echo "→ injection du jeton et de l'adresse de départ"
sed -e "s|REMPLACE-MOI-PAR-30-CARACTERES-AU-HASARD|$JETON|" \
    -e "s|ADRESSE-DE-DEPART-A-INJECTER|$DEPART|" \
    "$ICI/../agent-telephonique.gs" > "$ICI/Code.gs"

if ! grep -q "$JETON" "$ICI/Code.gs"; then
  echo "❌ le jeton n'a pas été injecté — le marqueur a-t-il été modifié ?"
  exit 1
fi

cd "$ICI"

if [ ! -f .clasp.json ]; then
  echo "→ création du projet Apps Script"
  clasp create-script --type standalone --title "Mobil Clean — agent telephonique" --rootDir .
fi

# ⚠️ À la création du projet, clasp RAPATRIE le manifeste par défaut de
# Google et écrase le nôtre : fuseau America/New_York, et aucune section
# `webapp`. Avec ce manifeste-là, tous les créneaux seraient calculés en
# heure de New York. On le réécrit donc systématiquement ici, juste avant
# l'envoi, à partir d'un modèle que clasp ne touche pas.
echo "→ remise en place du manifeste (Europe/Paris + application web)"
cp "$ICI/manifeste-modele.json" "$ICI/appsscript.json"

echo "→ envoi du code"
clasp push --force

DEPID=$(clasp list-deployments 2>/dev/null | grep -F "$LIBELLE" | awk '{print $2}' | head -1)

if [ -n "$DEPID" ]; then
  echo "→ mise à jour du déploiement existant (l'URL ne change pas)"
  clasp update-deployment "$DEPID" --description "$LIBELLE"
else
  echo "→ premier déploiement"
  clasp create-deployment --description "$LIBELLE"
  DEPID=$(clasp list-deployments 2>/dev/null | grep -F "$LIBELLE" | awk '{print $2}' | head -1)
fi

URL="https://script.google.com/macros/s/$DEPID/exec"

# On range l'URL dans le fichier de config, pour ne plus avoir à la
# recopier à la main nulle part.
if grep -q '^GAS_URL=' "$CONF"; then
  sed -i "s|^GAS_URL=.*|GAS_URL=$URL|" "$CONF"
else
  echo "GAS_URL=$URL" >> "$CONF"
fi

echo
echo "✅ Déployé. URL enregistrée dans $CONF"
