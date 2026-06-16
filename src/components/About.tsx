import React from 'react';
import { useTranslation } from 'react-i18next';
import aboutImage from '../assets/about-straket.png';

const About: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        {/* Image */}
        <div className="relative overflow-hidden rounded-sm aspect-[4/3] md:aspect-auto md:h-[560px] order-2 md:order-1">
          <img
            src={aboutImage}
            alt="Nytorgsstråket gatan"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* Caption */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm text-text-dark text-[10px] uppercase tracking-[0.2em] font-din font-medium rounded-sm">
              {t('about.address')}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 md:order-2 flex flex-col justify-center">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-dark/40 mb-6 font-din">{t('about.label')}</p>

          <h2 className="text-3xl md:text-4xl font-orpheus font-light tracking-tight text-text-dark leading-tight mb-8">
            {t('about.title_span1')} {t('about.title_span2')}
          </h2>

          <div className="space-y-5 text-base text-text-dark/70 font-light leading-relaxed">
            <p>
              {t('about.p1')}
            </p>
            <p>
              {t('about.p2')}
            </p>
          </div>

          {/* Slogans */}
          <div className="mt-10 flex flex-wrap gap-3">
            {['SoFo', 'Nytorget', 'Södermalm'].map((s) => (
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
              className="text-3xl text-brand-red leading-tight mb-8"
              style={{ fontFamily: "'Lindstaye', cursive" }}
            >
              {t('about.signature')}
            </p>
            
            <a 
              href="/om-nytorget"
              className="group inline-flex items-center gap-3 px-8 py-3.5 border border-text-dark/20 rounded-full text-text-dark text-xs uppercase tracking-[0.15em] font-din font-medium hover:bg-text-dark hover:text-white transition-all duration-400"
            >
              {i18n.language === 'sv' ? 'Läs hela guiden till Nytorget' : 'Read the full guide to Nytorget'}
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
