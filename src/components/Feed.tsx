'use client';

import { useState } from 'react';
import { useStore } from '@/store/store';
import { Heart, MessageCircle, Share2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Feed() {
  const { posts, currentUser } = useStore();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const handleComment = (postId: string) => {
    if (commentText[postId]?.trim()) {
      setCommentText({ ...commentText, [postId]: '' });
      // Comment added (would be saved to store in real app)
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img
                src={post.avatar || 'https://i.pravatar.cc/150'}
                alt={post.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{post.username}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            {currentUser?.id === post.userId && (
              <button className="text-gray-500 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            )}
          </div>

          {/* Post Content */}
          <p className="mb-3">{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full rounded-lg mb-3 object-cover max-h-96"
            />
          )}

          {/* Post Stats */}
          <div className="flex gap-4 text-sm text-gray-500 mb-3 pb-3 border-b">
            <span>{post.likes.length + (likedPosts.has(post.id) ? 1 : 0)} likes</span>
            <span>{post.comments.length} comments</span>
          </div>

          {/* Post Actions */}
          <div className="flex gap-4 mb-3 pb-3 border-b">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-2 flex-1 justify-center py-2 rounded hover:bg-gray-100 ${
                likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              <Heart size={18} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
              <span>Like</span>
            </button>
            <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded hover:bg-gray-100 text-gray-600">
              <MessageCircle size={18} />
              <span>Comment</span>
            </button>
            <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded hover:bg-gray-100 text-gray-600">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>

          {/* Comments */}
          {post.comments.length > 0 && (
            <div className="mb-3 space-y-2">
              {post.comments.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <span className="font-semibold">{comment.username}</span>
                  <span className="text-gray-600"> {comment.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Comment Input */}
          {currentUser && (
            <div className="flex gap-2">
              <img
                src={currentUser.avatar || 'https://i.pravatar.cc/150'}
                alt="Your avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[post.id] || ''}
                  onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                  className="flex-1 px-3 py-2 bg-gray-100 rounded-full text-sm outline-none"
                />
                <button
                  onClick={() => handleComment(post.id)}
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
