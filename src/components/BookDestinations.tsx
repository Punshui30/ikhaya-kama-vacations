import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import destinations from '../content/destinations.json';
import './BookDestinations.module.scss';

const BookDestinations: React.FC = () => {
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const navigate = useNavigate();

  // Only these four need top-focused cropping to keep country names visible
  const TOP_LABEL_FIX = new Set(['south-africa', 'botswana', 'morocco', 'zimbabwe']);

  // Per-image fine-tune for focal positioning
  const FOCAL_Y: Record<string, string> = {
    'south-africa': '8%',
    'botswana': '10%',
    'morocco': '7%',
    'zimbabwe': '11%',
  };

  // Snap carousel into view on mount and resize
  useEffect(() => {
    const snapCarouselIntoView = (viewport: HTMLElement | null) => {
      if (!viewport) return;
      const firstItem = viewport.querySelector<HTMLElement>('.carousel-item');
      if (!firstItem) return;
      const left = firstItem.offsetLeft - 16; // match scroll-padding
      viewport.scrollTo({ left, behavior: 'instant' as ScrollBehavior });
    };

    const vp = document.querySelector<HTMLElement>('.carousel-viewport');
    snapCarouselIntoView(vp);
    
    const onResize = () => snapCarouselIntoView(vp);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
    <section className="destinations-rail">
      <div className="carousel-viewport">
        <div className="carousel-track">
          {destinations.map((destination, index) => {
            const needsFix = TOP_LABEL_FIX.has(destination.slug);
            const focalY = FOCAL_Y[destination.slug];

            return (
            <article 
              className={`carousel-item ${needsFix ? 'fix-top' : ''}`} 
              key={destination.slug}
              style={needsFix && focalY ? ({ ['--focal-y' as any]: focalY } as React.CSSProperties) : undefined}
            >
              <motion.a
                className={`postcard ${isTurning ? 'turning' : ''}`}
                href={`/destinations/${destination.slug}`}
                data-hero={destination.poster}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  // Store hero image for detail page
                  sessionStorage.setItem('destHero', destination.poster);
                  handleDestinationClick(index);
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1
                }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="postcard__inner" style={{ position: 'relative' }}>
                  <img
                    src={destination.poster}
                    alt={destination.title}
                    // keep more of the top so the country title stays in frame
                    style={{ display:'block', width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }}
                    onError={(e) => {
                      // Fallback to black tile if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add('blackTile');
                        parent.innerHTML = `
                          <div class="tileText">
                            <h3>${destination.title}</h3>
                            <p>${destination.tagline}</p>
                          </div>
                        `;
                      }
                    }}
                  />

                  <motion.img
                    src="/img/ui/ikhaya-stamp.svg"
                    alt="Ikhaya KaMa stamp"
                    // 🔥 inline positioning so no CSS reset can break it
                    style={{
                      position:'absolute', right:12, bottom:12, width:84, height:'auto',
                      pointerEvents:'none', filter:'drop-shadow(0 2px 4px rgba(0,0,0,.3))', zIndex:2
                    }}
                    initial={{ opacity: 0, rotate: -12, scale: 0.82 }}
                    whileHover={{ opacity: 0.95, rotate: -6, scale: 1 }}
                    transition={{ type:'tween', duration:0.25, ease:'easeOut' }}
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