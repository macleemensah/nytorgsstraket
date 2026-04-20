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
    { q: "Vilka kaféer finns det längs Nytorgsgatan?", a: "Lykke på Nytorgsgatan 38 har specialkaffe från eget rosteri och frukost hela dagen. Capanna Verde serverar handgjord italiensk gelato. 6/5/4 erbjuder ekologiskt kaffe i sin surf- och livsstilsbutik." },
    { q: "Vilka butiker finns på Nytorgsgatan i SoFo?", a: "A.P.C., Aesop, House of Tell, Pärlans Konfektyr, Klättermusen Verkstad, Bladverket och Stadsmissionen är några av butikerna längs stråket." },
    { q: "Vilka restauranger finns nära Nytorget på Södermalm?", a: "Urban Deli, Nytorget 6, Meatballs for the People, PS Matsal och Retro erbjuder allt från saluhall till intim avsmakningsmeny." },
    { q: "Vad händer under Nytorgsfesten?", a: "Nytorgsfesten är Stockholms finaste kvartersfest, 14–16 augusti 2026, med karnevaltåg, glassfestival, loppis och livemusik." },
    { q: "Finns det hållbara alternativ längs Nytorgsstråket?", a: "Stadsmissionen, Klättermusen Verkstad och Bladverket är exempel på aktörer med fokus på hållbarhet och etik." }
  ];
  const faqItemsEn = [
    { q: "What cafes are there along Nytorgsgatan?", a: "Lykke at Nytorgsgatan 38 has specialty coffee and all-day breakfast. Capanna Verde serves artisan Italian gelato. 6/5/4 offers organic coffee inside their surf and lifestyle store." },
    { q: "What stores are on Nytorgsgatan in SoFo?", a: "A.P.C., Aesop, House of Tell, Pärlans Konfektyr, Klättermusen Verkstad, Bladverket and Stadsmissionen are among the stores along the stråk." },
    { q: "What restaurants are near Nytorget in Södermalm?", a: "Urban Deli, Nytorget 6, Meatballs for the People, PS Matsal and Retro offer everything from a food hall to an intimate tasting menu." },
    { q: "What happens during Nytorgsfesten?", a: "Nytorgsfesten is Stockholm's finest neighborhood festival, 14–16 August 2026, with carnival processions, a gelato festival, flea market and live music." },
    { q: "Are there sustainable options along Nytorgsstråket?", a: "Stadsmissionen, Klättermusen Verkstad and Bladverket are examples of venues with a focus on sustainability and ethics." }
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
