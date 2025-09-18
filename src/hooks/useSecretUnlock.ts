import { useEffect, useRef, useState } from "react";

export function useSecretUnlock(selector = "[data-owner-unlock]"){
  const [open, setOpen] = useState(false);
  const clicks = useRef<number[]>([]);
  
  useEffect(()=>{
    const el = document.querySelector(selector);
    if(!el) return;
    
    const onClick = () => {
      const now = Date.now();
      clicks.current = clicks.current.filter(t => now - t < 5000);
      clicks.current.push(now);
      if (clicks.current.length >= 6) { 
        setOpen(true); 
        clicks.current = []; 
      }
    };
    
    el.addEventListener("click", onClick);
    return ()=> el.removeEventListener("click", onClick);
  },[selector]);
  
  return { open, setOpen };
}







