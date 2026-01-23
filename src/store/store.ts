import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  website?: string;
  pronouns?: string;
  isPrivate: boolean;
  followers: string[];
  following: string[];
  blockedUsers: string[];
  followRequests: string[];
  postsCount: number;
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
  taggedUsers?: string[];
  isPublic: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  likes: string[];
  createdAt: string;
}

export interface Reel {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  video: string; // base64 or URL
  caption?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'tag' | 'share';
  fromUser: string;
  toUser: string;
  postId?: string;
  message: string;
  createdAt: string;
  read: boolean;
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
  toggleSavePost: (postId: string) => void;
  savedPosts: string[];

  // Reels
  reels: Reel[];
  setReels: (reels: Reel[]) => void;
  addReel: (reel: Reel) => void;

  // Notifications
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;

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
  toggleFollow: (targetUserId: string) => void;
  togglePrivateAccount: (userId: string) => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  respondToFollowRequest: (userId: string, accept: boolean) => void;
  updateUserProfile: (user: User) => void;

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
      savedPosts: [],
      toggleSavePost: (postId) =>
        set((state) => ({
          savedPosts: state.savedPosts.includes(postId)
            ? state.savedPosts.filter((id) => id !== postId)
            : [...state.savedPosts, postId],
        })),

      reels: [],
      setReels: (reels) => set({ reels }),
      addReel: (reel) => set((state) => ({ reels: [reel, ...state.reels] })),

      notifications: [],
      setNotifications: (notifications) => set({ notifications }),
      addNotification: (notification) =>
        set((state) => ({ notifications: [notification, ...state.notifications] })),
      markNotificationAsRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
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
      toggleFollow: (targetUserId) =>
        set((state) => {
          if (!state.currentUser) return state;
          const targetUser = state.users.find((u) => u.id === targetUserId);
          if (!targetUser) return state;

          const isFollowing = state.currentUser.following.includes(targetUserId);
          const updatedUser = {
            ...state.currentUser,
            following: isFollowing
              ? state.currentUser.following.filter((id) => id !== targetUserId)
              : [...state.currentUser.following, targetUserId],
          };

          return {
            currentUser: updatedUser,
            users: state.users.map((u) =>
              u.id === targetUserId
                ? {
                    ...u,
                    followers: isFollowing
                      ? u.followers.filter((id) => id !== state.currentUser!.id)
                      : [...u.followers, state.currentUser!.id],
                  }
                : u
            ),
          };
        }),
      togglePrivateAccount: (userId) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId ? { ...u, isPrivate: !u.isPrivate } : u
          ),
          currentUser:
            state.currentUser?.id === userId
              ? { ...state.currentUser, isPrivate: !state.currentUser.isPrivate }
              : state.currentUser,
        })),
      blockUser: (userId) =>
        set((state) => ({
          currentUser: state.currentUser
            ? {
                ...state.currentUser,
                blockedUsers: [...(state.currentUser.blockedUsers || []), userId],
              }
            : null,
        })),
      unblockUser: (userId) =>
        set((state) => ({
          currentUser: state.currentUser
            ? {
                ...state.currentUser,
                blockedUsers: state.currentUser.blockedUsers.filter((id) => id !== userId),
              }
            : null,
        })),
      respondToFollowRequest: (userId, accept) =>
        set((state) => ({
          currentUser: state.currentUser
            ? {
                ...state.currentUser,
                followRequests: state.currentUser.followRequests.filter((id) => id !== userId),
                followers: accept
                  ? [...state.currentUser.followers, userId]
                  : state.currentUser.followers,
              }
            : null,
        })),
      updateUserProfile: (user) =>
        set((state) => ({
          currentUser: state.currentUser?.id === user.id ? user : state.currentUser,
          users: state.users.map((u) => (u.id === user.id ? user : u)),
        })),

      selectedChat: null,
      setSelectedChat: (userId) => set({ selectedChat: userId }),
    }),
    {
      name: 'socialhub-store',
    }
  )
);
