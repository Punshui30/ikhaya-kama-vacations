import React from 'react';
import Section from '../components/Section';
import BackgroundVideoHero from '../components/BackgroundVideoHero';
import BookDestinations from '../components/BookDestinations';
import HeadTags from '../components/HeadTags';
import styles from './DestinationsIndex.module.scss';

const DestinationsIndex: React.FC = () => {

  return (
    <div className={`${styles.destinations} page-destinations`}>
      <HeadTags 
        seo={{
          title: "African Safari Destinations - South Africa, Kenya, Tanzania, Namibia | Ikhaya KaMa",
          description: "Explore the best African safari destinations with Ikhaya KaMa Vacations. From South Africa's Kruger National Park to Kenya's Maasai Mara, Tanzania's Serengeti, and Namibia's desert landscapes.",
          path: "/destinations",
          ogImage: "/og/destinations.jpg",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" }
          ]
        }}
      />
      <BackgroundVideoHero
        videoSrc="https://i.imgur.com/ylqL8RT.mp4"
        posterSrc="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&crop=center"
        title="Discover Africa"
        subtitle="Turn the pages of our travel book and discover the stories of Africa's most captivating destinations."
        ctaText="Open the Book"
        ctaLink="#destinations"
      />
      
      <Section background="default" padding="large">
        <div id="destinations" className={styles.destinationsSection}>
          <BookDestinations />
        </div>
      </Section>
    </div>
  );
};

export default DestinationsIndex;
