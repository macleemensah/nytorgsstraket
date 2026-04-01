import React from 'react';
import { Link } from 'react-router-dom';

const Discover: React.FC = () => {
  return (
    <section id="discover" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-orpheus tracking-tight font-light text-text-dark leading-tight">
            En gata för alla smaker, <br className="hidden md:block" />
            <span className="italic font-normal">ett torg för alla sinnen.</span>
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-text-dark/40 mb-2 font-din">Utforska kategorier</p>
          <div className="w-12 h-[1px] bg-brand-red"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-[800px] md:h-[600px]">
        {/* Shops */}
        <Link to="/kategori/butiker" className="md:col-span-7 relative group overflow-hidden bg-[#e5e4e2] block h-64 md:h-full rounded-sm">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
            alt="Butiker" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-orpheus tracking-tight">Butiker</h3>
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
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-orpheus tracking-tight">Kaféer</h3>
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
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-orpheus tracking-tight">Kultur</h3>
              </div>
            </Link>
            <Link to="/kategori/mat-och-dryck" className="relative group overflow-hidden bg-[#e5e4e2] block h-full rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop" 
                alt="Mat & Dryck" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-orpheus tracking-tight">Mat & Dryck</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
