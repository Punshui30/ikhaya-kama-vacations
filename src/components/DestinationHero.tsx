// components/DestinationHero.tsx
import React, { useEffect, useRef, useState } from "react";
import "../styles/destination-hero.css";

type Fact = { label: string; value: string; icon?: string };
type Props = {
  data: {
    slug: string;
    title: string;
    tagline?: string;
    heroImages: string[];          // 580x500 1x paths; 2x inferred automatically
    patternUrl: string;            // top strip pattern
    facts?: Fact[];
    bullets?: string[];
  };
  // Optional theme color for page background (set outside if you already do this)
  themeColor?: string; // e.g. "#08142C" or "var(--theme-hero)"
};

export default function DestinationHero({ data, themeColor }: Props) {
  const { title, tagline, heroImages = [], patternUrl, facts = [], bullets = [] } = data;
  const safeImages = heroImages.length > 0 ? heroImages.slice(0, 3) : ["/images/cards/placeholder_580x500.jpg"];
  const [i, setI] = useState(0);
  const timerRef = useRef<number | null>(null);
  const photosRef = useRef<HTMLDivElement | null>(null);

  // Auto-fade every 6s, pause on pointer
  useEffect(() => {
    const start = () => { stop(); timerRef.current = window.setInterval(() => setI(v => (v + 1) % safeImages.length), 6000); };
    const stop = () => { if (timerRef.current) window.clearInterval(timerRef.current); timerRef.current = null; };
    start();
    const el = photosRef.current;
    if (el) {
      el.addEventListener("pointerenter", stop, { passive: true });
      el.addEventListener("pointerleave", start, { passive: true });
    }
    return () => stop();
  }, [safeImages.length]);

  // CSS variables scoped to this hero only
  useEffect(() => {
    const root = document.documentElement;
    if (patternUrl) root.style.setProperty("--dd-pattern-url", `url("${patternUrl}")`);
    if (themeColor) root.style.setProperty("--dd-theme-bg", themeColor);
    
    // Set per-destination pattern settings
    const patternSettings: Record<string, { width: string; y: string; darken: string }> = {
      'south-africa': { width: '2100px', y: '38%', darken: '0' },
      'kenya': { width: '2200px', y: '42%', darken: '0' },
      'tanzania': { width: '2100px', y: '46%', darken: '0' },
      'namibia': { width: '2300px', y: '50%', darken: '0' },
      'uganda': { width: '2200px', y: '40%', darken: '0' },
      'zimbabwe': { width: '2100px', y: '44%', darken: '0' },
      'morocco': { width: '2400px', y: '36%', darken: '0' },
      'botswana': { width: '2200px', y: '48%', darken: '0' }
    };
    
    const settings = patternSettings[data.slug];
    if (settings) {
      root.style.setProperty('--dd-pattern-width', settings.width);
      root.style.setProperty('--dd-pattern-y', settings.y);
      root.style.setProperty('--dd-pattern-darken', settings.darken);
    }
  }, [patternUrl, themeColor, data.slug]);

  // Swipe (left/right) to change image
  const startX = useRef<number | null>(null);
  const onDown = (e: React.PointerEvent) => { startX.current = e.clientX; };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = (e.clientX ?? 0) - startX.current;
    if (Math.abs(dx) > 40) setI(prev => (prev + (dx < 0 ? 1 : safeImages.length - 1)) % safeImages.length);
    startX.current = null;
  };

  // Build srcset from 1x path (expects *_580x500.jpg)
  const make2x = (p: string) => p.replace("_580x500", "_1160x1000");

  return (
    <section className="dd dd-hero" aria-label={`${title} hero`}>
      <div className="dd-strip" aria-hidden="true" />
      <div className="dd-wrap">
        {/* Left: small luxury card */}
        <figure className="dd-card" ref={photosRef} onPointerDown={onDown} onPointerUp={onUp}>
          {safeImages.map((src, idx) => (
            <img
              key={idx}
              className={`dd-photo${i === idx ? " is-active" : ""}`}
              src={src}
              srcSet={`${src} 1x, ${make2x(src)} 2x`}
              width={580}
              height={500}
              alt={`${title} photo ${idx + 1}`}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="dd-dots" role="tablist" aria-label="Hero images">
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                className={`dd-dot${i === idx ? " on" : ""}`}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Go to image ${idx + 1}`}
                onClick={() => setI(idx)}
              />
            ))}
          </div>
        </figure>

        {/* Right: copy */}
        <div className="dd-copy">
          <h1 className="dd-title">{title}</h1>
          {tagline && <p className="dd-tag">{tagline}</p>}

          {bullets.length > 0 && (
            <ul className="dd-bullets" role="list">
              {bullets.map((b, idx) => (
                <li key={idx}><span className="dd-bullet-gem" aria-hidden="true">◆</span>{b}</li>
              ))}
            </ul>
          )}

          {/* Quick facts row (fills that dead space) */}
          {facts.length > 0 && (
            <ul className="dd-facts" role="list">
              {facts.map((f, idx) => (
                <li key={idx}>
                  {f.icon && <span className="dd-ico" aria-hidden="true">{f.icon}</span>}
                  <b>{f.label}</b> {f.value}
                </li>
              ))}
            </ul>
          )}

          <div className="dd-cta-row">
            <button type="button" className="dd-btn">Play Music</button>
          </div>
        </div>
      </div>
    </section>
  );
}
