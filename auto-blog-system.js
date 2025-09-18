// Fully Automated RSS Blog System for Ikhaya KaMa
// Run with: node auto-blog-system.js

const fs = require('fs').promises;
const path = require('path');

class AutoBlogger {
  constructor() {
    this.rssSources = [
      'https://www.africageographic.com/feed/',
      'https://www.safaribookings.com/blog/feed',
      'https://www.go2africa.com/feed',
      'https://africafreak.com/feed',
      'https://www.expertafrica.com/blog/feed'
    ];
    
    this.blogPostsFile = path.join(__dirname, 'src/content/auto-blog-posts.json');
    this.processedLinksFile = path.join(__dirname, 'src/content/processed-links.json');
  }

  // Fetch and parse RSS feeds
  async fetchRSSFeeds() {
    console.log('🔍 Fetching RSS feeds...');
    const allItems = [];

    for (const feedUrl of this.rssSources) {
      try {
        console.log(`  📡 Checking: ${feedUrl}`);
        const response = await fetch(feedUrl);
        const xmlText = await response.text();
        
        // Simple XML parsing for RSS items
        const items = this.parseRSSItems(xmlText);
        const relevantItems = items.filter(item => this.isAfricanTravel(item));
        
        allItems.push(...relevantItems);
        console.log(`  ✅ Found ${relevantItems.length} relevant items`);
      } catch (error) {
        console.log(`  ❌ Failed to fetch ${feedUrl}:`, error.message);
      }
    }

    return allItems.slice(0, 5); // Latest 5 items
  }

  // Simple RSS XML parser
  parseRSSItems(xmlText) {
    const items = [];
    const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];
    
    itemMatches.forEach(itemXml => {
      const title = this.extractTag(itemXml, 'title');
      const description = this.extractTag(itemXml, 'description');
      const link = this.extractTag(itemXml, 'link');
      const pubDate = this.extractTag(itemXml, 'pubDate');
      
      if (title && description) {
        items.push({ title, description, link, pubDate });
      }
    });
    
    return items;
  }

  // Extract content from XML tags
  extractTag(xml, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
    const match = xml.match(regex);
    return match ? match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim() : '';
  }

  // Check if content is about African travel
  isAfricanTravel(item) {
    const keywords = [
      'africa', 'safari', 'kenya', 'tanzania', 'south africa', 'botswana',
      'namibia', 'uganda', 'zimbabwe', 'morocco', 'wildlife', 'big five',
      'serengeti', 'kruger', 'maasai', 'zanzibar', 'cape town', 'victoria falls'
    ];
    
    const text = (item.title + ' ' + item.description).toLowerCase();
    return keywords.some(keyword => text.includes(keyword));
  }

  // Generate blog post from RSS item
  async generateBlogPost(rssItem) {
    console.log(`📝 Processing: ${rssItem.title}`);
    
    // For now, create a simple rewritten version
    // You can add OpenAI API integration here later
    const blogPost = {
      id: Date.now(),
      title: this.rewriteTitle(rssItem.title),
      excerpt: this.generateExcerpt(rssItem.description),
      content: this.rewriteContent(rssItem.description),
      category: this.categorizeContent(rssItem.title, rssItem.description),
      author: "Ikhaya KaMa Team",
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      }),
      readTime: this.calculateReadTime(rssItem.description),
      slug: this.generateSlug(rssItem.title),
      image: this.selectImage(),
      source: 'auto-generated'
    };

    return blogPost;
  }

  // Simple title rewriting for Ikhaya KaMa brand
  rewriteTitle(originalTitle) {
    const brandPrefixes = [
      "Discover",
      "Experience", 
      "Explore",
      "Journey to",
      "Adventures in"
    ];
    
    const prefix = brandPrefixes[Math.floor(Math.random() * brandPrefixes.length)];
    
    // Clean up the title and add brand voice
    let newTitle = originalTitle
      .replace(/^\w+:\s*/, '') // Remove "News:" etc
      .replace(/\s+/g, ' ')
      .trim();
      
    if (newTitle.length > 50) {
      newTitle = newTitle.substring(0, 47) + '...';
    }
    
    return `${prefix} ${newTitle}`;
  }

  // Generate excerpt
  generateExcerpt(content) {
    const cleaned = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return cleaned.length > 157 ? cleaned.substring(0, 154) + '...' : cleaned;
  }

  // Rewrite content for Ikhaya KaMa voice
  rewriteContent(originalContent) {
    const cleaned = originalContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    
    const intro = "At Ikhaya KaMa Vacations, we believe every journey to Africa tells a story. Here's what we've discovered about this incredible destination:\n\n";
    const outro = "\n\nReady to experience this for yourself? Let Ikhaya KaMa Vacations craft your perfect African adventure. Contact us to start planning your journey of a lifetime.";
    
    return intro + cleaned + outro;
  }

  // Categorize content
  categorizeContent(title, content) {
    const text = (title + ' ' + content).toLowerCase();
    
    if (text.includes('wildlife') || text.includes('safari') || text.includes('animals')) return 'Wildlife';
    if (text.includes('culture') || text.includes('tradition') || text.includes('people')) return 'Culture';
    if (text.includes('tip') || text.includes('guide') || text.includes('advice')) return 'Travel Tips';
    return 'Destinations';
  }

  // Calculate read time
  calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  // Generate URL slug
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Select random image from existing destination images
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

  // Load existing blog posts
  async loadBlogPosts() {
    try {
      const data = await fs.readFile(this.blogPostsFile, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  // Save blog posts
  async saveBlogPosts(posts) {
    await fs.writeFile(this.blogPostsFile, JSON.stringify(posts, null, 2));
    console.log(`💾 Saved ${posts.length} blog posts`);
  }

  // Check if link already processed
  async isProcessed(link) {
    try {
      const data = await fs.readFile(this.processedLinksFile, 'utf-8');
      const processedLinks = JSON.parse(data);
      return processedLinks.includes(link);
    } catch {
      return false;
    }
  }

  // Mark link as processed
  async markProcessed(link) {
    let processedLinks = [];
    try {
      const data = await fs.readFile(this.processedLinksFile, 'utf-8');
      processedLinks = JSON.parse(data);
    } catch {
      // File doesn't exist
    }
    
    processedLinks.push(link);
    await fs.writeFile(this.processedLinksFile, JSON.stringify(processedLinks, null, 2));
  }

  // Main automation function
  async runAutomation() {
    console.log('🚀 Starting automated blog generation...');
    
    try {
      // Fetch RSS items
      const rssItems = await this.fetchRSSFeeds();
      console.log(`📰 Found ${rssItems.length} new articles to process`);
      
      // Load existing posts
      const existingPosts = await this.loadBlogPosts();
      let newPostsCount = 0;
      
      // Process each item
      for (const item of rssItems) {
        // Skip if already processed
        if (await this.isProcessed(item.link)) {
          console.log(`⏭️  Skipping already processed: ${item.title}`);
          continue;
        }
        
        // Generate blog post
        const blogPost = await this.generateBlogPost(item);
        
        // Add to posts
        existingPosts.unshift(blogPost);
        newPostsCount++;
        
        // Mark as processed
        await this.markProcessed(item.link);
        
        console.log(`✅ Created: ${blogPost.title}`);
      }
      
      // Save updated posts
      if (newPostsCount > 0) {
        await this.saveBlogPosts(existingPosts);
        console.log(`🎉 Generated ${newPostsCount} new blog posts!`);
      } else {
        console.log('📝 No new content to process');
      }
      
    } catch (error) {
      console.error('❌ Automation failed:', error);
    }
  }

  // Start scheduled automation
  startScheduled(intervalHours = 24) {
    console.log(`⏰ Starting automated blog system (every ${intervalHours} hours)`);
    
    // Run immediately
    this.runAutomation();
    
    // Schedule recurring runs
    setInterval(() => {
      this.runAutomation();
    }, intervalHours * 60 * 60 * 1000);
  }
}

// Usage
const autoBlogger = new AutoBlogger();

// Run once
if (process.argv.includes('--once')) {
  autoBlogger.runAutomation();
}

// Start scheduled (daily)
if (process.argv.includes('--start')) {
  autoBlogger.startScheduled(24); // Every 24 hours
}

// Export for manual use
module.exports = AutoBlogger;
