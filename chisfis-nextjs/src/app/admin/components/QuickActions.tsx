"use client";

import Link from 'next/link';
import {
    PlusIcon,
    UserPlusIcon,
    MapPinIcon,
    ClipboardDocumentCheckIcon,
    ChartBarIcon,
    Cog8ToothIcon  // ← GEWIJZIGD: van Cog6ToothIcon naar Cog8ToothIcon
} from '@heroicons/react/24/outline';

export default function QuickActions() {
    const actions = [
        {
            title: 'Nieuwe Schoonmaker',
            description: 'Voeg een nieuwe schoonmaker toe',
            href: '/admin/cleaners/new',
            icon: UserPlusIcon,
            color: 'bg-blue-500 hover:bg-blue-600'
        },
        {
            title: 'Stad Toevoegen',
            description: 'Nieuwe stad aan platform',
            href: '/admin/cities/new',
            icon: MapPinIcon,
            color: 'bg-green-500 hover:bg-green-600'
        },
        {
            title: 'Boekingen Beheren',
            description: 'Bekijk en beheer boekingen',
            href: '/admin/bookings',
            icon: ClipboardDocumentCheckIcon,
            color: 'bg-purple-500 hover:bg-purple-600'
        },
        {
            title: 'Analytics Bekijken',
            description: 'Platform statistieken',
            href: '/admin/analytics',
            icon: ChartBarIcon,
            color: 'bg-orange-500 hover:bg-orange-600'
        }
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Snelle Acties
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action, index) => (
                    <Link
                        key={index}
                        href={action.href}
                        className="group bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-700"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <action.icon className="w-6 h-6 text-white" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {action.title}
                                </h3>
                                <p className="text-sm text-neutral-500 mt-1">
                                    {action.description}
                                </p>
                            </div>

                            <PlusIcon className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}