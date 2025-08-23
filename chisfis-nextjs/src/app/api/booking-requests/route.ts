import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { sendBookingRequestEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            fullName,
            phoneE164,
            email,
            citySlug,
            cleanerSlug,
            preferredDate,
            message,
            services,
            propertyType,
            propertySize,
            frequency
        } = body;

        // Validation
        if (!fullName || !phoneE164 || !email) {
            return NextResponse.json(
                { error: 'Naam, telefoon en email zijn verplicht' },
                { status: 400 }
            );
        }

        if (!isValidPhoneNumber(phoneE164)) {
            return NextResponse.json(
                { error: 'Ongeldig telefoonnummer' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Ongeldig emailadres' },
                { status: 400 }
            );
        }

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name: fullName,
                    phone: phoneE164,
                    role: 'CUSTOMER'
                }
            });
        }

        // Find city
        let city = null;
        if (citySlug) {
            city = await prisma.city.findUnique({
                where: { slug: citySlug }
            });
        }

        // Find cleaner
        let cleaner = null;
        if (cleanerSlug) {
            cleaner = await prisma.cleaner.findUnique({
                where: { slug: cleanerSlug },
                include: { city: true }
            });

            if (cleaner && !city) {
                city = cleaner.city;
            }
        }

        // Create booking request
        const bookingRequest = await prisma.bookingRequest.create({
            data: {
                userId: user.id,
                cleanerId: cleaner?.id || null,
                cityId: city?.id || null,
                preferredDate: preferredDate ? new Date(preferredDate) : null,
                message: message || null,
                status: 'PENDING',
                // Store additional data as JSON
                additionalData: JSON.stringify({
                    services: services || [],
                    propertyType: propertyType || null,
                    propertySize: propertySize || null,
                    frequency: frequency || null,
                    source: 'website'
                })
            },
            include: {
                user: true,
                cleaner: {
                    include: { city: true }
                },
                city: true
            }
        });

        // Send notification emails
        try {
            // To customer
            await sendBookingRequestEmail({
                to: user.email,
                type: 'customer_confirmation',
                data: {
                    customerName: user.name,
                    bookingId: bookingRequest.id,
                    cleanerName: cleaner?.name || 'een geschikte schoonmaker',
                    cityName: city?.name || 'Marokko',
                    preferredDate: preferredDate || null
                }
            });

            // To admin/cleaner
            await sendBookingRequestEmail({
                to: process.env.ADMIN_EMAIL || 'admin@cleanmorocco.com',
                type: 'new_booking_request',
                data: {
                    customerName: user.name,
                    customerEmail: user.email,
                    customerPhone: phoneE164,
                    bookingId: bookingRequest.id,
                    cleanerName: cleaner?.name || 'Geen specifieke voorkeur',
                    cityName: city?.name || 'Ongespecificeerd',
                    message: message || 'Geen bericht',
                    preferredDate: preferredDate || 'Flexibel'
                }
            });

            // If specific cleaner, also notify them
            if (cleaner && cleaner.email) {
                await sendBookingRequestEmail({
                    to: cleaner.email,
                    type: 'cleaner_new_request',
                    data: {
                        cleanerName: cleaner.name,
                        customerName: user.name,
                        bookingId: bookingRequest.id,
                        message: message || 'Geen specifieke wensen',
                        preferredDate: preferredDate || 'Flexibel'
                    }
                });
            }
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the request if email fails
        }

        return NextResponse.json({
            success: true,
            bookingId: bookingRequest.id,
            message: 'Aanvraag succesvol verstuurd. We nemen binnen 2 uur contact op!'
        });

    } catch (error) {
        console.error('Booking request error:', error);
        return NextResponse.json(
            { error: 'Er is een fout opgetreden bij het versturen van je aanvraag' },
            { status: 500 }
        );
    }
}

// GET - Admin endpoint to fetch booking requests
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        const where = status ? { status: status.toUpperCase() } : {};

        const bookingRequests = await prisma.bookingRequest.findMany({
            where,
            include: {
                user: true,
                cleaner: {
                    include: { city: true }
                },
                city: true
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: offset
        });

        const total = await prisma.bookingRequest.count({ where });

        return NextResponse.json({
            bookingRequests,
            total,
            hasMore: offset + limit < total
        });

    } catch (error) {
        console.error('Error fetching booking requests:', error);
        return NextResponse.json(
            { error: 'Failed to fetch booking requests' },
            { status: 500 }
        );
    }
}