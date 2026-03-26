

const places = [
  {
    category: 'Kafé & Bageri',
    name: 'Il Caffè Söder',
    description: 'En favorit bland lokalbefolkningen. Kända för sin exceptionella surdeg, kanelbullar och robusta kaffe i en minimalistisk miljö.',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1974&auto=format&fit=crop',
    color: '#afd4f1'
  },
  {
    category: 'Restaurang',
    name: 'Urban Deli',
    description: 'En livlig kombination av restaurang, bar och livsmedelsbutik som erbjuder färska, lokalt producerade ingredienser i en pulserande atmosfär.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
    color: '#f5c9bf'
  },
  {
    category: 'Konceptbutik',
    name: 'Grandpa',
    description: 'Noggrant utvalt mode, livsstilsprodukter och vintagemöbler presenterade i en inspirerande och genomtänkt miljö.',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop',
    color: '#fff0a2'
  },
  {
    category: 'Galleri',
    name: 'Fotografiska Nearby',
    description: 'Upptäck lokala konstnärer och samtida fotoutställningar utspridda runt distriktets kulturella knutpunkter.',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=2066&auto=format&fit=crop',
    color: '#44ca4a'
  }
];

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

      <div className="flex gap-8 px-6 md:px-12 lg:px-[calc((100vw-1280px)/2+24px)] overflow-x-auto snap-x scrollbar-hide pb-16">
        {places.map((place, idx) => (
          <a key={idx} href="#" className="snap-start shrink-0 w-[280px] md:w-[360px] group cursor-pointer">
            <div className="overflow-hidden aspect-[3/4] mb-6 rounded-sm" style={{ backgroundColor: place.color }}>
              <img 
                className="w-full h-full object-cover transition duration-1000 ease-out group-hover:scale-105" 
                src={place.image} 
                alt={place.name} 
              />
            </div>
            <div className="inline-flex px-2.5 py-1 text-text-dark text-[10px] md:text-xs uppercase tracking-widest mb-3 font-medium rounded-sm font-din" style={{ backgroundColor: place.color }}>
              {place.category}
            </div>
            <h3 className="text-2xl font-orpheus tracking-tight mb-3 group-hover:text-text-dark/70 transition-colors">{place.name}</h3>
            <p className="text-base text-text-dark/70 mb-5 line-clamp-2 leading-relaxed font-light">
              {place.description}
            </p>
            <span className="text-sm font-medium uppercase tracking-widest flex items-center gap-2 text-text-dark/60 group-hover:text-text-dark transition-colors font-din">
              Besök 
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:arrow-right-up-linear" width="16" height="16"></iconify-icon>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPlaces;
