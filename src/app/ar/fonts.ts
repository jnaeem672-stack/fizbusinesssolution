import localFont from 'next/font/local';

/**
 * Cairo for the Arabic pages, preloaded. Arabic headings and text are the first thing painted on these
 * pages, so the font is fetched with the HTML instead of after the CSS (fewer late text swaps and
 * layout shifts). Declared here, not in RootDocument, so English pages never preload it.
 * Same file, weights and unicode-range as the shared declaration in src/components/RootDocument.tsx.
 */
export const cairoArabicPreloaded = localFont({
  src: '../../fonts/cairo-arabic-wght.woff2',
  weight: '200 1000',
  display: 'swap',
  variable: '--font-arabic',
  preload: true,
  adjustFontFallback: false,
  declarations: [
    { prop: 'unicode-range', value: 'U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC' },
  ],
});
