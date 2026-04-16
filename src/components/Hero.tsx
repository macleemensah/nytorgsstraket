import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header className="relative h-screen w-full flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-text-dark">
        <img
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
          alt="Nytorget Atmosphere"
          className="w-full h-full object-cover opacity-70 scale-105 animate-pulse-slow lg:animate-[pulse_20s_ease-in-out_infinite_alternate]"
          style={{ filter: 'saturate(0.8)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center mt-8">
        <h1 className="sr-only">Nytorgsstråket</h1>

        {/* Logo */}
        <div className="mb-10">
          <img
            src={logo}
            alt="Nytorgsstråket Logo"
            className="h-48 md:h-64 lg:h-80 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-light italic max-w-xl mx-auto text-white leading-relaxed px-4 drop-shadow-md font-serif mb-10 uppercase">
          {t('hero.subtitle')}
        </p>

        {/* CTA Button */}
        <a
          href="#discover"
          className="group inline-flex items-center gap-3 px-8 py-3.5 border border-white/50 rounded-full text-white text-sm uppercase tracking-[0.15em] font-din font-medium hover:bg-white hover:text-text-dark transition-all duration-400 backdrop-blur-sm"
        >
          {t('hero.cta')}
          {/* @ts-expect-error - Custom element */}
          <iconify-icon icon="solar:arrow-right-linear" width="16" height="16"></iconify-icon>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest font-extralight font-din">Scrolla</span>
        {/* @ts-expect-error - Custom element */}
        <iconify-icon icon="solar:arrow-down-linear" width="18" height="18"></iconify-icon>
      </div>
    </header>
  );
};

export default Hero;
