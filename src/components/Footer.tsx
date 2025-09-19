import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [clickCount, setClickCount] = useState(0);
  const [showSeoDoc, setShowSeoDoc] = useState(false);
  const [activeTab, setActiveTab] = useState<'client' | 'developer'>('client');

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
              <div className={styles.tabButtons}>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'client' ? styles.active : ''}`}
                  onClick={() => setActiveTab('client')}
                >
                  👤 For You
                </button>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'developer' ? styles.active : ''}`}
                  onClick={() => setActiveTab('developer')}
                >
                  🔧 For Developers
                </button>
              </div>
              <button 
                className={styles.closeButton}
                onClick={closeSeoDoc}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.seoContent}>
              {activeTab === 'client' ? (
                <>
                  <h3>🎉 Your Website Owner's Handbook!</h3>
                  <p><strong>Everything you need to know about your new website, explained in plain English.</strong></p>
              
              <div className={styles.seoSection}>
                <h4>🚀 Getting Your Website Live on the Internet</h4>
                <ol>
                  <li><strong>Create free account:</strong> <a href="https://netlify.com" target="_blank" rel="noopener">netlify.com</a>
                    <br/><em>This hosts your website for free (like renting space on the internet)</em></li>
                  <li><strong>Buy your web address:</strong> <a href="https://namecheap.com" target="_blank" rel="noopener">namecheap.com</a>
                    <br/><em>Get "ikhayakama.com" or similar (costs about $12/year)</em></li>
                  <li><strong>Connect everything together</strong> (I can do this for you once you have the account and domain)</li>
                  <li><strong>Upload your website files</strong> (I can do this for you)</li>
                  <li><strong>Your website goes live!</strong> People can visit it from anywhere in the world</li>
                </ol>
                <p><strong>💡 Bottom line:</strong> You buy the domain, I handle all the technical setup!</p>
              </div>
              
              <div className={styles.seoSection}>
                <h4>📝 Adding New Blog Posts</h4>
                <p><strong>Option 1: Do It Yourself</strong></p>
                <p>Go to your website address and add <strong>/content-manager.html</strong> at the end. This opens a simple form where you can write blog posts, preview them, and export the text for me to publish.</p>
                
                <p><strong>Option 2: I Do It For You</strong></p>
                <ul>
                  <li><strong>$50 per blog post</strong> - Send me the topic, I write and publish everything</li>
                  <li><strong>$150 per month</strong> - I write unlimited blog posts for you</li>
                  <li><strong>$75 per hour</strong> - Any other website changes or updates</li>
                </ul>
              </div>

              <div className={styles.seoSection}>
                <h4>📰 Blog Post Ideas That Get Customers</h4>
                <p><strong>Write about these topics to attract safari customers:</strong></p>
                <ol>
                  <li><strong>"5 Essential Items for Your African Safari"</strong> - Packing guide that builds trust</li>
                  <li><strong>"Best Time to Visit Kenya: Complete Guide"</strong> - Helps people plan and book</li>
                  <li><strong>"What to Expect: First-Time Safari Experience"</strong> - Reduces anxiety, increases bookings</li>
                  <li><strong>"Cultural Etiquette: Respecting Local Traditions"</strong> - Shows your expertise</li>
                  <li><strong>"Photography Tips for Safari Adventures"</strong> - Appeals to Instagram generation</li>
                </ol>
                <p><em>Each blog post helps Google find your website and builds customer confidence!</em></p>
              </div>

              <div className={styles.seoSection}>
                <h4>🎯 Your First Month Action Plan</h4>
                <p><strong>Week 1:</strong> Write 2 blog posts, set up Google My Business listing</p>
                <p><strong>Week 2:</strong> Share website on social media, start collecting customer emails</p>
                <p><strong>Week 3:</strong> Write 2 more blog posts, ask happy customers for Google reviews</p>
                <p><strong>Week 4:</strong> Plan your next month of content</p>
                <p><em>Goal: Get your website working for you to attract new customers!</em></p>
              </div>

              <div className={styles.seoSection}>
                <h4>💰 What You Got for $700</h4>
                <p><strong>Your complete professional website includes:</strong></p>
                <ul>
                  <li><strong>Beautiful design</strong> that works perfectly on phones and computers</li>
                  <li><strong>8 destination pages</strong> for South Africa, Kenya, Tanzania, etc.</li>
                  <li><strong>Blog system</strong> for sharing travel stories and tips</li>
                  <li><strong>Contact forms</strong> so customers can reach you easily</li>
                  <li><strong>Google optimization</strong> so people can find you in search</li>
                  <li><strong>Social media ready</strong> for sharing on Facebook and Instagram</li>
                  <li><strong>Fast and secure</strong> hosting and performance</li>
                </ul>
                <p><strong>Industry comparison:</strong> Similar websites cost $5,000-15,000. You got an incredible deal!</p>
              </div>

              <div className={styles.seoSection}>
                <h4>📞 When to Call for Help</h4>
                <p><strong>Call immediately if:</strong></p>
                <ul>
                  <li><strong>Website won't load</strong> - Emergency fix needed</li>
                  <li><strong>Something looks broken</strong> - Design or layout issues</li>
                  <li><strong>Contact forms don't work</strong> - You're losing customers</li>
                </ul>
                
                <p><strong>Email for regular updates:</strong></p>
                <ul>
                  <li><strong>New blog posts</strong> - $50 each, ready in 24-48 hours</li>
                  <li><strong>Change phone numbers or email</strong> - Quick updates</li>
                  <li><strong>Small design changes</strong> - Color changes, text updates</li>
                </ul>
                
                <p><strong>Schedule for big changes:</strong></p>
                <ul>
                  <li><strong>New pages or features</strong> - Plan 1-2 weeks ahead</li>
                  <li><strong>Major redesigns</strong> - Discuss scope and timeline</li>
                  <li><strong>Analytics and tracking setup</strong> - $100 one-time fee</li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>📊 How to Track Your Website Visitors</h4>
                <p><strong>What is website analytics?</strong> It shows you how many people visit your website, which pages they look at, and where they come from. This helps you understand what's working!</p>
                
                <p><strong>To set up visitor tracking:</strong></p>
                <ol>
                  <li><strong>Google Analytics:</strong> Go to <a href="https://analytics.google.com" target="_blank" rel="noopener">analytics.google.com</a> and create a free account</li>
                  <li><strong>Get your tracking code</strong> (looks like G-XXXXXXXXXX)</li>
                  <li><strong>Send it to me</strong> - I'll add it to your website ($100 setup fee)</li>
                  <li><strong>Start seeing data</strong> within 24 hours!</li>
                </ol>
                
                <p><strong>What you'll learn:</strong> How many visitors per day, which destinations they're interested in, whether they're finding you through Google or social media, which blog posts are most popular</p>
              </div>

              <div className={styles.seoSection}>
                <h4>🌟 What Makes Your Website Special</h4>
                <p><strong>Your website is already optimized for Google and social media!</strong> Here's what that means in simple terms:</p>
                
                <p><strong>Google will find you because:</strong></p>
                <ul>
                  <li><strong>Perfect page titles</strong> - Each page has a clear, searchable title</li>
                  <li><strong>Good descriptions</strong> - Google knows what each page is about</li>
                  <li><strong>Mobile-friendly</strong> - Works perfectly on phones (Google loves this)</li>
                  <li><strong>Fast loading</strong> - Your site loads quickly (Google ranks fast sites higher)</li>
                  <li><strong>Professional structure</strong> - Everything is organized properly</li>
                </ul>
                
                <p><strong>Social media sharing looks professional because:</strong></p>
                <ul>
                  <li><strong>Facebook previews</strong> - Your links show beautiful images and descriptions</li>
                  <li><strong>Instagram stories</strong> - Links display with your branding</li>
                  <li><strong>Twitter cards</strong> - Professional appearance when shared</li>
                  <li><strong>WhatsApp previews</strong> - Links show destination photos</li>
                </ul>
                
                <p><strong>💡 Bottom line:</strong> Your website is built to compete with the big travel companies!</p>
              </div>
              
              <div className={styles.seoSection}>
                <h4>📈 Growing Your Business</h4>
                <p><strong>Month 1 - Getting Started:</strong></p>
                <ul>
                  <li><strong>Write 2 blog posts</strong> about African travel</li>
                  <li><strong>Set up Google My Business</strong> (free listing on Google Maps)</li>
                  <li><strong>Share your website</strong> on Facebook and Instagram</li>
                </ul>
                
                <p><strong>Month 3 - Building Momentum:</strong></p>
                <ul>
                  <li><strong>Publish 10+ blog posts</strong> (great for Google rankings)</li>
                  <li><strong>Get customer reviews</strong> on Google (builds trust)</li>
                  <li><strong>Track your visitors</strong> with analytics ($100 setup)</li>
                  <li><strong>Get your first website inquiry!</strong></li>
                </ul>
                
                <p><strong>🎯 Success Tips:</strong></p>
                <ul>
                  <li><strong>Blog regularly</strong> - Google loves fresh content</li>
                  <li><strong>Ask for reviews</strong> - Social proof sells safaris</li>
                  <li><strong>Share on social media</strong> - Your photos will attract customers</li>
                  <li><strong>Collect email addresses</strong> - Build a customer list for repeat business</li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>🆘 What to Do If Something Goes Wrong</h4>
                <p><strong>Website completely broken or won't load?</strong> Call or text immediately - this is an emergency that loses you money every hour it's down.</p>
                
                <p><strong>Need a blog post or small change?</strong> Send an email with details. Most updates are done within 24-48 hours for $50-75.</p>
                
                <p><strong>Want new features or pages?</strong> Let's schedule a call to discuss what you need and how much it will cost. Big changes take 1-2 weeks.</p>
                
                <p><strong>🔗 Useful Links:</strong></p>
                <ul>
                  <li><strong>Google My Business:</strong> <a href="https://business.google.com" target="_blank" rel="noopener">business.google.com</a></li>
                  <li><strong>Google Analytics:</strong> <a href="https://analytics.google.com" target="_blank" rel="noopener">analytics.google.com</a></li>
                  <li><strong>Facebook Business:</strong> <a href="https://business.facebook.com" target="_blank" rel="noopener">business.facebook.com</a></li>
                </ul>
              </div>
              
              <div className={styles.seoSection}>
                <h4>🎉 Final Notes</h4>
                <p><strong>Your website is complete and ready to make you money!</strong></p>
                
                <p><strong>What's already done:</strong> Everything technical is finished. Your site works on all devices, loads fast, and Google can find it easily.</p>
                
                <p><strong>What you need to do:</strong> Start creating content (blog posts) and sharing your website to attract customers.</p>
                
                <p><strong>What I can help with:</strong> Any updates, changes, or new features you want to add.</p>
                
                <p><strong>Remember:</strong> You got an incredible website for $700. Use it actively and it will pay for itself many times over!</p>
              </div>
                </>
              ) : (
                <>
                  <h3>🔧 Technical Documentation for Developers</h3>
                  <p><strong>Complete technical specifications and handoff information for web professionals.</strong></p>
                  
                  <div className={styles.seoSection}>
                    <h4>🏗️ Complete Tech Stack</h4>
                    <ul>
                      <li><strong>Framework:</strong> React 18.2.0 with TypeScript 5.2.2</li>
                      <li><strong>Build Tool:</strong> Vite 5.0.8 with hot module replacement</li>
                      <li><strong>Styling:</strong> SCSS Modules with CSS Custom Properties and design tokens</li>
                      <li><strong>Routing:</strong> React Router DOM 6.21.1 with client-side navigation</li>
                      <li><strong>Package Manager:</strong> pnpm (required - not npm or yarn)</li>
                      <li><strong>Deployment:</strong> Netlify with automatic SPA redirects configured</li>
                      <li><strong>Domain:</strong> Custom domain ready via Netlify DNS management</li>
                      <li><strong>Node Version:</strong> 18+ required for build process</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>📁 Complete Project Structure</h4>
                    <ul>
                      <li><strong>/src/pages/</strong> - Route components (Home.tsx, DestinationsIndex.tsx, DestinationDetail.tsx, etc.)</li>
                      <li><strong>/src/components/</strong> - Reusable UI components (Header, Footer, BookDestinations, etc.)</li>
                      <li><strong>/src/content/</strong> - JSON data files (destinations.json, auto-blog-posts.json, copy.ts)</li>
                      <li><strong>/src/styles/</strong> - SCSS architecture (globals.scss, tokens.scss, mixins.scss, ik-mobile-fixes.scss)</li>
                      <li><strong>/public/</strong> - Static assets organized by type (images, videos, icons, sitemap.xml)</li>
                      <li><strong>/scripts/</strong> - Build utilities (generate-sitemap.mjs for SEO)</li>
                      <li><strong>Root files:</strong> package.json, vite.config.ts, netlify.toml, tsconfig.json</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>⚡ Essential Build Commands</h4>
                    <ul>
                      <li><strong>pnpm install</strong> - Install all project dependencies (required first step)</li>
                      <li><strong>pnpm run dev</strong> - Start development server at localhost:5173 with hot reload</li>
                      <li><strong>pnpm run build</strong> - Create production-ready build in /dist folder</li>
                      <li><strong>pnpm run preview</strong> - Test the production build locally before deployment</li>
                      <li><strong>pnpm run lint</strong> - Run ESLint for code quality and error checking</li>
                      <li><strong>pnpm run generate-blog</strong> - Generate 5 sample blog posts for content</li>
                      <li><strong>pnpm run update-blog</strong> - Fetch real RSS content from travel sources</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>🎯 Complete SEO Implementation</h4>
                    <p><strong>Meta Tags & Head Management:</strong></p>
                    <ul>
                      <li><strong>HeadTags.tsx</strong> - Dynamic meta tags using react-helmet-async library</li>
                      <li><strong>SEO.tsx</strong> - Lightweight component for meta tag updates</li>
                      <li><strong>Canonical URLs</strong> - Prevents duplicate content penalties</li>
                      <li><strong>Open Graph tags</strong> - Professional Facebook/LinkedIn link previews</li>
                      <li><strong>Twitter Cards</strong> - Enhanced Twitter/X social sharing</li>
                      <li><strong>Video OG tags</strong> - Social video previews for destination pages</li>
                    </ul>
                    
                    <p><strong>Structured Data (JSON-LD Schema):</strong></p>
                    <ul>
                      <li><strong>Organization Schema</strong> - Business entity with contact info and social profiles</li>
                      <li><strong>Website Schema</strong> - Site search integration for Google</li>
                      <li><strong>Breadcrumb Schema</strong> - Navigation hierarchy for better search results</li>
                      <li><strong>Article Schema</strong> - Blog post metadata with author, date, and images</li>
                    </ul>
                    
                    <p><strong>Technical SEO Features:</strong></p>
                    <ul>
                      <li><strong>XML Sitemap</strong> - Auto-generated from routes in /public/sitemap.xml</li>
                      <li><strong>Robots.txt</strong> - Search engine crawling instructions</li>
                      <li><strong>Clean URL structure</strong> - Human-readable paths like /destinations/kenya</li>
                      <li><strong>Proper heading hierarchy</strong> - Semantic H1/H2/H3 structure throughout</li>
                      <li><strong>Image alt attributes</strong> - Accessibility and SEO descriptions for all images</li>
                      <li><strong>Lazy loading</strong> - Images load on scroll for better performance</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>📱 Mobile & Performance Optimization</h4>
                    <ul>
                      <li><strong>Mobile-first responsive design</strong> - Breakpoints at 768px, 480px, 400px</li>
                      <li><strong>Touch-optimized interactions</strong> - Carousel swiping, tap targets, smooth scrolling</li>
                      <li><strong>Core Web Vitals compliant</strong> - Meets Google's speed and usability standards</li>
                      <li><strong>Advanced image optimization</strong> - Lazy loading, WebP support, responsive sizing</li>
                      <li><strong>Font performance</strong> - Preloaded critical fonts, optimized loading</li>
                      <li><strong>Code splitting</strong> - Vite automatic bundle optimization for faster loads</li>
                      <li><strong>Mobile fixes file</strong> - Isolated ik-mobile-fixes.scss for targeted mobile CSS</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>🔧 Complete Development Setup</h4>
                    <p><strong>Required Prerequisites:</strong></p>
                    <ul>
                      <li><strong>Node.js 18+</strong> - JavaScript runtime environment (download from nodejs.org)</li>
                      <li><strong>pnpm package manager</strong> - MUST use pnpm, not npm or yarn (install: npm install -g pnpm)</li>
                      <li><strong>Git version control</strong> - For code management and deployment</li>
                      <li><strong>VS Code editor</strong> - Recommended with TypeScript and SCSS extensions</li>
                    </ul>
                    
                    <p><strong>Environment Variables (.env file):</strong></p>
                    <ul>
                      <li><strong>VITE_SITE_URL</strong> - Production domain (e.g., https://ikhayakama.com)</li>
                      <li><strong>VITE_GA4_ID</strong> - Google Analytics 4 tracking ID (format: G-XXXXXXXXXX)</li>
                      <li><strong>VITE_GTM_ID</strong> - Google Tag Manager container ID (format: GTM-XXXXXXX)</li>
                      <li><strong>VITE_FB_PIXEL_ID</strong> - Facebook Pixel tracking ID (numbers only)</li>
                    </ul>
                    
                    <p><strong>Development Workflow:</strong></p>
                    <ol>
                      <li>Clone repository and run <code>pnpm install</code></li>
                      <li>Copy .env.example to .env and add tracking IDs</li>
                      <li>Run <code>pnpm run dev</code> for development</li>
                      <li>Make changes and test locally</li>
                      <li>Run <code>pnpm run build</code> to create production build</li>
                      <li>Deploy /dist folder to Netlify</li>
                    </ol>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>📊 Complete Content Management System</h4>
                    <ul>
                      <li><strong>Destinations data:</strong> /src/content/destinations.json - All 8 countries with travel prep, images, themes</li>
                      <li><strong>Blog posts:</strong> /src/content/auto-blog-posts.json - Dynamic blog content storage</li>
                      <li><strong>Brand copy:</strong> /src/content/copy.ts - All website text, taglines, and messaging</li>
                      <li><strong>Blog generator:</strong> simple-blog-update.js - Node.js script for creating sample posts</li>
                      <li><strong>Client content tool:</strong> content-manager.html - Self-service blog creation interface</li>
                      <li><strong>RSS integration:</strong> update-blog.js - Fetches real travel news from external sources</li>
                    </ul>
                    
                    <p><strong>Content Update Process:</strong></p>
                    <ol>
                      <li>Client creates content using content-manager.html</li>
                      <li>Exports JSON and sends to developer</li>
                      <li>Developer adds to appropriate JSON file</li>
                      <li>Rebuild and deploy to update live site</li>
                    </ol>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>🎨 Styling System</h4>
                    <ul>
                      <li><strong>CSS Architecture:</strong> SCSS Modules with global utilities</li>
                      <li><strong>Design Tokens:</strong> /src/styles/tokens.scss</li>
                      <li><strong>Mixins:</strong> /src/styles/mixins.scss</li>
                      <li><strong>Global Styles:</strong> /src/styles/globals.scss</li>
                      <li><strong>Theme System:</strong> CSS custom properties</li>
                      <li><strong>Responsive:</strong> Mobile-first breakpoints</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>🚀 Deployment & Hosting</h4>
                    <p><strong>Netlify Configuration:</strong></p>
                    <ul>
                      <li><strong>Build Command:</strong> pnpm install && pnpm run build</li>
                      <li><strong>Publish Directory:</strong> dist</li>
                      <li><strong>Node Version:</strong> 18</li>
                      <li><strong>SPA Redirects:</strong> /* → /index.html (200)</li>
                    </ul>
                    
                    <p><strong>Domain Setup:</strong></p>
                    <ul>
                      <li><strong>DNS Provider:</strong> Netlify or external</li>
                      <li><strong>SSL:</strong> Auto-provisioned by Netlify</li>
                      <li><strong>CDN:</strong> Global edge caching included</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>🔍 SEO Technical Details</h4>
                    <p><strong>Meta Tag Implementation:</strong></p>
                    <ul>
                      <li><strong>Dynamic Titles:</strong> HeadTags component with react-helmet-async</li>
                      <li><strong>Meta Descriptions:</strong> Per-page SEO configuration</li>
                      <li><strong>Canonical URLs:</strong> Absolute URLs with domain</li>
                      <li><strong>OG Images:</strong> 1200x630px social previews</li>
                      <li><strong>Twitter Cards:</strong> summary_large_image format</li>
                    </ul>
                    
                    <p><strong>Structured Data:</strong></p>
                    <ul>
                      <li><strong>Organization:</strong> Business entity with contact info</li>
                      <li><strong>Website:</strong> Site search integration ready</li>
                      <li><strong>Breadcrumbs:</strong> Navigation hierarchy</li>
                      <li><strong>Articles:</strong> Blog post metadata</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>📝 Content System</h4>
                    <p><strong>Blog Management:</strong></p>
                    <ul>
                      <li><strong>Manual Posts:</strong> Hard-coded in BlogIndex.tsx and BlogPost.tsx</li>
                      <li><strong>Auto Posts:</strong> JSON file updated by scripts</li>
                      <li><strong>Content Manager:</strong> HTML tool for client self-service</li>
                      <li><strong>RSS Integration:</strong> Fetch external travel news</li>
                    </ul>
                    
                    <p><strong>Data Management:</strong></p>
                    <ul>
                      <li><strong>Destinations:</strong> JSON with travel prep, images, themes</li>
                      <li><strong>Copy/Content:</strong> TypeScript object with brand messaging</li>
                      <li><strong>Images:</strong> /public/img/ organized by type</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>🎯 Key Features</h4>
                    <ul>
                      <li><strong>Responsive Design:</strong> Mobile-first with breakpoints</li>
                      <li><strong>Image Carousel:</strong> Touch-friendly destination previews</li>
                      <li><strong>Travel Prep:</strong> Dynamic visa/vaccine information</li>
                      <li><strong>Theme System:</strong> Per-destination color schemes</li>
                      <li><strong>Secret Handbook:</strong> 6-click footer documentation</li>
                      <li><strong>Content Manager:</strong> Client self-service tool</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>🚨 Known Issues & Solutions</h4>
                    <ul>
                      <li><strong>GitHub Actions disabled:</strong> Module conflicts resolved by using manual blog scripts instead</li>
                      <li><strong>Blog system approach:</strong> Use simple-blog-update.js and content-manager.html rather than automation</li>
                      <li><strong>Safari compatibility:</strong> Added -webkit-backdrop-filter vendor prefix for iOS/macOS</li>
                      <li><strong>ARIA accessibility:</strong> Fixed string literals for screen reader compatibility</li>
                      <li><strong>Mobile carousel:</strong> Isolated fixes in ik-mobile-fixes.scss to prevent desktop regressions</li>
                      <li><strong>Image cropping:</strong> Specific positioning for 4 tall destination images with baked-in titles</li>
                    </ul>
                  </div>
                  
                  <div className={styles.seoSection}>
                    <h4>📞 Complete Developer Handoff Information</h4>
                    <p><strong>Project History:</strong> Client paid $700 for complete website build (incredible value vs. $5K-15K industry standard)</p>
                    
                    <p><strong>Ongoing Service Rates:</strong></p>
                    <ul>
                      <li><strong>Blog post creation:</strong> $50 per post (write, optimize, and publish)</li>
                      <li><strong>Unlimited content management:</strong> $150 per month (all blog posts and updates)</li>
                      <li><strong>General updates and changes:</strong> $75 per hour (design tweaks, feature additions)</li>
                      <li><strong>Analytics and tracking setup:</strong> $100 one-time fee (GA4, Facebook Pixel, etc.)</li>
                      <li><strong>Emergency support:</strong> 2-4 hour response time for critical issues</li>
                      <li><strong>SEO optimization:</strong> $200 per month for advanced search ranking</li>
                    </ul>
                    
                    <p><strong>Client Contact Information:</strong></p>
                    <ul>
                      <li><strong>Email:</strong> KG@Ikhayakama.com</li>
                      <li><strong>Phone (US):</strong> +1 (202) 699-1940</li>
                      <li><strong>Phone (South Africa):</strong> +27 78 430 6704</li>
                      <li><strong>WhatsApp:</strong> +1 (202) 699-1940</li>
                      <li><strong>Business:</strong> Ikhaya KaMa Vacations (African travel experiences)</li>
                    </ul>
                    
                    <p><strong>Support Expectations:</strong> Client expects professional service, clear communication, and fair pricing. Website is their primary business tool for attracting safari customers.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
