'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Printer,
  PenTool,
  Package,
  Image as LucideImage,
  CreditCard,
  Layers,
  Award,
  Zap,
  Cpu,
  Users,
} from 'lucide-react';
import styles from './page.module.css';
import EidOffersHero from '@/components/EidOffersHero';

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8 } 
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Services Data ─── */
const services = [
  { icon: Printer, key: 'offset', ar: 'طباعة أوفست', en: 'Offset Printing', descAr: 'طباعة عالية الجودة للكميات الكبيرة', descEn: 'High-quality printing for large quantities' },
  { icon: Zap, key: 'digital', ar: 'طباعة ديجيتال', en: 'Digital Printing', descAr: 'طباعة سريعة ومرنة للكميات الصغيرة', descEn: 'Fast and flexible printing for small runs' },
  { icon: Package, key: 'packaging', ar: 'تغليف وعلب', en: 'Packaging', descAr: 'علب مخصصة وتغليف احترافي', descEn: 'Custom boxes and professional packaging' },
  { icon: PenTool, key: 'design', ar: 'تصميم جرافيك', en: 'Graphic Design', descAr: 'تصميم هويات بصرية ومواد تسويقية', descEn: 'Brand identity and marketing materials' },
  { icon: CreditCard, key: 'cards', ar: 'كروت أعمال', en: 'Business Cards', descAr: 'كروت أعمال أنيقة تترك انطباعاً', descEn: 'Elegant business cards that make an impression' },
  { icon: LucideImage, key: 'signage', ar: 'لوحات إعلانية', en: 'Signage', descAr: 'لوحات خارجية وداخلية بأحدث التقنيات', descEn: 'Indoor and outdoor signage with latest technology' },
  { icon: Layers, key: 'brochures', ar: 'بروشورات', en: 'Brochures', descAr: 'بروشورات ومطويات بتصاميم جذابة', descEn: 'Brochures and flyers with attractive designs' },
  { icon: Award, key: 'invitations', ar: 'دعوات وكروت', en: 'Invitations', descAr: 'كروت زفاف ودعوات لجميع المناسبات', descEn: 'Wedding cards and invitations for all occasions' },
];

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      {/* ─── Eid Offers Hero (on top) ─── */}
      <EidOffersHero />

      {/* ─── Original Company Hero Section ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'center', position: 'relative', zIndex: 2, paddingTop: '100px', width: '100%' }}>
          <motion.div
            className={styles.heroContent}
            initial="hidden"
            animate="visible"
            variants={stagger}
            style={{ textAlign: locale === 'ar' ? 'right' : 'left', padding: 0 }}
          >
            <motion.span className={styles.heroLabel} variants={fadeUp}>
              {t('hero.label')}
            </motion.span>
            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              {t('hero.title_1')}
              <span className={styles.heroTitleAccent}>{t('hero.title_2')}</span>
            </motion.h1>
            <motion.p className={styles.heroDesc} variants={fadeUp} style={{ marginInline: 0 }}>
              {t('hero.description')}
            </motion.p>
            <motion.div className={styles.heroActions} variants={fadeUp} style={{ justifyContent: 'flex-start' }}>
              <Link href="/quote" className="btn btn--accent btn--lg">
                {t('hero.cta_quote')}
              </Link>
              <Link href="/services" className="btn btn--outline-light btn--lg">
                {t('hero.cta_services')}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative', height: '500px', width: '100%' }}
          >
            <Image 
              src="/assets/home_hero_visual.webp" 
              alt="BlackBear Print House - High Quality Printing" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }} 
              priority 
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Services Overview ─── */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className="section-title">
            <span className="section-title__label">{t('services_section.label')}</span>
            <h2 className="section-title__heading">{t('services_section.title')}</h2>
            <hr className="divider" />
            <p className="section-title__desc">{t('services_section.description')}</p>
          </div>
        </div>
        <motion.div
          className={styles.servicesGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.key} variants={fadeUp}>
                <Link href="/services" className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <Icon size={26} />
                  </div>
                  <h3 className={styles.serviceTitle}>{locale === 'ar' ? service.ar : service.en}</h3>
                  <p className={styles.serviceDesc}>{locale === 'ar' ? service.descAr : service.descEn}</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── Why Us ─── */}
      <section className={styles.whyUsSection}>
        <div className="container">
          <div className="section-title">
            <span className="section-title__label">{t('why_us.label')}</span>
            <h2 className="section-title__heading">{t('why_us.title')}</h2>
            <hr className="divider" />
          </div>
        </div>
        <motion.div
          className={styles.whyUsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {[
            { icon: Award, titleKey: 'quality', descKey: 'quality_desc' },
            { icon: Zap, titleKey: 'speed', descKey: 'speed_desc' },
            { icon: Cpu, titleKey: 'technology', descKey: 'technology_desc' },
            { icon: Users, titleKey: 'experience', descKey: 'experience_desc' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.titleKey} className={styles.whyUsCard} variants={fadeUp}>
                <div className={styles.whyUsIcon}>
                  <Icon size={28} />
                </div>
                <h3 className={styles.whyUsTitle}>{t(`why_us.${item.titleKey}`)}</h3>
                <p className={styles.whyUsDesc}>{t(`why_us.${item.descKey}`)}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── Stats ─── */}
      <motion.section
        className={styles.statsSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className={styles.statsGrid}>
          {[
            { num: '10+', key: 'years' },
            { num: '5000+', key: 'projects' },
            { num: '500+', key: 'clients' },
            { num: '100+', key: 'products' },
          ].map((stat) => (
            <motion.div key={stat.key} className={styles.statItem} variants={fadeUp}>
              <div className={styles.statNumber}>{stat.num}</div>
              <div className={styles.statLabel}>{t(`stats.${stat.key}`)}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── CTA ─── */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaInner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <Image 
            src="/assets/home_cta_bg.webp" 
            alt="Design Grid Background" 
            fill 
            sizes="100vw"
            loading="lazy"
            style={{ objectFit: 'cover', opacity: 0.5, zIndex: 0 }} 
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.h2 className={styles.ctaTitle} variants={fadeUp}>
              {t('cta.title')}
            </motion.h2>
            <motion.p className={styles.ctaDesc} variants={fadeUp}>
              {t('cta.description')}
            </motion.p>
            <motion.div variants={fadeUp} className={styles.ctaBtn}>
              <Link href="/quote" className="btn btn--accent btn--lg">
                {t('cta.button')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
