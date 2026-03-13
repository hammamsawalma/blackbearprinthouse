import prisma from '@/lib/prisma';
import styles from '@/styles/admin.module.css';

export const revalidate = 0;

export default async function AdminQuotes() {
  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING': return styles.badgePending;
      case 'REVIEWED': return styles.badgeProcessing;
      case 'QUOTED': return styles.badgeCompleted;
      case 'REJECTED': return styles.badgeCancelled || '';
      default: return '';
    }
  };

  return (
    <>
      <div className={styles.topbar}>
        <h1 className={styles.topbarTitle}>Quote Requests</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>All Quote Requests</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Service</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Date Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-text-light)' }}>
                    No quote requests yet.
                  </td>
                </tr>
              )}
              {quotes.map((quote: any) => (
                <tr key={quote.id}>
                  <td style={{ fontWeight: 600 }}>{quote.serviceType}</td>
                  <td>{quote.name}</td>
                  <td>{quote.email}</td>
                  <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
                  <td><span className={`${styles.badge} ${getBadgeClass(quote.status)}`}>{quote.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

