import ToolPage from '@/components/tools/ToolPage';
import OscolaGenerator from '@/components/tools/OscolaGenerator';
import { toolMetadata } from '@/components/tools/toolMetadata';
import { getTool } from '@/content/tools';

export const metadata = toolMetadata('oscola-referencing-generator');

export default function Page() {
  return (
    <ToolPage tool={getTool('oscola-referencing-generator')!}>
      <OscolaGenerator />
    </ToolPage>
  );
}
