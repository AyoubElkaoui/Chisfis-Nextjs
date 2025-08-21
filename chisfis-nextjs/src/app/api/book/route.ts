import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import BookingRequestEmail from "@/app/emails/BookingRequestEmail";

const isE164 = (p: string) => /^\+?[1-9]\d{7,14}$/.test(p.replace(/\s+/g, ""));

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.BOOKING_FROM!;
const TO = process.env.BOOKING_NOTIFY_TO!;

export async function POST(req: NextRequest) {
    try {
        const { fullName, phoneE164, citySlug, preferredDate, cleanerSlug, message } = await req.json();

        if (!fullName || !phoneE164 || !citySlug || !preferredDate) {
            return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
        }
        if (!isE164(phoneE164)) {
            return NextResponse.json({ error: "Telefoonnummer ongeldig (E.164)." }, { status: 400 });
        }

        const city = await prisma.city.findUnique({ where: { slug: citySlug } });
        if (!city) return NextResponse.json({ error: "Onbekende stad." }, { status: 400 });

        let cleanerId: number | null = null;
        let cleanerName: string | null = null;
        if (cleanerSlug) {
            const cl = await prisma.cleaner.findUnique({ where: { slug: cleanerSlug } });
            if (cl) { cleanerId = cl.id; cleanerName = cl.name; }
        }

        // midden vd dag om TZ issues te vermijden
        const date = new Date(`${preferredDate}T12:00:00`);

        const saved = await prisma.bookingRequest.create({
            data: {
                fullName,
                phoneE164: phoneE164.replace(/\s+/g, ""),
                cityId: city.id,
                preferredDate: date,
                message: message || null,
                cleanerId,
            },
            include: { city: true, cleaner: true },
        });

        // === NIEUW: e-mail naar admin ===
        if (process.env.RESEND_API_KEY && FROM && TO) {
            await resend.emails.send({
                from: FROM,
                to: [TO],
                subject: `Nieuwe boekingsaanvraag: ${saved.fullName} – ${saved.city.name} (${preferredDate})`,
                react: BookingRequestEmail({
                    fullName: saved.fullName,
                    phoneE164: saved.phoneE164,
                    cityName: saved.city.name,
                    preferredDate,
                    cleanerName: saved.cleaner?.name ?? null,
                    message: saved.message ?? null,
                }),
            }).catch((e) => console.error("Resend error:", e));
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Serverfout" }, { status: 500 });
    }
}
