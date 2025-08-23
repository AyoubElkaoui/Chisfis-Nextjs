"use client";

import Link from 'next/link';
import ButtonPrimary from '@/shared/ButtonPrimary'; // Fix import
import { ArrowRightIcon, SparklesIcon, ShieldCheckIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function FinalCallToAction() {
    return (
        <div className="text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-white/20 rounded-xl rotate-45"></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-40 right-10 w-8 h-8 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <SparklesIcon className="w-4 h-4" />
                    Klaar om te beginnen?
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Jouw schone huis is slechts{' '}
                    <span className="text-yellow-300">één klik</span> verwijderd
                </h2>

                {/* Description */}
                <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Sluit je aan bij honderden tevreden Europeanen die vertrouwen op onze
                    gescreende schoonmakers voor hun huis in Marokko.
                </p>

                {/* Features */}
                <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
                    <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="w-5 h-5 text-green-300" />
                        <span className="text-primary-100">100% Gescreend</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-5 h-5 text-blue-300" />
                        <span className="text-primary-100">24u Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5 text-yellow-300" />
                        <span className="text-primary-100">Kwaliteitsgarantie</span>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <Link href="/cleaner-listings">
                        <ButtonPrimary className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold">
                            <ArrowRightIcon className="w-5 h-5 mr-2" />
                            Vind je Schoonmaker
                        </ButtonPrimary>
                    </Link>

                    <Link
                        href="/book"
                        className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-semibold text-lg"
                    >
                        Direct Boeken
                    </Link>
                </div>

                {/* Contact Info */}
                <div className="border-t border-white/20 pt-8 mt-12">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <div className="flex items-center gap-3">
                            <PhoneIcon className="w-5 h-5 text-primary-200" />
                            <div>
                                <div className="text-sm text-primary-200">Hulp nodig?</div>
                                <div className="font-semibold">+31 20 123 4567</div>
                            </div>
                        </div>

                        <div className="hidden sm:block w-px h-12 bg-white/20"></div>

                        <div className="text-center">
                            <div className="text-sm text-primary-200">Of stuur een e-mail</div>
                            <a href="mailto:info@cleanmorocco.com" className="font-semibold hover:text-yellow-300 transition-colors">
                                info@cleanmorocco.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 text-center">
                    <div className="text-sm text-primary-200 mb-4">Vertrouwd door 500+ Europese huiseigenaren</div>

                    {/* Country Flags */}
                    <div className="flex items-center justify-center gap-4 text-2xl">
                        <span title="Nederland">🇳🇱</span>
                        <span title="België">🇧🇪</span>
                        <span title="Duitsland">🇩🇪</span>
                        <span title="Frankrijk">🇫🇷</span>
                        <span title="Spanje">🇪🇸</span>
                        <span title="Verenigd Koninkrijk">🇬🇧</span>
                    </div>
                </div>
            </div>
        </div>
    );
}