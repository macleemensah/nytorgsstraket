import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        {/* Image */}
        <div className="relative overflow-hidden rounded-sm aspect-[4/3] md:aspect-auto md:h-[560px] order-2 md:order-1">
          <img
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
            alt="Nytorgsstråket gatan"
            className="w-full h-full object-cover"
          />
          {/* Caption */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm text-text-dark text-[10px] uppercase tracking-[0.2em] font-din font-medium rounded-sm">
              Nytorgsgatan · Södermalm
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 md:order-2 flex flex-col justify-center">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-dark/40 mb-6 font-din">Om stråket</p>

          <h2 className="text-4xl md:text-5xl font-orpheus font-light tracking-tight text-text-dark leading-tight mb-8">
            Södermalms mest<br />
            <span className="italic font-normal">levande stråk.</span>
          </h2>

          <div className="space-y-5 text-base text-text-dark/70 font-light leading-relaxed">
            <p>
              Nytorgsstråket är ett noga kurerat handels- och kulturstråk på Södermalm — ett område där internationella varumärken möter lokala händer, och där varje plats har valts ut med noggrant öga för kvalitet och karaktär.
            </p>
            <p>
              Här hittar du allt från välkuraterade modebutiker och specialkaffe till prisbelönta restauranger, hantverk och kultur — samlade på ett kompakt promenadvänligt stråk mitt i hjärtat av SoFo.
            </p>
          </div>

          {/* Slogans */}
          <div className="mt-10 flex flex-wrap gap-3">
            {['Compact Shopping', 'Shop \'n Stroll', 'Boutique'].map((s) => (
              <span
                key={s}
                className="px-4 py-2 border border-text-dark/15 rounded-full text-xs uppercase tracking-widest font-din font-medium text-text-dark/50"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Lindstaye quote */}
          <div className="mt-10 pt-8 border-t border-text-dark/10">
            <p
              className="text-3xl text-brand-red leading-tight"
              style={{ fontFamily: "'Lindstaye', cursive" }}
            >
              Trevligt att stråkas!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
