import { Briefcase, ChartLine, Database, FileText, GraduationCap, Microscope, SpellCheck, type LucideIcon } from 'lucide-react';
import type { SampleCategoryId } from '@/content/samples';

export const CATEGORY_ICONS: Record<SampleCategoryId, LucideIcon> = {
  'assignments-essays': FileText,
  'reports-case-studies': Briefcase,
  'dissertations-theses': GraduationCap,
  'research-proposals': Microscope,
  'data-analysis': ChartLine,
  'computing-it': Database,
  'proofreading-editing': SpellCheck,
};
