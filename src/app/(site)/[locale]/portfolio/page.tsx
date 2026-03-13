'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Package, CreditCard, Image, ExternalLink } from 'lucide-react';
import styles from './portfolio.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

type Category = 'all' | 'branding' | 'packaging' | 'printing' | 'signage';

const categories: { key: Category; ar: string; en: string }[] = [
  { key: 'all', ar: 'الكل', en: 'All' },
  { key: 'branding', ar: 'هوية بصرية', en: 'Branding' },
  { key: 'packaging', ar: 'تغليف', en: 'Packaging' },
  { key: 'printing', ar: 'طباعة', en: 'Printing' },
  { key: 'signage', ar: 'لوحات', en: 'Signage' },
];

const projects = [
  { id: 1, category: 'branding', icon: CreditCard, ar: { title: 'هوية Al Karama Group', desc: 'تصميم هوية بصرية متكاملة تشمل الشعار والمواد المراسلية' }, en: { title: 'Al Karama Group Identity', desc: 'Complete brand identity design including logo and stationery' }, color: '#8B4513' },
  { id: 2, category: 'packaging', icon: Package, ar: { title: 'تغليف منتجات Lusail Dates', desc: 'علب هدايا فاخرة لتمور لوسيل بتشطيبات ذهبية' }, en: { title: 'Lusail Dates Packaging', desc: 'Luxury gift boxes for Lusail Dates with gold finishing' }, color: '#D4A84B' },
  { id: 3, category: 'printing', icon: Printer, ar: { title: 'كتالوج Qatar Motors', desc: 'كتالوج منتجات 120 صفحة بطباعة أوفست عالية الجودة' }, en: { title: 'Qatar Motors Catalog', desc: '120-page product catalog with high-quality offset printing' }, color: '#2C5E3F' },
  { id: 4, category: 'signage', icon: Image, ar: { title: 'لوحات Souq Waqif Festival', desc: 'لوحات إعلانية ورايات لمهرجان سوق واقف السنوي' }, en: { title: 'Souq Waqif Festival Signage', desc: 'Advertising signs and banners for Souq Waqif annual festival' }, color: '#C19A74' },
  { id: 5, category: 'branding', icon: CreditCard, ar: { title: 'مراسلات بنك الدوحة', desc: 'ورق رسمي وأظرف ومواد مراسلية بتشطيبات فاخرة' }, en: { title: 'Doha Bank Stationery', desc: 'Letterheads, envelopes, and stationery with premium finishes' }, color: '#1a365d' },
  { id: 6, category: 'packaging', icon: Package, ar: { title: 'علب عطور Al Jazeera', desc: 'علب عطور مخصصة بطباعة وتشطيبات فاخرة' }, en: { title: 'Al Jazeera Perfume Boxes', desc: 'Custom perfume boxes with luxury printing and finishes' }, color: '#4a1a6b' },
  { id: 7, category: 'printing', icon: Printer, ar: { title: 'بروشور QNB', desc: 'بروشورات وتقارير سنوية بجودة طباعة استثنائية' }, en: { title: 'QNB Brochures', desc: 'Annual reports and brochures with exceptional print quality' }, color: '#0a3d62' },
  { id: 8, category: 'signage', icon: Image, ar: { title: 'لوحات فندق Sheraton', desc: 'لوحات إرشادية وديكورات داخلية راقية' }, en: { title: 'Sheraton Hotel Signage', desc: 'Directional signs and premium interior decor' }, color: '#6b3a1a' },
];

export default function PortfolioPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section className={styles.hero}>
        <motion.div className={styles.heroContent} initial="hidden" animate="visible" variants={stagger}>
          <motion.span className={styles.heroLabel} variants={fadeUp}>{t('portfolio_page.label')}</motion.span>
          <motion.h1 className={styles.heroTitle} variants={fadeUp}>{t('portfolio_page.title')}</motion.h1>
          <motion.p className={styles.heroDesc} variants={fadeUp}>{t('portfolio_page.description')}</motion.p>
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.filterBtn} ${activeCategory === cat.key ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            ))}
          </div>

          <motion.div className={styles.grid} initial="hidden" animate="visible" variants={stagger} key={activeCategory}>
            <AnimatePresence mode="wait">
              {filtered.map((project) => {
                const Icon = project.icon;
                const content = isAr ? project.ar : project.en;
                return (
                  <motion.div key={project.id} className={styles.card} variants={fadeUp} layout>
                    <div className={styles.cardImage} style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)` }}>
                      <Icon size={48} className={styles.cardImageIcon} />
                      <div className={styles.cardOverlay}>
                        <ExternalLink size={24} />
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <span className={styles.cardCategory}>
                        {isAr
                          ? categories.find((c) => c.key === project.category)?.ar
                          : categories.find((c) => c.key === project.category)?.en
                        }
                      </span>
                      <h3 className={styles.cardTitle}>{content.title}</h3>
                      <p className={styles.cardDesc}>{content.desc}</p>
                    </div>
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
