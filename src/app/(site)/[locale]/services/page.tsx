'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { services, serviceCategories } from '@/data/services';
import styles from '@/styles/pages.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

type CategoryKey = keyof typeof serviceCategories | 'all';

export default function ServicesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.pageHero} style={{ position: 'relative' }}>
        <Image src="/assets/services_hero_bg.png" alt="Services Background" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.4, zIndex: 0 }} priority />
        <motion.div className={styles.pageHeroContent} initial="hidden" animate="visible" variants={stagger} style={{ position: 'relative', zIndex: 1 }}>
          <motion.span className={styles.pageHeroLabel} variants={fadeUp}>{t('services_section.label')}</motion.span>
          <motion.h1 className={styles.pageHeroTitle} variants={fadeUp}>{t('services_section.title')}</motion.h1>
          <motion.p className={styles.pageHeroDesc} variants={fadeUp}>{t('services_section.description')}</motion.p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          {/* Filter */}
          <div className={styles.filterBar}>
            <button
              className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              {isAr ? 'الكل' : 'All'}
            </button>
            {(Object.keys(serviceCategories) as Array<keyof typeof serviceCategories>).map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {isAr ? serviceCategories[cat].ar : serviceCategories[cat].en}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            className={styles.servicesPageGrid}
            initial="hidden"
            animate="visible"
            variants={stagger}
            key={activeCategory}
          >
            <AnimatePresence mode="wait">
              {filteredServices.map((service) => {
                const Icon = service.icon;
                const content = isAr ? service.ar : service.en;
                return (
                  <motion.div key={service.slug} variants={fadeUp} layout>
                    <Link href={`/services/${service.slug}`} className={styles.servicePageCard}>
                      <div className={styles.servicePageIcon}>
                        <Icon size={24} />
                      </div>
                      <h3 className={styles.servicePageTitle}>{content.name}</h3>
                      <p className={styles.servicePageDesc}>{content.shortDesc}</p>
                      <span className={styles.servicePageLink}>
                        {t('common.view_details')} <Arrow size={14} />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
