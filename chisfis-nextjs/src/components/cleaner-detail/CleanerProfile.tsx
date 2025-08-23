"use client";

import { useState } from 'react';
import {
    StarIcon,
    CheckBadgeIcon,
    MapPinIcon,
    ClockIcon,
    PhoneIcon,
    EnvelopeIcon,
    ChevronDownIcon,
    ChevronUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Cleaner {
    id: number;
    slug: string;
    name: string;
    email: string | null;
    phoneE164: string | null;
    bio: string | null;
    photoUrl: string;
    pricePerHour: number | null;
    rating: number | null;
    reviewCount: number;
    isVerified: boolean;
    completedJobs: number;
    city: {
        id: number;
        name: string;
        slug: string;
        region: string | null;
    };
    services: string[];
    languages: string[];
    availability: Record<string, any>;
}

interface Props {
    cleaner: Cleaner;
}

const serviceDetails: Record<string, { name: string; icon: string; description: string }> = {
    basic: { name: 'Basis Schoonmaak', icon: '🧹', description: 'Dagelijkse schoonmaak, stoffen, dweilen, stofzuigen' },
    deep: { name: 'Grote Schoonmaak', icon: '✨', description: 'Dieptereiniging, keuken, badkamers, kasten' },
    windows: { name: 'Ramen Wassen', icon: '🪟', description: 'Binnen en buiten ramen, spiegels, glazen deuren' },
    garden: { name: 'Tuin Onderhoud', icon: '🌿', description: 'Planten water geven, onkruid wieden, bladeren harken' },
    maintenance: { name: 'Onderhoud', icon: '🔧', description: 'Kleine reparaties, vervangen van lampen, etc.' }
};

const languageDetails: Record<string, { name: string; flag: string; level?: string }> = {
    ar: { name: 'Arabisch', flag: '🇲🇦', level: 'Moedertaal' },
    fr: { name: 'Frans', flag: '🇫🇷', level: 'Vloeiend' },
    en: { name: 'Engels', flag: '🇬🇧', level: 'Goed' },
    es: { name: 'Spaans', flag: '🇪🇸', level: 'Basis' },
    nl: { name: 'Nederlands', flag: '🇳🇱', level: 'Basis' }
};

const dayNames: Record<string, string> = {
    monday: 'Maandag',
    tuesday: 'Dinsdag',
    wednesday: 'Woensdag',
    thursday: 'Donderdag',
    friday: 'Vrijdag',
    saturday: 'Zaterdag',
    sunday: 'Zondag'
};

export default function CleanerProfile({ cleaner }: Props) {
    const [showFullBio, setShowFullBio] = useState(false);
    const [showAvailability, setShowAvailability] = useState(false);

    const renderStars = (rating: number | null) => {
        if (!rating) return null;

        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                        key={i}
                        className={`w-5 h-5 ${
                            i < Math.floor(rating)
                                ? 'text-yellow-500'
                                : 'text-neutral-300 dark:text-neutral-600'
                        }`}
                    />
                ))}
                <span className="ml-2 font-semibold">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">

            {/* Hero Section */}
            <div className="relative">
                <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                        src={cleaner.photoUrl}
                        alt={cleaner.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Overlay Content */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
                                <img
                                    src={cleaner.photoUrl}
                                    alt={cleaner.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-white">
                                        {cleaner.name}
                                    </h1>
                                    {cleaner.isVerified && (
                                        <CheckBadgeIcon className="w-6 h-6 text-green-400" />
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-white/90">
                                    <div className="flex items-center gap-1">
                                        <MapPinIcon className="w-4 h-4" />
                                        <span>{cleaner.city.name}</span>
                                        {cleaner.city.region && (
                                            <span className="text-white/70">• {cleaner.city.region}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="text-white">
                                        {renderStars(cleaner.rating)}
                                    </div>
                                    <span className="text-white/80 text-sm">
                    {cleaner.reviewCount} reviews
                  </span>
                                </div>
                            </div>

                            {/* Price */}
                            {cleaner.pricePerHour && (
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white">
                                        €{cleaner.pricePerHour}
                                    </div>
                                    <div className="text-white/80 text-sm">per uur</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Top badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {cleaner.isVerified && (
                            <div className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                                <CheckBadgeIcon className="w-4 h-4" />
                                Geverifieerd
                            </div>
                        )}
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {cleaner.completedJobs}+ klussen voltooid
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 space-y-8">

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                        <div className="text-2xl font-bold text-primary-600">
                            {cleaner.rating?.toFixed(1) || 'Nieuw'}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Rating</div>
                    </div>
                    <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                        <div className="text-2xl font-bold text-primary-600">
                            {cleaner.reviewCount}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Reviews</div>
                    </div>
                    <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                        <div className="text-2xl font-bold text-primary-600">
                            {cleaner.completedJobs}+
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Klussen</div>
                    </div>
                </div>

                {/* Bio */}
                {cleaner.bio && (
                    <div>
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Over {cleaner.name}
                        </h3>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {showFullBio || cleaner.bio.length <= 200
                                    ? cleaner.bio
                                    : `${cleaner.bio.substring(0, 200)}...`
                                }
                            </p>
                            {cleaner.bio.length > 200 && (
                                <button
                                    onClick={() => setShowFullBio(!showFullBio)}
                                    className="text-primary-600 hover:text-primary-700 font-medium mt-2 flex items-center gap-1"
                                >
                                    {showFullBio ? (
                                        <>
                                            <ChevronUpIcon className="w-4 h-4" />
                                            Minder tonen
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDownIcon className="w-4 h-4" />
                                            Meer lezen
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Services */}
                {cleaner.services.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Diensten
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {cleaner.services.map((service) => {
                                const details = serviceDetails[service];
                                return (
                                    <div
                                        key={service}
                                        className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl"
                                    >
                                        <div className="text-2xl">{details?.icon || '🔧'}</div>
                                        <div>
                                            <div className="font-medium text-neutral-900 dark:text-neutral-100">
                                                {details?.name || service}
                                            </div>
                                            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                                {details?.description || 'Professionele service'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {cleaner.languages.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Talen
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {cleaner.languages.map((lang) => {
                                const details = languageDetails[lang];
                                return (
                                    <div
                                        key={lang}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl"
                                    >
                                        <span className="text-lg">{details?.flag || '🌐'}</span>
                                        <span className="font-medium text-blue-700 dark:text-blue-300">
                      {details?.name || lang}
                    </span>
                                        {details?.level && (
                                            <span className="text-sm text-blue-600 dark:text-blue-400">
                        • {details.level}
                      </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Availability */}
                {Object.keys(cleaner.availability).length > 0 && (
                    <div>
                        <button
                            onClick={() => setShowAvailability(!showAvailability)}
                            className="flex items-center justify-between w-full mb-4"
                        >
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                Beschikbaarheid
                            </h3>
                            {showAvailability ? (
                                <ChevronUpIcon className="w-5 h-5 text-neutral-500" />
                            ) : (
                                <ChevronDownIcon className="w-5 h-5 text-neutral-500" />
                            )}
                        </button>

                        {showAvailability && (
                            <div className="space-y-2">
                                {Object.entries(cleaner.availability).map(([day, hours]) => (
                                    <div
                                        key={day}
                                        className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl"
                                    >
                                        <div className="font-medium text-neutral-900 dark:text-neutral-100">
                                            {dayNames[day] || day}
                                        </div>
                                        <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                                            <ClockIcon className="w-4 h-4" />
                                            {Array.isArray(hours) && hours.length === 2
                                                ? `${hours[0]} - ${hours[1]}`
                                                : 'Niet beschikbaar'
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        Contact
                    </h3>
                    <div className="space-y-3">
                        {cleaner.phoneE164 && (
                            <a
                                href={`tel:${cleaner.phoneE164}`}
                                className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                            >
                                <PhoneIcon className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-green-700 dark:text-green-300">
                  {cleaner.phoneE164}
                </span>
                            </a>
                        )}

                        {cleaner.email && (
                            <a
                                href={`mailto:${cleaner.email}`}
                                className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                            >
                                <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-blue-700 dark:text-blue-300">
                  {cleaner.email}
                </span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}