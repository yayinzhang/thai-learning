import { Article, Word, GrammarPoint } from '@/types/models';
import OpenAI from 'openai';

// 初始化 OpenAI 客戶端
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

interface AIProcessedArticle {
  rewrittenTitle: string;
  rewrittenContent: string;
  chineseTitle: string;
  chineseContent: string;
  words: Word[];
  grammarPoints: GrammarPoint[];
}

export async function processArticleWithAI(
  originalTitle: string,
  originalContent: string
): Promise<AIProcessedArticle> {
  try {
    // 1. 改寫泰文標題和內容
    const rewrittenResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "你是一個泰語專家，負責改寫泰語文章以避免抄襲問題，同時保持原意。"
        },
        {
          role: "user",
          content: `請改寫以下泰語文章，保持原意但使用不同的表達方式：
標題：${originalTitle}
內容：${originalContent}`
        }
      ]
    });

    const rewrittenText = rewrittenResponse.choices[0].message.content || '';
    const [rewrittenTitle, rewrittenContent] = parseRewrittenText(rewrittenText);

    // 2. 翻譯成繁體中文
    const translationResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "你是一個泰語翻譯專家，負責將泰語翻譯成優雅的繁體中文。"
        },
        {
          role: "user",
          content: `請將以下泰語文章翻譯成繁體中文：
標題：${rewrittenTitle}
內容：${rewrittenContent}`
        }
      ]
    });

    const translatedText = translationResponse.choices[0].message.content || '';
    const [chineseTitle, chineseContent] = parseTranslatedText(translatedText);

    // 3. 產生單字列表
    const wordsResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "你是一個泰語教學專家，負責從文章中提取重要單字並提供解釋。請以 JSON 格式輸出。"
        },
        {
          role: "user",
          content: `請從以下泰語文章中提取重要單字，並提供解釋：
${rewrittenContent}

請以以下 JSON 格式輸出：
[{
  "thai": "泰語單字",
  "meaning": "中文意思",
  "type": "詞性",
  "example": "例句",
  "pronunciation": "發音"
}]`
        }
      ]
    });

    const words = JSON.parse(wordsResponse.choices[0].message.content || '[]');

    // 4. 產生文法重點
    const grammarResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "你是一個泰語語法專家，負責從文章中提取文法重點並提供解釋。請以 JSON 格式輸出。"
        },
        {
          role: "user",
          content: `請從以下泰語文章中提取文法重點：
${rewrittenContent}

請以以下 JSON 格式輸出：
[{
  "title": "文法標題",
  "explanation": "文法解釋",
  "example": "例句",
  "translation": "例句翻譯"
}]`
        }
      ]
    });

    const grammarPoints = JSON.parse(grammarResponse.choices[0].message.content || '[]');

    return {
      rewrittenTitle,
      rewrittenContent,
      chineseTitle,
      chineseContent,
      words,
      grammarPoints
    };
  } catch (error) {
    console.error('AI 處理過程中發生錯誤：', error);
    throw error;
  }
}

// 輔助函數：解析改寫後的文本
function parseRewrittenText(text: string): [string, string] {
  const lines = text.split('\n');
  let title = '';
  let content = '';

  for (const line of lines) {
    if (line.startsWith('標題：')) {
      title = line.replace('標題：', '').trim();
    } else if (line.startsWith('內容：')) {
      content = line.replace('內容：', '').trim();
    }
  }

  return [title, content];
}

// 輔助函數：解析翻譯後的文本
function parseTranslatedText(text: string): [string, string] {
  const lines = text.split('\n');
  let title = '';
  let content = '';

  for (const line of lines) {
    if (line.startsWith('標題：')) {
      title = line.replace('標題：', '').trim();
    } else if (line.startsWith('內容：')) {
      content = line.replace('內容：', '').trim();
    }
  }

  return [title, content];
}

export const generateChineseTranslation = async (thaiContent: string): Promise<string> => {
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `請將以下泰語文本翻譯成中文：\n\n${thaiContent}`
      }),
    });

    if (!response.ok) {
      throw new Error('AI 服務請求失敗');
    }

    const data = await response.json();
    return data.content || '無法生成翻譯';
  } catch (error) {
    console.error('生成翻譯時發生錯誤：', error);
    throw error;
  }
}; 