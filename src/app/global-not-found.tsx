import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import RootDocument, { SITE_METADATA } from '@/components/RootDocument';
import Footer from '@/components/Footer';
import ArFooter from '@/components/ArFooter';
import ArNotFoundPage, { AR_NOT_FOUND_METADATA } from '@/components/pages/ArNotFoundPage';
import NotFound, { metadata as EN_NOT_FOUND_METADATA } from './(en)/not-found';

/** src/proxy.ts marks every /ar request, so an unknown /ar address gets the Arabic 404 */
async function isArabicRequest() {
  return (await headers()).get('x-fizbs-lang') === 'ar';
}

export async function generateMetadata(): Promise<Metadata> {
  return { ...SITE_METADATA, ...((await isArabicRequest()) ? AR_NOT_FOUND_METADATA : EN_NOT_FOUND_METADATA) };
}

/**
 * 404 for addresses that match no page (for example /a/b/c or /ar/no-such-page). With separate English
 * and Arabic root layouts there is no single layout to wrap it, so it renders the full document itself.
 */
export default async function GlobalNotFound() {
  if (await isArabicRequest()) {
    return (
      <RootDocument lang="ar" footer={<ArFooter />}>
        <ArNotFoundPage />
      </RootDocument>
    );
  }
  return (
    <RootDocument lang="en" footer={<Footer />}>
      <NotFound />
    </RootDocument>
  );
}
