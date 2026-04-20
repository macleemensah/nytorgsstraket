import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ_SV = [
  {
    q: "Vad finns det för shopping i SoFo på Södermalm?",
    a: "Längs Nytorgsstråket och Nytorgsgatan i SoFo hittar du ett brett utbud av oberoende butiker med mode, vintage, inredning och lokala varumärken. Här finns unika shoppingupplevelser som du inte hittar på gallerior – från hållbara klädmärken till handgjorda accessoarer och designmöbler."
  },
  {
    q: "Vilka kaféer finns det nära Nytorget på Södermalm?",
    a: "Stråket runt Nytorgsgatan har flera av Stockholms bästa specialkaféer. Du kan njuta av handbryggt kaffe, surdegsbröd och ekologiska alternativ i mysiga miljöer – perfekt för en fika eller en längre lunch i hjärtat av SoFo."
  },
  {
    q: "Vad är SoFo Stockholm?",
    a: "SoFo (South of Folkungagatan) är ett populärt och levande kvarter på Södermalm i Stockholm. Området är känt för sin unika mix av oberoende butiker, restauranger, kaféer och kulturella upplevelser – ett självklart mål för den som vill uppleva det autentiska Stockholmslivet."
  },
  {
    q: "Hur tar man sig till Nytorgsgatan på Södermalm?",
    a: "Nytorgsgatan ligger centralt på Södermalm och nås enkelt med tunnelbana till Medborgarplatsen (Röda linjen) eller buss. Därifrån är det en kort promenad till hjärtat av SoFo och Nytorgsstråket."
  },
  {
    q: "Finns det restauranger längs Nytorgsstråket?",
    a: "Ja, stråket erbjuder ett brett utbud av mat och dryck – från prisbelönta restauranger och pittoreska brasseries till avslappnade lunchcaféer. Perfekt för middag på Södermalm oavsett tillfälle."
  }
];

const FAQ_EN = [
  {
    q: "What shopping is there in SoFo, Södermalm?",
    a: "Along Nytorgsstråket and Nytorgsgatan in SoFo, you'll find a curated selection of independent stores offering fashion, vintage, interior design, and local brands. Unlike shopping malls, this is a genuine neighborhood street with unique boutiques you won't find anywhere else in Stockholm."
  },
  {
    q: "What are the best cafes near Nytorget in Södermalm?",
    a: "The area around Nytorgsgatan is home to some of Stockholm's best specialty cafes. Enjoy hand-brewed coffee, sourdough bread, and organic alternatives in cozy settings — perfect for a fika or a longer lunch in the heart of SoFo."
  },
  {
    q: "What is SoFo Stockholm?",
    a: "SoFo (South of Folkungagatan) is a vibrant and trendy neighborhood in Södermalm, Stockholm. It's known for its unique mix of independent stores, restaurants, cafes, and cultural experiences — a must-visit for anyone wanting to experience authentic Stockholm life."
  },
  {
    q: "How do I get to Nytorgsgatan in Södermalm?",
    a: "Nytorgsgatan is centrally located in Södermalm and easily reached by metro to Medborgarplatsen (Red line) or by bus. From there, it's a short walk to the heart of SoFo and Nytorgsstråket."
  },
  {
    q: "Are there restaurants along Nytorgsstråket?",
    a: "Yes, the street offers a wide range of food and drink — from award-winning restaurants and charming brasseries to relaxed lunch cafes. Perfect for dinner in Södermalm whatever the occasion."
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
