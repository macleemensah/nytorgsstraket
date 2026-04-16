import { useParams, Link } from 'react-router-dom';
import { STORES, type StoreCategory } from '../data/stores';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORY_MAP: Record<string, { title: StoreCategory; image: string }> = {
  'butiker': { title: 'Butiker', image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" },
  'kafeer': { title: 'Kaféer', image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" },
  'kultur': { title: 'Kultur och platser', image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg" },
  'mat-och-dryck': { title: 'Mat & Dryck', image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop" },
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Kaféer': return '#afd4f1';
    case 'Mat & Dryck': return '#f5c9bf';
    case 'Butiker': return '#fff0a2';
    case 'Kultur och platser': return '#44ca4a';
    default: return '#e5e4e2';
  }
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryConfig = CATEGORY_MAP[slug || ''];

  if (!categoryConfig) {
    return (
      <div className="min-h-screen bg-bg-paper flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-4xl font-orpheus text-text-dark mt-32">Kategorin hittades inte</h1>
        <Link to="/" className="mt-8 px-6 py-2 border border-text-dark/20 uppercase tracking-widest text-xs font-din hover:bg-text-dark hover:text-white transition-colors">
          Tillbaka
        </Link>
        <Footer />
      </div>
    );
  }

  const categoryStores = STORES.filter(s => s.category === categoryConfig.title);
  const catColor = getCategoryColor(categoryConfig.title);

  return (
    <div className="min-h-screen bg-bg-paper flex flex-col">
      <Navbar />
      
      {/* Category Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative pt-16">
        <img 
          src={categoryConfig.image} 
          alt={categoryConfig.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Link to="/" className="inline-flex items-center text-[10px] md:text-xs font-din uppercase tracking-widest text-white/70 hover:text-white transition-colors mb-4 group">
            <span className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">←</span>
            Tillbaka
          </Link>
          <h1 className="text-5xl md:text-7xl font-orpheus tracking-tight">
            {categoryConfig.title}
          </h1>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
        {categoryStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16 mt-8">
            {categoryStores.map((store) => (
              <Link key={store.slug} to={`/plats/${store.slug}`} className="group block cursor-pointer">
                <div className="overflow-hidden aspect-[3/4] mb-6 rounded-sm bg-selection relative">
                  <img 
                    className="w-full h-full object-cover transition duration-1000 ease-out group-hover:scale-105" 
                    src={store.heroImage} 
                    alt={store.name} 
                  />
                </div>
                <div 
                  className="inline-flex px-2.5 py-1 text-text-dark text-[10px] md:text-xs uppercase tracking-widest mb-3 font-medium rounded-sm font-din" 
                  style={{ backgroundColor: catColor }}
                >
                  {store.category}
                </div>
                <h3 className="text-2xl font-orpheus tracking-tight mb-3 group-hover:text-text-dark/70 transition-colors">{store.name}</h3>
                <p className="text-base text-text-dark/70 mb-5 line-clamp-2 leading-relaxed font-light">
                  {store.description}
                </p>
                <span className="text-sm font-medium uppercase tracking-widest flex items-center gap-2 text-text-dark/60 group-hover:text-text-dark transition-colors font-din">
                  Besök 
                  {/* @ts-expect-error - Custom element */}
                  <iconify-icon icon="solar:arrow-right-up-linear" width="16" height="16"></iconify-icon>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-text-dark/50 font-din uppercase tracking-widest flex flex-col items-center">
            <p>Inga platser i denna kategori ännu.</p>
            <Link to="/" className="mt-8 px-6 py-2 border border-text-dark/20 uppercase tracking-widest text-[10px] hover:bg-text-dark hover:text-white transition-colors">
              Fler kategorier
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
