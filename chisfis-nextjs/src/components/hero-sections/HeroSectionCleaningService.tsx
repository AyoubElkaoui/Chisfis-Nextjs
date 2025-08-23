
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonPrimary from '@/shared/ButtonPrimary'; // Fix import
import { MagnifyingGlassIcon, SparklesIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

interface City {
    id: number;
    name: string;
    slug: string;
    region: string | null;
    cleanerCount: number;
}

interface Stats {
    cleanerCount: number;
    cityCount: number;
    avgRating: number;
}

interface Props {
    cities: City[];
    stats: Stats;
}

export default function HeroSectionCleaningService({ cities, stats }: Props) {
    const [selectedCity, setSelectedCity] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (selectedCity) {
            router.push(`/cleaner-listings?city=${selectedCity}`);
        } else {
            router.push('/cleaner-listings');
        }
    };

    return (
        <div className="relative pt-14 pb-20 lg:pt-20 lg:pb-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Content */}
                <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <SparklesIcon className="w-4 h-4" />
                        Nieuw in Marokko
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                        Professionele{' '}
                        <span className="text-primary-600">schoonmaak</span>{' '}
                        voor uw huis in Marokko
                    </h1>

                    <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-6 mb-8">
                        Vind betrouwbare en gescreende schoonmakers in alle grote steden van Marokko.
                        Perfect voor Europeanen met een tweede huis of vakantiehuis.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <ShieldCheckIcon className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-sm font-medium">Gescreend</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <ClockIcon className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium">24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                                <SparklesIcon className="w-4 h-4 text-yellow-600" />
                            </div>
                            <span className="text-sm font-medium">Kwaliteit</span>
                        </div>
                    </div>

                    {/* Zoek formulier */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-700">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                                    Kies uw stad
                                </label>
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-xl bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                                >
                                    <option value="">Alle steden</option>
                                    {cities.map((city) => (
                                        <option key={city.slug} value={city.slug}>
                                            {city.name} ({city.cleanerCount} schoonmakers)
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end">
                                <ButtonPrimary onClick={handleSearch} className="h-fit px-8 py-3 whitespace-nowrap">
                                    <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                                    Zoek nu
                                </ButtonPrimary>
                            </div>
                        </div>

                        <div className="text-xs text-neutral-500 mt-3 text-center">
                            🚀 <strong>{stats.cleanerCount}+ schoonmakers</strong> beschikbaar in <strong>{stats.cityCount} steden</strong>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-12">
                        <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-primary-600">{stats.cleanerCount}+</div>
                            <div className="text-sm text-neutral-500">Schoonmakers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-primary-600">{stats.cityCount}</div>
                            <div className="text-sm text-neutral-500">Steden</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-primary-600">{stats.avgRating}</div>
                            <div className="text-sm text-neutral-500">★ Rating</div>
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="relative">
                    <div className="aspect-[4/3] relative rounded-3xl overflow-hidden">
                        <img
                            src="/images/cleaning-hero.jpg"
                            alt="Professionele schoonmaakservice"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Floating card */}
                    <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl border border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    100% Betrouwbaar
                                </div>
                                <div className="text-sm text-neutral-500">
                                    Gescreende professionals
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust indicators */}
                    <div className="absolute top-6 right-6 flex flex-col gap-2">
                        <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium">
                            ⭐ {stats.avgRating} rating
                        </div>
                        <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium">
                            🔒 100% Veilig
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}