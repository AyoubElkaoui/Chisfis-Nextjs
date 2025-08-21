import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const cities = [
    { name: "Casablanca", slug: "casablanca" },
    { name: "Rabat", slug: "rabat" },
    { name: "Marrakesh", slug: "marrakesh" },
    { name: "Tangier", slug: "tangier" },
    { name: "Fes", slug: "fes" },
    { name: "Agadir", slug: "agadir" },
    { name: "Tetouan", slug: "tetouan" },
    { name: "Oujda", slug: "oujda" },
    { name: "Kenitra", slug: "kenitra" },
    { name: "Safi", slug: "safi" },
] as const;

// Helpers
const S = (arr: string[]): Prisma.JsonArray => arr as unknown as Prisma.JsonArray;

async function upsertCities() {
    for (const c of cities) {
        await prisma.city.upsert({
            where: { slug: c.slug },
            update: {},
            create: c,
        });
    }
}

async function cityId(slug: string) {
    const c = await prisma.city.findUnique({ where: { slug } });
    if (!c) throw new Error(`City not found for slug: ${slug}`);
    return c.id;
}

async function upsertCleaners() {
    const data = [
        // Casablanca (3)
        {
            name: "Amal Cleaning",
            slug: "amal-cleaning",
            citySlug: "casablanca",
            phoneE164: "+212612345678",
            bio: "Betrouwbare schoonmaak in Casablanca, gespecialiseerd in vakantiehuizen.",
            photoUrl: "/images/cleaners/amal.jpg",
            services: S(["diepreiniging", "ramen", "keuken", "badkamer"]),
            pricePerHour: 90,
            isActive: true,
        },
        {
            name: "Casa Shine",
            slug: "casa-shine",
            citySlug: "casablanca",
            phoneE164: "+212661112233",
            bio: "Grondige reiniging, flexibele planning ook in het weekend.",
            photoUrl: "/images/cleaners/casashine.jpg",
            services: S(["algemeen", "keuken", "badkamer"]),
            pricePerHour: 85,
            isActive: true,
        },
        {
            name: "Ocean Breeze Services",
            slug: "ocean-breeze-services",
            citySlug: "casablanca",
            phoneE164: "+212665550001",
            bio: "Vakantieverhuur-omloop: check-in schoonmaak, linnen en oplevering.",
            photoUrl: "/images/cleaners/oceanbreeze.jpg",
            services: S(["wisselschoonmaak", "ramen", "stofzuigen", "dweilen"]),
            pricePerHour: 95,
            isActive: true,
        },

        // Rabat (2)
        {
            name: "Rabat Clean Team",
            slug: "rabat-clean-team",
            citySlug: "rabat",
            phoneE164: "+212677889900",
            bio: "Team met oog voor detail, geschikt voor grotere woningen.",
            photoUrl: "/images/cleaners/rabatclean.jpg",
            services: S(["algemeen", "diepreiniging", "ramen"]),
            pricePerHour: 85,
            isActive: true,
        },
        {
            name: "Al Yaqin Services",
            slug: "al-yaqin-services",
            citySlug: "rabat",
            phoneE164: "+212612340987",
            bio: "Milieuvriendelijke schoonmaakmiddelen op verzoek.",
            photoUrl: "/images/cleaners/alyaqin.jpg",
            services: S(["algemeen", "keuken", "badkamer", "eco"]),
            pricePerHour: 88,
            isActive: true,
        },

        // Marrakesh (3)
        {
            name: "Marrakesh Sparkle",
            slug: "marrakesh-sparkle",
            citySlug: "marrakesh",
            phoneE164: "+212670000321",
            bio: "Riad-ervaring: ervaring met traditionele huizen en patio’s.",
            photoUrl: "/images/cleaners/mksparkle.jpg",
            services: S(["algemeen", "ramen", "patio", "keuken"]),
            pricePerHour: 100,
            isActive: true,
        },
        {
            name: "Atlas Maid Co.",
            slug: "atlas-maid-co",
            citySlug: "marrakesh",
            phoneE164: "+212666777888",
            bio: "Snelle response, ook last-minute aanvragen mogelijk.",
            photoUrl: "/images/cleaners/atlasmaid.jpg",
            services: S(["algemeen", "diepreiniging"]),
            pricePerHour: 95,
            isActive: true,
        },
        {
            name: "Red City Cleaners",
            slug: "red-city-cleaners",
            citySlug: "marrakesh",
            phoneE164: "+212612229999",
            bio: "Wisselschoonmaak voor vakantieverhuur (Airbnb/Booking).",
            photoUrl: "/images/cleaners/redcity.jpg",
            services: S(["wisselschoonmaak", "linnen", "keuken", "badkamer"]),
            pricePerHour: 105,
            isActive: true,
        },

        // Tangier (2)
        {
            name: "Tangier Tidy",
            slug: "tangier-tidy",
            citySlug: "tangier",
            phoneE164: "+212633445566",
            bio: "Focus op appartementen nabij de kust.",
            photoUrl: "/images/cleaners/tangtiddy.jpg",
            services: S(["algemeen", "ramen", "zoutnevel-reiniging"]),
            pricePerHour: 85,
            isActive: true,
        },
        {
            name: "Nord Clean",
            slug: "nord-clean",
            citySlug: "tangier",
            phoneE164: "+212622110000",
            bio: "Betrouwbaar team met vaste planning.",
            photoUrl: "/images/cleaners/nordclean.jpg",
            services: S(["algemeen", "diepreiniging"]),
            pricePerHour: 80,
            isActive: true,
        },

        // Fes (2)
        {
            name: "Fes Medina Care",
            slug: "fes-medina-care",
            citySlug: "fes",
            phoneE164: "+212655009911",
            bio: "Ervaring in historische medina-woningen.",
            photoUrl: "/images/cleaners/fesmedina.jpg",
            services: S(["algemeen", "ramen", "keuken"]),
            pricePerHour: 88,
            isActive: true,
        },
        {
            name: "Zellij Cleaners",
            slug: "zellij-cleaners",
            citySlug: "fes",
            phoneE164: "+212600112233",
            bio: "Extra zorgvuldig met zellige/tegels en houtwerk.",
            photoUrl: "/images/cleaners/zellij.jpg",
            services: S(["diepreiniging", "badkamer", "hout"]),
            pricePerHour: 92,
            isActive: true,
        },

        // Agadir (2)
        {
            name: "Agadir HomeCare",
            slug: "agadir-homecare",
            citySlug: "agadir",
            phoneE164: "+212644556677",
            bio: "Vakantiewoningen regio Agadir & Taghazout.",
            photoUrl: "/images/cleaners/agadirhomecare.jpg",
            services: S(["algemeen", "wisselschoonmaak", "ramen"]),
            pricePerHour: 85,
            isActive: true,
        },
        {
            name: "Surf & Shine",
            slug: "surf-and-shine",
            citySlug: "agadir",
            phoneE164: "+212688001122",
            bio: "Snelle resets tussen surf-sessies en verhuur.",
            photoUrl: "/images/cleaners/surfshine.jpg",
            services: S(["algemeen", "keuken", "badkamer"]),
            pricePerHour: 82,
            isActive: true,
        },

        // Kenitra (2)
        {
            name: "Kenitra Clean Hub",
            slug: "kenitra-clean-hub",
            citySlug: "kenitra",
            phoneE164: "+212699887766",
            bio: "Betrouwbaar voor langere verblijven.",
            photoUrl: "/images/cleaners/kenitrahub.jpg",
            services: S(["algemeen", "diepreiniging"]),
            pricePerHour: 78,
            isActive: true,
        },
        {
            name: "Widad Services",
            slug: "widad-services",
            citySlug: "kenitra",
            phoneE164: "+212655443322",
            bio: "Familiebedrijf met focus op service.",
            photoUrl: "/images/cleaners/widad.jpg",
            services: S(["algemeen", "ramen"]),
            pricePerHour: 75,
            isActive: true,
        },

        // Oujda (1)
        {
            name: "Orient Clean Oujda",
            slug: "orient-clean-oujda",
            citySlug: "oujda",
            phoneE164: "+212677001122",
            bio: "Beschikbaar in Oujda en omgeving.",
            photoUrl: "/images/cleaners/orientoujda.jpg",
            services: S(["algemeen", "keuken", "badkamer"]),
            pricePerHour: 70,
            isActive: true,
        },

        // Tetouan (1)
        {
            name: "Tetouan Fresh Start",
            slug: "tetouan-fresh-start",
            citySlug: "tetouan",
            phoneE164: "+212688778899",
            bio: "Appartementen en kleine villa’s.",
            photoUrl: "/images/cleaners/tetouanfresh.jpg",
            services: S(["algemeen", "ramen"]),
            pricePerHour: 76,
            isActive: true,
        },

        // Safi (1)
        {
            name: "Safi CleanWorks",
            slug: "safi-cleanworks",
            citySlug: "safi",
            phoneE164: "+212633221100",
            bio: "Snel en netjes, ideale omloop tussen verblijven.",
            photoUrl: "/images/cleaners/saficleanworks.jpg",
            services: S(["algemeen", "wisselschoonmaak"]),
            pricePerHour: 74,
            isActive: true,
        },
    ] as const;

    for (const c of data) {
        const cId = await cityId(c.citySlug);
        await prisma.cleaner.upsert({
            where: { slug: c.slug },
            update: {
                // Als je later velden wil bijwerken bij her-run:
                phoneE164: c.phoneE164,
                bio: c.bio,
                photoUrl: c.photoUrl,
                services: c.services,
                pricePerHour: c.pricePerHour,
                isActive: c.isActive,
                cityId: cId,
            },
            create: {
                name: c.name,
                slug: c.slug,
                phoneE164: c.phoneE164,
                bio: c.bio,
                photoUrl: c.photoUrl,
                services: c.services,
                pricePerHour: c.pricePerHour,
                isActive: c.isActive,
                cityId: cId,
            },
        });
    }
}

async function seedBookingRequests() {
    // Pak een paar referenties
    const casa = await prisma.city.findUnique({ where: { slug: "casablanca" } });
    const rb = await prisma.city.findUnique({ where: { slug: "rabat" } });
    const mk = await prisma.city.findUnique({ where: { slug: "marrakesh" } });

    const amal = await prisma.cleaner.findUnique({ where: { slug: "amal-cleaning" } });
    const sparkle = await prisma.cleaner.findUnique({ where: { slug: "marrakesh-sparkle" } });

    // Vandaag + offsets
    const today = new Date();
    const plusDays = (n: number) => {
        const d = new Date(today);
        d.setDate(d.getDate() + n);
        d.setHours(12, 0, 0, 0);
        return d;
    };

    const requests = [
        {
            fullName: "Youssef Benali",
            phoneE164: "+31612345678",
            preferredDate: plusDays(7),
            cityId: casa?.id!,
            cleanerId: amal?.id, // voorkeur
            message: "Vakantiehuis vlakbij de corniche, wisselschoonmaak + ramen.",
        },
        {
            fullName: "S. El Amrani",
            phoneE164: "+32477111222",
            preferredDate: plusDays(3),
            cityId: rb?.id!,
            cleanerId: null,
            message: "Appartement 2 slk, graag een grondige schoonmaak na lange periode.",
        },
        {
            fullName: "Anissa A.",
            phoneE164: "+33666000011",
            preferredDate: plusDays(10),
            cityId: mk?.id!,
            cleanerId: sparkle?.id, // voorkeur
            message: "Riad in medina, graag patio en badkamers extra aandacht.",
        },
    ];

    for (const r of requests) {
        await prisma.bookingRequest.create({ data: r });
    }
}

async function main() {
    console.log("Seeding cities…");
    await upsertCities();
    console.log("Seeding cleaners…");
    await upsertCleaners();
    console.log("Seeding booking requests…");
    await seedBookingRequests();
    console.log("✅ Seed completed");
}

main()
    .catch(async (e) => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
