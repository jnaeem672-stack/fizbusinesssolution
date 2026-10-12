import ToolPage from '@/components/tools/ToolPage';
import DegreeCalculator from '@/components/tools/DegreeCalculator';
import { toolMetadata } from '@/components/tools/toolMetadata';
import { getTool } from '@/content/tools';

export const metadata = toolMetadata('degree-classification-calculator');

export default function Page() {
  return (
    <ToolPage tool={getTool('degree-classification-calculator')!}>
      <DegreeCalculator />
    </ToolPage>
  );
}
