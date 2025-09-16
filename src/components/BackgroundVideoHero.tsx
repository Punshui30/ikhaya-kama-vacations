import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BackgroundVideoHero.module.scss';

interface BackgroundVideoHeroProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  overlayOpacity?: number;
}

const BackgroundVideoHero: React.FC<BackgroundVideoHeroProps> = ({
  videoSrc,
  posterSrc,
  title,
  subtitle,
  ctaText,
  ctaLink,
  overlayOpacity = 0.4
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoCanPlay = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    // Silently handle video errors to prevent console spam
  };

  const handleVideoPlay = () => {
    // Simple video play handler
  };

  return (
    <section className={styles.hero}>
      <div className={styles.videoContainer}>
        {videoSrc ? (
          <video
            className={`${styles.video} ${isVideoLoaded ? styles.loaded : ''}`}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            onLoadedData={handleVideoLoadedData}
            onCanPlay={handleVideoCanPlay}
            onError={handleVideoError}
            onPlay={handleVideoPlay}
            webkit-playsinline="true"
            x5-playsinline="true"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div 
            className={styles.posterImage}
            data-bg-image={posterSrc}
          />
        )}
        
        <div 
          className={`${styles.overlay} ${overlayOpacity === 0.2 ? styles.opacity20 : overlayOpacity === 0.3 ? styles.opacity30 : overlayOpacity === 0.5 ? styles.opacity50 : overlayOpacity === 0.6 ? styles.opacity60 : ''}`}
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {ctaLink.startsWith('#') ? (
            <a 
              href={ctaLink} 
              className={styles.cta}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(ctaLink);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {ctaText}
            </a>
          ) : (
            <Link to={ctaLink} className={styles.cta}>
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default BackgroundVideoHero;
