import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [clickCount, setClickCount] = useState(0);
  const [showSeoDoc, setShowSeoDoc] = useState(false);

  const footerLinks = {
    company: [
      { label: 'Our Story', path: '/story' },
      { label: 'Services', path: '/services' },
      { label: 'Testimonials', path: '/testimonials' },
      { label: 'Contact', path: '/contact' }
    ],
    destinations: [
      { label: 'South Africa', path: '/destinations/south-africa' },
      { label: 'Kenya', path: '/destinations/kenya' },
      { label: 'Tanzania', path: '/destinations/tanzania' },
      { label: 'Namibia', path: '/destinations/namibia' }
    ],
    resources: [
      { label: 'Blog', path: '/blog' },
      { label: 'Travel Planner', path: '/planner' },
      { label: 'Custom Itineraries', path: '/custom-itineraries' },
      { label: 'Story Explorer', path: '/story-explorer' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', url: '#', icon: '📷' },
    { name: 'Facebook', url: '#', icon: '👥' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'YouTube', url: '#', icon: '🎥' }
  ];

  const handleCopyrightClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 6) {
      setShowSeoDoc(true);
      setClickCount(0); // Reset counter
    }
  };

  const closeSeoDoc = () => {
    setShowSeoDoc(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoText}>Ikhaya KaMa</span>
              <span className={styles.logoSubtext}>Vacations</span>
            </Link>
            <p className={styles.tagline}>
              We don't just book trips—we open doors to connection, discovery, and wonder…
            </p>
            <div className={styles.social}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={styles.socialLink}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Company</h3>
              <ul className={styles.linkList}>
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Destinations</h3>
              <ul className={styles.linkList}>
                {footerLinks.destinations.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Resources</h3>
              <ul className={styles.linkList}>
                {footerLinks.resources.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p 
              className={styles.copyrightText}
              onClick={handleCopyrightClick}
            >
              &copy; {currentYear} Ikhaya KaMa Vacations. All rights reserved.
            </p>
          </div>
          <div className={styles.legal}>
            <Link to="/privacy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <Link to="/terms" className={styles.legalLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Secret SEO Documentation Modal */}
      {showSeoDoc && (
        <div className={styles.seoModal}>
          <div className={styles.seoModalContent}>
            <div className={styles.seoModalHeader}>
              <h2>🔍 SEO Features Documentation</h2>
              <button 
                className={styles.closeButton}
                onClick={closeSeoDoc}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.seoContent}>
              <h3>Complete SEO Implementation Guide</h3>
              <p><em>Professional SEO checklist with placeholders already wired in. Clear notes about what needs to be filled in later.</em></p>
              
              <div className={styles.seoSection}>
                <h4>1. Page Titles & Meta Descriptions</h4>
                <p><strong>Developer (Wired):</strong> Basic title structure in index.html, React Helmet ready for dynamic titles</p>
                <p><strong>Client to Provide:</strong> Optimized titles and descriptions for each page</p>
                <ul>
                  <li><strong>Home:</strong> "Ikhaya KaMa Vacations - Authentic African Travel Experiences"</li>
                  <li><strong>Destinations:</strong> "African Safari Destinations - Kenya, Tanzania, South Africa | Ikhaya KaMa"</li>
                  <li><strong>Blog:</strong> "African Travel Stories & Tips | Ikhaya KaMa Vacations Blog"</li>
                </ul>
                <p><strong>Placeholder Template:</strong> "[Page Name] - [Key Benefit] | Ikhaya KaMa Vacations"</p>
              </div>

              <div className={styles.seoSection}>
                <h4>2. Open Graph (OG) Tags</h4>
                <p><strong>Developer (Wired):</strong> OG tag structure ready, placeholder image paths configured</p>
                <p><strong>Client to Provide:</strong> Social media images and optimized descriptions</p>
                <ul>
                  <li><strong>og:title:</strong> Same as page title</li>
                  <li><strong>og:description:</strong> 155 characters max, compelling call-to-action</li>
                  <li><strong>og:image:</strong> 1200x630px images for each page</li>
                  <li><strong>Placeholder Paths:</strong> /images/og/home.jpg, /images/og/destinations.jpg</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>3. Twitter Card Tags</h4>
                <p><strong>Developer (Wired):</strong> Twitter Card meta tags mirroring OG tags</p>
                <p><strong>Client to Provide:</strong> Twitter-specific images (1200x675px) and descriptions</p>
                <ul>
                  <li><strong>twitter:card:</strong> "summary_large_image"</li>
                  <li><strong>twitter:site:</strong> "@ikhayakamavacations" (client to provide handle)</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>4. Canonical URLs</h4>
                <p><strong>Developer (Wired):</strong> Canonical link structure ready</p>
                <p><strong>Client to Provide:</strong> Final production domain name</p>
                <ul>
                  <li><strong>Current:</strong> &lt;link rel="canonical" href="https://ikhayakama.com/current-page" /&gt;</li>
                  <li><strong>Client Action:</strong> Replace "ikhayakama.com" with actual domain</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>5. Heading Hierarchy</h4>
                <p><strong>Developer (Wired):</strong> Proper H1, H2, H3 structure on all pages</p>
                <p><strong>Client to Provide:</strong> SEO-optimized heading text</p>
                <ul>
                  <li><strong>H1:</strong> One per page, includes primary keyword</li>
                  <li><strong>H2:</strong> Section headers, include secondary keywords</li>
                  <li><strong>H3:</strong> Subsection headers for better organization</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>6. Alt Text for Images</h4>
                <p><strong>Developer (Wired):</strong> All images accept alt attributes</p>
                <p><strong>Client to Provide:</strong> Descriptive alt text for all images</p>
                <ul>
                  <li><strong>Placeholder Template:</strong> "Photo of [Destination Name] safari - Ikhaya KaMa Vacations"</li>
                  <li><strong>Examples:</strong> "Photo of Maasai Mara National Reserve wildlife - Ikhaya KaMa Vacations"</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>7. Schema Markup (Structured Data)</h4>
                <p><strong>Developer (Wired):</strong> JSON-LD structure ready for Organization, Breadcrumbs, Blog articles</p>
                <p><strong>Client to Provide:</strong> Business information, logo URL, social profiles</p>
                <ul>
                  <li><strong>Organization Schema:</strong> Business name, logo, contact info, social profiles</li>
                  <li><strong>Breadcrumb Schema:</strong> Navigation structure for better search results</li>
                  <li><strong>Blog Article Schema:</strong> Author, publish date, featured image</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>8. Sitemap & Robots.txt</h4>
                <p><strong>Developer (Wired):</strong> Auto-generated sitemap.xml, basic robots.txt configured</p>
                <p><strong>Client to Provide:</strong> Final domain verification, additional crawl rules</p>
                <ul>
                  <li><strong>Sitemap:</strong> /sitemap.xml (auto-generated from routes)</li>
                  <li><strong>Robots.txt:</strong> Basic rules configured, client to verify when live</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>9. Performance Hooks</h4>
                <p><strong>Developer (Wired):</strong> Lazy-loading for images/videos, font preloading</p>
                <p><strong>Client to Provide:</strong> Compressed hero videos, optimized images</p>
                <ul>
                  <li><strong>Image Lazy Loading:</strong> Below-the-fold images load on scroll</li>
                  <li><strong>Video Optimization:</strong> Hero videos compressed for web</li>
                  <li><strong>Font Preloading:</strong> Critical fonts loaded first</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>10. Analytics & Tracking</h4>
                <p><strong>Developer (Wired):</strong> Slots ready for Google Analytics, Tag Manager, Facebook Pixel</p>
                <p><strong>Client to Provide:</strong> Tracking IDs in .env file</p>
                <ul>
                  <li><strong>Google Analytics 4:</strong> GA_MEASUREMENT_ID in .env</li>
                  <li><strong>Google Tag Manager:</strong> GTM_ID in .env</li>
                  <li><strong>Facebook Pixel:</strong> FB_PIXEL_ID in .env</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>11. Internal Linking</h4>
                <p><strong>Developer (Wired):</strong> Navigation and CTA links use descriptive anchor text</p>
                <p><strong>Client to Provide:</strong> Additional contextual internal links</p>
                <ul>
                  <li><strong>Examples:</strong> "Explore South Africa Safaris", "Plan Your Kenya Adventure"</li>
                  <li><strong>Strategy:</strong> Link related destinations and blog posts</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>12. URL Slugs</h4>
                <p><strong>Developer (Wired):</strong> Clean, human-readable URLs for all pages</p>
                <p><strong>Client to Provide:</strong> Final naming confirmation</p>
                <ul>
                  <li><strong>Current Structure:</strong> /destinations/kenya, /blog/great-migration</li>
                  <li><strong>Client Action:</strong> Confirm final naming convention</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>13. Blog SEO Hooks</h4>
                <p><strong>Developer (Wired):</strong> Frontmatter structure for title, description, date, tags, cover image</p>
                <p><strong>Client to Provide:</strong> Blog content with proper frontmatter</p>
                <ul>
                  <li><strong>Frontmatter Template:</strong> title, description, date, tags, coverImage</li>
                  <li><strong>Example:</strong> "title: 'Safari Photography Tips', tags: ['photography', 'safari']"</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>14. Favicons & App Icons</h4>
                <p><strong>Developer (Wired):</strong> Favicon structure ready</p>
                <p><strong>Client to Provide:</strong> Final branded favicon and app icons</p>
                <ul>
                  <li><strong>Required Sizes:</strong> 16x16, 32x32, 180x180, 192x192, 512x512</li>
                  <li><strong>Location:</strong> /public/favicon.ico, /public/apple-touch-icon.png</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>15. Language & Locale Tags</h4>
                <p><strong>Developer (Wired):</strong> &lt;html lang="en"&gt; included</p>
                <p><strong>Client to Provide:</strong> Confirmation if multi-language needed</p>
                <ul>
                  <li><strong>Current:</strong> English only</li>
                  <li><strong>Future:</strong> Add hreflang tags if expanding to other languages</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>Client Action Items Summary</h4>
                <ol>
                  <li>Replace all placeholder content with final copy</li>
                  <li>Provide high-quality images (1200x630px for social, optimized for web)</li>
                  <li>Add tracking IDs to .env file</li>
                  <li>Confirm final domain name</li>
                  <li>Provide business information for schema markup</li>
                  <li>Create branded favicon and app icons</li>
                  <li>Compress hero videos for optimal loading</li>
                  <li>Verify sitemap and robots.txt when site goes live</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
