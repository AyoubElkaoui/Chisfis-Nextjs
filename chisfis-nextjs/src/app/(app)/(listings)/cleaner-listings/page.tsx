import { prisma } from "@/lib/prisma";
import CardAuthorBox from "@/components/CardAuthorBox";

export const metadata = {
    title: "Schoonmakers | Chisfis",
    description: "Vind een schoonmaker in Marokko en boek direct een aanvraag.",
};


function CleanerCard({ cleaner }: { cleaner: any }) {
    const author = {
        displayName: cleaner.name,
        handle: `../cleaner-listings/${cleaner.slug}`,
        avatarUrl: cleaner.photoUrl ?? "/images/cleaners/placeholder.jpg",
        jobName: [
            cleaner.city?.name ?? "",
            typeof cleaner.pricePerHour === "number" ? `${cleaner.pricePerHour} MAD/uur` : ""
        ].filter(Boolean).join(" · "),
        starRating: cleaner.rating ?? undefined, // laat de 4.9 chip zien als beschikbaar
    };
    return <CardAuthorBox author={author} />;
}


export default async function Page({ searchParams }: { searchParams?: { city?: string } }) {
    const citySlug = searchParams?.city || "";

    const [cities, cleaners] = await Promise.all([
        prisma.city.findMany({ orderBy: { name: "asc" } }),
        prisma.cleaner.findMany({
            where: citySlug ? { isActive: true, city: { slug: citySlug } } : { isActive: true },
            include: { city: true },
            orderBy: { name: "asc" },
        }),
    ]);

    return (
        <div className="container pb-24 pt-10">
            <h1 className="text-2xl font-semibold mb-6">Schoonmakers</h1>

            <form className="flex gap-3 mb-6">
                <select name="city" defaultValue={citySlug} className="nc-input rounded-xl border px-3 py-2">
                    <option value="">Alle steden</option>
                    {cities.map((c) => (
                        <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                </select>
                <button className="nc-Button rounded-xl px-4 border" type="submit">Filter</button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {cleaners.map((c) => <CleanerCard key={c.id} cleaner={c} />)}
            </div>
        </div>
    );
}
