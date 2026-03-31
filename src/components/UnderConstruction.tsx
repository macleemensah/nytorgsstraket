import logo from '../assets/logo.png';
import lykkeLogo from '../assets/stores/lykke.webp';
import parlanLogo from '../assets/stores/parlan.webp';
import apcLogo from '../assets/stores/apc.svg';

const STORES = [
  {
    name: "Lykke",
    logo: lykkeLogo,
    url: "https://lykkenytorget.se",
    openingHours: [
      "Mån-tis 9–18",
      "Ons-tors 9–22",
      "Fre-lör 9–00",
      "Sön 9–18"
    ]
  },
  {
    name: "Pärlans Konfekt",
    logo: parlanLogo,
    url: "https://www.parlanskonfektyr.se/",
    extra: "Öppet 11–16: Långfredag & Annandag påsk",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 11–16"
    ]
  },
  {
    name: "A.P.C.",
    logo: apcLogo,
    url: "https://www.apcstore.com",
    openingHours: [
      "Mån-lör 10:30–18:30",
      "Söndag 11–16"
    ]
  }
];

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 relative overflow-y-auto pt-16 pb-32">
      
      {/* Brand Logo */}
      <div className="mb-12 shrink-0">
        <img 
          src={logo} 
          alt="Nytorgsstråket Logo" 
          className="h-48 md:h-60 w-auto object-contain"
        />
      </div>

      {/* Copy */}
      <div className="max-w-2xl text-center space-y-6 px-4">
        <h1
          className="text-3xl md:text-4xl text-[#E31837] tracking-wide"
          style={{ fontFamily: '"DIN Condensed", "Barlow Condensed", sans-serif', fontWeight: 700 }}
        >
          Här växer Nytorgsstråket fram
        </h1>
        <p
          className="text-gray-600 text-base md:text-lg leading-relaxed"
          style={{ fontFamily: '"DIN Condensed", "Barlow Condensed", sans-serif', fontWeight: 700 }}
        >
          Just nu arbetar vi för fullt med att skapa en ny digital mötesplats för Nytorgsstråket. Snart hittar du allt om våra verksamheter, evenemang och det lokala livet här hos oss.
        </p>
        <p
          className="text-[#E31837] text-4xl md:text-5xl"
          style={{ fontFamily: "'Lindstaye', cursive" }}
        >
          Håll utkik – vi öppnar snart!
        </p>
      </div>

      {/* Stores Section */}
      <div className="mt-16 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 px-4 items-start">
        {STORES.map((store) => (
          <div key={store.name} className="flex flex-col items-center text-center space-y-6">
            <a 
              href={store.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-105 duration-300"
            >
              <img 
                src={store.logo} 
                alt={`${store.name} logo`} 
                className="h-24 md:h-32 w-auto object-contain" 
              />
            </a>
            <div 
              className="space-y-1 text-gray-500 uppercase tracking-wider"
              style={{ fontFamily: '"DIN Condensed", "Barlow Condensed", sans-serif', fontWeight: 700 }}
            >
              {store.openingHours.map((line, idx) => (
                <p key={idx} className="text-sm md:text-base leading-tight">
                  {line}
                </p>
              ))}
              {store.extra && (
                <p className="text-[#E31837] text-sm md:text-base mt-2">
                  {store.extra}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer / Contact Detail */}
      <div className="mt-16 pb-8 text-center w-full">
        <p
          className="text-sm text-gray-400 uppercase tracking-widest"
          style={{ fontFamily: '"DIN Condensed", "Barlow Condensed", sans-serif', fontWeight: 700 }}
        >
          Södermalm &bull; Stockholm
        </p>
      </div>
      
    </div>
  );
}
