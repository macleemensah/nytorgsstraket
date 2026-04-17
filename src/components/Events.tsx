import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import matKulturImg from '../assets/places/mat-kultur-poster-official.png';

interface Event {
  id: number;
  date: string;
  end_date?: string; // ISO format YYYY-MM-DD
  tag: string;
  title: string;
  description: string;
  image_url: string;
  tag_color: string;
  is_featured: boolean;
  is_active: boolean;
  content?: string;
  external_url?: string;
}

// Fallback events shown if Supabase is not yet configured
const FALLBACK_EVENTS: Event[] = [
  {
    id: 1,
    date: '14 — 16 Augusti',
    end_date: '2026-08-16',
    tag: 'Festival',
    title: 'Nytorgsfesten 2026',
    description: 'Stockholms finaste kvartersfest är tillbaka! Tre dagar fyllda med karnevaltåg, glassfestival, loppis, musik och folkfest i hjärtat av Södermalm.',
    image_url: 'https://www.nytorgsfesten.se/wp-content/uploads/2020/05/CBE3B4D3-B8BE-4023-8F19-6A278F09C6AB.jpg',
    tag_color: '#f5c9bf',
    is_featured: false,
    is_active: true,
    external_url: 'https://www.nytorgsfesten.se/',
    content: `
      <div class="space-y-10">
        <div class="prose prose-sm md:prose-base text-text-dark/80">
          <p>Nytorgsfesten har sin själ i alla fantastiska utställare, restauranger och kringliggande verksamheter som alltid blomstrar under denna helg så oavsett tidpunkt lovar vi att ni kommer ha en trevlig stund i Stockholms finaste kvarter.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="space-y-4">
            <h4 class="font-din uppercase tracking-widest text-brand-red text-xs border-b border-brand-red/10 pb-2">Fredag 14 augusti</h4>
            <div class="space-y-3 text-sm">
              <p><strong>18:00</strong> Invigning med Karnevaltåg! Vi möts på gräsmattan Nytorget. Ta med instrument!</p>
              <p><strong>18:00 – 22:00</strong> Glassfestival – Greta Garbos Torg</p>
              <p><strong>18:00 – 22:00</strong> Hippie Market – Katarina Bangata</p>
              <p><strong>16:00 – 22:00</strong> Tivoli – Skolgården</p>
              <p><strong>18:00 – 22:00</strong> Mosquito Block Party! – Stora scen</p>
              <p><strong>18:00 – 22:00</strong> DJ Camille – Latin Street</p>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="font-din uppercase tracking-widest text-brand-red text-xs border-b border-brand-red/10 pb-2">Lördag 15 augusti</h4>
            <div class="space-y-3 text-sm">
              <p><strong>10:00 – 11:00</strong> Yoga – Nytorget</p>
              <p><strong>12:00 – 22:00</strong> Glassfestival – Greta Garbos Torg</p>
              <p><strong>12:00 – 22:00</strong> Hippie Market – Katarina Bangata</p>
              <p><strong>12:00 – 22:00</strong> Tivoli – Skolgården</p>
              <p><strong>12:00 – 18:00</strong> Jazz Corner & Art Street</p>
              <p><strong>12:00 – 17:00</strong> Planket fotoutställning</p>
              <p><strong>19:00 – 23:00</strong> Silent Disco – Gräsmattan</p>
              <p><strong>18:00 – 22:00</strong> Eddy Cabrera – Stora scen</p>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="font-din uppercase tracking-widest text-brand-red text-xs border-b border-brand-red/10 pb-2">Söndag 16 augusti</h4>
            <div class="space-y-3 text-sm">
              <p><strong>10:00 – 11:00</strong> Yoga – Nytorget</p>
              <p><strong>12:00 – 17:00</strong> Planket fotoutställning</p>
              <p><strong>12:00 – 22:00</strong> Glassfestival & Hippie Market</p>
              <p><strong>12:00 – 22:00</strong> Tivoli – Skolgården</p>
              <p><strong>12:00 – 18:00</strong> Art street by Egenart</p>
              <p><strong>12:00 – 18:00</strong> Funnybones Circus hörnet</p>
            </div>
          </div>
        </div>

        <div class="bg-[#f4f3ef] p-6 rounded-sm border border-text-dark/5">
          <h4 class="font-din uppercase tracking-widest text-text-dark text-xs mb-3">Loppis på festivalen</h4>
          <p class="text-sm text-text-dark/70 leading-relaxed">I samband med Nytorgsfesten invid Nytorget på Katarina Södra Skolgård etablerar vi Södermalms största loppis. Det kommer även finnas Food Trucks, DJs, barnområde och ett litet Tivoli m.m. på skolgården.</p>
        </div>
      </div>
    `,
  },
  {
    id: 13,
    date: '23 — 26 April',
    end_date: '2026-04-26',
    tag: 'Mat & Kultur',
    title: 'MAT- & KULTURFESTIVALEN',
    description: 'RADICI x Klättermusens Verkstad / Södermalm',
    image_url: matKulturImg,
    tag_color: '#d4e6d9',
    is_featured: true,
    is_active: true,
    external_url: 'https://mat-kulturfestivalen.confetti.events/',
    content: `
      <div class="space-y-8">
        <div class="prose prose-sm md:prose-base text-text-dark/80">
          <p>Välkommen till fyra dagar av ekologisk mat, kultur och gemenskap. Tillsammans med Klättermusens Verkstad skapar Radici en levande mötesplats där du kan äta, lära, skapa och umgås.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div>
              <h4 class="font-din uppercase tracking-widest text-brand-red text-xs border-b border-brand-red/10 pb-2 mb-4">Torsdag 23 April</h4>
              <div class="space-y-3 text-sm">
                <p><strong>09:00</strong> Löpning med Torsdagsrundan</p>
                <p><strong>10:00</strong> Frukost från Svedjan Bageri</p>
                <p><strong>11:00</strong> Lunch: Mujadara (Ris & gröna linser) från Mazra’a</p>
                <p><strong>15:00</strong> Radici-lådan lanseras</p>
              </div>
            </div>
            <div>
              <h4 class="font-din uppercase tracking-widest text-brand-red text-xs border-b border-brand-red/10 pb-2 mb-4">Fredag 24 April</h4>
              <div class="space-y-3 text-sm">
                <p><strong>11:00</strong> Peter Andersson (restaurang Volt) serverar gröt</p>
                <p><strong>15:00</strong> Provsmakning från Tove Nilssons nya bok ”Örter”</p>
                <p><strong>17:00</strong> Italodisco, funk & hip-hop med Gubbstil</p>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <h4 class="font-din uppercase tracking-widest text-brand-red text-xs border-b border-brand-red/10 pb-2 mb-4">Lördag 25 April</h4>
              <div class="space-y-3 text-sm">
                <p><strong>10:00</strong> Sanctum / Mindful Movement i Axel Landquist Park</p>
                <p><strong>11:00</strong> Koinobori Workshop för barn med Acne JR</p>
                <p><strong>12:00</strong> Lunch: Pasta by Jen (färsk handgjord pasta)</p>
                <p><strong>16:00</strong> DJs från Bageriet spelar</p>
              </div>
            </div>
            <div>
              <h4 class="font-din uppercase tracking-widest text-brand-red text-xs border-b border-brand-red/10 pb-2 mb-4">Söndag 26 April</h4>
              <div class="space-y-3 text-sm">
                <p><strong>10:00</strong> Run Club: Södermalm runt med Klättermusen</p>
                <p><strong>11:00</strong> Plantera din egen tomatplanta med Hanna Hofman Bang</p>
                <p><strong>15:00</strong> Avslutningsfest med Pizza & livemusik (Nasmadrone)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-[#f4f3ef] p-6 rounded-sm border border-text-dark/5 text-sm text-text-dark/70 italic">
          Kom som du är – stanna länge. Fri entré till festivalområdet.
        </div>
      </div>
    `
  },
  {
    id: 6,
    date: '16 April',
    end_date: '2026-04-16',
    tag: 'Musik',
    title: 'Lykke Live: Thilda U',
    description: 'Thilda U levererar raka poplåtar som flirtar med disco och R&B. Releasespelning för nya singeln Old Magazine.',
    image_url: 'https://images.squarespace-cdn.com/content/v1/634e98c4f6b5087c011f9aeb/1773230048413-SR2FBNMDZVD1IU2SAKTK/Thilda+U.png',
    tag_color: '#fff0a2',
    is_featured: false,
    is_active: true,
    external_url: 'https://www.lykkenytorget.se/lykke-live/thilda-u',
  },
  {
    id: 7,
    date: '17 April',
    end_date: '2026-04-17',
    tag: 'Musik',
    title: 'Lykke Live: Moa Bondesson Band',
    description: 'Ett dynamiskt och personligt sound där influenser från pop, rock och country möts. Fri entré.',
    image_url: 'https://images.squarespace-cdn.com/content/v1/634e98c4f6b5087c011f9aeb/1775217533410-8AC6IEXPR5ZFY6HJAQCA/Moa+bondesson+V2.png',
    tag_color: '#fff0a2',
    is_featured: false,
    is_active: true,
    external_url: 'https://www.lykkenytorget.se/lykke-live/moa-bondesson-band',
  },
  {
    id: 8,
    date: '23 April',
    end_date: '2026-04-23',
    tag: 'Musik',
    title: 'Lykke Live: Isak Uddström',
    description: 'Isak Uddström från Idol 2023 bjuder på en intim och känslosam popkonsert med influenser från svensk pop.',
    image_url: 'https://images.squarespace-cdn.com/content/v1/634e98c4f6b5087c011f9aeb/1774714910475-TLIY8R8S975AIUG4E403/ISAK.png',
    tag_color: '#fff0a2',
    is_featured: false,
    is_active: true,
    external_url: 'https://www.lykkenytorget.se/lykke-live/isak-uddstrom',
  },
  {
    id: 9,
    date: '01 Maj',
    end_date: '2026-05-01',
    tag: 'Musik',
    title: 'Lykke Live: Ivy Bae',
    description: 'Indie-folk med rå sårbarhet och hypnotisk närvaro. Releasekonsert för två nya singlar.',
    image_url: 'https://images.squarespace-cdn.com/content/v1/634e98c4f6b5087c011f9aeb/1775220027389-WAM2BBCFA6W2K2GTBX9B/IVY+BAE.png',
    tag_color: '#fff0a2',
    is_featured: false,
    is_active: true,
    external_url: 'https://www.lykkenytorget.se/lykke-live/ivy-bae',
  },
  {
    id: 10,
    date: '08 Maj',
    end_date: '2026-05-08',
    tag: 'Musik',
    title: 'Lykke Live: Natalie Reigo',
    description: 'Popartist och låtskrivare med stark röst. Releasefest för hennes nya singel "HELL OF A RIDE".',
    image_url: 'https://images.squarespace-cdn.com/content/v1/634e98c4f6b5087c011f9aeb/1776072092999-BXT8JSMJNU0TRQLLEB13/Natalie+Reigo.png',
    tag_color: '#fff0a2',
    is_featured: false,
    is_active: true,
    external_url: 'https://www.lykkenytorget.se/lykke-live/natalie-reigo',
  },
  {
    id: 11,
    date: '15 Maj',
    end_date: '2026-05-15',
    tag: 'Musik',
    title: 'Lykke Live: Orange Room',
    description: 'Unga neo-soul-bandet Orange Room presenterar sin nya EP med influenser av R&B-jazz, hiphop och fusion.',
    image_url: 'https://images.squarespace-cdn.com/content/v1/634e98c4f6b5087c011f9aeb/1775219032601-1YHZN4V9PJCWJK5UIRBU/ORANGE+ROOM.png',
    tag_color: '#fff0a2',
    is_featured: false,
    is_active: true,
    external_url: 'https://www.lykkenytorget.se/lykke-live/orange-room',
  },
  {
    id: 12,
    date: '22 Maj',
    end_date: '2026-05-22',
    tag: 'Musik',
    title: 'Lykke Live: Ziggy Maxwell',
    description: 'Live Recording Session för det kommande debutalbumet. Alternativ pop, elektroniska landskap och filmiska arrangemang.',
    image_url: 'https://images.squarespace-cdn.com/content/v1/634e98c4f6b5087c011f9aeb/1776075750252-R2LA90137AJM8075J656/ZIGGY+MAXWELL.png',
    tag_color: '#fff0a2',
    is_featured: false,
    is_active: true,
    external_url: 'https://www.lykkenytorget.se/lykke-live/ziggy-maxwell',
  }
];

const Events: React.FC = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>(FALLBACK_EVENTS);
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

        if (!supabase) {
          // Filter fallback events if Supabase is missing
          const filteredFallback = FALLBACK_EVENTS.filter(e => {
            if (!e.end_date) return true;
            return new Date(e.end_date) >= now;
          });
          setEvents(filteredFallback);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .order('is_featured', { ascending: false })
          .limit(20);

        if (!error && data && data.length > 0) {
          const filtered = data.filter(e => {
            if (!e.end_date) return true;
            return new Date(e.end_date) >= now;
          });
          setEvents(filtered);
        } else {
          // Fallback filtering if no data from Supabase
          const filteredFallback = FALLBACK_EVENTS.filter(e => {
            if (!e.end_date) return true;
            return new Date(e.end_date) >= now;
          });
          setEvents(filteredFallback);
        }
      } catch {
        // No Supabase config yet — fallback events are filtered and shown
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const filteredFallback = FALLBACK_EVENTS.filter(e => {
          if (!e.end_date) return true;
          return new Date(e.end_date) >= now;
        });
        setEvents(filteredFallback);
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
          <div 
            onClick={() => openDetail(featured)}
            className="md:col-span-7 group relative overflow-hidden rounded-sm bg-[#e5e4e2] aspect-[4/3] md:aspect-auto md:h-[480px] flex flex-col justify-end cursor-pointer"
          >
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
          <button 
            onClick={() => setIsCalendarOpen(true)}
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
