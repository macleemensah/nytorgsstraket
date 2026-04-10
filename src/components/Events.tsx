import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

interface Event {
  id: number;
  date: string;
  tag: string;
  title: string;
  description: string;
  image_url: string;
  tag_color: string;
  is_featured: boolean;
  is_active: boolean;
}

// Fallback events shown if Supabase is not yet configured
const FALLBACK_EVENTS: Event[] = [
  {
    id: 1,
    date: '12 — 14 Oktober',
    tag: 'Marknad',
    title: 'Höstmarknad',
    description: 'Lokala producenter samlas runt torget och erbjuder säsongens grönsaker, hantverksostar och nybakat bröd. En folkfest för alla sinnen.',
    image_url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop',
    tag_color: '#f5c9bf',
    is_featured: true,
    is_active: true,
  },
  {
    id: 2,
    date: '18 Oktober',
    tag: 'Kultur',
    title: 'Gallerinatt & Öppna ateljéer',
    description: 'Kvällspromenad där du kan utforska oberoende gallerier och öppna konstnärsateljéer på sidogatorna.',
    image_url: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?q=80&w=2070&auto=format&fit=crop',
    tag_color: '#afd4f1',
    is_featured: false,
    is_active: true,
  },
  {
    id: 3,
    date: 'Varje söndag',
    tag: 'Musik',
    title: 'Söndagsjazz',
    description: 'Intima livejazzframträdanden på utvalda vinbarer och restauranger. Perfekt för en avslappnad eftermiddag.',
    image_url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2064&auto=format&fit=crop',
    tag_color: '#fff0a2',
    is_featured: false,
    is_active: true,
  },
  {
    id: 4,
    date: '25 Oktober',
    tag: 'Mat & Dryck',
    title: 'Naturvinsprovning',
    description: 'En resa genom Europas mest spännande naturviner under ledning av lokala sommelierer.',
    image_url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop',
    tag_color: '#d4e6c3',
    is_featured: false,
    is_active: true,
  },
  {
    id: 5,
    date: '02 November',
    tag: 'Konst',
    title: 'Vernissage: Ny Nordisk Form',
    description: 'Samlingsutställning med up-and-coming designers från hela Norden inom möbler och keramik.',
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop',
    tag_color: '#e5e4e2',
    is_featured: false,
    is_active: true,
  },
];

const Events: React.FC = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>(FALLBACK_EVENTS);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!supabase) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .order('is_featured', { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          setEvents(data);
        }
      } catch {
        // No Supabase config yet — fallback events are shown
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const featured = events.find((e) => e.is_featured) ?? events[0] ?? FALLBACK_EVENTS[0];
  const rest = events.filter((e) => e.id !== (featured?.id)).slice(0, 2);

  if (!featured) return null; // Final safety bail-out if everything is empty

  return (
    <section id="events" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-14">
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-dark/40 mb-3 font-din">
            Evenemang & Händelser
          </p>
          <h2 className="text-3xl md:text-4xl font-orpheus tracking-tight font-light text-text-dark">
            Aktuellt på stråket
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse inline-block"></span>
          <span className="text-xs uppercase tracking-[0.2em] text-text-dark/40 font-din font-medium">
            Uppdateras löpande
          </span>
        </div>
      </div>

      {/* Magazine grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 animate-pulse">
          <div className="md:col-span-7 bg-[#e5e4e2] rounded-sm h-[480px]" />
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="bg-[#e5e4e2] rounded-sm flex-1 min-h-[200px]" />
            <div className="bg-[#e5e4e2] rounded-sm flex-1 min-h-[200px]" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Featured large card */}
          <div className="md:col-span-7 group relative overflow-hidden rounded-sm bg-[#e5e4e2] aspect-[4/3] md:aspect-auto md:h-[480px] flex flex-col justify-end">
            <img
              src={featured.image_url}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-2.5 py-1 text-text-dark text-[10px] uppercase tracking-widest font-medium rounded-sm font-din"
                  style={{ backgroundColor: featured.tag_color }}
                >
                  {featured.tag}
                </span>
                <span className="text-xs uppercase tracking-widest text-white/60 font-din">{featured.date}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-orpheus tracking-tight mb-3">{featured.title}</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed max-w-md">{featured.description}</p>
            </div>
          </div>

          {/* Smaller cards */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
            {rest.map((event) => (
              <div key={event.id} className="group relative overflow-hidden rounded-sm bg-[#e5e4e2] flex-1 min-h-[200px] md:min-h-0 flex flex-col justify-end">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="relative z-10 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="px-2 py-1 text-text-dark text-[10px] uppercase tracking-widest font-medium rounded-sm font-din"
                      style={{ backgroundColor: event.tag_color }}
                    >
                      {event.tag}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white/60 font-din">{event.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-orpheus tracking-tight mb-1">{event.title}</h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Calendar List */}
      <div className="mt-20 md:mt-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-text-dark/10 pb-6">
          <h3 className="text-3xl font-orpheus text-text-dark">{t('events.kommande')}</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-xs uppercase tracking-widest font-din hover:opacity-70 mt-4 md:mt-0 flex items-center gap-2 group transition-opacity cursor-pointer"
          >
            {t('events.se_hela')} 
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </div>
        
        <div className="flex flex-col">
          {events.map((event) => {
            // A simple way to grab a short date string (like "Okt") and "12-14" 
            // from the fallback strings without rewriting the data layer in this MVP
            const dateParts = event.date.split(' ');
            const monthStr = dateParts.length > 1 && !event.date.toLowerCase().includes('varje') ? dateParts[dateParts.length - 1] : 'Löpande';
            const daysStr = dateParts.length > 1 && !event.date.toLowerCase().includes('varje') ? dateParts.slice(0, -1).join(' ') : event.date;

            return (
              <div 
                key={`cal-${event.id}`} 
                className="flex flex-col md:flex-row md:items-center py-6 border-b border-text-dark/10 group hover:bg-[#e5e4e2]/30 transition-colors -mx-4 md:-mx-8 px-4 md:px-8 cursor-pointer rounded-sm"
              >
                <div className="w-full md:w-32 shrink-0 flex flex-row md:flex-col items-baseline md:items-start mb-3 md:mb-0 gap-2 md:gap-0">
                  <span className="text-sm uppercase tracking-widest text-text-dark/60 font-din md:mb-1">{monthStr}</span>
                  <span className="text-2xl md:text-3xl font-orpheus text-text-dark">{daysStr}</span>
                </div>
                
                <div className="flex-1 md:pr-12 md:pl-4 mb-4 md:mb-0">
                  <h4 className="text-xl md:text-2xl font-orpheus mb-2 group-hover:text-amber-800 transition-colors">{event.title}</h4>
                  <p className="text-sm font-light text-text-dark/70 line-clamp-1">{event.description}</p>
                </div>
                
                <div className="w-auto shrink-0 flex items-center justify-between md:justify-end md:w-32">
                  <span
                    className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium rounded-sm font-din text-text-dark"
                    style={{ backgroundColor: event.tag_color }}
                  >
                    {event.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Calendar Modal Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 transition-all duration-500 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-text-dark/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
        
        <div className={`relative bg-bg-paper w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] rounded-sm shadow-2xl flex flex-col overflow-hidden transition-transform duration-500 ease-out ${isModalOpen ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}>
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 md:p-8 border-b border-text-dark/10 bg-bg-paper z-10 shrink-0">
            <div>
              <h2 className="text-3xl md:text-4xl font-orpheus tracking-tight">{t('events.hela_kalendern')}</h2>
              <p className="text-[10px] md:text-xs uppercase tracking-widest font-din opacity-50 mt-2">{t('events.subtitle')}</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-10 h-10 shrink-0 rounded-full border border-text-dark/10 flex items-center justify-center hover:bg-text-dark hover:text-white transition-colors cursor-pointer"
            >
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:close-linear" width="24" height="24"></iconify-icon>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 overflow-y-auto hide-scroll flex-1">
            <div className="flex flex-col">
              {events.map((event) => {
                const dateParts = event.date.split(' ');
                const monthStr = dateParts.length > 1 && !event.date.toLowerCase().includes('varje') ? dateParts[dateParts.length - 1] : 'Löpande';
                const daysStr = dateParts.length > 1 && !event.date.toLowerCase().includes('varje') ? dateParts.slice(0, -1).join(' ') : event.date;

                return (
                  <div 
                    key={`modal-${event.id}`} 
                    className="flex flex-col md:flex-row md:items-center py-6 border-b border-text-dark/10 group hover:bg-[#e5e4e2]/30 transition-colors -mx-6 md:-mx-8 px-6 md:px-8 cursor-pointer rounded-sm last:border-b-0"
                  >
                    <div className="w-full md:w-32 shrink-0 flex flex-row md:flex-col items-baseline md:items-start mb-3 md:mb-0 gap-2 md:gap-0">
                      <span className="text-sm uppercase tracking-widest text-text-dark/60 font-din md:mb-1">{monthStr}</span>
                      <span className="text-2xl md:text-3xl font-orpheus text-text-dark">{daysStr}</span>
                    </div>
                    
                    <div className="flex-1 md:pr-12 md:pl-4 mb-4 md:mb-0">
                      <h4 className="text-xl md:text-2xl font-orpheus mb-2 group-hover:text-amber-800 transition-colors">{event.title}</h4>
                      <p className="text-sm font-light text-text-dark/70">{event.description}</p>
                    </div>
                    
                    <div className="w-auto shrink-0 flex items-center justify-between md:justify-end md:w-32">
                      <span
                        className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium rounded-sm font-din text-text-dark"
                        style={{ backgroundColor: event.tag_color }}
                      >
                        {event.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
