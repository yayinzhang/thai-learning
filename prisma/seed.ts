import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🟡 SEED 開始執行...')
  
  console.log('🐛 main() 執行了！')
  // 關閉外鍵限制以避免刪除失敗
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0`);
  await prisma.grammarExample.deleteMany()
  await prisma.grammarPoint.deleteMany()
  await prisma.word.deleteMany()
  await prisma.article.deleteMany()
  await prisma.user.deleteMany()
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1`);
  console.log('🟢 資料清除完畢')

  // 建立一位 User
  const user = await prisma.user.upsert({
    where: { email: 'admin@thai.com' },
    update: {},
    create: {
      email: 'admin@thai.com',
      name: 'Admin',
      username: 'admin',
      role: 'admin',
    },
  })
  console.log('🧑 建立或取得的使用者：', user)

  // 建立一篇文章
  const article = await prisma.article.create({
    data: {
      id: crypto.randomUUID(),
      title: 'อีกครั้งที่ ‘JENNIE’ ยังคงถูกด่าเรื่องความเซ็กซี่...',
      chineseTitle: '又一次，Jennie 因性感被罵',
      content: 'เป็นอีกครั้งที่เราต้องยืมประโยคดังในโลกอินเทอร์เน็ตมาพูดจริงๆ ว่า “Birthday but with เจนนี่” ...',
      chineseContent: '這次我們真的必須藉用網絡世界的一句名言來說“和 Jennie 一起過生日”...',
      type: 'Entertainment',
      url: 'https://mirrorthailand.com/culture/entertainment/102288',
      status: 'published',
      authorId: user.id,
    },
  })

  // 建立單字
  await prisma.word.createMany({
    data: [
      { thai: 'เจนนี่', chinese: 'Jennie（專有名詞）', type: 'n.', pronunciation: 'je-n-ni', articleId: article.id },
      { thai: 'เซ็กซี่', chinese: '性感', type: 'adj.', pronunciation: 'sèk-sî', articleId: article.id },
      { thai: 'วิจารณ์', chinese: '評論、批評', type: 'v.', pronunciation: 'wi-jaan', articleId: article.id },
    ],
  })

  // 建立一個文法點與例句
  await prisma.grammarPoint.create({
    data: {
      title: 'กล้าที่จะ + V',
      explanation: '表示「勇於去做某事」的句型',
      articleId: article.id,
      examples: {
        create: [
          {
            thai: 'เจนนี่กล้าที่จะแต่งตัวเซ็กซี่',
            chinese: 'Jennie 勇於穿著性感',
          },
        ],
      },
    },
  })

  console.log('✅ 第一篇資料建立完成')

  console.log('➡️ 建立第二篇文章')
  const article2 = await prisma.article.create({
    data: {
      id: crypto.randomUUID(),
      title: 'อคติ ‘ไอดอลห้ามมีแฟน’ และการถูกรุกล้ำชีวิตส่วนตัว',
      chineseTitle: '偶像禁止戀愛，粉絲的瘋狂行為',
      content: 'ข่าวคราวในเกาหลีใต้ที่แฟนคลับลุกขึ้นมาตั้งตัวเป็นแอนตี้แฟนเมื่อเห็นไอดอลที่ติดตามอยู่มีคนรัก...',
      chineseContent: '韓國的新聞報導指出，當粉絲發現偶像有戀情時，會轉變為「反粉絲」，甚至有騷擾行為...',
      type: 'Culture',
      url: 'https://mirrorthailand.com/culture/entertainment/102301',
      status: 'published',
      authorId: user.id,
    },
  })
  console.log('📝 第二篇文章建立結果：', article2)
  console.log('✅ 第二篇文章建立完成')

  console.log('➡️ 建立第二篇文章的單字')
  await prisma.word.createMany({
    data: [
      { thai: 'ไอดอล', chinese: '偶像', type: 'n.', pronunciation: 'ai-don', articleId: article2.id },
      { thai: 'แฟนคลับ', chinese: '粉絲', type: 'n.', pronunciation: 'faen-kláp', articleId: article2.id },
      { thai: 'คุกคาม', chinese: '騷擾', type: 'v.', pronunciation: 'kúk-khaam', articleId: article2.id },
    ],
  })
  console.log('✅ 第二篇單字寫入完成')

  console.log('➡️ 建立第二篇文章的文法點與例句')
  await prisma.grammarPoint.create({
    data: {
      title: 'เมื่อ + 子句',
      explanation: '當...的時候，用來連接兩個事件',
      articleId: article2.id,
      examples: {
        create: [
          {
            thai: 'เมื่อแฟนคลับเห็นว่าไอดอลมีแฟน',
            chinese: '當粉絲看到偶像有戀人時',
          },
        ],
      },
    },
  })
  console.log('✅ 第二篇文法點寫入完成')
  console.log('✅ 第二篇文章成功寫入')
}

export async function seed() {
  await main()
}

if (require.main === module) {
  seed()
}