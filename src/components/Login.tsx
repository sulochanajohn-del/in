'use client';

import { useStore } from '@/store/store';
import { useState } from 'react';

export function Login() {
  const { setCurrentUser, setToken } = useStore();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, isSignUp: false }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      setCurrentUser(data.user);
      setToken(data.token);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Request timeout. MongoDB might not be configured. Using demo mode.');
        // Fallback to demo user
        setCurrentUser({
          id: 'demo-' + Date.now(),
          username: email.split('@')[0],
          email: email,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`,
          bio: 'Demo User',
          followers: [],
          following: [],
          createdAt: new Date().toISOString(),
        });
      } else {
        setError('Connection error. Make sure MongoDB is configured on Vercel.');
      }
      console.error(err);
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setError('');
    if (!email || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, isSignUp: true }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      setCurrentUser(data.user);
      setToken(data.token);
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Request timeout. MongoDB might not be configured. Using demo mode.');
        // Fallback to demo user
        setCurrentUser({
          id: 'demo-' + Date.now(),
          username: username,
          email: email,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 100)}`,
          bio: '',
          followers: [],
          following: [],
          createdAt: new Date().toISOString(),
        });
      } else {
        setError('Connection error. Make sure MongoDB is configured on Vercel.');
      }
      console.error(err);
    }
    setLoading(false);
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
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Login'}
            </button>
          </div>

          {/* Toggle SignUp/Login */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
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


