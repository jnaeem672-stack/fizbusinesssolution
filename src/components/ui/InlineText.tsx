import Link from 'next/link';
import type { ReactNode } from 'react';

/** Internal links inside guide text, written as [label](/path). Only site paths that start with "/" are turned into links. */
const INLINE_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

const HAS_INLINE_LINK = /\[[^\]]+\]\(\/[^)\s]*\)/;

/** Text with link markup becomes <InlineText>; plain text stays a plain string, so pages without links render exactly as before. */
export function inline(text: string): ReactNode {
  return HAS_INLINE_LINK.test(text) ? <InlineText text={text} /> : text;
}

/** Removes the [label](/path) markup and keeps the label (for word counts and plain-text uses). */
export function plainText(text: string): string {
  return text.replace(INLINE_LINK, '$1');
}

/** Renders a sentence and turns any [label](/path) markup into an in-text link. */
export default function InlineText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE_LINK)) {
    const start = m.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <Link
        key={start}
        href={m[2]}
        className="font-bold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
      >
        {m[1]}
      </Link>,
    );
    last = start + m[0].length;
  }
  if (parts.length === 0) return <>{text}</>;
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
