'use client';

import { useState, useEffect } from 'react';
import type { Article } from '@/types/models';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        const fetchedArticles: Article[] = await response.json();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  
  const filteredArticles = searchTerm
    ? articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.chineseContent.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : articles;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <h1>泰語學習筆記</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="搜尋文章..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="article-grid">
        {filteredArticles.map(article => (
          <Link
            href={`/articles/${article.id}`}
            key={article.id}
            className="article-card"
          >
            <div className="article-card-content">
              <h3>{article.title}</h3>
              <div className="article-meta">
                <span className="article-type">會話</span>
                <div className="article-stats">
                  <span className="word-count">{article.words?.length ?? 0} 個單字</span>
                  <span className="grammar-count">{article.grammarPoints?.length ?? 0} 個文法</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
