'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { MOCK_USERS, MOCK_POSTS, MOCK_STORIES } from '@/lib/mockData';
import { Feed } from '@/components/Feed';
import { Messages } from '@/components/Messages';
import { Explore } from '@/components/Explore';
import { Profile } from '@/components/Profile';
import { Login } from '@/components/Login';
import { Navigation } from '@/components/Navigation';
import { CreatePost } from '@/components/CreatePost';
import { Stories } from '@/components/Stories';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const { currentUser, setCurrentUser, setPosts, setStories, setUsers, setMessages } = useStore();

  useEffect(() => {
    // Initialize mock data
    setUsers(MOCK_USERS);
    setPosts(MOCK_POSTS);
    setStories(MOCK_STORIES);
    setMessages([]);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <Stories />
            <CreatePost />
            <Feed />
          </div>
        )}

        {activeTab === 'explore' && <Explore />}

        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
            <CreatePost />
          </div>
        )}

        {activeTab === 'messages' && <Messages />}

        {activeTab === 'profile' && <Profile />}
      </main>
    </div>
  );
}
