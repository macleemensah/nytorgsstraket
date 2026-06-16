import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import NytorgetGuide from '../components/NytorgetGuide';

const GuidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-paper flex flex-col">
      <SEO 
        title="Om Nytorget | Din kompletta guide till SoFo Södermalm"
        description="Läs vår kompletta guide om Nytorget i SoFo, Södermalm. Upptäck historien, stämningen och allt som Nytorgsstråket har att erbjuda i hjärtat av Stockholm."
        keywords="Nytorget, SoFo, Södermalm, guide, Nytorgsstråket, Stockholm, historia"
        canonical="/om-nytorget"
      />
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <NytorgetGuide />
      </main>

      <Footer />
    </div>
  );
};

export default GuidePage;
