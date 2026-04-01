import logo from '../assets/logo.png';
import lykkeLogo from '../assets/stores/lykke.webp';
import parlanLogo from '../assets/stores/parlan.png';
import apcLogo from '../assets/stores/apc.svg';
import aesopLogo from '../assets/stores/aesop.png';
import klattermusenLogo from '../assets/stores/klattermusen.png';
import store654Logo from '../assets/stores/654.avif';
import psMatsalLogo from '../assets/stores/psmatsal.png';
import meatballsLogo from '../assets/stores/meatballs.svg';
import nytorget6Logo from '../assets/stores/nytorget6.svg';
import urbandeliLogo from '../assets/stores/urbandeli.png';
import retroLogo from '../assets/stores/retro.png';
import bladverketLogo from '../assets/stores/bladverket.png';
import stadsmissionenLogo from '../assets/stores/stadsmissionen.svg';

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
    ],
    scale: 0.85
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
    ],
    scale: 1.3
  },
  {
    name: "A.P.C.",
    logo: apcLogo,
    url: "https://www.apcstore.com",
    openingHours: [
      "Mån-lör 10:30–18:30",
      "Söndag 11–16"
    ],
    scale: 0.7
  },
  {
    name: "Aesop",
    logo: aesopLogo,
    url: "https://www.aesop.com",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 12–16"
    ],
    scale: 1.2
  },
  {
    name: "Urban Deli",
    logo: urbandeliLogo,
    url: "https://www.urbandeli.se",
    openingHours: [
      "Deli: 08–Sent",
      "Restaurang: 11:30–Sent"
    ],
    scale: 0.95
  },
  {
    name: "Nytorget 6",
    logo: nytorget6Logo,
    url: "https://nytorget6.se",
    openingHours: [
      "Mån-tis 11–00",
      "Ons-lör 11–01",
      "Söndag 11–00"
    ],
    scale: 0.85
  },
  {
    name: "Meatballs for the People",
    logo: meatballsLogo,
    url: "https://meatball.se",
    openingHours: [
      "Mån-tor 11–22:30",
      "Fre-lör 11–00",
      "Söndag 11–22:30"
    ],
    scale: 0.85
  },
  {
    name: "Klättermusen Verkstad",
    logo: klattermusenLogo,
    url: "https://www.klattermusen.com/",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 11–16"
    ],
    scale: 0.95
  },
  {
    name: "6/5/4",
    logo: store654Logo,
    url: "https://654.se/",
    openingHours: [
      "Skärtorsdag: 11.00–17.00",
      "Långfredag: 12.00–17.00",
      "Påskafton: 11.00–17.00",
      "Påskdagen: 12.00–17.00",
      "Annandag Påsk: 12.00–17.00"
    ],
    scale: 0.85
  },
  {
    name: "PS Matsal",
    logo: psMatsalLogo,
    url: "https://psmatsal.com",
    openingHours: [
      "Ons-lör 17–23"
    ],
    scale: 1.2
  },
  {
    name: "Bladverket",
    logo: bladverketLogo,
    url: "https://bladverket.se",
    openingHours: [
      "Mån-fre 10–18",
      "Lördag 10–16",
      "Söndag 11–16"
    ],
    scale: 1.0
  },
  {
    name: "Retro",
    logo: retroLogo,
    url: "https://www.retrobar.se",
    openingHours: [
      "Mån-tor 16–00",
      "Fre 15–01",
      "Lör 13–01",
      "Sön 13–23"
    ],
    scale: 1.0
  },
  {
    name: "Stadsmissionen",
    logo: stadsmissionenLogo,
    url: "https://www.stadsmissionen.se",
    openingHours: [
      "Mån-fre 10–19",
      "Lördag 10–18",
      "Söndag 11–17"
    ],
    scale: 0.75
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
                  className={`max-h-20 max-w-full object-contain transition-all duration-500 group-hover:scale-110 ${['Stadsmissionen', 'Nytorget 6', 'Meatballs for the People', 'Bladverket'].includes(store.name) ? 'brightness-0 opacity-80' : ''}`} 
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
