
"use client";

import { useState } from 'react';
import { StarIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface Review {
    id: number;
    rating: number;
    comment: string | null;
    createdAt: Date;
    user: {
        name: string;
    };
}

interface Props {
    reviews: Review[];
    rating: number | null;
    reviewCount: number;
}

export default function CleanerReviews({ reviews, rating, reviewCount }: Props) {
    const [showAllReviews, setShowAllReviews] = useState(false);

    const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

    // Calculate rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(review => review.rating === star).length;
        const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
        return { star, count, percentage };
    });

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('nl-NL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                            i < rating
                                ? 'text-yellow-500'
                                : 'text-neutral-300 dark:text-neutral-600'
                        }`}
                    />
                ))}
            </div>
        );
    };

    if (reviewCount === 0) {
        return (
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8 text-center">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <StarIcon className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Nog geen reviews
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Deze schoonmaker heeft nog geen reviews ontvangen. Wees de eerste om een review achter te laten!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 lg:p-8">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Reviews & Waarderingen
                </h2>

                {/* Rating Summary */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Overall Rating */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                                {rating?.toFixed(1) || 'N/A'}
                            </div>
                            <div>
                                {renderStars(Math.round(rating || 0))}
                                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    Gebaseerd op {reviewCount} reviews
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2">
                        {ratingDistribution.map(({ star, count, percentage }) => (
                            <div key={star} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-12">
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">{star}</span>
                                    <StarIcon className="w-3 h-3 text-yellow-500" />
                                </div>

                                <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>

                                <span className="text-sm text-neutral-600 dark:text-neutral-400 w-8 text-right">
                  {count}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {visibleReviews.map((review) => (
                    <div
                        key={review.id}
                        className="border-b border-neutral-200 dark:border-neutral-700 pb-6 last:border-b-0 last:pb-0"
                    >
                        <div className="flex items-start gap-4">

                            {/* Avatar */}
                            <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0">
                                <UserCircleIcon className="w-8 h-8 text-neutral-400" />
                            </div>

                            {/* Content */}
                            <div className="flex-1">

                                {/* Header */}
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                                            {review.user.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            {renderStars(review.rating)}
                                            <span className="text-sm text-neutral-500">
                        {formatDate(review.createdAt)}
                      </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Comment */}
                                {review.comment && (
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        {review.comment}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            {reviews.length > 3 && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="flex items-center gap-2 mx-auto px-6 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                        {showAllReviews ? (
                            <>
                                <ChevronUpIcon className="w-5 h-5" />
                                Minder reviews tonen
                            </>
                        ) : (
                            <>
                                <ChevronDownIcon className="w-5 h-5" />
                                Alle {reviews.length} reviews bekijken
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Review CTA */}
            <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-xl text-center">
                <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
                    Heb je samengewerkt met deze schoonmaker?
                </h4>
                <p className="text-sm text-primary-700 dark:text-primary-300 mb-4">
                    Deel je ervaring om andere klanten te helpen bij hun keuze.
                </p>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                    Review Achterlaten
                </button>
            </div>
        </div>
    );
}