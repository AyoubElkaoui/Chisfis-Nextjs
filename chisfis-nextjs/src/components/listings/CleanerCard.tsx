"use client";

import Link from 'next/link';
import { StarIcon, CheckBadgeIcon, PhoneIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';

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

const serviceIcons: Record<string, string> = {
    basic: '🧹',
    deep: '✨',
    windows: '🪟',
    garden: '🌿',
    maintenance: '🔧'
};

const languageNames: Record<string, string> = {
    ar: 'العربية',
    fr: 'Français',
    en: 'English',
    es: 'Español',
    nl: 'Nederlands'
};

export default function CleanerCard({ cleaner }: Props) {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">

            {/* Image & Basic Info */}
            <div className="relative">
                <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                        src={cleaner.photoUrl}
                        alt={cleaner.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Verified Badge */}
                    {cleaner.isVerified && (
                        <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                            <CheckBadgeIcon className="w-3 h-3" />
                            Geverifieerd
                        </div>
                    )}

                    {/* Price */}
                    {cleaner.pricePerHour && (
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            €{cleaner.pricePerHour}/uur
                        </div>
                    )}

                    {/* Rating */}
                    <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {cleaner.rating?.toFixed(1) || 'Nieuw'}
            </span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
              ({cleaner.reviewCount})
            </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">

                {/* Header */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {cleaner.name}
                        </h3>
                        <div className="flex items-center gap-1 text-neutral-500">
                            <MapPinIcon className="w-4 h-4" />
                            <span className="text-sm">{cleaner.city.name}</span>
                        </div>
                    </div>

                    {cleaner.bio && (
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
                            {cleaner.bio}
                        </p>
                    )}
                </div>

                {/* Services */}
                {cleaner.services.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                            {cleaner.services.slice(0, 3).map((service) => (
                                <span
                                    key={service}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs text-neutral-700 dark:text-neutral-300"
                                >
                  {serviceIcons[service]} {service}
                </span>
                            ))}
                            {cleaner.services.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs text-neutral-700 dark:text-neutral-300">
                  +{cleaner.services.length - 3} meer
                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {cleaner.languages.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs text-neutral-500 mb-1">Spreekt:</p>
                        <div className="flex flex-wrap gap-1">
                            {cleaner.languages.map((lang) => (
                                <span
                                    key={lang}
                                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                                >
                  {languageNames[lang] || lang}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Latest Review */}
                {cleaner.reviews.length > 0 && (
                    <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`w-3 h-3 ${
                                            i < cleaner.reviews[0].rating
                                                ? 'text-yellow-500'
                                                : 'text-neutral-300 dark:text-neutral-600'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">
                {cleaner.reviews[0].user.name}
              </span>
                        </div>
                        {cleaner.reviews[0].comment && (
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                "{cleaner.reviews[0].comment}"
                            </p>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <Link
                        href={`/cleaner/${cleaner.slug}`}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl text-sm font-medium text-center transition-colors"
                    >
                        Bekijk Profiel
                    </Link>

                    {cleaner.phoneE164 && (
                        <a
                            href={`tel:${cleaner.phoneE164}`}
                            className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
                        >
                            <PhoneIcon className="w-4 h-4" />
                        </a>
                    )}

                    <Link
                        href={`/book?cleaner=${cleaner.slug}&city=${cleaner.city.slug}`}
                        className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
                    >
                        <ChatBubbleLeftIcon className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}