"use client";

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

export default function SearchHeader({ totalCount, currentCity, cities, onCityChange }: Props) {
    return (
        <div className="text-center">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Vind jouw perfecte <span className="text-primary-600">schoonmaker</span>
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    Betrouwbare en gescreende schoonmakers in heel Marokko. Filter op stad, services, en meer.
                </p>
            </div>

            {/* Quick City Filter */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Filter op stad
                        </label>
                        <select
                            value={currentCity}
                            onChange={(e) => onCityChange(e.target.value)}
                            className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        >
                            <option value="">🌍 Alle steden ({totalCount} schoonmakers)</option>
                            {cities.map((city) => (
                                <option key={city.slug} value={city.slug}>
                                    📍 {city.name} ({city.cleanerCount} schoonmakers)
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Popular Cities */}
                <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Populaire steden:</p>
                    <div className="flex flex-wrap gap-2">
                        {cities.slice(0, 6).map((city) => (
                            <button
                                key={city.slug}
                                onClick={() => onCityChange(city.slug)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                    currentCity === city.slug
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                                }`}
                            >
                                {city.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}