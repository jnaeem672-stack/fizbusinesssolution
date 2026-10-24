import ArNotFoundPage, { AR_NOT_FOUND_METADATA } from '@/components/pages/ArNotFoundPage';

export const metadata = AR_NOT_FOUND_METADATA;

/** Shown when an Arabic page calls notFound(); unknown /ar addresses use app/global-not-found.tsx */
export default function ArabicNotFound() {
  return <ArNotFoundPage />;
}
