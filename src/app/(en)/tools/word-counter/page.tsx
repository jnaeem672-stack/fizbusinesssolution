import ToolPage from '@/components/tools/ToolPage';
import WordCounter from '@/components/tools/WordCounter';
import { toolMetadata } from '@/components/tools/toolMetadata';
import { getTool } from '@/content/tools';

export const metadata = toolMetadata('word-counter');

export default function Page() {
  return (
    <ToolPage tool={getTool('word-counter')!}>
      <WordCounter />
    </ToolPage>
  );
}
