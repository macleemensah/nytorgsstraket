
import logo from '../assets/logo.png';

const Hero: React.FC = () => {
  return (
    <header className="relative h-screen w-full flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-text-dark">
        <img 
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" 
          alt="Nytorget Atmosphere" 
          className="w-full h-full object-cover opacity-70 scale-105 animate-pulse-slow lg:animate-[pulse_20s_ease-in-out_infinite_alternate]" 
          style={{ filter: 'saturate(0.8)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center mt-8">
        <h1 className="sr-only">Nytorgsstråket</h1>
        <div className="mb-12">
          <img 
            src={logo} 
            alt="Nytorgsstråket Logo" 
            className="h-48 md:h-64 lg:h-80 w-auto object-contain drop-shadow-2xl"
          />
        </div>
        <p className="text-2xl md:text-3xl font-medium italic max-w-2xl mx-auto text-white leading-relaxed px-4 drop-shadow-md font-serif">
          Upptäck de noga utvalda butikerna, kaféerna, restaurangerna och kulturen runt Nytorget.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-sm uppercase tracking-widest font-extralight">Scrolla</span>
        {/* @ts-expect-error - Framer Motion orientation property */}
        <iconify-icon icon="solar:arrow-down-linear" width="20" height="20"></iconify-icon>
      </div>
    </header>
  );
};

export default Hero;
