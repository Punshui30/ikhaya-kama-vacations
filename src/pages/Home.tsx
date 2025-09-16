import React from 'react';
import BackgroundVideoHero from '../components/BackgroundVideoHero';
import HeadTags from '../components/HeadTags';
import { copy } from '../content/copy';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={`${styles.home} page-home`}>
      <HeadTags 
        seo={{
          title: "Ikhaya KaMa Vacations - Authentic African Travel Experiences",
          description: "Discover the authentic beauty of Africa with Ikhaya KaMa Vacations. Custom luxury travel experiences that connect you with the soul of the continent.",
          path: "/",
          ogImage: "/og/default.jpg",
          video: {
            src: "/video/homepagehero.mp4",
            type: "video/mp4",
            width: 1920,
            height: 1080
          }
        }}
      />
      <BackgroundVideoHero
        videoSrc="/video/homepagehero.mp4"
        posterSrc="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop&crop=center"
        title="Ikhaya KaMa Vacations"
        subtitle={copy.tagline}
        ctaText="Explore Destinations"
        ctaLink="/destinations"
      />
    </div>
  );
};

export default Home;
