import React, { useState } from 'react';
import Section from '../components/Section';
import styles from './StoryExplorer.module.scss';

const StoryExplorer: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const stories = [
    {
      id: 'kenya',
      title: 'The Great Migration',
      location: 'Maasai Mara, Kenya',
      description: 'Witness the greatest wildlife spectacle on Earth as millions of wildebeest cross the Mara River.',
      coordinates: { x: 65, y: 45 },
      audio: '/audio/kenya-migration.mp3',
      image: '/images/story-explorer/kenya.jpg'
    },
    {
      id: 'south-africa',
      title: 'Freedom\'s Journey',
      location: 'Robben Island, South Africa',
      description: 'Walk in the footsteps of Nelson Mandela and discover the power of resilience and hope.',
      coordinates: { x: 55, y: 75 },
      audio: '/audio/south-africa-freedom.mp3',
      image: '/images/story-explorer/south-africa.jpg'
    },
    {
      id: 'tanzania',
      title: 'Kilimanjaro\'s Call',
      location: 'Mount Kilimanjaro, Tanzania',
      description: 'Conquer Africa\'s highest peak and discover the strength within yourself.',
      coordinates: { x: 70, y: 50 },
      audio: '/audio/tanzania-kilimanjaro.mp3',
      image: '/images/story-explorer/tanzania.jpg'
    },
    {
      id: 'morocco',
      title: 'Desert Dreams',
      location: 'Sahara Desert, Morocco',
      description: 'Experience the magic of the Sahara under a blanket of stars.',
      coordinates: { x: 25, y: 35 },
      audio: '/audio/morocco-sahara.mp3',
      image: '/images/story-explorer/morocco.jpg'
    },
    {
      id: 'botswana',
      title: 'Delta Serenity',
      location: 'Okavango Delta, Botswana',
      description: 'Glide through pristine waterways in the world\'s largest inland delta.',
      coordinates: { x: 60, y: 65 },
      audio: '/audio/botswana-delta.mp3',
      image: '/images/story-explorer/botswana.jpg'
    },
    {
      id: 'namibia',
      title: 'Dunes of Time',
      location: 'Sossusvlei, Namibia',
      description: 'Marvel at the world\'s tallest sand dunes and the endless beauty of the desert.',
      coordinates: { x: 50, y: 70 },
      audio: '/audio/namibia-dunes.mp3',
      image: '/images/story-explorer/namibia.jpg'
    }
  ];

  const handleStoryClick = (storyId: string) => {
    setSelectedStory(selectedStory === storyId ? null : storyId);
  };

  return (
    <div className={styles.storyExplorer}>
      <Section background="dark" padding="large">
        <div className={styles.hero}>
          <div className={styles.videoBackground}>
            <video
              className={styles.heroVideo}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/video/story-explorer-bg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className={styles.videoOverlay}></div>
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Story Explorer</h1>
            <p className={styles.heroSubtitle}>
              Discover Africa through immersive stories, sounds, and experiences. Click on the glowing pins to begin your journey.
            </p>
            <div className={styles.controls}>
              <button
                className={`${styles.muteButton} ${isMuted ? styles.muted : ''}`}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? '🔇' : '🔊'} {isMuted ? 'Unmute' : 'Mute'} Audio
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section padding="large">
        <div className={styles.explorerContainer}>
          <div className={styles.mapContainer}>
            <div className={styles.africaMap}>
              <svg viewBox="0 0 100 100" className={styles.mapSvg}>
                {/* Simplified Africa outline */}
                <path
                  d="M20,80 L15,75 L12,70 L10,65 L8,60 L6,55 L5,50 L4,45 L3,40 L2,35 L3,30 L5,25 L8,20 L12,18 L15,15 L20,12 L25,10 L30,8 L35,6 L40,5 L45,4 L50,3 L55,4 L60,5 L65,6 L70,8 L75,10 L80,12 L85,15 L88,18 L90,20 L92,25 L93,30 L94,35 L95,40 L94,45 L93,50 L92,55 L90,60 L88,65 L85,70 L82,75 L78,80 L73,82 L68,84 L63,85 L58,86 L53,87 L48,88 L43,87 L38,86 L33,85 L28,84 L23,82 Z"
                  fill="var(--brand-1)"
                  opacity="0.1"
                />
                
                {/* Story pins */}
                {stories.map((story) => (
                  <g key={story.id}>
                    <circle
                      cx={story.coordinates.x}
                      cy={story.coordinates.y}
                      r="3"
                      fill={selectedStory === story.id ? 'var(--brand-4)' : 'var(--brand-3)'}
                      className={styles.storyPin}
                      onClick={() => handleStoryClick(story.id)}
                    />
                    <circle
                      cx={story.coordinates.x}
                      cy={story.coordinates.y}
                      r="6"
                      fill="none"
                      stroke={selectedStory === story.id ? 'var(--brand-4)' : 'var(--brand-3)'}
                      strokeWidth="0.5"
                      opacity="0.6"
                      className={styles.pinGlow}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className={styles.storiesPanel}>
            <h2 className={styles.panelTitle}>Stories of Africa</h2>
            <div className={styles.storiesList}>
              {stories.map((story) => (
                <div
                  key={story.id}
                  className={`${styles.storyCard} ${selectedStory === story.id ? styles.selected : ''}`}
                  onClick={() => handleStoryClick(story.id)}
                >
                  <div className={styles.storyImage}>
                    <img src={story.image} alt={story.title} loading="lazy" />
                  </div>
                  <div className={styles.storyContent}>
                    <h3 className={styles.storyTitle}>{story.title}</h3>
                    <p className={styles.storyLocation}>{story.location}</p>
                    <p className={styles.storyDescription}>{story.description}</p>
                    {!isMuted && (
                      <div className={styles.audioPlayer}>
                        <button className={styles.playButton}>▶️ Play Story</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {selectedStory && (
        <div className={styles.storyModal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedStory(null)}
            >
              ×
            </button>
            <div className={styles.modalStory}>
              {(() => {
                const story = stories.find(s => s.id === selectedStory);
                if (!story) return null;
                
                return (
                  <>
                    <div className={styles.modalImage}>
                      <img src={story.image} alt={story.title} />
                    </div>
                    <div className={styles.modalText}>
                      <h2 className={styles.modalTitle}>{story.title}</h2>
                      <p className={styles.modalLocation}>{story.location}</p>
                      <p className={styles.modalDescription}>{story.description}</p>
                      {!isMuted && (
                        <div className={styles.modalAudio}>
                          <audio controls className={styles.audioElement}>
                            <source src={story.audio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryExplorer;
