import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import { type EventData as Event, FALLBACK_EVENTS_DATA } from '../pages/EventsPage';

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const Events: React.FC = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>(FALLBACK_EVENTS_DATA);
  const [loading, setLoading] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isCalendarOpen || isDetailOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCalendarOpen, isDetailOpen]);

  const openDetail = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailOpen(true);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const sortEvents = (evs: Event[]) => {
          return [...evs].sort((a, b) => {
            if (a.id === 1) return -1;
            if (b.id === 1) return 1;
            if (a.is_featured && !b.is_featured) return -1;
            if (!a.is_featured && b.is_featured) return 1;
            if (!a.end_date) return 1;
            if (!b.end_date) return -1;
            return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
          });
        };

        let allEvents = [...FALLBACK_EVENTS_DATA];

        if (supabase) {
          const { data } = await supabase
            .from('events')
            .select('*')
            .eq('is_active', true)
            .limit(50);

          if (data && data.length > 0) {
            const dbEvents = (data as Event[]).map(e => ({ ...e, slug: e.slug || generateSlug(e.title) }));
            const eventMap = new Map<string, Event>();
            
            allEvents.forEach(e => {
              const slug = e.slug || generateSlug(e.title);
              eventMap.set(slug, e);
            });
            dbEvents.forEach(e => {
              const slug = e.slug || generateSlug(e.title);
              eventMap.set(slug, e);
            });
            allEvents = Array.from(eventMap.values());
          }
        }

        const filtered = allEvents.filter(e => !e.end_date || new Date(e.end_date) >= now);
        setEvents(sortEvents(filtered));
      } catch {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const sortEvents = (evs: Event[]) => {
          return [...evs].sort((a, b) => {
            if (a.id === 1) return -1;
            if (b.id === 1) return 1;
            if (a.is_featured && !b.is_featured) return -1;
            if (!a.is_featured && b.is_featured) return 1;
            if (!a.end_date) return 1;
            if (!b.end_date) return -1;
            return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
          });
        };
        const filtered = FALLBACK_EVENTS_DATA.filter(e => !e.end_date || new Date(e.end_date) >= now);
        setEvents(sortEvents(filtered));
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const featured = events.find((e) => e.is_featured) ?? events[0] ?? FALLBACK_EVENTS_DATA[0];
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
          <div 
            onClick={() => openDetail(featured)}
            className="md:col-span-7 group relative overflow-hidden rounded-sm bg-[#e5e4e2] aspect-[4/3] md:aspect-auto md:h-[480px] flex flex-col justify-end cursor-pointer"
          >
            <img
              src={featured.image_url}
              alt={featured.title}
              loading="lazy"
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
              <h3 className="text-2xl md:text-3xl font-orpheus tracking-tight mb-3">{featured.title}</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed max-w-md">{featured.description}</p>
            </div>
          </div>

          {/* Smaller cards */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
            {rest.map((event) => (
              <div 
                key={event.id} 
                onClick={() => openDetail(event)}
                className="group relative overflow-hidden rounded-sm bg-[#e5e4e2] flex-1 min-h-[200px] md:min-h-0 flex flex-col justify-end cursor-pointer"
              >
                <img
                  src={event.image_url}
                  alt={event.title}
                  loading="lazy"
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
          <h3 className="text-2xl md:text-3xl font-orpheus text-text-dark">{t('events.kommande')}</h3>
          <Link 
            to="/evenemang"
            className="text-xs uppercase tracking-widest font-din hover:opacity-70 mt-4 md:mt-0 flex items-center gap-2 group transition-opacity cursor-pointer text-text-dark"
          >
            {t('events.se_hela')} 
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
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
                onClick={() => openDetail(event)}
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

      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 transition-all duration-500 ${isCalendarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-text-dark/40 backdrop-blur-md" onClick={() => setIsCalendarOpen(false)}></div>
        
        <div className={`relative bg-bg-paper w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] rounded-sm shadow-2xl flex flex-col overflow-hidden transition-transform duration-500 ease-out ${isCalendarOpen ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}>
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 md:p-8 border-b border-text-dark/10 bg-bg-paper z-10 shrink-0">
            <div>
              <h2 className="text-2xl md:text-3xl font-orpheus tracking-tight">{t('events.hela_kalendern')}</h2>
              <p className="text-[10px] md:text-xs uppercase tracking-widest font-din opacity-50 mt-2">{t('events.subtitle')}</p>
            </div>
            <button 
              onClick={() => setIsCalendarOpen(false)}
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

      {/* Event Detail Modal Overlay */}
      <div 
        className={`fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 transition-all duration-500 ${isDetailOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-text-dark/60 backdrop-blur-md" onClick={() => setIsDetailOpen(false)}></div>
        
        <div className={`relative bg-bg-paper w-full max-w-3xl max-h-[90vh] md:max-h-[85vh] rounded-sm shadow-2xl flex flex-col overflow-hidden transition-transform duration-500 ease-out ${isDetailOpen ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'}`}>
          {/* Close Button */}
          <button 
            onClick={() => setIsDetailOpen(false)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            {/* @ts-expect-error - Custom element */}
            <iconify-icon icon="solar:close-linear" width="24" height="24"></iconify-icon>
          </button>

          {/* Modal Hero */}
          <div className="relative h-48 md:h-64 shrink-0 overflow-hidden">
            <img 
              src={selectedEvent?.image_url} 
              alt={selectedEvent?.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <span 
                className="px-2.5 py-1 text-text-dark text-[10px] uppercase tracking-widest font-medium rounded-sm font-din mb-3 inline-block"
                style={{ backgroundColor: selectedEvent?.tag_color }}
              >
                {selectedEvent?.tag}
              </span>
              <h2 className="text-3xl md:text-4xl font-orpheus text-white tracking-tight">{selectedEvent?.title}</h2>
              <p className="text-white/60 font-din uppercase tracking-widest text-xs mt-2">{selectedEvent?.date}</p>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 md:p-10 overflow-y-auto hide-scroll flex-1">
            {selectedEvent?.content ? (
              <div dangerouslySetInnerHTML={{ __html: selectedEvent.content }} />
            ) : (
              <div className="space-y-6">
                <p className="text-lg text-text-dark/80 font-light leading-relaxed">{selectedEvent?.description}</p>
              </div>
            )}

            {selectedEvent?.external_url && (
              <div className="mt-12 pt-8 border-t border-text-dark/10">
                <a 
                  href={selectedEvent.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-din text-brand-red hover:opacity-70 transition-opacity"
                >
                  Läs mer på officiell hemsida 
                  {/* @ts-expect-error - Custom element */}
                  <iconify-icon icon="solar:arrow-right-up-linear" width="16" height="16"></iconify-icon>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
