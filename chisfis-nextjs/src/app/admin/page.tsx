import { prisma } from '@/lib/prisma';
import StatsCards from './components/StatsCards';
import RecentBookings from './components/RecentBookings';
import CleanerOverview from './components/CleanerOverview';
import QuickActions from './components/QuickActions';

async function getDashboardData() {
  try {
    const [
      totalCleaners,
      activeCleaners,
      totalBookings,
      pendingBookings,
      totalCities,
      recentBookings,
      topCleaners
    ] = await Promise.all([
      prisma.cleaner.count(),
      prisma.cleaner.count({ where: { isActive: true } }),
      prisma.bookingRequest.count(),
      prisma.bookingRequest.count({ where: { status: 'PENDING' } }),
      prisma.city.count(),
      
      prisma.bookingRequest.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          cleaner: true,
          city: true
        }
      }),
      
      prisma.cleaner.findMany({
        take: 5,
        where: { isActive: true },
        orderBy: { rating: 'desc' },
        include: { city: true }
      })
    ]);

    return {
      stats: {
        totalCleaners,
        activeCleaners,
        totalBookings,
        pendingBookings,
        totalCities
      },
      recentBookings: recentBookings.map(b => ({
        id: b.id,
        customerName: b.fullName,
        cleanerName: b.cleaner?.name || 'Nog niet toegewezen',
        cityName: b.city.name,
        status: b.status,
        preferredDate: b.preferredDate,
        createdAt: b.createdAt
      })),
      topCleaners: topCleaners.map(c => ({
        id: c.id,
        name: c.name,
        city: c.city.name,
        rating: c.rating,
        reviewCount: c.reviewCount || 0,
        photoUrl: c.photoUrl || '/images/cleaners/default.jpg'
      }))
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      stats: {
        totalCleaners: 0,
        activeCleaners: 0,
        totalBookings: 0,
        pendingBookings: 0,
        totalCities: 0
      },
      recentBookings: [],
      topCleaners: []
    };
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Dashboard
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Welkom terug! Hier is een overzicht van je CleanMorocco platform.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={data.stats} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <RecentBookings bookings={data.recentBookings} />
        
        {/* Top Cleaners */}
        <CleanerOverview cleaners={data.topCleaners} />
      </div>
    </div>
  );
}
