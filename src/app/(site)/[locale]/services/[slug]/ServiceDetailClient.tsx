'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getServiceBySlug, services } from '@/data/services';
import styles from '@/styles/pages.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const service = getServiceBySlug(slug);

  if (!service) return null;

  const Icon = service.icon;
  const content = isAr ? service.ar : service.en;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  // Related services (same category, excluding current)
  const related = services
    .filter((s) => s.category === service.category && s.slug !== slug)
    .slice(0, 3);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.pageHero}>
        <motion.div className={styles.pageHeroContent} initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-copper)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-md)' }}>
              <BackArrow size={14} /> {t('common.back')}
            </Link>
          </motion.div>
          <motion.h1 className={styles.pageHeroTitle} variants={fadeUp}>{content.name}</motion.h1>
          <motion.p className={styles.pageHeroDesc} variants={fadeUp}>{content.shortDesc}</motion.p>
        </motion.div>
      </section>

      {/* Detail */}
      <section className="section">
        <div className="container" style={{ maxWidth: 'var(--container-lg)' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
              <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, rgba(200,149,108,0.1), rgba(212,168,75,0.1))', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-copper)' }}>
                <Icon size={30} />
              </div>
              <div>
                <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: '4px' }}>{content.name}</h2>
                <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                  {isAr ? 'بلاك بير برنت هاوس' : 'BlackBear Print House'}
                </span>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, marginBottom: 'var(--space-2xl)', color: 'var(--color-text-light)' }}>
              {content.description}
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <Link href="/quote" className="btn btn--accent btn--lg">
                {t('hero.cta_quote')}
              </Link>
              <Link href="/contact" className="btn btn--outline btn--lg">
                {t('nav.contact')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="section section--cream">
          <div className="container">
            <div className="section-title">
              <h2 className="section-title__heading">{isAr ? 'خدمات ذات صلة' : 'Related Services'}</h2>
              <hr className="divider" />
            </div>
            <motion.div className={styles.servicesPageGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {related.map((rel) => {
                const RelIcon = rel.icon;
                const relContent = isAr ? rel.ar : rel.en;
                return (
                  <motion.div key={rel.slug} variants={fadeUp}>
                    <Link href={`/services/${rel.slug}`} className={styles.servicePageCard}>
                      <div className={styles.servicePageIcon}>
                        <RelIcon size={24} />
                      </div>
                      <h3 className={styles.servicePageTitle}>{relContent.name}</h3>
                      <p className={styles.servicePageDesc}>{relContent.shortDesc}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
