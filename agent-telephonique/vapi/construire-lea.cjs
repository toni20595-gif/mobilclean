/**
 * Construit l'agent téléphonique sur Vapi : les outils, puis l'assistant.
 *
 * Relançable sans danger : cherche l'assistant par son nom (ou par un
 * ancien nom), et le MET À JOUR au lieu d'en créer un deuxième. L'identi-
 * fiant reste donc stable même quand on change le prénom de l'agent.
 *
 * Les clés vivent dans ~/.mobilclean-agent, jamais dans le dépôt.
 */
const fs = require('fs');
const { api, conf } = require('./vapi.cjs');

const SERVEUR = `${conf.GAS_URL}?token=${conf.GAS_TOKEN}`;
const PROMPT_SRC = 'C:/Users/Toni2/Projets/mobilclean/agent-telephonique/prompt-systeme.md';

let prompt = fs.readFileSync(PROMPT_SRC, 'utf8');
prompt = prompt.slice(prompt.indexOf('## 1. QUI TU ES'));
prompt = prompt
  .replace(/\{\{date_du_jour\}\}/g, '{{"now" | date: "%A %d %B %Y, %H:%M", "Europe/Paris"}}')
  .replace(/\{\{numero_appelant\}\}/g, '{{customer.number}}');

prompt += `

---

## NOTE TECHNIQUE
La date ci-dessus arrive **en anglais** (« Saturday 19 September 2026, 17:40 »), avec l'heure de Paris.
Traduis-la mentalement,
ne la prononce jamais telle quelle. Pour annoncer un créneau, utilise toujours le champ \`dit\`
renvoyé par l'outil : il est déjà en français.
Si le numéro de l'appelant est vide ou masqué, demande-le une fois. Sinon, ne le demande jamais.`;

// Renfort de vocabulaire pour la reconnaissance vocale.
// ⚠️ TAILLE CRITIQUE : Deepgram reçoit ces termes dans l'URL de connexion.
// Une liste de 112 termes a fait échouer TOUS les appels, coupés à
// 0 seconde sur « error-vapifault-deepgram-transcriber-failed », alors
// que l'API Vapi l'avait acceptée sans broncher. 29 termes marchaient.
// On reste donc volontairement sous la quarantaine, en gardant les
// communes les plus probables. Ne pas rallonger sans refaire un appel.
const VOCABULAIRE = [
  'Mobil Clean', 'Lucie',
  // Les communes les plus demandées
  'Mulhouse', 'Illzach', 'Riedisheim', 'Wittenheim', 'Kingersheim',
  'Rixheim', 'Pfastatt', 'Brunstatt', 'Didenheim', 'Wittelsheim',
  'Lutterbach', 'Sausheim', 'Habsheim', 'Ensisheim', 'Cernay',
  'Thann', 'Guebwiller', 'Soultz', 'Altkirch', 'Baldersheim',
  'Battenheim', 'Bollwiller', 'Richwiller', 'Ruelisheim', 'Staffelfelden',
  'Zillisheim', 'Zimmersheim', 'Morschwiller', 'Reiningue', 'Heimsbrunn',
  'Pulversheim', 'Ungersheim', 'Ottmarsheim', 'Sierentz', 'Illfurth',
  // Les quartiers de Mulhouse et le métier
  'Rebberg', 'Bourtzwiller', 'Dornach',
  'Diamant', 'matelas', 'canapé', 'fauteuil', 'habitacle',
];

// Gladia ne prend pas une liste de mots mais un TEXTE DE CONTEXTE. C'est
// mieux : le moteur comprend de quoi parle l'appel, au lieu de recevoir
// des noms isolés. Volontairement court (~320 caractères) — la panne du
// 19/09 est venue d'un renfort de vocabulaire trop long.
const CONTEXTE =
  "Appel d'un client de Mobil Clean, nettoyage à domicile à Mulhouse, en Alsace. " +
  "Le client donne son prénom, son adresse et sa commune du Haut-Rhin : " +
  "Sausheim, Ruelisheim, Zimmersheim, Wittenheim, Illzach, Kingersheim, Riedisheim, " +
  "Rixheim, Pfastatt, Brunstatt, Wittelsheim, Lutterbach, Habsheim, Baldersheim, " +
  "Morschwiller, Staffelfelden, Cernay, Thann, Guebwiller, Altkirch.";

// Deux moteurs de reconnaissance vocale, interchangeables en une commande :
//   node construire-lea.cjs             -> Gladia (français natif, contexte libre)
//   node construire-lea.cjs --deepgram  -> retour immédiat à Deepgram
// Le repli existe parce qu'un moteur ne se juge qu'en appel réel : Vapi
// accepte n'importe quelle configuration sans broncher.
const TRANSCRIPTEURS = {
  gladia:   { provider: 'gladia',   model: 'solaria-1', language: 'fr', transcriptionHint: CONTEXTE },
  deepgram: {
    provider: 'deepgram',
    model: 'nova-3',
    language: 'fr',
    keyterm: VOCABULAIRE,
    // Silence avant que Deepgram estime la phrase finie. 290 ms coupait
    // les gens au milieu d'une adresse (« douze… rue du… Sauvage »), ce
    // qui ressemblait à une incompréhension. 350 ms la rend patiente.
    endpointing: 350,
    // Filet de sécurité : le 19/09, un vocabulaire trop long a fait
    // échouer Deepgram et coupé TOUS les appels à 0 seconde. On bascule
    // sur Azure — un fournisseur DIFFÉRENT, sinon le repli tomberait
    // pour la même raison que le principal.
    fallbackPlan: { transcribers: [{ provider: 'azure', language: 'fr-FR' }] },
  },
};
const TRANSCRIPTEUR = process.argv.includes('--deepgram')
  ? TRANSCRIPTEURS.deepgram
  : TRANSCRIPTEURS.gladia;

const OUTILS = [
  {
    type: 'function',
    function: {
      name: 'consulter_disponibilites',
      description:
        "Donne les créneaux réellement libres dans l'agenda de Mobil Clean pour les 14 prochains jours. " +
        "À appeler dès qu'on aborde le rendez-vous. N'annonce jamais un créneau sans avoir appelé cet outil. " +
        "Lis le champ `dit`, déjà formulé pour l'oral.",
      parameters: { type: 'object', properties: {}, required: [] },
    },
    server: { url: SERVEUR },
  },
  {
    type: 'function',
    function: {
      name: 'reserver_rendez_vous',
      description:
        "Pose le rendez-vous dans l'agenda. À appeler dès que tu as le nom, l'adresse, la prestation et le créneau. " +
        "Le créneau est alors bloqué et Antoine prévenu par e-mail.",
      parameters: {
        type: 'object',
        properties: {
          date: { type: 'string', description: 'Date du créneau au format AAAA-MM-JJ, reprise telle quelle' },
          heure: { type: 'string', description: '09:30, 13:00 ou 16:30 — repris tel quel' },
          nom: {
            type: 'string',
            description:
              "Le PRÉNOM du client, tel qu'il l'a donné. Le prénom suffit : ne demande jamais le nom " +
              "de famille et ne fais jamais épeler. N'invente pas, n'écris jamais « Inconnu ».",
          },
          telephone: {
            type: 'string',
            description:
              "Le numéro de l'appel en cours. NE LE DEMANDE JAMAIS au client : tu l'as déjà. " +
              "Uniquement si l'appel est masqué, demande-le une fois.",
          },
          adresse: { type: 'string', description: "Numéro et rue, plus l'étage ou le code d'accès s'il y en a un" },
          ville: { type: 'string', description: 'Commune' },
          prestation: { type: 'string', description: '« Intérieur voiture — Diamant », « Canapé », « Matelas »…' },
          estimation: { type: 'string', description: 'Le prix annoncé, ex. « 110 euros » ou « à partir de 79 euros »' },
          notes: {
            type: 'string',
            description:
              "Ce que le client a signalé DE LUI-MÊME (taches, odeurs, animaux, accès, prise électrique). " +
              "Ne va jamais chercher ces informations, note seulement ce qu'il donne spontanément.",
          },
        },
        required: ['date', 'heure', 'nom', 'telephone', 'adresse', 'prestation'],
      },
    },
    server: { url: SERVEUR },
  },
  {
    type: 'function',
    function: {
      name: 'calculer_frais_deplacement',
      description:
        "Calcule le montant exact des frais de déplacement depuis le dépôt jusqu'à l'adresse du client. " +
        "À n'appeler QUE si le client demande explicitement le montant précis. Le reste du temps, dis " +
        "simplement « quelques euros » : un appel d'outil en pleine conversation crée un blanc à l'antenne. " +
        "Après avoir donné le chiffre, précise qu'il sera reconfirmé par mail.",
      parameters: {
        type: 'object',
        properties: {
          adresse: { type: 'string', description: "Numéro et rue de l'adresse du client" },
          ville: { type: 'string', description: 'Commune du client' },
        },
        required: ['adresse'],
      },
    },
    server: { url: SERVEUR },
  },
  {
    type: 'function',
    function: {
      name: 'demander_rappel',
      description:
        "Enregistre une demande de rappel et prévient Antoine par e-mail. À utiliser quand tu ne peux pas conclure : " +
        "commune hors zone, entreprise ou flotte, chiffrage multi-meubles, pierres tombales, réclamation, " +
        "ou question sans réponse. Ne termine jamais un appel sans rendez-vous ni rappel.",
      parameters: {
        type: 'object',
        properties: {
          nom: { type: 'string', description: 'Prénom et nom, ou raison sociale' },
          telephone: { type: 'string', description: "Le numéro de l'appel en cours, sans le demander" },
          sujet: { type: 'string', description: '« hors zone », « devis flotte », « réclamation », « multi-meubles »…' },
          notes: { type: 'string', description: 'Ce que le client a expliqué, pour faire gagner du temps à Antoine' },
        },
        required: ['nom', 'telephone', 'sujet'],
      },
    },
    server: { url: SERVEUR },
  },
];

const COMMUN = {
  firstMessage: 'Mobil Clean, bonjour, je suis Lucie ! Qu\'est-ce que je peux faire pour vous ?',
  endCallMessage: 'Au revoir !',
  recordingEnabled: false,
  // Les clients appellent depuis la rue, une voiture, un chantier.
  // Le filtrage du bruit de fond coûte quelques millisecondes et
  // change beaucoup sur la qualité de ce qui est entendu.
  backgroundDenoisingEnabled: true,
  maxDurationSeconds: 420,
  silenceTimeoutSeconds: 30,
  startSpeakingPlan: { waitSeconds: 0.4 },
  stopSpeakingPlan: { numWords: 2, voiceSeconds: 0.2, backoffSeconds: 1 },
};

const VARIANTES = [
  {
    name: 'Lucie — Mobil Clean',
    anciensNoms: ['Lucas — Mobil Clean', 'Léa — Mobil Clean'],   // pour retrouver l'assistant après le changement de prénom
    voice: {
      provider: '11labs',
      voiceId: conf.VOIX_LUCIE || conf.VOIX_ANTOINE,  // voix Lucie (bibliothèque), repli sur celle d'Antoine
      model: 'eleven_turbo_v2_5',          // multilingue et rapide : indispensable au téléphone
      speed: 1.0,
      stability: 0.5,
      similarityBoost: 0.8,
    },
  },
];

(async () => {
  if (!conf.VOIX_LUCIE && !conf.VOIX_ANTOINE) { console.log('❌ VOIX_ANTOINE absente de la config'); process.exit(1); }

  // ── Les outils ──
  const existants = (await api('GET', '/tool')).json || [];
  const ids = [];
  for (const outil of OUTILS) {
    const nom = outil.function.name;
    const deja = existants.find(t => t.function && t.function.name === nom);
    const r = deja ? await api('PATCH', `/tool/${deja.id}`, outil) : await api('POST', '/tool', outil);
    console.log(`${r.ok ? (deja ? '♻️  maj   ' : '✅ créé  ') : '❌ échec'} ${nom}`);
    if (!r.ok) { console.log('   ' + JSON.stringify(r.json && r.json.message).slice(0, 400)); process.exit(1); }
    ids.push(r.json.id);
  }

  // ── L'assistant ──
  const assistants = (await api('GET', '/assistant')).json || [];
  console.log('');
  for (const v of VARIANTES) {
    const corps = {
      ...COMMUN,
      name: v.name,
      voice: v.voice,
      model: {
        provider: 'openai',
        model: 'gpt-5',
        messages: [{ role: 'system', content: prompt }],
        toolIds: ids,
        temperature: 0.3,
      },
      transcriber: TRANSCRIPTEUR,
    };

    const noms = [v.name, ...(v.anciensNoms || [])];
    let deja = assistants.find(a => noms.includes(a.name));

    // ── `--recreer` : repartir d'un assistant NEUF ──────────────────
    // Le tableau de bord Vapi garde un BROUILLON par assistant, que les
    // écritures API ne touchent pas. Le bouton « Talk » envoie ce
    // brouillon — pas la config du serveur. Le 19/09, ce brouillon est
    // resté bloqué sur Gladia pendant des heures : chaque appel de test
    // rejouait l'ancienne config, quoi qu'on écrive côté serveur.
    // Un assistant fraîchement créé n'a aucun brouillon, donc aucune
    // divergence possible. C'est la seule sortie quand le navigateur
    // n'est pas pilotable.
    if (deja && process.argv.includes('--recreer')) {
      // On emporte la voix et le modèle choisis par Antoine sur l'ancien,
      // sinon le neuf repartirait avec mes valeurs par défaut.
      corps.voice = deja.voice;
      corps.model = { ...corps.model, provider: deja.model.provider, model: deja.model.model };
      console.log(`   repris de l'ancien : voix ${deja.voice.provider}, modèle ${deja.model.model}`);

      const archive = 'ANCIEN (brouillon casse) - ne plus utiliser';
      await api('PATCH', `/assistant/${deja.id}`, { name: archive });
      console.log(`   ancien archivé     : « ${archive} »`);
      deja = null;   // on repart de zéro
    }

    // ⚠️ PARTAGE DES RÔLES, appris à la dure le 19/09 :
    // Antoine règle la VOIX et le MODÈLE dans le tableau de bord (ça se
    // juge à l'oreille et à la latence). Ce script ne touche qu'au PROMPT
    // et aux OUTILS. Sans cette séparation, chaque camp écrasait l'autre
    // et on tournait en rond pendant des heures.
    if (deja && !process.argv.includes('--voix')) {
      delete corps.voice;
      console.log(`   voix conservée   : ${deja.voice.provider} / ${String(deja.voice.voiceId).slice(0, 20)}`);
    }
    if (deja && !process.argv.includes('--modele')) {
      corps.model = { ...corps.model, provider: deja.model.provider, model: deja.model.model };
      console.log(`   modèle conservé  : ${deja.model.provider} / ${deja.model.model}`);
    }
    if (deja && deja.name !== v.name && !process.argv.includes('--renommer')) {
      delete corps.name;   // le nom affiché lui appartient aussi
      console.log(`   nom conservé     : ${deja.name}`);
    }

    const r = deja ? await api('PATCH', `/assistant/${deja.id}`, corps) : await api('POST', '/assistant', corps);

    if (!r.ok) {
      console.log(`❌ ${v.name} → ${JSON.stringify(r.json && r.json.message).slice(0, 400)}`);
      continue;
    }
    console.log(`${deja ? (deja.name !== v.name ? '✏️  renommé' : '♻️  maj  ') : '✅ créé '} ${r.json.name}`);
    console.log(`        modèle : ${r.json.model.provider} / ${r.json.model.model}`);
    console.log(`        voix   : ${r.json.voice.provider} / ${String(r.json.voice.voiceId).slice(0, 20)}`);
    console.log(`        outils : ${ids.length}`);
    console.log(`        id     : ${r.json.id}`);
  }
  console.log(`\nprompt : ${prompt.length} caractères`);
})();
