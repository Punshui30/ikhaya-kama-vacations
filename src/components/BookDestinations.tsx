import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import destinations from '../content/destinations.json';
import styles from './BookDestinations.module.scss';

const BookDestinations: React.FC = () => {
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const [hoveredPage, setHoveredPage] = useState<number | null>(null);
  const navigate = useNavigate();


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
    <div className={styles.bookContainer}>
      <div className={styles.book}>
        <div className={styles.pages}>
          {destinations.map((destination, index) => {
            return (
            <motion.div
              key={destination.slug}
              className={`${styles.page} ${isTurning ? styles.turning : ''}`}
              onClick={() => handleDestinationClick(index)}
              onHoverStart={() => setHoveredPage(index)}
              onHoverEnd={() => setHoveredPage(null)}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ 
                opacity: 1, 
                scale: hoveredPage === index ? 1.05 : 1,
                rotateY: 0,
                y: hoveredPage === index ? -10 : 0,
                z: hoveredPage === index ? 20 : 0
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.08,
                y: -15,
                z: 30,
                rotateY: 5
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                cursor: 'pointer'
              }}
            >
              <div className={styles.pageContent}>
                <div className={styles.pageImage}>
                  <img 
                    src={destination.poster} 
                    alt={destination.title}
                    onError={(e) => {
                      // Fallback to black tile if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add(styles.blackTile);
                        parent.innerHTML = `
                          <div class="${styles.tileText}">
                            <h3>${destination.title}</h3>
                            <p>${destination.tagline}</p>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className={styles.pageOverlay}>
                    <div className={styles.pageTitle}>{destination.title}</div>
                    <div className={styles.pageTagline}>{destination.tagline}</div>
                    <div className={styles.clickHint}>Click to explore</div>
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookDestinations;