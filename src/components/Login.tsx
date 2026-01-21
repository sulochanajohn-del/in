'use client';

import { useStore } from '@/store/store';
import { useState, useEffect } from 'react';

export function Login() {
  const { setCurrentUser, setUsers, users } = useStore();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  // Mock default users
  const defaultUsers = [
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

  // Initialize default users if empty
  useEffect(() => {
    if (users.length === 0) {
      setUsers(defaultUsers);
    }
  }, []);

  const handleLogin = () => {
    setError('');
    const user = users.find(
      (u) => (u.email === email || u.username === email) && u.id
    );
    if (user) {
      setCurrentUser(user);
    } else {
      setError('User not found. Try: jane@example.com or jane_smith');
    }
  };

  const handleSignUp = () => {
    setError('');
    if (!email || !username) {
      setError('Please fill in all fields');
      return;
    }

    // Check if user already exists
    if (users.some((u) => u.email === email || u.username === username)) {
      setError('Email or username already exists');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`,
      bio: '',
      followers: [],
      following: [],
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    setEmail('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">SocialHub</h1>
          <p className="text-blue-100">Connect with friends and share your moments</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl p-8 transition-colors">
          <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="john_doe"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-black dark:text-white rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {isSignUp ? 'Email' : 'Email or Username'}
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isSignUp ? 'john@example.com' : 'jane@example.com'}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-black dark:text-white rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-black dark:text-white rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={isSignUp ? handleSignUp : handleLogin}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
            >
              {isSignUp ? 'Create Account' : 'Login'}
            </button>
          </div>

          {/* Demo Users */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 text-center mb-3">Quick Login - Demo Users:</p>
            <div className="space-y-2">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    setCurrentUser(user);
                    setError('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{user.username}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle SignUp/Login */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}


