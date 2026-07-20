/**
 * MOBIL CLEAN — Disponibilités des créneaux
 * ==================================================================
 * Renvoie au site la liste des créneaux RÉELLEMENT RÉSERVABLES.
 *
 *   Tous les créneaux, 7 j/7          (tout est ouvert par défaut)
 * – ceux occupés dans l'agenda Google (RDV confirmé OU indispo perso)
 * = ce que le client voit sur le site
 *
 * ⚠️ AUCUNE Google Sheet nécessaire : ce script est un projet INDÉPENDANT.
 * Ton agenda est la seule source de vérité.
 *
 * ── COMMENT TU FERMES UN CRÉNEAU ──
 * Tu poses simplement un événement dans ton agenda mobilclean68 :
 *   • un RDV confirmé              -> le créneau disparaît du site
 *   • "Indispo" de 14h à 16h       -> ce créneau-là disparaît
 *   • un événement "journée entière" -> toute la journée disparaît
 * Rien d'autre à gérer, rien à cocher nulle part.
 *
 * ── INSTALLATION (une seule fois) ──
 *  1. script.google.com -> Nouveau projet (ou celui déjà ouvert)
 *  2. Coller ce fichier en entier (Ctrl+A puis Ctrl+V), Ctrl+S
 *  3. ⚠️ Paramètres du projet -> Fuseau horaire -> (GMT+01:00) Europe/Paris
 *  4. Sélectionner  testerDispos  -> Exécuter -> autoriser l'accès
 *     (le journal doit afficher une liste de créneaux)
 *  5. Déployer -> Nouveau déploiement -> Application Web
 *       • Exécuter en tant que : Moi
 *       • Qui a accès        : Tout le monde
 *  6. Copier l'URL qui finit par /exec -> la transmettre à Claude
 *
 * Réponse : {"disponibles":["2026-07-21|10","2026-07-21|14"]}
 * Clé      : AAAA-MM-JJ|heureDeDebut
 * Si l'agenda est introuvable -> {"disponibles":null} = le site laisse tout
 * disponible (on ne coupe jamais les réservations par accident).
 */

// ─────────────────────── CONFIG ───────────────────────
var CALENDAR_ID = 'mobilclean68@gmail.com';   // agenda source de vérité
var NB_JOURS = 14;                            // fenêtre de réservation
var CACHE_SECONDES = 120;                     // le site voit tes changements sous ~2 min

var HORAIRES = [                              // doit rester aligné avec le site
  { debut: 10, fin: 12 },
  { debut: 14, fin: 16 },
  { debut: 17, fin: 19 }
];
// ──────────────────────────────────────────────────────

/** Appelé par le site. */
function doGet() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get('dispos');
  if (cached) return _json(cached);

  var payload = JSON.stringify({ disponibles: _calculerDisponibles() });
  cache.put('dispos', payload, CACHE_SECONDES);
  return _json(payload);
}

function _calculerDisponibles() {
  var cal = CalendarApp.getCalendarById(CALENDAR_ID);

  // Agenda introuvable (mauvais ID, ou non partagé avec ce compte)
  // -> null = le site laisse tout disponible plutôt que de tout bloquer.
  if (!cal) return null;

  var tz = Session.getScriptTimeZone();
  var base = new Date(); base.setHours(0, 0, 0, 0);

  var debutFenetre = new Date(base); debutFenetre.setDate(base.getDate() + 1);
  var finFenetre = new Date(base);   finFenetre.setDate(base.getDate() + NB_JOURS + 1);

  // Un seul appel à l'agenda, puis test de chevauchement en mémoire
  var events = cal.getEvents(debutFenetre, finFenetre);

  var dispos = [];
  for (var i = 1; i <= NB_JOURS; i++) {
    var jour = new Date(base);
    jour.setDate(base.getDate() + i);
    var cle = Utilities.formatDate(jour, tz, 'yyyy-MM-dd');

    for (var j = 0; j < HORAIRES.length; j++) {
      var h = HORAIRES[j];
      var deb = new Date(jour); deb.setHours(h.debut, 0, 0, 0);
      var fin = new Date(jour); fin.setHours(h.fin, 0, 0, 0);
      if (_chevauche(events, deb, fin)) continue;   // occupé -> pas proposé
      dispos.push(cle + '|' + h.debut);
    }
  }
  return dispos;
}

/**
 * Test manuel : sélectionne cette fonction, clique Exécuter,
 * puis regarde le "Journal d'exécution".
 * - Une liste de créneaux  -> tout va bien
 * - "disponibles":null     -> l'agenda n'est pas accessible depuis ce compte
 */
function testerDispos() {
  CacheService.getScriptCache().remove('dispos');
  var d = _calculerDisponibles();
  if (d === null) {
    Logger.log('⚠️ Agenda "' + CALENDAR_ID + '" introuvable depuis ce compte Google.');
    Logger.log('   -> connecte-toi avec mobilclean68@gmail.com, ou partage cet agenda avec le compte utilisé.');
  } else {
    Logger.log('✅ ' + d.length + ' créneaux réservables sur les ' + NB_JOURS + ' prochains jours :');
    Logger.log(JSON.stringify(d));
  }
}

function _chevauche(events, debut, fin) {
  for (var k = 0; k < events.length; k++) {
    if (events[k].getStartTime() < fin && events[k].getEndTime() > debut) return true;
  }
  return false;
}

function _json(txt) {
  return ContentService.createTextOutput(txt).setMimeType(ContentService.MimeType.JSON);
}
