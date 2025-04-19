import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// 獲取所有文章
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        words: true,
        grammarPoints: {
          include: {
            examples: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: articles,
      message: '成功獲取文章列表'
    });
  } catch (error) {
    console.error('獲取文章列表時發生錯誤:', error);
    return NextResponse.json({
      success: false,
      error: '獲取文章列表失敗',
      details: error instanceof Error ? error.message : '未知錯誤'
    }, { status: 500 });
  }
}

// 創建新文章
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 基本資料驗證
    if (!body.title || !body.content) {
      return NextResponse.json({
        success: false,
        error: '標題和內容為必填項'
      }, { status: 400 });
    }

    const article = await prisma.article.create({
      data: {
        title: body.title,
        content: body.content,
        chineseTitle: body.chineseTitle || '',
        chineseContent: body.chineseContent || '',
        type: body.type ?? 'general',
        url: body.url ?? '',
        status: body.status ?? 'draft',
        words: {
          create: body.words?.map((word: any) => ({
            thai: word.thai,
            chinese: word.chinese,
            type: word.type || 'unknown',
            pronunciation: word.pronunciation || ''
          })) ?? []
        },
        grammarPoints: {
          create: body.grammarPoints?.map((point: any) => ({
            title: point.title,
            explanation: point.explanation || '',
            examples: {
              create: point.examples?.map((example: any) => ({
                thai: example.thai,
                chinese: example.chinese
              })) || []
            }
          })) ?? []
        }
      },
      include: {
        words: true,
        grammarPoints: {
          include: {
            examples: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: article,
      message: '文章創建成功'
    });
  } catch (error) {
    console.error('創建文章時發生錯誤:', error);
    return NextResponse.json({
      success: false,
      error: '創建文章失敗',
      details: error instanceof Error ? error.message : '未知錯誤'
    }, { status: 500 });
  }
}