import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import destinations from '../content/destinations.json';
import styles from './BookDestinations.module.scss';

const BookDestinations: React.FC = () => {
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);

  // NUCLEAR APPROACH: Force mobile image fixes with MutationObserver
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth > 768) return;
    
    const squareImages = ['south-africa', 'botswana', 'morocco', 'zimbabwe'];
    
    const forceImageFixes = () => {
      squareImages.forEach(slug => {
        const images = document.querySelectorAll(`[data-slug="${slug}"] img`);
        images.forEach((img: Element) => {
          const htmlImg = img as HTMLImageElement;
          
          // NUCLEAR: Remove all existing styles and classes that might interfere
          htmlImg.removeAttribute('style');
          htmlImg.removeAttribute('class');
          
          // Force styles with setAttribute (highest specificity)
          htmlImg.setAttribute('style', `
            object-fit: contain !important;
            object-position: center center !important;
            background-color: #2a2a2a !important;
            width: 100% !important;
            height: 100% !important;
            display: block !important;
          `);
          
          // Also set via style properties as backup
          htmlImg.style.setProperty('object-fit', 'contain', 'important');
          htmlImg.style.setProperty('object-position', 'center center', 'important');
          htmlImg.style.setProperty('background-color', '#2a2a2a', 'important');
        });
      });
    };

    // Apply immediately
    forceImageFixes();
    
    // Apply with multiple delays
    [50, 100, 200, 500, 1000, 2000].forEach(delay => {
      setTimeout(forceImageFixes, delay);
    });

    // NUCLEAR: Watch for ANY changes to the DOM and reapply fixes
    const observer = new MutationObserver(() => {
      forceImageFixes();
    });
    
    // Observe everything
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
      characterData: true
    });

    // Also watch for resize
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTimeout(forceImageFixes, 10);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <section ref={containerRef} className={styles.destinationsRail}>
      <div className={styles.carouselViewport}>
        <div className={styles.carouselTrack}>
          {destinations.map((destination, index) => {
            const isPortrait = portraitTiles.has(destination.slug);
            
            // Mobile fixes for square images (1024x1024)
            const squareImages = ['south-africa', 'botswana', 'morocco', 'zimbabwe'];
            const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
            const isSquareImage = squareImages.includes(destination.slug);
            
            const objectPosition = isPortrait 
              ? tilePositions[destination.slug] || 'center 10%'
              : 'center center';

            return (
            <article className={styles.carouselItem} key={destination.slug}>
              <motion.a
                className={`${styles.postcard} ${isTurning ? styles.turning : ''}`}
                data-slug={destination.slug}
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
                    style={{ 
                      // Mobile fixes applied via inline styles (highest specificity)
                      ...(isMobile && isSquareImage ? {
                        objectFit: 'contain',
                        objectPosition: 'center center',
                        backgroundColor: '#2a2a2a'
                      } : {
                        objectFit: 'cover',
                        objectPosition: objectPosition
                      })
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add('blackTile');
                        parent.innerHTML = `
                          <div class="${styles.tileText}">
                            <h3>${destination.title}</h3>
                            <p>${destination.tagline}</p>
                          </div>
                        `;
                      }
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