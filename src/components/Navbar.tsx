import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center transition-all duration-300 bg-transparent text-white">
      <div className="flex items-center">
        <a href="#" className="transition-transform duration-300 hover:scale-105">
          <img 
            src={logo} 
            alt="Nytorgsstråket" 
            className="h-8 md:h-10 w-auto"
          />
        </a>
      </div>
      
      <div className="flex items-center gap-6 md:gap-12">
        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 text-lg font-bold tracking-[0.05em] uppercase">
          <a href="#discover" className="hover:opacity-60 transition-opacity duration-300">Upptäck</a>
          <a href="#featured" className="hover:opacity-60 transition-opacity duration-300">Platser</a>
          <a href="#events" className="hover:opacity-60 transition-opacity duration-300">Evenemang</a>
          <a href="#stories" className="hover:opacity-60 transition-opacity duration-300">Berättelser</a>
        </div>
        
        {/* Language Switcher & Hamburger */}
        <div className="flex items-center gap-5 mt-2 md:mt-0">
          <div className="flex items-center gap-2 text-xs font-normal tracking-widest uppercase text-white/60">
            <a href="#" className="hover:opacity-80 transition-opacity text-white">SV</a>
            <span className="opacity-30">/</span>
            <a href="#" className="hover:text-current transition-opacity text-white/50 hover:text-white">ENG</a>
          </div>
          <button className="md:hidden hover:opacity-60 transition-opacity mt-1">
            {/* @ts-expect-error - Framer Motion layoutId */}
            <iconify-icon icon="solar:hamburger-menu-linear" width="24" height="24"></iconify-icon>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
