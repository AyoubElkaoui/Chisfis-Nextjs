"use client";

import Link from 'next/link';
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface Cleaner {
    id: number;
    slug: string;
    name: string;
    city: {
        name: string;
        slug: string;
    };
    photoUrl: string;
    rating: number | null;
    reviewCount: number;
    pricePerHour: number | null;
    isVerified: boolean;
    services: string[];
}

interface Props {
    cleaners: Cleaner[];
}

const serviceIcons: Record<string, string> = {
    basic: '🧹',
    deep: '✨',
    windows: '🪟',
    garden: '🌿',
    maintenance: '🔧'
};

export default function SimilarCleaners({ cleaners }: Props) {
    if (cleaners.length === 0) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 lg:p-8">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Andere schoonmakers in de buurt
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Meer geweldige opties in {cleaners[0]?.city.name}
                </p>
            </div>

            {/* Cleaners Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {cleaners.map((cleaner) => (
                    <Link
                        key={cleaner.id}
                        href={`/cleaner/${cleaner.slug}`}
                        className="group block bg-neutral-50 dark:bg-neutral-700/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >

                        {/* Image */}
                        <div className="aspect-square relative overflow-hidden">
                            <img
                                src={cleaner.photoUrl}
                                alt={cleaner.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Overlay info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Price */}
                            {cleaner.pricePerHour && (
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-neutral-900">
                                    €{cleaner.pricePerHour}/u
                                </div>
                            )}

                            {/* Verified badge */}
                            {cleaner.isVerified && (
                                <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                                    <CheckBadgeIcon className="w-3 h-3" />
                                </div>
                            )}

                            {/* Bottom info */}
                            <div className="absolute bottom-2 left-2 right-2">
                                <div className="text-white">
                                    <h3 className="font-medium text-sm mb-1 line-clamp-1">
                                        {cleaner.name}
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-xs">
                                            <StarIcon className="w-3 h-3 text-yellow-400" />
                                            <span>{cleaner.rating?.toFixed(1) || 'Nieuw'}</span>
                                            <span className="text-white/80">({cleaner.reviewCount})</span>
                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-white/90">
                                            <MapPinIcon className="w-3 h-3" />
                                            <span className="line-clamp-1">{cleaner.city.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-3">
                            {/* Services */}
                            {cleaner.services.length > 0 && (
                                <div className="flex flex-wrap gap-1 justify-center">
                                    {cleaner.services.slice(0, 3).map((service) => (
                                        <span
                                            key={service}
                                            className="text-xs bg-neutral-200 dark:bg-neutral-600 px-2 py-0.5 rounded-full"
                                            title={service}
                                        >
                      {serviceIcons[service] || '🔧'}
                    </span>
                                    ))}
                                    {cleaner.services.length > 3 && (
                                        <span className="text-xs bg-neutral-200 dark:bg-neutral-600 px-2 py-0.5 rounded-full">
                      +{cleaner.services.length - 3}
                    </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-6">
                <Link
                    href={`/cleaner-listings?city=${cleaners[0]?.city.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                    Alle schoonmakers in {cleaners[0]?.city.name} bekijken
                </Link>
            </div>
        </div>
    );
}