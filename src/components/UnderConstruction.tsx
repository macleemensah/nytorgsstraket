import logo from '../assets/logo.png';

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 relative">
      
      {/* Brand Logo */}
      <div className="mb-12">
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
      
      {/* Footer / Contact Detail */}
      <div className="absolute bottom-8 text-center w-full">
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
