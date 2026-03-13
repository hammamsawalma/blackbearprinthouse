'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { products, productCategories } from '@/data/products';
import styles from '@/styles/shop.module.css';
import pageStyles from '@/styles/pages.module.css';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

type CatKey = keyof typeof productCategories | 'all';

export default function ShopPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<CatKey>('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const addToCart = (productId: string) => {
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('bbph_cart') || '[]');
    const existing = cart.find((item: { id: string }) => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: productId, qty: 1 });
    }
    localStorage.setItem('bbph_cart', JSON.stringify(cart));
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
    alert(isAr ? 'تمت الإضافة إلى السلة ✓' : 'Added to cart ✓');
  };

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section className={pageStyles.pageHero} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center', gap: 'var(--space-2xl)', maxWidth: 'var(--container-xl)', margin: '0 auto', textAlign: locale === 'ar' ? 'right' : 'left' }}>
        <motion.div className={pageStyles.pageHeroContent} initial="hidden" animate="visible" variants={stagger} style={{ padding: 0 }}>
          <motion.span className={pageStyles.pageHeroLabel} variants={fadeUp}>{t('shop_page.label')}</motion.span>
          <motion.h1 className={pageStyles.pageHeroTitle} variants={fadeUp}>{t('shop_page.title')}</motion.h1>
          <motion.p className={pageStyles.pageHeroDesc} variants={fadeUp} style={{ marginInline: 0 }}>{t('shop_page.description')}</motion.p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: locale === 'ar' ? -40 : 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', height: '400px', width: '100%', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <Image src="/assets/shop_hero_visual.png" alt="Shop High Quality Prints" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
        </motion.div>
      </section>

      {/* Shop */}
      <section className={styles.shopSection}>
        <div className="container">
          {/* Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', justifyContent: 'center', marginBottom: 'var(--space-2xl)' }}>
            <button
              className={`${pageStyles.filterBtn} ${activeCategory === 'all' ? pageStyles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              {isAr ? 'الكل' : 'All'}
            </button>
            {(Object.keys(productCategories) as Array<keyof typeof productCategories>).map((cat) => (
              <button
                key={cat}
                className={`${pageStyles.filterBtn} ${activeCategory === cat ? pageStyles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {isAr ? productCategories[cat].ar : productCategories[cat].en}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div className={styles.productGrid} initial="hidden" animate="visible" variants={stagger} key={activeCategory}>
            {filtered.map((product) => {
              const Icon = product.icon;
              const content = isAr ? product.ar : product.en;
              const catLabel = isAr ? productCategories[product.category].ar : productCategories[product.category].en;
              return (
                <motion.div key={product.id} className={styles.productCard} variants={fadeUp}>
                  <div className={styles.productImage}>
                    <Icon size={40} />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productCategory}>{catLabel}</span>
                    <h3 className={styles.productName}>{content.name}</h3>
                    <p className={styles.productDesc}>{content.desc}</p>
                    <div className={styles.productBottom}>
                      <div className={styles.productPrice}>
                        {product.price} <span className={styles.productCurrency}>{product.currency}</span>
                      </div>
                      <button className={styles.addToCartBtn} onClick={() => addToCart(product.id)}>
                        <ShoppingCart size={16} />
                        {isAr ? 'أضف للسلة' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
