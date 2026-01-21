'use client';

import { useStore } from '@/store/store';
import { X, Eye } from 'lucide-react';
import { useState } from 'react';

export function Stories() {
  const { stories } = useStore();
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);

  if (currentStoryIndex !== null) {
    const story = stories[currentStoryIndex];
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <button
          onClick={() => setCurrentStoryIndex(null)}
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="relative max-w-md w-full">
          {/* Progress bars */}
          <div className="flex gap-1 mb-3 px-4">
            {stories.map((_, idx) => (
              <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{
                    width: idx < currentStoryIndex ? '100%' : idx === currentStoryIndex ? '50%' : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story Content */}
          <img
            src={story.image}
            alt="Story"
            className="w-full rounded-lg object-cover aspect-video"
          />

          {/* Story Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={story.avatar || 'https://i.pravatar.cc/150'}
                alt={story.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold">{story.username}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Eye size={14} />
              <span>{story.views.length} views</span>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={() =>
              setCurrentStoryIndex(
                currentStoryIndex > 0 ? currentStoryIndex - 1 : stories.length - 1
              )
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentStoryIndex((currentStoryIndex + 1) % stories.length)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
          >
            →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 transition-colors">
      <h3 className="font-bold mb-3 text-black dark:text-white">Stories</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {stories.map((story, idx) => (
          <button
            key={story.id}
            onClick={() => setCurrentStoryIndex(idx)}
            className="flex-shrink-0 relative"
          >
            <div className="w-24 h-32 rounded-lg overflow-hidden border-2 border-blue-500 hover:border-blue-600 transition-colors">
              <img
                src={story.image}
                alt={story.username}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                <p className="text-white text-xs font-semibold truncate">{story.username}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
