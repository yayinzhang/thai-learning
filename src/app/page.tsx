'use client';

import { useState } from 'react';
import { getPublishedArticles } from '@/services/articleService';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const articles = getPublishedArticles();
  
  const filteredArticles = searchTerm
    ? articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.chineseContent.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : articles;

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
                  <span className="word-count">{article.words.length} 個單字</span>
                  <span className="grammar-count">{article.grammarPoints.length} 個文法</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
