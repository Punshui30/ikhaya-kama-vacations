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
      { label: 'Travel Prep', path: '/travel-prep' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/ikhayakamavacations', icon: '📷' },
    { name: 'Facebook', url: 'https://facebook.com/ikhayakamavacations', icon: '👥' },
    { name: 'WhatsApp', url: 'https://wa.me/2026991940', icon: '💬' }
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
              <h2>🌍 Complete Website Owner's Guide</h2>
              <button 
                className={styles.closeButton}
                onClick={closeSeoDoc}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.seoContent}>
              <h3>🎉 Master Website Owner's Handbook!</h3>
              <p><em>You found the complete guide! Everything you need to manage, grow, and scale your African travel business online.</em></p>
              
              <div className={styles.seoSection}>
                <h4>🚀 IMMEDIATE DEPLOYMENT STEPS</h4>
                <ol>
                  <li><strong>Create free Netlify account</strong> at netlify.com</li>
                  <li><strong>Buy domain</strong> at Namecheap.com (ikhayakama.com recommended)</li>
                  <li><strong>Connect domain</strong> to Netlify in Site Settings → Domain Management</li>
                  <li><strong>Update VITE_SITE_URL</strong> in .env to your actual domain</li>
                  <li><strong>Run 'pnpm run build'</strong> to create dist folder</li>
                  <li><strong>Drag & drop</strong> dist folder to Netlify dashboard</li>
                  <li><strong>Site will be live</strong> at your domain within minutes!</li>
                </ol>
              </div>
              
              <div className={styles.seoSection}>
                <h4>📋 Quick Start Checklist</h4>
                <ol>
                  <li><strong>✅ Test your website</strong> - Click through all pages</li>
                  <li><strong>✅ Update contact info</strong> - Make sure phone/email are correct</li>
                  <li><strong>✅ Add your first blog post</strong> - Use the content manager</li>
                  <li><strong>✅ Share on social media</strong> - Announce your new website!</li>
                </ol>
              </div>

              <div className={styles.seoSection}>
                <h4>📝 Content Management Options</h4>
                <p><strong>Option 1: Content Manager (Recommended)</strong></p>
                <ol>
                  <li>Go to your website URL + <code>/content-manager.html</code></li>
                  <li>Create new blog posts easily</li>
                  <li>Preview before publishing</li>
                  <li>Export content for your developer</li>
                </ol>
                
                <p><strong>Option 2: Developer Services</strong></p>
                <ul>
                  <li><strong>$50 per blog post</strong> - We write and publish for you</li>
                  <li><strong>$150/month</strong> - Unlimited content management</li>
                  <li><strong>$75/hour</strong> - Custom updates and changes</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>📞 Your Contact Information</h4>
                <p><strong>Update these everywhere on your site:</strong></p>
                <ul>
                  <li><strong>Email:</strong> KG@Ikhayakama.com</li>
                  <li><strong>Phone (US):</strong> +1 (202) 699-1940</li>
                  <li><strong>Phone (SA):</strong> +27 78 430 6704</li>
                  <li><strong>WhatsApp:</strong> +1 (202) 699-1940</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>📰 Blog Post Ideas (Start Here!)</h4>
                <ol>
                  <li><strong>"5 Essential Items for Your African Safari"</strong></li>
                  <li><strong>"Best Time to Visit Kenya: Complete Guide"</strong></li>
                  <li><strong>"What to Expect: First-Time Safari Experience"</strong></li>
                  <li><strong>"Cultural Etiquette: Respecting Local Traditions"</strong></li>
                  <li><strong>"Photography Tips for Safari Adventures"</strong></li>
                </ol>
              </div>

              <div className={styles.seoSection}>
                <h4>🎯 30-Day Success Plan</h4>
                <p><strong>Week 1:</strong> Update contact info, write 2 blog posts, set up Google My Business</p>
                <p><strong>Week 2:</strong> Share website on social media, collect 10 email addresses</p>
                <p><strong>Week 3:</strong> Write 2 more blog posts, ask customers for reviews</p>
                <p><strong>Week 4:</strong> Launch email newsletter, track website analytics</p>
              </div>

              <div className={styles.seoSection}>
                <h4>💰 What You Got for $700 (Incredible Value!)</h4>
                <ul>
                  <li>✅ <strong>Professional, mobile-optimized website</strong></li>
                  <li>✅ <strong>8 destination pages</strong> with stunning visuals</li>
                  <li>✅ <strong>Blog system</strong> with content management</li>
                  <li>✅ <strong>Contact forms</strong> and inquiry system</li>
                  <li>✅ <strong>SEO-optimized</strong> for Google search</li>
                  <li>✅ <strong>Social media integration</strong></li>
                  <li>✅ <strong>Fast loading</strong> and secure hosting</li>
                </ul>
                <p><em>Industry Standard: $5,000-15,000 for similar sites!</em></p>
              </div>

              <div className={styles.seoSection}>
                <h4>🚨 When to Contact Your Developer</h4>
                <p><strong>Emergency (2-4 hours response):</strong></p>
                <ul>
                  <li>❌ Website is completely down</li>
                  <li>❌ Something looks broken</li>
                  <li>❌ Contact forms not working</li>
                </ul>
                
                <p><strong>Regular Updates (24-48 hours):</strong></p>
                <ul>
                  <li>📝 New blog posts ($50 each)</li>
                  <li>📱 Contact info updates</li>
                  <li>🎨 Minor design tweaks</li>
                </ul>
                
                <p><strong>New Features (1-2 weeks):</strong></p>
                <ul>
                  <li>🆕 New pages or sections</li>
                  <li>🔧 Custom functionality</li>
                  <li>📊 Analytics setup</li>
                </ul>
              </div>
              
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
                <h4>🎯 Your Success Roadmap</h4>
                <p><strong>Month 1 Goals:</strong></p>
                <ul>
                  <li>✅ Update all contact information</li>
                  <li>✅ Write 2-3 blog posts using content manager</li>
                  <li>✅ Set up Google My Business listing</li>
                  <li>✅ Share website on social media</li>
                  <li>✅ Collect 10 email addresses from visitors</li>
                </ul>
                
                <p><strong>Month 3 Goals:</strong></p>
                <ul>
                  <li>✅ Publish 10+ blog posts</li>
                  <li>✅ Get 5+ Google reviews from happy customers</li>
                  <li>✅ Launch email newsletter</li>
                  <li>✅ Track website analytics and performance</li>
                  <li>✅ Generate first inquiry directly from website</li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>💡 Pro Tips for Success</h4>
                <ul>
                  <li><strong>Content is King:</strong> Regular blog posts improve Google rankings</li>
                  <li><strong>Mobile-First:</strong> Most visitors use phones - your site is optimized!</li>
                  <li><strong>Social Proof:</strong> Customer reviews and testimonials build trust</li>
                  <li><strong>Email List:</strong> Collect emails for repeat customers and referrals</li>
                  <li><strong>Local SEO:</strong> Google My Business is crucial for local searches</li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>🔧 Technical SEO (Advanced)</h4>
                <p><strong>Already Done For You:</strong></p>
                <ul>
                  <li>✅ Mobile-optimized responsive design</li>
                  <li>✅ Fast loading speeds and image optimization</li>
                  <li>✅ SEO-friendly URL structure</li>
                  <li>✅ Meta tags and Open Graph setup</li>
                  <li>✅ Structured data for better search results</li>
                  <li>✅ Sitemap and robots.txt configured</li>
                </ul>
                
                <p><strong>Next Steps (Optional):</strong></p>
                <ul>
                  <li>🔍 Google Analytics setup ($100 one-time)</li>
                  <li>📊 Search Console monitoring ($50/month)</li>
                  <li>🎯 Advanced SEO optimization ($200/month)</li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>📧 ANALYTICS SETUP</h4>
                <p><strong>Track your visitors and bookings:</strong></p>
                <ul>
                  <li><strong>Google Analytics:</strong> Get GA4 ID from analytics.google.com</li>
                  <li><strong>Facebook Pixel:</strong> Get ID from business.facebook.com</li>
                  <li><strong>Add IDs to .env file</strong> and redeploy</li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>🖼️ SOCIAL IMAGES NEEDED</h4>
                <p><strong>Create these folders and files:</strong></p>
                <ul>
                  <li><strong>/public/og/ folder</strong> with: home.jpg, destinations.jpg, story.jpg, services.jpg, contact.jpg, travel-prep.jpg</li>
                  <li><strong>/public/social/ folder</strong> with: south-africa.mp4, kenya.mp4 (for social sharing)</li>
                  <li><strong>Images should be 1200x630px</strong>, videos under 15MB</li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>🔧 TECHNICAL STATUS (For Your Developer)</h4>
                <p><strong>What's Already Built:</strong></p>
                <ul>
                  <li>✅ HeadTags on all pages (title/description/canonical/OG/Twitter)</li>
                  <li>✅ JSON-LD: Organization, Website, BreadcrumbList wired</li>
                  <li>✅ Sitemap: public/sitemap.xml generated at build</li>
                  <li>✅ Robots: public/robots.txt present</li>
                  <li>✅ RSS: public/feed.xml generated</li>
                  <li>✅ Mobile-optimized responsive design</li>
                  <li>✅ Fast loading speeds and image optimization</li>
                  <li>✅ SEO-friendly URL structure</li>
                </ul>
                
                <p><strong>Build Commands:</strong></p>
                <ul>
                  <li><code>pnpm run dev</code> (development server)</li>
                  <li><code>pnpm run build</code> (production build)</li>
                  <li><code>pnpm run preview</code> (test production build)</li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>🎯 COMPLETE SEO FEATURES INCLUDED</h4>
                <p><strong>Meta Tags & Head Elements:</strong></p>
                <ul>
                  <li>✅ Dynamic page titles and descriptions (HeadTags component)</li>
                  <li>✅ Canonical URLs for duplicate content prevention</li>
                  <li>✅ Robots meta tags (index/noindex control)</li>
                  <li>✅ Viewport meta tag for mobile optimization</li>
                  <li>✅ Language and locale tags (en-US)</li>
                </ul>
                
                <p><strong>Social Media Integration:</strong></p>
                <ul>
                  <li>✅ Open Graph meta tags (og:title, og:description, og:image, og:url)</li>
                  <li>✅ Twitter Card meta tags (summary_large_image)</li>
                  <li>✅ OG image dimensions (1200x630px) and type specified</li>
                  <li>✅ Video meta tags for social sharing (og:video)</li>
                  <li>✅ Site name and type declarations</li>
                </ul>
                
                <p><strong>Structured Data (JSON-LD):</strong></p>
                <ul>
                  <li>✅ Organization schema (business info, logo, social profiles)</li>
                  <li>✅ Website schema with search action</li>
                  <li>✅ Breadcrumb navigation schema</li>
                  <li>✅ Article schema for blog posts (title, author, date, image)</li>
                </ul>
                
                <p><strong>Technical SEO:</strong></p>
                <ul>
                  <li>✅ Auto-generated XML sitemap (/sitemap.xml)</li>
                  <li>✅ Robots.txt file with sitemap reference</li>
                  <li>✅ Clean, SEO-friendly URL structure (/destinations/kenya)</li>
                  <li>✅ Proper heading hierarchy (H1, H2, H3)</li>
                  <li>✅ Image alt attributes for accessibility</li>
                  <li>✅ Lazy loading for images and videos</li>
                  <li>✅ Font preloading for performance</li>
                </ul>
                
                <p><strong>Performance & Mobile:</strong></p>
                <ul>
                  <li>✅ Mobile-first responsive design</li>
                  <li>✅ Fast loading speeds and optimized images</li>
                  <li>✅ Touch-friendly navigation and interactions</li>
                  <li>✅ Optimized for Core Web Vitals</li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>📞 Emergency & Support</h4>
                <p><strong>Website Down or Broken?</strong> Contact your developer immediately:</p>
                <ul>
                  <li>📧 <strong>Email:</strong> [Your developer email]</li>
                  <li>📱 <strong>Phone:</strong> [Your developer phone]</li>
                  <li>⏱️ <strong>Response Time:</strong> 2-4 hours for critical issues</li>
                </ul>
                
                <p><strong>Remember:</strong> Your website is an investment - use it actively! Regular blog posts, social media sharing, and customer engagement will drive more bookings and grow your business.</p>
                
                <p><strong>🔐 SECRET OWNER PANEL REMOVED:</strong> All information is now in this comprehensive guide. Click the copyright notice 6 times to access this master handbook anytime!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
