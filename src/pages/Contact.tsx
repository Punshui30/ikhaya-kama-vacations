import React, { useState } from 'react';
import Section from '../components/Section';
import HeadTags from '../components/HeadTags';
import styles from './Contact.module.scss';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className={`${styles.contact} page-contact`}>
      <HeadTags 
        seo={{
          title: "Contact Us - Plan Your African Adventure | Ikhaya KaMa Vacations",
          description: "Ready to start your African adventure? Contact Ikhaya KaMa Vacations to plan your perfect luxury safari experience. Get in touch today!",
          path: "/contact",
          ogImage: "/og/contact.jpg",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" }
          ]
        }}
      />
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroSubtitle}>
            Ready to start your African adventure? We'd love to hear from you and help plan your perfect journey.
          </p>
        </div>
      </Section>

      <Section padding="large">
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <h2 className={styles.sectionTitle}>Let's Connect</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📧</div>
                <h3 className={styles.infoTitle}>Email</h3>
                <p className={styles.infoText}>hello@ikhayakama.com</p>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📱</div>
                <h3 className={styles.infoTitle}>WhatsApp</h3>
                <p className={styles.infoText}>+27 82 123 4567</p>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📍</div>
                <h3 className={styles.infoTitle}>Location</h3>
                <p className={styles.infoText}>Cape Town, South Africa</p>
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            <h2 className={styles.sectionTitle}>Send us a Message</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="interest" className={styles.label}>Interest</label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">Select an option</option>
                    <option value="custom-trip">Custom Trip</option>
                    <option value="group-travel">Group Travel</option>
                    <option value="family-trip">Family Trip</option>
                    <option value="honeymoon">Honeymoon</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={styles.textarea}
                  placeholder="Tell us about your dream African adventure..."
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
