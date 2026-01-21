'use client';

import { useState } from 'react';
import { useStore } from '@/store/store';
import { ImagePlus, Send } from 'lucide-react';

export function CreatePost() {
  const { currentUser, addPost } = useStore();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string>('');

  const handleSubmit = () => {
    if (content.trim() && currentUser) {
      addPost({
        id: Date.now().toString(),
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        content,
        image,
        likes: [],
        comments: [],
        createdAt: new Date().toISOString(),
      });
      setContent('');
      setImage('');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex gap-3">
        <img
          src={currentUser.avatar || 'https://i.pravatar.cc/150'}
          alt="Your avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 bg-gray-100 dark:bg-slate-800 text-black dark:text-white rounded-lg resize-none outline-none transition-colors"
            rows={3}
          />

          {image && (
            <div className="relative mt-3 w-32 h-32">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => setImage('')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                const url = prompt('Enter image URL:');
                if (url) setImage(url);
              }}
              className="flex items-center gap-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-semibold transition-colors"
            >
              <ImagePlus size={18} />
              Add Image
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              <Send size={18} />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
