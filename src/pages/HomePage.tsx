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
    { q: "Vilka butiker finns på Nytorgsgatan i SoFo?", a: "A.P.C., House of Tell, Pärlans Konfektyr, Klättermusen Verkstad, Bladverket och Stadsmissionen är några av butikerna längs stråket." },
    { q: "Vilka restauranger finns nära Nytorget på Södermalm?", a: "Urban Deli, Nytorget 6, Meatballs for the People, PS Matsal och Retro erbjuder allt från saluhall till intim avsmakningsmeny." },
    { q: "Vad händer under Nytorgsfesten?", a: "Nytorgsfesten är Stockholms finaste kvartersfest, 14–16 augusti 2026, med karnevaltåg, glassfestival, loppis och livemusik." },
    { q: "Finns det hållbara alternativ längs Nytorgsstråket?", a: "Stadsmissionen, Klättermusen Verkstad och Bladverket är exempel på aktörer med fokus på hållbarhet och etik." }
  ];
  const faqItemsEn = [
    { q: "What cafes are there along Nytorgsgatan?", a: "Lykke at Nytorgsgatan 38 has specialty coffee and all-day breakfast. Capanna Verde serves artisan Italian gelato. 6/5/4 offers organic coffee inside their surf and lifestyle store." },
    { q: "What stores are on Nytorgsgatan in SoFo?", a: "A.P.C., House of Tell, Pärlans Konfektyr, Klättermusen Verkstad, Bladverket and Stadsmissionen are among the stores along the stråk." },
    { q: "What restaurants are near Nytorget in Södermalm?", a: "Urban Deli, Nytorget 6, Meatballs for the People, PS Matsal and Retro offer everything from a food hall to an intimate tasting menu." },
    { q: "What happens during Nytorgsfesten?", a: "Nytorgsfesten is Stockholm's finest neighborhood festival, 14–16 August 2026, with carnival processions, a gelato festival, flea market and live music." },
    { q: "Are there sustainable options along Nytorgsstråket?", a: "Stadsmissionen, Klättermusen Verkstad and Bladverket are examples of venues with a focus on sustainability and ethics." }
  ];
  const faqItems = isSv ? faqItemsSv : faqItemsEn;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Nytorgsstråket",
        "url": "https://nytorgsstraket.se",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://nytorgsstraket.se/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ShoppingCenter",
        "name": "Nytorgsstråket",
        "alternateName": ["Nytorget", "SoFo Stockholm"],
        "description": isSv 
          ? "Stockholms mest levande shoppingstråk vid Nytorget i SoFo, Södermalm. Unika butiker, kaféer och restauranger på Nytorgsgatan."
          : "Stockholm's most vibrant shopping street by Nytorget in SoFo, Södermalm. Unique stores, cafes, and restaurants on Nytorgsgatan.",
        "url": "https://nytorgsstraket.se",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nytorgsgatan",
          "addressLocality": "Stockholm",
          "postalCode": "11640",
          "addressCountry": "SE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 59.3163,
          "longitude": 18.0726
        },
        "hasMap": "https://maps.google.com/?q=Nytorgsgatan+Stockholm",
        "areaServed": [
          { "@type": "Place", "name": "Nytorget" },
          { "@type": "Place", "name": "SoFo" },
          { "@type": "Place", "name": "Södermalm" },
          { "@type": "Place", "name": "Stockholm" }
        ]
      },
      {
        "@type": ["TouristAttraction", "Place"],
        "name": "Nytorget",
        "description": "Nytorget är ett historiskt och levande torg beläget i hjärtat av SoFo på Södermalm i Stockholm. Känd för sina gräsytor, populära lekpark och omgivande kaféer och restauranger.",
        "url": "https://nytorgsstraket.se",
        "sameAs": [
          "https://sv.wikipedia.org/wiki/Nytorget",
          "https://www.wikidata.org/wiki/Q10605051"
        ],
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 59.3163,
          "longitude": 18.0726
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nytorget",
          "addressLocality": "Stockholm",
          "postalCode": "11640",
          "addressCountry": "SE"
        },
        "publicAccess": true,
        "isAccessibleForFree": true,
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": "Lekplats",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Gräsytor för picknick",
            "value": true
          }
        ]
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
        title={isSv ? "Nytorgsstråket | Shopping & Kaféer vid Nytorget i SoFo, Södermalm" : "Nytorgsstråket | Shopping & Cafes by Nytorget in SoFo, Södermalm"}
        description={isSv 
          ? "Upptäck Nytorgsstråket vid Nytorget i SoFo, Södermalm. Handplockade butiker, mysiga kaféer och populära restauranger på Nytorgsgatan i hjärtat av Stockholm."
          : "Discover Nytorgsstråket by Nytorget in SoFo, Södermalm. Hand-picked boutiques, cozy cafes and popular restaurants on Nytorgsgatan in the heart of Stockholm."}
        keywords="nytorget, sofo, södermalm, nytorgsgatan, nytorgsstråket, stockholm shopping, butiker södermalm, kaféer nytorget, restauranger sofo"
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
