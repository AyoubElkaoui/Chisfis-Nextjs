// Simple React email (werkt met Resend)
import * as React from "react";

export default function BookingRequestEmail({
                                                fullName,
                                                phoneE164,
                                                cityName,
                                                preferredDate,
                                                cleanerName,
                                                message,
                                            }: {
    fullName: string;
    phoneE164: string;
    cityName: string;
    preferredDate: string; // YYYY-MM-DD
    cleanerName?: string | null;
    message?: string | null;
}) {
    return (
        <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
            <h2>Nieuwe boekingsaanvraag</h2>
            <p><b>Naam:</b> {fullName}</p>
            <p><b>Telefoon:</b> {phoneE164}</p>
            <p><b>Stad:</b> {cityName}</p>
            <p><b>Voorkeursdatum:</b> {preferredDate}</p>
            {cleanerName ? <p><b>Voorkeurs-schoonmaker:</b> {cleanerName}</p> : null}
            {message ? (
                <>
                    <p><b>Opmerkingen:</b></p>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{message}</pre>
                </>
            ) : null}
            <hr />
            <p>Admin: <a href={`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin`}>open admin</a></p>
        </div>
    );
}
