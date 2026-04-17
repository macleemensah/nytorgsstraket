import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { STORES } from '../data/stores';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function PlaceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const store = STORES.find(s => s.slug === slug);

  if (!store) {
    return (
      <div className="min-h-screen bg-bg-paper flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-4xl font-orpheus text-text-dark mt-32">{t('place.not_found')}</h1>
        <Link to="/" className="mt-8 px-6 py-2 border border-text-dark/20 uppercase tracking-widest text-xs font-din hover:bg-text-dark hover:text-white transition-colors">
          {t('place.not_found_back')}
        </Link>
        <Footer />
      </div>
    );
  }

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(store.address)}`;

  const isPlace = store.category === 'Kultur och platser';
  const schemaType = isPlace ? 'TouristAttraction' : 'LocalBusiness';

  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": store.name,
    "image": [
      store.heroImage,
      ...store.galleryImages
    ],
    "url": `https://nytorgsstraket.se/plats/${store.slug}`,
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": store.address,
      "addressLocality": "Stockholm",
      "postalCode": "11640",
      "addressCountry": "SE"
    },
    ...(!isPlace && {
      "openingHoursSpecification": store.openingHours.map(hourStr => {
        return {
          "@type": "OpeningHoursSpecification",
          "description": hourStr
        };
      })
    })
  };

  return (
    <div className="min-h-screen bg-bg-paper flex flex-col">
      <SEO 
        title={`${store.name} | Nytorgsstråket`}
        description={store.description.substring(0, 160)}
        canonical={`/plats/${store.slug}`}
        image={store.heroImage}
        schema={schema}
      />
      <Navbar />

      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[60vh] relative pt-16">
        <img
          src={store.heroImage}
          alt={store.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Main Content */}
          <div className="flex-1 space-y-12">
            <div>
              {/* Back link — arrow always visible */}
              <Link to="/" className="inline-flex items-center gap-2 text-[10px] md:text-xs font-din uppercase tracking-widest text-text-dark/50 hover:text-text-dark transition-colors mb-6">
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                {t('place.back')}
              </Link>

              <span className="block text-brand-red font-din uppercase tracking-widest text-sm mb-4">
                {store.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-orpheus text-text-dark tracking-tight mb-8">
                {store.name}
              </h1>
              <p className="text-lg md:text-xl text-text-dark/80 font-light leading-relaxed max-w-2xl">
                {store.description}
              </p>
            </div>

            {/* Mobile Info Card — shows ABOVE gallery on mobile, hidden on desktop */}
            <div className="block lg:hidden bg-white/50 backdrop-blur-md p-8 border border-text-dark/5">
              <div className="flex justify-center items-center mb-10 h-20">
                {store.logo === "/logo.png" ? (
                  <span className="font-lindstaye text-4xl text-text-dark text-center leading-tight">
                    {store.name}
                  </span>
                ) : (
                  <img
                    src={store.logo}
                    alt={`${store.name} Logo`}
                    className={`max-h-full object-contain ${['Stadsmissionen', 'Nytorget 6', 'Meatballs for the People', 'Bladverket'].includes(store.name) ? 'brightness-0 opacity-80' : ''}`}
                    style={{ transform: `scale(${store.scale})` }}
                  />
                )}
              </div>
              <div className="space-y-6 font-din tracking-wide">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-text-dark/40 mb-3">{t('place.opening_hours')}</h3>
                  <div className="space-y-1 text-text-dark/80">
                    {store.openingHours.map((hour, idx) => (
                      <p key={idx}>{hour}</p>
                    ))}
                    {store.extra && <p className="text-brand-red mt-2 leading-tight">{store.extra}</p>}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-text-dark/40 mb-3">{t('place.find_us')}</h3>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-dark/80 hover:text-brand-red transition-colors underline underline-offset-2"
                  >
                    {store.address}
                  </a>
                </div>
                <div className="pt-4 border-t border-text-dark/10">
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-text-dark text-white uppercase tracking-widest py-4 text-sm hover:bg-brand-red transition-colors duration-300"
                  >
                    {t('place.visit_website')}
                  </a>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {store.galleryImages.map((img, idx) => (
                <div key={idx} className={`aspect-square overflow-hidden bg-[#e5e4e2] ${idx === 2 ? 'sm:col-span-2 aspect-[21/9]' : ''}`}>
                  <img src={img} alt={`${store.name} interior ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Sidebar — desktop only */}
          <div className="hidden lg:block w-full lg:w-1/3 lg:sticky lg:top-32 bg-white/50 backdrop-blur-md p-8 md:p-12 border border-text-dark/5">
            <div className="flex justify-center items-center mb-12 h-24">
              {store.logo === "/logo.png" ? (
                <span className="font-lindstaye text-5xl text-text-dark text-center leading-tight">
                  {store.name}
                </span>
              ) : (
                <img
                  src={store.logo}
                  alt={`${store.name} Logo`}
                  className={`max-h-full object-contain ${['Stadsmissionen', 'Nytorget 6', 'Meatballs for the People', 'Bladverket'].includes(store.name) ? 'brightness-0 opacity-80' : ''}`}
                  style={{ transform: `scale(${store.scale})` }}
                />
              )}
            </div>

            <div className="space-y-8 font-din tracking-wide">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-text-dark/40 mb-3">{t('place.opening_hours')}</h3>
                <div className="space-y-1 text-text-dark/80">
                  {store.openingHours.map((hour, idx) => (
                    <p key={idx}>{hour}</p>
                  ))}
                  {store.extra && <p className="text-brand-red mt-2 leading-tight">{store.extra}</p>}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-text-dark/40 mb-3">{t('place.find_us')}</h3>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-dark/80 hover:text-brand-red transition-colors underline underline-offset-2"
                >
                  {store.address}
                </a>
              </div>

              <div className="pt-6 border-t border-text-dark/10">
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-text-dark text-white uppercase tracking-widest py-4 text-sm hover:bg-brand-red transition-colors duration-300"
                >
                  {t('place.visit_website')}
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
