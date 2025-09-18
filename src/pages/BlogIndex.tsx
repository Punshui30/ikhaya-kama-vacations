import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import SEO from '../components/SEO';
import styles from './BlogIndex.module.scss';

// Import auto-generated posts (fallback to manual posts if auto-generation not set up yet)
let autoPosts = [];
try {
  autoPosts = require('../content/auto-blog-posts.json');
} catch {
  // Fallback to manual posts if auto-generation not running yet
}

const BlogIndex: React.FC = () => {
  // Manual posts (your existing content)
  const manualPosts = [
    {
      id: 1,
      title: "The Great Migration: A Once-in-a-Lifetime Experience",
      excerpt: "Witness one of nature's most spectacular events as millions of wildebeest and zebra cross the Mara River in search of greener pastures.",
      image: "/images/blog/great-migration.jpg",
      category: "Wildlife",
      author: "Sarah Johnson",
      date: "December 15, 2023",
      readTime: "8 min read",
      slug: "great-migration-experience"
    },
    {
      id: 2,
      title: "Cape Town's Hidden Gems: Beyond Table Mountain",
      excerpt: "Discover the secret spots and local favorites that make Cape Town one of Africa's most captivating cities.",
      image: "/images/blog/cape-town-gems.jpg",
      category: "Culture",
      author: "Michael Chen",
      date: "December 10, 2023",
      readTime: "6 min read",
      slug: "cape-town-hidden-gems"
    },
    {
      id: 3,
      title: "Safari Packing Essentials: What to Bring to Africa",
      excerpt: "From the right clothing to essential gear, here's everything you need for the perfect African safari adventure.",
      image: "/images/blog/safari-packing.jpg",
      category: "Travel Tips",
      author: "Lisa Rodriguez",
      date: "December 5, 2023",
      readTime: "10 min read",
      slug: "safari-packing-essentials"
    },
    {
      id: 4,
      title: "Maasai Culture and Tradition: A Deep Dive",
      excerpt: "Learn about the rich cultural heritage of the Maasai people and how to respectfully engage with local communities.",
      image: "/images/blog/maasai-culture.jpg",
      category: "Culture",
      author: "David Kimani",
      date: "November 28, 2023",
      readTime: "12 min read",
      slug: "maasai-culture-tradition"
    }
  ];

  // Combine auto-generated and manual posts, sort by date
  const allPosts = [...autoPosts, ...manualPosts].sort((a, b) => {
    const dateA = new Date(a.date || a.publishDate);
    const dateB = new Date(b.date || b.publishDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className={`${styles.blog} page-blog`}>
      <SEO 
        title="African Travel Stories & Tips | Ikhaya KaMa Vacations Blog"
        description="Read inspiring African travel stories, safari tips, and cultural insights from Ikhaya KaMa Vacations. Expert advice for your African adventure."
        ogImage="/images/og/blog.jpg"
        canonical="https://ikhayakama.com/blog"
      />
      
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Stories from Africa</h1>
          <p className={styles.heroSubtitle}>
            Discover the beauty, culture, and adventure of Africa through our travel stories and insights.
          </p>
          {autoPosts.length > 0 && (
            <p className={styles.autoNote}>
              🤖 Fresh content automatically updated daily
            </p>
          )}
        </div>
      </Section>

      <Section padding="large">
        <div className={styles.blogGrid}>
          {allPosts.map((post) => (
            <article key={post.id} className={styles.blogCard}>
              <Link to={`/blog/${post.slug}`} className={styles.cardLink}>
                <div className={styles.cardImage}>
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                  />
                  <div className={styles.cardCategory}>{post.category}</div>
                  {post.source === 'auto-generated' && (
                    <div className={styles.autoTag}>🤖</div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.cardMeta}>
                    <div className={styles.cardAuthor}>
                      <span className={styles.authorName}>{post.author}</span>
                      <span className={styles.cardDate}>{post.date}</span>
                    </div>
                    <span className={styles.readTime}>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default BlogIndex;