import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PageTheme from './components/PageTheme';
import Analytics from './components/Analytics';
import { scrollToTopInstant } from './utils/scrollToTop';

// Pages
import Home from './pages/Home';
import Story from './pages/Story';
import DestinationsIndex from './pages/DestinationsIndex';
import DestinationDetail from './pages/DestinationDetail';
import Services from './pages/Services';
import BlogIndex from './pages/BlogIndex';
import Contact from './pages/Contact';
import Planner from './pages/Planner';
import CustomItineraries from './pages/CustomItineraries';
import StoryExplorer from './pages/StoryExplorer';
import TravelPrep from './pages/TravelPrep';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTopInstant();
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <PageTheme />
      <Analytics />
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/destinations" element={<DestinationsIndex />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogIndex />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/custom-itineraries" element={<CustomItineraries />} />
            <Route path="/story-explorer" element={<StoryExplorer />} />
            <Route path="/travel-prep" element={<TravelPrep />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Routes>
          <Route path="/" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
