import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = (p) => path.resolve(__dirname, '../', p);

const DIST_DIR = resolve('dist');
const BASE_URL = 'https://nytorgsstraket.se';

async function getRoutes() {
  const storeFilePath = resolve('src/data/stores.ts');
  const storeContent = fs.readFileSync(storeFilePath, 'utf-8');
  
  // Extract slugs using regex
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  const slugs = [];
  let match;
  while ((match = slugRegex.exec(storeContent)) !== null) {
    slugs.push(match[1]);
  }

  const routes = [
    '/',
    '/kategori/butiker',
    '/kategori/kafeer',
    '/kategori/kultur',
    '/kategori/mat-och-dryck',
    ...slugs.map(slug => `/plats/${slug}`)
  ];

  return routes;
}

async function generateStaticFiles() {
  console.log('[prerender] Starting static file generation...');
  
  const routes = await getRoutes();

  // --- Generate sitemap.xml ---
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const route of routes) {
    const priority = route === '/' ? '1.0' : '0.8';
    sitemap += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <priority>${priority}</priority>\n  </url>\n`;
  }
  sitemap += `</urlset>`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log('[prerender] ✓ Generated sitemap.xml');

  // --- Generate robots.txt ---
  const robots = `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots);
  console.log('[prerender] ✓ Generated robots.txt');

  // --- Try Puppeteer pre-rendering (optional, non-blocking) ---
  try {
    const puppeteerModule = await import('puppeteer');
    const puppeteer = puppeteerModule.default;
    const express = (await import('express')).default;

    console.log('[prerender] Attempting Puppeteer pre-rendering...');
    const PORT = 34567;
    
    const app = express();
    app.use(express.static(DIST_DIR));
    app.get('*', (req, res) => {
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    });

    const server = app.listen(PORT);
    
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
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
