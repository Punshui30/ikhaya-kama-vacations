import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section';
import TravelPrepPanel from '../components/TravelPrepPanel';
import HeadTags from '../components/HeadTags';
import destinations from '../content/destinations.json';
import styles from './DestinationDetail.module.scss';

const DestinationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinations.find(d => d.slug === slug);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  // Music is now click-to-play only
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [destination?.music]);


  // Handle video play once then stop
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleVideoEnd = () => {
        video.pause();
        video.currentTime = 0;
      };
      
      video.addEventListener('ended', handleVideoEnd);
      
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsMusicPlaying(true);
      }
    }
  };

  if (!destination) {
    return (
      <div className={styles.destination}>
        <Section padding="large">
          <div className={styles.notFound}>
            <h1>Destination Not Found</h1>
            <p>The destination you're looking for doesn't exist.</p>
            <Link to="/destinations" className={styles.ctaButton}>
              Back to Destinations
            </Link>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className={`${styles.destination} page-destinations`}>
      <HeadTags 
        seo={{
          title: `${destination.title} - African Safari Destination | Ikhaya KaMa Vacations`,
          description: destination.description || `Discover ${destination.title} with Ikhaya KaMa Vacations. Experience authentic African travel and luxury safari adventures.`,
          path: `/destinations/${destination.slug}`,
          ogImage: `/og/${destination.slug}.jpg`,
          video: destination.video ? {
            src: destination.video,
            type: "video/mp4",
            width: 1920,
            height: 1080
          } : undefined,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            { name: destination.title, path: `/destinations/${destination.slug}` }
          ]
        }}
      />
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <div className={styles.heroImage}>
            {destination.video ? (
              <video
                ref={videoRef}
                src={destination.video}
                autoPlay
                muted
                playsInline
                controls={false}
                className={`${styles.heroVideo} ${styles.noOutline}`}
                webkit-playsinline="true"
                x5-playsinline="true"
                preload="auto"
              />
            ) : (
              <img
                src={destination.detailImage || destination.poster}
                alt={destination.title}
                loading="lazy"
                decoding="async"
                width="1920"
                height="1080"
              />
            )}
            <div className={styles.heroOverlay}></div>
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{destination.title}</h1>
            <p className={styles.heroTagline}>{destination.tagline}</p>
            <p className={styles.heroDescription}>{destination.description}</p>
            
            {/* Music Control Button */}
            {destination.music && (
              <button 
                className={styles.musicButton}
                onClick={toggleMusic}
                aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
              >
                {isMusicPlaying ? '⏸️ Pause Music' : '▶️ Play Music'}
              </button>
            )}
            
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{destination.highlights.length}</span>
                <span className={styles.statLabel}>Must-See Places</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{destination.sampleItinerary.length}</span>
                <span className={styles.statLabel}>Day Itinerary</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{destination.bestTime.length}</span>
                <span className={styles.statLabel}>Best Seasons</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="dark" padding="large">
        <div className={styles.content}>
          <div className={styles.highlightsSection}>
            <h2 className={styles.sectionTitle}>Must-See Highlights</h2>
            <p className={styles.sectionSubtitle}>Discover the iconic places that make {destination.title} unforgettable</p>
            <div className={styles.highlightsGrid}>
              {destination.highlights.map((highlight, index) => (
                <div key={index} className={styles.highlightCard}>
                  <div className={styles.highlightNumber}>{String(index + 1).padStart(2, '0')}</div>
                  <div className={styles.highlightContent}>
                    <h3 className={styles.highlightTitle}>{highlight}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.timingSection}>
            <h2 className={styles.sectionTitle}>Best Time to Visit</h2>
            <p className={styles.sectionSubtitle}>Plan your perfect timing for the ultimate {destination.title} experience</p>
            <div className={styles.timingGrid}>
              {destination.bestTime.map((time, index) => (
                <div key={index} className={styles.timeCard}>
                  <div className={styles.timeIcon}>
                    {index === 0 && '☀'}
                    {index === 1 && '⛅'}
                    {index === 2 && '🌧'}
                  </div>
                  <p className={styles.timeText}>{time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.itinerarySection}>
            <h2 className={styles.sectionTitle}>Sample Itinerary</h2>
            <p className={styles.sectionSubtitle}>Follow this {destination.sampleItinerary.length}-day journey through {destination.title}</p>
            <div className={styles.itineraryList}>
              {destination.sampleItinerary.map((day, index) => (
                <div key={index} className={styles.itineraryDay}>
                  <div className={styles.dayNumber}>{index + 1}</div>
                  <div className={styles.dayContent}>
                    <h3 className={styles.dayTitle}>Day {index + 1}</h3>
                    <p className={styles.dayDescription}>{day}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section background="dark" padding="large">
        <div className={styles.travelPrepSection}>
          <h2 className={styles.sectionTitle}>Practical Travel Prep</h2>
          <TravelPrepPanel destinationSlug={slug} />
        </div>
      </Section>

      <Section background="dark" padding="large">
        <div className={styles.ctaSection}>
          <h2 className={styles.sectionTitle}>Ready to Experience {destination.title}?</h2>
          <p className={styles.ctaText}>
            Let us create a custom itinerary that brings this destination to life for you. 
            Your African adventure awaits!
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/planner" className={styles.ctaButton}>
              Plan Your Trip
            </Link>
            <Link to="/contact" className={styles.ctaButtonSecondary}>
              Get Custom Quote
            </Link>
          </div>
          <div className={styles.musicNote}>
            Don't forget to enjoy the authentic {destination.title} soundtrack while planning!
          </div>
        </div>
      </Section>

      {/* Hidden audio element for background music */}
      {destination.music && (
        <audio
          ref={audioRef}
          src={destination.music}
          loop
          preload="auto"
          className={styles.hiddenAudio}
        />
      )}
    </div>
  );
};

export default DestinationDetail;
