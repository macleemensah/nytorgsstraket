import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isSv = i18n.language === 'sv';

  return (
    <>
      <SEO
        title={isSv ? 'Integritetspolicy | Nytorgsstråket' : 'Privacy Policy | Nytorgsstråket'}
        description={isSv ? 'Läs om hur Nytorgsstråket hanterar dina personuppgifter.' : 'Read about how Nytorgsstråket handles your personal data.'}
        canonical="/integritetspolicy"
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
            {isSv ? 'Integritetspolicy' : 'Privacy Policy'}
          </h1>
          <p className="text-xs uppercase tracking-widest text-text-dark/30 font-din mb-16">
            {isSv ? 'Senast uppdaterad: April 2025' : 'Last updated: April 2025'}
          </p>

          <div className="prose prose-sm max-w-none font-din text-text-dark/70 leading-relaxed space-y-8 text-base">
            {isSv ? (
              <>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">1. Personuppgiftsansvarig</h2>
                  <p>Nytorgsstråket, Nytorgsgatan 36–38, 118 40 Stockholm, är personuppgiftsansvarig för behandlingen av dina personuppgifter på denna webbplats.</p>
                  <p className="mt-2">Kontakt: <a href="mailto:info@nytorgsstraket.se" className="text-brand-red underline">info@nytorgsstraket.se</a></p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">2. Vilka uppgifter samlar vi in?</h2>
                  <p>Vi samlar in de personuppgifter du frivilligt lämnar till oss, till exempel:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>E-postadress (vid nyhetsbrevsprenumeration)</li>
                    <li>Webbläsardata och besöksinformation via analysverktyg (anonymiserat)</li>
                  </ul>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">3. Hur använder vi dina uppgifter?</h2>
                  <p>Vi använder dina uppgifter för att:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Skicka nyhetsbrev och information om evenemang (med ditt samtycke)</li>
                    <li>Förbättra vår webbplats och användarupplevelsen</li>
                  </ul>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">4. Laglig grund</h2>
                  <p>Behandlingen baseras på ditt samtycke (GDPR art. 6.1a) eller på vårt berättigade intresse att förbättra tjänsten (art. 6.1f).</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">5. Dina rättigheter</h2>
                  <p>Du har rätt att begära tillgång till, rättelse eller radering av dina personuppgifter. Du kan också återkalla ditt samtycke när som helst. Kontakta oss på <a href="mailto:info@nytorgsstraket.se" className="text-brand-red underline">info@nytorgsstraket.se</a>.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">6. Cookies</h2>
                  <p>Vår webbplats kan använda cookies för att förbättra användarupplevelsen och samla in anonym statistik. Du kan när som helst justera dina cookie-inställningar i webbläsaren.</p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">1. Data Controller</h2>
                  <p>Nytorgsstråket, Nytorgsgatan 36–38, 118 40 Stockholm, Sweden, is the data controller for the processing of your personal data on this website.</p>
                  <p className="mt-2">Contact: <a href="mailto:info@nytorgsstraket.se" className="text-brand-red underline">info@nytorgsstraket.se</a></p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">2. What Data Do We Collect?</h2>
                  <p>We collect personal data that you voluntarily provide, such as:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Email address (when subscribing to our newsletter)</li>
                    <li>Browser and visit data via analytics tools (anonymized)</li>
                  </ul>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">3. How Do We Use Your Data?</h2>
                  <p>We use your data to:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Send newsletters and event information (with your consent)</li>
                    <li>Improve our website and user experience</li>
                  </ul>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">4. Legal Basis</h2>
                  <p>Processing is based on your consent (GDPR Art. 6.1a) or our legitimate interest in improving the service (Art. 6.1f).</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">5. Your Rights</h2>
                  <p>You have the right to request access to, correction of, or deletion of your personal data. You may also withdraw your consent at any time. Contact us at <a href="mailto:info@nytorgsstraket.se" className="text-brand-red underline">info@nytorgsstraket.se</a>.</p>
                </section>
                <section>
                  <h2 className="font-orpheus text-xl text-text-dark mb-3">6. Cookies</h2>
                  <p>Our website may use cookies to improve user experience and collect anonymous statistics. You can adjust your cookie settings in your browser at any time.</p>
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

export default PrivacyPage;
