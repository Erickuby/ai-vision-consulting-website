import { useEffect, useState } from 'react';
import { accreditationEvidence, contentMetadata, validContentMetadata } from '../data/contentMetadata';

export function ContentReview({ path }: { path: string }) {
  const [current, setCurrent] = useState(contentMetadata[path]);
  useEffect(() => {
    setCurrent(contentMetadata[path]);
    const controller = new AbortController();
    fetch('/content-metadata.json', { cache: 'no-cache', signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Metadata unavailable'); return response.json(); })
      .then(data => { if (validContentMetadata(data?.[path])) setCurrent(data[path]); })
      .catch(() => { /* Keep the reviewed build metadata when offline. */ });
    return () => controller.abort();
  }, [path]);
  if (!current || !validContentMetadata(current)) return null;
  const evidence = accreditationEvidence(current);
  const date = current['last-reviewed'];
  const displayDate = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
  return <footer className="seo-container content-review">
    <p>Last reviewed: <time dateTime={date}>{displayDate}</time></p>
    {evidence && <p><a className="badge badge-cyan" href={evidence} target="_blank" rel="noopener noreferrer">CPD accredited by {current['cpd-provider']}</a></p>}
  </footer>;
}
