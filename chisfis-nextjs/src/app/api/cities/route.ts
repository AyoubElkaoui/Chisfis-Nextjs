import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🚀 CACHE FOR 1 HOUR (cities change rarely)
export const revalidate = 3600;

export async function GET(req: NextRequest) {
    try {
        const cities = await prisma.city.findMany({
            orderBy: { name: "asc" },
            select: {
                id: true,
                name: true,
                slug: true,
                region: true,
                _count: {
                    select: {
                        cleaners: {
                            where: { isActive: true }
                        }
                    }
                }
            }
        });

        const result = cities.map(city => ({
            id: city.id,
            name: city.name,
            slug: city.slug,
            region: city.region,
            cleanerCount: city._count.cleaners
        }));

        return NextResponse.json(result, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
            }
        });
    } catch (error) {
        console.error('Cities API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
    }
}