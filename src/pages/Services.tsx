import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import HeadTags from '../components/HeadTags';
import styles from './Services.module.scss';

const Services: React.FC = () => {
  const services = [
    {
      id: 'solo-adventures',
      title: 'Solo Adventures',
      description: 'Discover Africa on your own terms with carefully curated experiences designed for the independent traveler.',
      icon: '🧭',
      features: ['Personalized itineraries', 'Safety-first approach', 'Cultural immersion', 'Flexible scheduling']
    },
    {
      id: 'family-trips',
      title: 'Family Journeys',
      description: 'Create lasting memories with experiences that captivate every generation, from children to grandparents.',
      icon: '👨‍👩‍👧‍👦',
      features: ['Age-appropriate activities', 'Educational experiences', 'Comfortable accommodations', 'Family-friendly guides']
    },
    {
      id: 'group-travel',
      title: 'Group Expeditions',
      description: 'Share the adventure with friends, colleagues, or fellow travelers in carefully planned group experiences.',
      icon: '👥',
      features: ['Group discounts', 'Shared experiences', 'Expert group leaders', 'Custom group activities']
    },
    {
      id: 'honeymoons',
      title: 'Romantic Escapes',
      description: 'Celebrate your love with intimate, romantic experiences in Africa\'s most breathtaking locations.',
      icon: '💕',
      features: ['Private accommodations', 'Romantic dining', 'Couples activities', 'Special celebrations']
    },
    {
      id: 'heritage-tours',
      title: 'Heritage Journeys',
      description: 'Connect with your roots through meaningful cultural experiences and ancestral discovery.',
      icon: '🌍',
      features: ['Cultural immersion', 'Historical sites', 'Local communities', 'Ancestral connections']
    },
    {
      id: 'luxury-safaris',
      title: 'Luxury Safaris',
      description: 'Experience Africa\'s wildlife in unparalleled comfort with our premium safari packages.',
      icon: '🦁',
      features: ['Exclusive lodges', 'Private game drives', 'Expert guides', 'All-inclusive luxury']
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery Call',
      description: 'We start with a conversation to understand your dreams, interests, and what you hope to experience in Africa.'
    },
    {
      number: '02',
      title: 'Custom Design',
      description: 'We craft a personalized itinerary that balances must-see highlights with hidden gems and authentic experiences.'
    },
    {
      number: '03',
      title: 'Seamless Journey',
      description: 'From booking to departure, we handle every detail so you can focus on the adventure ahead.'
    },
    {
      number: '04',
      title: 'Lasting Memories',
      description: 'We ensure your journey exceeds expectations and creates memories that will last a lifetime.'
    }
  ];

  return (
    <div className={`${styles.services} page-services`}>
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
      
      {/* Hero Section */}
      <Section background="default" padding="large" className={styles.heroSection}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Tailored Travel, Crafted for You</h1>
          <p className={styles.heroSubtitle}>
            Every journey is a story waiting to be written. We craft bespoke African experiences that connect you with the soul of the continent.
          </p>
        </div>
      </Section>

      {/* Services Grid */}
      <Section padding="large" className={styles.servicesSection}>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                {service.icon}
              </div>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, index) => (
                    <li key={index} className={styles.feature}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.serviceCta}>
                <Link to="/contact" className={styles.learnMoreBtn}>
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Process Timeline */}
      <Section background="pattern" padding="large" className={styles.processSection}>
        <div className={styles.processContainer}>
          <h2 className={styles.processTitle}>How We Work</h2>
          <div className={styles.processTimeline}>
            {processSteps.map((step, index) => (
              <div key={index} className={styles.processStep}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call to Action */}
      <Section padding="large" className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to Begin Your Journey?</h2>
          <p className={styles.ctaSubtitle}>
            Let's create the African adventure you've always dreamed of. Every journey begins with a single conversation.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.ctaPrimary}>
              Start Your Journey
            </Link>
            <Link to="/planner" className={styles.ctaSecondary}>
              Try Our Planner
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Services;