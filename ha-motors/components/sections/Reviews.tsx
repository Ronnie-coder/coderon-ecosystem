import { business } from "@/lib/business";
import { Icon } from "../ui/Icon";
import { Eyebrow, H2, Section } from "../ui/Section";

/**
 * Shows real reviews from business.reviews only. While that list is empty, no testimonials are
 * rendered, just a small "leave us a review" prompt (and only if the review link exists).
 */
export function Reviews() {
  const reviews = business.reviews;
  const url = business.googleReviewUrl;

  if (reviews.length === 0) {
    if (!url) return null; // TODO: set business.googleReviewUrl to show the review prompt
    return (
      <div className="bg-muted py-8">
        <p className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          Worked with us?{" "}
          <a href={url} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-green-dark underline underline-offset-2">
            Leave us a Google review
          </a>
        </p>
      </div>
    );
  }

  return (
    <Section bg="muted" labelledBy="reviews-title">
      <Eyebrow>Reviews</Eyebrow>
      <H2 id="reviews-title">What riders say</H2>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <li key={`${r.name}-${r.text.slice(0, 20)}`} className="rounded-2xl bg-white p-6 shadow-sm">
            {r.rating && (
              <p className="flex gap-0.5 text-brand-yellow" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }, (_, i) => (
                  <Icon key={i} name="star" className="h-5 w-5 fill-current" />
                ))}
              </p>
            )}
            <blockquote className="mt-3">&ldquo;{r.text}&rdquo;</blockquote>
            <p className="mt-3 font-semibold">
              {r.name} <span className="font-normal text-ink-soft">via {r.source}</span>
            </p>
          </li>
        ))}
      </ul>
      {url && (
        <p className="mt-6 text-center">
          <a href={url} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-green-dark underline underline-offset-2">
            Worked with us? Leave us a Google review
          </a>
        </p>
      )}
    </Section>
  );
}
