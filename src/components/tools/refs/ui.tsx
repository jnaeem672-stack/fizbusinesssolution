'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import type { Segment } from '@/utils/harvard';

export async function copyRich(html: string, text: string) {
  try {
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' }),
        }),
      ]);
      return true;
    }
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function Rich({ segs }: { segs: Segment[] }) {
  return (
    <>
      {segs.map((sg, i) => (sg.italic ? <i key={i}>{sg.text}</i> : <span key={i}>{sg.text}</span>))}
    </>
  );
}

/** A copy button that shows a tick for a moment after copying */
export function CopyButton({
  html,
  text,
  label,
  tone = 'dark',
  children,
}: {
  html: string;
  text: string;
  label: string;
  tone?: 'dark' | 'light' | 'plain';
  children?: ReactNode;
}) {
  const [done, setDone] = useState(false);
  const cls =
    tone === 'dark'
      ? 'inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-black text-white hover:bg-white/20'
      : tone === 'light'
        ? 'inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-navy'
        : 'inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-navy hover:border-primary';
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyRich(html, text)) {
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        }
      }}
      className={cls}
      aria-label={label}
      title={tone === 'light' ? label : undefined}
    >
      {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      {tone !== 'light' && (children ?? (done ? 'Copied' : 'Copy'))}
    </button>
  );
}
