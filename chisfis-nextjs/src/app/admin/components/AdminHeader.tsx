"use client";

import { useState } from 'react';
import { BellIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function AdminHeader() {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">

                {/* Left side - Search (desktop only) */}
                <div className="hidden lg:block flex-1 max-w-md">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Zoek schoonmakers, boekingen..."
                            className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4 ml-auto">

                    {/* Stats (desktop) */}
                    <div className="hidden lg:flex items-center gap-6 mr-6 text-sm">
                        <div className="text-center">
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">47</div>
                            <div className="text-neutral-500">Actieve Schoonmakers</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">23</div>
                            <div className="text-neutral-500">Nieuwe Boekingen</div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 relative"
                        >
                            <BellIcon className="w-6 h-6" />
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </div>
                        </button>

                        {/* Notifications dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-50">
                                <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                        Notificaties
                                    </h3>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="p-4 border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                                            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                Nieuwe boeking ontvangen
                                            </div>
                                            <div className="text-sm text-neutral-500 mt-1">
                                                Marie van der Berg heeft Fatima geboekt voor morgen
                                            </div>
                                            <div className="text-xs text-neutral-400 mt-2">
                                                2 minuten geleden
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4">
                                    <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                                        Alle notificaties bekijken
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User menu */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="hidden lg:block">
                            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                Admin User
                            </div>
                            <div className="text-xs text-neutral-500">
                                admin@cleanmorocco.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}