import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const server = await import(`${pathToFileURL(serverEntry).href}?t=${Date.now()}`);
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const safeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

function structuredData(route) {
  const canonical = server.routeCanonical(route);
  const pageType = route.kind === 'contact'
    ? 'ContactPage'
    : route.path === '/about-eric-nwankwo/'
      ? 'ProfilePage'
      : route.path === '/case-studies/' || route.kind === 'pricing'
        ? 'CollectionPage'
        : 'WebPage';
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${server.SITE_URL}/#organisation`,
      name: 'AI Vision Consulting Ltd',
      url: `${server.SITE_URL}/`,
      logo: `${server.SITE_URL}/logo.svg`,
      email: 'eric@aivisionconsulting.co.uk',
      telephone: '+447341183915',
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      sameAs: [
        'https://www.linkedin.com/in/eric-nwankwo/',
        'https://www.instagram.com/aivisionconsulting/',
        'https://www.youtube.com/@EricExplainsAI',
      ],
    },
    {
      '@type': pageType,
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': `${server.SITE_URL}/#website` },
      about: { '@id': `${server.SITE_URL}/#organisation` },
    },
    {
      '@type': 'WebSite',
      '@id': `${server.SITE_URL}/#website`,
      url: `${server.SITE_URL}/`,
      name: 'AI Vision Consulting Ltd',
      publisher: { '@id': `${server.SITE_URL}/#organisation` },
    },
  ];

  if (route.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${server.SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: route.h1, item: canonical },
      ],
    });
  }

  if (route.kind === 'service') {
    const isNewcastleService = route.path.includes('newcastle');
    graph.push({
      '@type': 'Service',
      name: route.h1,
      description: route.description,
      provider: { '@id': `${server.SITE_URL}/#organisation` },
      areaServed: isNewcastleService
        ? { '@type': 'City', name: 'Newcastle upon Tyne' }
        : { '@type': 'Country', name: 'United Kingdom' },
      url: canonical,
    });
  }

  if (route.path === '/about-eric-nwankwo/') {
    graph.push({
      '@type': 'Person',
      '@id': `${server.SITE_URL}/about-eric-nwankwo/#eric-nwankwo`,
      name: 'Eric Nwankwo',
      jobTitle: 'Founder',
      worksFor: { '@id': `${server.SITE_URL}/#organisation` },
      url: canonical,
      sameAs: ['https://www.linkedin.com/in/eric-nwankwo/'],
    });
  }

  if (route.kind === 'pricing') {
    graph.push({
      '@type': 'OfferCatalog',
      name: 'AI training and consulting services',
      url: canonical,
      itemListElement: [{
        '@type': 'Offer',
        name: 'One-to-one AI consulting',
        price: '75',
        priceCurrency: 'GBP',
        url: canonical,
        itemOffered: {
          '@type': 'Service',
          name: 'One-to-one AI consulting',
          provider: { '@id': `${server.SITE_URL}/#organisation` },
        },
      }],
    });
  }

  if (route.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: route.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function createHead(route) {
  const canonical = server.routeCanonical(route);
  const image = `${server.SITE_URL}/og-image.jpg`;
  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    route.noindex ? '<meta name="robots" content="noindex, follow" />' : '',
    route.noindex ? '' : `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:locale" content="en_GB" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    route.noindex ? '' : `<script type="application/ld+json">${safeJson(structuredData(route))}</script>`,
  ].filter(Boolean).join('\n    ');
}

function outputPath(routePath) {
  if (routePath === '/') return path.join(distDir, 'index.html');
  if (routePath === '/404.html') return path.join(distDir, '404.html');
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

function textContent(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

const errors = [];
const seenTitles = new Set();
const seenCanonicals = new Set();
for (const route of server.siteRoutes) {
  const appHtml = server.render(route.path);
  const html = template.replace('<!--seo-head-->', createHead(route)).replace('<!--app-html-->', appHtml);
  const file = outputPath(route.path);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);

  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const titleCount = (html.match(/<title>/gi) || []).length;
  const canonicalCount = (html.match(/<link rel="canonical"/gi) || []).length;
  const contentLength = textContent(appHtml).length;
  const minimum = route.kind === 'not-found' ? 150 : 500;
  if (h1Count !== 1) errors.push(`${route.path}: expected one H1, found ${h1Count}`);
  if (titleCount !== 1) errors.push(`${route.path}: expected one title, found ${titleCount}`);
  const expectedCanonicalCount = route.noindex ? 0 : 1;
  if (canonicalCount !== expectedCanonicalCount) errors.push(`${route.path}: expected ${expectedCanonicalCount} canonical, found ${canonicalCount}`);
  if (!html.includes(`<meta name="description" content="${escapeHtml(route.description)}"`)) errors.push(`${route.path}: missing route description`);
  if (!html.includes('<meta property="og:title"')) errors.push(`${route.path}: missing Open Graph tags`);
  if (contentLength < minimum) errors.push(`${route.path}: only ${contentLength} characters of rendered content (minimum ${minimum})`);
  if (seenTitles.has(route.title)) errors.push(`${route.path}: duplicate title ${route.title}`);
  seenTitles.add(route.title);
  if (!route.noindex) {
    const canonical = server.routeCanonical(route);
    if (seenCanonicals.has(canonical)) errors.push(`${route.path}: duplicate canonical ${canonical}`);
    seenCanonicals.add(canonical);
  }
  console.log(`prerendered ${route.path} -> ${path.relative(root, file)} (${contentLength} chars)`);
}

await rm(path.join(distDir, 'src'), { recursive: true, force: true });
for (const slug of [
  'what-is-ai',
  '8-ai-prompts-every-job-seeker-needs-right-now',
  'how-to-start-an-ai-side-hustle-from-scratch-in-2026',
  'agentic-ai-and-automation-how-to-scale-your-business-career-work-and-life',
]) {
  try {
    await readFile(path.join(distDir, 'blog', `${slug}.html`), 'utf8');
  } catch {
    errors.push(`/blog/${slug}: static article missing from clean build`);
  }
}
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Verified ${server.siteRoutes.length} prerendered routes.`);
