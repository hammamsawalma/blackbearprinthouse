'use client';

import { useEffect, useState, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import pageStyles from '@/styles/pages.module.css';

function SuccessContent() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    // Clear cart after successful payment
    if (!cleared) {
      localStorage.removeItem('bbph_cart');
      setCleared(true);
    }
  }, [cleared]);

  return (
    <div style={{ paddingTop: 100, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div className={pageStyles.successMessage} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className={pageStyles.successIcon}><CheckCircle size={48} /></div>
        <h2 className={pageStyles.successTitle}>{isAr ? 'تم تأكيد الطلب بنجاح!' : 'Order Confirmed Successfully!'}</h2>
        
        {orderNumber && (
          <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-sm) var(--space-lg)', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
            <strong>{isAr ? 'رقم الطلب:' : 'Order Number:'}</strong> <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{orderNumber}</span>
          </div>
        )}

        <p className={pageStyles.successDesc} style={{ marginTop: 'var(--space-lg)' }}>
          {isAr ? 'شكراً لثقتكم بنا! سيتم البدء في تجهيز طلبكم على الفور وسنوافيكم بتحديثات الحالة.' : 'Thank you for your trust! We will start preparing your order immediately and keep you updated.'}
        </p>
        <Link href="/" className="btn btn--accent btn--lg" style={{ marginTop: 'var(--space-xl)' }}>
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 100, minHeight: '80vh' }}></div>}>
      <SuccessContent />
    </Suspense>
  );
}
