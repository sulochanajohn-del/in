// Mock data generator
export const MOCK_USERS = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Photography enthusiast 📸',
    followers: ['2', '3'],
    following: ['2'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Travel & lifestyle blogger',
    followers: ['1', '3'],
    following: ['1', '3'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    username: 'alex_tech',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Tech enthusiast & developer',
    followers: ['1'],
    following: ['2'],
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_POSTS = [
  {
    id: '1',
    userId: '2',
    username: 'jane_smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Beautiful sunset at the beach! 🌅',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    likes: ['1', '3'],
    comments: [
      {
        id: '1',
        userId: '1',
        username: 'john_doe',
        text: 'Amazing shot! 📸',
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    userId: '3',
    username: 'alex_tech',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Just launched my new project! Check it out 🚀',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    likes: ['1', '2'],
    comments: [],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '3',
    userId: '1',
    username: 'john_doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Coffee and coding on this Monday morning ☕',
    likes: ['2'],
    comments: [
      {
        id: '2',
        userId: '2',
        username: 'jane_smith',
        text: 'Same here! 😄',
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
];

export const MOCK_STORIES = [
  {
    id: '1',
    userId: '2',
    username: 'jane_smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop',
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    views: ['1', '3'],
  },
  {
    id: '2',
    userId: '3',
    username: 'alex_tech',
    avatar: 'https://i.pravatar.cc/150?img=3',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=800&fit=crop',
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    views: ['1'],
  },
];
