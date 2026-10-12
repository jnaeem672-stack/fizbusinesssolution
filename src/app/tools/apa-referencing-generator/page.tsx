import ToolPage from '@/components/tools/ToolPage';
import ApaGenerator from '@/components/tools/ApaGenerator';
import { toolMetadata } from '@/components/tools/toolMetadata';
import { getTool } from '@/content/tools';

export const metadata = toolMetadata('apa-referencing-generator');

export default function Page() {
  return (
    <ToolPage tool={getTool('apa-referencing-generator')!}>
      <ApaGenerator />
    </ToolPage>
  );
}
