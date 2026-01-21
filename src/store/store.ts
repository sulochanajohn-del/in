import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: string[];
  following: string[];
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  hashtags?: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  image: string;
  expiresAt: string;
  views: string[];
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  text: string;
  image?: string;
  createdAt: string;
  read: boolean;
}

interface AppStore {
  // Auth
  currentUser: User | null;
  token: string | null;
  setCurrentUser: (user: User | null) => void;
  setToken: (token: string | null) => void;

  // Posts
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, post: Post) => void;
  deletePost: (postId: string) => void;

  // Stories
  stories: Story[];
  setStories: (stories: Story[]) => void;
  addStory: (story: Story) => void;

  // Messages
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;

  // Users
  users: User[];
  setUsers: (users: User[]) => void;

  // UI
  selectedChat: string | null;
  setSelectedChat: (userId: string | null) => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      currentUser: null,
      token: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      setToken: (token) => set({ token }),

      posts: [],
      setPosts: (posts) => set({ posts }),
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      updatePost: (postId, post) =>
        set((state) => ({
          posts: state.posts.map((p) => (p.id === postId ? post : p)),
        })),
      deletePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== postId),
        })),

      stories: [],
      setStories: (stories) => set({ stories }),
      addStory: (story) => set((state) => ({ stories: [story, ...state.stories] })),

      messages: [],
      setMessages: (messages) => set({ messages }),
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

      users: [],
      setUsers: (users) => set({ users }),

      selectedChat: null,
      setSelectedChat: (userId) => set({ selectedChat: userId }),
    }),
    {
      name: 'socialhub-store',
    }
  )
);
