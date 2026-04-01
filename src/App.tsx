import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";

import HomePage from './pages/HomePage';
import PlaceDetail from './pages/PlaceDetail';
import CategoryPage from './pages/CategoryPage';
import UnderConstruction from './components/UnderConstruction';
import './index.css';

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
    <div className="min-h-screen bg-bg-paper text-text-dark font-din selection:bg-selection selection:text-text-dark antialiased">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plats/:slug" element={<PlaceDetail />} />
          <Route path="/kategori/:slug" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}

export default App;
