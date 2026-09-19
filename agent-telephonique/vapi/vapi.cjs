/** Petite couche d'accès à l'API Vapi. La clé ne sort jamais d'ici. */
const fs = require('fs');

const conf = Object.fromEntries(
  fs.readFileSync('C:/Users/Toni2/.mobilclean-agent', 'utf8')
    .split(/\r?\n/).filter(Boolean).map(l => {
      const i = l.indexOf('=');
      return [l.slice(0, i).replace(/^\uFEFF/, ''), l.slice(i + 1).trim()];
    })
);

const BASE = 'https://api.vapi.ai';

async function api(methode, chemin, corps) {
  const r = await fetch(BASE + chemin, {
    method: methode,
    headers: {
      Authorization: `Bearer ${conf.VAPI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: corps ? JSON.stringify(corps) : undefined,
  });
  const txt = await r.text();
  let json = null;
  try { json = JSON.parse(txt); } catch {}
  return { status: r.status, ok: r.ok, json, txt };
}

module.exports = { api, conf };

if (require.main === module) {
  (async () => {
    const a = await api('GET', '/assistant');
    console.log(`GET /assistant  → ${a.status}`);
    if (!a.ok) { console.log(a.txt.slice(0, 300)); process.exit(1); }
    console.log(`assistants existants : ${a.json.length}`);
    a.json.forEach(x => console.log(`  - ${x.name} (${x.id})`));

    const t = await api('GET', '/tool');
    console.log(`GET /tool       → ${t.status}, outils existants : ${t.ok ? t.json.length : '?'}`);
    if (t.ok) t.json.forEach(x => console.log(`  - ${x.function?.name || x.type} (${x.id})`));
  })();
}
