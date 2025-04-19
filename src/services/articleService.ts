import { Article, Word, GrammarPoint, ArticleStatus } from '@/types/models';
import { mockArticles } from '@/lib/mockData';

const STORAGE_KEY = 'thai_learning_articles';

// 初始化本地儲存
const initializeStorage = () => {
  try {
    console.log('正在初始化本地儲存...');
    const storedArticles = localStorage.getItem(STORAGE_KEY);
    if (!storedArticles) {
      console.log('未找到現有文章，初始化範例文章...');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockArticles));
      console.log('範例文章初始化完成');
    } else {
      console.log('找到現有文章數據');
    }
  } catch (error) {
    console.error('初始化本地儲存時發生錯誤：', error);
    throw new Error('無法初始化本地儲存');
  }
};

// 將日期字符串轉換為 Date 對象
const parseDates = (article: any): Article => {
  try {
    return {
      ...article,
      createdAt: new Date(article.createdAt),
      updatedAt: new Date(article.updatedAt)
    };
  } catch (error) {
    console.error('日期解析錯誤：', error);
    return {
      ...article,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
};

// 獲取所有文章
export const getAllArticles = (): Article[] => {
  try {
    console.log('正在獲取所有文章...');
    initializeStorage();
    const articles = localStorage.getItem(STORAGE_KEY);
    if (!articles) {
      console.log('未找到文章數據，返回空數組');
      return [];
    }
    const parsedArticles = JSON.parse(articles);
    console.log(`找到 ${parsedArticles.length} 篇文章`);
    return parsedArticles.map(parseDates);
  } catch (error) {
    console.error('獲取文章時發生錯誤：', error);
    return [];
  }
};

// 獲取已發布的文章
export const getPublishedArticles = (): Article[] => {
  try {
    const articles = getAllArticles();
    const publishedArticles = articles.filter(article => article.status === 'published');
    console.log(`找到 ${publishedArticles.length} 篇已發布文章`);
    return publishedArticles;
  } catch (error) {
    console.error('獲取已發布文章時發生錯誤：', error);
    return [];
  }
};

// 獲取單篇文章
export const getArticleById = (id: string): Article | null => {
  try {
    console.log(`正在查找文章 ID: ${id}`);
    const articles = getAllArticles();
    const article = articles.find(a => a.id === id);
    if (!article) {
      console.log('未找到指定文章');
      return null;
    }
    console.log('找到文章');
    return parseDates(article);
  } catch (error) {
    console.error('獲取單篇文章時發生錯誤：', error);
    return null;
  }
};

// 保存文章
export const saveArticle = (article: Article): Article => {
  try {
    console.log('正在保存文章...');
    const articles = getAllArticles();
    const existingIndex = articles.findIndex(a => a.id === article.id);
    
    const newArticle = {
      ...article,
      id: article.id || Date.now().toString(),
      createdAt: article.createdAt || new Date(),
      updatedAt: new Date()
    };
    
    if (existingIndex >= 0) {
      console.log('更新現有文章');
      articles[existingIndex] = newArticle;
    } else {
      console.log('新增文章');
      articles.push(newArticle);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    console.log('文章保存成功');
    return newArticle;
  } catch (error) {
    console.error('保存文章時發生錯誤：', error);
    throw error;
  }
};

// 更新文章狀態
export const updateArticleStatus = (id: string, status: ArticleStatus): Article | null => {
  try {
    console.log(`正在更新文章狀態，ID: ${id}, 新狀態: ${status}`);
    const articles = getAllArticles();
    const article = articles.find(a => a.id === id);
    
    if (article) {
      const updatedArticle = {
        ...article,
        status,
        updatedAt: new Date()
      };
      const updatedArticles = articles.map(a => a.id === id ? updatedArticle : a);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
      console.log('文章狀態更新成功');
      return updatedArticle;
    }
    
    console.log('未找到要更新的文章');
    return null;
  } catch (error) {
    console.error('更新文章狀態時發生錯誤：', error);
    return null;
  }
}; 