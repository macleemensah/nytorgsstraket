import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { STORES } from '../data/stores';

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Kaféer': return '#afd4f1';
    case 'Mat & Dryck': return '#f5c9bf';
    case 'Butiker': return '#fff0a2';
    case 'Kultur och platser': return '#44ca4a';
    default: return '#e5e4e2';
  }
};

const FeaturedPlaces: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  
  // Drag to scroll logic
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    setDragged(true);
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    // Dynamically calculate scroll amount (card width + gap)
    const scrollAmount = window.innerWidth < 768 ? 310 : 392;
    scrollRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="featured" className="py-32 bg-[#f4f3ef] text-text-dark overflow-hidden">
      {/* Boxed Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="text-3xl md:text-4xl font-orpheus tracking-tight font-light">{t('featured.title')}</h2>
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              aria-label="Scrolla vänster"
              className="w-10 h-10 rounded-full border border-text-dark/10 flex items-center justify-center hover:bg-text-dark hover:text-white transition-colors cursor-pointer"
            >
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:arrow-left-linear" width="20" height="20"></iconify-icon>
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scrolla höger"
              className="w-10 h-10 rounded-full border border-text-dark/10 flex items-center justify-center hover:bg-text-dark hover:text-white transition-colors cursor-pointer"
            >
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:arrow-right-linear" width="20" height="20"></iconify-icon>
            </button>
          </div>
      </div>

      {/* Edge-to-Edge Carousel */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 md:gap-8 px-6 md:px-12 xl:px-[calc((100vw-1280px)/2+48px)] overflow-x-auto scroll-pl-6 md:scroll-pl-12 xl:scroll-pl-[calc((100vw-1280px)/2+48px)] scrollbar-hide pb-16 items-stretch select-none ${isDragging ? 'cursor-grabbing' : 'snap-x snap-mandatory cursor-grab'}`}
      >
        {STORES.slice(0, 6).map((store) => {
          const catColor = getCategoryColor(store.category);
          return (
            <Link 
              key={store.slug} 
              to={`/plats/${store.slug}`} 
              onClick={(e) => dragged && e.preventDefault()}
              className="snap-start shrink-0 w-[80vw] sm:w-[280px] md:w-[360px] group cursor-pointer block"
            >
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
              <h3 className="text-xl md:text-2xl font-orpheus tracking-tight mb-3 group-hover:text-text-dark/70 transition-colors">{store.name}</h3>
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

        {/* View All Card */}
        <a
          href="#discover"
          className="snap-start shrink-0 w-[280px] md:w-[360px] group cursor-pointer flex flex-col justify-center items-center bg-[#e5e4e2] rounded-sm p-8 text-center aspect-[3/4] self-start border border-text-dark/10 hover:bg-text-dark hover:text-white transition-colors duration-500"
        >
          <h3 className="text-2xl md:text-3xl font-orpheus tracking-tight mb-4">{t('featured.view_all')}</h3>
          <p className="text-sm font-light uppercase tracking-widest font-din opacity-70 mb-6">{t('featured.via_categories')}</p>
          <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {/* @ts-expect-error - Custom element */}
            <iconify-icon icon="solar:arrow-right-linear" width="24" height="24"></iconify-icon>
          </div>
        </a>
      </div>
    </section>
  );
};

export default FeaturedPlaces;
