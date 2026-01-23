#!/bin/bash

# 🚀 ONE-COMMAND DEPLOYMENT SCRIPT

echo "📦 Instagram Clone - Deployment Script"
echo "========================================"
echo ""

# Check if git remote exists
if git remote get-url origin &> /dev/null; then
    echo "✅ Git remote found"
    ORIGIN=$(git remote get-url origin)
    echo "Remote URL: $ORIGIN"
else
    echo "❌ No git remote found"
    echo "To set up GitHub:"
    echo "1. Create repo at https://github.com/new"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/socialhub.git"
    exit 1
fi

echo ""
echo "📝 Staging all changes..."
git add -A

echo "💾 Committing changes..."
git commit -m "Deploy: Production ready - $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ CODE PUSHED TO GITHUB!"
echo ""
echo "📌 NEXT STEPS:"
echo "1. Go to https://vercel.com/new"
echo "2. Click 'Import Git Repository'"
echo "3. Find your 'socialhub' repo"
echo "4. Add Environment Variables:"
echo "   - MONGODB_URI = your MongoDB Atlas connection string"
echo "   - JWT_SECRET = your-random-32-char-secret"
echo "5. Click 'Deploy'"
echo ""
echo "🌐 Your app will be live in 2-3 minutes!"
echo ""
