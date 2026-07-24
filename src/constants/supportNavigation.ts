export const SUPPORT_FORM_ID = 'support-form';
export const SUPPORT_FORM_HASH = '#support-form';
export const SUPPORT_FORM_QUERY = 'support';
export const SUPPORT_FORM_PATH = `/${SUPPORT_FORM_HASH}`;

export function shouldScrollToSupportForm(searchParams: URLSearchParams): boolean {
  return searchParams.has(SUPPORT_FORM_QUERY) || searchParams.get('scrollTo') === 'support';
}

export function scrollToSupportForm() {
  document.getElementById(SUPPORT_FORM_ID)?.scrollIntoView({ behavior: 'smooth' });
}
