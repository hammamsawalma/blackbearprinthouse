import { Users, ShoppingCart, FileText, CheckCircle } from 'lucide-react';
import prisma from '@/lib/prisma';
import styles from '@/styles/admin.module.css';

export const revalidate = 0;

export default async function AdminDashboard() {
  const [totalOrders, totalQuotes, totalCustomers, completedOrders, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.quoteRequest.count(),
    prisma.customer.count(),
    prisma.order.count({ where: { status: 'COMPLETED' } }),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING': return styles.badgePending;
      case 'PROCESSING': return styles.badgeProcessing;
      case 'COMPLETED': return styles.badgeCompleted;
      default: return '';
    }
  };

  return (
    <>
      <div className={styles.topbar}>
        <h1 className={styles.topbarTitle}>Dashboard Overview</h1>
        <div className={styles.topbarActions}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            Welcome, Admin
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><ShoppingCart size={24} /></div>
            <div className={styles.statInfo}>
              <h4>Total Orders</h4>
              <div className={styles.statValue}>{totalOrders}</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FileText size={24} /></div>
            <div className={styles.statInfo}>
              <h4>Quote Requests</h4>
              <div className={styles.statValue}>{totalQuotes}</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Users size={24} /></div>
            <div className={styles.statInfo}>
              <h4>Total Customers</h4>
              <div className={styles.statValue}>{totalCustomers}</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><CheckCircle size={24} /></div>
            <div className={styles.statInfo}>
              <h4>Completed Jobs</h4>
              <div className={styles.statValue}>{completedOrders}</div>
            </div>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Recent Orders</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--color-text-light)' }}>
                    No orders yet.
                  </td>
                </tr>
              )}
              {recentOrders.map((order: any) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.contactName}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td><span className={`${styles.badge} ${getBadgeClass(order.status)}`}>{order.status}</span></td>
                  <td>{order.totalAmount} QAR</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

