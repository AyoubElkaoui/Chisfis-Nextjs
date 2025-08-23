"use client";

import { useEffect, useState } from "react";

export type CleanerDTO = {
    id: number;
    slug: string;
    name: string;
    city: {
        name: string;
        slug: string;
    };
    bio: string | null;
    pricePerHour: number | null;
    photoUrl: string;
    phoneE164: string | null;
    services: string[];     // Array
    languages: string[];    // Array
    rating: number | null;
    reviewCount: number;
    isVerified: boolean;
};

export function useCleaners(city?: string) {
    const [data, setData] = useState<CleanerDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const url = city ? `/api/cleaners?city=${encodeURIComponent(city)}` : "/api/cleaners";

        fetch(url)
            .then((r) => r.json())
            .then((response) => {
                // API returns array directly
                const cleaners = Array.isArray(response) ? response : [];
                setData(cleaners);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setData([]);
            })
            .finally(() => setLoading(false));
    }, [city]);

    return { data, loading };
}