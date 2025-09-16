import React from 'react';
import Section from '../components/Section';
import TravelPrepPanel from '../components/TravelPrepPanel';
import HeadTags from '../components/HeadTags';
import styles from './TravelPrep.module.scss';

const TravelPrep: React.FC = () => {
  return (
    <div className={`${styles.travelPrep} page-travel-prep`}>
      <HeadTags 
        seo={{
          title: "Travel Prep Hub | Ikhaya KaMa Vacations",
          description: "Essential travel preparation information for your African adventure. Get visa requirements, packing lists, health advice, and cultural tips for each destination.",
          path: "/travel-prep",
          ogImage: "/og/travel-prep.jpg",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Travel Prep", path: "/travel-prep" }
          ]
        }}
      />
      
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Travel Prep Hub</h1>
          <p className={styles.heroSubtitle}>
            Everything you need to know before your African adventure. From visa requirements to cultural etiquette, 
            we've got you covered for a seamless journey.
          </p>
        </div>
      </Section>

      <Section background="default" padding="large">
        <div className={styles.content}>
          <TravelPrepPanel />
        </div>
      </Section>
    </div>
  );
};

export default TravelPrep;

