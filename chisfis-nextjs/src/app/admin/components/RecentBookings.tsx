"use client";

import Link from 'next/link';
import { ClockIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Booking {
    id: number;
    customerName: string;
    cleanerName: string;
    cityName: string;
    status: string;
    preferredDate: Date | null;
    createdAt: Date;
}

interface Props {
    bookings: Booking[];
}

export default function RecentBookings({ bookings }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'CONFIRMED':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            default:
                return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING': return 'Wachtend';
            case 'CONFIRMED': return 'Bevestigd';
            case 'COMPLETED': return 'Voltooid';
            case 'CANCELLED': return 'Geannuleerd';
            default: return status;
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return 'Geen datum';
        return new Intl.DateTimeFormat('nl-NL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(date));
    };

    const formatTimeAgo = (date: Date) => {
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Zojuist';
        if (diffInHours < 24) return `${diffInHours}u geleden`;
        if (diffInHours < 48) return 'Gisteren';
        return formatDate(date);
    };

    return (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl">

            {/* Header */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Recente Boekingen
                    </h3>
                    <Link
                        href="/admin/bookings"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Alle bekijken →
                    </Link>
                </div>
            </div>

            {/* Bookings List */}
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {bookings.length > 0 ? bookings.map((booking) => (
                    <div key={booking.id} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors">
                        <div className="flex items-start justify-between">

                            {/* Left side */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                        {booking.customerName}
                                    </h4>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                                </div>

                                <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    <p>Schoonmaker: <span className="font-medium">{booking.cleanerName}</span></p>
                                    <p>Stad: <span className="font-medium">{booking.cityName}</span></p>
                                    {booking.preferredDate && (
                                        <p>Gewenste datum: <span className="font-medium">{formatDate(booking.preferredDate)}</span></p>
                                    )}
                                </div>

                                <div className="flex items-center gap-1 mt-2 text-xs text-neutral-500">
                                    <ClockIcon className="w-4 h-4" />
                                    {formatTimeAgo(booking.createdAt)}
                                </div>
                            </div>

                            {/* Right side */}
                            <Link
                                href={`/admin/bookings/${booking.id}`}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                            >
                                <EyeIcon className="w-4 h-4" />
                                Bekijken
                            </Link>
                        </div>
                    </div>
                )) : (
                    <div className="p-12 text-center">
                        <ClockIcon className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                            Geen recente boekingen
                        </h3>
                        <p className="text-neutral-500">
                            Nieuwe boekingen verschijnen hier automatisch
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}