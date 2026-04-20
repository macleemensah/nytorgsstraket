import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ_SV = [
  {
    q: "Vilka kaféer finns det längs Nytorgsgatan?",
    a: "Nytorgsstråket har flera uppskattade kaféer. Lykke på Nytorgsgatan 38 är ett av Södermalms mest älskade, med specialkaffe från eget rosteri, frukost hela dagen och bar på kvällen. Capanna Verde erbjuder handgjord italiensk gelato och ett mysigt fikahäng. 6/5/4 har dessutom ett eget café med ekologiskt kaffe i sin surf- och livsstilsbutik."
  },
  {
    q: "Vilka butiker finns på Nytorgsgatan i SoFo?",
    a: "Stråket erbjuder ett brett och noga kurerat utbud: A.P.C. för minimalistiskt franskt mode, Aesop för premiumprodukter för hud och hår, House of Tell med Céline, The Row och Acne Studios, Pärlans Konfektyr för handgjord kolakonfekt, Klättermusen Verkstad för vintage friluftskläder, Bladverket för snittblommor och krukväxter, samt Stadsmissionen för vintage- och secondhandfynd."
  },
  {
    q: "Vilka restauranger finns nära Nytorget på Södermalm?",
    a: "Nytorgsstråket har ett imponerande restaurangutbud. Urban Deli vid Nytorget kombinerar restaurang, bar och saluhall. Nytorget 6 serverar rustik europeisk mat i social atmosfär. Meatballs for the People på Nytorgsgatan 30 är världens mest hyllat köttbullekoncept. PS Matsal (ons-lör) erbjuder en intim avsmakningsmeny. Retro är den perfekta sportbaren och afterwork-destinationen."
  },
  {
    q: "Vad händer under Nytorgsfesten?",
    a: "Nytorgsfesten är Stockholms finaste kvartersfest och återkommer 14–16 augusti 2026. Under tre dagar fylls Nytorget och Nytorgsgatan av karnevaltåg, glassfestival, loppis, livemusik och folkfest. Det är ett av Södermalms mest uppskattade evenemang och ett perfekt tillfälle att uppleva alla butiker, restauranger och kaféer längs stråket."
  },
  {
    q: "Finns det hållbara och etiska alternativ längs Nytorgsstråket?",
    a: "Ja! Stockholms Stadsmissionen på Nytorgsgatan 44 är ett välkurerat secondhandkoncept för mode och inredning – varje köp stödjer deras sociala arbete. Klättermusen Verkstad säljer vintage friluftsprylar och hållbara alternativ. Bladverket arbetar med säsongens naturliga blommor och växter, och Lykke serverar ekologiskt och närodlat."
  }
];

const FAQ_EN = [
  {
    q: "What cafes are there along Nytorgsgatan?",
    a: "Nytorgsstråket has several beloved cafes. Lykke at Nytorgsgatan 38 is one of Södermalm's most cherished spots, with specialty coffee from their own roastery, all-day breakfast and a bar in the evenings. Capanna Verde serves artisan Italian gelato in a cozy setting. 6/5/4 also has its own cafe with organic coffee inside their surf and lifestyle store."
  },
  {
    q: "What stores are on Nytorgsgatan in SoFo?",
    a: "The street offers a carefully curated mix: A.P.C. for minimalist French fashion, Aesop for premium skin and hair products, House of Tell with Céline, The Row and Acne Studios, Pärlans Konfektyr for handmade caramel confectionery, Klättermusen Verkstad for vintage outdoor gear, Bladverket for cut flowers and plants, and Stadsmissionen for vintage and secondhand fashion."
  },
  {
    q: "What restaurants are near Nytorget in Södermalm?",
    a: "Nytorgsstråket has an impressive dining scene. Urban Deli at Nytorget combines restaurant, bar and food hall. Nytorget 6 serves rustic European dishes in a social atmosphere. Meatballs for the People on Nytorgsgatan 30 is the world's most acclaimed meatball concept. PS Matsal (Wed–Sat) offers an intimate tasting menu. Retro is the go-to sports bar and after-work destination."
  },
  {
    q: "What happens during Nytorgsfesten?",
    a: "Nytorgsfesten is Stockholm's finest neighborhood festival, returning 14–16 August 2026. Over three days, Nytorget and Nytorgsgatan fill with carnival processions, a gelato festival, flea market, live music and street festivities. It's one of Södermalm's most beloved events and a perfect opportunity to experience all the stores, restaurants and cafes along the stråk."
  },
  {
    q: "Are there sustainable and ethical options along Nytorgsstråket?",
    a: "Yes! Stockholms Stadsmissionen at Nytorgsgatan 44 is a curated secondhand concept for fashion and interior design — every purchase supports their social work. Klättermusen Verkstad sells vintage outdoor gear and sustainable alternatives. Bladverket works with seasonal natural flowers and plants, and Lykke serves organic and locally sourced produce."
  }
];

const FAQ: React.FC = () => {
  const { i18n } = useTranslation();
  const isSv = i18n.language === 'sv';
  const faqs = isSv ? FAQ_SV : FAQ_EN;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-bg-paper py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Label */}
        <p className="text-xs tracking-[0.2em] uppercase text-brand-red font-din mb-4">
          {isSv ? 'Vanliga frågor' : 'Frequently Asked'}
        </p>
        <h2 className="font-orpheus text-4xl md:text-5xl font-light text-text-dark mb-12 leading-tight">
          {isSv ? 'Allt du behöver veta om Nytorgsstråket.' : 'Everything you need to know about Nytorgsstråket.'}
        </h2>

        {/* FAQ Items */}
        <div className="divide-y divide-text-dark/10">
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <button
                onClick={() => toggle(i)}
                className="flex w-full justify-between items-start text-left gap-6 group"
                aria-expanded={openIndex === i}
              >
                <span className="font-orpheus text-lg md:text-xl font-light text-text-dark group-hover:text-brand-red transition-colors duration-200 leading-snug">
                  {faq.q}
                </span>
                <span
                  className="mt-1 shrink-0 w-6 h-6 flex items-center justify-center text-text-dark/40 transition-transform duration-300"
                  style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"/>
                    <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIndex === i ? '400px' : '0px', opacity: openIndex === i ? 1 : 0 }}
              >
                <p className="pt-4 font-din text-base text-text-dark/70 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
