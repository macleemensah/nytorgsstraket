

const events = [
  {
    date: '12 — 14 Oktober',
    title: 'Höstmarknad',
    description: 'Lokala producenter samlas runt torget och erbjuder säsongens grönsaker, hantverksostar och nybakat bröd.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop',
    dotColor: '#f5c9bf'
  },
  {
    date: '18 Oktober',
    title: 'Gallerinatt & Öppna ateljéer',
    description: 'Kvällspromenad där du kan utforska oberoende gallerier och öppna konstnärsateljéer på sidogatorna.',
    image: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?q=80&w=2070&auto=format&fit=crop',
    dotColor: '#afd4f1'
  },
  {
    date: 'Varje söndag',
    title: 'Söndagsjazz',
    description: 'Intima livejazzframträdanden på utvalda vinbarer och restauranger. Perfekt för en avslappnad eftermiddag.',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2064&auto=format&fit=crop',
    dotColor: '#fff0a2'
  }
];

const Events: React.FC = () => {
  return (
    <section id="events" className="py-32 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-orpheus tracking-tight font-light text-center mb-16 text-text-dark">Aktuellt</h2>
      
      <div className="flex flex-col border-t border-text-dark/10">
        {events.map((event, idx) => (
          <a 
            key={idx} 
            href="#" 
            className="group py-8 md:py-10 border-b border-text-dark/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-12 transition-colors hover:bg-white/50 px-4 -mx-4 rounded-xl"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center w-full">
              <div className="overflow-hidden w-full md:w-32 h-48 md:h-32 shrink-0 bg-[#e5e4e2] rounded-sm">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 ease-out" 
                />
              </div>
              <div className="flex-1">
                  <span className="inline-block w-2 h-2 rounded-full mr-2.5" style={{ backgroundColor: event.dotColor }}></span>
                  <span className="font-din font-medium tracking-widest text-[10px] md:text-xs uppercase leading-none mt-0.5">{event.date}</span>
                <h3 className="text-2xl md:text-3xl font-orpheus tracking-tight mb-2 group-hover:text-text-dark/70 transition-colors text-text-dark">{event.title}</h3>
                <p className="text-base text-text-dark/60 font-light line-clamp-2">{event.description}</p>
              </div>
            </div>
            <div className="hidden md:flex w-12 h-12 rounded-full border border-text-dark/20 items-center justify-center group-hover:bg-text-dark group-hover:text-white transition duration-500 shrink-0 text-text-dark group-hover:text-white">
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:arrow-right-up-linear" width="20" height="20"></iconify-icon>
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <a href="#" className="inline-flex items-center gap-2 text-base uppercase tracking-widest font-medium border-b border-text-dark pb-1 hover:text-text-dark/60 hover:border-text-dark/60 transition-colors text-text-dark font-din">
          Visa hela kalendern
        </a>
      </div>
    </section>
  );
};

export default Events;
