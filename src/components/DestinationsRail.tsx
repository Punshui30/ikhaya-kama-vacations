import { useRef } from "react";
import "../styles/destinations-rail.css";

type Card = {
  title: string;
  image: string;       // 640x800 or similar vertical, center-safe
  href: string;
};

export default function DestinationsRail({ cards }: { cards: Card[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollByCard = (dir: number) => {
    const el = ref.current; if (!el) return;
    const card = el.querySelector<HTMLElement>(".dr-card");
    const w = card ? card.offsetWidth : 400;
    el.scrollBy({ left: dir * (w + 24), behavior: "smooth" });
  };
  return (
    <section className="dr-wrap" aria-label="Destinations">
      <button className="dr-nav prev" onClick={() => scrollByCard(-1)} aria-label="Previous">‹</button>
      <div className="dr-viewport" ref={ref}>
        <ul className="dr-track" role="list">
          {cards.map(c => (
            <li className="dr-item" role="listitem" key={c.title}>
              <a className="dr-card" href={c.href}>
                <img src={c.image} alt={c.title} loading="lazy" />
                <span className="dr-title">{c.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button className="dr-nav next" onClick={() => scrollByCard(1)} aria-label="Next">›</button>
    </section>
  );
}
