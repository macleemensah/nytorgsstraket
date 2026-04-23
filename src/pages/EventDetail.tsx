import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { type EventData, FALLBACK_EVENTS_DATA } from './EventsPage';

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top cleanly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchEvent = async () => {
      try {
        if (!supabase) {
          const fallbackEvent = FALLBACK_EVENTS_DATA.find(e => e.slug === slug);
          setEvent(fallbackEvent || null);
          return;
        }

        const { data } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true);

        if (data && data.length > 0) {
          // Find the one that matches our generated slug or explicit slug
          const matched = (data as EventData[]).find(e => 
            e.slug === slug || 
            (e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') === slug)
          );
          if (matched) {
            setEvent(matched);
          } else {
            // Check fallback just in case
            const fallbackEvent = FALLBACK_EVENTS_DATA.find(e => e.slug === slug);
            setEvent(fallbackEvent || null);
          }
        } else {
          const fallbackEvent = FALLBACK_EVENTS_DATA.find(e => e.slug === slug);
          setEvent(fallbackEvent || null);
        }
      } catch {
        const fallbackEvent = FALLBACK_EVENTS_DATA.find(e => e.slug === slug);
        setEvent(fallbackEvent || null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-paper flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-text-dark/20 border-t-brand-red rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-bg-paper flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-4xl font-orpheus text-text-dark mt-32">Evenemanget hittades inte</h1>
        <Link to="/evenemang" className="mt-8 px-6 py-2 border border-text-dark/20 uppercase tracking-widest text-xs font-din hover:bg-text-dark hover:text-white transition-colors">
          Tillbaka till evenemang
        </Link>
        <Footer />
      </div>
    );
  }

  // Construct Event Schema.org JSON-LD
  // We extract a year from end_date if available, otherwise current year to make a valid ISO date for schema
  let startDateIso = event.end_date ? new Date(event.end_date).toISOString() : new Date().toISOString();
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": startDateIso,
    ...(event.end_date && { "endDate": new Date(event.end_date).toISOString() }),
    "image": [event.image_url],
    "location": {
      "@type": "Place",
      "name": "Nytorgsstråket",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nytorgsgatan",
        "addressLocality": "Stockholm",
        "postalCode": "11640",
        "addressCountry": "SE"
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-paper flex flex-col">
      <SEO 
        title={`${event.title} | Nytorgsstråket Evenemang`}
        description={event.description}
        canonical={`/evenemang/${slug}`}
        image={event.image_url}
        schema={schema}
      />
      <Navbar />

      <div className="w-full h-[40vh] md:h-[60vh] relative pt-16">
        <img
          src={event.image_url}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
          <span 
            className="px-2.5 py-1 text-text-dark text-[10px] md:text-xs uppercase tracking-widest font-medium rounded-sm font-din mb-4 inline-block"
            style={{ backgroundColor: event.tag_color }}
          >
            {event.tag}
          </span>
          <h1 className="text-4xl md:text-6xl font-orpheus tracking-tight max-w-4xl mx-auto">
            {event.title}
          </h1>
          <p className="text-white/80 font-din uppercase tracking-widest text-sm mt-6">
            {event.date}
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-3xl mx-auto px-6 py-16 md:py-24 w-full">
        <Link to="/evenemang" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-din uppercase tracking-widest text-text-dark/50 hover:text-text-dark transition-colors mb-12 group">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          {t('place.back', 'Tillbaka')}
        </Link>

        {event.content ? (
          <div className="prose prose-sm md:prose-lg max-w-none text-text-dark/80" dangerouslySetInnerHTML={{ __html: event.content }} />
        ) : (
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-text-dark/80 font-light leading-relaxed">{event.description}</p>
          </div>
        )}

        {event.external_url && (
          <div className="mt-16 pt-8 border-t border-text-dark/10">
            <a 
              href={event.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-din text-brand-red hover:opacity-70 transition-opacity"
            >
              Läs mer på officiell hemsida 
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:arrow-right-up-linear" width="16" height="16"></iconify-icon>
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
