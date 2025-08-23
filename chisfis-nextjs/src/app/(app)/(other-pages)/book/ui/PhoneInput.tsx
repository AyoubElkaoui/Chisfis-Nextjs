"use client";

import { useState } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/min';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';

interface Props {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    error?: string;
}

// Common countries for this use case
const PRIORITY_COUNTRIES = ['MA', 'NL', 'BE', 'FR', 'DE', 'ES'] as const;

export default function SmartPhoneInput({
                                            value,
                                            onChange,
                                            placeholder = "Telefoonnummer",
                                            required = false,
                                            className = "",
                                            error
                                        }: Props) {
    const [country, setCountry] = useState<string>('MA'); // Default to Morocco

    // Get all countries but prioritize common ones
    const allCountries = getCountries();
    const priorityCountries = PRIORITY_COUNTRIES.filter(c => allCountries.includes(c));
    const otherCountries = allCountries.filter(c => !PRIORITY_COUNTRIES.includes(c as any));
    const sortedCountries = [...priorityCountries, ...otherCountries];

    const getCountryName = (countryCode: string) => {
        const names: Record<string, string> = {
            'MA': '🇲🇦 Marokko',
            'NL': '🇳🇱 Nederland',
            'BE': '🇧🇪 België',
            'FR': '🇫🇷 Frankrijk',
            'DE': '🇩🇪 Duitsland',
            'ES': '🇪🇸 Spanje',
            'GB': '🇬🇧 Verenigd Koninkrijk',
            'US': '🇺🇸 Verenigde Staten',
        };
        return names[countryCode] || en[countryCode as keyof typeof en] || countryCode;
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-3">
                {/* Country Selector */}
                <select
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                        // Reset phone number when country changes
                        onChange(undefined);
                    }}
                    className="w-48 px-3 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                >
                    {sortedCountries.map((countryCode) => (
                        <option key={countryCode} value={countryCode}>
                            {getCountryName(countryCode)} (+{getCountryCallingCode(countryCode)})
                        </option>
                    ))}
                </select>

                {/* Phone Input */}
                <div className="flex-1">
                    <PhoneInput
                        country={country as any}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            error
                                ? 'border-red-300 focus:ring-red-500'
                                : 'border-neutral-200 dark:border-neutral-700'
                        } ${className}`}
                        style={{
                            fontSize: '16px', // Prevents zoom on iOS
                        }}
                    />
                </div>
            </div>

            {/* Helper Text */}
            <div className="text-sm text-neutral-500 flex items-center gap-2">
                <span>
                    Voorbeeld: {country === 'MA' ? '661234567' : country === 'NL' ? '612345678' : '123456789'}
                </span>
                {country === 'NL' && (
                    <span className="text-amber-600">• Zonder 0 vooraan</span>
                )}
                {country === 'MA' && (
                    <span className="text-amber-600">• Zonder 0 vooraan</span>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}