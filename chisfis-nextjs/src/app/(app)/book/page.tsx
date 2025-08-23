
import { Metadata } from 'next';
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import BookForm from '@/components/booking/BookForm';
import BookingSteps from '@/components/booking/BookingSteps';

export const metadata: Metadata = {
    title: 'Boek een Schoonmaker | CleanMorocco',
    description: 'Boek eenvoudig een professionele schoonmaker in Marokko. Vul het formulier in en we nemen binnen 2 uur contact op.',
    keywords: 'schoonmaker boeken, booking morocco, cleaning service reserveren',
};

async function getCitiesData() {
    try {
        const cities = await prisma.city.findMany({
            where: {
                cleaners: {
                    some: { isActive: true }
                }
            },
            select: {
                id: true,
                name: true,
                slug: true,
                _count: {
                    select: {
                        cleaners: {
                            where: { isActive: true }
                        }
                    }
                }
            },
            orderBy: { name: 'asc' }
        });

        return cities.map(city => ({
            id: city.id,
            name: city.name,
            slug: city.slug,
            cleanerCount: city._count.cleaners
        }));
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
}

export default async function BookPage() {
    const cities = await getCitiesData();

    return (
        <div className="container py-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                        Boek jouw <span className="text-primary-600">schoonmaker</span>
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                        Vul onderstaand formulier in en we brengen je binnen 2 uur in contact met de perfecte schoonmaker.
                    </p>
                </div>

                {/* Steps */}
                <div className="mb-12">
                    <BookingSteps />
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <Suspense fallback={
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8 animate-pulse">
                                <div className="space-y-6">
                                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                                    <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                                    <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                                    <div className="h-20 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                                </div>
                            </div>
                        }>
                            <BookForm cities={cities} />
                        </Suspense>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 space-y-6">

                            {/* Trust & Safety */}
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                                    ✅ Veilig & Betrouwbaar
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-600 mt-0.5">🔒</span>
                                        <span className="text-neutral-600 dark:text-neutral-400">
                      Alle schoonmakers zijn gescreend en geverifieerd
                    </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-blue-600 mt-0.5">💬</span>
                                        <span className="text-neutral-600 dark:text-neutral-400">
                      Direct contact, geen tussenpersonen
                    </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-purple-600 mt-0.5">⏱️</span>
                                        <span className="text-neutral-600 dark:text-neutral-400">
                      Gemiddelde responstijd: 2 uur
                    </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-orange-600 mt-0.5">📞</span>
                                        <span className="text-neutral-600 dark:text-neutral-400">
                      24/7 klantenservice beschikbaar
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Process */}
                            <div className="bg-primary-50 dark:bg-primary-900/30 rounded-2xl p-6">
                                <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-4">
                                    🚀 Zo werkt het
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                        <span className="text-primary-800 dark:text-primary-200">
                      Formulier invullen (2 minuten)
                    </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                        <span className="text-primary-800 dark:text-primary-200">
                      Wij zoeken de perfecte match
                    </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                        <span className="text-primary-800 dark:text-primary-200">
                      Direct contact binnen 2 uur
                    </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                                        <span className="text-primary-800 dark:text-primary-200">
                      Planning en uitvoering
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Support */}
                            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 text-center">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                                    Hulp nodig?
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                    Ons team staat klaar om je te helpen.
                                </p>
                                <div className="space-y-2">
                                    <a
                                        href="tel:+31201234567"
                                        className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                    >
                                        📞 Bel ons nu
                                    </a>
                                    <a
                                        href="mailto:support@cleanmorocco.com"
                                        className="block border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        ✉️ E-mail ons
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}