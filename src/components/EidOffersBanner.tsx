'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ArrowLeft, Tag } from 'lucide-react';
import styles from './EidOffersBanner.module.css';

interface Offer {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  offerPrice: number | null;
  image: string | null;
  offerImage: string | null;
}

export default function EidOffersBanner() {
  const t = useTranslations('eid_offers');
  const locale = useLocale();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch('/api/offers');
        const data = await res.json();
        if (data.success && data.offers && data.offers.length > 0) {
          setOffers(data.offers);
        }
      } catch (error) {
        console.error('Failed to fetch Eid offers:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOffers();
  }, []);

  useEffect(() => {
    if (offers.length <= 1) return;
    
    // Auto advance every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [offers.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  if (isLoading || offers.length === 0) {
    return null; // Don't render banner if no offers or loading
  }

  const currentOffer = offers[currentIndex];
  const offerName = locale === 'ar' ? currentOffer.nameAr : currentOffer.nameEn;
  const offerDesc = locale === 'ar' ? currentOffer.descriptionAr : currentOffer.descriptionEn;
  const displayImage = currentOffer.offerImage || currentOffer.image || '/assets/placeholder-image.jpg';
  
  const ArrowIcon = locale === 'ar' ? ArrowLeft : ArrowRight;
  const ArrowIconReverse = locale === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <section className={styles.bannerWrapper}>
      <div className={`container ${styles.bannerContainer}`}>
        <div className={styles.bannerHeader}>
          <div className={styles.badge}>
            <Tag size={16} />
            <span>{t('badge')}</span>
          </div>
          <h2 className={styles.title}>{t('title')}</h2>
        </div>
        
        <div className={styles.carouselContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className={styles.offerCard}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={displayImage}
                  alt={offerName}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.offerImage}
                />
              </div>
              
              <div className={styles.offerContent}>
                <h3 className={styles.offerName}>{offerName}</h3>
                <p className={styles.offerDesc}>{offerDesc}</p>
                
                <div className={styles.pricing}>
                  {currentOffer.offerPrice ? (
                    <>
                      <span className={styles.currentPrice}>{currentOffer.offerPrice} {t('currency')}</span>
                      <span className={styles.oldPrice}>{currentOffer.price} {t('currency')}</span>
                    </>
                  ) : (
                    <span className={styles.currentPrice}>{currentOffer.price} {t('currency')}</span>
                  )}
                </div>
                
                <Link href={`/shop`} className={`btn btn--accent ${styles.actionBtn}`}>
                  {t('shop_now')} <ArrowIcon size={18} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {offers.length > 1 && (
            <div className={styles.controls}>
              <button onClick={handlePrev} className={styles.controlBtn} aria-label="Previous Offer">
                <ArrowIconReverse size={20} />
              </button>
              <div className={styles.indicators}>
                {offers.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.indicator} ${idx === currentIndex ? styles.active : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to offer ${idx + 1}`}
                  />
                ))}
              </div>
              <button onClick={handleNext} className={styles.controlBtn} aria-label="Next Offer">
                <ArrowIcon size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
