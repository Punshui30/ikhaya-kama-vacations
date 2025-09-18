#!/usr/bin/env node

// This script can be called by Netlify's scheduled functions
// or triggered manually via a webhook

const fs = require('fs');
const path = require('path');

async function fetchRSSFeed(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    const items = text.match(/<item>[\s\S]*?<\/item>/g) || [];
    const posts = [];
    
    for (const item of items.slice(0, 3)) {
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/);
      
      if (titleMatch && linkMatch) {
        posts.push({
          title: (titleMatch[1] || titleMatch[2] || '').trim(),
          link: linkMatch[1].trim(),
          description: (descMatch?.[1] || descMatch?.[2] || '').trim().substring(0, 150),
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
  console.log('🌍 Generating blog posts for Ikhaya KaMa...');
  
  const rssSources = [
    'https://www.nationalgeographic.com/travel/destinations/africa/rss/',
    'https://www.lonelyplanet.com/news/rss'
  ];
  
  let allPosts = [];
  
  for (const url of rssSources) {
    try {
      const posts = await fetchRSSFeed(url);
      allPosts = allPosts.concat(posts);
      console.log(`✅ Fetched ${posts.length} posts from RSS feed`);
    } catch (error) {
      console.log(`❌ RSS feed error: ${error.message}`);
    }
  }
  
  // Save to public directory for Netlify
  const outputPath = path.join(__dirname, 'public', 'auto-blog-posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(allPosts, null, 2));
  
  console.log(`📝 Generated ${allPosts.length} blog posts`);
  console.log(`💾 Saved to: ${outputPath}`);
  
  return allPosts.length;
}

// For Netlify Functions
exports.handler = async (event, context) => {
  try {
    const count = await generateBlogPosts();
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `Successfully generated ${count} blog posts`,
        count 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate blog posts',
        details: error.message 
      })
    };
  }
};

// For direct execution
if (require.main === module) {
  generateBlogPosts().catch(console.error);
}
