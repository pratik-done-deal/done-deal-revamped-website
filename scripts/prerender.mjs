// Runs after `vite build` + `vite build --ssr` (see package.json "build").
// Renders every route to static HTML with react-dom/server so crawlers get
// real content, a real <h1>, and per-page meta tags without executing JS —
// then writes sitemap.xml alongside it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const ssrEntry = path.join(rootDir, 'dist-ssr', 'entry-server.js');

const SITE_URL = 'https://www.done.deals';

const { render, getAllRoutes } = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const routes = getAllRoutes();

for (const route of routes) {
  const { html, helmet } = render(route);

  const headTags = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join('\n    ');

  const pageHtml = template
    .replace(/<title>.*?<\/title>/s, '')
    .replace('</head>', `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outPath = route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route.replace(/^\//, ''), 'index.html');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, pageHtml);
  console.log(`prerendered ${route} -> ${path.relative(rootDir, outPath)}`);
}

const urlEntries = routes
  .map((route) => `  <url><loc>${SITE_URL}${route === '/' ? '' : route}</loc></url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`wrote sitemap.xml with ${routes.length} urls`);
