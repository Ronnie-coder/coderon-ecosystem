import { Fragment } from 'react';

/** Renders "Words with *one* accent" with the starred word in the gold serif style. */
export default function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith('*') ? (
          <span key={i} className="accent">{part.slice(1, -1)}</span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
