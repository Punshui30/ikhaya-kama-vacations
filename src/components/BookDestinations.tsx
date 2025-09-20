import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import destinations from '../content/destinations.json';
import styles from './BookDestinations.module.scss';

const BookDestinations: React.FC = () => {
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const navigate = useNavigate();

  // No more mobile image fixes needed - using properly sized images now

  // Portrait tiles that need top-focused cropping for country names
  const portraitTiles = new Set(['south-africa', 'botswana', 'morocco', 'zimbabwe']);
  
  // Specific positioning for each portrait tile
  const tilePositions: Record<string, string> = {
    'south-africa': 'center 8%',
    'botswana': 'center 10%', 
    'morocco': 'center 12%',
    'zimbabwe': 'center 9%'
  };

  const handleDestinationClick = (index: number) => {
    if (isTurning) return;
    
    const destination = destinations[index];
    
    setIsTurning(true);
    
    setTimeout(() => {
      setIsTurning(false); 
      navigate(`/destinations/${destination.slug}`);
    }, 800);
  };

  return (
    <section className={styles.destinationsRail}>
      <div className={styles.carouselViewport}>
        <div className={styles.carouselTrack}>
          {destinations.map((destination, index) => {
            const isPortrait = portraitTiles.has(destination.slug);
            const boringTiles = ['zimbabwe', 'morocco', 'botswana', 'south-africa'];
            const isBoring = boringTiles.includes(destination.slug);
            
            const objectPosition = isPortrait 
              ? tilePositions[destination.slug] || 'center 10%'
              : 'center center';

            return (
            <article className={styles.carouselItem} key={destination.slug}>
              <motion.a
                className={`${styles.postcard} ${isTurning ? styles.turning : ''}`}
                data-slug={destination.slug}
                data-mode={isBoring ? "boring" : undefined}
                href={`/destinations/${destination.slug}`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  sessionStorage.setItem('destHero', destination.poster);
                  handleDestinationClick(index);
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.postcardInner}>
                  <img
                    src={destination.poster}
                    alt={destination.title}
                    style={isBoring ? {
                      objectFit: 'contain',
                      objectPosition: 'center'
                    } : { 
                      objectPosition: objectPosition
                    }}
                  />
                </div>
              </motion.a>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookDestinations;