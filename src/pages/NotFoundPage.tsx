import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg-paper flex flex-col">
      <SEO 
        title="Sidan hittades inte | Nytorgsstråket" 
        description="Sidan du letar efter kunde inte hittas. Återvänd till startsidan." 
        noindex={true} 
      />
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-8xl font-orpheus text-text-dark mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-orpheus text-text-dark mb-8">
          Sidan hittades inte
        </h2>
        <p className="text-lg text-text-dark/80 mb-12 max-w-md">
          Den sida du sökte verkar inte finnas eller har flyttats.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 border border-text-dark text-text-dark uppercase tracking-widest text-xs font-din hover:bg-text-dark hover:text-white transition-colors"
        >
          Tillbaka till startsidan
        </Link>
      </main>
      <Footer />
    </div>
  );
}
