#!/usr/bin/env node

// Standalone CommonJS blog generator - completely separate from main project
const https = require('https');
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

class BlogGenerator {
  constructor() {
    this.sources = [
      'https://www.africageographic.com/feed/',
      'https://www.go2africa.com/blog/feed',
      'https://africafreak.com/feed'
      // Removed problematic safari-bookings feed
    ];
    
    this.processedFile = 'src/content/processed-links.json';
    this.outputFile = 'src/content/auto-blog-posts.json';
  }

  async ensureDir() {
    try {
      await fs.access('src/content');
    } catch {
      await fs.mkdir('src/content', { recursive: true });
    }
  }

  fetchUrl(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https:') ? https : http;
      
      client.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
  }

  parseRSS(xml) {
    const items = [];
    const itemMatches = xml.match(/<item[^>]*>([\s\S]*?)<\/item>/gi) || [];
    
    for (const item of itemMatches) {
      const title = this.extractTag(item, 'title');
      const link = this.extractTag(item, 'link');
      const description = this.extractTag(item, 'description');
      
      if (title && link && this.isAfricanContent(title + ' ' + description)) {
        items.push({
          title: this.cleanText(title),
          link: link.trim(),
          description: this.cleanText(description)
        });
      }
    }
    
    return items;
  }

  extractTag(content, tag) {
    const match = content.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
    return match ? match[1] : null;
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

  isAfricanContent(text) {
    const keywords = [
      'africa', 'safari', 'kenya', 'tanzania', 'south africa', 'botswana',
      'namibia', 'zimbabwe', 'zambia', 'uganda', 'morocco', 'serengeti',
      'masai mara', 'kruger', 'okavango', 'big five', 'wildlife', 'lion',
      'elephant', 'rhino', 'leopard', 'buffalo', 'migration'
    ];
    
    const lower = text.toLowerCase();
    return keywords.some(keyword => lower.includes(keyword));
  }

  async loadProcessed() {
    try {
      const data = await fs.readFile(this.processedFile, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveProcessed(links) {
    await fs.writeFile(this.processedFile, JSON.stringify(links, null, 2));
  }

  async loadPosts() {
    try {
      const data = await fs.readFile(this.outputFile, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async savePosts(posts) {
    await fs.writeFile(this.outputFile, JSON.stringify(posts, null, 2));
  }

  createPost(item) {
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

    const categories = ['Wildlife', 'Culture', 'Destinations', 'Travel Tips'];
    
    const excerpt = `${item.description.substring(0, 180)}... Experience authentic Africa with Ikhaya KaMa Vacations.`;
    
    return {
      id: Date.now() + Math.random(),
      title: item.title,
      excerpt: excerpt,
      content: `<p>${excerpt}</p><p>Ready to experience this for yourself? Contact Ikhaya KaMa Vacations to plan your authentic African adventure.</p>`,
      image: images[Math.floor(Math.random() * images.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      author: "Ikhaya KaMa Team",
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: "5 min read",
      slug: item.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').substring(0, 50),
      source: 'auto-generated'
    };
  }

  async generate() {
    console.log('🤖 Generating blog posts...');
    
    await this.ensureDir();
    
    const processed = await this.loadProcessed();
    const posts = await this.loadPosts();
    
    let newCount = 0;
    const maxNew = 3;
    
    for (const url of this.sources) {
      if (newCount >= maxNew) break;
      
      try {
        console.log(`📡 Fetching: ${url}`);
        const xml = await this.fetchUrl(url);
        const items = this.parseRSS(xml);
        
        for (const item of items) {
          if (newCount >= maxNew) break;
          
          if (processed.includes(item.link)) {
            console.log(`⏭️  Skip: ${item.title.substring(0, 40)}...`);
            continue;
          }
          
          console.log(`✨ New: ${item.title.substring(0, 40)}...`);
          const post = this.createPost(item);
          
          posts.unshift(post);
          processed.push(item.link);
          newCount++;
          
          if (posts.length > 50) posts.splice(50);
        }
      } catch (error) {
        console.error(`❌ Error with ${url}:`, error.message);
      }
    }
    
    // Always save files to ensure they exist for the workflow
    await this.savePosts(posts);
    await this.saveProcessed(processed);
    
    if (newCount > 0) {
      console.log(`✅ Generated ${newCount} new posts!`);
    } else {
      console.log('📝 No new posts (all processed)');
    }
    
    console.log(`📊 Total posts: ${posts.length}`);
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new BlogGenerator();
  generator.generate().catch(console.error);
}

module.exports = BlogGenerator;
