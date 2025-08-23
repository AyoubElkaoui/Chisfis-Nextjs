"use client";

import Link from 'next/link';
import { MapPinIcon, UserGroupIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface City {
    id: number;
    name: string;
    slug: string;
    region: string | null;
    cleanerCount: number;
}

interface Props {
    cities: City[];
}

// Regional grouping
const getRegionInfo = (region: string | null) => {
    const regions: Record<string, { name: string; emoji: string; description: string }> = {
        'Noord': {
            name: 'Noord Marokko',
            emoji: '🏔️',
            description: 'Tanger, Rabat, Fes - Dichtbij Europa'
        },
        'Centrum': {
            name: 'Centrum Marokko',
            emoji: '🏛️',
            description: 'Marrakech, Meknes - Historische steden'
        },
        'West': {
            name: 'West Marokko',
            emoji: '🌊',
            description: 'Casablanca - Economisch centrum'
        },
        'Zuid': {
            name: 'Zuid Marokko',
            emoji: '🏖️',
            description: 'Agadir - Kustplaatsen en resorts'
        },
        'Oost': {
            name: 'Oost Marokko',
            emoji: '⛰️',
            description: 'Oujda - Grens met Algerije'
        }
    };
    return regions[region || ''] || { name: 'Overig', emoji: '📍', description: 'Andere locaties' };
};

// Group cities by region
const groupCitiesByRegion = (cities: City[]) => {
    const grouped: Record<string, City[]> = {};
    cities.forEach(city => {
        const region = city.region || 'Overig';
        if (!grouped[region]) grouped[region] = [];
        grouped[region].push(city);
    });
    return grouped;
};

// Priority order for regions
const REGION_ORDER = ['Noord', 'Centrum', 'West', 'Zuid', 'Oost', 'Overig'];

export default function CitiesOverview({ cities }: Props) {
    const groupedCities = groupCitiesByRegion(cities);
    const totalCleaners = cities.reduce((sum, city) => sum + city.cleanerCount, 0);

    return (
        <div>
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Beschikbaar in <span className="text-primary-600">{cities.length} steden</span>
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    Van Tanger tot Agadir - we hebben betrouwbare schoonmakers in alle grote steden van Marokko.
                    <span className="block mt-2 font-medium text-primary-600">
                        {totalCleaners}+ gescreende professionals klaar om je te helpen.
                    </span>
                </p>
            </div>

            {/* Regions Grid */}
            <div className="space-y-12">
                {REGION_ORDER.map(regionKey => {
                    const regionCities = groupedCities[regionKey];
                    if (!regionCities?.length) return null;

                    const regionInfo = getRegionInfo(regionKey);
                    const regionCleanerCount = regionCities.reduce((sum, city) => sum + city.cleanerCount, 0);

                    return (
                        <div key={regionKey}>
                            {/* Region Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-4xl">{regionInfo.emoji}</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                        {regionInfo.name}
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400">
                                        {regionInfo.description} • {regionCleanerCount} schoonmakers
                                    </p>
                                </div>
                            </div>

                            {/* Cities Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {regionCities.map(city => (
                                    <Link
                                        key={city.id}
                                        href={`/cleaner-listings?city=${city.slug}`}
                                        className="group bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                                                    <MapPinIcon className="w-5 h-5 text-primary-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                                                        {city.name}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                                                        <UserGroupIcon className="w-4 h-4" />
                                                        {city.cleanerCount} schoonmakers
                                                    </div>
                                                </div>
                                            </div>

                                            <ArrowRightIcon className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                        </div>

                                        {/* Preview cleaners if available */}
                                        {city.cleanerCount > 0 && (
                                            <div className="text-xs text-neutral-500">
                                                Vanaf 15 MAD/uur • Beschikbaar 7 dagen per week
                                            </div>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Stats */}
            <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-3xl p-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-bold text-primary-600 mb-2">{cities.length}</div>
                        <div className="text-neutral-600 dark:text-neutral-400">Steden</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary-600 mb-2">{totalCleaners}+</div>
                        <div className="text-neutral-600 dark:text-neutral-400">Schoonmakers</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                        <div className="text-neutral-600 dark:text-neutral-400">Support</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
                        <div className="text-neutral-600 dark:text-neutral-400">Gescreend</div>
                    </div>
                </div>
            </div>
        </div>
    );
}