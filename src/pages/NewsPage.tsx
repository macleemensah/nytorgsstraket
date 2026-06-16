import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { newsPosts } from '../data/news';

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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Nytt på stråket</h1>
        <p className="text-lg md:text-xl text-text-muted text-center max-w-2xl mx-auto mb-16">
          Senaste nytt, händelser och inspiration från Nytorgsstråket och våra hyresgäster.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsPosts.map(post => (
            <Link 
              key={post.id} 
              to={`/aktuellt/${post.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{post.tags[0]}</span>
                  <span className="text-xs text-text-muted">• {post.date}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-text-muted text-sm line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;
