import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ArticleModel from '@/lib/models/Article';
import { summarizeArticle } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { title, description, url } = await req.json();

    if (!title) {
      return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }

    await dbConnect();

    // 1. Check Cache if URL is provided
    if (url) {
      const cachedArticle = await ArticleModel.findOne({ articleUrl: url });
      if (cachedArticle && cachedArticle.keyTakeaway) {
        return NextResponse.json({
          summary: cachedArticle.summary,
          keyTakeaway: cachedArticle.keyTakeaway,
          cached: true,
        });
      }
    }

    // 2. Generate with AI
    const aiResult = await summarizeArticle(title, description || '');

    if (!aiResult) {
      // Fallback values if generation fails
      return NextResponse.json({
        summary: description ? description.slice(0, 150) + '...' : 'Summary unavailable.',
        keyTakeaway: 'Key takeaway unavailable.',
        fallback: true
      });
    }

    // 3. Cache Result if URL is provided
    if (url) {
      // Use findOneAndUpdate to handle potential race conditions or updates
      await ArticleModel.findOneAndUpdate(
        { articleUrl: url },
        {
          articleUrl: url,
          summary: aiResult.summary,
          keyTakeaway: aiResult.keyTakeaway,
          // We don't want to overwrite categories if they exist, but if it's a new entry we might need something
          $setOnInsert: { categories: ['General Tech'] }
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      summary: aiResult.summary,
      keyTakeaway: aiResult.keyTakeaway,
      cached: false,
    });
  } catch (error) {
    console.error('Summarize API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
