import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import { activitiesCatalog, Activity } from '../content/activitiesCatalog';
import styles from './Planner.module.scss';

interface ItineraryItem {
  id: string;
  activity: Activity;
  day: number;
  time: string;
  notes: string;
}

const Planner: React.FC = () => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDay] = useState(1);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ikhaya-itinerary');
    if (saved) {
      try {
        setItinerary(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved itinerary:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ikhaya-itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  const categories = ['all', 'wildlife', 'culture', 'adventure', 'relaxation', 'dining', 'shopping'];
  
  const filteredActivities = activitiesCatalog.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToItinerary = (activity: Activity) => {
    const newItem: ItineraryItem = {
      id: `${activity.id}-${Date.now()}`,
      activity,
      day: currentDay,
      time: '09:00',
      notes: ''
    };
    setItinerary([...itinerary, newItem]);
  };

  const removeFromItinerary = (id: string) => {
    setItinerary(itinerary.filter(item => item.id !== id));
  };

  const updateItineraryItem = (id: string, updates: Partial<ItineraryItem>) => {
    setItinerary(itinerary.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const exportToPDF = () => {
    // This would integrate with jsPDF
    console.log('Exporting to PDF...', itinerary);
  };

  const exportToICS = () => {
    // This would integrate with ics library
    console.log('Exporting to ICS...', itinerary);
  };

  const totalCost = itinerary.reduce((sum, item) => sum + item.activity.price, 0);
  const totalDuration = itinerary.reduce((sum, item) => sum + item.activity.duration, 0);

  return (
    <div className={`${styles.planner} page-planner`}>
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Plan Your African Adventure</h1>
          <p className={styles.heroSubtitle}>
            Build your perfect itinerary with our curated activities and experiences.
          </p>
        </div>
      </Section>

      <Section padding="large">
        <div className={styles.plannerContainer}>
          <div className={styles.sidebar}>
            <div className={styles.filters}>
              <h3 className={styles.filterTitle}>Filter Activities</h3>
              <div className={styles.categoryFilters}>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.activitiesList}>
              <h3 className={styles.activitiesTitle}>Available Activities</h3>
              <div className={styles.activities}>
                {filteredActivities.map(activity => (
                  <div key={activity.id} className={styles.activityCard}>
                    <div className={styles.activityHeader}>
                      <h4 className={styles.activityName}>{activity.name}</h4>
                      <span className={styles.activityPrice}>${activity.price}</span>
                    </div>
                    <p className={styles.activityDescription}>{activity.description}</p>
                    <div className={styles.activityMeta}>
                      <span className={styles.activityDuration}>{activity.duration}h</span>
                      <span className={styles.activityLocation}>{activity.location}</span>
                    </div>
                    <button
                      onClick={() => addToItinerary(activity)}
                      className={styles.addButton}
                    >
                      Add to Itinerary
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.itineraryHeader}>
              <h2 className={styles.itineraryTitle}>Your Itinerary</h2>
              <div className={styles.itineraryStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{itinerary.length}</span>
                  <span className={styles.statLabel}>Activities</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{totalDuration}h</span>
                  <span className={styles.statLabel}>Total Time</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>${totalCost}</span>
                  <span className={styles.statLabel}>Total Cost</span>
                </div>
              </div>
            </div>

            <div className={styles.itineraryContent}>
              {itinerary.length === 0 ? (
                <div className={styles.emptyState}>
                  <h3>Your itinerary is empty</h3>
                  <p>Start adding activities from the sidebar to build your perfect African adventure.</p>
                </div>
              ) : (
                <div className={styles.itineraryList}>
                  {itinerary.map(item => (
                    <div key={item.id} className={styles.itineraryItem}>
                      <div className={styles.itemHeader}>
                        <div className={styles.itemInfo}>
                          <h4 className={styles.itemName}>{item.activity.name}</h4>
                          <p className={styles.itemLocation}>{item.activity.location}</p>
                        </div>
                        <div className={styles.itemActions}>
                          <span className={styles.itemPrice}>${item.activity.price}</span>
                          <button
                            onClick={() => removeFromItinerary(item.id)}
                            className={styles.removeButton}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className={styles.itemDetails}>
                        <div className={styles.itemMeta}>
                          <span>Day {item.day}</span>
                          <span>{item.activity.duration}h</span>
                          <span>{item.activity.difficulty}</span>
                        </div>
                        <textarea
                          value={item.notes}
                          onChange={(e) => updateItineraryItem(item.id, { notes: e.target.value })}
                          placeholder="Add notes..."
                          className={styles.itemNotes}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {itinerary.length > 0 && (
              <div className={styles.exportSection}>
                <h3 className={styles.exportTitle}>Export Your Itinerary</h3>
                <div className={styles.exportButtons}>
                  <button onClick={exportToPDF} className={styles.exportButton}>
                    Export PDF
                  </button>
                  <button onClick={exportToICS} className={styles.exportButton}>
                    Export Calendar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Planner;
