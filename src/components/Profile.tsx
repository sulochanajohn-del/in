'use client';

import { useStore } from '@/store/store';
import { Edit, LogOut, Users, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export function Profile() {
  const { currentUser, posts, setCurrentUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: currentUser?.username || '',
    bio: currentUser?.bio || '',
  });

  const userPosts = posts.filter((p) => p.userId === currentUser?.id);

  const handleSave = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        username: editData.username,
        bio: editData.bio,
      };
      setCurrentUser(updatedUser);
      
      // Update user in users list
      const updatedUsers = posts.length > 0 
        ? [] 
        : [];
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <img
              src={currentUser.avatar || 'https://i.pravatar.cc/150'}
              alt={currentUser.username}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    className="block w-full px-3 py-2 border rounded-lg"
                    placeholder="Username"
                  />
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="block w-full px-3 py-2 border rounded-lg"
                    placeholder="Bio"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold">{currentUser.username}</h1>
                  <p className="text-gray-600">{currentUser.bio}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {currentUser.email}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold">{userPosts.length}</p>
            <p className="text-gray-600">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{currentUser.followers.length}</p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{currentUser.following.length}</p>
            <p className="text-gray-600">Following</p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon size={20} />
          <h2 className="text-xl font-bold">Posts</h2>
        </div>
        {userPosts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No posts yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userPosts.map((post) => (
              <div key={post.id} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={post.image || 'https://via.placeholder.com/300x300'}
                  alt="Post"
                  className="w-full aspect-square object-cover group-hover:brightness-75 transition"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                  <div className="flex gap-4 text-white">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{post.likes.length}</p>
                      <p className="text-sm">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{post.comments.length}</p>
                      <p className="text-sm">Comments</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
