import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import NytorgetGuide from '../components/NytorgetGuide';

const GuidePage: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Hem",
        "item": "https://nytorgsstraket.se/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guide",
        "item": "https://nytorgsstraket.se/om-nytorget"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col">
      <SEO 
        title="Om Nytorget | En Komplett Guide till SoFos Hjärta"
        description="Utforska Nytorget på Södermalm. Upptäck historien, lekparken, gräsytorna och de bästa platserna runtomkring Stockholms mest levande torg."
        keywords="Nytorget, SoFo, Södermalm, guide, Nytorgsstråket, Stockholm, historia"
        canonical="/om-nytorget"
        schema={schema}
      />
      <Navbar theme="dark" />

      <main className="flex-grow pt-24 pb-16">
        <NytorgetGuide />
      </main>

      <Footer />
    </div>
  );
};

export default GuidePage;
