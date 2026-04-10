import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { STORES } from '../data/stores';

const getCategoryCount = (cat: string) =>
  STORES.filter((s) => s.category === cat).length;

const Discover: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  // Helper for 'platser' plural context if needed, but we can just use the mapped word
  const platserTag = i18n.language === 'en' ? 'places' : 'platser';

  return (
    <section id="discover" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-orpheus tracking-tight font-light text-text-dark leading-tight">
            {t('hero.subtitle')}
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-text-dark/40 mb-2 font-din">{t('discover.title')}</p>
          <div className="w-12 h-[1px] bg-brand-red"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-[800px] md:h-[600px]">
        {/* Shops — large card */}
        <Link to="/kategori/butiker" className="md:col-span-7 relative group overflow-hidden bg-[#e5e4e2] block h-64 md:h-full rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
            alt="Butiker"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
          <div className="absolute bottom-8 left-8 text-white flex flex-col gap-1">
            <h3 className="text-3xl font-orpheus tracking-tight">{t('footer.butiker')}</h3>
            <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-din">
              {getCategoryCount('Butiker')} {platserTag} →
            </span>
          </div>
        </Link>

        <div className="md:col-span-5 grid grid-rows-2 gap-4 md:gap-6 h-full">
          {/* Cafés */}
          <Link to="/kategori/kafeer" className="relative group overflow-hidden bg-[#e5e4e2] block h-64 md:h-full rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
              alt="Kaféer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-colors duration-500"></div>
            <div className="absolute bottom-6 left-6 text-white flex flex-col gap-1">
              <h3 className="text-2xl font-orpheus tracking-tight">{t('footer.kafeer')}</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-din">
                {getCategoryCount('Kaféer')} {platserTag} →
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-4 md:gap-6 h-64 md:h-full">
            {/* Culture */}
            <Link to="/kategori/kultur" className="relative group overflow-hidden bg-[#e5e4e2] block h-full rounded-sm">
              <img
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg"
                alt="Kultur"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 text-white flex flex-col gap-1">
                <h3 className="text-xl font-orpheus tracking-tight">{t('footer.kultur')}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-din">
                  {getCategoryCount('Kultur')} {platserTag} →
                </span>
              </div>
            </Link>

            <Link to="/kategori/mat-och-dryck" className="relative group overflow-hidden bg-[#e5e4e2] block h-full rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop"
                alt="Mat & Dryck"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 text-white flex flex-col gap-1">
                <h3 className="text-xl font-orpheus tracking-tight">{t('footer.mat')}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-din">
                  {getCategoryCount('Mat & Dryck')} {platserTag} →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
