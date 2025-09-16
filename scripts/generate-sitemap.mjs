import fs from "node:fs/promises";
const SITE_URL = process.env.VITE_SITE_URL || "https://example.com";

// If you have destinations.json, read it and add detail routes:
let routes = ["/","/destinations","/story","/services","/blog","/contact","/travel-prep"];

try {
  const data = JSON.parse(await fs.readFile("src/content/destinations.json","utf8"));
  routes = routes.concat(data.map(d => `/destinations/${d.slug}`));
} catch {}

const urls = routes.map(p=>`<url><loc>${SITE_URL.replace(/\/$/,"")}${p}</loc></url>`).join("");
const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

await fs.mkdir("public",{recursive:true}); 
await fs.writeFile("public/sitemap.xml", xml);
console.log("sitemap.xml generated with", routes.length, "routes");






