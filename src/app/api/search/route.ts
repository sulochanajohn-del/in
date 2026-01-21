import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User, Post, Hashtag } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all'; // all, users, posts, hashtags

    const results: { users?: any[]; posts?: any[]; hashtags?: any[] } = {};

    if (type === 'all' || type === 'users') {
      results.users = await User.find({
        $or: [
          { username: { $regex: query, $options: 'i' } },
          { bio: { $regex: query, $options: 'i' } },
        ],
      })
        .select('-password')
        .limit(10);
    }

    if (type === 'all' || type === 'posts') {
      results.posts = await Post.find({
        $or: [
          { content: { $regex: query, $options: 'i' } },
          { hashtags: { $regex: query, $options: 'i' } },
        ],
      })
        .populate('userId', 'username avatar')
        .limit(20);
    }

    if (type === 'all' || type === 'hashtags') {
      results.hashtags = await Hashtag.find({
        name: { $regex: query, $options: 'i' },
      })
        .sort({ count: -1 })
        .limit(10);
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Search failed' },
      { status: 500 }
    );
  }
}
