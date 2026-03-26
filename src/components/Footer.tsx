

const Footer: React.FC = () => {
  return (
    <footer className="bg-text-dark text-white pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-orpheus tracking-tighter mb-8">Nytorgsstråket.</h2>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-8 max-w-xs">
              Södermalms mest levande gata där tradition möter samtida kultur.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-text-dark transition-colors">
                {/* @ts-expect-error - Framer Motion orientation property */}
                <iconify-icon icon="line-md:instagram" width="20" height="20"></iconify-icon>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-text-dark transition-colors">
                {/* @ts-expect-error - Framer Motion orientation property */}
                <iconify-icon icon="line-md:facebook" width="20" height="20"></iconify-icon>
              </a>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-6 text-white/40 font-din text-nowrap">Utforska</h4>
              <ul className="space-y-4 font-light text-sm">
                <li><a href="#" className="hover:text-brand-red transition-colors">Kartvyn</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Butiker</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Mat & Dryck</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Kultur</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-6 text-white/40 font-din text-nowrap">Information</h4>
              <ul className="space-y-4 font-extralight text-sm">
                <li><a href="#" className="hover:text-brand-red transition-colors">Om oss</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Kontakt</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">För hyresgäster</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-2">
              <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-6 text-white/40 font-din text-nowrap">Nyhetsbrev</h4>
              <p className="text-sm font-extralight text-white/60 mb-6">Få de senaste uppdateringarna om vad som händer på gatan.</p>
              <form className="relative">
                <input 
                  type="email" 
                  placeholder="Din e-post" 
                  className="w-full bg-white/5 border-b border-white/20 py-3 px-0 focus:outline-none focus:border-brand-red transition-colors font-extralight text-sm" 
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-brand-red transition-colors">
                  {/* @ts-expect-error - Custom element */}
                  <iconify-icon icon="solar:arrow-right-linear" width="20" height="20"></iconify-icon>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-medium font-din">
            &copy; 2024 Nytorgsstråket. Alla rättigheter förbehållna.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/20 font-medium font-din">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
