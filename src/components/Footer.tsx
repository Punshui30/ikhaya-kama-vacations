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
              <p><em>You found the complete guide! Everything you need to manage, grow, and scale your African travel business online. Don't worry if some terms seem technical - we explain everything in simple language!</em></p>
              
              <div className={styles.seoSection}>
                <h4>📚 WHAT IS THIS GUIDE?</h4>
                <p><strong>This handbook explains:</strong></p>
                <ul>
                  <li><strong>How to get your website live</strong> (deployment)</li>
                  <li><strong>How to add content</strong> (blog posts, updates)</li>
                  <li><strong>How Google finds your site</strong> (SEO basics)</li>
                  <li><strong>How to track visitors</strong> (analytics)</li>
                  <li><strong>When to call for help</strong> (support options)</li>
                  <li><strong>How much things cost</strong> (pricing guide)</li>
                </ul>
                <p><em>Think of this as your website instruction manual - everything explained simply!</em></p>
              </div>
              
              <div className={styles.seoSection}>
                <h4>🚀 HOW TO GET YOUR WEBSITE LIVE (Step-by-Step)</h4>
                <p><strong>What is "deployment"?</strong> It means putting your website on the internet so people can visit it!</p>
                <ol>
                  <li><strong>Create free Netlify account</strong> at netlify.com
                    <br/><em>Netlify is like a parking spot for your website on the internet - it's free and reliable!</em></li>
                  <li><strong>Buy domain</strong> at Namecheap.com (ikhayakama.com recommended)
                    <br/><em>A domain is your website address (like ikhayakama.com). It costs about $12/year.</em></li>
                  <li><strong>Connect domain</strong> to Netlify in Site Settings → Domain Management
                    <br/><em>This tells the internet that when someone types your domain, they should see your website.</em></li>
                  <li><strong>Update VITE_SITE_URL</strong> in .env to your actual domain
                    <br/><em>This is a technical file that tells your website its own address.</em></li>
                  <li><strong>Run 'pnpm run build'</strong> to create dist folder
                    <br/><em>This creates a special folder with all your website files ready for the internet.</em></li>
                  <li><strong>Drag & drop</strong> dist folder to Netlify dashboard
                    <br/><em>Just like moving a folder on your computer - drag it to Netlify's website.</em></li>
                  <li><strong>Site will be live</strong> at your domain within minutes!
                    <br/><em>Your website will be available to everyone on the internet!</em></li>
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
                <h4>📧 HOW TO TRACK YOUR VISITORS (Analytics)</h4>
                <p><strong>What is analytics?</strong> It shows you how many people visit your website, which pages they look at, and where they come from. This helps you understand your customers better!</p>
                
                <p><strong>Setting up visitor tracking:</strong></p>
                <ul>
                  <li><strong>Google Analytics:</strong> Free tool that shows website visitor data
                    <br/><em>Go to analytics.google.com, create account, get your "GA4 ID" (looks like G-XXXXXXXXXX)</em></li>
                  <li><strong>Facebook Pixel:</strong> Tracks visitors who come from Facebook/Instagram
                    <br/><em>Go to business.facebook.com, create business account, get your "Pixel ID" (numbers only)</em></li>
                  <li><strong>Add IDs to .env file:</strong> Technical file that stores these tracking codes
                    <br/><em>Your developer will add these IDs to make tracking work - costs $100 setup fee</em></li>
                </ul>
                
                <p><strong>What you'll see:</strong> Number of visitors, most popular pages, where visitors come from (Google, Facebook, etc.), which blog posts people read most</p>
              </div>
              
              <div className={styles.seoSection}>
                <h4>🖼️ SOCIAL MEDIA IMAGES EXPLAINED</h4>
                <p><strong>What are "social images"?</strong> When someone shares your website on Facebook, Instagram, or Twitter, these images appear as previews. They make your links look professional and get more clicks!</p>
                
                <p><strong>What you need to create:</strong></p>
                <ul>
                  <li><strong>OG Images folder:</strong> Create /public/og/ folder with these files:
                    <br/><em>home.jpg, destinations.jpg, story.jpg, services.jpg, contact.jpg, travel-prep.jpg</em>
                    <br/><em>These show when people share your pages on social media</em></li>
                  <li><strong>Social Videos folder:</strong> Create /public/social/ folder with short videos:
                    <br/><em>south-africa.mp4, kenya.mp4 (optional but impressive!)</em>
                    <br/><em>These can play when people share your destination pages</em></li>
                </ul>
                
                <p><strong>Image requirements:</strong></p>
                <ul>
                  <li><strong>Size:</strong> 1200 pixels wide × 630 pixels tall (Facebook/Twitter standard)</li>
                  <li><strong>Content:</strong> Should show your logo + destination photo + text overlay</li>
                  <li><strong>Videos:</strong> Under 15MB, 30 seconds max, no sound needed</li>
                </ul>
                
                <p><em>Think of these as business cards for your website - they represent you on social media!</em></p>
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
                <h4>🎯 WHAT IS SEO? (Search Engine Optimization Explained)</h4>
                <p><strong>SEO = Getting Found on Google!</strong> It's like putting up road signs so people can find your business. The better your SEO, the higher you appear when people search for "African safaris" or "Kenya travel."</p>
                
                <p><strong>🏷️ Page Information (What Google Reads):</strong></p>
                <ul>
                  <li>✅ <strong>Page Titles:</strong> The blue clickable text in Google search results
                    <br/><em>Example: "Kenya Safari Adventures | Ikhaya KaMa Vacations"</em></li>
                  <li>✅ <strong>Page Descriptions:</strong> The gray text under the title in search results
                    <br/><em>Example: "Experience authentic Kenya safaris with local guides..."</em></li>
                  <li>✅ <strong>Canonical URLs:</strong> Tells Google which version of a page is the "real" one
                    <br/><em>Prevents Google from getting confused if you have similar pages</em></li>
                  <li>✅ <strong>Mobile-Friendly Tags:</strong> Tells Google your site works on phones
                    <br/><em>Google prioritizes mobile-friendly websites in search results</em></li>
                </ul>
                
                <p><strong>📱 Social Media Features (How Your Links Look When Shared):</strong></p>
                <ul>
                  <li>✅ <strong>Facebook Previews:</strong> Shows image, title, and description when shared
                    <br/><em>Makes your links look professional instead of just plain text</em></li>
                  <li>✅ <strong>Twitter Cards:</strong> Same idea but for Twitter/X
                    <br/><em>Your travel photos will appear when people share your links</em></li>
                  <li>✅ <strong>Instagram Stories:</strong> Links show previews with your branding
                    <br/><em>Helps build trust and gets more clicks</em></li>
                  <li>✅ <strong>Video Previews:</strong> Can show safari videos when sharing destination pages
                    <br/><em>Much more engaging than just photos!</em></li>
                </ul>
                
                <p><strong>🤖 Google Business Information (Structured Data):</strong></p>
                <ul>
                  <li>✅ <strong>Business Profile:</strong> Tells Google you're a real travel company
                    <br/><em>Includes your name, logo, contact info, social media</em></li>
                  <li>✅ <strong>Website Type:</strong> Tells Google this is a travel/tourism website
                    <br/><em>Helps Google show you to people searching for travel</em></li>
                  <li>✅ <strong>Navigation Structure:</strong> Shows Google how your pages connect
                    <br/><em>Like: Home → Destinations → Kenya (helps with rankings)</em></li>
                  <li>✅ <strong>Blog Article Info:</strong> Makes blog posts appear better in search
                    <br/><em>Shows author, date, and featured image in Google results</em></li>
                </ul>
                
                <p><strong>🗺️ Technical Features (Behind-the-Scenes):</strong></p>
                <ul>
                  <li>✅ <strong>Sitemap:</strong> A list of all your pages for Google to find
                    <br/><em>Like a table of contents for search engines (automatically updated)</em></li>
                  <li>✅ <strong>Robots File:</strong> Instructions for search engines
                    <br/><em>Tells Google which pages to look at and which to ignore</em></li>
                  <li>✅ <strong>Clean Web Addresses:</strong> Easy-to-read URLs
                    <br/><em>ikhayakama.com/destinations/kenya (not ugly random numbers)</em></li>
                  <li>✅ <strong>Page Organization:</strong> Proper title hierarchy
                    <br/><em>Main title (H1), section headers (H2), subsections (H3)</em></li>
                  <li>✅ <strong>Image Descriptions:</strong> Text descriptions for all photos
                    <br/><em>Helps blind users and tells Google what's in your images</em></li>
                  <li>✅ <strong>Fast Loading:</strong> Images only load when needed
                    <br/><em>Saves data and makes your site faster</em></li>
                </ul>
                
                <p><strong>📱 Mobile Excellence (Phone & Tablet Optimization):</strong></p>
                <ul>
                  <li>✅ <strong>Responsive Design:</strong> Looks perfect on all devices
                    <br/><em>Automatically adjusts from phone to tablet to desktop</em></li>
                  <li>✅ <strong>Speed Optimization:</strong> Loads quickly even on slow internet
                    <br/><em>Compressed images, efficient code, optimized fonts</em></li>
                  <li>✅ <strong>Touch Controls:</strong> Easy to use with fingers
                    <br/><em>Buttons are big enough, menus work smoothly</em></li>
                  <li>✅ <strong>Google Standards:</strong> Meets all Google mobile requirements
                    <br/><em>Passes Google's mobile-friendly test with flying colors</em></li>
                </ul>
                
                <p><strong>🎯 Bottom Line:</strong> Your website is built to rank high on Google, look professional on social media, and work perfectly on all devices. This gives you a huge advantage over competitors with basic websites!</p>
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
