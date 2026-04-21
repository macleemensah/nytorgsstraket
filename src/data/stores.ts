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
import nytorgetHero from '../assets/places/nytorget.png';
import axelLandquistHero from '../assets/places/axel-landquist.png';
import aesopHero from '../assets/stores/aesop/hero.avif';
import aesopGallery1 from '../assets/stores/aesop/gallery1.avif';
import aesopGallery2 from '../assets/stores/aesop/gallery2.avif';
import houseOfTellHero from '../assets/stores/house-of-tell/hero.jpg';
import houseOfTellGallery1 from '../assets/stores/house-of-tell/gallery1.jpg';
import houseOfTellGallery2 from '../assets/stores/house-of-tell/gallery2.jpg';
import store654Hero from '../assets/stores/654/hero.jpg';
import store654Gallery1 from '../assets/stores/654/gallery1.jpg';
import store654Gallery2 from '../assets/stores/654/gallery2.jpg';
import store654Gallery3 from '../assets/stores/654/gallery3.jpg';
import capannaVerdeHero from '../assets/stores/capanna-verde/hero.jpg';
import capannaVerdeGallery1 from '../assets/stores/capanna-verde/gallery1.jpg';
import capannaVerdeGallery2 from '../assets/stores/capanna-verde/gallery2.jpg';
import klattermusenHero from '../assets/stores/klattermusen/hero.jpg';
import klattermusenGallery1 from '../assets/stores/klattermusen/gallery1.jpg';
import klattermusenGallery2 from '../assets/stores/klattermusen/gallery2.jpg';
import klattermusenGallery3 from '../assets/stores/klattermusen/gallery3_new.jpg';
import bladverketHero from '../assets/stores/bladverket/hero.webp';
import bladverketGallery1 from '../assets/stores/bladverket/gallery1.webp';
import bladverketGallery2 from '../assets/stores/bladverket/gallery2.jpg';
import stadsmissionenHero from '../assets/stores/stadsmissionen/hero.webp';
import stadsmissionenGallery1 from '../assets/stores/stadsmissionen/gallery1.jpg';
import lykkeStoreHero from '../assets/stores/lykke-store/hero.webp';
import lykkeStoreGallery1 from '../assets/stores/lykke-store/gallery1.webp';
import parlansHero from '../assets/stores/parlans/hero.webp';
import parlansGallery1 from '../assets/stores/parlans/gallery1.webp';
import parlansGallery2 from '../assets/stores/parlans/gallery2.jpg';
import apcStoreHero from '../assets/stores/apc-store/hero.webp';
import apcStoreGallery1 from '../assets/stores/apc-store/gallery1.webp';
import apcStoreGallery2 from '../assets/stores/apc-store/gallery2.webp';
import meatballsHero from '../assets/stores/meatballs/hero.jpg';
import meatballsGallery1 from '../assets/stores/meatballs/gallery1.jpg';
import meatballsGallery2 from '../assets/stores/meatballs/gallery2.jpg';
import nytorget6Hero from '../assets/stores/nytorget6/hero.jpg';
import nytorget6Gallery1 from '../assets/stores/nytorget6/gallery1.jpg';
import nytorget6Gallery2 from '../assets/stores/nytorget6/gallery2.jpg';
import urbanDeliHero from '../assets/stores/urban-deli/hero.jpg';
import urbanDeliGallery1 from '../assets/stores/urban-deli/gallery1.jpg';
import urbanDeliGallery2 from '../assets/stores/urban-deli/gallery2.jpg';
import psMatsalHero from '../assets/stores/ps-matsal/hero.jpg';
import psMatsalGallery1 from '../assets/stores/ps-matsal/gallery1.jpg';
import psMatsalGallery2 from '../assets/stores/ps-matsal/gallery2.jpg';
import psMatsalGallery3 from '../assets/stores/ps-matsal/gallery3.jpg';
import retroHero from '../assets/stores/retro/hero.webp';
import retroGallery1 from '../assets/stores/retro/gallery1.jpg';
import retroGallery2 from '../assets/stores/retro/gallery2.png';


export type StoreCategory = 'Butiker' | 'Kaféer' | 'Kultur och platser' | 'Mat & Dryck';

export interface Store {
  slug: string;
  name: string;
  category: StoreCategory;
  logo: string;
  url: string;
  extra?: string;
  openingHours: string[];
  scale: number;
  description: string;
  heroImage: string;
  galleryImages: string[];
  address: string;
}

export const STORES: Store[] = [
  {
    slug: 'lykke',
    name: "Lykke",
    category: 'Kaféer',
    logo: lykkeLogo,
    url: "https://lykkenytorget.se",
    openingHours: [
      "Mån-tis 9–18",
      "Ons-tor 9–22",
      "Fre-lör 9–00",
      "Söndag 9–18"
    ],
    scale: 0.85,
    description: "Lykke Nytorget är vårt hjärta och vardagsrum på Södermalm. Vi erbjuder specialkaffe från vårt egna rosteri, fantastiskt bröd, frukost hela dagen och god lunch. På kvällen förvandlas kaffebaren till ett skönt häng med hantverksöl, naturvin och mindre rätter.",
    heroImage: lykkeStoreHero,
    galleryImages: [
      lykkeStoreHero,
      lykkeStoreGallery1
    ],
    address: "Nytorgsgatan 38, Stockholm"
  },
  {
    slug: 'parlans-konfektyr',
    name: "Pärlans Konfektyr",
    category: 'Butiker',
    logo: parlanLogo,
    url: "https://www.parlanskonfektyr.se/",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 11–16"
    ],
    scale: 1.3,
    description: "Kärleken till det fina mathantverket, ett oklanderligt öga för estetik och en stund av glädje och nostalgi inslaget i cellofan. Pärlans konfektkokerskor kokar mjuk, ljuvlig gräddkola smaksatt med allt från vanilj och havssalt till lakrits eller passion.",
    heroImage: parlansHero,
    galleryImages: [
      parlansHero,
      parlansGallery1,
      parlansGallery2
    ],
    address: "Nytorgsgatan 38, Stockholm"
  },
  {
    slug: 'apc',
    name: "A.P.C.",
    category: 'Butiker',
    logo: apcLogo,
    url: "https://www.apcstore.com",
    openingHours: [
      "Mån-lör 10:30–18:30",
      "Söndag 11–16"
    ],
    scale: 0.7,
    description: "A.P.C. står för Atelier de Production et de Création. Det franska varumärket grundades 1987 av Jean Touitou med fokus på minimalistisk design och en perfekt skuren denimkollektion i japanskt råtyg. Idag erbjuds en komplett herr- och damgarderob som utstrålar avslappnad elegans.",
    heroImage: apcStoreHero,
    galleryImages: [
      apcStoreHero,
      apcStoreGallery1,
      apcStoreGallery2
    ],
    address: "Nytorgsgatan 38, Stockholm"
  },
  {
    slug: 'aesop',
    name: "Aesop",
    category: 'Butiker',
    logo: aesopLogo,
    url: "https://www.aesop.com",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 12–16"
    ],
    scale: 1.2,
    description: "Aesop SoFo är designad i samarbete med den lokala arkitektbyrån In Praise of Shadows. Butiken är utformad för att framkalla känslan av ett genuint 'vardagsrum' som speglar områdets gemytliga atmosfär. Interiören ramas in av en historisk teakfasad och är klädd i ljusa toner av alfanér som följer butikens mjuka, böljande väggar. Träets ådring och taktila form skapar ett samspel mellan ljus och skugga, accentuerat av hyllor i patinerad mässing.",
    heroImage: aesopHero,
    galleryImages: [
      aesopHero,
      aesopGallery1,
      aesopGallery2
    ],
    address: "Nytorgsgatan 36A, Stockholm"
  },
  {
    slug: 'urban-deli',
    name: "Urban Deli",
    category: 'Mat & Dryck',
    logo: urbandeliLogo,
    url: "https://www.urbandeli.se",
    openingHours: [
      "Deli: 08–Sent",
      "Restaurang: 11:30–Sent"
    ],
    scale: 0.95,
    description: "Urban Deli är en livlig kombination av restaurang, bar, saluhall och matbutik som erbjuder färska, noga utvalda råvaror i en pulserande atmosfär. Här möts södermalmsbor över en avslappnad middag, ett ostron i baren eller för att handla hem krispiga grönsaker och nybakat bröd.",
    heroImage: urbanDeliHero,
    galleryImages: [
      urbanDeliHero,
      urbanDeliGallery1,
      urbanDeliGallery2
    ],
    address: "Nytorget 4, Stockholm"
  },
  {
    slug: 'nytorget-6',
    name: "Nytorget 6",
    category: 'Mat & Dryck',
    logo: nytorget6Logo,
    url: "https://nytorget6.se",
    openingHours: [
      "Mån-tis 11–00",
      "Ons-lör 11–01",
      "Söndag 11–00"
    ],
    scale: 0.85,
    description: "Boka bord, kliv in – eller bli stammis och stanna hela kvällen! Nytorget 6 serverar modern och rustik europeisk mat med en stark gemenskapsanda och generös atmosfär. Menyn bjuder in till att dela mindre rätter eller njuta av fylliga huvudrätter långt in på småtimmarna.",
    heroImage: nytorget6Hero,
    galleryImages: [
      nytorget6Hero,
      nytorget6Gallery1,
      nytorget6Gallery2
    ],
    address: "Nytorget 6, Stockholm"
  },
  {
    slug: 'meatballs-for-the-people',
    name: "Meatballs for the People",
    category: 'Mat & Dryck',
    logo: meatballsLogo,
    url: "https://meatball.se",
    openingHours: [
      "Mån-tor 11–22:30",
      "Fre-lör 11–00",
      "Söndag 11–22:30"
    ],
    scale: 0.85,
    description: "Stockholms och kanske världens första köttbullebutik med restaurang. Vår vision är att erbjuda vällagad, traditionell husmanskost med innovativa inslag. Välj bland klassiska köttbullar, veganska alternativ, viltkött och serveringar präglade av genuint, svenskt mathantverk.",
    heroImage: meatballsHero,
    galleryImages: [
      meatballsHero,
      meatballsGallery1,
      meatballsGallery2
    ],
    address: "Nytorgsgatan 30, Stockholm"
  },
  {
    slug: 'klattermusen',
    name: "Klättermusens Verkstad",
    category: 'Butiker',
    logo: klattermusenLogo,
    url: "https://www.instagram.com/klattermusens.verkstad/",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 11–16"
    ],
    scale: 0.95,
    description: "Vi fungerar som en mötesplats för dagens hantverkare, kreatörer och friluftsentusiaster. Här kan du ta en kaffe och upptäcka en välkurerad miljö med vintage-friluftskläder, böcker, magasin och mycket mer.",
    heroImage: klattermusenHero,
    galleryImages: [
      klattermusenGallery1,
      klattermusenGallery2,
      klattermusenGallery3
    ],
    address: "Nytorgsgatan 36, Stockholm"
  },
  {
    slug: '654',
    name: "6/5/4",
    category: 'Butiker',
    logo: store654Logo,
    url: "https://654.se/",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 12–16"
    ],
    scale: 0.85,
    description: "Med ambitionen att vara en mötesplats för surfare öppnade vi dörrarna till vår hörna i SoFo, Södermalm 2009. Vi är surfare, vandrare, restaurangare, fikare, älskare, polare. Här finner du friheten i att inte behöva välja - du får allt. Mode, prylar, solglasögon, tält, termosar. Surf-snack och ekologiskt kaffe i vårt café.\n\nVi hyllar den nordiska tropiken och dig som vill uppleva den. Namnet 6/5/4 står för just det - tjockleken på våtdräkter ideala för surf i Sveriges uppfriskande vatten.",
    heroImage: store654Hero,
    galleryImages: [
      store654Hero,
      store654Gallery1,
      store654Gallery2,
      store654Gallery3
    ],
    address: "Nytorgsgatan 27, Stockholm"
  },
  {
    slug: 'ps-matsal',
    name: "PS Matsal",
    category: 'Mat & Dryck',
    logo: psMatsalLogo,
    url: "https://psmatsal.com",
    openingHours: [
      "Ons-lör 17–23"
    ],
    scale: 1.2,
    description: "En hemlig pärla undangömd på Nytorgsgatan – en liten matsal influerad av modern gastronomi från det nya svenska köket. Vi serverar en lekfull och ofta skiftande avsmakningsmeny, tillagad direkt framför gästernas ögon, parade med spännande viner.",
    heroImage: psMatsalHero,
    galleryImages: [
      psMatsalHero,
      psMatsalGallery1,
      psMatsalGallery2,
      psMatsalGallery3
    ],
    address: "Nytorgsgatan 42, Stockholm"
  },
  {
    slug: 'bladverket',
    name: "Bladverket",
    category: 'Butiker',
    logo: bladverketLogo,
    url: "https://bladverket.se",
    openingHours: [
      "Mån-fre 10–18",
      "Lördag 10–16",
      "Söndag 11–16"
    ],
    scale: 1.0,
    description: "Det grönskande hörnet på Nytorgsgatan. Bladverket sätter växterna, blommorna och säsongens naturliga toner i fokus. Handplockade snittblommor, rariteter till krukväxter och en noga kurerad kollektion av exklusiva krukor fyller hela butiken med liv och doft.",
    heroImage: bladverketHero,
    galleryImages: [
      bladverketHero,
      bladverketGallery1,
      bladverketGallery2
    ],
    address: "Nytorgsgatan 23A, Stockholm"
  },
  {
    slug: 'retro',
    name: "Retro",
    category: 'Mat & Dryck',
    logo: retroLogo,
    url: "https://www.retrobar.se",
    openingHours: [
      "Mån-tor 16–00",
      "Fredag 15–01",
      "Lördag 13–01",
      "Söndag 13–23"
    ],
    scale: 1.0,
    description: "Sportbar, krog och en mötesplats där du alltid är välkommen att svänga förbi oavsett tillfälle. Retro bjuder in till en härlig, stökig och prisvärd atmosfär för den perfekta afterworken. Hos oss ser du Premier League och stora matcher omringad av högljudda fans.",
    heroImage: retroHero,
    galleryImages: [
      retroHero,
      retroGallery1,
      retroGallery2
    ],
    address: "Nytorgsgatan 42, Stockholm"
  },
  {
    slug: 'stadsmissionen',
    name: "Stadsmissionen",
    category: 'Butiker',
    logo: stadsmissionenLogo,
    url: "https://www.stadsmissionen.se",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 12–16"
    ],
    scale: 0.9,
    description: "Stockholms Stadsmission på Nytorgsgatan är en noga utvald secondhandbutik med fokus på mode och inredning. Här kan du fynda allt från unika vintageplagg till moderna märkeskläder, samtidigt som du bidrar till Stadsmissionens sociala arbete för ett mänskligare samhälle.",
    heroImage: stadsmissionenHero,
    galleryImages: [
      stadsmissionenHero,
      stadsmissionenGallery1
    ],
    address: "Nytorgsgatan 44, Stockholm"
  },
  {
    slug: 'house-of-tell',
    name: "House of Tell",
    category: 'Butiker',
    logo: "/house-of-tell-logo.png",
    url: "https://www.houseoftell.com/",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 12–16"
    ],
    scale: 1.0,
    description: "House of Tell kurerar ett koncept där unika Phoebe Philo Céline plagg ryms med Hermés från Margiela-åren, The Row & Acne Studios. Teamet bakom konceptet har gedigen erfarenhet av modebranschen & erbjuder genom sitt nätverk & sourcing en helt unik mix av tidlös design av högsta kvalitet.",
    heroImage: houseOfTellHero,
    galleryImages: [
      houseOfTellHero,
      houseOfTellGallery1,
      houseOfTellGallery2
    ],
    address: "Nytorgsgatan, Stockholm"
  },
  {
    slug: 'capanna-verde',
    name: "Capanna Verde",
    category: 'Kaféer',
    logo: "/capanna-verde-logo.png",
    url: "#",
    openingHours: [
      "Mån-sön 12–18"
    ],
    scale: 0.85,
    description: "Capanna Verde drivs av min passion för kvalitet – något som började som ett personligt projekt men snabbt växte till något större tillsammans med vänner som delar samma engagemang. Efter en intensiv första sommar insåg jag att gelaton inte levde upp till mina förväntningar, och det blev startpunkten för att verkligen fördjupa sig i hantverket. Jag flyttade till Rom, där jag fick lära mig direkt från mästaren Cristiano Monaco och på nära håll upptäcka det italienska glasshantverkets traditioner och tekniker.",
    heroImage: capannaVerdeHero,
    galleryImages: [
      capannaVerdeHero,
      capannaVerdeGallery1,
      capannaVerdeGallery2
    ],
    address: "Nytorgsgatan, Stockholm"
  },
  {
    slug: 'nytorget',
    name: "Nytorget",
    category: 'Kultur och platser',
    logo: "/logo.png", // Generic logo placeholder or use a specific one if available
    url: "https://parker.stockholm/parker/nytorget/",
    openingHours: ["Öppet dygnet runt"],
    scale: 1.0,
    description: "Nytorget är ett av Södermalms mest ikoniska torg och en central mötesplats i SoFo. Med sina generösa gräsytor, populära lekpark och omgivande uteserveringar sjuder torget av liv året runt. Historiskt sett har Nytorget varit allt från avrättningsplats till marknadsplats, men idag är det hjärtat i ett av Stockholms mest levande områden.",
    heroImage: nytorgetHero,
    galleryImages: [
      nytorgetHero,
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop"
    ],
    address: "Nytorget, Södermalm"
  },
  {
    slug: 'axel-landquists-park',
    name: "Axel Landquists park",
    category: 'Kultur och platser',
    logo: "/logo.png",
    url: "https://sv.wikipedia.org/wiki/Axel_Landquists_park",
    openingHours: ["Öppet dygnet runt"],
    scale: 1.0,
    description: "Axel Landquists park är en charmig oas i korsningen Nytorgsgatan och Åsögatan. Parken är uppkallad efter Axel Landquist, en hängiven präst och social reformator som verkade i området. Här kan besökare njuta av lummig grönska och beskåda skulpturen 'Tittut', medan stadens puls pågår precis utanför.",
    heroImage: axelLandquistHero,
    galleryImages: [
      axelLandquistHero,
      "https://images.unsplash.com/photo-1507290439931-a861cf2376fb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1463936555620-2a0a5368a186?q=80&w=1000&auto=format&fit=crop"
    ],
    address: "Nytorgsgatan/Åsögatan, Södermalm"
  },
  {
    slug: 'nytorgsfesten',
    name: "Nytorgsfesten",
    category: 'Kultur och platser',
    logo: "https://www.nytorgsfesten.se/wp-content/uploads/2023/02/BILD-2-nytorgsfesten-hemsida.png",
    url: "https://www.nytorgsfesten.se/",
    openingHours: ["14-16 augusti 2026"],
    scale: 1.0,
    description: "Stockholms finaste kvartersfest är tillbaka! Tre dagar fyllda med karnevaltåg, glassfestival, loppis, musik och folkfest i hjärtat av Södermalm. Nytorgsfesten har sin själ i alla fantastiska utställare, restauranger och kringliggande verksamheter som alltid blomstrar under denna helg så oavsett tidpunkt lovar vi att ni kommer ha en trevlig stund i Stockholms finaste kvarter.",
    heroImage: "https://www.nytorgsfesten.se/wp-content/uploads/2020/05/IMG_6808-slider.jpg",
    galleryImages: [
      "https://www.nytorgsfesten.se/wp-content/uploads/2020/05/IMG_6808-slider.jpg",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop"
    ],
    address: "Nytorget, Södermalm"
  }
];
