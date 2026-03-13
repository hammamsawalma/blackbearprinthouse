import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import styles from '@/styles/admin.module.css';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/admin/login');
  }

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />
      <div className={styles.main}>
        {children}
      </div>
    </div>
  );
}
