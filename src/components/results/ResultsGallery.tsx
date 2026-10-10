import { STUDENT_RESULTS, type StudentResult } from '@/content/results';
import ResultCard from './ResultCard';

export default function ResultsGallery({ results = STUDENT_RESULTS }: { results?: StudentResult[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
      {results.map((r) => (
        <ResultCard key={r.id} result={r} />
      ))}
    </div>
  );
}
