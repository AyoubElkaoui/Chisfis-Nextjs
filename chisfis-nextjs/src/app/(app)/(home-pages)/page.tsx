import { Suspense } from 'react';
import { Metadata } from 'next';
import { prisma } from "@/lib/prisma";
import HeroSectionCleaningService from '@/components/hero-sections/HeroSectionCleaningService';
import FeaturedCleaners from '@/components/sections/FeaturedCleaners';
import HowItWorks from '@/components/sections/HowItWorks';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CitiesOverview from '@/components/sections/CitiesOverview';
import FinalCallToAction from '@/components/sections/FinalCallToAction';

export const metadata: Metadata = {
  title: 'CleanMorocco - Professionele Schoonmaakdiensten in Marokko',
  description: 'Vind betrouwbare en gescreende schoonmakers in alle grote steden van Marokko. Perfect voor expats en vakantiehuizen. Boek direct online.',
  keywords: 'schoonmaker marokko, cleaning service morocco, huishoudelijke hulp, marrakech casablanca rabat',
};

// Server-side data fetching
async function getHomepageData() {
  try {
    const [featuredCleaners, cities, stats] = await Promise.all([
      // Top 6 featured cleaners
      prisma.cleaner.findMany({
        where: {
          isActive: true,
          isVerified: true
        },
        include: { city: true },
        orderBy: [
          { rating: 'desc' },
          { reviewCount: 'desc' }
        ],
        take: 6
      }),

      // Cities with cleaner count
      prisma.city.findMany({
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          slug: true,
          region: true,
          _count: {
            select: {
              cleaners: { where: { isActive: true } }
            }
          }
        }
      }),

      // Stats for hero section
      prisma.$transaction([
        prisma.cleaner.count({ where: { isActive: true } }),
        prisma.city.count(),
        prisma.cleaner.aggregate({
          where: {
            isActive: true,
            rating: { not: null }
          },
          _avg: { rating: true }
        })
      ])
    ]);

    // Transform data
    const cleanersData = featuredCleaners.map((c) => ({
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
      phoneE164: c.phoneE164 ?? null,
      services: c.services ? JSON.parse(c.services) : [],
      languages: c.languages ? JSON.parse(c.languages) : [],
      rating: c.rating,
      reviewCount: c.reviewCount || 0,
      isVerified: c.isVerified || false
    }));

    const citiesData = cities.map(city => ({
      id: city.id,
      name: city.name,
      slug: city.slug,
      region: city.region,
      cleanerCount: city._count.cleaners
    }));

    const [cleanerCount, cityCount, avgRating] = stats;

    return {
      featuredCleaners: cleanersData,
      cities: citiesData,
      stats: {
        cleanerCount,
        cityCount,
        avgRating: avgRating._avg.rating ? Number(avgRating._avg.rating.toFixed(1)) : 4.9
      }
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      featuredCleaners: [],
      cities: [],
      stats: {
        cleanerCount: 0,
        cityCount: 0,
        avgRating: 4.9
      }
    };
  }
}

export default async function HomePage() {
  const data = await getHomepageData();

  return (
      <div className="overflow-hidden">
        {/* Hero Section */}
        <section className="container py-16 lg:py-20">
          <HeroSectionCleaningService
              cities={data.cities}
              stats={data.stats}
          />
        </section>

        {/* Featured Cleaners */}
        <section className="py-16 lg:py-20 bg-neutral-100/60 dark:bg-neutral-800/20">
          <div className="container">
            <FeaturedCleaners cleaners={data.featuredCleaners} />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <HowItWorks />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 lg:py-20 bg-neutral-100/60 dark:bg-neutral-800/20">
          <div className="container">
            <TestimonialsSection />
          </div>
        </section>

        {/* Cities Overview */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <CitiesOverview cities={data.cities} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-20 bg-primary-600">
          <div className="container">
            <FinalCallToAction />
          </div>
        </section>
      </div>
  );
}