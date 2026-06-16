import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { getNewsPostBySlug } from '../data/news';

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

  return (
    <div className="min-h-screen bg-bg-paper flex flex-col">
      <SEO 
        title={`${post.title} | Aktuellt | Nytorgsstråket`}
        description={post.excerpt}
        keywords={`${post.tags.join(', ')}, aktuellt, nyheter, nytorget`}
        canonical={`/aktuellt/${slug}`}
        image={post.imageUrl}
        schema={schema}
      />
      <Navbar />

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
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
