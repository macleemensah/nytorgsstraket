

const ExploreStreet: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="relative bg-[#ebeae6] w-full aspect-[4/5] md:aspect-[21/9] rounded-sm overflow-hidden flex items-center justify-center">
        <div className="absolute top-8 left-8 z-10">
          <h2 className="text-2xl md:text-3xl font-orpheus tracking-tight text-text-dark font-light">Utforska gatan</h2>
          <p className="text-base text-text-dark/60 mt-2 font-light">Håll muspekaren över för att upptäcka platser</p>
        </div>
        
        {/* Abstract Map Background */}
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-10 mix-blend-multiply" 
          alt="Map Texture" 
        />
        
        {/* Simple interactive markers for visualization */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/3 group cursor-pointer">
            <div className="w-3 h-3 bg-brand-red rounded-full animate-pulse"></div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-text-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Urban Deli
            </div>
          </div>
          <div className="absolute top-1/4 left-2/3 group cursor-pointer">
            <div className="w-3 h-3 bg-brand-red rounded-full animate-pulse"></div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-text-dark text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Grandpa
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreStreet;
