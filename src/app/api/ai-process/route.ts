import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ArticleModel from '@/lib/models/Article';
import { processArticleWithAI } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { title, description, url } = await req.json();

    if (!title || !url) {
      return NextResponse.json({ error: 'Missing title or url' }, { status: 400 });
    }

    await dbConnect();

    // 1. Check Cache
    const cachedArticle = await ArticleModel.findOne({ articleUrl: url });
    if (cachedArticle) {
      return NextResponse.json({
        summary: cachedArticle.summary,
        categories: cachedArticle.categories,
        cached: true,
      });
    }

    // 2. Process with AI
    const aiResult = await processArticleWithAI(title, description || '');

    if (!aiResult) {
      return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
    }

    // 3. Cache Result
    const newArticle = await ArticleModel.create({
      articleUrl: url,
      summary: aiResult.summary,
      categories: aiResult.categories,
    });

    return NextResponse.json({
      summary: newArticle.summary,
      categories: newArticle.categories,
      cached: false,
    });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
