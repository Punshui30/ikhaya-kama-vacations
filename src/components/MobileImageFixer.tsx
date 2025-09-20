import { useEffect } from 'react';

// Nuclear approach: Force mobile image fixes via JavaScript
export const MobileImageFixer = () => {
  useEffect(() => {
    // Only run on mobile
    if (window.innerWidth > 768) return;

    const applyFixes = () => {
      // Square images that need contain
      const squareImages = [
        'south-africa',
        'botswana', 
        'morocco',
        'zimbabwe'
      ];

      squareImages.forEach(slug => {
        const postcards = document.querySelectorAll(`[data-slug="${slug}"] img`);
        postcards.forEach((img: Element) => {
          const htmlImg = img as HTMLImageElement;
          htmlImg.style.objectFit = 'contain';
          htmlImg.style.objectPosition = 'center center';
          htmlImg.style.backgroundColor = '#2a2a2a';
          // Force the style to stick
          htmlImg.setAttribute('style', 'object-fit: contain !important; object-position: center center !important; background-color: #2a2a2a !important; width: 100% !important; height: 100% !important; display: block !important;');
        });
      });

      // Rectangular images keep cover
      const rectImages = [
        'kenya',
        'tanzania', 
        'namibia',
        'uganda'
      ];

      rectImages.forEach(slug => {
        const postcards = document.querySelectorAll(`[data-slug="${slug}"] img`);
        postcards.forEach((img: Element) => {
          const htmlImg = img as HTMLImageElement;
          htmlImg.style.objectFit = 'cover';
          htmlImg.style.objectPosition = 'center center';
          // Force the style to stick
          htmlImg.setAttribute('style', 'object-fit: cover !important; object-position: center center !important; width: 100% !important; height: 100% !important; display: block !important;');
        });
      });
    };

    // Apply immediately
    applyFixes();

    // Apply after images load
    setTimeout(applyFixes, 100);
    setTimeout(applyFixes, 500);
    setTimeout(applyFixes, 1000);

    // Apply on resize
    window.addEventListener('resize', applyFixes);

    // Observe DOM changes
    const observer = new MutationObserver(applyFixes);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => {
      window.removeEventListener('resize', applyFixes);
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};
