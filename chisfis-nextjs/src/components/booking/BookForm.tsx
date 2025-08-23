"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import DatePicker from 'react-datepicker';
import {
    CalendarDaysIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ChatBubbleLeftIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import 'react-datepicker/dist/react-datepicker.css';

interface City {
    id: number;
    name: string;
    slug: string;
    cleanerCount: number;
}

interface Props {
    cities: City[];
}

const services = [
    { id: 'basic', name: 'Basis Schoonmaak', description: 'Dagelijkse schoonmaak, stoffen, dweilen', icon: '🧹' },
    { id: 'deep', name: 'Grote Schoonmaak', description: 'Dieptereiniging, keuken, badkamers', icon: '✨' },
    { id: 'windows', name: 'Ramen Wassen', description: 'Binnen en buiten ramen, spiegels', icon: '🪟' },
    { id: 'garden', name: 'Tuin Onderhoud', description: 'Planten water geven, onkruid wieden', icon: '🌿' },
    { id: 'maintenance', name: 'Klein Onderhoud', description: 'Kleine reparaties, vervangen lampen', icon: '🔧' }
];

const propertyTypes = [
    { id: 'apartment', name: 'Appartement', icon: '🏢' },
    { id: 'house', name: 'Huis', icon: '🏠' },
    { id: 'riad', name: 'Riad', icon: '🏛️' },
    { id: 'villa', name: 'Villa', icon: '🏖️' },
    { id: 'office', name: 'Kantoor', icon: '🏢' }
];

const propertySizes = [
    { id: 'small', name: 'Klein (1-2 kamers)', description: 'Tot 50m²' },
    { id: 'medium', name: 'Gemiddeld (3-4 kamers)', description: '50-100m²' },
    { id: 'large', name: 'Groot (5+ kamers)', description: '100-200m²' },
    { id: 'xlarge', name: 'Zeer groot', description: '200m²+' }
];

const frequencies = [
    { id: 'once', name: 'Eenmalig', description: 'Alleen deze keer' },
    { id: 'weekly', name: 'Wekelijks', description: 'Elke week' },
    { id: 'biweekly', name: 'Tweewekelijks', description: 'Om de 2 weken' },
    { id: 'monthly', name: 'Maandelijks', description: 'Elke maand' },
    { id: 'flexible', name: 'Flexibel', description: 'Af en toe' }
];

export default function BookForm({ cities }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        phoneE164: '',
        email: '',
        citySlug: searchParams.get('city') || '',
        cleanerSlug: searchParams.get('cleaner') || '',
        preferredDate: null as Date | null,
        message: '',
        services: [] as string[],
        propertyType: '',
        propertySize: '',
        frequency: 'once'
    });

    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [currentStep, setCurrentStep] = useState(1);

    // Pre-fill contact mode
    const contactMode = searchParams.get('contact') === 'true';

    // Validation
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Naam is verplicht';
        }

        if (!formData.phoneE164) {
            newErrors.phoneE164 = 'Telefoonnummer is verplicht';
        } else if (!isValidPhoneNumber(formData.phoneE164)) {
            newErrors.phoneE164 = 'Ongeldig telefoonnummer';
        }

        if (!formData.email) {
            newErrors.email = 'Email is verplicht';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Ongeldig emailadres';
        }

        if (!formData.citySlug) {
            newErrors.citySlug = 'Stad is verplicht';
        }

        if (formData.services.length === 0) {
            newErrors.services = 'Selecteer minimaal 1 dienst';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/booking-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    preferredDate: formData.preferredDate?.toISOString() || null
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Er is een fout opgetreden');
            }

            setShowSuccess(true);

            // Redirect after success
            setTimeout(() => {
                router.push(`/booking-success?id=${result.bookingId}`);
            }, 2000);

        } catch (error) {
            console.error('Booking error:', error);
            setErrors({
                submit: error instanceof Error ? error.message : 'Er is een fout opgetreden'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle service toggle
    const toggleService = (serviceId: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(serviceId)
                ? prev.services.filter(s => s !== serviceId)
                : [...prev.services, serviceId]
        }));
    };

    // Success state
    if (showSuccess) {
        return (
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8 text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Aanvraag Verstuurd! 🎉
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    We hebben je aanvraag ontvangen en nemen binnen 2 uur contact met je op.
                </p>
                <div className="animate-spin w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
            <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {contactMode ? 'Stuur een Bericht' : 'Boek jouw Schoonmaker'}
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Vul onderstaande gegevens in en we zorgen voor de perfecte match.
                    </p>
                </div>

                {/* Error message */}
                {errors.submit && (
                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700 dark:text-red-300">{errors.submit}</p>
                    </div>
                )}

                {/* Contact Information */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-primary-600" />
                        Jouw Gegevens
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Volledige Naam *
                            </label>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                                    errors.fullName ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
                                }`}
                                placeholder="Bijv. Jan van der Berg"
                            />
                            {errors.fullName && (
                                <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Email Adres *
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className={`w-full pl-11 pr-4 py-3 border rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                                        errors.email ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
                                    }`}
                                    placeholder="jan@email.com"
                                />
                                <EnvelopeIcon className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Telefoonnummer *
                        </label>
                        <div className="relative">
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="NL"
                                value={formData.phoneE164}
                                onChange={(value) => setFormData(prev => ({ ...prev, phoneE164: value || '' }))}
                                className={`phone-input ${errors.phoneE164 ? 'error' : ''}`}
                                placeholder="Bijv. +31 6 12345678"
                            />
                            <PhoneIcon className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                        {errors.phoneE164 && (
                            <p className="text-red-600 text-sm mt-1">{errors.phoneE164}</p>
                        )}
                    </div>
                </div>

                {/* Location & Cleaner */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <MapPinIcon className="w-5 h-5 text-primary-600" />
                        Locatie & Voorkeur
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Stad in Marokko *
                            </label>
                            <select
                                value={formData.citySlug}
                                onChange={(e) => setFormData(prev => ({ ...prev, citySlug: e.target.value }))}
                                className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                                    errors.citySlug ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
                                }`}
                            >
                                <option value="">Selecteer een stad...</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.slug}>
                                        {city.name} ({city.cleanerCount} schoonmakers)
                                    </option>
                                ))}
                            </select>
                            {errors.citySlug && (
                                <p className="text-red-600 text-sm mt-1">{errors.citySlug}</p>
                            )}
                        </div>

                        {/* Preferred Date */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Gewenste Datum (Optioneel)
                            </label>
                            <div className="relative">
                                <DatePicker
                                    selected={formData.preferredDate}
                                    onChange={(date) => setFormData(prev => ({ ...prev, preferredDate: date }))}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    placeholderText="Selecteer een datum..."
                                    className="w-full pl-11 pr-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                />
                                <CalendarDaysIcon className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                            Welke diensten heb je nodig? *
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                            Selecteer alle diensten die van toepassing zijn.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                        {services.map((service) => (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => toggleService(service.id)}
                                className={`text-left p-4 border-2 rounded-xl transition-all hover:border-primary-300 ${
                                    formData.services.includes(service.id)
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                                        : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">{service.icon}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                                {service.name}
                                            </h4>
                                            {formData.services.includes(service.id) && (
                                                <CheckIcon className="w-5 h-5 text-primary-600" />
                                            )}
                                        </div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {errors.services && (
                        <p className="text-red-600 text-sm">{errors.services}</p>
                    )}
                </div>

                {/* Property Details */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                        Eigendom Details (Optioneel)
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Property Type */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Type Eigendom
                            </label>
                            <select
                                value={formData.propertyType}
                                onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
                                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            >
                                <option value="">Selecteer type...</option>
                                {propertyTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.icon} {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Property Size */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Grootte
                            </label>
                            <select
                                value={formData.propertySize}
                                onChange={(e) => setFormData(prev => ({ ...prev, propertySize: e.target.value }))}
                                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            >
                                <option value="">Selecteer grootte...</option>
                                {propertySizes.map((size) => (
                                    <option key={size.id} value={size.id}>
                                        {size.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Frequency */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Frequentie
                            </label>
                            <select
                                value={formData.frequency}
                                onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            >
                                {frequencies.map((freq) => (
                                    <option key={freq.id} value={freq.id}>
                                        {freq.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        <ChatBubbleLeftIcon className="w-4 h-4 inline mr-1" />
                        Extra Informatie (Optioneel)
                    </label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                        placeholder="Vertel ons over je specifieke wensen, toegang tot het eigendom, bijzondere instructies, etc."
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                            isSubmitting ? 'cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                Bezig met versturen...
                            </>
                        ) : (
                            <>
                                <CheckCircleIcon className="w-5 h-5" />
                                {contactMode ? 'Bericht Versturen' : 'Aanvraag Versturen'}
                            </>
                        )}
                    </button>

                    <p className="text-center text-sm text-neutral-500 mt-4">
                        Door te klikken ga je akkoord met onze{' '}
                        <a href="/terms" className="text-primary-600 hover:underline">
                            algemene voorwaarden
                        </a>{' '}
                        en{' '}
                        <a href="/privacy" className="text-primary-600 hover:underline">
                            privacybeleid
                        </a>.
                    </p>
                </div>
            </form>

            <style jsx global>{`
        .phone-input {
          width: 100%;
        }
        
        .phone-input .PhoneInputInput {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border: 1px solid rgb(229 231 235);
          border-radius: 12px;
          background: white;
          color: rgb(17 24 39);
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .dark .phone-input .PhoneInputInput {
          border-color: rgb(64 64 64);
          background: rgb(23 23 23);
          color: rgb(245 245 245);
        }
        
        .phone-input .PhoneInputInput:focus {
          outline: none;
          border-color: rgb(37 99 235);
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }
        
        .phone-input.error .PhoneInputInput {
          border-color: rgb(239 68 68);
        }
        
        .phone-input .PhoneInputCountrySelect {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          border: none;
          background: transparent;
        }
        
        .react-datepicker-wrapper {
          width: 100%;
        }
        
        .react-datepicker__input-container {
          width: 100%;
        }
      `}</style>
        </div>
    );
}