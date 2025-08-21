"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { City } from "@prisma/client";

export default function BookForm({ cities }: { cities: City[] }) {
    const sp = useSearchParams();
    const cleaner = sp.get("cleaner") || "";
    const city = sp.get("city") || "";

    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState<string|null>(null);
    const [err, setErr] = useState<string|null>(null);

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); setLoading(true); setOk(null); setErr(null);
        const fd = new FormData(e.currentTarget);
        const payload = Object.fromEntries(fd.entries());
        const res = await fetch("/api/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const j = await res.json();
        res.ok ? setOk("✅ Aanvraag verzonden.") : setErr(j?.error || "Er ging iets mis.");
        setLoading(false);
    }

    return (
        <div className="container py-10 max-w-xl">
            <h1 className="text-2xl font-semibold mb-6">Boekingsaanvraag</h1>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Volledige naam</label>
                    <input name="fullName" className="nc-input w-full rounded-xl border px-3 py-2" required />
                </div>
                <div>
                    <label className="block text-sm mb-1">Telefoon (WhatsApp)</label>
                    <input name="phoneE164" placeholder="+31..." className="nc-input w-full rounded-xl border px-3 py-2" required />
                </div>
                <div>
                    <label className="block text-sm mb-1">Stad</label>
                    <select name="citySlug" className="nc-input w-full rounded-xl border px-3 py-2" required defaultValue={city || ""}>
                        <option value="" disabled>Kies stad</option>
                        {cities.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm mb-1">Voorkeursdatum</label>
                    <input type="date" name="preferredDate" className="nc-input w-full rounded-xl border px-3 py-2" required />
                </div>
                <input type="hidden" name="cleanerSlug" value={cleaner} />
                <div>
                    <label className="block text-sm mb-1">Opmerkingen (optioneel)</label>
                    <textarea name="message" rows={4} className="nc-input w-full rounded-xl border px-3 py-2" />
                </div>
                <button disabled={loading} className="nc-Button w-full rounded-xl border px-4 py-2">
                    {loading ? "Versturen..." : "Aanvraag versturen"}
                </button>
                {ok && <p className="text-green-600">{ok}</p>}
                {err && <p className="text-red-600">{err}</p>}
            </form>
        </div>
    );
}
