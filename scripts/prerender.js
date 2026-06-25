import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = (p) => path.resolve(__dirname, '../', p);
const DIST_DIR = resolve('dist');
const BASE_URL = 'https://nytorgsstraket.se';

if (fs.existsSync(resolve('.env.local'))) {
  dotenv.config({ path: resolve('.env.local') });
} else {
  dotenv.config();
}

// ── Static route meta ──────────────────────────────────────────────────────

const STATIC_META = {
  '/': {
    title: 'Nytorgsstråket | Shopping & Kaféer vid Nytorget i SoFo, Södermalm',
    description: 'Upptäck Nytorgsstråket vid Nytorget i SoFo, Södermalm. Handplockade butiker, mysiga kaféer och populära restauranger på Nytorgsgatan i hjärtat av Stockholm.',
  },
  '/om-nytorget': {
    title: 'Om Nytorget | En Komplett Guide till SoFos Hjärta',
    description: 'Utforska Nytorget på Södermalm. Upptäck historien, lekparken, gräsytorna och de bästa platserna runtomkring Stockholms mest levande torg.',
  },
  '/aktuellt': {
    title: 'Aktuellt | Senaste Nytt & Inspiration | Nytorgsstråket',
    description: 'Följ med bakom kulisserna på Nytorgsstråket. Läs om nya butiker, inspirerande intervjuer och det senaste från SoFo, Södermalm.',
  },
  '/evenemang': {
    title: 'Evenemang vid Nytorget | SoFo Södermalm Stockholm',
    description: 'Aktuella evenemang, livemusik, loppisar och festivaler vid Nytorget i SoFo, Södermalm. Upplev det bästa av Nytorgsstråket.',
  },
  '/kategori/butiker': {
    title: 'Butiker vid Nytorget | SoFo Södermalm',
    description: 'Utforska alla butiker längs Nytorgsstråket vid Nytorget i SoFo, Södermalm. Handplockade favoriter i hjärtat av Stockholm.',
  },
  '/kategori/kafeer': {
    title: 'Kaféer vid Nytorget | SoFo Södermalm',
    description: 'Utforska alla kaféer längs Nytorgsstråket vid Nytorget i SoFo, Södermalm. Handplockade favoriter i hjärtat av Stockholm.',
  },
  '/kategori/kultur': {
    title: 'Kultur och platser vid Nytorget | SoFo Södermalm',
    description: 'Utforska kultur och platser längs Nytorgsstråket vid Nytorget i SoFo, Södermalm.',
  },
  '/kategori/mat-och-dryck': {
    title: 'Mat & Dryck vid Nytorget | SoFo Södermalm',
    description: 'Utforska alla restauranger längs Nytorgsstråket vid Nytorget i SoFo, Södermalm. Handplockade favoriter i hjärtat av Stockholm.',
  },
};

// ── Data extraction ────────────────────────────────────────────────────────

function parseStores() {
  const src = fs.readFileSync(resolve('src/data/stores.ts'), 'utf-8');
  const stores = [];
  const slugRe = /\{\s*\n\s+slug:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = slugRe.exec(src)) !== null) {
    const chunk = src.slice(m.index, m.index + 2500);
    const name = chunk.match(/\bname:\s*"([^"]+)"/)?.[1] ?? '';
    const desc = chunk.match(/\bdescription:\s*"([^"]+)"/)?.[1]?.substring(0, 160).trim() ?? '';
    if (name) stores.push({ slug: m[1], name, description: desc });
  }
  return stores;
}

function parseFallbackEvents() {
  const src = fs.readFileSync(resolve('src/pages/EventsPage.tsx'), 'utf-8');
  const events = [];
  const re = /slug:\s*generateSlug\(['"]([^'"]+)['"]\)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const slug = m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const chunkBefore = src.slice(Math.max(0, m.index - 300), m.index);
    const title = chunkBefore.match(/title:\s*['"]([^'"]+)['"]\s*,?\s*$/m)?.[1] ?? slug;
    events.push({ slug, title, description: '' });
  }
  return events;
}

async function fetchSupabaseEvents() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(
      `${url}/rest/v1/events?is_active=eq.true&select=slug,title,description`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

// ── Meta injection ─────────────────────────────────────────────────────────

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHead({ title, description, canonical }) {
  const url = `${BASE_URL}${canonical}`;
  const img = `${BASE_URL}/og-image.jpg`;
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta property="og:site_name" content="Nytorgsstråket" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<link rel="canonical" href="${url}" />`,
  ].join('\n    ');
}

function injectIntoTemplate(template, meta) {
  return template
    .replace(/<title>[^<]*<\/title>/g, '')
    .replace(/<meta name="description"[^>]*\/?>/g, '')
    .replace(/<meta property="og:[^>]*\/?>/g, '')
    .replace(/<meta name="twitter:[^>]*\/?>/g, '')
    .replace(/<link rel="canonical"[^>]*\/?>/g, '')
    .replace('</head>', `    ${buildHead(meta)}\n  </head>`);
}

function writePage(route, html) {
  if (route === '/') {
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
  } else {
    const dir = path.join(DIST_DIR, route);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
}

// ── Sitemap ────────────────────────────────────────────────────────────────

function generateSitemap(routes) {
  const today = new Date().toISOString().split('T')[0];
  const entries = routes.map(route => {
    const priority = route === '/' ? '1.0' : route.startsWith('/plats/') ? '0.9' : '0.8';
    const changefreq = route === '/' ? 'weekly' : route.startsWith('/evenemang') ? 'daily' : 'monthly';
    return `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>`;
}

// ── Robots ─────────────────────────────────────────────────────────────────

function generateRobots() {
  const blocked = ['Bytespider', 'PetalBot', 'Amazonbot', 'MJ12bot', 'AhrefsBot', 'SemrushBot', 'DotBot', 'BLEXBot'];
  const rules = blocked.map(bot => `User-agent: ${bot}\nDisallow: /`).join('\n\n');
  return `User-agent: *\nAllow: /\n\n${rules}\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('[prerender] Starting static file generation...');

  // Inject env for diagnostics
  console.log(`◇ injected env (${Object.keys(process.env).filter(k => k.startsWith('VITE_')).length}) from .env // tip: ⌁ auth for agents [www.vestauth.com]`);

  // Collect routes & data
  const stores = parseStores();
  const fallbackEvents = parseFallbackEvents();
  const dbEvents = await fetchSupabaseEvents();
  if (dbEvents.length) console.log(`[prerender] Added ${dbEvents.length} dynamic events to route map.`);

  // Merge events (db takes priority over fallback)
  const eventMap = new Map();
  for (const e of fallbackEvents) eventMap.set(e.slug, e);
  for (const e of dbEvents) {
    const slug = e.slug || e.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (slug) eventMap.set(slug, { slug, title: e.title, description: e.description ?? '' });
  }

  const routes = [
    ...Object.keys(STATIC_META),
    ...stores.map(s => `/plats/${s.slug}`),
    ...[...eventMap.keys()].map(s => `/evenemang/${s}`),
  ];

  // Generate sitemap & robots
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), generateSitemap(routes));
  console.log('[prerender] ✓ Generated sitemap.xml');

  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), generateRobots());
  console.log('[prerender] ✓ Generated robots.txt');

  // Inject meta tags per route
  const template = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

  for (const route of routes) {
    let meta;

    if (STATIC_META[route]) {
      meta = { ...STATIC_META[route], canonical: route };

    } else if (route.startsWith('/plats/')) {
      const slug = route.replace('/plats/', '');
      const store = stores.find(s => s.slug === slug);
      meta = {
        title: store ? `${store.name} vid Nytorget | SoFo Södermalm` : 'Nytorgsstråket',
        description: store?.description || 'Utforska platser längs Nytorgsstråket i SoFo, Södermalm.',
        canonical: route,
      };

    } else if (route.startsWith('/evenemang/')) {
      const slug = route.replace('/evenemang/', '');
      const event = eventMap.get(slug);
      meta = {
        title: event ? `${event.title} | Evenemang Nytorget SoFo` : 'Evenemang | Nytorgsstråket',
        description: event?.description || 'Evenemang vid Nytorget i SoFo, Södermalm.',
        canonical: route,
      };

    } else {
      meta = { title: 'Nytorgsstråket', description: '', canonical: route };
    }

    writePage(route, injectIntoTemplate(template, meta));
    console.log(`[prerender] ✓ ${route}`);
  }

  console.log(`[prerender] ✓ Successfully pre-rendered ${routes.length} pages.`);
  console.log('[prerender] Done.');
  process.exit(0);
}

main().catch(e => {
  console.error('[prerender] Fatal error:', e);
  process.exit(1);
});
