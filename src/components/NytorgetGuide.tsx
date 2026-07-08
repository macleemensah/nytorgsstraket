import { Link } from 'react-router-dom';
import { STORES } from '../data/stores';
import FAQ from './FAQ';
import aboutImage from '../assets/about-straket.png';
import parlansHero from '../assets/stores/parlans/hero.webp';
import lykkeHero from '../assets/stores/lykke-store/hero.webp';
import urbanDeliHero from '../assets/stores/urban-deli/hero.jpg';

const getCategoryCount = (cat: string) => STORES.filter(s => s.category === cat && !s.isClosed).length;

const SEASONS = [
  {
    name: 'Vår',
    text: 'Terrasserna öppnar, Bladverket burar av vårblomster. Perfekt för en fikalunda i Axel Landquists park med kaffe från Lykke.',
  },
  {
    name: 'Sommar',
    text: 'Nytorget fylls av picknickare och barnfamiljer. Utomhusfilm på brandväggen, gelato från Capanna Verde och Nytorgsfesten i augusti.',
  },
  {
    name: 'Höst',
    text: 'Kvällsljuset längs Nytorgsgatan, PS Matsals avsmakningsmeny och nya kollektioner hos A.P.C. och House of Tell.',
  },
  {
    name: 'Vinter',
    text: 'Adventskalendern projiceras vid Åsögatan varje december. Pärlans jultoffeln, Lykkes julspecialer och stråkets mysfaktor på topp.',
  },
];

const CATEGORIES = [
  { slug: 'butiker', label: 'Butiker', cat: 'Butiker', img: parlansHero, color: '#fff0a2' },
  { slug: 'kafeer', label: 'Kaféer', cat: 'Kaféer', img: lykkeHero, color: '#afd4f1' },
  { slug: 'mat-och-dryck', label: 'Mat & Dryck', cat: 'Mat & Dryck', img: urbanDeliHero, color: '#f5c9bf' },
  {
    slug: 'kultur',
    label: 'Kultur',
    cat: 'Kultur och platser',
    img: 'https://www.nytorgsfesten.se/wp-content/uploads/2020/05/IMG_6808-slider.jpg',
    color: '#44ca4a',
  },
];

const TRANSPORT = [
  { label: 'Tunnelbana', desc: 'Skanstull eller Medborgarplatsen (röda linjen) — ca 10 min promenad.' },
  { label: 'Buss', desc: 'Linje 3, 76 eller 2 till Tjärhovsplan. Linje 59 till Folkungagatan.' },
  { label: 'Cykel', desc: 'Cykelvägar längs Folkungagatan och Götgatan. Cykelparkeringar vid Nytorget.' },
  { label: 'Bil', desc: 'Parkering längs Nytorgsgatan och Bondegatan. Avgift gäller dagtid.' },
];

export default function NytorgetGuide() {
  const activeStores = STORES.filter(s => !s.isClosed).length;

  return (
    <div className="bg-bg-paper">

      {/* 1 — Hero */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <img
          src={aboutImage}
          alt="Nytorgsgatan, Södermalm"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <Link
              to="/"
              className="text-[10px] font-din uppercase tracking-widest text-white/50 hover:text-white mb-5 transition-colors inline-flex items-center gap-2"
            >
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:arrow-left-linear" width="12" height="12"></iconify-icon>
              Hem
            </Link>
            <h1 className="text-5xl md:text-7xl font-orpheus text-white tracking-tight mb-4">
              Guide till Nytorget
            </h1>
            <p className="text-xs font-din uppercase tracking-widest text-white/60">
              SoFo · Södermalm · Stockholm
            </p>
          </div>
        </div>
      </div>

      {/* 2 — Intro + Stats */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-din mb-6">Nytorgsstråket</p>
            <h2 className="text-3xl md:text-4xl font-orpheus text-text-dark mb-8 leading-tight">
              Södermalms mest levande kvarter
            </h2>
            <div className="space-y-5 text-base text-text-dark/70 font-light leading-relaxed font-din">
              <p>
                Nytorgsstråket kallas kvarteren längs Nytorgsgatan mellan Folkungagatan och Nytorget — i hjärtat av SoFo på Södermalm. Destinationen samlar ett handplockat urval av Stockholms bästa oberoende butiker, kaféer och restauranger.
              </p>
              <p>
                Initiativet skapades 2025 av Caspar Settergren och fastighetsägaren Julius Westerdahl med visionen att lyfta fram det lokala affärslivet och skapa en levande kulturell mötesplats för stockholmare och besökare.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: `${activeStores}+`, label: 'Aktiva platser' },
              { value: '2025', label: 'Grundat' },
              { value: 'SoFo', label: 'Södermalm' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="border border-text-dark/10 p-6 flex flex-col items-center justify-center text-center aspect-square rounded-sm"
              >
                <span className="text-2xl md:text-3xl font-orpheus text-text-dark mb-2">{value}</span>
                <span className="text-[10px] uppercase tracking-widest text-text-dark/40 font-din">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Historia */}
      <section className="py-24 px-6 border-t border-text-dark/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-din mb-6">Historia</p>
            <h2 className="text-3xl md:text-4xl font-orpheus text-text-dark leading-tight">
              Hur det började
            </h2>
          </div>
          <div className="space-y-6 text-base text-text-dark/70 font-light leading-relaxed font-din">
            <p>
              Nytorget har sedan länge varit Södermalms hjärta — ett historiskt torg omgivet av röda kulturhus och lummiga träd. När Caspar Settergren och Julius Westerdahl 2025 samlade kvarterets butiker, kaféer och restauranger under ett gemensamt stråk, förstärkte de något som redan existerade: en unik koncentration av Stockholms bästa oberoende aktörer på ett och samma ställe.
            </p>
            <p>
              Sommaren 2025 lanserades stråket med utomhusvisning av Hitchcock-klassikern <em>Fönstret mot gården</em> i jätteformat mot brandväggen vid Bondegatan — ett drag som satte tonen för Nytorgsstråkets ambition att använda kvarterets ytor som kulturscen.
            </p>
            <p>
              I december 2025 projicerades Stockholms dittills största adventskalender på brandväggen vid Åsögatan — ett samarbete med 15 studenter från Berghs School of Communication som uppmärksammades av TV4 Nyheterna och P4 Radio Stockholm.
            </p>
            <p
              className="text-2xl text-brand-red leading-tight pt-2"
              style={{ fontFamily: "'Lindstaye', cursive" }}
            >
              Kultur och nyfikenhet som hörnpelare.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — Kategorigrid */}
      <section className="py-24 px-6 border-t border-text-dark/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-din mb-6">Upplev stråket</p>
          <h2 className="text-3xl md:text-4xl font-orpheus text-text-dark mb-12 leading-tight">
            Vad hittar du här?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(({ slug, label, cat, img, color }) => (
              <Link
                key={slug}
                to={`/kategori/${slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm block bg-selection"
              >
                <img
                  src={img}
                  alt={label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-4 right-4">
                  <div
                    className="inline-flex px-2.5 py-1 text-text-dark text-[10px] uppercase tracking-widest mb-2 font-din rounded-sm"
                    style={{ backgroundColor: color }}
                  >
                    {getCategoryCount(cat)} platser
                  </div>
                  <h3 className="text-xl font-orpheus text-white tracking-tight">{label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Hitta hit */}
      <section className="py-24 px-6 border-t border-text-dark/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-din mb-6">Hitta hit</p>
            <h2 className="text-3xl md:text-4xl font-orpheus text-text-dark mb-10 leading-tight">
              Så tar du dig till Nytorget
            </h2>
            <div className="divide-y divide-text-dark/10">
              {TRANSPORT.map(({ label, desc }) => (
                <div key={label} className="flex gap-6 py-6 first:pt-0">
                  <span className="text-[10px] uppercase tracking-widest text-text-dark/40 font-din w-24 shrink-0 mt-0.5">
                    {label}
                  </span>
                  <p className="text-sm font-din text-text-dark/70 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="aspect-square w-full bg-selection rounded-sm overflow-hidden border border-text-dark/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.25!2d18.077357!3d59.315534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f77fa8f609a63%3A0xe54e1a0d33e57f58!2sNytorget%2C%20Stockholm!5e0!3m2!1ssv!2sse!4v1718636400000!5m2!1ssv!2sse"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Karta över Nytorget, Stockholm"
              />
            </div>
            <p className="text-xs font-din uppercase tracking-widest text-text-dark/40 mt-3 text-center">
              Nytorget · 116 40 Stockholm
            </p>
          </div>
        </div>
      </section>

      {/* 6 — Årstider */}
      <section className="py-24 px-6 border-t border-text-dark/10 bg-selection">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-din mb-6">Hela året</p>
          <h2 className="text-3xl md:text-4xl font-orpheus text-text-dark mb-12 leading-tight">
            Nytorget genom årstiderna
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEASONS.map(({ name, text }) => (
              <div
                key={name}
                className="bg-bg-paper border border-text-dark/10 p-8 rounded-sm flex flex-col gap-4"
              >
                <h3 className="text-2xl font-orpheus text-text-dark">{name}</h3>
                <p className="text-sm font-din text-text-dark/60 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Evenemang */}
      <section className="py-24 px-6 border-t border-text-dark/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-din mb-6">Evenemang</p>
          <h2 className="text-3xl md:text-4xl font-orpheus text-text-dark mb-12 leading-tight">
            Händer på stråket
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://nytorgsfesten.se"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-text-dark/10 p-8 rounded-sm hover:border-text-dark/30 transition-colors block"
            >
              <span className="inline-flex px-3 py-1 bg-brand-red text-white text-[10px] uppercase tracking-widest font-din rounded-sm mb-6">
                14–16 aug 2026
              </span>
              <h3 className="text-2xl md:text-3xl font-orpheus text-text-dark mb-4 group-hover:text-brand-red transition-colors">
                Nytorgsfesten
              </h3>
              <p className="text-sm font-din text-text-dark/60 leading-relaxed mb-6">
                Södermalms finaste kvartersfest — tre dagar med karnevaltåg, glassfestival, loppis och livemusik runt Nytorget. Arrangeras av Södermalms Musikförening.
              </p>
              <span className="text-xs uppercase tracking-widest font-din text-text-dark/40 group-hover:text-brand-red transition-colors inline-flex items-center gap-2">
                Läs mer
                {/* @ts-expect-error - Custom element */}
                <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14"></iconify-icon>
              </span>
            </a>
            <div className="border border-text-dark/10 p-8 rounded-sm">
              <span className="inline-flex px-3 py-1 bg-selection text-text-dark text-[10px] uppercase tracking-widest font-din rounded-sm mb-6">
                Sommar & Vinter
              </span>
              <h3 className="text-2xl md:text-3xl font-orpheus text-text-dark mb-4">
                Kultur på brandväggen
              </h3>
              <p className="text-sm font-din text-text-dark/60 leading-relaxed">
                Nytorgsstråket använder kvarterets brandväggar som kulturscen. Sommaren 2025 visades Hitchcock-klassikern <em>Fönstret mot gården</em> utomhus. I december projicerades Stockholms största adventskalender — ett samarbete med Berghs School of Communication som rapporterades av TV4 och P4 Radio Stockholm.
              </p>
              <p className="text-xs uppercase tracking-widest font-din text-text-dark/40 mt-6">Återkommer varje år</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Axel Landquists park */}
      <section className="py-24 px-6 border-t border-text-dark/10 bg-selection">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-din mb-6">Dold pärla</p>
            <h2 className="text-3xl md:text-4xl font-orpheus text-text-dark mb-6 leading-tight">
              Axel Landquists park
            </h2>
            <p className="text-base font-din text-text-dark/70 leading-relaxed mb-8 max-w-lg">
              Få stockholmare känner till den lummiga Axel Landquists park, gömd i hörnet Nytorgsgatan/Åsögatan — precis där stråkets adventskalender projiceras varje december. En grön oas mitt bland kaféer och butiker, perfekt för en kopp kaffe från Lykke i handen.
            </p>
            <a
              href="https://sv.wikipedia.org/wiki/Axel_Landquists_park"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-text-dark/20 rounded-full text-text-dark text-xs uppercase tracking-[0.15em] font-din font-medium hover:bg-text-dark hover:text-white transition-all duration-300"
            >
              Läs om parken på Wikipedia
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14"></iconify-icon>
            </a>
          </div>
          <div className="w-full lg:w-2/5 bg-bg-paper border border-text-dark/10 p-8 rounded-sm">
            <div className="divide-y divide-text-dark/10">
              {[
                { label: 'Plats', desc: 'Hörnet Nytorgsgatan / Åsögatan, Södermalm' },
                { label: 'Närmast', desc: 'Lykke (38 m), Capanna Verde, Klättermusen Verkstad' },
                { label: 'Karaktär', desc: 'Lummig stadspark med bänkar och grönska' },
                { label: 'Känd för', desc: 'Stråkets adventskalender projiceras på väggen intill varje december' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="text-[10px] uppercase tracking-widest text-text-dark/40 font-din w-20 shrink-0 mt-0.5">
                    {label}
                  </span>
                  <span className="text-sm font-din text-text-dark/70 leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9 — FAQ */}
      <FAQ />

    </div>
  );
}
