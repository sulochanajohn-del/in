# IN - Instagram Clone - Setup Guide

## Full Production Setup

This is a complete Instagram clone with all features fully functional. Follow these steps to get it running:

### 1. MongoDB Setup (Required)

Choose one option:

#### Option A: MongoDB Atlas Cloud (Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/socialhub?retryWrites=true&w=majority`
5. Replace `username` and `password` with your credentials

#### Option B: Local MongoDB
1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Start MongoDB: `mongod`
3. Connection string: `mongodb://localhost:27017/socialhub`

### 2. Environment Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your values:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/socialhub?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Create Your First Account

- Click "Create Account"
- Enter email, username, and password
- Your account is created and stored in MongoDB

### Features Available

✅ **Authentication**
- Secure signup/login with JWT
- Password hashing with bcrypt
- Session persistence

✅ **Social Features**
- Create posts with images
- Like, comment, share posts
- Follow/unfollow users
- Public/private account toggle
- User blocking
- Follow requests for private accounts

✅ **Content**
- Stories (upload and view)
- Reels (video feed)
- Explore (discover users)
- Messages/DMs
- Activity/Notifications
- Saved posts collection

✅ **Profile**
- Edit profile (bio, website, pronouns)
- View follower/following lists
- Post grid with stats
- Account privacy settings

### Database Models

All data is stored in MongoDB:
- Users (with followers, following, blocked users, etc.)
- Posts (with comments, likes, hashtags)
- Stories (with views)
- Messages
- Notifications
- Reels

### Deployment to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_APP_URL` (your Vercel domain)
5. Deploy

### No More Demo Mode

- ❌ All demo fallbacks removed
- ❌ Database connection is required
- ❌ All features require real MongoDB
- ✅ Production-ready code

### Troubleshooting

**"Database connection failed"**
- Check MONGODB_URI in .env.local
- Ensure MongoDB is running or Atlas cluster is accessible
- Check username/password in connection string

**"Auth failed"**
- Clear browser localStorage
- Check MongoDB connection
- Verify JWT_SECRET is set

**Posts/Data not persisting**
- Verify MONGODB_URI is correct
- Check MongoDB cluster is running
- Look at server logs for errors

### Next Steps

- Customize the theme in Tailwind CSS
- Add more features (hashtag pages, stories highlights, etc.)
- Set up email verification
- Add image storage (AWS S3, Cloudinary)
- Implement real-time messaging with WebSockets
- Add search functionality for hashtags and posts
