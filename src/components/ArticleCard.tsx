import Link from 'next/link';
import { Article } from '@/types/models';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link 
      href={`/articles/${article.id}`}
      className="block p-6 bg-white rounded-lg border border-[#F7E7CE] shadow-md hover:border-[#F2D4A7] hover:shadow-lg transition-all duration-200"
    >
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {article.title}
      </h2>
      <p className="font-normal text-gray-700">
        {article.content.substring(0, 150)}
        {article.content.length > 150 && '...'}
      </p>
      <div className="mt-4 text-sm text-gray-500">
        發布於：{article.createdAt.toLocaleDateString()}
      </div>
    </Link>
  );
} 