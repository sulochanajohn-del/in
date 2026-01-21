'use client';

import { useStore } from '@/store/store';
import { Users, User as UserIcon, UserPlus, UserCheck } from 'lucide-react';
import { useState } from 'react';

export function Explore() {
  const { users, currentUser } = useStore();
  const [following, setFollowing] = useState<Set<string>>(new Set(currentUser?.following || []));

  const suggestedUsers = users.filter(
    (u) => u.id !== currentUser?.id && !following.has(u.id)
  );

  const toggleFollow = (userId: string) => {
    const newFollowing = new Set(following);
    if (newFollowing.has(userId)) {
      newFollowing.delete(userId);
    } else {
      newFollowing.add(userId);
    }
    setFollowing(newFollowing);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 transition-colors">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-800 text-black dark:text-white rounded-full outline-none transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      {/* Suggested Users */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex items-center gap-2 mb-4 text-black dark:text-white">
          <Users size={20} />
          <h3 className="font-bold text-lg">Suggested For You</h3>
        </div>

        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={user.avatar || 'https://i.pravatar.cc/150'}
                  alt={user.username}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold text-black dark:text-white">{user.username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.followers.length} followers</p>
                  {user.bio && <p className="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>}
                </div>
              </div>
              <button
                onClick={() => toggleFollow(user.id)}
                className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition ${
                  following.has(user.id)
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                    : 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700'
                }`}
              >
                {following.has(user.id) ? (
                  <>
                    <UserCheck size={16} />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    Follow
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Users Grid */}
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <h3 className="font-bold mb-4">All Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {users
            .filter((u) => u.id !== currentUser?.id)
            .map((user) => (
              <div key={user.id} className="p-3 border rounded-lg hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={user.avatar || 'https://i.pravatar.cc/150'}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.followers.length} followers</p>
                  </div>
                </div>
                {user.bio && <p className="text-xs text-gray-600 mb-2">{user.bio}</p>}
                <button
                  onClick={() => toggleFollow(user.id)}
                  className={`w-full py-1 rounded font-semibold text-sm transition ${
                    following.has(user.id)
                      ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {following.has(user.id) ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
