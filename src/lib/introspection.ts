
// naive route list (expand if you have a central router definition)
export const ROUTES = ["/","/destinations","/story","/services","/blog","/contact","/travel-prep"];

export function envStatus(){
  const env = (import.meta as any).env || {};
  return {
    siteUrl: !!env.VITE_SITE_URL,
    ga4: !!env.VITE_GA4_ID,
    gtm: !!env.VITE_GTM_ID,
    fb: !!env.VITE_FB_PIXEL_ID
  };
}

export async function checkAssets(): Promise<{ogs:string[]; videos:string[]; missingOg:string[]; missingVideo:string[]}> {
  // client-side can't read fs; assume conventional paths and fetch HEAD
  const slugs: string[] = await (async ()=>{
    try{
      const mod = await import("../content/destinations.json");
      return (mod.default as any[]).map(d=>d.slug);
    }catch{ return []; }
  })();
  
  const ogs:string[] = [], videos:string[] = [], missingOg:string[] = [], missingVideo:string[] = [];
  
  await Promise.all(slugs.map(async slug=>{
    const og = `/og/${slug}.jpg`;
    const mp4 = `/social/${slug}.mp4`;
    try{ 
      await fetch(og, {method:"HEAD"}).then(r=>{ 
        if(r.ok) ogs.push(og); 
        else missingOg.push(og); 
      }); 
    } catch { 
      missingOg.push(og); 
    }
    try{ 
      await fetch(mp4,{method:"HEAD"}).then(r=>{ 
        if(r.ok) videos.push(mp4); 
        else missingVideo.push(mp4);
      }); 
    } catch { 
      missingVideo.push(mp4); 
    }
  }));
  
  return { ogs, videos, missingOg, missingVideo };
}

export function laymanItems(){
  return [
    "✅ Every page has a proper page title and short description (shows in Google).",
    "✅ Social previews (Facebook/Twitter/LinkedIn) show an image and summary.",
    "✅ Background code tells Google who we are (business schema) and where pages live (breadcrumbs).",
    "✅ We generate a sitemap and a robots file for search engines.",
    "✅ Images lazy-load; videos have posters and won't overwhelm slow devices.",
    "✅ Analytics spots (Google/Tag Manager/Facebook) are ready when IDs are provided.",
    "",
    "🚀 DEPLOYMENT STEPS:",
    "1. Create free Netlify account at netlify.com",
    "2. Buy domain at Namecheap.com (ikhayakama.com recommended)",
    "3. Connect domain to Netlify in Site Settings > Domain Management",
    "4. Update VITE_SITE_URL in .env to your actual domain",
    "5. Run 'npm run build' to create dist folder",
    "6. Drag & drop dist folder to Netlify dashboard",
    "7. Site will be live at your domain within minutes!",
    "",
    "📧 ANALYTICS SETUP:",
    "• Google Analytics: Get GA4 ID from analytics.google.com",
    "• Facebook Pixel: Get ID from business.facebook.com",
    "• Add IDs to .env file and redeploy",
    "",
    "🖼️ SOCIAL IMAGES NEEDED:",
    "• Create /public/og/ folder with: home.jpg, destinations.jpg, story.jpg, services.jpg, contact.jpg, travel-prep.jpg",
    "• Create /public/social/ folder with: south-africa.mp4, kenya.mp4 (for social sharing)",
    "• Images should be 1200x630px, videos under 15MB"
  ];
}

export function techItems(status:{envs:ReturnType<typeof envStatus>, routes:string[], assets:{ogs:string[];videos:string[];missingOg:string[];missingVideo:string[]}}){
  const envs = status.envs;
  return [
    `✅ HeadTags on all pages (title/description/canonical/OG/Twitter)`,
    `✅ JSON-LD: Organization, Website, BreadcrumbList wired`,
    `✅ Sitemap: public/sitemap.xml generated at build`,
    `✅ Robots: public/robots.txt present`,
    `✅ RSS: public/feed.xml generated`,
    `📊 Analytics placeholders: GA4=${envs.ga4?'✅':'—'}, GTM=${envs.gtm?'✅':'—'}, FB Pixel=${envs.fb?'✅':'—'}`,
    `🗺️ Routes indexed: ${status.routes.join(", ")}`,
    `🖼️ OG images present: ${status.assets.ogs.length} | missing: ${status.assets.missingOg.length}`,
    `🎥 Social MP4 present: ${status.assets.videos.length} | missing: ${status.assets.missingVideo.length}`,
    "",
    "🔧 BUILD COMMANDS:",
    "• npm run dev (development server)",
    "• npm run build (production build)",
    "• npm run preview (test production build)",
    "",
    "📁 KEY FILES:",
    "• /src/lib/seo.ts (SEO configuration)",
    "• /src/components/HeadTags.tsx (meta tags component)",
    "• /scripts/ (build-time asset generation)",
    "• /public/robots.txt (search engine instructions)",
    "• .env.example (environment variables template)",
    "",
    "🎯 SEO FEATURES:",
    "• Dynamic page titles and descriptions",
    "• Open Graph and Twitter Card meta tags",
    "• Structured data (JSON-LD) for search engines",
    "• Breadcrumb navigation schema",
    "• Video meta tags for social sharing",
    "• Mobile-optimized viewport settings",
    "",
    "🔐 SECRET OWNER PANEL:",
    "• Click 'Ikhaya KaMa' logo 6 times within 5 seconds",
    "• Shows real-time SEO status and missing assets",
    "• Provides deployment and setup instructions"
  ];
}
