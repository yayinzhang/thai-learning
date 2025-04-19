export type ArticleStatus = 'draft' | 'published';

export interface Word {
  thai: string;
  chinese: string;
  type: string;
  pronunciation: string;
}

export interface GrammarPoint {
  title: string;
  explanation: string;
  examples: Array<{
    thai: string;
    chinese: string;
  }>;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  chineseContent: string;
  type: string;
  url: string;
  status: ArticleStatus;
  createdAt: string;
  updatedAt: string;
  words: Word[];
  grammarPoints: GrammarPoint[];
} 