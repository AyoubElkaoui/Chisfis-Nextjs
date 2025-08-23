"use client";

import Link from 'next/link';
import { StarIcon, CheckBadgeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import ButtonPrimary from '@/shared/ButtonPrimary'; // Fix import

interface Cleaner {
    id: number;
    slug: string;
    name: string;
    city: {
        name: string;
        slug: string;
    };
    bio: string | null;
    pricePerHour: number | null;
    photoUrl: string;
    services: string[];
    languages: string[];
    rating: number | null;
    reviewCount: number;
    isVerified: boolean;
}

interface Props {
    cleaners: Cleaner[];
}

export default function FeaturedCleaners({ cleaners }: Props) {
    return (
        <div>
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Onze <span className="text-primary-600">Top Schoonmakers</span>
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    Ontmoet onze best beoordeelde en meest ervaren schoonmakers.
                    Allemaal gescreend en geverifieerd voor uw veiligheid.
                </p>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {cleaners.map((cleaner) => (
                    <div
                        key={cleaner.id}
                        className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Image */}
                        <div className="aspect-[4/3] relative">
                            <img
                                src={cleaner.photoUrl}
                                alt={cleaner.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />

                            {/* Verified badge */}
                            {cleaner.isVerified && (
                                <div className="absolute top-3 right-3">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                                        <CheckBadgeIcon className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            )}

                            {/* Rating */}
                            {cleaner.rating && (
                                <div className="absolute bottom-3 left-3">
                                    <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                        <StarIcon className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm font-medium">{cleaner.rating.toFixed(1)}</span>
                                        <span className="text-xs text-neutral-500">({cleaner.reviewCount})</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                        {cleaner.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 text-sm">
                                        <MapPinIcon className="w-4 h-4" />
                                        {cleaner.city.name}
                                    </div>
                                </div>

                                {cleaner.pricePerHour && (
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-primary-600">
                                            {cleaner.pricePerHour} MAD
                                        </div>
                                        <div className="text-xs text-neutral-500">per uur</div>
                                    </div>
                                )}
                            </div>

                            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                                {cleaner.bio || 'Ervaren schoonmaakprofessional met aandacht voor detail.'}
                            </p>

                            {/* Services */}
                            {cleaner.services.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {cleaner.services.slice(0, 3).map((service, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-full"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                    {cleaner.services.length > 3 && (
                                        <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-full">
                                            +{cleaner.services.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Link
                                    href={`/cleaner/${cleaner.slug}`}
                                    className="flex-1 text-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
                                >
                                    Bekijk Profiel
                                </Link>
                                <Link
                                    href={`/book?cleaner=${cleaner.slug}&city=${cleaner.city.slug}`}
                                    className="flex-1 text-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium"
                                >
                                    Boek Nu
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
                <Link href="/cleaner-listings">
                    <ButtonPrimary className="px-8 py-3 text-lg">
                        Bekijk Alle Schoonmakers
                    </ButtonPrimary>
                </Link>
            </div>
        </div>
    );
}