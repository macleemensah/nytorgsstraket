import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
// For MVP fallback, we export FALLBACK_EVENTS from Events component or duplicate here
// Let's create a shared data logic or duplicate the fallback here for simplicity.
import matKulturImg from '../assets/places/mat-kultur-poster-official.png';

// Re-defining the interface for the page
export interface EventData {
  id: number;
  slug?: string;
  date: string;
  end_date?: string;
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

// We add a simple utility to generate slugs for the fallback events
const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

export const FALLBACK_EVENTS_DATA: EventData[] = [
  {
    id: 1,
    slug: generateSlug('Nytorgsfesten 2026'),
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
    slug: generateSlug('MAT- & KULTURFESTIVALEN'),
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
    slug: generateSlug('Lykke Live: Thilda U'),
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
    slug: generateSlug('Lykke Live: Moa Bondesson Band'),
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
    slug: generateSlug('Lykke Live: Isak Uddström'),
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
    slug: generateSlug('Lykke Live: Ivy Bae'),
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
    slug: generateSlug('Lykke Live: Natalie Reigo'),
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
    slug: generateSlug('Lykke Live: Orange Room'),
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
    slug: generateSlug('Lykke Live: Ziggy Maxwell'),
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

export default function EventsPage() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<EventData[]>(FALLBACK_EVENTS_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (!supabase) {
          const filtered = FALLBACK_EVENTS_DATA.filter(e => !e.end_date || new Date(e.end_date) >= now);
          setEvents(filtered);
          return;
        }

        const { data } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .order('is_featured', { ascending: false });

        if (data && data.length > 0) {
          const formatted = (data as EventData[]).map(e => ({ ...e, slug: e.slug || generateSlug(e.title) }));
          const filtered = formatted.filter(e => !e.end_date || new Date(e.end_date) >= now);
          setEvents(filtered);
        } else {
          const filtered = FALLBACK_EVENTS_DATA.filter(e => !e.end_date || new Date(e.end_date) >= now);
          setEvents(filtered);
        }
      } catch {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const filtered = FALLBACK_EVENTS_DATA.filter(e => !e.end_date || new Date(e.end_date) >= now);
        setEvents(filtered);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-bg-paper flex flex-col">
      <SEO 
        title="Evenemang på Nytorgsstråket | Södermalm"
        description="Upptäck alla aktuella evenemang, livemusik, loppisar och festivaler längs Nytorgsstråket."
        canonical="/evenemang"
      />
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-din uppercase tracking-widest text-text-dark/50 hover:text-text-dark transition-colors mb-6 group">
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            {t('place.back', 'Tillbaka')}
          </Link>
          <h1 className="text-5xl md:text-7xl font-orpheus tracking-tight text-text-dark mb-4">Evenemang</h1>
          <p className="text-lg text-text-dark/70 font-light max-w-2xl">
            Aktuellt på stråket. Här samlar vi händelser, spelningar, festivaler och specialerbjudanden.
          </p>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-24 bg-[#e5e4e2] rounded-sm w-full"></div>
            <div className="h-24 bg-[#e5e4e2] rounded-sm w-full"></div>
            <div className="h-24 bg-[#e5e4e2] rounded-sm w-full"></div>
          </div>
        ) : (
          <div className="flex flex-col">
            {events.map((event) => {
              const dateParts = event.date.split(' ');
              const monthStr = dateParts.length > 1 && !event.date.toLowerCase().includes('varje') ? dateParts[dateParts.length - 1] : 'Löpande';
              const daysStr = dateParts.length > 1 && !event.date.toLowerCase().includes('varje') ? dateParts.slice(0, -1).join(' ') : event.date;

              return (
                <Link 
                  to={`/evenemang/${event.slug}`} 
                  key={event.id}
                  className="flex flex-col md:flex-row md:items-center py-6 border-b border-text-dark/10 group hover:bg-[#e5e4e2]/30 transition-colors -mx-4 md:-mx-8 px-4 md:px-8 cursor-pointer rounded-sm"
                >
                  <div className="w-full md:w-32 shrink-0 flex flex-row md:flex-col items-baseline md:items-start mb-3 md:mb-0 gap-2 md:gap-0">
                    <span className="text-sm uppercase tracking-widest text-text-dark/60 font-din md:mb-1">{monthStr}</span>
                    <span className="text-2xl md:text-3xl font-orpheus text-text-dark">{daysStr}</span>
                  </div>
                  
                  <div className="flex-1 md:pr-12 md:pl-4 mb-4 md:mb-0">
                    <h4 className="text-xl md:text-2xl font-orpheus mb-2 group-hover:text-brand-red transition-colors">{event.title}</h4>
                    <p className="text-sm font-light text-text-dark/70 line-clamp-2">{event.description}</p>
                  </div>
                  
                  <div className="w-auto shrink-0 flex items-center justify-between md:justify-end md:w-32">
                    <span
                      className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium rounded-sm font-din text-text-dark"
                      style={{ backgroundColor: event.tag_color }}
                    >
                      {event.tag}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
