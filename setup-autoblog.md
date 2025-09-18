# 🤖 Automated Blog System - Technical Setup

> **For Website Owner:** See `OWNER-HANDOFF-GUIDE.md` for simple instructions
> **For Developers:** Technical details below

## Quick Start (5 minutes)

### 1. Test the system
```bash
cd C:\Users\simmo\Desktop\project-bolt-github-vimxyh6v\project
node auto-blog-system.cjs --once
```

### 2. Start automated daily posting
```bash
node auto-blog-system.cjs --start
```

## How It Works

### 🔄 **Fully Automated Process:**
1. **Monitors 5 African travel RSS feeds** every 24 hours
2. **Filters for relevant content** (Africa, safari, wildlife, etc.)
3. **Rewrites in Ikhaya KaMa voice** with brand messaging
4. **Auto-publishes** to your blog
5. **Prevents duplicates** by tracking processed articles

### 📰 **RSS Sources:**
- Africa Geographic
- Safari Bookings Blog  
- Go2Africa Blog
- Africa Freak
- Expert Africa Blog

### 🎯 **Content Categories:**
- **Wildlife** - Safari animals, Big Five, conservation
- **Culture** - Local traditions, people, heritage
- **Destinations** - Country guides, attractions
- **Travel Tips** - Planning advice, preparation

### 📁 **Generated Files:**
- `src/content/auto-blog-posts.json` - All generated posts
- `src/content/processed-links.json` - Prevents duplicates

## Integration with Your Site

### Option A: Replace existing blog data
Update `src/pages/BlogIndex.tsx` to load from `auto-blog-posts.json`:

```typescript
import autoPosts from '../content/auto-blog-posts.json';

const BlogIndex = () => {
  const blogPosts = autoPosts; // Use auto-generated posts
  // ... rest of component
};
```

### Option B: Merge with existing posts
Combine auto-generated with your manual posts:

```typescript
import autoPosts from '../content/auto-blog-posts.json';
import manualPosts from '../content/manual-blog-posts.json';

const allPosts = [...autoPosts, ...manualPosts].sort((a, b) => 
  new Date(b.date) - new Date(a.date)
);
```

## Advanced Features (Optional)

### 🤖 Add OpenAI Integration
1. Get OpenAI API key from https://platform.openai.com/
2. Add to the rewriteContent function:

```javascript
// In auto-blog-system.js, replace rewriteContent function:
async rewriteContent(originalContent) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: `Rewrite this for Ikhaya KaMa Vacations (luxury African safari company): ${originalContent}`
      }]
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}
```

### 📱 Social Media Auto-Posting
Add Buffer/Hootsuite integration to auto-share new posts.

### 📧 Email Notifications
Get notified when new posts are published.

## Running 24/7

### Local Development:
```bash
# Keep running in background
node auto-blog-system.js --start &
```

### Production (Netlify/Vercel):
Set up as a scheduled function that runs daily.

## Monitoring

The system logs everything:
- ✅ New posts created
- ⏭️ Duplicates skipped  
- ❌ Errors encountered
- 📊 Daily summary

**Your blog will automatically grow with fresh, relevant African travel content every day!** 🌍✨

---

## 👤 Client Handoff

### For the Website Owner:
- See `OWNER-HANDOFF-GUIDE.md` for simple, non-technical instructions
- Contains monitoring steps, troubleshooting, and cost information
- Written in plain English for business owners

### Developer Handoff Checklist:
- [ ] Auto-blog system running via GitHub Actions
- [ ] OpenAI API key configured in GitHub Secrets
- [ ] Client has access to GitHub repository (read-only)
- [ ] Client has Netlify admin access
- [ ] Email notifications set up for system errors
- [ ] Owner guide provided and explained
- [ ] Monthly cost breakdown provided
- [ ] Emergency contact information exchanged

### Ongoing Support:
- Monitor GitHub Actions for failures
- Update RSS sources if feeds break
- Adjust AI prompts based on client feedback
- Add new destinations or content as requested
