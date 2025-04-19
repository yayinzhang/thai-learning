import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// GET /api/articles/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        words: true,
        grammarPoints: {
          include: {
            examples: true,
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT /api/articles/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();

  try {
    const dataToUpdate: any = {};
    if (body.title !== undefined) dataToUpdate.title = body.title;
    if (body.chineseTitle !== undefined) dataToUpdate.chineseTitle = body.chineseTitle;
    if (body.content !== undefined) dataToUpdate.content = body.content;
    if (body.chineseContent !== undefined) dataToUpdate.chineseContent = body.chineseContent;
    if (body.type !== undefined) dataToUpdate.type = body.type;
    if (body.url !== undefined) dataToUpdate.url = body.url;
    if (body.status !== undefined) dataToUpdate.status = body.status;

    const updated = await prisma.article.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// DELETE /api/articles/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await prisma.grammarExample.deleteMany({
      where: {
        grammarPoint: {
          articleId: id,
        },
      },
    });

    await prisma.grammarPoint.deleteMany({
      where: { articleId: id },
    });

    await prisma.word.deleteMany({
      where: { articleId: id },
    });

    const deleted = await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}