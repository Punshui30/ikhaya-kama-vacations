import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section';
import TravelPrepPanel from '../components/TravelPrepPanel';
import HeadTags from '../components/HeadTags';
import destinations from '../content/destinations.json';
import styles from './DestinationDetail.module.scss';

// Custom hook for carousel
function useCarousel(count: number, ms = 4000) {
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);
  
  useEffect(() => {
    const start = () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = window.setInterval(() => setI(v => (v + 1) % count), ms);
    };
    const stop = () => {
      if (timer.current) clearInterval(timer.current);
    };
    
    start();
    return stop;
  }, [count, ms]);
  
  return [i, setI] as const;
}

const DestinationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinations.find(d => d.slug === slug);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  // Carousel setup
  const heroImages = (destination as any)?.heroImages?.slice(0, 3) ?? [(destination as any)?.detailImage || destination?.poster];
  const [activeImage, setActiveImage] = useCarousel(heroImages.length, 4000);
  
  // Swipe handling
  const x0 = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent | React.TouchEvent) => {
    x0.current = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX ?? null;
  };
  const onPointerUp = (e: React.PointerEvent | React.TouchEvent) => {
    if (x0.current == null) return;
    const x1 = 'clientX' in e ? e.clientX : e.changedTouches?.[0]?.clientX ?? 0;
    const dx = x1 - x0.current;
    if (Math.abs(dx) > 40) {
      setActiveImage((activeImage + (dx < 0 ? 1 : heroImages.length - 1)) % heroImages.length);
    }
    x0.current = null;
  };

  // Determine theme based on destination
  const getDestinationTheme = (slug: string) => {
    const coastalDestinations = ['kenya', 'south-africa'];
    const safariDestinations = ['tanzania', 'namibia', 'botswana', 'uganda', 'zimbabwe', 'morocco'];
    
    if (coastalDestinations.includes(slug)) return 'theme-coast';
    if (safariDestinations.includes(slug)) return 'theme-safari';
    return 'theme-luxe';
  };

  const theme = destination ? getDestinationTheme(destination.slug) : 'theme-safari';
  
  // Debug: log destination data
  console.log('Destination data:', { slug, destination, theme });
  
  // Removed hero positioning - using natural image sizing now

  // Music is now click-to-play only
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [destination?.music]);



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

  // Add body class for page backdrop and set pattern URL
  useEffect(() => {
    document.body.className = `dest-${destination.slug}`;
    document.body.setAttribute('data-dest', destination.slug);
    
    // Set pattern URL per destination - simplified for top strip only
    const patternUrls: Record<string, string> = {
      'south-africa': 'url("/images/SouthAfrica_background.png")',
      'kenya': 'url("/images/Kenya_background.jpg")',
      'tanzania': 'url("/images/Tanzania_background.jpg")',
      'namibia': 'url("/images/Namibia_background.jpg")',
      'botswana': 'url("/images/Botswana_background.jpg")',
      'morocco': 'url("/images/Morocco_background.jpg")',
      'zimbabwe': 'url("/images/Zimbabwe_background.jpg")',
      'uganda': 'url("/images/Uganda_background.jpg")'
    };
    
    const patternUrl = patternUrls[destination.slug];
    if (patternUrl) {
      document.documentElement.style.setProperty('--pattern-url', patternUrl);
      document.documentElement.style.setProperty('--pattern-width', '1800px');
      document.documentElement.style.setProperty('--top-bar-height', '170px');
    }
    
    return () => {
      document.body.className = '';
      document.body.removeAttribute('data-dest');
      document.documentElement.style.removeProperty('--pattern-url');
      document.documentElement.style.removeProperty('--pattern-width');
      document.documentElement.style.removeProperty('--top-bar-height');
    };
  }, [destination.slug]);

  return (
    <main 
      className={`destination-page ${theme} dest-${destination.slug}`}
    >
      <HeadTags 
        seo={{
          title: `${destination.title} - African Safari Destination | Ikhaya KaMa Vacations`,
          description: destination.description || `Discover ${destination.title} with Ikhaya KaMa Vacations. Experience authentic African travel and luxury safari adventures.`,
          path: `/destinations/${destination.slug}`,
          ogImage: `/og/${destination.slug}.jpg`,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
            { name: destination.title, path: `/destinations/${destination.slug}` }
          ]
        }}
      />
      
      <section className={`hero hero--${destination.slug}`}>
        <div className="container">
          <div className="hero-grid">
            <figure className="media-card">
              <div 
                className="card-carousel" 
                aria-roledescription="carousel"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onTouchStart={onPointerDown}
                onTouchEnd={onPointerUp}
              >
                {heroImages.map((src: string, i: number) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${destination.title} photo ${i + 1}`}
                    className={`hero-photo ${i === activeImage ? 'is-active' : ''}`}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ))}
                <div className="card-dots" role="tablist" aria-label="Hero images">
                  {heroImages.map((_: string, i: number) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === activeImage}
                      aria-label={`Go to image ${i + 1}`}
                      className={`dot ${i === activeImage ? 'on' : ''}`}
                      onClick={() => setActiveImage(i)}
                    />
                  ))}
                </div>
              </div>
            </figure>
            <div className="copy">
              <h1>{destination.title}</h1>
              <p className="tagline">{destination.tagline}</p>
              
              {/* Description */}
              {destination.description && (
                <p className="description">{destination.description}</p>
              )}
              
              {/* Quick Highlights */}
              {destination.highlights && destination.highlights.length > 0 && (
                <div className="quick-highlights">
                  <h3>Experience Highlights:</h3>
                  <ul>
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Best Time */}
              {destination.bestTime && destination.bestTime.length > 0 && (
                <div className="best-time">
                  <h3>Best Time to Visit:</h3>
                  <ul>
                    {destination.bestTime.map((time, index) => (
                      <li key={index}>{time}</li>
                    ))}
                  </ul>
                </div>
              )}
              
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
            </div>
          </div>
        </div>
      </section>

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
      
      {/* Hero persistence script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function(){
            const stored = sessionStorage.getItem('destHero');
            if (stored) {
              document.querySelectorAll('.destination-page')
                .forEach(el => el.style.setProperty('--hero-img', \`url('\${stored}')\`));
            }
          })();
        `
      }} />
    </main>
  );
};

export default DestinationDetail;
