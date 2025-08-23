import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
    customerName: string;
    bookingId: number;
    cleanerName?: string;
    cityName?: string;
    preferredDate?: string | null;
    customerEmail?: string;
    customerPhone?: string;
    message?: string;
}

export async function sendBookingRequestEmail({
                                                  to,
                                                  type,
                                                  data
                                              }: {
    to: string;
    type: 'customer_confirmation' | 'new_booking_request' | 'cleaner_new_request';
    data: EmailData;
}) {
    let subject: string;
    let htmlContent: string;

    switch (type) {
        case 'customer_confirmation':
            subject = '✅ Je aanvraag is ontvangen - CleanMorocco';
            htmlContent = customerConfirmationTemplate(data);
            break;

        case 'new_booking_request':
            subject = `🆕 Nieuwe booking aanvraag #${data.bookingId}`;
            htmlContent = adminNotificationTemplate(data);
            break;

        case 'cleaner_new_request':
            subject = `💼 Nieuwe klant aanvraag voor ${data.cleanerName}`;
            htmlContent = cleanerNotificationTemplate(data);
            break;

        default:
            throw new Error(`Unknown email type: ${type}`);
    }

    try {
        const result = await resend.emails.send({
            from: 'CleanMorocco <noreply@cleanmorocco.com>',
            to,
            subject,
            html: htmlContent
        });

        console.log(`Email sent successfully to ${to}:`, result);
        return result;
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error);
        throw error;
    }
}

function customerConfirmationTemplate(data: EmailData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Aanvraag Ontvangen</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">CleanMorocco</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Professionele schoonmaakdiensten in Marokko</p>
        </div>

        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #2563eb; margin-top: 0;">Hallo ${data.customerName}! 👋</h2>
            
            <p>Geweldig nieuws! We hebben je aanvraag voor een schoonmaker ontvangen en ons team gaat meteen aan de slag.</p>

            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #2563eb;">📋 Jouw Aanvraag Details:</h3>
                <p><strong>Aanvraag ID:</strong> #${data.bookingId}</p>
                ${data.cleanerName ? `<p><strong>Schoonmaker:</strong> ${data.cleanerName}</p>` : ''}
                ${data.cityName ? `<p><strong>Locatie:</strong> ${data.cityName}</p>` : ''}
                ${data.preferredDate ? `<p><strong>Gewenste datum:</strong> ${data.preferredDate}</p>` : ''}
            </div>

            <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #16a34a; margin-top: 0;">⏰ Wat gebeurt er nu?</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>We zoeken de perfecte schoonmaker voor je</li>
                    <li>Je hoort binnen <strong>2 uur</strong> van ons</li>
                    <li>Direct contact met de schoonmaker</li>
                    <li>Jullie stemmen samen de details af</li>
                </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <p>Vragen? We zijn er voor je!</p>
                <div style="margin: 15px 0;">
                    <a href="tel:+31201234567" style="display: inline-block; background: #16a34a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                        📞 Bel ons
                    </a>
                    <a href="mailto:support@cleanmorocco.com" style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                        ✉️ E-mail ons
                    </a>
                </div>
            </div>

            <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                <p style="color: #6b7280; font-size: 14px;">
                    Met vriendelijke groet,<br>
                    <strong>Team CleanMorocco</strong>
                </p>
                <p style="color: #6b7280; font-size: 12px;">
                    Voor de beste schoonmaakservice in Marokko ✨
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}

function adminNotificationTemplate(data: EmailData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Nieuwe Booking Aanvraag</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #2563eb;">🆕 Nieuwe Booking Aanvraag</h1>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Klant Informatie:</h2>
            <p><strong>Naam:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.customerEmail}">${data.customerEmail}</a></p>
            <p><strong>Telefoon:</strong> <a href="tel:${data.customerPhone}">${data.customerPhone}</a></p>
        </div>

        <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h2>Booking Details:</h2>
            <p><strong>Booking ID:</strong> #${data.bookingId}</p>
            <p><strong>Gewenste Schoonmaker:</strong> ${data.cleanerName || 'Geen voorkeur'}</p>
            <p><strong>Stad:</strong> ${data.cityName || 'Ongespecificeerd'}</p>
            <p><strong>Gewenste Datum:</strong> ${data.preferredDate || 'Flexibel'}</p>
            ${data.message ? `<p><strong>Bericht:</strong><br>${data.message}</p>` : ''}
        </div>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p><strong>⚡ Actie vereist:</strong> Neem binnen 2 uur contact op met de klant!</p>
        </div>
    </body>
    </html>
  `;
}

function cleanerNotificationTemplate(data: EmailData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Nieuwe Klant Aanvraag</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #2563eb;">💼 Nieuwe Klant Aanvraag voor jou!</h1>
        
        <p>Hallo ${data.cleanerName},</p>
        
        <p>Goed nieuws! Een klant heeft specifiek naar jou gevraagd voor schoonmaakwerk.</p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Klant Details:</h2>
            <p><strong>Naam:</strong> ${data.customerName}</p>
            <p><strong>Booking ID:</strong> #${data.bookingId}</p>
            <p><strong>Gewenste Datum:</strong> ${data.preferredDate || 'Flexibel'}</p>
            ${data.message ? `<p><strong>Bericht van klant:</strong><br>${data.message}</p>` : ''}
        </div>

        <div style="background: #dcfce7; padding: 15px; border-radius: 8px;">
            <p><strong>📞 Volgende stap:</strong> Onze klantenservice neemt contact met je op om de details door te nemen en de klant in contact te brengen.</p>
        </div>

        <p>Succes met de nieuwe klus!</p>
        
        <p>Team CleanMorocco</p>
    </body>
    </html>
  `;
}