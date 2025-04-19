import Link from 'next/link';
import { GrammarPoint } from '@/types/models';

interface GrammarListProps {
  grammarPoints: GrammarPoint[];
  showArticleLink?: boolean;
}

export default function GrammarList({ grammarPoints, showArticleLink = false }: GrammarListProps) {
  return (
    <div className="space-y-6">
      {grammarPoints.map((grammar) => (
        <div key={grammar.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {grammar.title}
          </h3>
          <p className="text-gray-900 mb-4">
            {grammar.explanation}
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-2">例句：</h4>
            <p className="text-gray-900 mb-2">{grammar.example}</p>
            <h4 className="text-sm font-medium text-gray-900 mb-2">翻譯：</h4>
            <p className="text-gray-900">{grammar.translation}</p>
          </div>
          {showArticleLink && (
            <div className="mt-4">
              <Link
                href={`/articles/${grammar.articleId}`}
                className="text-gray-900 hover:text-[#F2D4A7] text-sm font-medium"
              >
                查看相關文章 →
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 