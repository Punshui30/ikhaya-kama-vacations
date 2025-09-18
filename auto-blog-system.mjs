// Fully Automated RSS Blog System for Ikhaya KaMa - ES MODULE VERSION
// Run with: node auto-blog-system.mjs

import fs from 'fs/promises';
import path from 'path';

class AutoBlogger {
  constructor() {
    this.rssSources = [
      'https://www.africageographic.com/feed/',
      'https://blog.safari-bookings.com/feed/',
      'https://www.go2africa.com/blog/feed',
      'https://africafreak.com/feed',
      'https://www.expertafrica.com/blog/feed'
    ];
    
    this.categories = ['Wildlife', 'Culture', 'Destinations', 'Travel Tips'];
    this.processedLinksFile = 'src/content/processed-links.json';
    this.outputFile = 'src/content/auto-blog-posts.json';
    
    this.brandVoice = {
      company: 'Ikhaya KaMa Vacations',
      tone: 'luxury travel expert, authentic, inspiring',
      focus: 'African safari and cultural experiences',
      cta: 'Plan your African adventure with us'
    };
  }

  async ensureDirectories() {
    const contentDir = 'src/content';
    try {
      await fs.access(contentDir);
    } catch {
      await fs.mkdir(contentDir, { recursive: true });
    }
  }

  async loadProcessedLinks() {
    try {
      const data = await fs.readFile(this.processedLinksFile, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveProcessedLinks(links) {
    await fs.writeFile(this.processedLinksFile, JSON.stringify(links, null, 2));
  }

  async fetchRSS(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      console.error(`Failed to fetch ${url}:`, error.message);
      return null;
    }
  }

  parseRSSFeed(xmlContent) {
    const items = [];
    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xmlContent)) !== null) {
      const itemContent = match[1];
      
      const title = this.extractTag(itemContent, 'title');
      const link = this.extractTag(itemContent, 'link');
      const description = this.extractTag(itemContent, 'description');
      const pubDate = this.extractTag(itemContent, 'pubDate');

      if (title && link && this.isRelevantContent(title + ' ' + description)) {
        items.push({
          title: this.cleanText(title),
          link: link.trim(),
          description: this.cleanText(description),
          pubDate: pubDate || new Date().toISOString()
        });
      }
    }

    return items;
  }

  extractTag(content, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  }

  cleanText(text) {
    if (!text) return '';
    return text
      .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  isRelevantContent(text) {
    const africanKeywords = [
      'africa', 'safari', 'kenya', 'tanzania', 'south africa', 'botswana',
      'namibia', 'zimbabwe', 'zambia', 'uganda', 'morocco', 'serengeti',
      'masai mara', 'kruger', 'okavango', 'big five', 'wildlife', 'lion',
      'elephant', 'rhino', 'leopard', 'buffalo', 'cheetah', 'giraffe',
      'zebra', 'wildebeest', 'migration', 'game drive', 'bush', 'savanna'
    ];

    const lowerText = text.toLowerCase();
    return africanKeywords.some(keyword => lowerText.includes(keyword));
  }

  async rewriteContent(originalTitle, originalDescription) {
    // Simple rewrite without OpenAI for now
    const templates = [
      `Discover the magic of ${originalTitle.replace(/^.*?:/, '').trim()}. ${originalDescription.substring(0, 200)}... Experience authentic Africa with ${this.brandVoice.company}.`,
      `${originalTitle.replace(/^.*?:/, '').trim()} awaits your discovery. ${originalDescription.substring(0, 180)}... Let ${this.brandVoice.company} craft your perfect African journey.`,
      `Immerse yourself in ${originalTitle.replace(/^.*?:/, '').trim()}. ${originalDescription.substring(0, 190)}... ${this.brandVoice.cta}.`
    ];
    
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    return randomTemplate;
  }

  selectImage() {
    const images = [
      '/images/SouthAfrica.png',
      '/images/Kenya.png', 
      '/images/Tanzania.png',
      '/img/destinations/namibia/hero.jpg',
      '/img/destinations/botswana/hero.jpg',
      '/img/destinations/morocco/hero.jpg',
      '/img/destinations/zimbabwe/hero.jpg',
      '/img/destinations/uganda/hero.jpg'
    ];
    return images[Math.floor(Math.random() * images.length)];
  }

  selectCategory() {
    return this.categories[Math.floor(Math.random() * this.categories.length)];
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }

  async createBlogPost(rssItem) {
    const rewrittenContent = await this.rewriteContent(rssItem.title, rssItem.description);
    
    return {
      id: Date.now() + Math.random(),
      title: rssItem.title,
      excerpt: rewrittenContent,
      content: `<p>${rewrittenContent}</p><p>Ready to experience this for yourself? Contact ${this.brandVoice.company} to plan your authentic African adventure.</p>`,
      image: this.selectImage(),
      category: this.selectCategory(),
      author: "Ikhaya KaMa Team",
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: "5 min read",
      slug: this.generateSlug(rssItem.title),
      source: 'auto-generated'
    };
  }

  async loadExistingPosts() {
    try {
      const data = await fs.readFile(this.outputFile, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveBlogPosts(posts) {
    await fs.writeFile(this.outputFile, JSON.stringify(posts, null, 2));
  }

  async run() {
    console.log('🤖 Starting automated blog generation...');
    
    await this.ensureDirectories();
    
    const processedLinks = await this.loadProcessedLinks();
    const existingPosts = await this.loadExistingPosts();
    
    let newPostsCount = 0;
    const maxPosts = 3; // Limit to prevent spam
    
    for (const rssUrl of this.rssSources) {
      if (newPostsCount >= maxPosts) break;
      
      console.log(`📡 Fetching from: ${rssUrl}`);
      const rssContent = await this.fetchRSS(rssUrl);
      
      if (!rssContent) continue;
      
      const items = this.parseRSSFeed(rssContent);
      console.log(`📄 Found ${items.length} items`);
      
      for (const item of items) {
        if (newPostsCount >= maxPosts) break;
        
        if (processedLinks.includes(item.link)) {
          console.log(`⏭️  Skipping duplicate: ${item.title.substring(0, 50)}...`);
          continue;
        }
        
        console.log(`✨ Creating post: ${item.title.substring(0, 50)}...`);
        const blogPost = await this.createBlogPost(item);
        
        existingPosts.unshift(blogPost);
        processedLinks.push(item.link);
        newPostsCount++;
        
        // Keep only last 50 posts to prevent file from growing too large
        if (existingPosts.length > 50) {
          existingPosts.splice(50);
        }
      }
    }
    
    if (newPostsCount > 0) {
      await this.saveBlogPosts(existingPosts);
      await this.saveProcessedLinks(processedLinks);
      console.log(`✅ Generated ${newPostsCount} new blog posts!`);
    } else {
      console.log('📝 No new posts generated (all sources already processed)');
    }
    
    console.log(`📊 Total posts in database: ${existingPosts.length}`);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
🤖 Automated Blog System for Ikhaya KaMa Vacations

Usage:
  node auto-blog-system.mjs --once    Generate posts once
  node auto-blog-system.mjs --help    Show this help

The system will:
✓ Fetch from 5 African travel RSS feeds
✓ Filter for relevant African content
✓ Rewrite in Ikhaya KaMa brand voice
✓ Generate blog posts with images
✓ Prevent duplicates
✓ Save to src/content/auto-blog-posts.json
  `);
  process.exit(0);
}

if (args.includes('--once')) {
  const blogger = new AutoBlogger();
  blogger.run().catch(console.error);
} else {
  console.log('Use --once to generate posts or --help for usage info');
}
