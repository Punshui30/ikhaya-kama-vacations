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
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
