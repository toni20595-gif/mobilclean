/**
 * MOBIL CLEAN — Cerveau « agenda » de l'agent téléphonique
 * ==================================================================
 * Ce script est le SEUL point par lequel l'agent vocal touche à ton
 * agenda. Il sait faire trois choses, pas une de plus :
 *
 *   1. dispos    -> « qu'est-ce qui est libre ? »  (créneaux réservables)
 *   2. reserver  -> « pose ce RDV »                (crée l'événement)
 *   3. rappel    -> « je n'ai pas su répondre »    (t'envoie un mail)
 *
 * ── POURQUOI UN SCRIPT SÉPARÉ DE dispos-agenda.gs ──
 * `dispos-agenda.gs` est public et en lecture seule : n'importe qui peut
 * appeler son URL, il ne renvoie que des créneaux vides, aucun risque.
 * Ici on ÉCRIT dans ton agenda : l'accès est donc protégé par un jeton
 * secret, et le fichier est déployé comme un projet distinct. Si un jour
 * le jeton fuite, tu le changes ici sans toucher au site.
 *
 * ── CE QUE TU DOIS FAIRE AVANT DE DÉPLOYER ──
 *  1. script.google.com -> Nouveau projet -> coller ce fichier
 *  2. ⚠️ Paramètres du projet -> Fuseau horaire -> (GMT+01:00) Europe/Paris
 *  3. Remplacer JETON ci-dessous par une longue suite de caractères à toi
 *     (30 caractères au hasard : lettres + chiffres, pas de mot du
 *     dictionnaire). C'est le mot de passe de ton agenda.
 *  4. Lancer  testerDispos  une fois -> autoriser l'accès
 *  5. Déployer -> Nouveau déploiement -> Application Web
 *       • Exécuter en tant que : Moi
 *       • Qui a accès          : Tout le monde
 *  6. Copier l'URL en /exec, et lui coller le jeton au bout :
 *        https://script.google.com/macros/s/……/exec?token=TON-JETON
 *     C'est CETTE URL que l'agent vocal appellera. Le jeton voyage dans
 *     l'adresse parce qu'une application web Apps Script ne voit pas les
 *     en-têtes HTTP personnalisés : c'est le seul endroit possible.
 *
 * ── APPEL ──
 * POST, corps JSON. Toujours le jeton, toujours une action.
 *   { "token": "...", "action": "dispos" }
 *   { "token": "...", "action": "reserver", "date": "2026-09-22",
 *     "heure": "09:30", "nom": "...", "telephone": "...",
 *     "adresse": "...", "ville": "...", "prestation": "...",
 *     "estimation": "...", "notes": "..." }
 *   { "token": "...", "action": "rappel", "nom": "...",
 *     "telephone": "...", "sujet": "...", "notes": "..." }
 *
 * La réponse est TOUJOURS du JSON avec un champ `ok`. Quand `ok` est
 * false, `raison` dit pourquoi en un mot — l'agent vocal s'en sert pour
 * savoir quoi dire au client sans avoir à deviner.
 */

// ─────────────────────── CONFIG ───────────────────────
var JETON        = 'REMPLACE-MOI-PAR-30-CARACTERES-AU-HASARD';
var CALENDAR_ID  = 'mobilclean68@gmail.com';  // agenda = source de vérité
var EMAIL_ALERTE = 'mobilclean68@gmail.com';  // où arrivent les notifications
var NB_JOURS     = 14;                        // fenêtre de réservation
// Point de départ pour les frais de déplacement. Injecté au déploiement
// depuis ~/.mobilclean-agent : l'adresse ne doit pas finir sur GitHub.
var DEPART       = 'ADRESSE-DE-DEPART-A-INJECTER';
var DELAI_MINI_H = 12;                        // on ne pose rien à moins de 12 h

// Les mêmes créneaux que le site et que dispos-agenda.gs.
// ⚠️ Si tu changes un horaire ici, change-le dans les deux autres.
var HORAIRES = [
  { debut: 9,  debutMin: 30, fin: 12, finMin: 0,  cle: '09:30', dit: '9 h 30',    finDit: 'midi' },
  { debut: 13, debutMin: 0,  fin: 15, finMin: 30, cle: '13:00', dit: '13 heures', finDit: '15 h 30' },
  { debut: 16, debutMin: 30, fin: 19, finMin: 0,  cle: '16:30', dit: '16 h 30',   finDit: '19 heures' }
];

var JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
var MOIS  = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
             'août', 'septembre', 'octobre', 'novembre', 'décembre'];
// ──────────────────────────────────────────────────────


// Correspondance entre le nom de l'outil côté Vapi et l'action ici.
var OUTILS = {
  'consulter_disponibilites': 'dispos',
  'reserver_rendez_vous':     'reserver',
  'demander_rappel':          'rappel',
  'calculer_frais_deplacement': 'frais'
};

/**
 * Point d'entrée unique. Comprend DEUX dialectes :
 *
 *   • le format simple      { "action": "dispos", ... }
 *     — utilisé par curl, et par les plateformes qui laissent composer
 *       librement le corps de la requête ;
 *
 *   • le format Vapi        { "message": { "type": "tool-calls",
 *                              "toolCallList": [ { id, name, arguments } ] } }
 *     — Vapi impose son enveloppe et attend une réponse à lui :
 *       { "results": [ { "toolCallId": …, "result": … } ] }
 *
 * On reconnaît l'enveloppe, on la traduit, et on répond dans le même
 * dialecte que la question. Résultat : un seul script pour toutes les
 * plateformes, et les tests en ligne de commande restent lisibles.
 */
function doPost(e) {
  var vapi = null;
  try {
    var corps = JSON.parse(e.postData.contents);
    vapi = _lireAppelVapi(corps);

    // ⚠️ Le jeton passe par la query string (…/exec?token=XXX).
    // Une application web Apps Script ne voit PAS les en-têtes HTTP
    // personnalisés : impossible d'authentifier par en-tête. On accepte
    // aussi le jeton dans le corps, pour les tests en ligne de commande.
    var jeton = (e && e.parameter && e.parameter.token) || corps.token;
    if (jeton !== JETON) return _rendre(vapi, { ok: false, raison: 'jeton_invalide' });

    var action = vapi ? vapi.action : corps.action;
    var req    = vapi ? vapi.args   : corps;

    switch (action) {
      case 'dispos':   return _rendre(vapi, _dispos());
      case 'reserver': return _rendre(vapi, _reserver(req));
      case 'rappel':   return _rendre(vapi, _rappel(req));

      // Outil de l'agent : appelé seulement si le client demande le
      // montant exact des frais de déplacement.
      case 'frais':    return _rendre(vapi, _frais(req));

      // Maintenance, hors OUTILS : l'agent vocal ne peut pas l'appeler.
      case 'menage':   return _rendre(vapi, _supprimerTests());

      // Libère un créneau : sert à annuler un RDV, et à nettoyer après
      // un appel d'essai. Hors OUTILS, donc inaccessible à l'agent.
      case 'annuler':  return _rendre(vapi, _annuler(req));

      default:         return _rendre(vapi, { ok: false, raison: 'action_inconnue' });
    }
  } catch (err) {
    // On ne renvoie jamais une erreur brute à l'agent : il la lirait à
    // voix haute. Un code court, et le détail part dans le journal.
    Logger.log('ERREUR doPost : ' + err);
    return _rendre(vapi, { ok: false, raison: 'erreur_technique' });
  }
}

/** Reconnaît une requête Vapi. Renvoie {id, action, args}, ou null. */
function _lireAppelVapi(corps) {
  var m = corps && corps.message;
  if (!m) return null;

  var liste = m.toolCallList || m.toolCalls || [];
  if (!liste.length) return null;

  var tc = liste[0];

  // Deux formes circulent selon les versions : les champs à plat,
  // ou nichés dans `function` à la mode OpenAI. On accepte les deux.
  var nom  = tc.name      || (tc.function && tc.function.name);
  var args = tc.arguments || (tc.function && tc.function.arguments) || {};
  if (typeof args === 'string') {
    try { args = JSON.parse(args); } catch (err) { args = {}; }
  }

  return { id: tc.id, action: OUTILS[nom] || nom, args: args };
}

/** Répond dans le dialecte de la question. */
function _rendre(vapi, resultat) {
  if (!vapi) return _json(resultat);
  return _json({ results: [{ toolCallId: vapi.id, result: JSON.stringify(resultat) }] });
}

/** Confort : ouvrir l'URL dans un navigateur dit si le script est en ligne. */
function doGet() {
  return _json({
    ok: true,
    service: 'Mobil Clean — agent téléphonique',
    actions: ['dispos', 'reserver', 'rappel']
  });
}


// ═══════════════════ 1. LES CRÉNEAUX LIBRES ═══════════════════

/**
 * Renvoie les créneaux réservables, chacun avec sa formulation orale.
 *
 * Le champ `dit` existe pour une raison précise : si on ne donne à
 * l'agent que « 2026-09-22|09:30 », il lira la date comme une référence
 * produit. En lui fournissant « lundi 22 septembre à 9 h 30 » tout fait,
 * on supprime la classe d'erreur entière.
 */
function _dispos() {
  var cal = CalendarApp.getCalendarById(CALENDAR_ID);
  if (!cal) return { ok: false, raison: 'agenda_introuvable' };

  var tz = Session.getScriptTimeZone();
  var maintenant = new Date();
  var base = new Date(); base.setHours(0, 0, 0, 0);

  var finFenetre = new Date(base); finFenetre.setDate(base.getDate() + NB_JOURS + 1);
  var events = cal.getEvents(base, finFenetre);

  var creneaux = [];
  for (var i = 0; i <= NB_JOURS; i++) {
    var jour = new Date(base);
    jour.setDate(base.getDate() + i);

    for (var j = 0; j < HORAIRES.length; j++) {
      var h = HORAIRES[j];
      var deb = new Date(jour); deb.setHours(h.debut, h.debutMin, 0, 0);
      var fin = new Date(jour); fin.setHours(h.fin, h.finMin, 0, 0);

      // Trop proche : on ne pose pas un RDV dans deux heures, le temps de
      // charger le matériel et de traverser l'agglomération.
      if ((deb - maintenant) / 3600000 < DELAI_MINI_H) continue;
      if (_chevauche(events, deb, fin)) continue;

      creneaux.push({
        date:  Utilities.formatDate(jour, tz, 'yyyy-MM-dd'),
        heure: h.cle,
        dit:   _direDate(jour) + ' à ' + h.dit
      });
    }
  }
  return { ok: true, creneaux: creneaux, nombre: creneaux.length };
}


// ═══════════════════ 2. POSER LE RENDEZ-VOUS ═══════════════════

function _reserver(req) {
  var manque = _champsManquants(req, ['date', 'heure', 'nom', 'telephone', 'adresse', 'prestation']);
  if (manque.length) return { ok: false, raison: 'champs_manquants', champs: manque };

  var h = _horaire(req.heure);
  if (!h) return { ok: false, raison: 'heure_invalide' };

  var jour = _parseDate(req.date);
  if (!jour) return { ok: false, raison: 'date_invalide' };

  var cal = CalendarApp.getCalendarById(CALENDAR_ID);
  if (!cal) return { ok: false, raison: 'agenda_introuvable' };

  var deb = new Date(jour); deb.setHours(h.debut, h.debutMin, 0, 0);
  var fin = new Date(jour); fin.setHours(h.fin, h.finMin, 0, 0);

  if ((deb - new Date()) / 3600000 < DELAI_MINI_H) return { ok: false, raison: 'trop_proche' };

  // Verrou : deux appels simultanés ne doivent pas pouvoir réserver le
  // même créneau. Le second attend, voit la place prise, et propose
  // autre chose — au lieu de créer un double RDV silencieux.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (err) {
    return { ok: false, raison: 'occupe_reessayer' };
  }

  try {
    if (_chevauche(cal.getEvents(deb, fin), deb, fin)) {
      // Pris entre-temps : on renvoie tout de suite des alternatives,
      // pour que l'agent enchaîne sans repasser par un second appel.
      var autres = _dispos();
      return {
        ok: false,
        raison: 'creneau_pris',
        creneaux: autres.ok ? autres.creneaux.slice(0, 6) : []
      };
    }

    var ville   = req.ville ? String(req.ville).trim() : '';
    var adresse = String(req.adresse).trim() + (ville ? ', ' + ville : '');
    var titre   = 'RDV ' + req.prestation + ' — ' + req.nom + ' — ' + req.telephone;

    var description =
      'Rendez-vous pris par l\'agent téléphonique.\n\n' +
      'Client      : ' + req.nom + '\n' +
      'Téléphone   : ' + req.telephone + '\n' +
      'Adresse     : ' + adresse + '\n' +
      'Prestation  : ' + req.prestation + '\n' +
      'Estimation  : ' + (req.estimation || 'à confirmer sur place') + '\n' +
      'Précisions  : ' + (req.notes || '—') + '\n\n' +
      'Pris le ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy à HH:mm');

    var ev = cal.createEvent(titre, deb, fin, {
      description: description,
      location: adresse            // pour lancer l'itinéraire depuis l'agenda
    });
    ev.addPopupReminder(120);      // rappel 2 h avant
    ev.setColor(CalendarApp.EventColor.PALE_BLUE);

    // Le site lit les dispos via un cache de 2 minutes. On le vide pour
    // que le créneau disparaisse du site tout de suite, pas dans 2 min.
    try { CacheService.getScriptCache().remove('dispos'); } catch (err) {}

    _mail('✅ Nouveau RDV — ' + req.prestation + ' — ' + _direDate(jour) + ' à ' + h.dit, description);

    return { ok: true, dit: _direDate(jour) + ' à ' + h.dit, fin: h.finDit };

  } finally {
    lock.releaseLock();
  }
}


// ═══════════════════ 3. LES FRAIS DE DÉPLACEMENT ═══════════════════

/**
 * Distance routière réelle depuis le dépôt, puis la règle d'Antoine :
 * kilomètres divisés par deux, arrondis à l'euro supérieur.
 *   10 km -> 5 €   ·   15 km -> 7,5 -> 8 €
 *
 * L'agent n'appelle cet outil QUE si le client demande le montant exact.
 * Le reste du temps il dit « quelques euros » : un aller-retour réseau
 * en pleine conversation se paie en blanc à l'antenne.
 *
 * L'adresse de départ n'est pas écrite ici : elle est injectée au
 * déploiement depuis ~/.mobilclean-agent, pour ne pas se retrouver
 * publiée dans le dépôt GitHub.
 */
function _frais(req) {
  var manque = _champsManquants(req, ['adresse']);
  if (manque.length) return { ok: false, raison: 'champs_manquants', champs: manque };

  var arrivee = String(req.adresse).trim();
  if (req.ville) arrivee += ', ' + String(req.ville).trim();
  if (!/france/i.test(arrivee)) arrivee += ', France';

  try {
    var itineraire = Maps.newDirectionFinder()
      .setOrigin(DEPART)
      .setDestination(arrivee)
      .setMode(Maps.DirectionFinder.Mode.DRIVING)
      .getDirections();

    if (!itineraire || !itineraire.routes || !itineraire.routes.length) {
      return { ok: false, raison: 'adresse_introuvable' };
    }

    var km = itineraire.routes[0].legs[0].distance.value / 1000;
    var euros = Math.ceil(km / 2);

    return {
      ok: true,
      km: Math.round(km * 10) / 10,
      euros: euros,
      dit: euros + ' euros'
    };
  } catch (err) {
    Logger.log('Maps : ' + err);
    return { ok: false, raison: 'calcul_impossible' };
  }
}


// ═══════════════════ 4. LA DEMANDE DE RAPPEL ═══════════════════

/**
 * Pour tout ce que l'agent ne doit PAS trancher seul : hors zone, devis
 * entreprise, réclamation, cas bizarre. Volontairement : un mail, rien
 * dans l'agenda. Un « à rappeler » posé en événement bloquerait un
 * créneau vendable pour un rappel de trois minutes.
 */
function _rappel(req) {
  var manque = _champsManquants(req, ['nom', 'telephone', 'sujet']);
  if (manque.length) return { ok: false, raison: 'champs_manquants', champs: manque };

  var corps =
    'Demande de rappel prise par l\'agent téléphonique.\n\n' +
    'Client     : ' + req.nom + '\n' +
    'Téléphone  : ' + req.telephone + '\n' +
    'Sujet      : ' + req.sujet + '\n' +
    'Détails    : ' + (req.notes || '—') + '\n\n' +
    'Reçu le ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy à HH:mm');

  _mail('🔔 RAPPEL À FAIRE — ' + req.sujet + ' — ' + req.nom, corps);
  return { ok: true };
}


// ═══════════════════ OUTILLAGE ═══════════════════

function _chevauche(events, debut, fin) {
  for (var k = 0; k < events.length; k++) {
    if (events[k].getStartTime() < fin && events[k].getEndTime() > debut) return true;
  }
  return false;
}

function _horaire(cle) {
  for (var i = 0; i < HORAIRES.length; i++) if (HORAIRES[i].cle === cle) return HORAIRES[i];
  return null;
}

/**
 * AAAA-MM-JJ -> Date locale. Construite champ par champ : `new Date("…")`
 * interprète la chaîne en UTC et décale la journée d'une heure l'hiver.
 */
function _parseDate(txt) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(txt).trim());
  if (!m) return null;
  var d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  d.setHours(0, 0, 0, 0);
  return isNaN(d.getTime()) ? null : d;
}

function _direDate(d) {
  return JOURS[d.getDay()] + ' ' + d.getDate() + ' ' + MOIS[d.getMonth()];
}

function _champsManquants(req, requis) {
  var manque = [];
  for (var i = 0; i < requis.length; i++) {
    var v = req[requis[i]];
    if (v === undefined || v === null || String(v).trim() === '') manque.push(requis[i]);
  }
  return manque;
}

function _mail(sujet, corps) {
  try {
    MailApp.sendEmail(EMAIL_ALERTE, sujet, corps);
  } catch (err) {
    Logger.log('Mail non parti : ' + err);   // un mail raté n'annule jamais un RDV
  }
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
                       .setMimeType(ContentService.MimeType.JSON);
}


// ═══════════════════ TESTS MANUELS ═══════════════════

/** Sélectionne cette fonction, Exécuter, puis lis le Journal d'exécution. */
function testerDispos() {
  var r = _dispos();
  Logger.log(r.ok
    ? '✅ ' + r.nombre + ' créneaux libres. Les 5 premiers : ' + JSON.stringify(r.creneaux.slice(0, 5))
    : '⚠️ ' + r.raison + ' — connecte-toi avec ' + CALENDAR_ID + ' ou partage cet agenda avec ce compte.');
}

/**
 * Ménage après une campagne d'essais : supprime les rendez-vous de test
 * des 60 prochains jours. Ne touche QU'AUX événements dont le titre
 * contient « TEST » — un vrai rendez-vous client ne risque rien.
 */
function supprimerRdvDeTest() {
  var r = _supprimerTests();
  if (!r.ok) { Logger.log('⚠️ ' + r.raison); return; }
  Logger.log(r.supprimes === 0 ? 'Aucun rendez-vous de test à supprimer.'
                               : '✅ ' + r.supprimes + ' supprimé(s) : ' + r.titres.join(' | '));
}

/**
 * Supprime ce qui occupe un créneau donné, et le libère.
 * Renvoie les titres supprimés, pour qu'on voie ce qu'on a enlevé.
 */
function _annuler(req) {
  var manque = _champsManquants(req, ['date', 'heure']);
  if (manque.length) return { ok: false, raison: 'champs_manquants', champs: manque };

  var h = _horaire(req.heure);
  if (!h) return { ok: false, raison: 'heure_invalide' };
  var jour = _parseDate(req.date);
  if (!jour) return { ok: false, raison: 'date_invalide' };

  var cal = CalendarApp.getCalendarById(CALENDAR_ID);
  if (!cal) return { ok: false, raison: 'agenda_introuvable' };

  var deb = new Date(jour); deb.setHours(h.debut, h.debutMin, 0, 0);
  var fin = new Date(jour); fin.setHours(h.fin, h.finMin, 0, 0);

  var events = cal.getEvents(deb, fin);
  var titres = [];
  for (var i = 0; i < events.length; i++) {
    if (events[i].getStartTime() < fin && events[i].getEndTime() > deb) {
      titres.push(events[i].getTitle());
      events[i].deleteEvent();
    }
  }
  try { CacheService.getScriptCache().remove('dispos'); } catch (err) {}
  return { ok: true, supprimes: titres.length, titres: titres, dit: _direDate(jour) + ' à ' + h.dit };
}

/** Le travail réel, partagé entre la fonction manuelle et l'action `menage`. */
function _supprimerTests() {
  var cal = CalendarApp.getCalendarById(CALENDAR_ID);
  if (!cal) return { ok: false, raison: 'agenda_introuvable' };

  var debut = new Date(); debut.setHours(0, 0, 0, 0);
  var fin = new Date(debut); fin.setDate(debut.getDate() + 60);

  var events = cal.getEvents(debut, fin);
  var titres = [];
  for (var i = 0; i < events.length; i++) {
    var t = events[i].getTitle();
    if (t.indexOf('TEST') !== -1) {
      titres.push(t);
      events[i].deleteEvent();
    }
  }
  try { CacheService.getScriptCache().remove('dispos'); } catch (err) {}
  return { ok: true, supprimes: titres.length, titres: titres };
}

/** Pose un VRAI rendez-vous de test dans l'agenda — pense à le supprimer. */
function testerReservation() {
  var d = _dispos();
  if (!d.ok || !d.creneaux.length) { Logger.log('⚠️ Aucun créneau libre : ' + (d.raison || '')); return; }

  var c = d.creneaux[0];
  var r = _reserver({
    date: c.date, heure: c.heure,
    nom: 'TEST — à supprimer', telephone: '07 68 44 52 93',
    adresse: '1 rue de Test', ville: 'Mulhouse',
    prestation: 'Canapé', estimation: '79 euros', notes: 'Réservation de test'
  });
  Logger.log(r.ok
    ? '✅ RDV de test posé ' + r.dit + ' — supprime-le dans ton agenda.'
    : '⚠️ ' + r.raison + ' ' + JSON.stringify(r.champs || ''));
}
