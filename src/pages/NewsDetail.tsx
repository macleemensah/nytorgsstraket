import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getNewsPostBySlug, newsPosts } from '../data/news';

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getNewsPostBySlug(slug || '');

  // Reload Instagram embed script when content changes
  useEffect(() => {
    if (post && post.content.includes('instagram-media')) {
      // @ts-ignore
      if (window.instgrm) {
        // @ts-ignore
        window.instgrm.Embeds.process();
      } else {
        const script = document.createElement('script');
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nytorgsstraket.se/aktuellt/${slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://nytorgsstraket.se${post.imageUrl}`,  
    "author": {
      "@type": "Organization",
      "name": post.author
    },  
    "publisher": {
      "@type": "Organization",
      "name": "Nytorgsstråket",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nytorgsstraket.se/favicon.png"
      }
    },
    "datePublished": post.date
  };

  const breadcrumbSchema = {
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://nytorgsstraket.se/aktuellt/${slug}`
      }
    ]
  };

  const combinedSchema = [schema, breadcrumbSchema];

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col">
      <SEO 
        title={`${post.title} | Aktuellt | Nytorgsstråket`}
        description={post.excerpt}
        keywords={`${post.tags.join(', ')}, aktuellt, nyheter, nytorget`}
        canonical={`/aktuellt/${slug}`}
        image={post.imageUrl}
        preloadImage={post.imageUrl}
        schema={combinedSchema}
      />
      <Navbar theme="dark" />

      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-3xl mx-auto w-full">
        <Link to="/aktuellt" className="inline-flex items-center text-primary hover:underline mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Tillbaka till Nyheter
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-bold uppercase tracking-wider text-primary">{post.tags[0]}</span>
            <span className="text-sm text-text-muted">• {post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
        </div>

        <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <article 
          className="prose prose-lg prose-headings:font-bold prose-a:text-primary max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related News Section */}
        <div className="mt-24 pt-16 border-t border-text-dark/10">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl md:text-4xl font-orpheus text-text-dark">Läs också</h2>
            <Link to="/aktuellt" className="text-xs uppercase tracking-widest font-din hover:text-brand-red transition-colors hidden md:block">
              Se alla nyheter →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {newsPosts.filter(p => p.slug !== post.slug).slice(0, 2).map((relatedPost) => (
              <Link key={relatedPost.slug} to={`/aktuellt/${relatedPost.slug}`} className="group block cursor-pointer">
                <div className="overflow-hidden aspect-[16/9] mb-4 rounded-sm bg-selection relative">
                    <img 
                      className="w-full h-full object-cover transition duration-1000 ease-out group-hover:scale-105" 
                      src={relatedPost.imageUrl} 
                      alt={relatedPost.title} 
                      loading="lazy"
                    />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-text-dark/70 transition-colors">{relatedPost.title}</h3>
                <span className="text-xs font-medium uppercase tracking-widest flex items-center gap-2 text-text-dark/60 group-hover:text-text-dark transition-colors font-din">
                  Läs mer 
                  {/* @ts-expect-error - Custom element */}
                  <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14"></iconify-icon>
                </span>
              </Link>
            ))}
          </div>
          <Link to="/aktuellt" className="text-xs uppercase tracking-widest font-din hover:text-brand-red transition-colors block md:hidden mt-8 text-center border border-text-dark/20 py-3">
            Se alla nyheter
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
