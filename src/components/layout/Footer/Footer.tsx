'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { LogoIcon } from '@/components/common/LogoIcon';
import styles from './Footer.module.css';

const quickLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/contact', key: 'contact' },
  { href: '/quote', key: 'quote' },
] as const;

const serviceLinks = [
  { href: '/services', label: { ar: 'طباعة أوفست', en: 'Offset Printing' } },
  { href: '/services', label: { ar: 'طباعة ديجيتال', en: 'Digital Printing' } },
  { href: '/services', label: { ar: 'تغليف وعلب', en: 'Packaging' } },
  { href: '/services', label: { ar: 'تصميم جرافيك', en: 'Graphic Design' } },
  { href: '/services', label: { ar: 'كروت أعمال', en: 'Business Cards' } },
  { href: '/services', label: { ar: 'لوحات إعلانية', en: 'Signage' } },
] as const;

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>
                <LogoIcon size={36} color="var(--color-white)" />
              </div>
              <div className={styles.footerLogoText}>
                <span className={styles.footerLogoTitle}>
                  {locale === 'ar' ? 'بلاك بير' : 'BlackBear'}
                </span>
                <span className={styles.footerLogoSub}>PRINT HOUSE</span>
              </div>
            </Link>
            <p className={styles.footerDesc}>{t('footer.description')}</p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.footerColTitle}>{t('footer.quick_links')}</h4>
            <ul className={styles.footerLinks}>
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={styles.footerLink}>
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={styles.footerColTitle}>{t('footer.our_services')}</h4>
            <ul className={styles.footerLinks}>
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label[locale as 'ar' | 'en']}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={styles.footerColTitle}>{t('footer.contact_info')}</h4>

            <div className={styles.contactItem}>
              <Phone size={18} className={styles.contactIcon} />
              <div>
                <div className={styles.contactLabel}>{t('footer.phone')}</div>
                <div className={styles.contactValue} dir="ltr">+974 XXXX XXXX</div>
              </div>
            </div>

            <div className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <div>
                <div className={styles.contactLabel}>{t('footer.email')}</div>
                <div className={styles.contactValue}>info@blackbearprint.qa</div>
              </div>
            </div>

            <div className={styles.contactItem}>
              <MapPin size={18} className={styles.contactIcon} />
              <div>
                <div className={styles.contactLabel}>{t('footer.address')}</div>
                <div className={styles.contactValue}>{t('footer.address_value')}</div>
              </div>
            </div>

            <div className={styles.contactItem}>
              <Clock size={18} className={styles.contactIcon} />
              <div>
                <div className={styles.contactLabel}>{t('footer.work_hours')}</div>
                <div className={styles.contactValue}>{t('footer.work_hours_value')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <span>© {new Date().getFullYear()} BlackBear Print House.</span>
            <span>{t('footer.rights')}</span>
          </div>
          <div>
            {t('footer.follow_us')}
          </div>
        </div>
      </div>
    </footer>
  );
}
