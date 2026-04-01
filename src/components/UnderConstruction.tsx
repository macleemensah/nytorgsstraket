import logo from '../assets/logo.png';
import { STORES } from '../data/stores';

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
      <div className="mt-16 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-x-8 md:gap-y-16 px-4 items-start justify-center">
        {STORES.map((store) => (
          <div key={store.name} className="flex flex-col items-center text-center space-y-6">
            <a 
              href={store.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block transition-transform hover:scale-105 duration-300 w-full"
            >
              <div className="h-32 w-full flex items-center justify-center">
                <img 
                  src={store.logo} 
                  alt={`${store.name} logo`} 
                  className={`max-h-20 max-w-full object-contain transition-all duration-500 group-hover:scale-110 ${['Stadsmissionen', 'Nytorget 6', 'Meatballs for the People', 'Bladverket', 'Capanna Verde'].includes(store.name) ? 'brightness-0 opacity-80' : ''}`} 
                  style={{ transform: `scale(${store.scale || 1.0})` }}
                />
              </div>
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
