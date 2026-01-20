'use client';

import { useState } from 'react';
import { useStore } from '@/store/store';
import { Send, Paperclip } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Messages() {
  const { messages, users, currentUser, selectedChat, setSelectedChat } = useStore();
  const [messageText, setMessageText] = useState('');

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.senderId === currentUser?.id && msg.recipientId === selectedChat) ||
      (msg.senderId === selectedChat && msg.recipientId === currentUser?.id)
  );

  const selectedUser = users.find((u) => u.id === selectedChat);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      setMessageText('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white rounded-lg shadow">
      {/* Users List */}
      <div className="w-80 border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        <div className="space-y-2">
          {users
            .filter((u) => u.id !== currentUser?.id)
            .map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedChat(user.id)}
                className={`w-full p-3 flex items-center gap-3 hover:bg-gray-100 border-l-4 ${
                  selectedChat === user.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={user.avatar || 'https://i.pravatar.cc/150'}
                  alt={user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-left">
                  <p className="font-semibold text-sm">{user.username}</p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-3">
              <img
                src={selectedUser.avatar || 'https://i.pravatar.cc/150'}
                alt={selectedUser.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{selectedUser.username}</p>
                <p className="text-xs text-gray-500">Active now</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.senderId === currentUser?.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-900'
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Message"
                        className="rounded mb-2 max-h-32"
                      />
                    )}
                    <p>{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatDistanceToNow(new Date(msg.createdAt))}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 hover:bg-gray-100 rounded-full text-blue-500"
              >
                <Send size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
