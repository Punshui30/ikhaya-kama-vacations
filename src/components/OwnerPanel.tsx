import { useEffect, useState } from "react";
import styles from "./OwnerPanel.module.scss";
import { envStatus, laymanItems, techItems, checkAssets, ROUTES } from "../lib/introspection";

export default function OwnerPanel({ onClose }:{onClose:()=>void}) {
  const [tab, setTab] = useState<"plain"|"tech">("plain");
  const [tech, setTech] = useState<string[]>([]);
  
  useEffect(()=>{
    (async ()=>{
      const envs = envStatus();
      const assets = await checkAssets();
      setTech(techItems({ envs, routes: ROUTES, assets }));
    })();
  },[]);
  
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Owner Handoff">
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Owner Handoff</h2>
          <nav className={styles.tabs}>
            <button className={tab==="plain"?styles.active:""} onClick={()=>setTab("plain")}>Layman</button>
            <button className={tab==="tech"?styles.active:""} onClick={()=>setTab("tech")}>Tech</button>
          </nav>
          <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
        </header>
        <section className={styles.body}>
          <ul className={styles.list}>
            {(tab==="plain" ? laymanItems() : tech).map((item,i)=> <li key={i}>{item}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}
