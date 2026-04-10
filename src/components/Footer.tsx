import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-text-dark text-white pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-orpheus tracking-tighter mb-8">Nytorgsstråket.</h2>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-8 max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-text-dark transition-colors">
                {/* @ts-expect-error - Custom element */}
                <iconify-icon icon="line-md:instagram" width="20" height="20"></iconify-icon>
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-text-dark transition-colors">
                {/* @ts-expect-error - Custom element */}
                <iconify-icon icon="line-md:facebook" width="20" height="20"></iconify-icon>
              </a>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-6 text-white/40 font-din text-nowrap">{t('footer.utforska')}</h4>
              <ul className="space-y-4 font-light text-sm">
                <li><a href="#discover" className="hover:text-brand-red transition-colors">{t('footer.butiker')}</a></li>
                <li><a href="#discover" className="hover:text-brand-red transition-colors">{t('footer.mat')}</a></li>
                <li><a href="#discover" className="hover:text-brand-red transition-colors">{t('footer.kafeer')}</a></li>
                <li><a href="#discover" className="hover:text-brand-red transition-colors">{t('footer.kultur')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-6 text-white/40 font-din text-nowrap">{t('footer.information')}</h4>
              <ul className="space-y-4 font-extralight text-sm">
                <li><a href="#about" className="hover:text-brand-red transition-colors">{t('footer.om_oss')}</a></li>
                <li><a href="#events" className="hover:text-brand-red transition-colors">{t('nav.evenemang')}</a></li>
                <li><a href="mailto:info@nytorgsstraket.se" className="hover:text-brand-red transition-colors">{t('footer.kontakt')}</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">{t('footer.hyresgaster')}</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-2">
              <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-6 text-white/40 font-din text-nowrap">{t('footer.hitta')}</h4>
              <p className="text-sm font-extralight text-white/60 mb-2 leading-relaxed">Nytorgsgatan 36–38</p>
              <p className="text-sm font-extralight text-white/60 mb-6 leading-relaxed">118 40 Stockholm</p>
              <a
                href="mailto:info@nytorgsstraket.se"
                className="text-sm font-extralight text-white/40 hover:text-brand-red transition-colors"
              >
                info@nytorgsstraket.se
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-medium font-din">
            &copy; {year} Nytorgsstråket. {t('footer.rights')}
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/20 font-medium font-din">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
