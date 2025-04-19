import { useState } from 'react';
import { Article, ArticleStatus, Word, GrammarPoint } from '@/types/models';

interface ArticleFormProps {
  article?: Article | null;
  onSave: (article: Article) => void;
  onCancel: () => void;
}

export default function ArticleForm({ article, onSave, onCancel }: ArticleFormProps) {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || '',
    url: article?.url || '',
    chineseTitle: article?.chineseTitle || '',
    chineseContent: article?.chineseContent || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 準備文章數據
      const articleId = article?.id || Date.now().toString();
      
      // 確保現有的單字和語法點都有 ID
      const words = article?.words?.map(word => ({
        ...word,
        id: word.id || `word-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        articleId
      })) || [];

      const grammarPoints = article?.grammarPoints?.map(point => ({
        ...point,
        id: point.id || `grammar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        articleId
      })) || [];

      const articleData: Article = {
        id: articleId,
        title: formData.title,
        content: formData.content,
        chineseTitle: formData.chineseTitle,
        chineseContent: formData.chineseContent,
        url: formData.url,
        status: article?.status || 'draft',
        createdAt: article?.createdAt || new Date(),
        updatedAt: new Date(),
        words,
        grammarPoints
      };

      onSave(articleData);
    } catch (error) {
      console.error('儲存文章時發生錯誤：', error);
      alert('儲存文章時發生錯誤，請稍後再試。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          泰文標題
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F7E7CE] focus:ring-[#F7E7CE]"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          泰文內容
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          value={formData.content}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F7E7CE] focus:ring-[#F7E7CE]"
        />
      </div>

      <div>
        <label htmlFor="chineseTitle" className="block text-sm font-medium text-gray-700">
          中文標題
        </label>
        <input
          type="text"
          id="chineseTitle"
          name="chineseTitle"
          value={formData.chineseTitle}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F7E7CE] focus:ring-[#F7E7CE]"
        />
      </div>

      <div>
        <label htmlFor="chineseContent" className="block text-sm font-medium text-gray-700">
          中文內容
        </label>
        <textarea
          id="chineseContent"
          name="chineseContent"
          rows={6}
          value={formData.chineseContent}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F7E7CE] focus:ring-[#F7E7CE]"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          參考網址
        </label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F7E7CE] focus:ring-[#F7E7CE]"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7E7CE]"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C4A484] hover:bg-[#B08968] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7E7CE]"
        >
          儲存
        </button>
      </div>
    </form>
  );
} 