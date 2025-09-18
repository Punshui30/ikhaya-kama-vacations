import React from 'react';
import Section from '../components/Section';
import HeadTags from '../components/HeadTags';
import HeroVideo from '../components/HeroVideo';
import DestinationsRail from '../components/DestinationsRail';
import '../styles/destination-textiles.css';
import styles from './DestinationsIndex.module.scss';

const DestinationsIndex: React.FC = () => {
  const cards = [
    { title: "South Africa", image: "/images/SouthAfrica.png", href: "/destinations/south-africa" },
    { title: "Kenya", image: "/images/Kenya.png", href: "/destinations/kenya" },
    { title: "Tanzania", image: "/images/Tanzania.png", href: "/destinations/tanzania" },
    { title: "Namibia", image: "/img/destinations/namibia/hero.jpg", href: "/destinations/namibia" },
    { title: "Botswana", image: "/img/destinations/botswana/hero.jpg", href: "/destinations/botswana" },
    { title: "Morocco", image: "/img/destinations/morocco/hero.jpg", href: "/destinations/morocco" },
    { title: "Zimbabwe", image: "/img/destinations/zimbabwe/hero.jpg", href: "/destinations/zimbabwe" },
    { title: "Uganda", image: "/img/destinations/uganda/hero.jpg", href: "/destinations/uganda" },
  ];

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
      
      <HeroVideo theme="luxury" />
      <DestinationsRail cards={cards} />
      
      <Section background="default" padding="large">
        <div id="destinations" className={styles.destinationsSection}>
          {/* Additional content can go here */}
        </div>
      </Section>
    </div>
  );
};

export default DestinationsIndex;
