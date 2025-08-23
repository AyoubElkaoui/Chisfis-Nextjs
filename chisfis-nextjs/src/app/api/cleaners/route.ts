import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🚀 CACHE FOR 10 MINUTES
export const revalidate = 600;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const city = searchParams.get("city") || undefined;

        const where = city ? { isActive: true, city: { slug: city } } : { isActive: true };

        const cleaners = await prisma.cleaner.findMany({
            where,
            include: { city: true },
            orderBy: { name: "asc" },
        });

        const result = cleaners.map((c) => ({
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

        return NextResponse.json(result, {
            headers: {
                'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200'
            }
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch cleaners' }, { status: 500 });
    }
}