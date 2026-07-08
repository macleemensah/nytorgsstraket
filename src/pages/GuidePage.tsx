import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import NytorgetGuide from '../components/NytorgetGuide';

const GuidePage: React.FC = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Hem", "item": "https://nytorgsstraket.se/" },
        { "@type": "ListItem", "position": 2, "name": "Guide till Nytorget", "item": "https://nytorgsstraket.se/om-nytorget" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Guide till Nytorget — Shopping, Kaféer & Kultur i SoFo",
      "description": "Komplett guide till Nytorgsstråket vid Nytorget i SoFo, Södermalm. Historia, transport, årstider, evenemang och allt du behöver veta.",
      "url": "https://nytorgsstraket.se/om-nytorget",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": "Nytorgsstråket",
        "url": "https://nytorgsstraket.se"
      },
      "about": {
        "@type": "TouristAttraction",
        "name": "Nytorgsstråket",
        "description": "Shoppingdestination längs Nytorgsgatan i SoFo-kvarteret på Södermalm i Stockholm.",
        "url": "https://nytorgsstraket.se",
        "sameAs": [
          "https://www.wikidata.org/wiki/Q140329758",
          "https://sv.wikipedia.org/wiki/Nytorgsstråket"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nytorgsgatan",
          "addressLocality": "Stockholm",
          "postalCode": "11640",
          "addressCountry": "SE"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": "Nytorget",
      "description": "Historiskt och levande torg i hjärtat av SoFo på Södermalm i Stockholm, omgivet av Nytorgsstråkets butiker, kaféer och restauranger.",
      "url": "https://nytorgsstraket.se/om-nytorget",
      "sameAs": [
        "https://sv.wikipedia.org/wiki/Nytorget",
        "https://www.wikidata.org/wiki/Q10605051"
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 59.3155,
        "longitude": 18.0774
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nytorget",
        "addressLocality": "Stockholm",
        "postalCode": "11640",
        "addressCountry": "SE"
      },
      "publicAccess": true,
      "isAccessibleForFree": true
    }
  ];

  return (
    <div className="min-h-screen bg-bg-paper flex flex-col">
      <SEO
        title="Guide till Nytorget | Shopping, Kaféer & Kultur i SoFo Södermalm"
        description="Komplett guide till Nytorgsstråket vid Nytorget i SoFo, Södermalm. Historia, hitta hit, årstider, evenemang och allt du behöver veta om Stockholms mest levande kvarter."
        keywords="nytorget guide, nytorgsstråket, sofo södermalm, vad göra nytorget, shopping sofo, kaféer nytorget, nytorgsfesten, axel landquists park"
        canonical="/om-nytorget"
        schema={schema}
      />
      <Navbar theme="dark" />
      <main className="flex-grow">
        <NytorgetGuide />
      </main>
      <Footer />
    </div>
  );
};

export default GuidePage;
