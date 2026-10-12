import { BookMarked, FileText, GraduationCap, type LucideIcon } from 'lucide-react';
import type { ToolId } from '@/content/tools';

export const TOOL_ICONS: Record<ToolId, LucideIcon> = {
  'degree-classification-calculator': GraduationCap,
  'harvard-referencing-generator': BookMarked,
  'word-counter': FileText,
};
