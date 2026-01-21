import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, username, password, isSignUp } = await request.json();

    if (isSignUp) {
      // Sign up logic
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email or username already exists' },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`,
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

      return NextResponse.json({
        user: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          avatar: newUser.avatar,
          bio: newUser.bio,
          followers: newUser.followers,
          following: newUser.following,
        },
        token,
      });
    } else {
      // Login logic
      const user = await User.findOne({ $or: [{ email }, { username: email }] });
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
          id: user._id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          bio: user.bio,
          followers: user.followers,
          following: user.following,
        },
        token,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
