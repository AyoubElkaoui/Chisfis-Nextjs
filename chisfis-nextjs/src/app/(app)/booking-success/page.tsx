
import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { ClockIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Aanvraag Verstuurd | CleanMorocco',
    description: 'Je aanvraag is succesvol verstuurd. We nemen binnen 2 uur contact met je op.',
};

interface Props {
    searchParams: { id?: string };
}

function SuccessContent({ bookingId }: { bookingId?: string }) {
    return (
        <div className="container py-12">
            <div className="max-w-2xl mx-auto text-center">

                {/* Success Icon */}
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircleIcon className="w-12 h-12 text-green-600" />
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Aanvraag Succesvol Verstuurd! 🎉
                </h1>

                {/* Booking ID */}
                {bookingId && (
                    <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 mb-6">
                        <p className="text-primary-900 dark:text-primary-100 font-medium">
                            Jouw aanvraag ID: <span className="font-mono">#{bookingId}</span>
                        </p>
                    </div>
                )}

                {/* Description */}
                <div className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 space-y-2">
                    <p>
                        Geweldig! We hebben je aanvraag ontvangen en ons team gaat direct aan de slag.
                    </p>
                    <p>
                        Je hoort <strong>binnen 2 uur</strong> van ons met een perfecte schoonmaker match.
                    </p>
                </div>

                {/* Next Steps */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                        Wat gebeurt er nu?
                    </h2>

                    <div className="grid gap-4">
                        <div className="flex items-start gap-4 text-left">
                            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-primary-600">1</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                                    Ontvangstbevestiging
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    Je ontvangt nu een bevestigingsmail met alle details.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 text-left">
                            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-primary-600">2</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                                    Schoonmaker Matching
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    We zoeken de perfecte schoonmaker gebaseerd op je wensen en locatie.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 text-left">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <ClockIcon className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                                    Contact binnen 2 uur
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    We bellen of appen je om de schoonmaker voor te stellen en details af te stemmen.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 text-left">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <ChatBubbleLeftIcon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                                    Direct Contact
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    Je krijgt direct contact met de schoonmaker om alles te bespreken.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-2xl p-6 mb-8">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        Vragen of wijzigingen?
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+31201234567"
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
                        >
                            <PhoneIcon className="w-5 h-5" />
                            Bel ons direct
                        </a>
                        <a
                            href="mailto:support@cleanmorocco.com"
                            className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-600 px-6 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors text-neutral-700 dark:text-neutral-300"
                        >
                            <EnvelopeIcon className="w-5 h-5" />
                            Email ons
                        </a>
                    </div>
                </div>

                {/* Back to Home */}
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                        ← Terug naar homepagina
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function BookingSuccessPage({ searchParams }: Props) {
    return (
        <Suspense fallback={
            <div className="container py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="animate-pulse space-y-6">
                        <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-700 rounded-full mx-auto"></div>
                        <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    </div>
                </div>
            </div>
        }>
            <SuccessContent bookingId={searchParams.id} />
        </Suspense>
    );
}