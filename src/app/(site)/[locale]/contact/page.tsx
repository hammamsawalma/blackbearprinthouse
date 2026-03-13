'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import styles from '@/styles/pages.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.pageHero}>
        <motion.div className={styles.pageHeroContent} initial="hidden" animate="visible" variants={stagger}>
          <motion.span className={styles.pageHeroLabel} variants={fadeUp}>{t('contact_page.label')}</motion.span>
          <motion.h1 className={styles.pageHeroTitle} variants={fadeUp}>{t('contact_page.title')}</motion.h1>
          <motion.p className={styles.pageHeroDesc} variants={fadeUp}>{t('contact_page.description')}</motion.p>
        </motion.div>
      </section>

      {/* Contact Grid */}
      <div className="container">
        <div className={styles.contactGrid}>
          {/* Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {submitted ? (
              <motion.div className={styles.successMessage} variants={fadeUp}>
                <div className={styles.successIcon}><CheckCircle size={40} /></div>
                <h3 className={styles.successTitle}>{isAr ? 'شكراً لك!' : 'Thank You!'}</h3>
                <p className={styles.successDesc}>{t('contact_page.success')}</p>
              </motion.div>
            ) : (
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <motion.div className={styles.formGroup} variants={fadeUp}>
                  <label>{t('contact_page.name')}</label>
                  <input type="text" required placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'} />
                </motion.div>
                <motion.div className={styles.formGroup} variants={fadeUp}>
                  <label>{t('contact_page.email')}</label>
                  <input type="email" required placeholder={isAr ? 'example@email.com' : 'example@email.com'} dir="ltr" />
                </motion.div>
                <motion.div className={styles.formGroup} variants={fadeUp}>
                  <label>{t('contact_page.phone')}</label>
                  <input type="tel" placeholder="+974 XXXX XXXX" dir="ltr" />
                </motion.div>
                <motion.div className={styles.formGroup} variants={fadeUp}>
                  <label>{t('contact_page.message')}</label>
                  <textarea required placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Write your message here...'} />
                </motion.div>
                <motion.div variants={fadeUp} className={styles.submitBtn}>
                  <button type="submit" className="btn btn--accent btn--lg">
                    <Send size={18} />
                    {t('contact_page.send')}
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div className={styles.contactInfo} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div className={styles.contactCard} variants={fadeUp}>
              <div className={styles.contactCardIcon}><Phone size={20} /></div>
              <h4 className={styles.contactCardTitle}>{t('footer.phone')}</h4>
              <p className={styles.contactCardValue} dir="ltr">+974 XXXX XXXX</p>
            </motion.div>

            <motion.div className={styles.contactCard} variants={fadeUp}>
              <div className={styles.contactCardIcon}><Mail size={20} /></div>
              <h4 className={styles.contactCardTitle}>{t('footer.email')}</h4>
              <p className={styles.contactCardValue}>info@blackbearprint.qa</p>
            </motion.div>

            <motion.div className={styles.contactCard} variants={fadeUp}>
              <div className={styles.contactCardIcon}><MapPin size={20} /></div>
              <h4 className={styles.contactCardTitle}>{t('footer.address')}</h4>
              <p className={styles.contactCardValue}>{t('footer.address_value')}</p>
            </motion.div>

            <motion.div className={styles.contactCard} variants={fadeUp}>
              <div className={styles.contactCardIcon}><Clock size={20} /></div>
              <h4 className={styles.contactCardTitle}>{t('footer.work_hours')}</h4>
              <p className={styles.contactCardValue}>{t('footer.work_hours_value')}</p>
            </motion.div>

            <motion.div className={styles.mapContainer} variants={fadeUp}>
              <MapPin size={40} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
