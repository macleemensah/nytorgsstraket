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

export type StoreCategory = 'Butiker' | 'Kaféer' | 'Kultur' | 'Mat & Dryck';

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
    heroImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop"
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
      "Söndag 11–16",
      "Långfredag 11–16",
      "Annandag påsk 11–16"
    ],
    scale: 1.3,
    description: "Kärleken till det fina mathantverket, ett oklanderligt öga för estetik och en stund av glädje och nostalgi inslaget i cellofan. Pärlans konfektkokerskor kokar mjuk, ljuvlig gräddkola smaksatt med allt från vanilj och havssalt till lakrits eller passion.",
    heroImage: "https://images.unsplash.com/photo-1601614397779-138374a52ac1?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499195333224-3ce974e15f81?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520138902598-a28d54c0e61d?q=80&w=1000&auto=format&fit=crop"
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
    heroImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop"
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
    description: "Sedan starten i Melbourne 1987 har Aesop strävat efter att skapa högkvalitativa produkter för hud, hår och kropp. I den specialdesignade butiken på Nytorgsgatan erbjuds personlig konsultation av utbildad personal som hjälper dig hitta rätt hudvårdsrutin för dina behov.",
    heroImage: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop"
    ],
    address: "Nytorgsgatan 38, Stockholm"
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
    heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop"
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
    heroImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop"
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
    heroImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1606851094655-b25cb8bfb216?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
    ],
    address: "Nytorgsgatan 30, Stockholm"
  },
  {
    slug: 'klattermusen',
    name: "Klättermusen Verkstad",
    category: 'Butiker',
    logo: klattermusenLogo,
    url: "https://www.klattermusen.com/",
    openingHours: [
      "Mån-fre 11–18",
      "Lördag 11–17",
      "Söndag 11–16"
    ],
    scale: 0.95,
    description: "Sedan 1984 har Klättermusen utvecklat utrustning för klättrare som sätter maximal säkerhet för kropp och minimal påverkan på naturen i främsta rummet. I vår butik erbjuder vi reparera, utforska och prova vårt noggrant testade sortiment för enastående expeditioner.",
    heroImage: "https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1000&auto=format&fit=crop"
    ],
    address: "Nytorgsgatan 38, Stockholm"
  },
  {
    slug: '654',
    name: "6/5/4",
    category: 'Butiker',
    logo: store654Logo,
    url: "https://654.se/",
    openingHours: [
      "Skärtorsdag 11–17",
      "Långfredag 12–17",
      "Påskafton 11–17",
      "Påskdagen 12–17",
      "Annandag påsk 12–17"
    ],
    scale: 0.85,
    description: "Utgåva av nischbrands, surfing, friluftsliv, kaffe och gemenskap – allt format av en djup passion. 6/5/4 är inte bara en kläd- och prylaffär; det är en kaffebar och en hub på Södermalm där de som älskar att ta med vildmarken till stan umgås och handlar.",
    heroImage: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1515668236457-83c3b876484a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505632958218-4f23394784a6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595180630831-2559b3be282f?q=80&w=1000&auto=format&fit=crop"
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
    heroImage: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop"
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
      "Söndag 11–16",
      "Skärtorsdag 10–18",
      "Långfredag Stängt",
      "Påskafton 10–16",
      "Påskdagen Stängt",
      "Annandag påsk Stängt"
    ],
    scale: 1.0,
    description: "Det grönskande hörnet på Nytorgsgatan. Bladverket sätter växterna, blommorna och säsongens naturliga toner i fokus. Handplockade snittblommor, rariteter till krukväxter och en noga kurerad kollektion av exklusiva krukor fyller hela butiken med liv och doft.",
    heroImage: "https://images.unsplash.com/photo-1507290439931-a861cf2376fb?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1455621481073-d5bc1c40e3cb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1463936555620-2a0a5368a186?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461301214746-1e109215d6d3?q=80&w=1000&auto=format&fit=crop"
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
    heroImage: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582103222325-568eb219ca66?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1000&auto=format&fit=crop"
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
      "Mån-fre 10–19",
      "Lördag 10–18",
      "Söndag 11–17"
    ],
    scale: 0.75,
    description: "Ett stenkast från pulsen på Södermalm erbjuder Stockholms Stadsmissions second hand en noga kurerad mix av vintagekläder, retrofynd och prylar för hemmet. En fantastisk möjlighet att hitta guldkorn till garderoben samtidigt som du stöttar ett viktigt socialt och miljömässigt arbete.",
    heroImage: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1489987707023-afc6328ce7ef?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601334861962-e64e9a30fa59?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588665793666-4e5c531e285a?q=80&w=1000&auto=format&fit=crop"
    ],
    address: "Nytorgsgatan 36, Stockholm"
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
      "Söndag 12–16",
      "Skärtorsdag 11–18",
      "Långfredag 12–16",
      "Påskafton 11–17",
      "Påskdagen 12–16"
    ],
    scale: 1.0,
    description: "House of Tell erbjuder noga utvald inredning och design.",
    heroImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop"
    ],
    address: "Nytorgsgatan, Stockholm"
  }
];
