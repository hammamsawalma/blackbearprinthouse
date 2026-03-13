'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CalendarHeart, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './EidOffersHero.module.css';

interface OfferProduct {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string | null;
  descriptionEn: string | null;
  price: number;
  offerPrice: number;
  offerImage: string | null;
  images: string[];
}

export default function EidOffersHero() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const [offers, setOffers] = useState<OfferProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/offers');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (data.success && data.offers && Array.isArray(data.offers)) {
          setOffers(data.offers);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching Eid offers:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (offers.length <= 1 || loading) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 6000); // 6 seconds per offer

    return () => clearInterval(interval);
  }, [offers.length, loading]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  // If loading, show skeleton wrapper
  if (loading) {
    return (
      <section className={styles.loadingSkeleton} aria-label="Loading Eid Offers">
        <Loader2 className={styles.spinner} size={48} />
      </section>
    );
  }

  // If no offers or error, we don't render the hero, page.tsx will fallback to default hero
  if (error || offers.length === 0) {
    return null;
  }

  const currentOffer = offers[currentIndex];
  
  // Resolve localized text
  const name = isRtl ? currentOffer.nameAr : currentOffer.nameEn;
  const description = isRtl 
    ? (currentOffer.descriptionAr || '') 
    : (currentOffer.descriptionEn || '');
    
  // Resolve image (prefer offerImage, fallback to first product image, fallback to placeholder)
  const imageUrl = currentOffer.offerImage 
    || (currentOffer.images && currentOffer.images.length > 0 ? currentOffer.images[0] : null) 
    || '/assets/placeholder-product.webp';

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isRtl ? -100 : 100) : (isRtl ? 100 : -100),
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? (isRtl ? -100 : 100) : (isRtl ? 100 : -100),
      opacity: 0,
      scale: 0.95
    })
  };

  // 1 is next, -1 is prev
  const [[page, direction], setPage] = useState([0, 0]);
  
  // Sync page state when index changes (either from auto-advance or buttons)
  useEffect(() => {
    if (currentIndex !== page) {
       // Estimate direction
       const nextDirection = ((currentIndex > page && !(page === 0 && currentIndex === offers.length -1)) || (page === offers.length - 1 && currentIndex === 0)) ? 1 : -1;
       setPage([currentIndex, nextDirection]);
    }
  }, [currentIndex, page, offers.length]);


  const navigate = (newDirection: number) => {
    const nextIndex = (currentIndex + newDirection + offers.length) % offers.length;
    setPage([nextIndex, newDirection]);
    setCurrentIndex(nextIndex);
  };

  return (
    <section className={styles.heroWrapper} aria-label={t('eid_offers.badge')}>
      {/* Background Ambience */}
      <div className={styles.glowLayer} />
      <div className={styles.noiseOverlay} />

      <div className={styles.container}>
        {/* Left Side: Text Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div 
            key={`text-${currentOffer.id}`}
            className={styles.textContent}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 150, damping: 20, duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.badge}
            >
              <CalendarHeart size={16} />
              {t('eid_offers.badge')}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.title}
            >
              {name}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={styles.description}
            >
              {description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.priceBox}
            >
              <span className={styles.offerPrice}>
                {new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(currentOffer.offerPrice)}
                <span className={styles.currency}>{t('eid_offers.currency')}</span>
              </span>
              
              <span className={styles.originalPrice}>
                {new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(currentOffer.price)}
              </span>

              {/* Savings indicator */}
              <span className={styles.savings}>
                {Math.round((1 - (currentOffer.offerPrice / currentOffer.price)) * 100)}% {isRtl ? 'خصم' : 'OFF'}
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={styles.ctaWrapper}
            >
              <Link href="/shop" className={styles.shopBtn}>
                {t('eid_offers.shop_now')}
                {isRtl ? <ArrowLeft size={20} className={styles.shopBtnIcon} /> : <ArrowRight size={20} className={styles.shopBtnIcon} />}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Right Side: Imagery */}
        <div className={styles.visualArea}>
          <div className={styles.glassCard} />
          
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
                key={`img-${currentOffer.id}`}
                className={styles.imageWrapper}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 150, damping: 20, duration: 0.8 }}
              >
                {/* Majestic Floating animation */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotateZ: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  style={{ width: '100%', height: '100%', position: 'relative', perspective: '1000px' }}
                >
                  {/* Whimsical 3D Tilt on Hover */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotateX: 5, rotateY: isRtl ? 10 : -10, z: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
                  >
                    <Image
                      src={imageUrl}
                      alt={name || 'Eid special offer'}
                      fill
                      sizes="(max-width: 1024px) 90vw, 50vw"
                      className={styles.productImage}
                      priority={currentIndex === 0}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      {offers.length > 1 && (
        <div className={styles.controlsWrapper}>
          <div className={styles.indicators}>
            {offers.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
                onClick={() => {
                  setPage([idx, idx > currentIndex ? 1 : -1]);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          <div className={styles.buttons}>
             <button
                onClick={() => navigate(-1)}
                className={styles.navBtn}
                aria-label="Previous offer"
              >
                {isRtl ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
              </button>
              <button
                onClick={() => navigate(1)}
                className={styles.navBtn}
                aria-label="Next offer"
              >
                {isRtl ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
              </button>
          </div>
        </div>
      )}
    </section>
  );
}
