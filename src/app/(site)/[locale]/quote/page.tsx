'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle, Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import styles from '@/styles/pages.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function QuotePage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { num: 1, label: t('quote_page.step_service') },
    { num: 2, label: t('quote_page.step_details') },
    { num: 3, label: t('quote_page.step_contact') },
  ];

  const PrevArrow = isAr ? ArrowRight : ArrowLeft;
  const NextArrow = isAr ? ArrowLeft : ArrowRight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.pageHero}>
        <motion.div className={styles.pageHeroContent} initial="hidden" animate="visible" variants={stagger}>
          <motion.span className={styles.pageHeroLabel} variants={fadeUp}>{t('quote_page.label')}</motion.span>
          <motion.h1 className={styles.pageHeroTitle} variants={fadeUp}>{t('quote_page.title')}</motion.h1>
          <motion.p className={styles.pageHeroDesc} variants={fadeUp}>{t('quote_page.description')}</motion.p>
        </motion.div>
      </section>

      {/* Quote Form */}
      <section className={styles.quoteFormSection} aria-label={isAr ? 'نموذج طلب عرض سعر' : 'Quote request form'}>
        <div className="container">
          {/* Steps Indicator */}
          {!submitted && (
            <div className={styles.quoteSteps} role="list" aria-label={isAr ? 'خطوات النموذج' : 'Form steps'}>
              {steps.map((s) => (
                <div key={s.num} role="listitem" className={`${styles.quoteStep} ${step === s.num ? styles.quoteStepActive : ''} ${step > s.num ? styles.quoteStepDone : ''}`} aria-current={step === s.num ? 'step' : undefined}>
                  <div className={styles.quoteStepNum} aria-hidden="true">
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.quoteFormCard}>
            {submitted ? (
              <div className={styles.successMessage} role="alert" aria-live="assertive">
                <div className={styles.successIcon}><CheckCircle size={40} aria-hidden="true" /></div>
                <h3 className={styles.successTitle}>{isAr ? 'تم إرسال طلبك!' : 'Request Sent!'}</h3>
                <p className={styles.successDesc}>{t('quote_page.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.h3 variants={fadeUp} style={{ marginBottom: 'var(--space-lg)', fontSize: 'var(--text-xl)' }}>
                      {t('quote_page.service_type')}
                    </motion.h3>
                    <motion.div className={styles.serviceSelectGrid} variants={fadeUp} role="radiogroup" aria-label={isAr ? 'اختر نوع الخدمة' : 'Select service type'}>
                      {services.slice(0, 12).map((service) => {
                        const Icon = service.icon;
                        const content = isAr ? service.ar : service.en;
                        const isSelected = selectedService === service.slug;
                        return (
                          <button
                            key={service.slug}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            className={`${styles.serviceSelectItem} ${isSelected ? styles.serviceSelectItemActive : ''}`}
                            onClick={() => setSelectedService(service.slug)}
                          >
                            <div className={styles.serviceSelectIcon} aria-hidden="true"><Icon size={22} /></div>
                            {content.name}
                          </button>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                  <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.h3 variants={fadeUp} style={{ marginBottom: 'var(--space-lg)', fontSize: 'var(--text-xl)' }}>
                      {t('quote_page.step_details')}
                    </motion.h3>
                    <div className={styles.quoteFormGrid}>
                      <motion.div className={styles.formGroup} variants={fadeUp}>
                        <label htmlFor="quote-quantity">{t('quote_page.quantity')}</label>
                        <input id="quote-quantity" type="number" min="1" placeholder="100" />
                      </motion.div>
                      <motion.div className={styles.formGroup} variants={fadeUp}>
                        <label htmlFor="quote-size">{t('quote_page.size')}</label>
                        <select id="quote-size">
                          <option value="">{isAr ? 'اختر المقاس' : 'Select Size'}</option>
                          <option value="a4">A4</option>
                          <option value="a5">A5</option>
                          <option value="a3">A3</option>
                          <option value="custom">{isAr ? 'مقاس مخصص' : 'Custom'}</option>
                        </select>
                      </motion.div>
                      <motion.div className={styles.formGroup} variants={fadeUp}>
                        <label htmlFor="quote-paper">{t('quote_page.paper_type')}</label>
                        <select id="quote-paper">
                          <option value="">{isAr ? 'اختر نوع الورق' : 'Select Paper'}</option>
                          <option value="glossy">{isAr ? 'لامع (Glossy)' : 'Glossy'}</option>
                          <option value="matte">{isAr ? 'مات (Matte)' : 'Matte'}</option>
                          <option value="uncoated">{isAr ? 'عادي' : 'Uncoated'}</option>
                          <option value="recycled">{isAr ? 'معاد التدوير' : 'Recycled'}</option>
                        </select>
                      </motion.div>
                      <motion.div className={styles.formGroup} variants={fadeUp}>
                        <label htmlFor="quote-finishing">{t('quote_page.finishing')}</label>
                        <select id="quote-finishing">
                          <option value="">{isAr ? 'اختر اللمسة النهائية' : 'Select Finishing'}</option>
                          <option value="none">{isAr ? 'بدون' : 'None'}</option>
                          <option value="lamination">{isAr ? 'تغليف حراري' : 'Lamination'}</option>
                          <option value="uv">{isAr ? 'ورنيش UV' : 'UV Varnish'}</option>
                          <option value="foil">{isAr ? 'فويل ذهبي/فضي' : 'Gold/Silver Foil'}</option>
                          <option value="emboss">{isAr ? 'بارز (Emboss)' : 'Embossing'}</option>
                        </select>
                      </motion.div>
                    </div>
                    <motion.div className={styles.formGroup} style={{ marginTop: 'var(--space-md)' }} variants={fadeUp}>
                      <label htmlFor="quote-file-upload">{t('quote_page.upload')}</label>
                      <input
                        id="quote-file-upload"
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.ai,.psd,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="sr-only"
                        aria-describedby="upload-hint"
                      />
                      <div
                        role="button"
                        tabIndex={0}
                        aria-controls="quote-file-upload"
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
                        style={{ padding: 'var(--space-xl)', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                      >
                        <Upload size={24} style={{ marginBottom: 'var(--space-sm)' }} aria-hidden="true" />
                        <p style={{ fontSize: 'var(--text-sm)' }}>{fileName ?? (isAr ? 'اضغط أو اسحب الملف هنا' : 'Click or drag file here')}</p>
                        <p id="upload-hint" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>PDF, AI, PSD, PNG, JPG</p>
                      </div>
                    </motion.div>
                    <motion.div className={styles.formGroup} style={{ marginTop: 'var(--space-md)' }} variants={fadeUp}>
                      <label htmlFor="quote-notes">{t('quote_page.notes')}</label>
                      <textarea id="quote-notes" placeholder={isAr ? 'أي تفاصيل إضافية...' : 'Any additional details...'} rows={3} />
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 3: Contact */}
                {step === 3 && (
                  <motion.div initial="hidden" animate="visible" variants={stagger}>
                    <motion.h3 variants={fadeUp} style={{ marginBottom: 'var(--space-lg)', fontSize: 'var(--text-xl)' }}>
                      {t('quote_page.step_contact')}
                    </motion.h3>
                    <div className={styles.quoteFormGrid}>
                      <motion.div className={styles.formGroup} variants={fadeUp}>
                        <label htmlFor="quote-name">{t('contact_page.name')}</label>
                        <input id="quote-name" type="text" required placeholder={isAr ? 'الاسم الكامل' : 'Full Name'} />
                      </motion.div>
                      <motion.div className={styles.formGroup} variants={fadeUp}>
                        <label htmlFor="quote-phone">{t('contact_page.phone')}</label>
                        <input id="quote-phone" type="tel" required placeholder="+974 XXXX XXXX" dir="ltr" />
                      </motion.div>
                      <motion.div className={styles.formGroup} variants={fadeUp}>
                        <label htmlFor="quote-email">{t('contact_page.email')}</label>
                        <input id="quote-email" type="email" required placeholder="email@example.com" dir="ltr" />
                      </motion.div>
                      <motion.div className={styles.formGroup} variants={fadeUp}>
                        <label htmlFor="quote-company">{isAr ? 'اسم الشركة (اختياري)' : 'Company Name (optional)'}</label>
                        <input id="quote-company" type="text" placeholder={isAr ? 'اسم الشركة' : 'Company Name'} />
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className={styles.quoteFormActions}>
                  {step > 1 ? (
                    <button type="button" className="btn btn--outline" onClick={() => setStep(step - 1)}>
                      <PrevArrow size={16} aria-hidden="true" /> {t('quote_page.prev')}
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button type="button" className="btn btn--accent" onClick={() => setStep(step + 1)}>
                      {t('quote_page.next')} <NextArrow size={16} aria-hidden="true" />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn--accent btn--lg">
                      {t('quote_page.submit')}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
