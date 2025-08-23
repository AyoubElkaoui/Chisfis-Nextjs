"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    UserGroupIcon,
    MapPinIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    CogIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Schoonmakers', href: '/admin/cleaners', icon: UserGroupIcon },
    { name: 'Boekingen', href: '/admin/bookings', icon: ClipboardDocumentListIcon },
    { name: 'Steden', href: '/admin/cities', icon: MapPinIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
    { name: 'Instellingen', href: '/admin/settings', icon: CogIcon },
];

export default function AdminNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg"
                >
                    <Bars3Icon className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile backdrop */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

                {/* Mobile close button */}
                <div className="lg:hidden absolute top-4 right-4">
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 text-neutral-500 hover:text-neutral-700"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Logo */}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-primary-600">
                        CleanMorocco Admin
                    </h2>
                </div>

                {/* Navigation */}
                <nav className="px-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }
                `}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="text-xs text-neutral-500 text-center">
                        CleanMorocco Admin v1.0
                    </div>
                </div>
            </div>
        </>
    );
}