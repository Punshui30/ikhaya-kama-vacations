import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  ogImage = '/images/og/default.jpg',
  canonical,
  noIndex = false
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) {
      ogImageTag.setAttribute('content', ogImage);
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
    
    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', ogImage);
    }
    
    // Update canonical URL
    if (canonical) {
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonical);
      }
    }
    
    // Handle no-index
    if (noIndex) {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute('content', 'noindex, nofollow');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
      }
    }
  }, [title, description, ogImage, canonical, noIndex]);

  return null;
};

export default SEO;

