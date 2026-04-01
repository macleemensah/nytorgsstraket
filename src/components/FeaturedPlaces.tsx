import React from 'react';
import { Link } from 'react-router-dom';
import { STORES } from '../data/stores';

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Kaféer': return '#afd4f1';
    case 'Mat & Dryck': return '#f5c9bf';
    case 'Butiker': return '#fff0a2';
    case 'Kultur': return '#44ca4a';
    default: return '#e5e4e2';
  }
};

const FeaturedPlaces: React.FC = () => {
  return (
    <section id="featured" className="py-32 bg-[#f4f3ef] overflow-hidden text-text-dark">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <h2 className="text-3xl md:text-4xl font-orpheus tracking-tight font-light">Utvalda platser</h2>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full border border-text-dark/10 flex items-center justify-center hover:bg-text-dark hover:text-white transition-colors cursor-pointer">
            {/* @ts-expect-error - Framer Motion orientation property */}
            <iconify-icon icon="solar:arrow-left-linear" width="20" height="20"></iconify-icon>
          </button>
          <button className="w-10 h-10 rounded-full border border-text-dark/10 flex items-center justify-center hover:bg-text-dark hover:text-white transition-colors cursor-pointer">
            {/* @ts-expect-error - Framer Motion orientation property */}
            <iconify-icon icon="solar:arrow-right-linear" width="20" height="20"></iconify-icon>
          </button>
        </div>
      </div>

      <div className="flex gap-8 px-6 md:px-12 lg:px-[calc((100vw-1280px)/2+24px)] overflow-x-auto snap-x scrollbar-hide pb-16 items-stretch">
        {STORES.slice(0, 6).map((store) => {
          const catColor = getCategoryColor(store.category);
          return (
            <Link key={store.slug} to={`/plats/${store.slug}`} className="snap-start shrink-0 w-[280px] md:w-[360px] group cursor-pointer block">
              <div className="overflow-hidden aspect-[3/4] mb-6 rounded-sm bg-selection relative">
                <img 
                  className="w-full h-full object-cover transition duration-1000 ease-out group-hover:scale-105" 
                  src={store.heroImage} 
                  alt={store.name} 
                />
              </div>
              <div 
                className="inline-flex px-2.5 py-1 text-text-dark text-[10px] md:text-xs uppercase tracking-widest mb-3 font-medium rounded-sm font-din" 
                style={{ backgroundColor: catColor }}
              >
                {store.category}
              </div>
              <h3 className="text-2xl font-orpheus tracking-tight mb-3 group-hover:text-text-dark/70 transition-colors">{store.name}</h3>
              <p className="text-base text-text-dark/70 mb-5 line-clamp-2 leading-relaxed font-light">
                {store.description}
              </p>
              <span className="text-sm font-medium uppercase tracking-widest flex items-center gap-2 text-text-dark/60 group-hover:text-text-dark transition-colors font-din">
                Besök 
                {/* @ts-expect-error - Custom element */}
                <iconify-icon icon="solar:arrow-right-up-linear" width="16" height="16"></iconify-icon>
              </span>
            </Link>
          );
        })}

        {/* View All Categories Card */}
        <a href="#discover" className="snap-start shrink-0 w-[280px] md:w-[360px] group cursor-pointer block flex flex-col justify-center items-center bg-[#e5e4e2] rounded-sm p-8 text-center aspect-[3/4] self-start border border-text-dark/10 hover:bg-text-dark hover:text-white transition-colors duration-500">
          <h3 className="text-3xl font-orpheus tracking-tight mb-4">Utforska alla platser</h3>
          <p className="text-sm font-light uppercase tracking-widest font-din opacity-70 mb-6">via våra kategorier</p>
          <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
            {/* @ts-expect-error - Custom element */}
            <iconify-icon icon="solar:arrow-right-linear" width="24" height="24"></iconify-icon>
          </div>
        </a>
      </div>
    </section>
  );
};

export default FeaturedPlaces;
