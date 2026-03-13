'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ShoppingBag, Minus, Plus, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import styles from '@/styles/shop.module.css';

interface CartItem {
  id: string;
  qty: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.05 } } };

export default function CartPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('bbph_cart') || '[]');
      setCartItems(cart);
    };
    loadCart();
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('bbph_cart', JSON.stringify(newCart));
  };

  const updateQty = (id: string, delta: number) => {
    const newCart = cartItems.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    updateCart(newCart);
  };

  const removeItem = (id: string) => {
    updateCart(cartItems.filter((item) => item.id !== id));
  };

  const cartProducts = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.id),
  })).filter((item) => item.product);

  const subtotal = cartProducts.reduce((sum, item) => sum + (item.product!.price * item.qty), 0);
  const vat = Math.round(subtotal * 0.05); // 5% VAT in Qatar
  const total = subtotal + vat;

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>{isAr ? 'سلة المشتريات' : 'Shopping Cart'}</h1>
          <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-copper)', fontSize: 'var(--text-sm)' }}>
            <BackArrow size={14} /> {isAr ? 'متابعة التسوق' : 'Continue Shopping'}
          </Link>
        </div>

        {cartProducts.length === 0 ? (
          <motion.div className={styles.emptyCart} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ShoppingBag size={64} className={styles.emptyCartIcon} />
            <h2 className={styles.emptyCartTitle}>{isAr ? 'السلة فارغة' : 'Cart is Empty'}</h2>
            <p className={styles.emptyCartDesc}>{isAr ? 'لم تضف أي منتجات بعد' : "You haven't added any products yet"}</p>
            <Link href="/shop" className="btn btn--accent btn--lg">
              {isAr ? 'تصفح المنتجات' : 'Browse Products'}
            </Link>
          </motion.div>
        ) : (
          <div className={styles.cartGrid}>
            {/* Items */}
            <motion.div className={styles.cartItems} initial="hidden" animate="visible" variants={stagger}>
              {cartProducts.map(({ product, qty, id }) => {
                const Icon = product!.icon;
                const content = isAr ? product!.ar : product!.en;
                return (
                  <motion.div key={id} className={styles.cartItem} variants={fadeUp}>
                    <div className={styles.cartItemImage}>
                      <Icon size={28} />
                    </div>
                    <div className={styles.cartItemInfo}>
                      <h4 className={styles.cartItemName}>{content.name}</h4>
                      <div className={styles.cartItemPrice}>
                        {product!.price} QAR
                      </div>
                      <div className={styles.cartItemActions}>
                        <button className={styles.qtyBtn} onClick={() => updateQty(id, -1)}>
                          <Minus size={14} />
                        </button>
                        <span className={styles.qtyValue}>{qty}</span>
                        <button className={styles.qtyBtn} onClick={() => updateQty(id, 1)}>
                          <Plus size={14} />
                        </button>
                        <button className={styles.removeBtn} onClick={() => removeItem(id)}>
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Summary */}
            <div className={styles.cartSummary}>
              <h3 className={styles.summaryTitle}>{isAr ? 'ملخص الطلب' : 'Order Summary'}</h3>
              <div className={styles.summaryRow}>
                <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span>{subtotal} QAR</span>
              </div>
              <div className={styles.summaryRow}>
                <span>{isAr ? 'الضريبة (5%)' : 'VAT (5%)'}</span>
                <span>{vat} QAR</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>{isAr ? 'الإجمالي' : 'Total'}</span>
                <span>{total} QAR</span>
              </div>
              <Link href="/checkout" className={`btn btn--accent btn--lg ${styles.checkoutBtn}`}>
                {isAr ? 'إتمام الشراء' : 'Proceed to Checkout'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
