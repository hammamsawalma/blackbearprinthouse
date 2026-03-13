'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Printer, Target, Eye, Heart, Award, Zap, Users, Shield } from 'lucide-react';
import styles from '@/styles/pages.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const values = [
  { icon: Award, arTitle: 'الجودة', enTitle: 'Quality', arDesc: 'نلتزم بأعلى معايير الجودة في كل منتج نقدمه', enDesc: 'We commit to the highest quality standards in every product' },
  { icon: Zap, arTitle: 'الابتكار', enTitle: 'Innovation', arDesc: 'نستخدم أحدث التقنيات والأساليب في عالم الطباعة', enDesc: 'We use the latest technologies and methods in printing' },
  { icon: Users, arTitle: 'العميل أولاً', enTitle: 'Client First', arDesc: 'رضا عملائنا هو أولويتنا القصوى في كل مشروع', enDesc: 'Client satisfaction is our top priority in every project' },
  { icon: Shield, arTitle: 'الموثوقية', enTitle: 'Reliability', arDesc: 'نلتزم بالمواعيد ونوفر حلولاً يمكن الاعتماد عليها', enDesc: 'We meet deadlines and provide dependable solutions' },
];

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.pageHero}>
        <motion.div className={styles.pageHeroContent} initial="hidden" animate="visible" variants={stagger}>
          <motion.span className={styles.pageHeroLabel} variants={fadeUp}>{t('about_page.label')}</motion.span>
          <motion.h1 className={styles.pageHeroTitle} variants={fadeUp}>{t('about_page.title')}</motion.h1>
          <motion.p className={styles.pageHeroDesc} variants={fadeUp}>{t('about_page.description')}</motion.p>
        </motion.div>
      </section>

      {/* Story */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <motion.div className={styles.storyImage} initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ position: 'relative', overflow: 'hidden' }}>
              <Image src="/assets/about_story_img.png" alt="BlackBear Workspace" fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" style={{ objectFit: 'cover' }} />
            </motion.div>
            <motion.div className={styles.storyContent} initial={{ opacity: 0, x: isAr ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3>{isAr ? 'من هي مطبعة بلاك بير؟' : 'Who is BlackBear Print House?'}</h3>
              <p>{isAr
                ? 'مطبعة بلاك بير هي الذراع المتخصصة في خدمات الطباعة والتغليف ضمن مجموعة بلاك بير. نقدم حلول طباعة متكاملة تجمع بين الجودة العالية والتقنيات الحديثة لخدمة الشركات والأفراد في دولة قطر.'
                : 'BlackBear Print House is the specialized arm for printing and packaging services within the BlackBear group. We provide integrated printing solutions combining high quality and modern technology to serve businesses and individuals in Qatar.'
              }</p>
              <p>{isAr
                ? 'بخبرة تمتد لسنوات في مجال الطباعة، وبفريق من المتخصصين المبدعين، نحول أفكارك إلى واقع مطبوع يتحدث عن علامتك التجارية بأفضل صورة.'
                : 'With years of experience in printing and a team of creative specialists, we transform your ideas into printed reality that speaks best about your brand.'
              }</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section--dark">
        <div className="container">
          <motion.div className={styles.storyGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto var(--space-md)', background: 'rgba(200,149,108,0.15)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={28} style={{ color: 'var(--color-copper)' }} />
              </div>
              <h3 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-md)', fontSize: 'var(--text-2xl)' }}>{t('about_page.mission_title')}</h3>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-on-dark-muted)', lineHeight: 1.8 }}>{t('about_page.mission')}</p>
            </motion.div>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto var(--space-md)', background: 'rgba(212,168,75,0.15)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Eye size={28} style={{ color: 'var(--color-gold)' }} />
              </div>
              <h3 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-md)', fontSize: 'var(--text-2xl)' }}>{t('about_page.vision_title')}</h3>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-on-dark-muted)', lineHeight: 1.8 }}>{t('about_page.vision')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className="section-title">
            <span className="section-title__label">{isAr ? 'قيمنا' : 'Our Values'}</span>
            <h2 className="section-title__heading">{isAr ? 'ما يميزنا' : 'What Sets Us Apart'}</h2>
            <hr className="divider" />
          </div>
          <motion.div className={styles.valuesGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <motion.div key={val.enTitle} className={styles.valueCard} variants={fadeUp}>
                  <div className={styles.valueIcon}><Icon size={26} /></div>
                  <h3 className={styles.valueTitle}>{isAr ? val.arTitle : val.enTitle}</h3>
                  <p className={styles.valueDesc}>{isAr ? val.arDesc : val.enDesc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
