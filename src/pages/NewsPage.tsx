import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { newsPosts as hardcodedNews } from '../data/news';
import { client, urlFor } from '../lib/sanity';

interface SanityNews {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  image: any;
  excerpt: string;
  tags: string[];
}

const NewsPage: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Hem",
        "item": "https://nytorgsstraket.se/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Aktuellt",
        "item": "https://nytorgsstraket.se/aktuellt"
      }
    ]
  };

  const [news, setNews] = React.useState<any[]>(hardcodedNews);

  React.useEffect(() => {
    client
      .fetch<SanityNews[]>(
        `*[_type == "news"] | order(date desc) {
          _id, title, slug, date, image, excerpt, tags
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          const formatted = data.map((item) => ({
            id: item._id,
            title: item.title,
            slug: item.slug.current,
            date: item.date,
            imageUrl: item.image ? urlFor(item.image).url() : '',
            excerpt: item.excerpt,
            tags: item.tags || [],
          }));
          setNews(formatted);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col">
      <SEO 
        title="Aktuellt | Senaste Nytt & Inspiration | Nytorgsstråket"
        description="Följ med bakom kulisserna på Nytorgsstråket. Läs om nya butiker, inspirerande intervjuer och det senaste från SoFo, Södermalm."
        keywords="Aktuellt, nyheter, senaste nytt, nytorget, sofo, södermalm, stockholm, inspiration"
        canonical="/aktuellt"
        schema={schema}
      />
      <Navbar theme="dark" />

      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl md:text-6xl font-orpheus font-light tracking-tight mb-4 text-center">Nytt på stråket</h1>
        <p className="text-lg md:text-xl text-text-muted font-light text-center max-w-2xl mx-auto mb-16">
          Senaste nytt, händelser och inspiration från Nytorgsstråket och våra hyresgäster.
        </p>

        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map(post => (
              <Link 
                key={post.id} 
                to={`/aktuellt/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #f0ece4 0%, #e8e2d8 100%)' }}>
                  {post.imageUrl ? (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                        <rect x="8" y="8" width="32" height="32" rx="2" stroke="#2d2d2a" strokeWidth="1.5"/>
                        <path d="M8 30 L18 20 L26 28 L32 22 L40 30" stroke="#2d2d2a" strokeWidth="1.5" strokeLinejoin="round"/>
                        <circle cx="32" cy="18" r="4" stroke="#2d2d2a" strokeWidth="1.5"/>
                      </svg>
                      <span className="text-xs uppercase tracking-[0.2em] font-din" style={{ color: '#2d2d2a', opacity: 0.4 }}>
                        Kommer snart
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{post.tags?.[0]}</span>
                    <span className="text-xs text-text-muted">• {post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-text-muted text-sm line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
              <circle cx="28" cy="28" r="26" stroke="#2d2d2a" strokeWidth="1.5"/>
              <path d="M20 20 C20 20 28 28 36 20" stroke="#2d2d2a" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M20 36 C20 36 28 28 36 36" stroke="#2d2d2a" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-xs uppercase tracking-[0.25em] font-din text-text-muted">
              Inga inlägg ännu — håll utkik!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;
