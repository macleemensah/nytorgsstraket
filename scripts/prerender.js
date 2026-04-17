import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = (p) => path.resolve(__dirname, '../', p);

const DIST_DIR = resolve('dist');

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

async function render() {
  console.log('[prerender] Starting pre-render process...');
  const routes = await getRoutes();
  const PORT = 34567;
  
  const app = express();
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT);
  
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();

  // Unlock the dev mode by setting localStorage on the origin first
  await page.goto(`http://localhost:${PORT}`);
  await page.evaluate(() => localStorage.setItem('unlocked', 'true'));

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of routes) {
    console.log(`[prerender] Parsing: ${route}`);
    const url = `http://localhost:${PORT}${route}`;
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait for the main div to ensure React has painted
    await page.waitForSelector('#root > div', { timeout: 10000 }).catch(() => {});

    let html = await page.content();

    // Determine output file path
    const routeDir = path.join(DIST_DIR, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const filePath = path.join(routeDir, 'index.html');
    
    fs.writeFileSync(filePath, html);
    
    // Add to sitemap
    sitemap += `  <url>\n    <loc>https://nytorgsstraket.se${route}</loc>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  }

  sitemap += `</urlset>`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: https://nytorgsstraket.se/sitemap.xml\n`);

  console.log(`[prerender] Successfully rendered ${routes.length} pages and generated sitemap.xml.`);

  await browser.close();
  server.close();
  process.exit(0);
}

render().catch(e => {
  console.error('[prerender] Error during pre-rendering:', e);
  process.exit(1);
});
