'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/types/models';
import { getAllArticles, saveArticle, updateArticleStatus } from '@/services/articleService';
import ArticleForm from '@/components/admin/ArticleForm';

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const loadedArticles = getAllArticles();
    setArticles(loadedArticles);
  };

  const handleCreateNew = () => {
    setSelectedArticle(null);
    setShowForm(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setShowForm(true);
  };

  const handleSaveArticle = (articleData: Article) => {
    saveArticle(articleData);
    setShowForm(false);
    loadArticles();
  };

  const handleUpdateStatus = (articleId: string, newStatus: 'draft' | 'published') => {
    updateArticleStatus(articleId, newStatus);
    loadArticles();
  };

  if (showForm) {
    return (
      <div className="admin-container">
        <div className="admin-header">
          <h1>編輯文章</h1>
          <button className="admin-button" onClick={() => setShowForm(false)}>
            返回列表
          </button>
        </div>
        <ArticleForm
          article={selectedArticle}
          onSave={handleSaveArticle}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>文章管理</h1>
        <button className="admin-button" onClick={handleCreateNew}>
          新增文章
        </button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>標題</th>
              <th>類型</th>
              <th>狀態</th>
              <th>更新時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.type}</td>
                <td>
                  <span className={`status-badge ${article.status}`}>
                    {article.status === 'published' ? '已發布' : '草稿'}
                  </span>
                </td>
                <td>{new Date(article.updatedAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-button"
                      onClick={() => handleEdit(article)}
                    >
                      編輯
                    </button>
                    <button
                      className="action-button"
                      onClick={() =>
                        handleUpdateStatus(
                          article.id,
                          article.status === 'published' ? 'draft' : 'published'
                        )
                      }
                    >
                      {article.status === 'published' ? '下架' : '發布'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 