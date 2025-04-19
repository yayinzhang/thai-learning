import Link from 'next/link';
import { Word } from '@/types/models';

interface WordTableProps {
  words: Word[];
  showArticleLink?: boolean;
}

export default function WordTable({ words, showArticleLink = false }: WordTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              泰語單字
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              詞性
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              意思
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              例句
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              發音
            </th>
            {showArticleLink && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                來源文章
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {words.map((word) => (
            <tr key={word.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                {word.thai}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                {word.type}
              </td>
              <td className="px-6 py-4 text-gray-900">
                {word.meaning}
              </td>
              <td className="px-6 py-4 text-gray-900">
                {word.example}
              </td>
              <td className="px-6 py-4 text-gray-900">
                {word.pronunciation}
              </td>
              {showArticleLink && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={`/articles/${word.articleId}`}
                    className="text-gray-900 hover:text-[#F2D4A7]"
                  >
                    查看文章
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 