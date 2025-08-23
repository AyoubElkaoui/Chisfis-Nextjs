"use client";

import Link from 'next/link';
import { StarIcon, CheckBadgeIcon, MapPinIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { PhoneIcon } from '@heroicons/react/24/outline';

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
    phoneE164: string | null;
    services: string[];
    languages: string[];
    rating: number | null;
    reviewCount: number;
    isVerified: boolean;
    availability: Record<string, any>;
    reviews: Array<{
        id: number;
        rating: number;
        comment: string | null;
        createdAt: Date;
        user: {
            name: string;
        };
    }>;
}

interface Props {
    cleaner: Cleaner;
}

export default function CleanerCard({ cleaner }: Props) {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        (e.target as HTMLImageElement).src = '/images/cleaners/default.jpg';
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 group">

            {/* Image */}
            <div className="aspect-[4/3] relative overflow-hidden">
                <img
                    src={cleaner.photoUrl}
                    alt={cleaner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                    loading="lazy"
                />

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {cleaner.isVerified && (
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                            <CheckBadgeIcon className="w-5 h-5 text-blue-600" />
                        </div>
                    )}
                    {cleaner.rating && (
                        <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-semibold">{cleaner.rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                {/* Price Badge */}
                {cleaner.pricePerHour && (
                    <div className="absolute bottom-3 left-3">
                        <div className="bg-primary-600 text-white px-3 py-1.5 rounded-full">
                            <span className="text-sm font-semibold">{cleaner.pricePerHour} MAD/u</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <Link
                            href={`/cleaner/${cleaner.slug}`}
                            className="block group-hover:text-primary-600 transition-colors"
                        >
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                                {cleaner.name}
                                {cleaner.isVerified && (
                                    <CheckBadgeIcon className="w-4 h-4 text-blue-600 inline ml-1" />
                                )}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 text-sm">
                            <MapPinIcon className="w-4 h-4" />
                            {cleaner.city.name}
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                    {cleaner.bio || 'Professionele schoonmaker met ervaring in het onderhouden van huizen en appartementen.'}
                </p>

                {/* Services */}
                {cleaner.services.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {cleaner.services.slice(0, 3).map((service, index) => (
                            <span
                                key={index}
                                className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-full"
                            >
                {service}
              </span>
                        ))}
                        {cleaner.services.length > 3 && (
                            <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-full">
                +{cleaner.services.length - 3} meer
              </span>
                        )}
                    </div>
                )}

                {/* Languages */}
                {cleaner.languages.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                        <ChatBubbleLeftIcon className="w-4 h-4 text-neutral-400" />
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {cleaner.languages.slice(0, 2).join(', ')}
                            {cleaner.languages.length > 2 && ` +${cleaner.languages.length - 2}`}
            </span>
                    </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-4">
                        {cleaner.rating && (
                            <div className="flex items-center gap-1">
                                <StarIcon className="w-4 h-4 text-yellow-500" />
                                <span className="font-medium">{cleaner.rating.toFixed(1)}</span>
                                <span className="text-neutral-500">({cleaner.reviewCount})</span>
                            </div>
                        )}
                    </div>

                    {cleaner.pricePerHour && (
                        <div className="text-right">
                            <div className="font-semibold text-primary-600">
                                {cleaner.pricePerHour} MAD
                            </div>
                            <div className="text-xs text-neutral-500">per uur</div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Link
                        href={`/cleaner/${cleaner.slug}`}
                        className="flex-1 text-center px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
                    >
                        Bekijk Profiel
                    </Link>
                    <Link
                        href={`/book?cleaner=${cleaner.slug}&city=${cleaner.city.slug}`}
                        className="flex-1 text-center px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium"
                    >
                        Boek Nu
                    </Link>
                </div>

                {/* Quick Contact (if phone available) */}
                {cleaner.phoneE164 && (
                    <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                        <a
                            href={`tel:${cleaner.phoneE164}`}
                            className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                            <PhoneIcon className="w-4 h-4" />
                            Direct Bellen
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}