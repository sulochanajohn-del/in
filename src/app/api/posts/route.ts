import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Post, Hashtag } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function extractHashtags(text: string): string[] {
  const regex = /#[\w]+/g;
  const matches = text.match(regex) || [];
  return matches.map((tag) => tag.toLowerCase());
}

async function updateHashtagCounts(hashtags: string[]) {
  for (const tag of hashtags) {
    await Hashtag.findOneAndUpdate(
      { name: tag },
      { $inc: { count: 1 }, updatedAt: new Date() },
      { upsert: true }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find()
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(50);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const { content, image } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Post content is required' }, { status: 400 });
    }

    const hashtags = extractHashtags(content);
    await updateHashtagCounts(hashtags);

    const newPost = new Post({
      userId: decoded.userId,
      content,
      image,
      hashtags,
    });

    await newPost.save();
    await newPost.populate('userId', 'username avatar');

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create post' },
      { status: 500 }
    );
  }
}
