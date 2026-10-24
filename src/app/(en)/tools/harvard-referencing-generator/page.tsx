import ToolPage from '@/components/tools/ToolPage';
import HarvardGenerator from '@/components/tools/HarvardGenerator';
import { toolMetadata } from '@/components/tools/toolMetadata';
import { getTool } from '@/content/tools';

export const metadata = toolMetadata('harvard-referencing-generator');

export default function Page() {
  return (
    <ToolPage tool={getTool('harvard-referencing-generator')!} bare>
      <HarvardGenerator />
    </ToolPage>
  );
}
