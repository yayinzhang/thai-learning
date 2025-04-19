'use client';

import { useEffect, useState } from 'react';
import { Article } from '@/types/models';
import { notFound } from 'next/navigation';

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${params.id}`);
        if (!res.ok) {
          console.error('Fetch failed with status:', res.status);
          return notFound();
        }
        const data = await res.json();
        if (data.status !== 'published') {
          console.warn('Article status not published:', data.status);
          return notFound();
        }
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        return notFound();
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [params.id]);

  if (isLoading) {
    return <div className="loading">載入中...</div>;
  }

  if (!article) {
    return notFound();
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>

      <section className="article-content-section">
        <h2>泰語原文 Thai</h2>
        <div className="thai-content">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="article-content-section">
        <h2>中文翻譯</h2>
        <div className="chinese-content">
          {article.chineseContent.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="vocabulary-section">
        <h2>單字列表</h2>
        <div className="word-list">
          {article.words?.map((word, index) => (
            <div key={index} className="word-item">
              <span className="thai-word">{word.thai}</span>
              <span className="word-type">{word.type}</span>
              <span className="chinese-meaning">{word.chinese}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grammar-section">
        <h2>文法重點</h2>
        <div className="grammar-list">
          {article.grammarPoints?.map((point, index) => (
            <div key={index} className="grammar-item">
              <h3>{point.title}</h3>
              <p className="explanation">{point.explanation}</p>
              <div className="examples">
                {point.examples.map((example, i) => (
                  <div key={i} className="example">
                    <p className="thai">{example.thai}</p>
                    <p className="chinese">{example.chinese}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}