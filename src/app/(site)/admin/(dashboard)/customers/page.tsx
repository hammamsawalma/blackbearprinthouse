import styles from '@/styles/admin.module.css';

export default function CustomersPage() {
  return (
    <div className={styles.dashboardGrid} style={{ display: 'block' }}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.pageTitle}>Customers</h1>
      </div>
      <div className={styles.tableCard}>
        <div style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Customer management interface coming soon.
        </div>
      </div>
    </div>
  );
}
