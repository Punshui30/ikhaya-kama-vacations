import React, { useEffect } from 'react';

// Diagnostic component to capture computed styles at runtime
export const TileDiagnostics: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth > 768) return;
    
    const affectedTiles = ['zimbabwe', 'morocco', 'botswana', 'south-africa'];
    
    const captureComputedStyles = (moment: string) => {
      console.log(`\n=== TILE DIAGNOSTICS - ${moment.toUpperCase()} ===`);
      
      affectedTiles.forEach(slug => {
        const tile = document.querySelector(`[data-slug="${slug}"] img`) as HTMLImageElement;
        if (!tile) {
          console.log(`❌ ${slug}: Tile not found`);
          return;
        }
        
        const computed = window.getComputedStyle(tile);
        const rect = tile.getBoundingClientRect();
        
        console.log(`\n📍 ${slug.toUpperCase()}:`);
        console.log(`  Asset: ${tile.src}`);
        console.log(`  Natural: ${tile.naturalWidth}×${tile.naturalHeight}`);
        console.log(`  Computed object-fit: ${computed.objectFit}`);
        console.log(`  Computed object-position: ${computed.objectPosition}`);
        console.log(`  Computed width: ${computed.width}`);
        console.log(`  Computed height: ${computed.height}`);
        console.log(`  Computed max-height: ${computed.maxHeight}`);
        console.log(`  Computed aspect-ratio: ${computed.aspectRatio}`);
        console.log(`  Actual dimensions: ${rect.width}×${rect.height}`);
        
        // Find winning CSS rules
        try {
          const rules = document.styleSheets;
          let winningObjectFit = 'default';
          let winningSource = 'browser default';
          
          for (let i = 0; i < rules.length; i++) {
            try {
              const sheet = rules[i];
              if (sheet.cssRules) {
                for (let j = 0; j < sheet.cssRules.length; j++) {
                  const rule = sheet.cssRules[j] as CSSStyleRule;
                  if (rule.style && rule.style.objectFit && tile.matches(rule.selectorText)) {
                    winningObjectFit = rule.style.objectFit;
                    winningSource = `${rule.selectorText} (${sheet.href || 'inline'})`;
                  }
                }
              }
            } catch (e) {
              // CORS or other access issues
            }
          }
          
          console.log(`  Winning object-fit rule: ${winningObjectFit} from ${winningSource}`);
          
          // Check for any picture/srcset
          const picture = tile.closest('picture');
          if (picture) {
            console.log(`  📸 Picture element found with sources:`);
            const sources = picture.querySelectorAll('source');
            sources.forEach((source, idx) => {
              console.log(`    Source ${idx}: ${source.srcset} (media: ${source.media})`);
            });
          }
          
          if (tile.srcset) {
            console.log(`  📸 Srcset: ${tile.srcset}`);
            console.log(`  📸 Sizes: ${tile.sizes}`);
          }
          
        } catch (e) {
          console.log(`  ⚠️ Could not analyze CSS rules: ${e}`);
        }
      });
    };
    
    // Capture at three moments
    captureComputedStyles('initial paint');
    
    setTimeout(() => captureComputedStyles('after hydration'), 100);
    
    setTimeout(() => captureComputedStyles('+1s after hydration'), 1000);
    
    // Also capture on any style changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
          const target = mutation.target as HTMLElement;
          if (target.tagName === 'IMG' && target.closest('[data-slug]')) {
            const slug = target.closest('[data-slug]')?.getAttribute('data-slug');
            console.log(`🔄 Style change detected on ${slug} tile`);
            setTimeout(() => captureComputedStyles('after style change'), 10);
          }
        }
      });
    });
    
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['style', 'class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  return null;
};
