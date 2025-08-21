"use client";

import { useEffect, useState } from "react";

export type CleanerDTO = {
    id: number;
    slug: string;
    name: string;
    city: string;
    citySlug: string;
    bio: string | null;
    pricePerHour: number | null;
    photoUrl: string;
    phoneE164: string | null;
    services: any[];
};

export function useCleaners(city?: string) {
    const [data, setData] = useState<CleanerDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const url = city ? `/api/cleaners?city=${encodeURIComponent(city)}` : "/api/cleaners";
        fetch(url)
            .then((r) => r.json())
            .then(setData)
            .finally(() => setLoading(false));
    }, [city]);

    return { data, loading };
}
