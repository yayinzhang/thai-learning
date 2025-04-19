import { Article, Word, GrammarPoint } from '@/types/models';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'สวัสดีชาวโลก',
    chineseTitle: '你好，世界',
    content: 'นี่เป็นบทความแรกของเรา เราหวังว่าคุณจะชอบมัน',
    chineseContent: '這是我們的第一篇文章，希望你會喜歡',
    url: 'https://example.com/article1',
    status: 'published',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    words: [
      {
        id: 'word-1',
        thai: 'สวัสดี',
        meaning: '你好',
        type: '問候語',
        example: 'สวัสดีครับ/ค่ะ',
        pronunciation: 'sa-wat-dee'
      }
    ],
    grammarPoints: [
      {
        id: 'grammar-1',
        title: '基本問候語',
        explanation: '泰語中最基本的問候語',
        example: 'สวัสดีครับ/ค่ะ',
        translation: '你好（男生用/女生用）'
      }
    ]
  },
  {
    id: '2',
    title: 'วันนี้อากาศดี',
    chineseTitle: '今天天氣真好',
    content: 'วันนี้ท้องฟ้าสดใส อากาศเย็นสบาย เหมาะแก่การออกไปเดินเล่น',
    chineseContent: '今天天空晴朗，天氣涼爽，很適合出去散步',
    url: 'https://example.com/article2',
    status: 'draft',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    words: [
      {
        id: 'word-2',
        thai: 'อากาศ',
        meaning: '天氣',
        type: '名詞',
        example: 'วันนี้อากาศดี',
        pronunciation: 'aa-kaat'
      }
    ],
    grammarPoints: [
      {
        id: 'grammar-2',
        title: '形容詞的使用',
        explanation: '在泰語中，形容詞通常放在名詞後面',
        example: 'อากาศดี',
        translation: '天氣好'
      }
    ]
  }
];

export const mockWords: Word[] = [
  {
    id: '1',
    articleId: '1',
    thai: 'สวัสดี',
    type: '問候語',
    meaning: '你好',
    example: 'สวัสดีครับ/ค่ะ',
    pronunciation: 'sa-wat-dee'
  },
  {
    id: '2',
    articleId: '1',
    thai: 'ครับ',
    type: '語氣詞',
    meaning: '男性用語氣詞（表示禮貌）',
    example: 'สวัสดีครับ',
    pronunciation: 'khrap'
  },
  {
    id: 'word-1',
    thai: 'ถูกด่า',
    meaning: '被罵、被批評',
    type: '動詞',
    example: 'เธอถูกชาวเน็ตด่า',
    pronunciation: 'tùuk dàa',
    articleId: 'article-1'
  },
  {
    id: 'word-2',
    thai: 'เปิดเผย',
    meaning: '揭露、展示',
    type: '動詞',
    example: 'ไม่ควรเปิดเผยเรือนร่างมากไป',
    pronunciation: 'bpèrt-bpǒey',
    articleId: 'article-1'
  },
  {
    id: 'word-3',
    thai: 'ความมั่นใจ',
    meaning: '自信',
    type: '名詞',
    example: 'แฟนๆ ที่ชื่นชมความมั่นใจของเธอ',
    pronunciation: 'kwaam mân-jai',
    articleId: 'article-1'
  },
  {
    id: 'word-4',
    thai: 'ภาพลักษณ์',
    meaning: '形象',
    type: '名詞',
    example: 'มีผลทำให้ภาพลักษณ์ของผู้หญิงเอเชียเสื่อมเสีย',
    pronunciation: 'pâap-lák',
    articleId: 'article-1'
  },
  {
    id: 'word-5',
    thai: 'ตัดสิน',
    meaning: '判斷、評判',
    type: '動詞',
    example: 'คุณไม่ควรชี้นิ้วตัดสินใคร',
    pronunciation: 'dtàt-sǐn',
    articleId: 'article-1'
  }
];

export const mockGrammarPoints: GrammarPoint[] = [
  {
    id: '1',
    articleId: '1',
    title: 'ครับ/ค่ะ 的用法',
    explanation: '這是泰語中最常用的禮貌語氣詞，ครับ 用於男性，ค่ะ 用於女性',
    example: 'สวัสดีครับ (男) / สวัสดีค่ะ (女)',
    translation: '你好（男生用/女生用）'
  },
  {
    id: '2',
    articleId: '2',
    title: '問候語的時間用法',
    explanation: '泰語的問候語會根據時間改變',
    example: 'อรุณสวัสดิ์ / สวัสดีตอนเย็น',
    translation: '早安 / 晚安'
  },
  {
    id: 'grammar-1',
    title: 'ถูก + 動詞（被動語態）',
    explanation: '用於表示被動語態，表示主詞接受動作的影響。常用於負面情況。',
    example: 'เธอถูกชาวเน็ตด่า',
    translation: '她被網友罵',
    articleId: 'article-1'
  },
  {
    id: 'grammar-2',
    title: 'ควร/ไม่ควร（應該/不應該）',
    explanation: '用於表示建議或勸告，比 ต้อง 語氣更委婉。',
    example: 'คุณไม่ควรชี้นิ้วตัดสินใคร',
    translation: '你不應該指責評判他人',
    articleId: 'article-1'
  },
  {
    id: 'grammar-3',
    title: 'เพียงเพราะ...（僅僅因為...）',
    explanation: '用於表示原因，強調原因似乎不夠充分。',
    example: 'เธอถูกชาวเน็ตด่า เพียงเพราะกล้าที่จะเป็นตัวเอง',
    translation: '她僅僅因為敢於做自己就被網友罵',
    articleId: 'article-1'
  },
  {
    id: 'grammar-4',
    title: 'ที่จะ + 動詞（表示目的或意圖）',
    explanation: '用於表示動作的目的或意圖。',
    example: 'กล้าที่จะเป็นตัวเอง',
    translation: '敢於做自己',
    articleId: 'article-1'
  }
]; 