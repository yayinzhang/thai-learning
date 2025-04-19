import { getPublishedArticles } from '@/services/articleService'
import { Word } from '@/types/models'
import Link from 'next/link'

export default function VocabularyPage() {
  const articles = getPublishedArticles()
  const allWords: { word: Word; articleId: string }[] = articles.flatMap(article =>
    article.words.map(word => ({
      word,
      articleId: article.id
    }))
  )

  return (
    <div className="vocabulary-page">
      <h1>單字庫</h1>
      <div className="word-grid">
        {allWords.map(({ word, articleId }) => (
          <div key={`${articleId}-${word.thai}`} className="word-card">
            <div className="word-content">
              <h3 className="word-thai">{word.thai}</h3>
              <p className="word-chinese">{word.chinese}</p>
              <p className="word-type">{word.type}</p>
            </div>
            <Link href={`/articles/${articleId}`} className="word-article-link">
              查看相關文章
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
} 