'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { LogoIcon } from '@/components/common/LogoIcon';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/shop', key: 'shop' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const switchLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
    >
      <div className={styles.headerInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <LogoIcon size={32} color="var(--color-white)" />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>
              {locale === 'ar' ? 'بلاك بير' : 'BlackBear'}
            </span>
            <span className={styles.logoSubtitle}>
              {locale === 'ar' ? 'PRINT HOUSE' : 'PRINT HOUSE'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.navLinkActive : ''
              }`}
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            onClick={switchLocale}
            className={styles.langSwitch}
            aria-label={t('common.switch_language')}
          >
            {t('common.switch_language')}
          </button>

          <Link href="/quote" className={styles.quoteBtn}>
            {t('nav.quote')}
          </Link>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${
              menuOpen ? styles.hamburgerOpen : ''
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('common.close_menu') : t('common.open_menu')}
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ''
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            {t(`nav.${link.key}`)}
          </Link>
        ))}
        <Link
          href="/quote"
          className={styles.mobileNavLink}
          onClick={() => setMenuOpen(false)}
        >
          {t('nav.quote')}
        </Link>
        <button onClick={switchLocale} className={styles.mobileLangSwitch}>
          {t('common.switch_language')}
        </button>
      </div>
    </header>
  );
}
