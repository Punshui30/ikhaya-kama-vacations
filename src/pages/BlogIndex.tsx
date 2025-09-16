import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import SEO from '../components/SEO';
import styles from './BlogIndex.module.scss';

const BlogIndex: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Great Migration: A Once-in-a-Lifetime Experience",
      excerpt: "Witness one of nature's most spectacular events as millions of wildebeest and zebra cross the Mara River in search of greener pastures.",
      author: "Kgomotso",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Wildlife",
      image: "/images/blog/great-migration.jpg",
      slug: "great-migration-experience"
    },
    {
      id: 2,
      title: "Cape Town's Hidden Gems: Beyond Table Mountain",
      excerpt: "Discover the secret spots and local favorites that make Cape Town one of Africa's most captivating cities.",
      author: "Kgomotso",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Culture",
      image: "/images/blog/cape-town-gems.jpg",
      slug: "cape-town-hidden-gems"
    },
    {
      id: 3,
      title: "Sustainable Safari: How to Travel Responsibly",
      excerpt: "Learn how to make your African adventure both unforgettable and environmentally conscious.",
      author: "Kgomotso",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Sustainability",
      image: "/images/blog/sustainable-safari.jpg",
      slug: "sustainable-safari-travel"
    },
    {
      id: 4,
      title: "Zanzibar's Spice Islands: A Culinary Journey",
      excerpt: "Explore the aromatic world of Zanzibar's spice plantations and discover the flavors that shaped history.",
      author: "Kgomotso",
      date: "2023-12-28",
      readTime: "8 min read",
      category: "Culture",
      image: "/images/blog/zanzibar-spices.jpg",
      slug: "zanzibar-spice-islands"
    },
    {
      id: 5,
      title: "Family Safari: Making Memories with Kids in Africa",
      excerpt: "Tips and tricks for planning the perfect family safari that will create lasting memories for all ages.",
      author: "Kgomotso",
      date: "2023-12-20",
      readTime: "9 min read",
      category: "Family Travel",
      image: "/images/blog/family-safari.jpg",
      slug: "family-safari-tips"
    },
    {
      id: 6,
      title: "The Maasai Way: Understanding Traditional Culture",
      excerpt: "Dive deep into the rich traditions and modern realities of Maasai culture in Kenya and Tanzania.",
      author: "Kgomotso",
      date: "2023-12-15",
      readTime: "6 min read",
      category: "Culture",
      image: "/images/blog/maasai-culture.jpg",
      slug: "maasai-culture-tradition"
    }
  ];

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
        </div>
      </Section>

      <Section padding="large">
        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.blogCard}>
              <Link to={`/blog/${post.slug}`} className={styles.cardLink}>
                <div className={styles.cardImage}>
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                  />
                  <div className={styles.cardCategory}>{post.category}</div>
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
