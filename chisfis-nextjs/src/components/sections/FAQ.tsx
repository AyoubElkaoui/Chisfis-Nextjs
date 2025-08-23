"use client";

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
    {
        id: 1,
        question: "Hoe weet ik dat de schoonmakers betrouwbaar zijn?",
        answer: "Alle schoonmakers op ons platform worden grondig gescreend. We controleren hun identiteit, referenties en werkervaring. Daarnaast heeft elke schoonmaker een profiel met echte klantbeoordelingen."
    },
    {
        id: 2,
        question: "Kan ik last-minute een schoonmaker boeken?",
        answer: "Ja, vaak wel! Veel van onze schoonmakers zijn flexibel met hun planning. Je kunt tot 24 uur van tevoren boeken, afhankelijk van de beschikbaarheid in jouw stad."
    },
    {
        id: 3,
        question: "Wat als ik niet tevreden ben met het resultaat?",
        answer: "Klanttevredenheid staat bij ons voorop. Als je niet tevreden bent, neem dan contact met ons op binnen 24 uur. We zorgen ervoor dat het probleem wordt opgelost, eventueel door een gratis herbeurt."
    },
    {
        id: 4,
        question: "Hoe wordt de prijs bepaald?",
        answer: "De prijs is gebaseerd op het uurtarief van de schoonmaker, de geschatte duur en het type service. Je ziet altijd de totaalprijs vooraf, zonder verborgen kosten."
    },
    {
        id: 5,
        question: "Moet ik aanwezig zijn tijdens de schoonmaak?",
        answer: "Nee, dat hoeft niet. Veel klanten laten een sleutel achter of geven instructies voor toegang. Je kunt dit bespreken met de schoonmaker bij het maken van de afspraak."
    },
    {
        id: 6,
        question: "In welke talen kan ik communiceren?",
        answer: "Onze schoonmakers spreken verschillende talen. De meesten spreken Arabisch en Frans, velen ook Engels. Bij elk profiel zie je welke talen de schoonmaker beheerst."
    },
    {
        id: 7,
        question: "Hoe kan ik betalen?",
        answer: "Je kunt betalen via creditcard, PayPal of bankoverschrijving. Betaling vindt plaats nadat de service is voltooid en je tevreden bent met het resultaat."
    },
    {
        id: 8,
        question: "Wat gebeurt er als de schoonmaker niet komt opdagen?",
        answer: "Dat gebeurt zelden, maar als het voorkomt, krijg je onmiddellijk bericht en helpen we je binnen 2 uur een vervanger te vinden of je geld terug te krijgen."
    }
];

export default function FAQ() {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="relative py-16 lg:py-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Veelgestelde vragen
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    Heeft u nog vragen? Hier vindt u antwoorden op de meest gestelde vragen
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(faq.id)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                            >
                <span className="font-medium text-neutral-900 dark:text-neutral-100 pr-4">
                  {faq.question}
                </span>
                                <ChevronDownIcon
                                    className={`w-5 h-5 text-neutral-500 transition-transform ${
                                        openId === faq.id ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openId === faq.id && (
                                <div className="px-6 pb-5 pt-0">
                                    <div className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center">
                    <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                        Nog andere vragen?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    >
                        Neem contact op
                    </a>
                </div>
            </div>
        </div>
    );
}