import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/lib/db';
import bcrypt from 'bcryptjs';

const TEST_USERS = [
  {
    username: 'sunny',
    email: 'sunny@example.com',
    password: 'password123',
    bio: '☀️ Love sunny days and photography',
  },
  {
    username: 'luna_night',
    email: 'luna@example.com',
    password: 'password123',
    bio: '🌙 Night owl, crypto enthusiast',
  },
  {
    username: 'alex_coder',
    email: 'alex@example.com',
    password: 'password123',
    bio: '💻 Full stack developer, open source lover',
  },
  {
    username: 'sarah_artist',
    email: 'sarah@example.com',
    password: 'password123',
    bio: '🎨 Digital artist & designer',
  },
  {
    username: 'mike_fitness',
    email: 'mike@example.com',
    password: 'password123',
    bio: '💪 Fitness coach, healthy lifestyle',
  },
];

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const createdUsers = [];

    for (const testUser of TEST_USERS) {
      const existingUser = await User.findOne({
        $or: [{ email: testUser.email }, { username: testUser.username }],
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        const newUser = new User({
          username: testUser.username,
          email: testUser.email,
          password: hashedPassword,
          bio: testUser.bio,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`,
        });

        await newUser.save();
        createdUsers.push({
          username: newUser.username,
          email: newUser.email,
          bio: newUser.bio,
        });
      }
    }

    return NextResponse.json({
      message: `Created ${createdUsers.length} test users`,
      users: createdUsers,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create test users',
        message: 'This only works if MongoDB is connected',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to /api/test-users to create test users including "sunny"',
    testUsers: TEST_USERS.map((u) => ({ username: u.username, bio: u.bio })),
  });
}
