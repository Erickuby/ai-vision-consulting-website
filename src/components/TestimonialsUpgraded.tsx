import { useState } from 'react';

const reviews = [
  { name: 'Carl Bromilow', text: 'Eric was very knowledgeable, thank you' },
  { name: 'Tolulola Adebiyi', text: 'Had my first session with them and it was good to see they are well equipped to train people in the use of AI' },
  { name: 'Toluwalope Opadeyi', text: 'Lovely session and well explained. Thanks Eric' },
  { name: 'Alexandrai Ishiekwene', text: 'Thank you for your selfless teachings Eric.' },
];

export function TestimonialsUpgraded() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="seo-container reviews-heading">
        <div>
          <p className="eyebrow">Client feedback · Rated 5.0 on Google</p>
          <h2 id="reviews-heading">Trusted for clear, practical teaching.</h2>
        </div>
        <button className="reviews-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-controls="reviews-strip">
          {paused ? 'Resume scrolling' : 'Pause scrolling'}
        </button>
      </div>
      <div id="reviews-strip" className="reviews-viewport" tabIndex={0} role="region" aria-label="Customer reviews. Focus or hover to pause; scroll sideways to read." data-paused={paused}>
        <div className="reviews-track">
          {[false, true].map(duplicate => (
            <div className="reviews-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>
              {reviews.map(review => (
                <figure className="review-quote" key={review.name}>
                  <div className="review-stars" aria-label="5 out of 5 stars">{'★★★★★'}</div>
                  <blockquote>“{review.text}”</blockquote>
                  <figcaption>{review.name}<span>Google review</span></figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="seo-container reviews-footer">
        <a className="hero-text-link" href="https://www.google.com/maps/place/AI+Vision+Consulting/data=!4m2!3m1!1s0x0:0xd1dfe04eff31d12b" target="_blank" rel="noopener noreferrer">Read reviews on Google <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
