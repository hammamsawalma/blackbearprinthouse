'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, CreditCard } from 'lucide-react';
import { products } from '@/data/products';
import styles from '@/styles/shop.module.css';
import pageStyles from '@/styles/pages.module.css';

interface CartItem { id: string; qty: number; }

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function CheckoutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('bbph_cart') || '[]');
    setCartItems(cart);
  }, []);

  const cartProducts = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.id),
  })).filter((i) => i.product);

  const subtotal = cartProducts.reduce((sum, i) => sum + (i.product!.price * i.qty), 0);
  const vat = Math.round(subtotal * 0.05);
  const total = subtotal + vat;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const customer = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      company: formData.get('company'),
      address: formData.get('address'),
      area: formData.get('area'),
      notes: formData.get('notes'),
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, customer }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Redirect to simulated Noqoody Payment
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '80vh' }}>
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>{isAr ? 'إتمام الشراء' : 'Checkout'}</h1>

        <div className={styles.cartGrid}>
          {/* Form */}
          <motion.form onSubmit={handleSubmit} initial="hidden" animate="visible" variants={stagger} aria-busy={isSubmitting}>
            {/* Contact */}
            <motion.div variants={fadeUp} style={{ marginBottom: 'var(--space-2xl)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>{isAr ? 'معلومات التواصل' : 'Contact Information'}</h3>
              <div className={pageStyles.quoteFormGrid}>
                <div className={pageStyles.formGroup}>
                  <label htmlFor="checkout-name">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                  <input id="checkout-name" type="text" name="name" required />
                </div>
                <div className={pageStyles.formGroup}>
                  <label htmlFor="checkout-phone">{isAr ? 'رقم الهاتف' : 'Phone'}</label>
                  <input id="checkout-phone" type="tel" name="phone" required dir="ltr" placeholder="+974" />
                </div>
                <div className={pageStyles.formGroup}>
                  <label htmlFor="checkout-email">{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input id="checkout-email" type="email" name="email" required dir="ltr" />
                </div>
                <div className={pageStyles.formGroup}>
                  <label htmlFor="checkout-company">{isAr ? 'الشركة (اختياري)' : 'Company (optional)'}</label>
                  <input id="checkout-company" type="text" name="company" />
                </div>
              </div>
            </motion.div>

            {/* Delivery */}
            <motion.div variants={fadeUp} style={{ marginBottom: 'var(--space-2xl)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>{isAr ? 'التوصيل' : 'Delivery'}</h3>
              <div className={pageStyles.quoteFormGrid}>
                <div className={pageStyles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="checkout-address">{isAr ? 'العنوان' : 'Address'}</label>
                  <input id="checkout-address" type="text" name="address" required />
                </div>
                <div className={pageStyles.formGroup}>
                  <label htmlFor="checkout-area">{isAr ? 'المنطقة' : 'Area'}</label>
                  <input id="checkout-area" type="text" name="area" />
                </div>
                <div className={pageStyles.formGroup}>
                  <label htmlFor="checkout-notes">{isAr ? 'ملاحظات التوصيل' : 'Delivery Notes'}</label>
                  <input id="checkout-notes" type="text" name="notes" placeholder={isAr ? 'بناية، طابق...' : 'Building, floor...'} />
                </div>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div variants={fadeUp} style={{ marginBottom: 'var(--space-xl)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>
                <Lock size={18} style={{ display: 'inline', marginInlineEnd: '0.5rem', color: 'var(--color-copper)' }} aria-hidden="true" />
                {isAr ? 'الدفع' : 'Payment'}
              </h3>
              <div style={{ padding: 'var(--space-xl)', background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <CreditCard size={24} style={{ color: 'var(--color-copper)' }} aria-hidden="true" />
                <div>
                  <strong>{isAr ? 'نقودي - بوابة الدفع' : 'Noqoody Payment Gateway'}</strong>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-light)', marginTop: 4 }}>
                    {isAr ? 'سيتم تحويلك لإتمام الدفع بشكل آمن' : 'You will be redirected to complete payment securely'}
                  </p>
                </div>
              </div>
            </motion.div>

            {error && (
              <motion.div role="alert" aria-live="assertive" variants={fadeUp} style={{ padding: 'var(--space-md)', background: '#fee2e2', color: '#dc2626', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)' }}>
                {error}
              </motion.div>
            )}

            <motion.div variants={fadeUp}>
              <button type="submit" className="btn btn--accent btn--lg" style={{ width: '100%' }} disabled={isSubmitting || cartItems.length === 0} aria-disabled={isSubmitting || cartItems.length === 0}>
                <Lock size={16} aria-hidden="true" /> {isSubmitting ? (isAr ? 'جاري التحويل...' : 'Processing...') : (isAr ? `تأكيد الطلب — ${total} ر.ق` : `Confirm Order — ${total} QAR`)}
              </button>
            </motion.div>
          </motion.form>

          {/* Summary */}
          <div className={styles.cartSummary} aria-label={isAr ? 'ملخص الطلب' : 'Order Summary'}>
            <h3 className={styles.summaryTitle}>{isAr ? 'ملخص الطلب' : 'Order Summary'}</h3>
            {cartProducts.map(({ product, qty }) => {
              const content = isAr ? product!.ar : product!.en;
              return (
                <div key={product!.id} className={styles.summaryRow} style={{ marginBottom: 'var(--space-md)' }}>
                  <span>{content.name} × {qty}</span>
                  <span style={{ fontWeight: 600 }}>{product!.price * qty} QAR</span>
                </div>
              );
            })}
            <div className={styles.summaryRow}>
              <span>{isAr ? 'الضريبة (5%)' : 'VAT (5%)'}</span>
              <span>{vat} QAR</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span>{total} QAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
