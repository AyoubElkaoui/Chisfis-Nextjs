"use client";

import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface City {
    id: number;
    name: string;
    slug: string;
    cleanerCount: number;
}

interface Props {
    totalCount: number;
    currentCity: string;
    cities: City[];
    onCityChange: (city: string) => void;
}

export default function SearchHeader({
                                         totalCount,
                                         currentCity,
                                         cities,
                                         onCityChange
                                     }: Props) {
    const selectedCity = cities.find(city => city.slug === currentCity);

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">

            {/* Title */}
            <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Schoonmakers in Marokko
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    {totalCount} professionele schoonmakers beschikbaar
                    {selectedCity && ` in ${selectedCity.name}`}
                </p>
            </div>

            {/* Search Form */}
            <div className="flex flex-col sm:flex-row gap-4">

                {/* City Selector */}
                <div className="flex-1">
                    <div className="relative">
                        <MapPinIcon className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <select
                            value={currentCity}
                            onChange={(e) => onCityChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="">Alle steden</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.slug}>
                                    {city.name} ({city.cleanerCount} schoonmakers)
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Gescreend</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>24/7 Support</span>
                    </div>
                </div>
            </div>

            {/* Active City Info */}
            {selectedCity && (
                <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-primary-900 dark:text-primary-100">
                                {selectedCity.name}
                            </h3>
                            <p className="text-sm text-primary-700 dark:text-primary-300">
                                {selectedCity.cleanerCount} beschikbare schoonmakers
                            </p>
                        </div>
                        <button
                            onClick={() => onCityChange('')}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                            Alle steden tonen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}