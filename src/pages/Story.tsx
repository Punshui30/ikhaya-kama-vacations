import React from 'react';
import Section from '../components/Section';
import HeadTags from '../components/HeadTags';
import { copy } from '../content/copy';
import styles from './Story.module.scss';

const Story: React.FC = () => {
  return (
    <div className={`${styles.story} page-story`}>
      <HeadTags 
        seo={{
          title: "Our Story - Ikhaya KaMa Vacations | Authentic African Travel",
          description: "Discover the story behind Ikhaya KaMa Vacations. A journey of rediscovery, connection, and the profound beauty of coming home to Africa.",
          path: "/story",
          ogImage: "/og/story.jpg",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Our Story", path: "/story" }
          ]
        }}
      />
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Our Story</h1>
          <p className={styles.heroSubtitle}>
            A journey of rediscovery, connection, and the profound beauty of coming home.
          </p>
        </div>
      </Section>

      <Section padding="large">
        <div className={styles.storyContent}>
          <div className={styles.founderSection}>
            <div className={styles.founderImage}>
              <img
                src={copy.founder.image}
                alt={copy.founder.name}
                loading="lazy"
              />
            </div>
            <div className={styles.founderInfo}>
              <h2 className={styles.founderName}>{copy.founder.name}</h2>
              <p className={styles.founderTitle}>{copy.founder.title}</p>
              <blockquote className={styles.founderQuote}>
                "{copy.founder.quote}"
              </blockquote>
            </div>
          </div>

          <div className={styles.storySections}>
            <div className={styles.storySection}>
              <h3 className={styles.sectionTitle}>Roots & Exile</h3>
              <p className={styles.storyText}>{copy.founder.story.intro}</p>
            </div>

            <div className={styles.storySection}>
              <h3 className={styles.sectionTitle}>The Journey</h3>
              <p className={styles.storyText}>{copy.founder.story.journey}</p>
            </div>

            <div className={styles.storySection}>
              <h3 className={styles.sectionTitle}>The Mission</h3>
              <p className={styles.storyText}>{copy.founder.story.mission}</p>
            </div>

            <div className={styles.storySection}>
              <h3 className={styles.sectionTitle}>The Philosophy</h3>
              <p className={styles.storyText}>{copy.founder.story.philosophy}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section background="pattern" padding="large">
        <div className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>What Drives Us</h2>
          <div className={styles.valuesGrid}>
            {copy.brand.values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueNumber}>{String(index + 1).padStart(2, '0')}</div>
                <h3 className={styles.valueTitle}>{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section padding="large">
        <div className={styles.ctaSection}>
          <h2 className={styles.sectionTitle}>Ready to Begin Your Journey?</h2>
          <p className={styles.ctaText}>
            Let us help you discover the Africa that captured our hearts and transformed our lives.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/destinations" className={styles.ctaButton}>
              Explore Destinations
            </a>
            <a href="/contact" className={styles.ctaButtonSecondary}>
              Start Planning
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Story;
