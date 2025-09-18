import "../styles/hero-africa.css";

export default function HeroAfrica({
  theme = "luxury", // "luxury" | "safari" | "coast"
}: { theme?: "luxury" | "safari" | "coast" }) {
  return (
    <section className={`af-hero theme-${theme}`} aria-label="Discover Africa">
      <div className="af-top-strip" aria-hidden="true" />
      <div className="af-wrap">
        <header className="af-copy">
          <h1>Discover Africa</h1>
          <p>Write your story across wild savannahs, coasts, and ancient cities.</p>
        </header>

        <svg className="af-map" viewBox="0 0 900 700" role="img" aria-labelledby="afTitle">
          <title id="afTitle">Stylized map of Africa with animated route</title>

          <defs>
            <linearGradient id="af-flow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0b1d2c"/>
              <stop offset="50%" stopColor="#1a3a63"/>
              <stop offset="100%" stopColor="#0e2742"/>
            </linearGradient>
            <linearGradient id="af-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,.16)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Africa silhouette (clean, license-free approximation) */}
          <path id="africa-shape"
            d="M530 42c-40 2-77 20-118 29-31 7-63-6-89 9-23 14-29 47-53 62-28 18-55 31-67 63-9 22-2 47-15 67-13 20-38 28-51 49-16 25-9 58 8 82 14 18 39 29 45 51 8 30-18 62-5 90 11 25 47 33 61 57 12 21 4 52 23 68 27 24 68 7 98 18 33 12 55 54 90 57 33 2 60-30 93-37 29-6 60 7 88-3 34-13 50-52 72-81 20-26 53-46 59-79 6-34-20-67-15-101 5-35 38-62 38-97 0-36-31-63-51-93-18-28-26-65-53-84-27-20-63-11-95-21-32-11-58-37-92-41-7-1-13-1-20 0z"
            fill="url(#af-flow)"
          />

          {/* moving sheen clipped to shape */}
          <clipPath id="clip-africa"><use href="#africa-shape" /></clipPath>
          <rect className="af-sheen" clipPath="url(#clip-africa)" x="-300" y="0" width="1500" height="700" fill="url(#af-sheen)"/>

          {/* route line (bezier across the map) */}
          <path className="af-route"
            d="M320 450 C 400 380, 520 420, 600 360 S 740 260, 690 200"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />

          {/* pulses */}
          <g className="af-pulses">
            <circle className="af-dot" cx="600" cy="360" r="5" />
            <circle className="af-dot" cx="520" cy="420" r="5" />
            <circle className="af-dot" cx="690" cy="200" r="5" />
          </g>
        </svg>
      </div>
    </section>
  );
}
