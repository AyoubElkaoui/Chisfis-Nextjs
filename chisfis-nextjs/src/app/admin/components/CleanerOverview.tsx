"use client";

import Link from 'next/link';
import { StarIcon, EyeIcon } from '@heroicons/react/24/solid';

interface Cleaner {
    id: number;
    name: string;
    city: string;
    rating: number | null;
    reviewCount: number;
    photoUrl: string;
}

interface Props {
    cleaners: Cleaner[];
}

export default function CleanerOverview({ cleaners }: Props) {
    return (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl">

            {/* Header */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Top Schoonmakers
                    </h3>
                    <Link
                        href="/admin/cleaners"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Alle bekijken →
                    </Link>
                </div>
            </div>

            {/* Cleaners List */}
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {cleaners.length > 0 ? cleaners.map((cleaner) => (
                    <div key={cleaner.id} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-700/30 transition-colors">
                        <div className="flex items-center justify-between">

                            {/* Left side */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={cleaner.photoUrl}
                                    alt={cleaner.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/cleaners/default.jpg';
                                    }}
                                />

                                <div>
                                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                        {cleaner.name}
                                    </h4>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {cleaner.city}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mt-1">
                                        <StarIcon className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {cleaner.rating?.toFixed(1) || '0.0'}
                    </span>
                                        <span className="text-sm text-neutral-500">
                      ({cleaner.reviewCount} reviews)
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right side */}
                            <Link
                                href={`/admin/cleaners/${cleaner.id}`}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                            >
                                <EyeIcon className="w-4 h-4" />
                                Bekijken
                            </Link>
                        </div>
                    </div>
                )) : (
                    <div className="p-12 text-center">
                        <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <StarIcon className="w-6 h-6 text-neutral-400" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                            Geen schoonmakers gevonden
                        </h3>
                        <p className="text-neutral-500">
                            Voeg schoonmakers toe om hier statistieken te zien
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}