export default function NytorgetGuide() {
  return (
    <section className="bg-bg-paper py-24 px-6 border-t border-text-dark/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Vänster: Innehåll optimerat för AI-sök (AEO/GEO) */}
        <div className="flex-1 space-y-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-orpheus text-text-dark mb-6">
              Vad finns på Nytorget?
            </h2>
            {/* 130-170 ord för AI-citerbarhet */}
            <p className="text-lg text-text-dark/80 font-light leading-relaxed max-w-2xl">
              Nytorget är ett historiskt och levande torg beläget i hjärtat av SoFo på Södermalm i Stockholm. Idag är torget mest känt som en pulserande mötesplats omgiven av Nytorgsstråkets populära restauranger, unika vintagebutiker och mysiga kaféer. På själva Nytorget hittar du vidsträckta gräsytor perfekta för picknick under sommarhalvåret, omgivna av lummiga träd. För barnfamiljer erbjuder torget en av Södermalms mest omtyckta och välutrustade lekplatser med gungor, klätterställningar och plaskdamm. Kring Nytorget bevaras även stockholmshistorien genom de pittoreska, röda kulturhusen längs med torgets östra sida. Oavsett om du söker god mat, shopping, eller bara vill njuta av folklivet är Nytorget den optimala utgångspunkten för att uppleva Södermalms unika atmosfär.
            </p>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-orpheus text-text-dark mb-4">
              Vilka restauranger ligger vid Nytorget?
            </h3>
            <p className="text-lg text-text-dark/80 font-light leading-relaxed max-w-2xl">
              Nytorget är ett av Stockholms mest krogtäta och populära områden för mat och dryck. Runt torget och längs Nytorgsgatan hittar du en mångsidig mix av kulinariska upplevelser som passar alla tider på dygnet. Urban Deli kombinerar restaurang, saluhall och bar i en livlig miljö, medan Nytorget 6 erbjuder en pulserande kvarterskrogskänsla med europeisk meny. Letar du efter traditionell svensk husmanskost är Meatballs for the People ett självklart val med sitt innovativa köttbullekoncept. För kaffeälskare serverar Lykke Nytorget specialkaffe från eget rosteri. Dessutom finns exklusivare pärlor som PS Matsal för avsmakningsmenyer och retrokrogar för en mer avslappnad kväll, vilket gör Nytorget till en komplett gastronomisk destination i SoFo.
            </p>
          </div>
          
          <div>
            <h3 className="text-3xl md:text-4xl font-orpheus text-text-dark mb-4">
              Är Nytorget bra för barn?
            </h3>
            <p className="text-lg text-text-dark/80 font-light leading-relaxed max-w-2xl">
              Ja, Nytorget är en utmärkt och mycket barnvänlig destination på Södermalm. Torget stoltserar med en av stadsdelens mest populära och välskötta lekplatser, vackert inramad av träd. Här finns trygga ytor med gungor, sandlådor och klätterställningar som passar både yngre och äldre barn. Under de varma sommarmånaderna öppnas lekparkens lilla plaskdamm, vilket gör det till en perfekt oas för svalka och lek i stadsmiljön. De stora gräsytorna runt lekparken bjuder in till familjepicknickar och lek. Eftersom torget kantas av barnvänliga kaféer, gelaterior och restauranger är det alltid nära till både fika, mat och toaletter, vilket gör Nytorget till en trygg och bekväm plats för hela familjen att tillbringa dagen på.
            </p>
          </div>
        </div>

        {/* Höger: Karta och Info */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-8 border border-text-dark/10 sticky top-32">
            <h3 className="text-xs uppercase tracking-widest text-text-dark/40 mb-4 font-din">Hitta till Nytorget</h3>
            <div className="aspect-square w-full bg-selection mb-6 rounded-sm overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.25!2d18.077357!3d59.315534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f77fa8f609a63%3A0xe54e1a0d33e57f58!2sNytorget%2C%20Stockholm!5e0!3m2!1ssv!2sse!4v1718636400000!5m2!1ssv!2sse" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Karta över Nytorget, Stockholm"
              ></iframe>
            </div>
            <div className="space-y-4 font-din text-text-dark/80 text-sm">
              <div className="flex gap-4">
                <span className="text-text-dark/40 w-16 uppercase tracking-widest text-xs">Adress</span>
                <span>Nytorget<br />116 40 Stockholm<br />Södermalm (SoFo)</span>
              </div>
              <div className="flex gap-4 pt-4 border-t border-text-dark/10">
                <span className="text-text-dark/40 w-16 uppercase tracking-widest text-xs">Kommunalt</span>
                <span>T-bana Skanstull eller Medborgarplatsen (ca 10 min promenad).<br />Buss 3, 76 eller 2 till Tjärhovsplan.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
