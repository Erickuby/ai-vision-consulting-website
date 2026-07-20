#!/usr/bin/env python3
"""Generate crawlable static blog pages from source-controlled Markdown.

The renderer intentionally supports a small Markdown subset used by AVC's
articles. It has no third-party dependencies, which keeps releases repeatable.
"""

from __future__ import annotations

import html
import json
import re
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content" / "blog"
OUTPUT_DIR = ROOT / "public" / "blog"
TEMPLATE_PATH = OUTPUT_DIR / "what-is-ai.html"
SITE_URL = "https://aivisionconsulting.co.uk"


def parse_frontmatter(source: str) -> tuple[dict[str, str], str]:
    if not source.startswith("---\n"):
        raise ValueError("Article is missing YAML-style frontmatter")
    _, raw, body = source.split("---", 2)
    values: dict[str, str] = {}
    for line in raw.strip().splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        key, separator, value = line.partition(":")
        if not separator:
            raise ValueError(f"Invalid frontmatter line: {line}")
        value = value.strip()
        if value.startswith('"') and value.endswith('"'):
            value = json.loads(value)
        elif value.startswith("'") and value.endswith("'"):
            value = value[1:-1].replace("''", "'")
        values[key.strip()] = value
    return values, body.strip() + "\n"


def required(meta: dict[str, str], source: Path) -> None:
    fields = {
        "slug", "title", "meta_title", "meta_description", "excerpt",
        "category", "image", "image_alt", "read_time", "published_at",
        "updated_at", "primary_cta_label", "primary_cta_href",
        "secondary_cta_label", "secondary_cta_href",
    }
    missing = sorted(fields - meta.keys())
    if missing:
        raise ValueError(f"{source.name}: missing frontmatter: {', '.join(missing)}")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", meta["slug"]):
        raise ValueError(f"{source.name}: invalid slug {meta['slug']!r}")
    if not 140 <= len(meta["meta_description"]) <= 165:
        raise ValueError(f"{source.name}: meta description must be 140-165 characters")
    if "—" in source.read_text(encoding="utf-8"):
        raise ValueError(f"{source.name}: em dash character is not permitted")


def format_date(value: str) -> str:
    parsed = date.fromisoformat(value)
    return f"{parsed.day} {parsed.strftime('%b %Y')}"


def inline_markdown(value: str) -> str:
    escaped = html.escape(value, quote=False)

    def link(match: re.Match[str]) -> str:
        label = match.group(1)
        url = html.unescape(match.group(2).strip())
        safe_url = html.escape(url, quote=True)
        external = url.startswith("https://") or url.startswith("http://")
        attrs = ' target="_blank" rel="noopener noreferrer"' if external else ""
        notice = '<span class="sr-only"> (opens in a new tab)</span>' if external else ""
        return f'<a href="{safe_url}"{attrs}>{label}{notice}</a>'

    escaped = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
    return escaped


def split_sections(body: str) -> tuple[list[str], list[tuple[str, list[str]]]]:
    intro: list[str] = []
    sections: list[tuple[str, list[str]]] = []
    current_title: str | None = None
    current_lines: list[str] = []
    for line in body.splitlines():
        if line.startswith("# "):
            continue
        if line.startswith("## "):
            if current_title is None:
                intro = current_lines
            else:
                sections.append((current_title, current_lines))
            current_title = line[3:].strip()
            current_lines = []
        else:
            current_lines.append(line)
    if current_title is None:
        intro = current_lines
    else:
        sections.append((current_title, current_lines))
    return intro, sections


def render_blocks(lines: list[str]) -> str:
    output: list[str] = []
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if not line.strip():
            i += 1
            continue

        if line.startswith("### "):
            output.append(f"<h3>{inline_markdown(line[4:].strip())}</h3>")
            i += 1
            continue

        if line.startswith("|"):
            table_lines: list[str] = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip())
                i += 1
            rows = [[cell.strip() for cell in row.strip("|").split("|")] for row in table_lines]
            if len(rows) >= 2 and all(re.fullmatch(r":?-{3,}:?", cell) for cell in rows[1]):
                header, data = rows[0], rows[2:]
            else:
                header, data = rows[0], rows[1:]
            table_label = f"Scrollable table: {plain_text(header[0])}"
            output.append(
                f'<div class="article-table-wrap" role="region" aria-label="{html.escape(table_label, quote=True)}" tabindex="0"><table>'
            )
            output.append("<thead><tr>" + "".join(f"<th scope=\"col\">{inline_markdown(cell)}</th>" for cell in header) + "</tr></thead>")
            output.append("<tbody>")
            for row in data:
                output.append("<tr>" + "".join(f"<td>{inline_markdown(cell)}</td>" for cell in row) + "</tr>")
            output.append("</tbody></table></div>")
            continue

        if line.startswith(">"):
            quote: list[str] = []
            while i < len(lines) and (lines[i].strip().startswith(">") or not lines[i].strip()):
                if lines[i].strip().startswith(">"):
                    quote.append(lines[i].strip()[1:].strip())
                i += 1
            output.append(f'<blockquote class="article-note">{inline_markdown(" ".join(quote))}</blockquote>')
            continue

        unordered = re.match(r"^-\s+(.+)", line)
        ordered = re.match(r"^\d+\.\s+(.+)", line)
        if unordered or ordered:
            tag = "ul" if unordered else "ol"
            items: list[str] = []
            pattern = r"^-\s+(.+)" if unordered else r"^\d+\.\s+(.+)"
            while i < len(lines):
                match = re.match(pattern, lines[i].rstrip())
                if not match:
                    break
                items.append(match.group(1).strip())
                i += 1
            output.append(f'<{tag} class="article-list">')
            output.extend(f"<li>{inline_markdown(item)}</li>" for item in items)
            output.append(f"</{tag}>")
            continue

        paragraph = [line.strip()]
        i += 1
        while i < len(lines):
            candidate = lines[i].rstrip()
            if not candidate.strip():
                break
            if candidate.startswith(("### ", "|", ">", "- ")) or re.match(r"^\d+\.\s+", candidate):
                break
            paragraph.append(candidate.strip())
            i += 1
        output.append(f"<p>{inline_markdown(' '.join(paragraph))}</p>")
    return "\n".join(output)


def plain_text(markdown_text: str) -> str:
    value = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", markdown_text)
    value = re.sub(r"^#{1,6}\s+", "", value, flags=re.MULTILINE)
    value = re.sub(r"[*_`>]", "", value)
    return re.sub(r"\s+", " ", value).strip()


def faq_items(sections: list[tuple[str, list[str]]]) -> list[dict[str, str]]:
    for title, lines in sections:
        if title.lower() != "frequently asked questions":
            continue
        items: list[dict[str, str]] = []
        question: str | None = None
        answer_lines: list[str] = []
        for line in lines:
            if line.startswith("### "):
                if question:
                    items.append({"question": question, "answer": plain_text(" ".join(answer_lines))})
                question = plain_text(line[4:])
                answer_lines = []
            elif question and line.strip():
                answer_lines.append(line.strip())
        if question:
            items.append({"question": question, "answer": plain_text(" ".join(answer_lines))})
        return items
    return []


def build_schema(meta: dict[str, str], faqs: list[dict[str, str]]) -> dict:
    canonical = f"{SITE_URL}/blog/{meta['slug']}"
    graph: list[dict] = [
        {
            "@type": "Organization",
            "@id": f"{SITE_URL}/#organisation",
            "name": "AI Vision Consulting Ltd",
            "url": f"{SITE_URL}/",
            "logo": {"@type": "ImageObject", "url": f"{SITE_URL}/logo.svg"},
        },
        {
            "@type": "Person",
            "@id": f"{SITE_URL}/about-eric-nwankwo/#eric-nwankwo",
            "name": "Eric Nwankwo",
            "jobTitle": "Founder and AI Trainer",
            "worksFor": {"@id": f"{SITE_URL}/#organisation"},
            "url": f"{SITE_URL}/about-eric-nwankwo/",
        },
        {
            "@type": "BlogPosting",
            "@id": f"{canonical}#article",
            "headline": meta["title"],
            "description": meta["meta_description"],
            "image": [meta["image"]],
            "datePublished": meta["published_at"],
            "dateModified": meta["updated_at"],
            "mainEntityOfPage": canonical,
            "inLanguage": "en-GB",
            "author": {"@id": f"{SITE_URL}/about-eric-nwankwo/#eric-nwankwo"},
            "publisher": {"@id": f"{SITE_URL}/#organisation"},
            "articleSection": meta["category"],
            "url": canonical,
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{SITE_URL}/"},
                {"@type": "ListItem", "position": 2, "name": "Resources", "item": f"{SITE_URL}/#blog"},
                {"@type": "ListItem", "position": 3, "name": meta["title"], "item": canonical},
            ],
        },
    ]
    if faqs:
        graph.append({
            "@type": "FAQPage",
            "@id": f"{canonical}#faq",
            "mainEntity": [
                {"@type": "Question", "name": item["question"], "acceptedAnswer": {"@type": "Answer", "text": item["answer"]}}
                for item in faqs
            ],
        })
    return {"@context": "https://schema.org", "@graph": graph}


def button(href: str, label: str, primary: bool = False) -> str:
    external = href.startswith("https://") or href.startswith("http://")
    attrs = ' target="_blank" rel="noopener noreferrer"' if external else ""
    notice = '<span class="sr-only"> (opens in a new tab)</span>' if external else ""
    classes = "btn btn--primary" if primary else "btn btn--secondary"
    return f'<a class="{classes}" href="{html.escape(href, quote=True)}"{attrs}>{html.escape(label)}{notice}</a>'


def build_main(meta: dict[str, str], body: str) -> tuple[str, list[dict[str, str]]]:
    intro, sections = split_sections(body)
    faqs = faq_items(sections)
    quick = next((lines for title, lines in sections if title.lower() == "quick answer"), [])
    takeaways = next((lines for title, lines in sections if title.lower() == "key takeaways"), [])
    remaining = [(title, lines) for title, lines in sections if title.lower() not in {"quick answer", "key takeaways"}]

    summary = (
        '<div class="article-summary reveal">'
        '<div class="card"><h2>Quick answer</h2>' + render_blocks(quick) + '</div>'
        '<div class="card"><h2>Key takeaways</h2>' + render_blocks(takeaways) + '</div>'
        '</div>'
    )
    content_sections = []
    if any(line.strip() for line in intro):
        content_sections.append('<section class="article-section reveal" aria-label="Article overview">' + render_blocks(intro) + '</section>')
    for title, lines in remaining:
        aria = ' aria-label="Frequently asked questions"' if title.lower() == "frequently asked questions" else ""
        content_sections.append(
            f'<section class="article-section reveal"{aria}><h2>{html.escape(title)}</h2>{render_blocks(lines)}</section>'
        )

    canonical = f"{SITE_URL}/blog/{meta['slug']}"
    display_image = urlparse(meta["image"]).path
    main = f'''    <main id="main-content" class="section">
      <div class="container">
        <article>
          <div class="article-hero">
            <nav class="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#blog">Resources</a><span aria-hidden="true">/</span><span aria-current="page">{html.escape(meta['title'])}</span>
            </nav>
            <span class="badge badge--gold">{html.escape(meta['category'])}</span>
            <h1>{html.escape(meta['title'])}</h1>
            <p class="lede">{html.escape(meta['excerpt'])}</p>
            <div class="article-byline">
              <strong><a href="/about-eric-nwankwo/">Eric Nwankwo</a></strong><span>Founder and AI Trainer</span><time datetime="{meta['published_at']}">Published {format_date(meta['published_at'])}</time><time datetime="{meta['updated_at']}">Updated {format_date(meta['updated_at'])}</time><span>{html.escape(meta['read_time'])}</span>
            </div>
          </div>

          <figure class="article-figure reveal">
            <img src="{html.escape(display_image, quote=True)}" alt="{html.escape(meta['image_alt'], quote=True)}" width="1600" height="900" loading="eager" decoding="async">
          </figure>

          <div class="article-body-wrap">
            {summary}
            {''.join(content_sections)}
            <aside class="article-cta reveal" aria-label="Get practical help">
              <h2>Need practical help with this?</h2>
              <p>AI Vision Consulting provides practical training and implementation support. Choose the route that best matches what you are trying to do.</p>
              <div class="cta-row">{button(meta['primary_cta_href'], meta['primary_cta_label'], True)}{button(meta['secondary_cta_href'], meta['secondary_cta_label'])}</div>
            </aside>
          </div>
        </article>
      </div>
    </main>'''
    return main, faqs


def replace_meta(content: str, meta: dict[str, str], schema: dict) -> str:
    canonical = f"{SITE_URL}/blog/{meta['slug']}"
    title = meta['meta_title']
    replacements = {
        r"<title>.*?</title>": f"<title>{html.escape(title)}</title>",
        r'<meta name="description" content="[^"]*">': f'<meta name="description" content="{html.escape(meta["meta_description"], quote=True)}">',
        r'<link rel="canonical" href="[^"]*">': f'<link rel="canonical" href="{canonical}">',
        r'<meta property="og:title" content="[^"]*">': f'<meta property="og:title" content="{html.escape(title, quote=True)}">',
        r'<meta property="og:description" content="[^"]*">': f'<meta property="og:description" content="{html.escape(meta["meta_description"], quote=True)}">',
        r'<meta property="og:url" content="[^"]*">': f'<meta property="og:url" content="{canonical}">',
        r'<meta property="og:image" content="[^"]*">': f'<meta property="og:image" content="{html.escape(meta["image"], quote=True)}">',
        r'<meta property="og:image:alt" content="[^"]*">': f'<meta property="og:image:alt" content="{html.escape(meta["image_alt"], quote=True)}">',
        r'<meta property="og:image:width" content="[^"]*">': '<meta property="og:image:width" content="1600">',
        r'<meta property="og:image:height" content="[^"]*">': '<meta property="og:image:height" content="900">',
        r'<meta property="og:image:type" content="[^"]*">': '<meta property="og:image:type" content="image/png">',
        r'<meta property="article:published_time" content="[^"]*">': f'<meta property="article:published_time" content="{meta["published_at"]}">',
        r'<meta property="article:modified_time" content="[^"]*">': f'<meta property="article:modified_time" content="{meta["updated_at"]}">',
        r'<meta property="article:author" content="[^"]*">': f'<meta property="article:author" content="{SITE_URL}/about-eric-nwankwo/">',
        r'<meta property="article:section" content="[^"]*">': f'<meta property="article:section" content="{html.escape(meta["category"], quote=True)}">',
        r'<meta name="twitter:title" content="[^"]*">': f'<meta name="twitter:title" content="{html.escape(title, quote=True)}">',
        r'<meta name="twitter:description" content="[^"]*">': f'<meta name="twitter:description" content="{html.escape(meta["meta_description"], quote=True)}">',
        r'<meta name="twitter:image" content="[^"]*">': f'<meta name="twitter:image" content="{html.escape(meta["image"], quote=True)}">',
        r'<meta name="twitter:image:alt" content="[^"]*">': f'<meta name="twitter:image:alt" content="{html.escape(meta["image_alt"], quote=True)}">',
    }
    for pattern, replacement in replacements.items():
        content, count = re.subn(pattern, replacement, content, count=1, flags=re.DOTALL)
        if count != 1:
            raise ValueError(f"Template replacement failed: {pattern}")
    # Search engines do not use meta keywords, and stale inherited keywords are misleading.
    content = re.sub(r'\s*<meta name="keywords" content="[^"]*">', '', content, count=1)
    schema_json = json.dumps(schema, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
    content, count = re.subn(
        r'<script type="application/ld\+json">.*?</script>',
        f'<script type="application/ld+json">{schema_json}</script>',
        content,
        count=1,
        flags=re.DOTALL,
    )
    if count != 1:
        raise ValueError("Template JSON-LD replacement failed")
    return content


EXTRA_CSS = '''
    <style>
      .article-section a, .article-summary a { color: var(--brand-cyan-2); text-decoration: underline; text-underline-offset: 0.18em; }
      .article-list { margin: 0 0 var(--sp-3) 1.25rem; padding: 0; color: var(--text-200); }
      .article-list li { margin-bottom: 0.65rem; padding-left: 0.25rem; line-height: 1.75; }
      ul.article-list { list-style: disc; }
      ol.article-list { list-style: decimal; }
      .article-table-wrap { overflow-x: auto; margin: var(--sp-4) 0; border: 1px solid var(--border-mid); border-radius: var(--radius-md); }
      .article-table-wrap table { width: 100%; min-width: 640px; border-collapse: collapse; background: rgba(7,16,28,0.84); }
      .article-table-wrap th, .article-table-wrap td { padding: 0.85rem 1rem; text-align: left; vertical-align: top; border-bottom: 1px solid var(--border-subtle); }
      .article-table-wrap th { color: var(--text-100); background: rgba(46,196,199,0.10); font-family: 'Space Grotesk', sans-serif; }
      .article-table-wrap td { color: var(--text-200); line-height: 1.55; }
      .article-section h3 { margin-top: var(--sp-4); }
      .article-section code { color: var(--brand-gold-2); background: rgba(244,180,0,0.08); padding: 0.1rem 0.3rem; border-radius: 4px; }
    </style>
'''


def generate() -> None:
    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    sources = sorted(CONTENT_DIR.glob("*.md"))
    if not sources:
        raise SystemExit("No Markdown articles found")
    seen: set[str] = set()
    expected_outputs: set[Path] = set()
    for source in sources:
        meta, body = parse_frontmatter(source.read_text(encoding="utf-8"))
        required(meta, source)
        if meta["slug"] in seen:
            raise ValueError(f"Duplicate slug: {meta['slug']}")
        seen.add(meta["slug"])
        main, faqs = build_main(meta, body)
        page = replace_meta(template, meta, build_schema(meta, faqs))
        page, count = re.subn(r'<main id="main-content" class="section">.*?</main>', main.strip(), page, count=1, flags=re.DOTALL)
        if count != 1:
            raise ValueError(f"{source.name}: main replacement failed")
        page = page.replace("  </head>", EXTRA_CSS + "  </head>", 1)
        page, marker_count = re.subn(
            r"<!doctype html>",
            "<!doctype html>\n<!-- Generated by scripts/generate-static-blog.py -->",
            page,
            count=1,
            flags=re.IGNORECASE,
        )
        if marker_count != 1:
            raise ValueError(f"{source.name}: generated-file marker insertion failed")
        output = OUTPUT_DIR / f"{meta['slug']}.html"
        expected_outputs.add(output)
        output.write_text(page, encoding="utf-8")
        print(f"generated /blog/{meta['slug']} -> {output.relative_to(ROOT)} ({len(faqs)} FAQs)")

    for output in OUTPUT_DIR.glob("*.html"):
        if output in expected_outputs:
            continue
        text = output.read_text(encoding="utf-8")
        if "<!-- Generated by scripts/generate-static-blog.py -->" in text:
            output.unlink()


if __name__ == "__main__":
    generate()
