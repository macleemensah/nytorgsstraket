import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = (p) => path.resolve(__dirname, '../', p);

const DIST_DIR = resolve('dist');
const BASE_URL = 'https://nytorgsstraket.se';

async function getRoutes() {
  const storeFilePath = resolve('src/data/stores.ts');
  const storeContent = fs.readFileSync(storeFilePath, 'utf-8');
  
  // Extract store slugs using regex
  const storeSlugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  const storeSlugs = [];
  let storeMatch;
  while ((storeMatch = storeSlugRegex.exec(storeContent)) !== null) {
    storeSlugs.push(storeMatch[1]);
  }

  // Extract event slugs using regex from EventsPage.tsx (fallback data)
  const eventsFilePath = resolve('src/pages/EventsPage.tsx');
  let eventSlugs = [];
  if (fs.existsSync(eventsFilePath)) {
    const eventsContent = fs.readFileSync(eventsFilePath, 'utf-8');
    const eventSlugRegex = /slug:\s*generateSlug\(['"]([^'"]+)['"]\)/g;
    let eventMatch;
    while ((eventMatch = eventSlugRegex.exec(eventsContent)) !== null) {
      eventSlugs.push(eventMatch[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }

  // Fetch dynamic events from Supabase REST API
  if (fs.existsSync(resolve('.env.local'))) {
    dotenv.config({ path: resolve('.env.local') });
  } else {
    dotenv.config();
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      console.log('[prerender] Fetching dynamic events from Supabase...');
      const response = await fetch(`${supabaseUrl}/rest/v1/events?is_active=eq.true&select=slug,title`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        for (const row of data) {
          const dbSlug = row.slug || row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          if (dbSlug && !eventSlugs.includes(dbSlug)) {
            eventSlugs.push(dbSlug);
          }
        }
        console.log(`[prerender] Added ${data.length} dynamic events to route map.`);
      }
    } catch (err) {
      console.error('[prerender] Failed to fetch events from Supabase:', err.message);
    }
  }

  // Extract news slugs
  const newsFilePath = resolve('src/data/news.ts');
  let newsSlugs = [];
  if (fs.existsSync(newsFilePath)) {
    const newsContent = fs.readFileSync(newsFilePath, 'utf-8');
    const newsSlugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    let newsMatch;
    while ((newsMatch = newsSlugRegex.exec(newsContent)) !== null) {
      newsSlugs.push(newsMatch[1]);
    }
  }

  const routes = [
    '/',
    '/om-nytorget',
    '/aktuellt',
    '/evenemang',
    '/kategori/butiker',
    '/kategori/kafeer',
    '/kategori/kultur',
    '/kategori/mat-och-dryck',
    ...storeSlugs.map(slug => `/plats/${slug}`),
    ...eventSlugs.map(slug => `/evenemang/${slug}`),
    ...newsSlugs.map(slug => `/aktuellt/${slug}`)
  ];

  return routes;
}

async function generateStaticFiles() {
  console.log('[prerender] Starting static file generation...');
  
  const routes = await getRoutes();

  // --- Generate sitemap.xml ---
  const today = new Date().toISOString().split('T')[0]; // e.g. "2026-06-09"
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const route of routes) {
    const priority = route === '/' ? '1.0' : route.startsWith('/plats/') ? '0.9' : '0.8';
    const changefreq = route === '/' ? 'weekly' : route.startsWith('/evenemang') ? 'daily' : 'monthly';
    sitemap += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  }
  sitemap += `</urlset>`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log('[prerender] ✓ Generated sitemap.xml');

  // --- Generate robots.txt ---
  const robots = `User-agent: *\nAllow: /\n\nUser-agent: Bytespider\nDisallow: /\n\nUser-agent: PetalBot\nDisallow: /\n\nUser-agent: Amazonbot\nDisallow: /\n\nUser-agent: MJ12bot\nDisallow: /\n\nUser-agent: AhrefsBot\nDisallow: /\n\nUser-agent: SemrushBot\nDisallow: /\n\nUser-agent: DotBot\nDisallow: /\n\nUser-agent: BLEXBot\nDisallow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
  console.log('[prerender] ✓ Generated robots.txt');

  // --- Try Puppeteer pre-rendering (optional, non-blocking) ---
  try {
    const express = (await import('express')).default;

    console.log('[prerender] Attempting Puppeteer pre-rendering...');
    const PORT = 34567;
    
    const app = express();
    app.use(express.static(DIST_DIR));
    app.get('*', (req, res) => {
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    });

    const server = app.listen(PORT);
    
    let browser;
    try {
      const puppeteerModule = await import('puppeteer');
      const puppeteer = puppeteerModule.default;
      browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
    } catch (localErr) {
      console.log('[prerender] Standard puppeteer failed, trying serverless chromium...');
      const sparticuzModule = await import('@sparticuz/chromium');
      const sparticuz = sparticuzModule.default;
      const puppeteerCoreModule = await import('puppeteer-core');
      const puppeteerCore = puppeteerCoreModule.default;
      
      browser = await puppeteerCore.launch({
        args: sparticuz.args,
        defaultViewport: sparticuz.defaultViewport,
        executablePath: await sparticuz.executablePath(),
        headless: sparticuz.headless,
        ignoreHTTPSErrors: true,
      });
    }
    
    const page = await browser.newPage();

    // Unlock the dev mode by setting localStorage
    await page.goto(`http://localhost:${PORT}`);
    await page.evaluate(() => localStorage.setItem('unlocked', 'true'));

    for (const route of routes) {
      console.log(`[prerender] Parsing: ${route}`);
      const url = `http://localhost:${PORT}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.waitForSelector('#root > div', { timeout: 10000 }).catch(() => {});

      const html = await page.content();
      const routeDir = path.join(DIST_DIR, route);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.writeFileSync(path.join(routeDir, 'index.html'), html);
    }

    console.log(`[prerender] ✓ Successfully pre-rendered ${routes.length} pages.`);

    await browser.close();
    server.close();
  } catch (e) {
    // Puppeteer is not available in this environment (e.g. Vercel).
    // This is non-fatal — sitemap.xml and robots.txt have been generated.
    console.warn('[prerender] ⚠ Puppeteer pre-rendering skipped (environment not supported):', e.message);
    console.log('[prerender] ✓ Build will continue without HTML pre-rendering.');
  }

  console.log('[prerender] Done.');
  process.exit(0);
}

generateStaticFiles().catch(e => {
  console.error('[prerender] Fatal error:', e);
  process.exit(1);
});
