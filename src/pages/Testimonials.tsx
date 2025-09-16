import React from 'react';
import Section from '../components/Section';
import styles from './Testimonials.module.scss';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah & Michael Johnson",
      location: "New York, USA",
      trip: "Kenya Safari & Zanzibar",
      quote: "Ikhaya KaMa didn't just plan our trip—they opened our hearts to Africa. Every moment was perfectly orchestrated, from the Maasai Mara to the beaches of Zanzibar. We came home transformed.",
      rating: 5,
      image: "/images/testimonials/sarah-michael.jpg"
    },
    {
      id: 2,
      name: "David Chen",
      location: "Toronto, Canada",
      trip: "South Africa Adventure",
      quote: "The attention to detail was incredible. Kgomotso understood exactly what we wanted and delivered beyond our expectations. Cape Town, the Garden Route, and Kruger were all magical.",
      rating: 5,
      image: "/images/testimonials/david.jpg"
    },
    {
      id: 3,
      name: "The Williams Family",
      location: "London, UK",
      trip: "Family Heritage Journey",
      quote: "Our children learned so much about their African roots. The cultural experiences were authentic and meaningful. This trip brought our family closer together in ways we never imagined.",
      rating: 5,
      image: "/images/testimonials/williams-family.jpg"
    },
    {
      id: 4,
      name: "Emma & James",
      location: "Sydney, Australia",
      trip: "Honeymoon in Tanzania",
      quote: "Our honeymoon was absolutely perfect. From the Serengeti to the beaches of Zanzibar, every detail was thoughtfully planned. We felt like royalty throughout our entire journey.",
      rating: 5,
      image: "/images/testimonials/emma-james.jpg"
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      location: "Barcelona, Spain",
      trip: "Morocco Cultural Tour",
      quote: "The cultural immersion was incredible. We didn't just visit Morocco—we lived it. The local guides, the food, the people, everything was authentic and beautiful.",
      rating: 5,
      image: "/images/testimonials/maria.jpg"
    },
    {
      id: 6,
      name: "Robert & Linda",
      location: "Vancouver, Canada",
      trip: "Botswana Safari",
      quote: "The Okavango Delta was like nothing we've ever experienced. The mokoro rides, the wildlife, the luxury camps—everything was perfect. We're already planning our next trip with Ikhaya KaMa.",
      rating: 5,
      image: "/images/testimonials/robert-linda.jpg"
    }
  ];

  return (
    <div className={styles.testimonials}>
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>What Our Travelers Say</h1>
          <p className={styles.heroSubtitle}>
            Don't just take our word for it—hear from the amazing people who have experienced Africa with us.
          </p>
        </div>
      </Section>

      <Section padding="large">
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.testimonialImage}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                  />
                </div>
                <div className={styles.testimonialInfo}>
                  <h3 className={styles.testimonialName}>{testimonial.name}</h3>
                  <p className={styles.testimonialLocation}>{testimonial.location}</p>
                  <p className={styles.testimonialTrip}>{testimonial.trip}</p>
                </div>
              </div>
              <blockquote className={styles.testimonialQuote}>
                "{testimonial.quote}"
              </blockquote>
              <div className={styles.testimonialRating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="pattern" padding="large">
        <div className={styles.ctaSection}>
          <h2 className={styles.sectionTitle}>Ready to Create Your Own Story?</h2>
          <p className={styles.ctaText}>
            Join the hundreds of travelers who have discovered the magic of Africa with Ikhaya KaMa Vacations.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className={styles.ctaButton}>
              Start Planning
            </a>
            <a href="/destinations" className={styles.ctaButtonSecondary}>
              Explore Destinations
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Testimonials;
