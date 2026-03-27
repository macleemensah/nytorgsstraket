import { useState, useEffect } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Discover from './components/Discover';
import FeaturedPlaces from './components/FeaturedPlaces';
import Events from './components/Events';
import ExploreStreet from './components/ExploreStreet';
import Footer from './components/Footer';

import { Analytics } from "@vercel/analytics/react";
import UnderConstruction from './components/UnderConstruction';

function App() {
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // If you visit ?dev=nytg it unlocks the website for your browser
    if (window.location.search.includes('dev=nytg')) {
      localStorage.setItem('unlocked', 'true');
    }
    
    // Check if the browser has previously unlocked the site
    if (localStorage.getItem('unlocked') === 'true') {
      setIsDevMode(true);
    }
  }, []);

  if (!isDevMode) {
    return <UnderConstruction />;
  }

  return (
    <div className="min-h-screen bg-bg-paper">
      <Navbar />
      <main>
        <Hero />
        <Discover />
        <FeaturedPlaces />
        <Events />
        <ExploreStreet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
