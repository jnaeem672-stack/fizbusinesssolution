/**
 * Arabic navigation links. Kept free of page content so the header and footer can use them
 * without adding the landing page texts to the browser bundle.
 */

export type NavItem = { label: string; href: string };

/** True for the Arabic part of the site (/ar and everything under it) */
export function isArabicPath(pathname?: string | null): boolean {
  return Boolean(pathname) && (pathname === '/ar' || pathname!.startsWith('/ar/'));
}

export const SAUDI_CITY_SLUGS = [
  'assignment-help-riyadh',
  'assignment-help-jeddah',
  'assignment-help-dammam',
  'assignment-help-makkah',
];

/** Arabic city pages, labelled for Arabic readers (same slugs as the English city pages) */
const AR_CITY_NAMES: Record<string, string> = {
  'assignment-help-riyadh': 'الرياض',
  'assignment-help-jeddah': 'جدة',
  'assignment-help-dammam': 'الدمام',
  'assignment-help-makkah': 'مكة المكرمة',
};

export const AR_CITY_LINKS: NavItem[] = SAUDI_CITY_SLUGS.map((slug) => ({
  label: `الواجبات الجامعية في ${AR_CITY_NAMES[slug]}`,
  href: `/ar/${slug}`,
}));

/** Arabic service pages */
export const AR_SERVICE_LINKS: NavItem[] = [
  { label: 'مكتب خدمات طلابية أونلاين', href: '/ar/student-services' },
  { label: 'المساعدة في الواجبات الجامعية', href: '/ar/assignment-help-saudi-arabia' },
  { label: 'المساعدة في الرسائل العلمية', href: '/ar/dissertation-help-saudi-arabia' },
  { label: 'المساعدة في خطة البحث', href: '/ar/research-proposal-help' },
  { label: 'المساعدة في رسالة الدكتوراه', href: '/ar/thesis-help' },
  { label: 'التحليل الإحصائي SPSS', href: '/ar/spss-help' },
  { label: 'المساعدة في واجبات MBA', href: '/ar/mba-assignment-help' },
  { label: 'المساعدة في القبول في الدكتوراه', href: '/ar/phd-admission-scholarship-help' },
];

/** Arabic pages for design, engineering software and programming projects */
export const AR_TECH_LINKS: NavItem[] = [
  { label: 'مشاريع 3ds Max والتصميم الداخلي', href: '/ar/3ds-max-design-help' },
  { label: 'مشاريع AutoCAD والرسم الهندسي', href: '/ar/autocad-help' },
  { label: 'مشاريع SolidWorks والتصميم الميكانيكي', href: '/ar/solidworks-help' },
  { label: 'واجبات البرمجة Python وMATLAB', href: '/ar/programming-help' },
];
