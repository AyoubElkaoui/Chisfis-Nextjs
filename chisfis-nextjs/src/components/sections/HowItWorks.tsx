"use client";

import { MagnifyingGlassIcon, UserGroupIcon, CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const steps = [
    {
        icon: MagnifyingGlassIcon,
        title: "1. Zoek & Vergelijk",
        description: "Vind schoonmakers in jouw stad en vergelijk profielen, reviews en prijzen.",
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
        icon: CalendarDaysIcon,
        title: "2. Boek Online",
        description: "Kies je gewenste datum en tijd. Vul het simpele boekingsformulier in.",
        color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    },
    {
        icon: UserGroupIcon,
        title: "3. Persoonlijk Contact",
        description: "We brengen je direct in contact met de schoonmaker om details af te stemmen.",
        color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
        icon: CheckCircleIcon,
        title: "4. Professionele Service",
        description: "Geniet van een professioneel schone woning. Betaal direct aan de schoonmaker.",
        color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
    }
];

export default function HowItWorks() {
    return (
        <div>
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Hoe het <span className="text-primary-600">werkt</span>
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    In 4 simpele stappen naar een schoon huis. Gemakkelijk, veilig en betrouwbaar.
                </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div key={index} className="text-center group">
                            {/* Icon */}
                            <div className="relative mb-6">
                                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-8 h-8" />
                                </div>

                                {/* Arrow (except last item) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-full w-8 text-neutral-300 dark:text-neutral-600">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
                <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium">
                    ⏱️ Gemiddelde responstijd: binnen 2 uur
                </div>
            </div>
        </div>
    );
}