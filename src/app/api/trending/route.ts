import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Hashtag } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    const trending = await Hashtag.find()
      .sort({ count: -1, updatedAt: -1 })
      .limit(10);
    return NextResponse.json(trending);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch trending hashtags' },
      { status: 500 }
    );
  }
}
