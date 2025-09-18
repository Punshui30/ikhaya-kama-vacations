import "../styles/hero-simple.css";

export default function HeroSimple({
  title = "Discover Africa",
  blurb = "Write your story across wild savannahs, coasts, and ancient cities.",
  theme = "luxury", // "luxury" | "safari" | "coast"
}: {
  title?: string;
  blurb?: string;
  theme?: "luxury" | "safari" | "coast";
}) {
  return (
    <section className={`hs-hero theme-${theme}`} aria-label={title}>
      <div className="hs-top-strip" aria-hidden="true" />
      <div className="hs-wrap">
        <header className="hs-copy">
          <h1>{title}</h1>
          <p>{blurb}</p>
        </header>

        {/* Static SVG silhouette (no animation) */}
        <svg className="hs-map" viewBox="0 0 900 700" role="img" aria-label="Stylized map of Africa">
          <defs>
            <linearGradient id="hs-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"  stopColor="#0b1d2c"/>
              <stop offset="50%" stopColor="#1a3a63"/>
              <stop offset="100%" stopColor="#0e2742"/>
            </linearGradient>
          </defs>
          <path
            d="M530 42c-40 2-77 20-118 29-31 7-63-6-89 9-23 14-29 47-53 62-28 18-55 31-67 63-9 22-2 47-15 67-13 20-38 28-51 49-16 25-9 58 8 82 14 18 39 29 45 51 8 30-18 62-5 90 11 25 47 33 61 57 12 21 4 52 23 68 27 24 68 7 98 18 33 12 55 54 90 57 33 2 60-30 93-37 29-6 60 7 88-3 34-13 50-52 72-81 20-26 53-46 59-79 6-34-20-67-15-101 5-35 38-62 38-97 0-36-31-63-51-93-18-28-26-65-53-84-27-20-63-11-95-21-32-11-58-37-92-41-7-1-13-1-20 0z"
            fill="url(#hs-fill)"
            opacity="0.95"
          />
          {/* simple route + dots (static) */}
          <path d="M320 450 C 400 380, 520 420, 600 360 S 740 260, 690 200"
                fill="none" stroke="var(--brand-gold)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="600" cy="360" r="6" fill="var(--brand-gold)"/>
          <circle cx="520" cy="420" r="6" fill="var(--brand-gold)"/>
          <circle cx="690" cy="200" r="6" fill="var(--brand-gold)"/>
        </svg>
      </div>
    </section>
  );
}
