import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { label: t('nav.upptack'), href: '#discover' },
    { label: t('nav.platser'), href: '#featured' },
    { label: t('nav.evenemang'), href: '#events' },
    { label: t('nav.om_straket'), href: '#about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? 'bg-bg-paper/95 backdrop-blur-sm shadow-sm text-text-dark py-4'
            : 'bg-transparent text-white'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="transition-transform duration-300 hover:scale-105">
            <img
              src={logo}
              alt="Nytorgsstråket"
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-7 md:h-8 brightness-0' : 'h-8 md:h-10'}`}
            />
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex gap-10 text-sm font-bold tracking-[0.08em] uppercase">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:opacity-60 transition-opacity duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase opacity-60">
            <button 
              onClick={(e) => { e.preventDefault(); changeLanguage('sv'); }} 
              className={`${i18n.language === 'sv' ? 'opacity-100 font-bold' : 'hover:opacity-100 transition-opacity cursor-pointer'}`}
            >SV</button>
            <span className="opacity-40">/</span>
            <button 
              onClick={(e) => { e.preventDefault(); changeLanguage('en'); }} 
              className={`${i18n.language === 'en' ? 'opacity-100 font-bold' : 'hover:opacity-100 transition-opacity cursor-pointer'}`}
            >ENG</button>
          </div>
        </div>

        {/* Mobile: Language + Hamburger */}
        <div className="md:hidden flex items-center gap-5">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase opacity-60">
            <button 
              onClick={(e) => { e.preventDefault(); changeLanguage('sv'); }} 
              className={`${i18n.language === 'sv' ? 'opacity-100 font-bold' : 'hover:opacity-100 transition-opacity cursor-pointer'}`}
            >SV</button>
            <span className="opacity-40">/</span>
            <button 
              onClick={(e) => { e.preventDefault(); changeLanguage('en'); }} 
              className={`${i18n.language === 'en' ? 'opacity-100 font-bold' : 'hover:opacity-100 transition-opacity cursor-pointer'}`}
            >ENG</button>
          </div>
          <button
            id="hamburger-button"
            onClick={() => setMenuOpen(true)}
            className="hover:opacity-60 transition-opacity p-1"
            aria-label="Öppna meny"
          >
            {/* @ts-expect-error - Custom element */}
            <iconify-icon icon="solar:hamburger-menu-linear" width="24" height="24"></iconify-icon>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[80vw] max-w-sm bg-text-dark text-white flex flex-col transition-transform duration-500 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex justify-between items-center px-8 py-8 border-b border-white/10">
            <img src={logo} alt="Nytorgsstråket" className="h-7 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              className="hover:opacity-60 transition-opacity p-1"
              aria-label="Stäng meny"
            >
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:close-linear" width="24" height="24"></iconify-icon>
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col px-8 py-10 gap-2 flex-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-orpheus text-4xl tracking-tight py-4 border-b border-white/10 hover:text-brand-red transition-colors duration-300"
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div className="px-8 py-8 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/30 font-din">
              {t('nav.address')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
