'use client';

import { useActionState } from 'react';
import { Lock, Mail } from 'lucide-react';
import styles from '@/styles/admin.module.css';
import { authenticate } from './actions';

export default function AdminLogin() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginLogo}>
            BlackBear <span className={styles.logoAccent}>Admin</span>
          </h1>
          <p className={styles.loginSub}>Enter your credentials to access the dashboard</p>
        </div>

        <form action={formAction} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input type="email" name="email" placeholder="admin@blackbear.qa" required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input type="password" name="password" placeholder="••••••••" required />
            </div>
          </div>

          {errorMessage && (
            <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>{errorMessage}</p>
          )}

          <button type="submit" className={styles.loginBtn} disabled={isPending}>
            {isPending ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
