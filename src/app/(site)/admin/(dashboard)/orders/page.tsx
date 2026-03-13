import prisma from '@/lib/prisma';
import styles from '@/styles/admin.module.css';

export const revalidate = 0; // Ensure data is always fresh

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING': return styles.badgePending;
      case 'PROCESSING': return styles.badgeProcessing;
      case 'COMPLETED': return styles.badgeCompleted;
      case 'CANCELLED': return styles.badgeCancelled || '';
      default: return '';
    }
  };

  return (
    <>
      <div className={styles.topbar}>
        <h1 className={styles.topbarTitle}>Orders Management</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>All Orders</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-text-light)' }}>
                    No orders found.
                  </td>
                </tr>
              )}
              {orders.map((order: any) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.orderNumber}</td>
                  <td>{order.contactName}</td>
                  <td>{order.contactEmail}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td><span className={`${styles.badge} ${getBadgeClass(order.status)}`}>{order.status}</span></td>
                  <td><span className={`${styles.badge} ${order.paymentStatus === 'PAID' ? styles.badgeCompleted : styles.badgePending}`}>{order.paymentStatus}</span></td>
                  <td style={{ fontWeight: 600 }}>{order.totalAmount} QAR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
