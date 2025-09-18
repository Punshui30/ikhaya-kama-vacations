import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section';
import SEO from '../components/SEO';
import styles from './BlogPost.module.scss';

// Auto-generated posts will be loaded here when the system runs
// For now, using manual posts only until auto-generation is active
const autoPosts: any[] = [];

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Manual posts (your existing content)
  const manualPosts = [
    {
      id: 1,
      title: "The Great Migration: A Once-in-a-Lifetime Experience",
      excerpt: "Witness one of nature's most spectacular events as millions of wildebeest and zebra cross the Mara River in search of greener pastures.",
      content: `
        <p>Every year, millions of wildebeest, zebras, and gazelles embark on one of nature's most spectacular journeys across the Serengeti-Mara ecosystem. This incredible event, known as the Great Migration, is a testament to the raw power and beauty of the African wilderness.</p>
        
        <h2>The Journey Begins</h2>
        <p>The migration follows a circular route of approximately 1,800 miles, driven by the search for fresh grass and water. From December to March, the herds gather in the southern Serengeti for calving season, where over 400,000 calves are born.</p>
        
        <h2>The River Crossing</h2>
        <p>Perhaps the most dramatic moment comes between July and October when the herds must cross the crocodile-infested Mara River. This perilous journey is fraught with danger, but it's also one of the most incredible wildlife spectacles on Earth.</p>
        
        <h2>Best Viewing Locations</h2>
        <p>At Ikhaya KaMa Vacations, we position our guests at the best vantage points to witness this incredible event. Our expert guides know exactly when and where the crossings will occur, ensuring you don't miss a moment of this once-in-a-lifetime experience.</p>
        
        <p>Ready to witness the Great Migration? Contact us to plan your perfect safari adventure.</p>
      `,
      image: "/images/Tanzania.png",
      category: "Wildlife",
      author: "Sarah Johnson",
      date: "December 15, 2023",
      readTime: "8 min read",
      slug: "great-migration-experience"
    },
    {
      id: 2,
      title: "Cape Town's Hidden Gems: Beyond Table Mountain",
      excerpt: "Discover the secret spots and local favorites that make Cape Town one of Africa's most captivating cities.",
      content: `
        <p>While Table Mountain and the V&A Waterfront are must-sees, Cape Town's true magic lies in its hidden corners and local secrets. Let us guide you beyond the tourist trail to discover the authentic heart of the Mother City.</p>
        
        <h2>Bo-Kaap's Colorful Streets</h2>
        <p>Beyond the Instagram-famous colorful houses lies a rich Cape Malay heritage. Visit during the early morning to experience the call to prayer and smell the spices from local kitchens.</p>
        
        <h2>Kirstenbosch at Sunset</h2>
        <p>Skip the crowded daytime visits. Arrive at golden hour when the proteas glow and the city lights begin to twinkle below. It's pure magic.</p>
        
        <h2>Local Wine Bars</h2>
        <p>Forget the touristy wine tours. Head to Publik Wine Bar in the city center or The Pot Luck Club for wines that locals actually drink, paired with incredible views.</p>
        
        <p>Ready to explore Cape Town like a local? Let Ikhaya KaMa show you the real Mother City.</p>
      `,
      image: "/images/SouthAfrica.png",
      category: "Culture",
      author: "Michael Chen",
      date: "December 10, 2023",
      readTime: "6 min read",
      slug: "cape-town-hidden-gems"
    },
    {
      id: 3,
      title: "Safari Packing Essentials: What to Bring to Africa",
      excerpt: "From the right clothing to essential gear, here's everything you need for the perfect African safari adventure.",
      content: `
        <p>Packing for an African safari can feel overwhelming, but with the right preparation, you'll be ready for anything the wilderness throws your way. Here's your complete packing guide from the experts at Ikhaya KaMa Vacations.</p>
        
        <h2>Clothing Essentials</h2>
        <ul>
          <li><strong>Neutral colors:</strong> Khaki, olive, and beige blend with the environment</li>
          <li><strong>Long sleeves:</strong> Protection from sun and insects</li>
          <li><strong>Lightweight fabrics:</strong> Breathable cotton and moisture-wicking materials</li>
          <li><strong>Warm layers:</strong> Early morning game drives can be surprisingly cold</li>
        </ul>
        
        <h2>Essential Gear</h2>
        <ul>
          <li><strong>Binoculars:</strong> 8x42 or 10x42 for wildlife viewing</li>
          <li><strong>Camera with zoom lens:</strong> Capture those once-in-a-lifetime moments</li>
          <li><strong>Sun protection:</strong> Hat, sunglasses, and high-SPF sunscreen</li>
          <li><strong>Insect repellent:</strong> DEET-based for effective protection</li>
        </ul>
        
        <h2>What NOT to Pack</h2>
        <p>Avoid bright colors, especially white (shows dirt) and blue (attracts tsetse flies). Leave the perfume at home - strong scents can disturb wildlife.</p>
        
        <p>Let us help you prepare for your African adventure. Our detailed packing lists ensure you're ready for anything!</p>
      `,
      image: "/images/Kenya.png",
      category: "Travel Tips",
      author: "Lisa Rodriguez",
      date: "December 5, 2023",
      readTime: "10 min read",
      slug: "safari-packing-essentials"
    },
    {
      id: 4,
      title: "Maasai Culture and Tradition: A Deep Dive",
      excerpt: "Learn about the rich cultural heritage of the Maasai people and how to respectfully engage with local communities.",
      content: `
        <p>The Maasai people have maintained their traditional way of life for centuries, living in harmony with the wildlife of East Africa. Understanding and respecting their culture is essential for any meaningful safari experience.</p>
        
        <h2>Traditional Life</h2>
        <p>The Maasai are semi-nomadic pastoralists, moving their cattle according to seasonal patterns. Their distinctive red clothing (called shuka) and intricate beadwork are not just beautiful - they tell stories of age, status, and achievements.</p>
        
        <h2>Cultural Encounters</h2>
        <p>At Ikhaya KaMa, we facilitate authentic cultural exchanges that benefit local communities. Our visits to Maasai villages are arranged with respect and reciprocity, ensuring your tourism dollars support education and healthcare initiatives.</p>
        
        <h2>Respectful Tourism</h2>
        <p>When visiting Maasai communities, remember you're a guest in their home. Ask permission before taking photos, participate in activities with genuine interest, and always travel with guides who have established relationships with the community.</p>
        
        <p>Experience authentic Maasai culture with respect and understanding. Join us for a journey that enriches both you and the communities you visit.</p>
      `,
      image: "/img/destinations/uganda/hero.jpg",
      category: "Culture",
      author: "David Kimani",
      date: "November 28, 2023",
      readTime: "12 min read",
      slug: "maasai-culture-tradition"
    }
  ];

  // Combine auto-generated and manual posts
  const allPosts = [...autoPosts, ...manualPosts];
  
  // Find the specific post
  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className={`${styles.blogPost} page-blog`}>
        <Section background="dark" padding="large">
          <div className={styles.notFound}>
            <h1>Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className={styles.backLink}>
              ← Back to Blog
            </Link>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className={`${styles.blogPost} page-blog`}>
      <SEO 
        title={`${post.title} | Ikhaya KaMa Vacations Blog`}
        description={post.excerpt}
        ogImage={post.image}
        canonical={`https://ikhayakama.com/blog/${post.slug}`}
      />
      
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <Link to="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
          <div className={styles.category}>{post.category}</div>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span className={styles.author}>By {post.author}</span>
            <span className={styles.date}>{post.date}</span>
            <span className={styles.readTime}>{post.readTime}</span>
          </div>
        </div>
      </Section>

      <Section padding="large">
        <article className={styles.content}>
          <div className={styles.featuredImage}>
            <img src={post.image} alt={post.title} />
          </div>
          
          <div className={styles.articleContent}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          <div className={styles.footer}>
            <div className={styles.tags}>
              <span className={styles.tagLabel}>Category:</span>
              <span className={styles.tag}>{post.category}</span>
            </div>
            
            <div className={styles.cta}>
              <h3>Ready for Your African Adventure?</h3>
              <p>Let Ikhaya KaMa Vacations create your perfect African journey.</p>
              <Link to="/contact" className={styles.ctaButton}>
                Plan Your Trip
              </Link>
            </div>
          </div>
        </article>
      </Section>
    </div>
  );
};

export default BlogPost;
