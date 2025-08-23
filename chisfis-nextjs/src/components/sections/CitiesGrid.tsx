import Link from 'next/link';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface City {
    id: number;
    name: string;
    slug: string;
    cleaners: any[];
}

interface Props {
    cities: City[];
}

const cityImages: { [key: string]: string } = {
    'marrakech': '/images/cities/marrakech.jpg',
    'casablanca': '/images/cities/casablanca.jpg',
    'rabat': '/images/cities/rabat.jpg',
    'fes': '/images/cities/fes.jpg',
    'tanger': '/images/cities/tanger.jpg',
    'agadir': '/images/cities/agadir.jpg',
};

export default function CitiesGrid({ cities }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
                <Link
                    key={city.id}
                    href={`/cleaner-listings?city=${city.slug}`}
                    className="group block"
                >
                    <div className="relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 aspect-[4/3] group-hover:scale-105 transition-transform duration-300">
                        {/* Background Image */}
                        {cityImages[city.slug] ? (
                            <img
                                src={cityImages[city.slug]}
                                alt={city.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800">
                                <BuildingOfficeIcon className="w-16 h-16 text-primary-600" />
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-xl font-bold mb-2">{city.name}</h3>
                            <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">
                  {city.cleaners.length} schoonmakers beschikbaar
                </span>
                                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Bekijk →
                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}