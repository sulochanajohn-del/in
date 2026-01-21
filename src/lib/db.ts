import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://i.pravatar.cc/150' },
  bio: { type: String, default: '' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  avatar: String,
  content: { type: String, required: true },
  image: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  hashtags: [String],
  createdAt: { type: Date, default: Date.now },
});

export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

const HashtagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, lowercase: true },
  count: { type: Number, default: 1 },
  updatedAt: { type: Date, default: Date.now },
});

export const Hashtag = mongoose.models.Hashtag || mongoose.model('Hashtag', HashtagSchema);

const StorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: String,
  avatar: String,
  image: String,
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
  createdAt: { type: Date, default: Date.now },
});

export const Story = mongoose.models.Story || mongoose.model('Story', StorySchema);

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: String,
  image: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
