'use client';

import { useState } from 'react';
import { getPublishedArticles } from '@/services/articleService';
import { Word } from '@/types/models';
import Link from 'next/link';

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const articles = getPublishedArticles();
  const allWords: { word: Word; articleId: string }[] = articles.flatMap(article =>
    article.words.map(word => ({
      word,
      articleId: article.id
    }))
  );

  const filteredWords = searchTerm
    ? allWords.filter(({ word }) =>
        word.thai.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.chinese.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.pronunciation.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allWords;

  return (
    <div className="vocabulary-page">
      <h1>單字庫</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="搜尋單字..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="word-grid">
        {filteredWords.map(({ word, articleId }) => (
          <Link
            href={`/articles/${articleId}`}
            key={`${articleId}-${word.thai}`}
            className="word-card"
          >
            <div className="word-content">
              <h3 className="word-thai">{word.thai}</h3>
              <p className="word-pronunciation">{word.pronunciation}</p>
              <div className="word-details">
                <span className="word-type">{word.type}</span>
                <p className="word-chinese">{word.chinese}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 