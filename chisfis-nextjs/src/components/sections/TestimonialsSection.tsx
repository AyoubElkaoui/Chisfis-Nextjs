"use client";

import { useState } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
// Fix: QuoteIcon is in outline, not solid
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const testimonials = [
    {
        id: 1,
        name: "Marie van der Berg",
        location: "Amsterdam → Marrakech",
        rating: 5,
        comment: "Fantastische service! Fatima heeft ons riad perfect schoongemaakt. Zeer betrouwbaar en professioneel. We boeken haar nu elke keer als we in Marrakech zijn.",
        avatar: "/images/customers/marie.jpg",
        cleaner: "Fatima El Amrani",
        verified: true
    },
    {
        id: 2,
        name: "Hans Müller",
        location: "Berlin → Agadir",
        rating: 5,
        comment: "Youssef is super flexibel en spreekt goed Engels en Spaans. Hij zorgt ervoor dat ons appartement altijd perfect is bij aankomst. Zeer aan te bevelen!",
        avatar: "/images/customers/hans.jpg",
        cleaner: "Youssef Idrissi",
        verified: true
    },
    {
        id: 3,
        name: "Sophie Dubois",
        location: "Paris → Casablanca",
        rating: 5,
        comment: "Aicha is zeer professioneel en let op elk detail. Parfait service! Ze spreekt perfect Frans en begrijpt precies wat we nodig hebben.",
        avatar: "/images/customers/sophie.jpg",
        cleaner: "Aicha Kassimi",
        verified: true
    },
    {
        id: 4,
        name: "David Johnson",
        location: "London → Rabat",
        rating: 5,
        comment: "Excellent service from Khadija. Very thorough cleaning and great communication in English. Our diplomatic residence was spotless. Highly recommended!",
        avatar: "/images/customers/david.jpg",
        cleaner: "Khadija Alaoui",
        verified: true
    },
    {
        id: 5,
        name: "Marco Rossi",
        location: "Milano → Tanger",
        rating: 5,
        comment: "Samira is absolutely amazing! She takes care of our holiday home like it's her own. Always reliable, professional, and speaks multiple languages.",
        avatar: "/images/customers/marco.jpg",
        cleaner: "Samira Tazi",
        verified: true
    }
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div>
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Wat onze <span className="text-primary-600">klanten</span> zeggen
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    Duizenden tevreden Europeanen vertrouwen op onze schoonmakers voor hun tweede huis in Marokko.
                </p>
            </div>

            {/* Main Testimonial */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8 lg:p-12 relative">

                    {/* Quote Icon - Changed to ChatBubbleLeftRightIcon */}
                    <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
                        <ChatBubbleLeftRightIcon className="w-8 h-8 lg:w-12 lg:h-12 text-primary-200 dark:text-primary-800" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Stars */}
                        <div className="flex items-center justify-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon
                                    key={i}
                                    className="w-6 h-6 text-yellow-400"
                                />
                            ))}
                        </div>

                        {/* Comment */}
                        <blockquote className="text-xl lg:text-2xl text-neutral-900 dark:text-neutral-100 leading-relaxed text-center mb-8">
                            "{currentTestimonial.comment}"
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center justify-center gap-4">
                            <img
                                src={currentTestimonial.avatar}
                                alt={currentTestimonial.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/customers/default.jpg';
                                }}
                            />
                            <div className="text-center">
                                <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
                                    {currentTestimonial.name}
                                    {currentTestimonial.verified && (
                                        <span className="ml-2 text-blue-600">✓</span>
                                    )}
                                </div>
                                <div className="text-neutral-600 dark:text-neutral-400">
                                    {currentTestimonial.location}
                                </div>
                                <div className="text-sm text-neutral-500">
                                    Schoonmaker: <span className="font-medium">{currentTestimonial.cleaner}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-full flex items-center justify-center transition-colors"
                            aria-label="Vorige testimonial"
                        >
                            <ChevronLeftIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        index === currentIndex
                                            ? 'bg-primary-600'
                                            : 'bg-neutral-300 dark:bg-neutral-600'
                                    }`}
                                    aria-label={`Ga naar testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextTestimonial}
                            className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-full flex items-center justify-center transition-colors"
                            aria-label="Volgende testimonial"
                        >
                            <ChevronRightIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">500+</div>
                    <div className="text-sm text-neutral-500">Tevreden Klanten</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">95%</div>
                    <div className="text-sm text-neutral-500">Klanttevredenheid</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">24u</div>
                    <div className="text-sm text-neutral-500">Gemiddelde respons</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">100%</div>
                    <div className="text-sm text-neutral-500">Gescreend</div>
                </div>
            </div>
        </div>
    );
}