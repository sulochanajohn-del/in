'use client';

import { useState } from 'react';
import { useStore } from '@/store/store';
import { Send, Paperclip, Phone, Video, Info, Search as SearchIcon, Edit2 } from 'lucide-react';

export function Messages() {
  const { messages, users, currentUser, selectedChat, setSelectedChat, addMessage } = useStore();
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.senderId === currentUser?.id && msg.recipientId === selectedChat) ||
      (msg.senderId === selectedChat && msg.recipientId === currentUser?.id)
  );

  const selectedUser = users.find((u) => u.id === selectedChat);

  const userList = users.filter(
    (u) => u.id !== currentUser?.id && (!searchQuery || u.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat && currentUser) {
      const newMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        recipientId: selectedChat,
        text: messageText,
        createdAt: new Date().toISOString(),
        read: false,
      };
      addMessage(newMessage);
      setMessageText('');
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black">
      {/* Conversations List */}
      <div className="w-96 border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-black text-black dark:text-white">{currentUser?.username}</h1>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition">
              <Edit2 size={20} className="text-black dark:text-white" />
            </button>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-black dark:text-white text-sm outline-none focus:border-gray-400 dark:focus:border-gray-600"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {userList.length > 0 ? (
            <div className="space-y-0">
              {userList.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedChat(user.id)}
                  className={`w-full p-3 flex items-center gap-3 transition-colors text-left border-l-4 ${
                    selectedChat === user.id
                      ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-900'
                      : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.avatar || 'https://i.pravatar.cc/150'}
                      alt={user.username}
                      className="w-14 h-14 rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-black dark:text-white truncate">{user.username}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Active now</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <p className="text-gray-500 dark:text-gray-400">No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat && selectedUser ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-black z-10">
            <div className="flex items-center gap-3">
              <img
                src={selectedUser.avatar || 'https://i.pravatar.cc/150'}
                alt={selectedUser.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-black dark:text-white">{selectedUser.username}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Active now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition">
                <Phone size={20} className="text-black dark:text-white" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition">
                <Video size={20} className="text-black dark:text-white" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition">
                <Info size={20} className="text-black dark:text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-black">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-3xl ${
                      msg.senderId === currentUser?.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Message"
                        className="mb-2 max-h-48 rounded-xl"
                      />
                    )}
                    <p className="text-sm break-words">{msg.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src={selectedUser.avatar || 'https://i.pravatar.cc/150'}
                  alt={selectedUser.username}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="font-semibold text-black dark:text-white mb-1">
                  {selectedUser.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Instagram User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  Start your conversation
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-3 items-center">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition text-black dark:text-white">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                placeholder="Aa"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 text-black dark:text-white text-sm outline-none focus:border-gray-400 dark:focus:border-gray-600"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition text-blue-500 disabled:text-gray-400"
                disabled={!messageText.trim()}
              >
                <Send size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-black dark:text-white mb-2">
              Your messages
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Send a message to start a conversation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
