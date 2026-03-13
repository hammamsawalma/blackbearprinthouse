import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

/**
 * GET /api/admin/dashboard — Dashboard statistics
 */
export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const [
      totalOrders,
      monthlyOrders,
      weeklyOrders,
      pendingOrders,
      processingOrders,
      totalRevenue,
      monthlyRevenue,
      totalProducts,
      totalCustomers,
      pendingQuotes,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.order.count({ where: { createdAt: { gte: startOfWeek } } }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: 'PROCESSING' } }),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { paymentStatus: 'PAID' } }),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { paymentStatus: 'PAID', createdAt: { gte: startOfMonth } } }),
      prisma.product.count(),
      prisma.customer.count(),
      prisma.quoteRequest.count({ where: { status: 'PENDING' } }),
      prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { items: true } }),
    ]);

    return NextResponse.json({
      stats: {
        orders: { total: totalOrders, monthly: monthlyOrders, weekly: weeklyOrders, pending: pendingOrders, processing: processingOrders },
        revenue: { total: totalRevenue._sum.totalAmount || 0, monthly: monthlyRevenue._sum.totalAmount || 0 },
        products: totalProducts,
        customers: totalCustomers,
        pendingQuotes,
      },
      recentOrders,
    }, { status: 200 });
  } catch (err) {
    console.error('Admin Dashboard Error:', err);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
