import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";

import HomePage from './pages/HomePage';
import PlaceDetail from './pages/PlaceDetail';
import CategoryPage from './pages/CategoryPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-bg-paper text-text-dark font-din selection:bg-selection selection:text-text-dark antialiased">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plats/:slug" element={<PlaceDetail />} />
          <Route path="/kategori/:slug" element={<CategoryPage />} />
          <Route path="/evenemang" element={<EventsPage />} />
          <Route path="/evenemang/:slug" element={<EventDetail />} />
          <Route path="/integritetspolicy" element={<PrivacyPage />} />
          <Route path="/anvandarvillkor" element={<TermsPage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}

export default App;
