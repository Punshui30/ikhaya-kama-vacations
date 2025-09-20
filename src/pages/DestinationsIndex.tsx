import React from 'react';
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
    { title: "Namibia", image: "/images/Namibia.png", href: "/destinations/namibia" },
    { title: "Botswana", image: "/images/Botswana.png", href: "/destinations/botswana" },
    { title: "Morocco", image: "/images/Morocco.png", href: "/destinations/morocco" },
    { title: "Zimbabwe", image: "/images/Zimbabwe.png", href: "/destinations/zimbabwe" },
    { title: "Uganda", image: "/images/Uganda.png", href: "/destinations/uganda" },
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
    </div>
  );
};

export default DestinationsIndex;
