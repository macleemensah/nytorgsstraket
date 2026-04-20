import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Discover from '../components/Discover';
import FeaturedPlaces from '../components/FeaturedPlaces';
import Events from '../components/Events';
import About from '../components/About';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function HomePage() {
  const { i18n } = useTranslation();
  const isSv = i18n.language === 'sv';

  const faqItemsSv = [
    { q: "Vad finns det för shopping i SoFo på Södermalm?", a: "Längs Nytorgsstråket och Nytorgsgatan i SoFo hittar du oberoende butiker med mode, vintage, inredning och lokala varumärken." },
    { q: "Vilka kaféer finns det nära Nytorget på Södermalm?", a: "Stråket runt Nytorgsgatan har flera av Stockholms bästa specialkaféer med handbryggt kaffe och ekologiska alternativ." },
    { q: "Vad är SoFo Stockholm?", a: "SoFo (South of Folkungagatan) är ett populärt kvarter på Södermalm känt för oberoende butiker, restauranger och kaféer." },
    { q: "Hur tar man sig till Nytorgsgatan på Södermalm?", a: "Ta tunnelbanan till Medborgarplatsen (Röda linjen) och promenera sedan till Nytorgsgatan i hjärtat av SoFo." },
    { q: "Finns det restauranger längs Nytorgsstråket?", a: "Ja, stråket erbjuder allt från prisbelönta restauranger till avslappnade lunchcaféer." }
  ];
  const faqItemsEn = [
    { q: "What shopping is there in SoFo, Södermalm?", a: "Along Nytorgsstråket and Nytorgsgatan in SoFo, you'll find independent stores with fashion, vintage, interior design, and local brands." },
    { q: "What are the best cafes near Nytorget in Södermalm?", a: "The area around Nytorgsgatan is home to some of Stockholm's best specialty cafes with hand-brewed coffee and organic options." },
    { q: "What is SoFo Stockholm?", a: "SoFo (South of Folkungagatan) is a vibrant neighborhood in Södermalm known for independent stores, restaurants, and cafes." },
    { q: "How do I get to Nytorgsgatan in Södermalm?", a: "Take the metro to Medborgarplatsen (Red line) and walk to Nytorgsgatan in the heart of SoFo." },
    { q: "Are there restaurants along Nytorgsstråket?", a: "Yes, the street offers everything from award-winning restaurants to relaxed lunch cafes." }
  ];
  const faqItems = isSv ? faqItemsSv : faqItemsEn;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a }
        }))
      }
    ]
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
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
