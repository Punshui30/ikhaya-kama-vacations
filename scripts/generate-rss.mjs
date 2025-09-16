import fs from "node:fs/promises";
const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Ikhaya KaMa Blog</title><link>/blog</link><description>Travel guides & stories</description></channel></rss>`;
await fs.mkdir("public",{recursive:true}); 
await fs.writeFile("public/feed.xml", rss);
console.log("feed.xml generated");






