
"use client";

import { useState } from 'react';
import { AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface City {
    id: number;
    name: string;
    slug: string;
    cleanerCount: number;
}

interface Props {
    cities: City[];
    currentFilters: {
        city: string;
        service: string;
        minPrice: string;
        maxPrice: string;
        rating: string;
    };
    onFiltersChange: (filters: Record<string, string>) => void;
    sortBy: string;
    onSortChange: (sortBy: string) => void;
}

const services = [
    'Basis Schoonmaak',
    'Dieptereiniging',
    'Ramen Wassen',
    'Tuin Onderhoud',
    'Klein Onderhoud',
    'Wasservice'
];

const priceRanges = [
    { label: 'Tot 50 MAD', min: '', max: '50' },
    { label: '50-100 MAD', min: '50', max: '100' },
    { label: '100-150 MAD', min: '100', max: '150' },
    { label: '150+ MAD', min: '150', max: '' }
];

const ratings = [
    { label: '4+ sterren', value: '4' },
    { label: '3+ sterren', value: '3' },
    { label: '2+ sterren', value: '2' },
    { label: 'Alle ratings', value: '' }
];

export default function FilterSidebar({
                                          cities,
                                          currentFilters,
                                          onFiltersChange,
                                          sortBy,
                                          onSortChange
                                      }: Props) {
    const [expandedSections, setExpandedSections] = useState({
        city: true,
        service: true,
        price: true,
        rating: true,
        sort: true
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleFilterChange = (key: string, value: string) => {
        onFiltersChange({ ...currentFilters, [key]: value });
    };

    const handlePriceRangeChange = (min: string, max: string) => {
        onFiltersChange({
            ...currentFilters,
            minPrice: min,
            maxPrice: max
        });
    };

    const clearAllFilters = () => {
        onFiltersChange({
            city: '',
            service: '',
            minPrice: '',
            maxPrice: '',
            rating: ''
        });
    };

    const hasActiveFilters = Object.values(currentFilters).some(value => value !== '');

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 h-fit sticky top-4">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <AdjustmentsHorizontalIcon className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        Filters
                    </h3>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className="space-y-6">

                {/* City Filter */}
                <div>
                    <button
                        onClick={() => toggleSection('city')}
                        className="flex items-center justify-between w-full mb-3"
                    >
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Stad</h4>
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${expandedSections.city ? 'rotate-180' : ''}`} />
                    </button>

                    {expandedSections.city && (
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="city"
                                    value=""
                                    checked={currentFilters.city === ''}
                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Alle steden
                </span>
                            </label>
                            {cities.map((city) => (
                                <label key={city.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="city"
                                        value={city.slug}
                                        checked={currentFilters.city === city.slug}
                                        onChange={(e) => handleFilterChange('city', e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {city.name} ({city.cleanerCount})
                  </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Service Filter */}
                <div>
                    <button
                        onClick={() => toggleSection('service')}
                        className="flex items-center justify-between w-full mb-3"
                    >
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Services</h4>
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${expandedSections.service ? 'rotate-180' : ''}`} />
                    </button>

                    {expandedSections.service && (
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="service"
                                    value=""
                                    checked={currentFilters.service === ''}
                                    onChange={(e) => handleFilterChange('service', e.target.value)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Alle services
                </span>
                            </label>
                            {services.map((service) => (
                                <label key={service} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="service"
                                        value={service}
                                        checked={currentFilters.service === service}
                                        onChange={(e) => handleFilterChange('service', e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {service}
                  </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Filter */}
                <div>
                    <button
                        onClick={() => toggleSection('price')}
                        className="flex items-center justify-between w-full mb-3"
                    >
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Prijs per Uur</h4>
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
                    </button>

                    {expandedSections.price && (
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="price"
                                    checked={!currentFilters.minPrice && !currentFilters.maxPrice}
                                    onChange={() => handlePriceRangeChange('', '')}
                                    className="mr-2"
                                />
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Alle prijzen
                </span>
                            </label>
                            {priceRanges.map((range) => (
                                <label key={range.label} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="price"
                                        checked={currentFilters.minPrice === range.min && currentFilters.maxPrice === range.max}
                                        onChange={() => handlePriceRangeChange(range.min, range.max)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {range.label}
                  </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Rating Filter */}
                <div>
                    <button
                        onClick={() => toggleSection('rating')}
                        className="flex items-center justify-between w-full mb-3"
                    >
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Rating</h4>
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`} />
                    </button>

                    {expandedSections.rating && (
                        <div className="space-y-2">
                            {ratings.map((rating) => (
                                <label key={rating.label} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={rating.value}
                                        checked={currentFilters.rating === rating.value}
                                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                                        className="mr-2"
                                    />
                                    <div className="flex items-center gap-2">
                                        {rating.value && (
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            i < parseInt(rating.value)
                                                                ? 'text-yellow-400'
                                                                : 'text-neutral-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {rating.label}
                    </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sort Options */}
                <div>
                    <button
                        onClick={() => toggleSection('sort')}
                        className="flex items-center justify-between w-full mb-3"
                    >
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Sorteren op</h4>
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`} />
                    </button>

                    {expandedSections.sort && (
                        <div className="space-y-2">
                            {[
                                { value: 'rating', label: 'Hoogste Rating' },
                                { value: 'price-low', label: 'Prijs: Laag naar Hoog' },
                                { value: 'price-high', label: 'Prijs: Hoog naar Laag' },
                                { value: 'reviews', label: 'Meeste Reviews' },
                                { value: 'name', label: 'Alfabetisch' }
                            ].map((option) => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value={option.value}
                                        checked={sortBy === option.value}
                                        onChange={(e) => onSortChange(e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {option.label}
                  </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}