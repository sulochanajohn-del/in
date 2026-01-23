import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { username, password, isSignUp } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    try {
      // Try to connect to database
      await connectDB();
      
      if (isSignUp) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return NextResponse.json(
            { error: 'Username already exists' },
            { status: 400 }
          );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          email: `${username}@in.local`,
          username,
          password: hashedPassword,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
          user: {
            id: newUser._id.toString(),
            email: newUser.email,
            username: newUser.username,
            avatar: newUser.avatar,
            bio: newUser.bio || '',
            followers: newUser.followers || [],
            following: newUser.following || [],
            createdAt: newUser.createdAt?.toISOString() || new Date().toISOString(),
          },
          token,
        });
      } else {
        // Login logic
        const user = await User.findOne({ username });
        if (!user) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return NextResponse.json(
            { error: 'Invalid password' },
            { status: 401 }
          );
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
          user: {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            bio: user.bio || '',
            followers: user.followers || [],
            following: user.following || [],
            isPrivate: user.isPrivate || false,
            blockedUsers: user.blockedUsers || [],
            followRequests: user.followRequests || [],
            postsCount: user.postsCount || 0,
            createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
          },
          token,
        });
      }
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed. Please check MongoDB configuration.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Authentication failed' },
      { status: 500 }
    );
  }
}
