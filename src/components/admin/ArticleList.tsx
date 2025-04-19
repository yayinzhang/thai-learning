import { Article, ArticleStatus } from '@/types/models';

interface ArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onUpdateStatus: (articleId: string, status: ArticleStatus) => void;
}

export default function ArticleList({ articles, onEdit, onUpdateStatus }: ArticleListProps) {
  const getStatusText = (status: ArticleStatus) => {
    const statusMap = {
      draft: '草稿',
      published: '已發布',
      archived: '已典藏'
    };
    return statusMap[status] || '草稿';
  };

  const formatDate = (date: Date) => {
    try {
      return date instanceof Date ? date.toLocaleDateString('zh-TW') : '無日期';
    } catch (error) {
      console.error('日期格式化錯誤:', error);
      return '無日期';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">標題</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-32">狀態</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-32">更新時間</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider w-24">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-900">
                  尚無文章
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">
                    <div className="truncate max-w-md">{article.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={article.status || 'draft'}
                      onChange={(e) => onUpdateStatus(article.id, e.target.value as ArticleStatus)}
                      className="block w-full px-3 py-1.5 text-gray-900 border border-gray-300 rounded-md focus:ring-[#F2D4A7] focus:border-[#F2D4A7]"
                    >
                      <option value="draft">草稿</option>
                      <option value="published">已發布</option>
                      <option value="archived">已典藏</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {formatDate(article.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(article)}
                      className="text-gray-900 hover:text-[#F2D4A7] font-semibold"
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 