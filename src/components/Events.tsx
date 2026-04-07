import React, { useEffect, useState } from 'react';
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
];

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(FALLBACK_EVENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .order('is_featured', { ascending: false })
          .limit(3);

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

  const featured = events.find((e) => e.is_featured) ?? events[0];
  const rest = events.filter((e) => e.id !== featured.id).slice(0, 2);

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

      <div className="mt-10 flex items-center gap-3">
        <div className="flex-1 h-[1px] bg-text-dark/10" />
        <p className="text-[10px] uppercase tracking-widest text-text-dark/30 font-din shrink-0">
          Fler händelser uppdateras löpande
        </p>
        <div className="flex-1 h-[1px] bg-text-dark/10" />
      </div>
    </section>
  );
};

export default Events;
