import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || undefined;

    const where = city ? { isActive: true, city: { slug: city } } : { isActive: true };

    const cleaners = await prisma.cleaner.findMany({
        where,
        include: { city: true },
        orderBy: { name: "asc" },
    });

    return NextResponse.json(
        cleaners.map((c) => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            city: c.city.name,
            citySlug: c.city.slug,
            bio: c.bio,
            pricePerHour: c.pricePerHour,
            photoUrl: c.photoUrl ?? "/images/amal.jpg",
            phoneE164: c.phoneE164 ?? null,
            services: c.services ?? [],
        }))
    );
}
