import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CleanerProfile from '@/components/cleaner-detail/CleanerProfile';
import CleanerReviews from '@/components/cleaner-detail/CleanerReviews';
import BookingWidget from '@/components/cleaner-detail/BookingWidget';
import SimilarCleaners from '@/components/cleaner-detail/SimilarCleaners';

// Generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const cleaner = await prisma.cleaner.findFirst({
        where: { slug: params.slug, isActive: true },
        include: { city: true }
    });

    if (!cleaner) {
        return {
            title: 'Schoonmaker niet gevonden | CleanMorocco'
        };
    }

    return {
        title: `${cleaner.name} - Professionele Schoonmaker in ${cleaner.city.name} | CleanMorocco`,
        description: cleaner.bio || `Boek ${cleaner.name}, een ervaren schoonmaker in ${cleaner.city.name}. Geverifieerd en betrouwbaar.`,
        keywords: `${cleaner.name}, schoonmaker ${cleaner.city.name}, cleaning service, ${cleaner.city.slug}`,
    };
}

// Generate static params for popular cleaners
export async function generateStaticParams() {
    const cleaners = await prisma.cleaner.findMany({
        where: {
            isActive: true,
            reviewCount: { gte: 10 } // Only generate for popular cleaners
        },
        select: { slug: true },
        take: 20
    });

    return cleaners.map((cleaner) => ({
        slug: cleaner.slug,
    }));
}

async function getCleanerData(slug: string) {
    try {
        const cleaner = await prisma.cleaner.findFirst({
            where: { slug, isActive: true },
            include: {
                city: true,
                reviews: {
                    include: { user: true },
                    orderBy: { createdAt: 'desc' },
                    take: 10
                },
                bookingRequests: {
                    where: { status: 'CONFIRMED' },
                    select: { id: true }
                }
            }
        });

        if (!cleaner) {
            return null;
        }

        // Get similar cleaners
        const similarCleaners = await prisma.cleaner.findMany({
            where: {
                isActive: true,
                cityId: cleaner.cityId,
                id: { not: cleaner.id }
            },
            include: { city: true },
            orderBy: [
                { rating: 'desc' },
                { reviewCount: 'desc' }
            ],
            take: 4
        });

        // Transform data
        const cleanerData = {
            id: cleaner.id,
            slug: cleaner.slug,
            name: cleaner.name,
            email: cleaner.email,
            phoneE164: cleaner.phoneE164,
            bio: cleaner.bio,
            photoUrl: cleaner.photoUrl ?? '/images/cleaners/default.jpg',
            pricePerHour: cleaner.pricePerHour,
            rating: cleaner.rating,
            reviewCount: cleaner.reviewCount || 0,
            isVerified: cleaner.isVerified || false,
            completedJobs: cleaner.bookingRequests.length,
            city: {
                id: cleaner.city.id,
                name: cleaner.city.name,
                slug: cleaner.city.slug,
                region: cleaner.city.region
            },
            services: cleaner.services ? JSON.parse(cleaner.services) : [],
            languages: cleaner.languages ? JSON.parse(cleaner.languages) : [],
            availability: cleaner.availability ? JSON.parse(cleaner.availability) : {},
            reviews: cleaner.reviews.map(review => ({
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                createdAt: review.createdAt,
                user: {
                    name: review.user.name
                }
            }))
        };

        const similarCleanersData = similarCleaners.map(c => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            city: {
                name: c.city.name,
                slug: c.city.slug
            },
            photoUrl: c.photoUrl ?? '/images/cleaners/default.jpg',
            rating: c.rating,
            reviewCount: c.reviewCount || 0,
            pricePerHour: c.pricePerHour,
            isVerified: c.isVerified || false,
            services: c.services ? JSON.parse(c.services) : []
        }));

        return {
            cleaner: cleanerData,
            similarCleaners: similarCleanersData
        };

    } catch (error) {
        console.error('Error fetching cleaner data:', error);
        return null;
    }
}

interface Props {
    params: { slug: string };
}

export default async function CleanerDetailPage({ params }: Props) {
    const data = await getCleanerData(params.slug);

    if (!data) {
        notFound();
    }

    return (
        <div className="container py-8">
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Cleaner Profile */}
                    <CleanerProfile cleaner={data.cleaner} />

                    {/* Reviews */}
                    <CleanerReviews
                        reviews={data.cleaner.reviews}
                        rating={data.cleaner.rating}
                        reviewCount={data.cleaner.reviewCount}
                    />

                    {/* Similar Cleaners */}
                    <SimilarCleaners cleaners={data.similarCleaners} />
                </div>

                {/* Booking Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4">
                        <BookingWidget cleaner={data.cleaner} />
                    </div>
                </div>
            </div>
        </div>
    );
}