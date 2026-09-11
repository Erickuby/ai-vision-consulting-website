"""Check rendered requirements of the September 2026 website brief."""
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import json
import re
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
ORIGIN = 'https://aivisionconsulting.co.uk'
errors = []
checks = 0

def check(condition, message):
    global checks
    checks += 1
    if not condition:
        errors.append(message)

def normal(text):
    return re.sub(r'\s+', ' ', text.replace('(opens in a new tab)', '')).strip()

def file_for(path):
    target = DIST / unquote(path.lstrip('/'))
    if target.is_dir():
        return target / 'index.html'
    if not target.suffix and target.with_suffix('.html').exists():
        return target.with_suffix('.html')
    return target

pages = {p: BeautifulSoup(p.read_text(encoding='utf-8'), 'html.parser') for p in DIST.rglob('*.html')}
metadata = json.loads((DIST / 'content-metadata.json').read_text(encoding='utf-8'))
courses = list((DIST / 'courses').glob('*/index.html'))
check(len(courses) == 24, 'Expected all 24 catalogue topics to have course pages')

for file, soup in pages.items():
    rel = file.relative_to(DIST).as_posix()
    page_path = '/' + rel.removesuffix('index.html') if rel.endswith('index.html') else '/' + rel
    check(len(soup.select('h1')) == 1, f'{rel}: H1 count')
    check(bool(soup.select_one('meta[name="description"]')), f'{rel}: missing description')
    check('\ufffd' not in soup.get_text(), f'{rel}: broken character encoding')
    for link in soup.select('a[href]'):
        url = urlsplit(urljoin(ORIGIN + page_path, link['href']))
        if url.scheme not in ('http', 'https') or url.netloc != 'aivisionconsulting.co.uk':
            continue
        dest = file_for(url.path)
        check(dest.is_file(), f'{rel}: missing internal destination {link["href"]}')
        if url.fragment and dest in pages:
            check(pages[dest].find(id=unquote(url.fragment)) is not None, f'{rel}: missing anchor {link["href"]}')
    graphs = []
    for tag in soup.select('script[type="application/ld+json"]'):
        data = json.loads(tag.string or tag.get_text())
        graphs.extend(data.get('@graph', [data]))
    for graph in graphs:
        if graph.get('@type') == 'FAQPage':
            for faq in graph['mainEntity']:
                check(normal(faq['name']) in normal(soup.get_text(' ')), f'{rel}: FAQ question not visible')
                check(normal(faq['acceptedAnswer']['text']) in normal(soup.get_text(' ')), f'{rel}: FAQ answer does not match schema')
    if file in courses:
        main = soup.select_one('main')
        course = next((g for g in graphs if g.get('@type') == 'Course'), None)
        check(course is not None, f'{rel}: Course schema missing')
        if course:
            offer = course['offers']
            check(offer['price'] == ('995' if 'agent-365-governance' in rel else '95'), f'{rel}: incorrect course price')
            check(offer['priceCurrency'] == 'GBP' and offer['validFrom'] == '2026-09-10', f'{rel}: currency or validity date')
        check(main.find_all('h2')[-1].get_text() == 'You will leave with', f'{rel}: final course section must list deliverables')
        check(main.find_all('h2')[-1].find_next('ul') is not None, f'{rel}: missing deliverable list')
        check(any('/blog/' in a['href'] for a in main.select('a[href]')), f'{rel}: supporting blog missing')
        check(metadata[page_path]['cpd-accredited'] is False, f'{rel}: accreditation must remain false')
        check(not main.select('a.badge[href]'), f'{rel}: unexpected accreditation badge')
    if page_path in metadata and (page_path.startswith('/courses/') or page_path in [
        '/ai-training-newcastle/', '/ai-automation-consultant-newcastle/', '/corporate-ai-training-uk/',
        '/ai-voice-assistant/', '/small-business-ai-automation/', '/community-employability-ai-training/',
        '/services/ai-policy-and-governance/', '/services/ai-workflow-audit/',
    ]):
        review = soup.select_one('main footer.content-review time')
        check(review is not None and review.get('datetime') == metadata[page_path]['last-reviewed'], f'{rel}: footer review metadata')

pricing = pages[DIST / 'pricing/index.html']
check(len(pricing.select('.topic-choice input[type="checkbox"]')) == 23, 'Corporate-only topic must be excluded from 23 individual choices')
course_links = {urlsplit(a['href']).path for a in pricing.select('a[href]') if a['href'].startswith('/courses/')}
check(len(course_links) == 24, 'Catalogue must link all 24 topics')
graph = json.loads(pricing.select_one('script[type="application/ld+json"]').string)['@graph']
offers = next(g['itemListElement'] for g in graph if g['@type'] == 'OfferCatalog')
expected_prices = ['95','270','510','900','395','995','1450','2450','4800','1750','950']
check([offer['price'] for offer in offers] == expected_prices, 'All eleven prices must match the requested ladder')
check(all(offer['priceCurrency'] == 'GBP' and offer['validFrom'] == '2026-09-10' for offer in offers), 'Pricing offer currency and date')
check('From £995' in normal(pricing.get_text()), 'Team essentials From £995 invariant')
check('60 days' in normal(pricing.get_text()), 'Audit credit deadline missing')

for slug, price in [('ai-policy-and-governance','1750'), ('ai-workflow-audit','950')]:
    soup = pages[DIST / f'services/{slug}/index.html']
    graph = json.loads(soup.select_one('script[type="application/ld+json"]').string)['@graph']
    service = next(g for g in graph if g['@type'] == 'Service')
    check(service.get('offers', {}).get('price') == price, f'{slug}: Service offer missing or incorrect')
    check(any(g['@type'] == 'FAQPage' for g in graph), f'{slug}: FAQ schema missing')

case_page = pages[DIST / 'case-studies/index.html']
cases = case_page.select('.case-study-card')
check(len(cases) == 2, 'Only the two confirmed completed trainings should appear')
check('FDQ' in case_page.get_text() and '12-week' in case_page.get_text(), 'Confirmed FDQ and 12-week training missing')
check(not re.search(r'awaiting|being prepared|nine.week|case.study framework', case_page.get_text(), re.I), 'Unfinished or superseded case-study copy remains')
for case in cases:
    check(not case.select('blockquote'), 'No client quote supplied for completed training')


for file in (ROOT / 'content/blog').glob('*.md'):
    source = file.read_text(encoding='utf-8')
    if re.search(r'cowork|copilot credits|copilot agent|agent mode|researcher|analyst', source, re.I):
        check('/courses/' in source, f'{file.name}: relevant blog must link to a course')

xml = ET.parse(DIST / 'sitemap.xml')
entries = {e.find('{*}loc').text: e.find('{*}lastmod').text for e in xml.findall('{*}url')}
for route, data in metadata.items():
    check(entries.get(ORIGIN + route) == data['last-reviewed'], f'{route}: sitemap review date')
for slug in ['copilot-cowork-and-credits','copilot-agent-mode-word-excel-powerpoint','copilot-researcher-and-analyst-agents','ai-training-for-employees']:
    check(entries.get(ORIGIN + '/blog/' + slug) == '2026-09-11', f'{slug}: sitemap must use update date')

report = {'checks': checks, 'html_pages': len(pages), 'courses': len(courses), 'sitemap_urls': len(entries), 'errors': errors}
(ROOT / 'docs/website-update-2026-09/rendered-audit.json').write_text(json.dumps(report, indent=2)+'\n', encoding='utf-8')
print(json.dumps(report, indent=2))
raise SystemExit(bool(errors))
