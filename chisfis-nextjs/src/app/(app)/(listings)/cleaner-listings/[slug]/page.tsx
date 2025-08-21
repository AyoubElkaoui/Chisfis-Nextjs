import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import GallerySlider from "@/components/GallerySlider";
import LikeSaveBtns from "@/components/LikeSaveBtns";

export default async function Page({ params }: { params: { slug: string } }) {
    const cleaner = await prisma.cleaner.findUnique({
        where: { slug: params.slug },
        include: { city: true },
    });
    if (!cleaner) return notFound();

    const images = [
        cleaner.photoUrl ?? "/images/cleaners/placeholder.jpg",
        "/images/cleaners/placeholder.jpg",
        "/images/cleaners/placeholder.jpg",
    ];

    return (
        <div className="container py-10">
            <div className="flex items-center justify-between">
                <Link href="/cleaner-listings" className="underline">&larr; Terug</Link>
                <LikeSaveBtns className="ml-4" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-6">
                {/* Gallery */}
                <div>
                    <GallerySlider uniqueClass="cleaner-gallery" galleryImgs={images} />

                </div>

                {/* Info */}
                <div>
                    <h1 className="text-2xl font-semibold">{cleaner.name}</h1>
                    <div className="text-neutral-600 mt-1">
                        {cleaner.city?.name}
                        {typeof cleaner.pricePerHour === "number" && (
                            <> · ~{cleaner.pricePerHour} MAD/uur</>
                        )}
                    </div>
                    {typeof cleaner.rating === "number" && (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-sm">
                            <span>{cleaner.rating.toFixed(1)}</span>
                            <span>★</span>
                        </div>
                    )}

                    <p className="mt-4 leading-relaxed">{cleaner.bio}</p>

                    <div className="flex gap-3 mt-6">
                        <Link
                            href={`/book?cleaner=${cleaner.slug}&city=${cleaner.city?.slug ?? ""}`}
                            className="nc-Button px-5 py-2 rounded-xl border"
                        >
                            Boek deze schoonmaker
                        </Link>
                        {!!cleaner.phoneE164 && (
                            <a
                                className="nc-Button px-5 py-2 rounded-xl border"
                                target="_blank"
                                href={`https://wa.me/${cleaner.phoneE164.replace(/\D/g, "")}`}
                            >
                                WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Services als chips (uit JSON) */}
            {Array.isArray(cleaner.services) && (cleaner.services as any[]).length > 0 && (
                <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-3">Diensten</h3>
                    <div className="flex flex-wrap gap-2">
                        {(cleaner.services as any[]).map((s, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm">
                {String(s)}
              </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
