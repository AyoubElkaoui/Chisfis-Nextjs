"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CleanerCard from '@/components/cleaner/CleanerCard';
import FilterSidebar from '@/components/cleaner/FilterSidebar';
import SearchHeader from '@/components/cleaner/SearchHeader';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

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

interface City {
    id: number;
    name: string;
    slug: string;
    cleanerCount: number;
}

interface Props {
    initialData: {
        cleaners: Cleaner[];
        cities: City[];
        totalCount: number;
    };
    searchParams: { [key: string]: string | undefined };
}

export default function CleanerListings({ initialData, searchParams }: Props) {
    const router = useRouter();
    const urlSearchParams = useSearchParams();

    const [cleaners, setCleaners] = useState(initialData.cleaners);
    const [isLoading, setIsLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('rating');

    // Current filters from URL
    const currentCity = searchParams.city || '';
    const currentService = searchParams.service || '';
    const currentMinPrice = searchParams.minPrice || '';
    const currentMaxPrice = searchParams.maxPrice || '';
    const currentRating = searchParams.rating || '';

    // Handle filter changes
    const updateFilters = (filters: Record<string, string>) => {
        const params = new URLSearchParams(urlSearchParams);

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        router.push(`/cleaner-listings?${params.toString()}`);
    };

    // Handle sorting
    const handleSort = (newSortBy: string) => {
        setSortBy(newSortBy);

        let sortedCleaners = [...cleaners];

        switch (newSortBy) {
            case 'rating':
                sortedCleaners.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'price-low':
                sortedCleaners.sort((a, b) => (a.pricePerHour || 0) - (b.pricePerHour || 0));
                break;
            case 'price-high':
                sortedCleaners.sort((a, b) => (b.pricePerHour || 0) - (a.pricePerHour || 0));
                break;
            case 'reviews':
                sortedCleaners.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            case 'name':
                sortedCleaners.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        setCleaners(sortedCleaners);
    };

    return (
        <div className="w-full">
            {/* Header */}
            <SearchHeader
                totalCount={initialData.totalCount}
                currentCity={currentCity}
                cities={initialData.cities}
                onCityChange={(city) => updateFilters({ city })}
            />

            {/* WIJZIGING: Gap van 4 naar 8 voor meer ruimte */}
            <div className="flex flex-col lg:flex-row gap-8 mt-8">

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                        <AdjustmentsHorizontalIcon className="w-5 h-5" />
                        Filters & Sortering
                    </button>
                </div>

                {/* WIJZIGING: Sidebar breedte van 80 naar 96 */}
                <div className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-96 flex-shrink-0`}>
                    <FilterSidebar
                        cities={initialData.cities}
                        currentFilters={{
                            city: currentCity,
                            service: currentService,
                            minPrice: currentMinPrice,
                            maxPrice: currentMaxPrice,
                            rating: currentRating
                        }}
                        onFiltersChange={updateFilters}
                        sortBy={sortBy}
                        onSortChange={handleSort}
                    />
                </div>

                {/* Results - WIJZIGING: Min width toegevoegd */}
                <div className="flex-1 min-w-0">

                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {initialData.totalCount} schoonmakers gevonden
                            {currentCity && (
                                <span className="text-neutral-500 text-base font-normal ml-2">
                                    in {initialData.cities.find(c => c.slug === currentCity)?.name}
                                </span>
                            )}
                        </h2>

                        {/* Quick Sort (Desktop) */}
                        <div className="hidden lg:block">
                            <select
                                value={sortBy}
                                onChange={(e) => handleSort(e.target.value)}
                                className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm"
                            >
                                <option value="rating">Hoogste Rating</option>
                                <option value="price-low">Prijs: Laag naar Hoog</option>
                                <option value="price-high">Prijs: Hoog naar Laag</option>
                                <option value="reviews">Meeste Reviews</option>
                                <option value="name">Alfabetisch</option>
                            </select>
                        </div>
                    </div>

                    {/* Cleaner Cards - WIJZIGING: Grid aangepast voor meer ruimte */}
                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-neutral-600">Laden...</p>
                        </div>
                    ) : cleaners.length > 0 ? (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {cleaners.map((cleaner) => (
                                <CleanerCard
                                    key={cleaner.id}
                                    cleaner={cleaner}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <MagnifyingGlassIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                                Geen schoonmakers gevonden
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                                Probeer andere filters of zoek in een andere stad.
                            </p>
                            <button
                                onClick={() => updateFilters({})}
                                className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}