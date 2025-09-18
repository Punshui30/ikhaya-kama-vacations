import "../styles/hero-video.css";

export default function HeroVideo({
  title = "Discover Africa",
  blurb = "Write your story across wild savannahs, coasts, and ancient cities.",
  theme = "luxury", // "luxury" | "safari" | "coast"
}: {
  title?: string;
  blurb?: string;
  theme?: "luxury" | "safari" | "coast";
}) {
  return (
    <section className={`hv-hero theme-${theme}`} aria-label={title}>
      <div className="hv-top-strip" aria-hidden="true" />
      
      <video 
        className="hv-video"
        autoPlay 
        muted 
        loop 
        playsInline
        poster="/images/video-poster.jpg"
      >
        <source src="/video/DestinationHero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="hv-overlay" />
      
      <div className="hv-wrap">
        <header className="hv-copy">
          <h1>{title}</h1>
          <p>{blurb}</p>
        </header>
      </div>
    </section>
  );
}
