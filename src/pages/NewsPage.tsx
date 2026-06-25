import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { newsPosts as hardcodedNews } from '../data/news';
import { client, urlFor } from '../lib/sanity';

interface SanityNews {
  _id: string;
  _type: 'news';
  title: string;
  slug: { current: string };
  date: string;
  image: any;
  excerpt: string;
  tags: string[];
}

interface SanityInstagramPost {
  _id: string;
  _type: 'instagramPost';
  caption?: string;
  imageUrl?: string;
  localImage?: any;
  postUrl: string;
  date: string;
  store?: {
    title: string;
    slug: { current: string };
  };
}

interface UnifiedPost {
  id: string;
  type: 'news' | 'instagram';
  title: string;
  slug: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  tags: string[];
  externalUrl?: string;
  storeName?: string;
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

  const [news, setNews] = React.useState<UnifiedPost[]>([]);

  React.useEffect(() => {
    client
      .fetch<(SanityNews | SanityInstagramPost)[]>(
        `*[_type in ["news", "instagramPost"]] | order(date desc) {
          _id,
          _type,
          title,
          slug,
          date,
          image,
          excerpt,
          tags,
          caption,
          imageUrl,
          localImage,
          postUrl,
          store->{
            title,
            slug
          }
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          const formatted = data.map((item): UnifiedPost => {
            if (item._type === 'instagramPost') {
              return {
                id: item._id,
                type: 'instagram',
                title: item.store ? `Inlägg från ${item.store.title}` : 'Inlägg från Instagram',
                slug: item.store ? item.store.slug.current : '',
                date: item.date ? item.date.split('T')[0] : '',
                imageUrl: item.localImage ? urlFor(item.localImage).width(600).url() : (item.imageUrl || ''),
                excerpt: item.caption || '',
                tags: ['Instagram'],
                externalUrl: item.postUrl,
                storeName: item.store?.title,
              };
            } else {
              return {
                id: item._id,
                type: 'news',
                title: item.title,
                slug: item.slug.current,
                date: item.date,
                imageUrl: item.image ? urlFor(item.image).width(600).url() : '',
                excerpt: item.excerpt,
                tags: item.tags || [],
              };
            }
          });
          setNews(formatted);
        } else {
          // Fallback to hardcoded news
          const formatted = hardcodedNews.map((item): UnifiedPost => ({
            id: item.id,
            type: 'news',
            title: item.title,
            slug: item.slug,
            date: item.date,
            imageUrl: item.imageUrl,
            excerpt: item.excerpt,
            tags: item.tags,
          }));
          setNews(formatted);
        }
      })
      .catch((err) => {
        console.error(err);
        const formatted = hardcodedNews.map((item): UnifiedPost => ({
          id: item.id,
          type: 'news',
          title: item.title,
          slug: item.slug,
          date: item.date,
          imageUrl: item.imageUrl,
          excerpt: item.excerpt,
          tags: item.tags,
        }));
        setNews(formatted);
      });
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
          Senaste nytt, händelser och sociala uppdateringar från Nytorgsstråket
        </p>

        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map(post => {
              const isExternal = post.type === 'instagram' && !post.slug;
              const CardWrapper = isExternal ? 'a' : Link;
              const wrapperProps = isExternal
                ? { href: post.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
                : { to: post.type === 'instagram' ? `/plats/${post.slug}` : `/aktuellt/${post.slug}` };

              return (
                <CardWrapper
                  key={post.id}
                  {...(wrapperProps as any)}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#f5ece4]" style={{ background: 'linear-gradient(135deg, #f0ece4 0%, #e8e2d8 100%)' }}>
                    {post.imageUrl ? (
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
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
                    
                    {post.type === 'instagram' && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full shadow-sm flex items-center justify-center text-[#e1306c]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {post.type === 'instagram' ? (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-gradient-to-r from-[#fdf4f5] to-[#fef0f6] text-[#e1306c] border border-[#fbdde5]">
                            {post.tags?.[0]}
                          </span>
                        ) : (
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">
                            {post.tags?.[0]}
                          </span>
                        )}
                        <span className="text-xs text-text-muted">• {post.date}</span>
                      </div>
                      
                      <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-text-muted text-sm line-clamp-3 leading-relaxed font-light mb-4">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    {post.type === 'instagram' && (
                      <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5 mt-auto group-hover:text-[#e1306c] transition-colors font-din">
                        {isExternal ? 'Visa på Instagram' : 'Se butikssida'}
                        {/* @ts-expect-error - Custom element */}
                        <iconify-icon icon="solar:arrow-right-linear" width="14" height="14"></iconify-icon>
                      </div>
                    )}
                  </div>
                </CardWrapper>
              );
            })}
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
