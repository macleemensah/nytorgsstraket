import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Discover from '../components/Discover';
import FeaturedPlaces from '../components/FeaturedPlaces';
import Events from '../components/Events';
import About from '../components/About';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function HomePage() {
  const { i18n } = useTranslation();
  const isSv = i18n.language === 'sv';

  const schema = {
    "@context": "https://schema.org",
    "@type": "ShoppingCenter",
    "name": "Nytorgsstråket",
    "description": isSv 
      ? "Stockholms mest levande shoppingstråk på Södermalm. Unika butiker, kaféer och mat & dryck i SoFo."
      : "Stockholm's most vibrant shopping street in Södermalm. Unique stores, cafes, and dining in SoFo.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nytorgsgatan",
      "addressLocality": "Stockholm",
      "postalCode": "11640",
      "addressCountry": "SE"
    }
  };

  return (
    <>
      <SEO 
        title={isSv ? "Nytorgsstråket | Södermalms Bästa Shopping & Kaféer" : "Nytorgsstråket | Södermalm's Best Shopping & Cafes"}
        description={isSv 
          ? "Upptäck Nytorgsstråket i SoFo. En unik samling av handplockade butiker, mysiga kaféer och populära restauranger på Nytorgsgatan, Södermalm."
          : "Discover Nytorgsstråket in SoFo. A unique collection of hand-picked boutiques, cozy cafes, and popular restaurants on Nytorgsgatan, Södermalm."}
        canonical="/"
        schema={schema}
      />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Discover />
        <FeaturedPlaces />
        <Events />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
