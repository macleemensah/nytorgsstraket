import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Newsletter: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // TODO: Connect this to your future backend or email service (e.g., Mailchimp, Resend, Supabase)
    // Simulated API call delay for UX:
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="bg-text-dark py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">

        {/* Label */}
        <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30 mb-6 font-din">
          {t('newsletter.label')}
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-orpheus font-light tracking-tight text-white leading-tight mb-6">
          {t('newsletter.title_span1')}<br />
          <span className="italic font-normal text-brand-red">{t('newsletter.title_span2')}</span>
        </h2>

        {/* Subtext */}
        <p className="text-base text-white/50 font-light leading-relaxed mb-12 max-w-md mx-auto">
          {t('newsletter.description')}
        </p>

        {/* Form */}
        {submitted ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red/20 flex items-center justify-center">
              {/* @ts-expect-error - Custom element */}
              <iconify-icon icon="solar:check-circle-linear" width="28" height="28" style={{ color: '#DA1A21' }}></iconify-icon>
            </div>
            <p className="text-white/70 font-light text-sm tracking-wide font-din">
              {t('newsletter.success')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
          >
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              className="w-full sm:w-auto sm:flex-1 max-w-sm bg-white/5 border border-white/15 rounded-full px-6 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-red transition-colors font-din"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto shrink-0 px-7 py-3.5 bg-brand-red text-white text-sm uppercase tracking-[0.12em] font-din font-medium rounded-full hover:bg-brand-red/90 transition-colors duration-300 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  {/* @ts-expect-error - Custom element */}
                  <iconify-icon icon="solar:spinner-linear" class="animate-spin"></iconify-icon>
                  {t('newsletter.sending')}
                </>
              ) : (
                t('newsletter.button')
              )}
            </button>
          </form>
        )}

        {/* Privacy note */}
        <p className="mt-6 text-[10px] uppercase tracking-widest text-white/20 font-din">
          {t('newsletter.privacy')}
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
