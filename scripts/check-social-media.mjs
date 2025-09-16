import fs from "node:fs/promises";
let missing = [];

try {
  const data = JSON.parse(await fs.readFile("src/content/destinations.json","utf8"));
  for (const d of data) {
    const og = `public/og/${d.slug}.jpg`;
    const mp4 = `public/social/${d.slug}.mp4`;
    try { 
      await fs.stat(og); 
    } catch { 
      missing.push(`Missing OG image: ${og}`); 
    }
    try { 
      const s = await fs.stat(mp4); 
      if (s.size > 15*1024*1024) missing.push(`Video too large (>15MB): ${mp4}`); 
    } catch { 
      missing.push(`Missing social video: ${mp4}`); 
    }
  }
} catch {
  console.log("Destinations not found; skipping checks.");
}

if (missing.length) {
  console.warn("SOCIAL ASSET ISSUES:\n" + missing.join("\n"));
  process.exitCode = 0; // warn only
}






