/**
 * Branche une voix personnelle ElevenLabs sur l'assistant Vapi.
 *
 *  1. retrouve l'identifiant de la voix dans le compte ElevenLabs
 *  2. dépose la clé ElevenLabs dans Vapi (une seule fois)
 *  3. câble la voix sur l'assistant
 *
 * Les clés vivent dans ~/.mobilclean-agent et ne sont jamais affichées.
 *
 * Usage : node brancher-voix.cjs ["nom de la voix"] ["nom de l'assistant"]
 */
const { api, conf } = require('./vapi.cjs');

const NOM_VOIX = process.argv[2] || 'antoine mobilclean';
const NOM_ASSISTANT = process.argv[3] || 'Léa — Mobil Clean';

(async () => {
  if (!conf.ELEVEN_KEY) { console.log('❌ ELEVEN_KEY absente du fichier de config'); process.exit(1); }

  // ── 1. L'identifiant de la voix ──
  // La clé est volontairement limitée à la synthèse vocale : elle n'a pas
  // le droit de LISTER les voix. On prend donc l'identifiant dans le
  // fichier de config, récupéré une fois depuis « Copy voice ID ».
  let cible;
  if (conf.VOIX_ANTOINE) {
    cible = { name: NOM_VOIX, voice_id: conf.VOIX_ANTOINE, category: 'cloned' };
    console.log(`identifiant lu dans la config : ${cible.voice_id.slice(0, 6)}…`);
  } else {
    const r = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: { 'xi-api-key': conf.ELEVEN_KEY },
    });
    if (!r.ok) {
      console.log(`❌ ElevenLabs : ${r.status} — clé trop restreinte pour lister les voix.`);
      console.log('   Récupère l\'identifiant via « Copy voice ID » et ajoute VOIX_ANTOINE= dans la config.');
      process.exit(1);
    }
    const voix = (await r.json()).voices || [];
    cible = voix.find(v => v.name.toLowerCase().includes(NOM_VOIX.toLowerCase()));
    if (!cible) { console.log(`❌ « ${NOM_VOIX} » introuvable.`); process.exit(1); }
    console.log(`✅ voix trouvée : ${cible.name} — ${cible.voice_id}`);
  }

  // ── 2. La clé dans Vapi ──
  const creds = (await api('GET', '/credential')).json || [];
  if (creds.some(c => c.provider === '11labs')) {
    console.log('♻️  clé ElevenLabs déjà présente dans Vapi');
  } else {
    const c = await api('POST', '/credential', { provider: '11labs', apiKey: conf.ELEVEN_KEY });
    if (!c.ok) { console.log('❌ dépôt de la clé : ' + JSON.stringify(c.json && c.json.message).slice(0, 300)); process.exit(1); }
    console.log('✅ clé ElevenLabs déposée dans Vapi');
  }

  // ── 3. Le câblage ──
  const a = ((await api('GET', '/assistant')).json || []).find(x => x.name === NOM_ASSISTANT);
  if (!a) { console.log(`❌ assistant « ${NOM_ASSISTANT} » introuvable`); process.exit(1); }

  const maj = await api('PATCH', `/assistant/${a.id}`, {
    voice: {
      provider: '11labs',
      voiceId: cible.voice_id,
      model: 'eleven_turbo_v2_5',   // multilingue et rapide : indispensable au téléphone
      speed: 1.0,
      stability: 0.5,
      similarityBoost: 0.8,
    },
  });
  if (!maj.ok) { console.log('❌ câblage : ' + JSON.stringify(maj.json && maj.json.message).slice(0, 300)); process.exit(1); }

  console.log(`\n✅ ${maj.json.name} parle maintenant avec « ${cible.name} »`);
  console.log(`   ${maj.json.voice.provider} / ${maj.json.voice.voiceId} — modèle ${maj.json.voice.model}`);
})();
