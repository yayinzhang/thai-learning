'use client';

import { useState } from 'react';
import GrammarList from '@/components/GrammarList';
import PageTitle from '@/components/PageTitle';
import { mockGrammarPoints } from '@/lib/mockData';
import { getPublishedArticles } from '@/services/articleService'
import { GrammarPoint } from '@/types/models'
import Link from 'next/link'

export default function GrammarPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const articles = getPublishedArticles()
  const allGrammarPoints: { grammar: GrammarPoint; articleId: string }[] = articles.flatMap(article =>
    article.grammarPoints.map(grammar => ({
      grammar,
      articleId: article.id
    }))
  )

  const filteredGrammarPoints = searchTerm
    ? allGrammarPoints.filter(({ grammar }) =>
        grammar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grammar.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (grammar.examples?.some(
          example =>
            example.thai.toLowerCase().includes(searchTerm.toLowerCase()) ||
            example.chinese.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? false)
      )
    : allGrammarPoints

  return (
    <main className="container mx-auto px-4 py-8">
      <PageTitle>文法庫</PageTitle>
      
      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜尋文法..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2D4A7] focus:border-[#F2D4A7] text-gray-900 placeholder-gray-700"
        />
      </div>

      <div className="grammar-grid">
        {filteredGrammarPoints.map(({ grammar, articleId }) => (
          <div key={`${articleId}-${grammar.title}`} className="grammar-card">
            <h3>{grammar.title}</h3>
            <p className="grammar-explanation">{grammar.explanation}</p>
            {grammar.examples && grammar.examples.length > 0 && (
              <div className="grammar-examples">
                {grammar.examples.map((example, index) => (
                  <div key={index} className="example">
                    <p className="thai">{example.thai}</p>
                    <p className="chinese">{example.chinese}</p>
                  </div>
                ))}
              </div>
            )}
            <Link href={`/articles/${articleId}`} className="grammar-article-link">
              查看相關文章
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
} 