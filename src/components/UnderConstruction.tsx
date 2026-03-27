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
          style={{ fontFamily: "'Lindstaye', cursive" }}
        >
          Här växer Nytorgsstråket fram
        </h1>
        <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed">
          Just nu arbetar vi för fullt med att skapa en ny digital mötesplats för Nytorgsstråket. Snart hittar du allt om våra verksamheter, evenemang och det lokala livet här hos oss.
        </p>
        <p className="text-[#E31837] text-lg md:text-xl font-medium font-sans">
          Håll utkik – vi öppnar snart!
        </p>
      </div>
      
      {/* Footer / Contact Detail */}
      <div className="absolute bottom-8 text-center w-full">
        <p className="text-sm font-sans text-gray-400 uppercase tracking-widest">
          Södermalm &bull; Stockholm
        </p>
      </div>
      
    </div>
  );
}
