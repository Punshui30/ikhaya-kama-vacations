#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple RSS feed fetcher
async function fetchRSSFeed(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    // Simple XML parsing for RSS
    const items = text.match(/<item>[\s\S]*?<\/item>/g) || [];
    const posts = [];
    
    for (const item of items.slice(0, 5)) { // Get latest 5
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/);
      
      if (titleMatch && linkMatch) {
        posts.push({
          title: (titleMatch[1] || titleMatch[2] || '').trim(),
          link: linkMatch[1].trim(),
          description: (descMatch?.[1] || descMatch?.[2] || '').trim().substring(0, 200),
          publishedAt: new Date().toISOString(),
          slug: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        });
      }
    }
    
    return posts;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return [];
  }
}

async function generateBlogPosts() {
  console.log('🌍 Fetching African travel news...');
  
  const rssSources = [
    'https://www.nationalgeographic.com/travel/destinations/africa/rss/',
    'https://www.lonelyplanet.com/news/rss',
    'https://www.afar.com/rss.xml'
  ];
  
  let allPosts = [];
  
  for (const url of rssSources) {
    try {
      const posts = await fetchRSSFeed(url);
      allPosts = allPosts.concat(posts);
      console.log(`✅ Fetched ${posts.length} posts from ${url}`);
    } catch (error) {
      console.log(`❌ Failed to fetch from ${url}: ${error.message}`);
    }
  }
  
  // Save to file
  const outputPath = path.join(__dirname, 'src', 'content', 'auto-blog-posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(allPosts, null, 2));
  
  console.log(`📝 Generated ${allPosts.length} blog posts`);
  console.log(`💾 Saved to: ${outputPath}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBlogPosts().catch(console.error);
}

export { generateBlogPosts };
