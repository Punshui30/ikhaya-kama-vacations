import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTheme: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove all existing page classes from body
    const body = document.body;
    const pageClasses = [
      'page-home',
      'page-story', 
      'page-destinations',
      'page-services',
      'page-blog',
      'page-contact',
      'page-planner',
      'page-travel-prep',
      'page-custom-itineraries',
      'page-story-explorer'
    ];
    
    pageClasses.forEach(className => {
      body.classList.remove(className);
    });

    // Add the appropriate page class based on current route
    const path = location.pathname;
    let pageClass = '';

    if (path === '/') {
      pageClass = 'page-home';
    } else if (path.startsWith('/story')) {
      pageClass = 'page-story';
    } else if (path.startsWith('/destinations')) {
      pageClass = 'page-destinations';
    } else if (path.startsWith('/services')) {
      pageClass = 'page-services';
    } else if (path.startsWith('/blog')) {
      pageClass = 'page-blog';
    } else if (path.startsWith('/contact')) {
      pageClass = 'page-contact';
    } else if (path.startsWith('/planner')) {
      pageClass = 'page-planner';
    } else if (path.startsWith('/travel-prep')) {
      pageClass = 'page-travel-prep';
    } else if (path.startsWith('/custom-itineraries')) {
      pageClass = 'page-custom-itineraries';
    } else if (path.startsWith('/story-explorer')) {
      pageClass = 'page-story-explorer';
    }

    if (pageClass) {
      body.classList.add(pageClass);
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      if (pageClass) {
        body.classList.remove(pageClass);
      }
    };
  }, [location.pathname]);

  return null;
};

export default PageTheme;
