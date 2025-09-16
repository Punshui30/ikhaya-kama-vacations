import React, { useState } from 'react';
import Section from '../components/Section';
import styles from './CustomItineraries.module.scss';

const CustomItineraries: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    duration: '',
    travelers: '',
    budget: '',
    interests: [] as string[],
    destinations: [] as string[],
    specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleDestinationChange = (destination: string) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destination)
        ? prev.destinations.filter(d => d !== destination)
        : [...prev.destinations, destination]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Custom itinerary request:', formData);
  };

  const interests = [
    'Wildlife Safari',
    'Cultural Experiences',
    'Adventure Activities',
    'Beach & Relaxation',
    'Food & Wine',
    'Photography',
    'History & Heritage',
    'Hiking & Nature'
  ];

  const destinations = [
    'South Africa',
    'Kenya',
    'Tanzania',
    'Namibia'
  ];

  return (
    <div className={styles.customItineraries}>
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Custom Itineraries</h1>
          <p className={styles.heroSubtitle}>
            Let us craft the perfect African adventure tailored specifically to your dreams, interests, and budget.
          </p>
        </div>
      </Section>

      <Section padding="large">
        <div className={styles.content}>
          <div className={styles.intro}>
            <h2 className={styles.sectionTitle}>Your Dream, Our Expertise</h2>
            <p className={styles.introText}>
              Every great journey begins with a conversation. Tell us about your vision, and we'll create an 
              itinerary that exceeds your expectations while staying true to the authentic spirit of Africa.
            </p>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Tell Us About Your Dream Trip</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Full Name *</label>
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
                  <label htmlFor="email" className={styles.label}>Email Address *</label>
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
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
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
                  <label htmlFor="travelDates" className={styles.label}>Preferred Travel Dates</label>
                  <input
                    type="text"
                    id="travelDates"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleChange}
                    placeholder="e.g., March 2024 or Flexible"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="duration" className={styles.label}>Trip Duration *</label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className={styles.select}
                  >
                    <option value="">Select duration</option>
                    <option value="3-5 days">3-5 days</option>
                    <option value="1 week">1 week</option>
                    <option value="10 days">10 days</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="3 weeks">3 weeks</option>
                    <option value="1 month+">1 month or more</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="travelers" className={styles.label}>Number of Travelers *</label>
                  <select
                    id="travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    required
                    className={styles.select}
                  >
                    <option value="">Select number</option>
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3-4">3-4 people</option>
                    <option value="5-6">5-6 people</option>
                    <option value="7-10">7-10 people</option>
                    <option value="10+">10+ people</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="budget" className={styles.label}>Budget Range (per person)</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select budget range</option>
                  <option value="Under $2,000">Under $2,000</option>
                  <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                  <option value="$20,000+">$20,000+</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>Interests (select all that apply)</label>
                <div className={styles.checkboxGrid}>
                  {interests.map(interest => (
                    <label key={interest} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxText}>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>Destinations of Interest (select all that apply)</label>
                <div className={styles.checkboxGrid}>
                  {destinations.map(destination => (
                    <label key={destination} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={formData.destinations.includes(destination)}
                        onChange={() => handleDestinationChange(destination)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxText}>{destination}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="specialRequests" className={styles.label}>Special Requests or Notes</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about any special requirements, celebrations, or specific experiences you're hoping for..."
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Request Custom Itinerary
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CustomItineraries;
