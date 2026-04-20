import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isSv = i18n.language === 'sv';

  return (
    <>
      <SEO
        title={isSv ? 'Användarvillkor | Nytorgsstråket' : 'Terms of Use | Nytorgsstråket'}
        description={isSv ? 'Läs Nytorgsstråkets användarvillkor för webbplatsen.' : 'Read Nytorgsstråket\'s terms of use for the website.'}
        canonical="/anvandarvillkor"
      />
      <Navbar />
      <main className="bg-bg-paper min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-text-dark/40 hover:text-brand-red transition-colors font-din mb-12"
          >
            ← {isSv ? 'Tillbaka' : 'Back'}
          </Link>

          <h1 className="font-orpheus text-4xl md:text-5xl font-light text-text-dark mb-4 leading-tight">
            {isSv ? 'Användarvillkor' : 'Terms of Use'}
          </h1>
          <p className="text-xs uppercase tracking-widest text-text-dark/30 font-din mb-16">
            {isSv ? 'Senast uppdaterad: April 2025' : 'Last updated: April 2025'}
          </p>

          <div className="prose prose-sm max-w-none font-din text-text-dark/70 leading-relaxed space-y-8 text-base">
            {isSv ? (
              <>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">1. Användning av webbplatsen</h2>
                  <p>Genom att besöka nytorgsstraket.se accepterar du dessa användarvillkor. Webbplatsen är avsedd för informationsändamål om Nytorgsstråket och dess hyresgäster.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">2. Innehåll och upphovsrätt</h2>
                  <p>Allt innehåll på webbplatsen – text, bilder, logotyper och grafik – ägs av Nytorgsstråket eller respektive rättighetsinnehavare. Reproduktion utan skriftligt tillstånd är inte tillåten.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">3. Externa länkar</h2>
                  <p>Webbplatsen kan innehålla länkar till externa webbplatser. Nytorgsstråket ansvarar inte för innehållet på dessa externa sidor.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">4. Ansvarsbegränsning</h2>
                  <p>Nytorgsstråket kan inte garantera att informationen på webbplatsen alltid är fullständig, korrekt eller aktuell. Vi förbehåller oss rätten att ändra innehållet utan föregående meddelande.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">5. Tillämplig lag</h2>
                  <p>Dessa villkor regleras av svensk lag. Eventuella tvister ska avgöras av svensk domstol.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">6. Kontakt</h2>
                  <p>Vid frågor om dessa villkor, kontakta oss på <a href="mailto:info@nytorgsstraket.se" className="text-brand-red underline">info@nytorgsstraket.se</a>.</p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">1. Use of the Website</h2>
                  <p>By visiting nytorgsstraket.se, you accept these terms of use. The website is intended for informational purposes about Nytorgsstråket and its tenants.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">2. Content and Copyright</h2>
                  <p>All content on the website — text, images, logos, and graphics — is owned by Nytorgsstråket or respective rights holders. Reproduction without written permission is not permitted.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">3. External Links</h2>
                  <p>The website may contain links to external websites. Nytorgsstråket is not responsible for the content of these external sites.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">4. Limitation of Liability</h2>
                  <p>Nytorgsstråket cannot guarantee that the information on the website is always complete, accurate, or up to date. We reserve the right to change content without prior notice.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">5. Applicable Law</h2>
                  <p>These terms are governed by Swedish law. Any disputes shall be resolved by Swedish courts.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">6. Contact</h2>
                  <p>For questions about these terms, contact us at <a href="mailto:info@nytorgsstraket.se" className="text-brand-red underline">info@nytorgsstraket.se</a>.</p>
                </section>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
