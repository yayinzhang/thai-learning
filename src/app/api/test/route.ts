import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const publishedArticles = await prisma.article.findMany({
      where: { status: 'published' },
      include: {
        words: true,
        grammarPoints: true
      }
    });

    return NextResponse.json(publishedArticles);
  } catch (error) {
    console.error('Error fetching published articles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}