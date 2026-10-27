import { BookMarked, FileText, GraduationCap, Quote, Scale, type LucideIcon } from 'lucide-react';
import type { ToolId } from '@/content/tools';

export const TOOL_ICONS: Record<ToolId, LucideIcon> = {
  'degree-classification-calculator': GraduationCap,
  'harvard-referencing-generator': BookMarked,
  'apa-referencing-generator': Quote,
  'oscola-referencing-generator': Scale,
  'word-counter': FileText,
};
