"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/shared/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SmartPhoneInput from './PhoneInput';
import { isValidPhoneNumber } from 'react-phone-number-input';

interface City {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    cities: City[];
}

export default function BookForm({ cities }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        phoneE164: '',
        email: '',
        citySlug: searchParams.get('city') || '',
        cleanerSlug: searchParams.get('cleaner') || '',
        preferredDate: '',
        message: ''
    });

    const [phoneError, setPhoneError] = useState('');
    const [cleanerName, setCleanerName] = useState<string>('');

    // Fetch cleaner name if cleanerSlug is provided
    useEffect(() => {
        if (formData.cleanerSlug) {
            fetch(`/api/cleaners`)
                .then(res => res.json())
                .then(cleaners => {
                    const cleaner = cleaners.find((c: any) => c.slug === formData.cleanerSlug);
                    if (cleaner) setCleanerName(cleaner.name);
                })
                .catch(console.error);
        }
    }, [formData.cleanerSlug]);

    // Phone validation
    useEffect(() => {
        if (formData.phoneE164) {
            if (!isValidPhoneNumber(formData.phoneE164)) {
                setPhoneError('Ongeldig telefoonnummer voor het geselecteerde land');
            } else {
                setPhoneError('');
            }
        } else {
            setPhoneError('');
        }
    }, [formData.phoneE164]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Extra validation
        if (!formData.phoneE164 || !isValidPhoneNumber(formData.phoneE164)) {
            setError('Vul een geldig telefoonnummer in');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/booking-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Er is een fout opgetreden');
            }

            // Success!
            setShowSuccess(true);

            // Reset form
            setFormData({
                fullName: '',
                phoneE164: '',
                email: '',
                citySlug: '',
                cleanerSlug: '',
                preferredDate: '',
                message: ''
            });

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Er is een fout opgetreden');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handlePhoneChange = (value: string | undefined) => {
        setFormData(prev => ({
            ...prev,
            phoneE164: value || ''
        }));
    };

    // Success Modal
    if (showSuccess) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                        Aanvraag Verstuurd! ✅
                    </h2>

                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                        Bedankt voor je aanvraag! We nemen binnen 24 uur contact met je op om de details te bespreken.
                        {cleanerName && (
                            <> Je hebt een aanvraag gedaan voor <strong>{cleanerName}</strong>.</>
                        )}
                    </p>

                    <div className="flex gap-4 justify-center">
                        <Button
                            onClick={() => router.push('/cleaner-listings')}
                            color="primary"
                        >
                            Meer Schoonmakers
                        </Button>

                        <Button
                            onClick={() => setShowSuccess(false)}
                            color="light"
                        >
                            Nieuwe Aanvraag
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Boek een Schoonmaker
                    </h1>
                    {cleanerName ? (
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            Aanvraag voor: <span className="font-medium text-primary-600">{cleanerName}</span>
                        </p>
                    ) : (
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Vul het formulier in en we vinden de perfecte schoonmaker voor je
                        </p>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                        <div className="flex items-center gap-3">
                            <XMarkIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                            <p className="text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                                Volledige Naam *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Je voor- en achternaam"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                                Telefoonnummer *
                            </label>
                            <SmartPhoneInput
                                value={formData.phoneE164}
                                onChange={handlePhoneChange}
                                placeholder="Telefoonnummer"
                                required
                                error={phoneError}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                            E-mailadres
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="je@email.com (optioneel)"
                        />
                    </div>

                    {/* Location & Date */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="citySlug" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                                Stad *
                            </label>
                            <select
                                id="citySlug"
                                name="citySlug"
                                value={formData.citySlug}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="">Selecteer een stad</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.slug}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="preferredDate" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                                Gewenste Datum *
                            </label>
                            <input
                                type="date"
                                id="preferredDate"
                                name="preferredDate"
                                value={formData.preferredDate}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                            Extra Wensen / Opmerkingen
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Bijv. aantal kamers, speciale wensen, sleutel locatie..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <Button
                            type="submit"
                            color="primary"
                            size="large"
                            disabled={isLoading || !!phoneError}
                            className="w-full"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Aanvraag Versturen...
                                </div>
                            ) : (
                                'Verstuur Aanvraag'
                            )}
                        </Button>
                    </div>

                    {/* Info Text */}
                    <div className="text-sm text-neutral-500 text-center">
                        Door dit formulier te versturen ga je akkoord met onze{' '}
                        <a href="/privacy" className="text-primary-600 hover:underline">voorwaarden</a>.
                        We nemen binnen 24 uur contact op om de details af te stemmen.
                    </div>
                </form>
            </div>
        </div>
    );
}