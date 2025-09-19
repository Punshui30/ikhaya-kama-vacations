#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create sample blog posts for Ikhaya KaMa
function createSamplePosts() {
  const posts = [
    {
      title: "Discover the Magic of African Safaris",
      description: "Experience the thrill of seeing the Big Five in their natural habitat. From the vast plains of the Serengeti to the lush Okavango Delta, Africa offers unforgettable wildlife encounters.",
      slug: "discover-african-safaris",
      publishedAt: new Date().toISOString(),
      author: "Ikhaya KaMa Team",
      category: "safari",
      imageUrl: "/img/blog/safari-hero.jpg"
    },
    {
      title: "Cultural Immersion in South Africa",
      description: "Connect with local communities and learn about rich traditions. Visit historical sites like Robben Island and experience authentic Zulu and Xhosa cultures.",
      slug: "cultural-immersion-south-africa",
      publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      author: "Ikhaya KaMa Team",
      category: "culture",
      imageUrl: "/img/blog/culture-hero.jpg"
    },
    {
      title: "Best Time to Visit East Africa",
      description: "Plan your perfect African adventure with our seasonal guide. Learn when to witness the Great Migration, enjoy dry season safaris, or experience the green season's beauty.",
      slug: "best-time-east-africa",
      publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      author: "Ikhaya KaMa Team",
      category: "tips",
      imageUrl: "/img/blog/seasonal-guide.jpg"
    },
    {
      title: "Luxury Safari Lodges in Botswana",
      description: "Stay in world-class accommodations while exploring the Okavango Delta. Our curated selection of luxury lodges offers exceptional comfort and incredible wildlife viewing opportunities.",
      slug: "luxury-safari-lodges-botswana",
      publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      author: "Ikhaya KaMa Team",
      category: "accommodation",
      imageUrl: "/img/blog/luxury-lodge.jpg"
    },
    {
      title: "Adventure Activities in Namibia",
      description: "From climbing the towering sand dunes of Sossusvlei to exploring the Skeleton Coast, Namibia offers adventure seekers unforgettable experiences in stunning desert landscapes.",
      slug: "adventure-activities-namibia",
      publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      author: "Ikhaya KaMa Team",
      category: "adventure",
      imageUrl: "/img/blog/namibia-adventure.jpg"
    }
  ];

  return posts;
}

function generateBlogPosts() {
  console.log('🌍 Generating blog posts for Ikhaya KaMa...');
  
  const posts = createSamplePosts();
  
  // Ensure the content directory exists
  const contentDir = path.join(__dirname, 'src', 'content');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  
  // Save to file
  const outputPath = path.join(contentDir, 'auto-blog-posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
  
  console.log(`📝 Generated ${posts.length} blog posts`);
  console.log(`💾 Saved to: ${outputPath}`);
  console.log('\n📋 Blog posts created:');
  posts.forEach((post, index) => {
    console.log(`  ${index + 1}. ${post.title}`);
  });
  
  return posts.length;
}

// Run the script
generateBlogPosts();

