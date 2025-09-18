import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import destinations from '../content/destinations.json';
import styles from './TravelPrepPanel.module.scss';

interface TravelPrep {
  visa?: string;
  vaccines?: string[];
  packing?: string[];
  currency?: string;
  etiquette?: string[];
}

interface Weather {
  seasons?: { label: string; summary: string; }[];
}

interface Destination {
  slug: string;
  title: string;
  travelPrep?: TravelPrep;
  weather?: Weather;
}

interface TravelPrepPanelProps {
  destinationSlug?: string;
}

const TravelPrepPanel: React.FC<TravelPrepPanelProps> = ({ destinationSlug }) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [activeTab, setActiveTab] = useState<string>('visa');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (destinationSlug) {
      const destination = destinations.find(d => d.slug === destinationSlug);
      setSelectedDestination(destination || null);
    } else {
      // Load from localStorage or default to first destination
      const saved = localStorage.getItem('ik-travel-prep-selected');
      const destination = destinations.find(d => d.slug === saved) || destinations[0];
      setSelectedDestination(destination);
    }
  }, [destinationSlug]);

  const handleDestinationChange = (slug: string) => {
    const destination = destinations.find(d => d.slug === slug);
    setSelectedDestination(destination || null);
    localStorage.setItem('ik-travel-prep-selected', slug);
  };

  if (!selectedDestination || !selectedDestination.travelPrep) {
    return (
      <div className={styles.panel}>
        <div className={styles.emptyState}>
          <h3>Travel Preparation</h3>
          <p>Travel preparation information is not available for this destination.</p>
        </div>
      </div>
    );
  }

  // Check if this is a placeholder destination - temporarily disabled to show available data
  const isPlaceholder = false; // selectedDestination.travelPrep.visa?.includes('Coming Soon');

  const { travelPrep, weather } = selectedDestination;
  const availableTabs = [];

  if (travelPrep.visa) availableTabs.push({ id: 'visa', label: 'Visa', content: travelPrep.visa });
  if (travelPrep.vaccines) availableTabs.push({ id: 'vaccines', label: 'Vaccines', content: travelPrep.vaccines });
  if (travelPrep.packing) availableTabs.push({ id: 'packing', label: 'Packing', content: travelPrep.packing });
  if (travelPrep.currency) availableTabs.push({ id: 'currency', label: 'Currency', content: travelPrep.currency });
  if (travelPrep.etiquette) availableTabs.push({ id: 'etiquette', label: 'Etiquette', content: travelPrep.etiquette });
  if (weather?.seasons) availableTabs.push({ id: 'weather', label: 'Weather', content: weather.seasons });

  const renderContent = (tab: any) => {
    if (Array.isArray(tab.content)) {
      if (tab.id === 'weather') {
        return (
          <div className={styles.weatherCards}>
            {tab.content.map((season: any, index: number) => (
              <div key={index} className={styles.weatherCard}>
                <h4>{season.label}</h4>
                <p>{season.summary}</p>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <ul className={styles.list}>
            {tab.content.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      }
    } else {
      return <p className={styles.text}>{tab.content}</p>;
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3>Practical Travel Prep</h3>
        {!destinationSlug && (
          <div className={styles.destinationSelector}>
            <label htmlFor="destination-select">Select Destination:</label>
            <select
              id="destination-select"
              value={selectedDestination.slug}
              onChange={(e) => handleDestinationChange(e.target.value)}
              className={styles.select}
            >
              {destinations.map((dest) => (
                <option key={dest.slug} value={dest.slug}>
                  {dest.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {isPlaceholder ? (
        <div className={styles.comingSoonSection}>
          <div className={styles.comingSoonIcon}>🚧</div>
          <h4>Coming Soon</h4>
          <p>Travel preparation information for <strong>{selectedDestination.title}</strong> is currently being developed. Check back soon for comprehensive visa, health, packing, and cultural information!</p>
          <div className={styles.ctaRow}>
            <Link to="/custom-itineraries" className={styles.ctaButton}>
              Get Custom Travel Advice
            </Link>
          </div>
        </div>
      ) : (
        <>
        {isMobile ? (
        // Mobile: Accordion
        <div className={styles.accordion}>
          {availableTabs.map((tab) => (
            <div key={tab.id} className={styles.accordionItem}>
              <button
                className={`${styles.accordionButton} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
                aria-expanded={activeTab === tab.id ? 'true' : 'false'}
                type="button"
              >
                {tab.label}
                <span className={styles.accordionIcon}>
                  {activeTab === tab.id ? '−' : '+'}
                </span>
              </button>
              {activeTab === tab.id && (
                <div className={styles.accordionContent}>
                  {renderContent(tab)}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Desktop: Tabs
        <div className={styles.tabContainer}>
          <div className={styles.tabList} role="tablist">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id ? 'true' : 'false'}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className={styles.tabContent}>
            {availableTabs.map((tab) => (
              <div
                key={tab.id}
                className={`${styles.tabPanel} ${activeTab === tab.id ? styles.active : ''}`}
                role="tabpanel"
                id={`tabpanel-${tab.id}`}
                aria-labelledby={`tab-${tab.id}`}
                hidden={activeTab !== tab.id}
              >
                {renderContent(tab)}
              </div>
            ))}
          </div>
        </div>
      )}

        <div className={styles.ctaRow}>
          <Link to="/custom-itineraries" className={styles.ctaButton}>
            Questions? Plan with us
          </Link>
        </div>
        </>
      )}
    </div>
  );
};

export default TravelPrepPanel;

