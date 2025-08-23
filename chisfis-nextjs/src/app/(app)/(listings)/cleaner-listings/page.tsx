
import { Suspense } from 'react';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import CleanerListings from '@/components/listings/CleanerListings';

export const metadata: Metadata = {
    title: 'Schoonmakers in Marokko - Vind de Perfecte Cleaner | CleanMorocco',
    description: 'Blader door honderden gescreende schoonmakers in alle Marokkaanse steden. Filter op prijs, services, talen en beschikbaarheid.',
    keywords: 'schoonmaker zoeken, cleaning service marokko, huishoudelijke hulp, marrakech casablanca rabat agadir',
};

// Server-side data fetching
async function getListingsData(searchParams: { [key: string]: string | undefined }) {
    try {
        const { city, service, minPrice, maxPrice, rating } = searchParams;

        // Build where clause
        const where: any = {
            isActive: true
        };

        if (city) {
            where.city = { slug: city };
        }

        if (service) {
            where.services = {
                contains: service
            };
        }

        if (minPrice || maxPrice) {
            where.pricePerHour = {};
            if (minPrice) where.pricePerHour.gte = parseInt(minPrice);
            if (maxPrice) where.pricePerHour.lte = parseInt(maxPrice);
        }

        if (rating) {
            where.rating = {
                gte: parseFloat(rating)
            };
        }

        const [cleaners, cities] = await Promise.all([
            prisma.cleaner.findMany({
                where,
                include: {
                    city: true,
                    reviews: {
                        take: 3,
                        orderBy: { createdAt: 'desc' },
                        include: { user: true }
                    }
                },
                orderBy: [
                    { isVerified: 'desc' },
                    { rating: 'desc' },
                    { reviewCount: 'desc' }
                ]
            }),

            prisma.city.findMany({
                where: {
                    cleaners: {
                        some: { isActive: true }
                    }
                },
                include: {
                    _count: {
                        select: {
                            cleaners: {
                                where: { isActive: true }
                            }
                        }
                    }
                },
                orderBy: { name: 'asc' }
            })
        ]);

        // Transform cleaner data
        const cleanersData = cleaners.map(c => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            city: {
                name: c.city.name,
                slug: c.city.slug
            },
            bio: c.bio,
            pricePerHour: c.pricePerHour,
            photoUrl: c.photoUrl ?? "/images/cleaners/default.jpg",
            phoneE164: c.phoneE164,
            services: c.services ? JSON.parse(c.services) : [],
            languages: c.languages ? JSON.parse(c.languages) : [],
            rating: c.rating,
            reviewCount: c.reviewCount || 0,
            isVerified: c.isVerified || false,
            availability: c.availability ? JSON.parse(c.availability) : {},
            reviews: c.reviews.map(r => ({
                id: r.id,
                rating: r.rating,
                comment: r.comment,
                createdAt: r.createdAt,
                user: {
                    name: r.user.name
                }
            }))
        }));

        // Transform cities data
        const citiesData = cities.map(city => ({
            id: city.id,
            name: city.name,
            slug: city.slug,
            cleanerCount: city._count.cleaners
        }));

        return {
            cleaners: cleanersData,
            cities: citiesData,
            totalCount: cleaners.length
        };

    } catch (error) {
        console.error('Error fetching listings data:', error);
        return {
            cleaners: [],
            cities: [],
            totalCount: 0
        };
    }
}

interface Props {
    searchParams: { [key: string]: string | undefined };
}

export default async function CleanerListingsPage({ searchParams }: Props) {
    const data = await getListingsData(searchParams);

    return (
        // WIJZIGING: Van "container py-8" naar "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Suspense fallback={
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-neutral-600">Schoonmakers laden...</p>
                </div>
            }>
                <CleanerListings
                    initialData={data}
                    searchParams={searchParams}
                />
            </Suspense>
        </div>
    );
}