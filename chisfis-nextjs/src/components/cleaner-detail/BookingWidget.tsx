"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDaysIcon, ClockIcon, PhoneIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

interface Cleaner {
    id: number;
    slug: string;
    name: string;
    phoneE164: string | null;
    pricePerHour: number | null;
    rating: number | null;
    reviewCount: number;
    isVerified: boolean;
    city: {
        name: string;
        slug: string;
    };
}

interface Props {
    cleaner: Cleaner;
}

export default function BookingWidget({ cleaner }: Props) {
    const router = useRouter();
    const [selectedHours, setSelectedHours] = useState(4);

    const handleBooking = () => {
        router.push(`/book?cleaner=${cleaner.slug}&city=${cleaner.city.slug}`);
    };

    const calculateTotal = () => {
        if (!cleaner.pricePerHour) return null;
        return cleaner.pricePerHour * selectedHours;
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 sticky top-4">

            {/* Header */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {cleaner.pricePerHour ? `€${cleaner.pricePerHour}` : 'Op aanvraag'}
                    </h3>
                    {cleaner.pricePerHour && (
                        <span className="text-neutral-600 dark:text-neutral-400">/uur</span>
                    )}
                </div>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-4 text-sm">
                    {cleaner.isVerified && (
                        <div className="flex items-center gap-1 text-green-600">
                            <CheckBadgeIcon className="w-4 h-4" />
                            Geverifieerd
                        </div>
                    )}
                    {cleaner.rating && (
                        <div className="flex items-center gap-1 text-yellow-600">
                            <span>⭐</span>
                            {cleaner.rating.toFixed(1)} ({cleaner.reviewCount})
                        </div>
                    )}
                </div>
            </div>

            {/* Quick calculation */}
            {cleaner.pricePerHour && (
                <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Geschatte duur
                        </label>
                        <select
                            value={selectedHours}
                            onChange={(e) => setSelectedHours(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                        >
                            <option value={2}>2 uur - Basis schoonmaak</option>
                            <option value={3}>3 uur - Uitgebreide schoonmaak</option>
                            <option value={4}>4 uur - Grondige schoonmaak</option>
                            <option value={6}>6 uur - Complete schoonmaak</option>
                            <option value={8}>8 uur - Volledige dag</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between text-lg font-semibold">
                        <span className="text-neutral-900 dark:text-neutral-100">Totaal:</span>
                        <span className="text-primary-600">
              €{calculateTotal()}
            </span>
                    </div>

                    <p className="text-xs text-neutral-500 mt-2">
                        * Dit is een schatting. Exacte prijs wordt afgestemd tijdens contact.
                    </p>
                </div>
            )}

            {/* Action buttons */}
            <div className="space-y-3">

                {/* Primary booking button */}
                <button
                    onClick={handleBooking}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <CalendarDaysIcon className="w-5 h-5" />
                    Boek Direct
                </button>

                {/* Contact buttons */}
                <div className="grid grid-cols-2 gap-3">
                    {cleaner.phoneE164 && (
                        <a
                            href={`tel:${cleaner.phoneE164}`}
                            className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                        >
                            <PhoneIcon className="w-4 h-4" />
                            Bellen
                        </a>
                    )}

                    <button
                        onClick={() => router.push(`/book?cleaner=${cleaner.slug}&city=${cleaner.city.slug}&contact=true`)}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                        <ChatBubbleLeftIcon className="w-4 h-4" />
                        Bericht
                    </button>
                </div>
            </div>

            {/* Features */}
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                    Waarom {cleaner.name}?
                </h4>

                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-neutral-600 dark:text-neutral-400">
              Snelle respons (meestal binnen 2 uur)
            </span>
                    </div>

                    {cleaner.isVerified && (
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="text-neutral-600 dark:text-neutral-400">
                Geverifieerd en gescreend
              </span>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-neutral-600 dark:text-neutral-400">
              Lokaal in {cleaner.city.name}
            </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-neutral-600 dark:text-neutral-400">
              Flexibele planning mogelijk
            </span>
                    </div>
                </div>
            </div>

            {/* Availability hint */}
            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                    <ClockIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Beschikbaarheid
          </span>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                    Meestal beschikbaar binnen 24-48 uur. Exacte tijden worden afgestemd na boeking.
                </p>
            </div>

            {/* Trust & Safety */}
            <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                        <span className="text-green-600">🔒</span>
                        Veilig & Betrouwbaar
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                        Alle schoonmakers zijn gescreend. Betaling direct aan de schoonmaker.
                        24/7 klantenservice beschikbaar.
                    </p>
                </div>
            </div>
        </div>
    );
}