import React from 'react';
import { Link } from 'react-router-dom';
import HeadTags from '../components/HeadTags';
import styles from './Services.module.scss';

const Services: React.FC = () => {
  const services = [
    {
      id: 'solo-adventures',
      title: 'Solo Adventures',
      description: 'Discover Africa on your own terms with carefully curated experiences designed for the independent traveler.',
      features: ['Personalized itineraries', 'Safety-first approach', 'Cultural immersion', 'Flexible scheduling']
    },
    {
      id: 'family-trips',
      title: 'Family Journeys',
      description: 'Create lasting memories with experiences that captivate every generation.',
      features: ['Age-appropriate activities', 'Educational experiences', 'Comfortable accommodations', 'Family-friendly guides']
    },
    {
      id: 'group-travel',
      title: 'Group Expeditions',
      description: 'Share the adventure with friends, colleagues, or fellow travelers in carefully planned group experiences.',
      features: ['Group discounts', 'Shared experiences', 'Expert group leaders', 'Custom group activities']
    },
    {
      id: 'honeymoons',
      title: 'Romantic Escapes',
      description: 'Celebrate your love with intimate, romantic experiences in Africa\'s most breathtaking locations.',
      features: ['Private accommodations', 'Romantic dining experiences', 'Couples\' activities', 'Special occasion planning']
    },
    {
      id: 'heritage-tours',
      title: 'Heritage Journeys',
      description: 'Connect with your roots through meaningful cultural experiences and ancestral discovery.',
      features: ['Cultural immersion', 'Historical sites', 'Local communities', 'Ancestral connections']
    },
    {
      id: 'luxury-safaris',
      title: 'Luxury Safaris',
      description: 'Experience Africa\'s wildlife in unparalleled comfort with our premium safari packages.',
      features: ['Exclusive lodges', 'Private game drives', 'Expert guides', 'All-inclusive luxury']
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discover',
      description: 'We start with a conversation to understand your dreams, interests, and what you hope to experience in Africa.'
    },
    {
      number: '02',
      title: 'Design',
      description: 'We craft a personalized itinerary balancing must-see highlights with hidden gems and authentic experiences.'
    },
    {
      number: '03',
      title: 'Go',
      description: 'From booking to departure, we handle every detail so you can focus on the adventure ahead.'
    }
  ];

  return (
    <div className={styles.services}>
      <HeadTags 
        seo={{
          title: "Our Services - Custom African Travel Experiences | Ikhaya KaMa Vacations",
          description: "Discover our custom African travel services. From luxury safaris to honeymoon packages, group trips, and solo adventures - every journey crafted with intention.",
          path: "/services",
          ogImage: "/og/services.jpg",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Our Services", path: "/services" }
          ]
        }}
      />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Tailored Travel, Crafted for You</h1>
          <p>Every journey is a story waiting to be written. We craft bespoke African experiences that connect you with the soul of the continent.</p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <article key={service.id} className={styles.serviceCard}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Link className={styles.btn} to="/contact">Learn More</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <h2>How We Work</h2>
          <div className={styles.processSteps}>
            {processSteps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;