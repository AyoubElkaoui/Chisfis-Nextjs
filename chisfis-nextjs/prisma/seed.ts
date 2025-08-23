import { PrismaClient, ServiceType, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // 1. Create Cities
    console.log('📍 Creating cities...');
    const cities = await Promise.all([
        prisma.city.create({
            data: {
                name: 'Marrakech',
                slug: 'marrakech',
                region: 'Centrum'
            }
        }),
        prisma.city.create({
            data: {
                name: 'Casablanca',
                slug: 'casablanca',
                region: 'West'
            }
        }),
        prisma.city.create({
            data: {
                name: 'Rabat',
                slug: 'rabat',
                region: 'Noord'
            }
        }),
        prisma.city.create({
            data: {
                name: 'Fes',
                slug: 'fes',
                region: 'Noord'
            }
        }),
        prisma.city.create({
            data: {
                name: 'Tanger',
                slug: 'tanger',
                region: 'Noord'
            }
        }),
        prisma.city.create({
            data: {
                name: 'Agadir',
                slug: 'agadir',
                region: 'Zuid'
            }
        }),
        prisma.city.create({
            data: {
                name: 'Meknes',
                slug: 'meknes',
                region: 'Centrum'
            }
        }),
        prisma.city.create({
            data: {
                name: 'Oujda',
                slug: 'oujda',
                region: 'Oost'
            }
        })
    ]);

    // 2. Create Test Users (Customers)
    console.log('👤 Creating test customers...');
    const customers = await Promise.all([
        prisma.user.create({
            data: {
                email: 'marie@example.nl',
                name: 'Marie van der Berg',
                phone: '+31612345678',
                country: 'NL',
                role: UserRole.CUSTOMER
            }
        }),
        prisma.user.create({
            data: {
                email: 'hans@example.de',
                name: 'Hans Müller',
                phone: '+49171234567',
                country: 'DE',
                role: UserRole.CUSTOMER
            }
        }),
        prisma.user.create({
            data: {
                email: 'sophie@example.fr',
                name: 'Sophie Dubois',
                phone: '+33612345678',
                country: 'FR',
                role: UserRole.CUSTOMER
            }
        })
    ]);

    // 3. Create Houses for customers
    console.log('🏠 Creating customer houses...');
    const houses = await Promise.all([
        prisma.house.create({
            data: {
                userId: customers[0].id,
                cityId: cities[0].id, // Marrakech
                address: 'Rue de la Kasbah 15, Medina',
                description: 'Traditioneel riad met 3 slaapkamers en patio',
                specialNotes: 'Sleutel bij buurman Hassan, tweede deur links',
                keyLocation: 'Onder de bloempot bij de ingang'
            }
        }),
        prisma.house.create({
            data: {
                userId: customers[1].id,
                cityId: cities[5].id, // Agadir
                address: 'Marina Boulevard 89, Agadir Bay',
                description: 'Modern appartement met zeezicht, 2 slaapkamers',
                specialNotes: 'Concierge heeft sleutel, vraag naar Apartment 89',
                keyLocation: 'Bij de portier in de lobby'
            }
        }),
        prisma.house.create({
            data: {
                userId: customers[2].id,
                cityId: cities[1].id, // Casablanca
                address: 'Avenue Hassan II 156',
                description: 'Villa met tuin, 4 slaapkamers',
                specialNotes: 'Let op: alarm code is 1234, tuinonderhoud ook gewenst',
                keyLocation: 'Sleutelkluis bij de poort, code 5678'
            }
        })
    ]);

    // 4. Create Cleaners
    console.log('🧽 Creating cleaners...');
    const cleaners = await Promise.all([
        // Marrakech cleaners
        prisma.cleaner.create({
            data: {
                name: 'Fatima El Amrani',
                slug: 'fatima-el-amrani',
                phoneE164: '+212661234567',
                email: 'fatima@cleanmorocco.com',
                bio: 'Ervaren schoonmaakster met 8 jaar ervaring in Marrakech. Gespecialiseerd in traditionele riads en moderne villa\'s.',
                photoUrl: '/images/cleaners/fatima.jpg',
                cityId: cities[0].id,
                rating: 4.9,
                reviewCount: 127,
                pricePerHour: 15,
                services: JSON.stringify(['basic', 'deep', 'windows']),
                languages: JSON.stringify(['ar', 'fr', 'en']),
                availability: JSON.stringify({
                    monday: ['09:00', '17:00'],
                    tuesday: ['09:00', '17:00'],
                    wednesday: ['09:00', '17:00'],
                    thursday: ['09:00', '17:00'],
                    friday: ['09:00', '15:00'],
                    saturday: ['10:00', '16:00']
                }),
                isActive: true,
                isVerified: true
            }
        }),
        prisma.cleaner.create({
            data: {
                name: 'Mohammed Benali',
                slug: 'mohammed-benali',
                phoneE164: '+212662234567',
                email: 'mohammed@cleanmorocco.com',
                bio: 'Professionele schoonmaker en tuinman. Perfect voor complete villa onderhoud.',
                photoUrl: '/images/cleaners/mohammed.jpg',
                cityId: cities[0].id,
                rating: 4.7,
                reviewCount: 89,
                pricePerHour: 18,
                services: JSON.stringify(['basic', 'deep', 'garden', 'maintenance']),
                languages: JSON.stringify(['ar', 'fr']),
                availability: JSON.stringify({
                    monday: ['08:00', '18:00'],
                    tuesday: ['08:00', '18:00'],
                    wednesday: ['08:00', '18:00'],
                    thursday: ['08:00', '18:00'],
                    friday: ['08:00', '12:00'],
                    sunday: ['09:00', '15:00']
                }),
                isActive: true,
                isVerified: true
            }
        }),
        // Casablanca cleaners
        prisma.cleaner.create({
            data: {
                name: 'Aicha Kassimi',
                slug: 'aicha-kassimi',
                phoneE164: '+212663234567',
                email: 'aicha@cleanmorocco.com',
                bio: 'Gespecialiseerd in moderne appartementen en kantoren. Spreekt vloeiend Frans en Engels.',
                photoUrl: '/images/cleaners/aicha.jpg',
                cityId: cities[1].id,
                rating: 4.8,
                reviewCount: 156,
                pricePerHour: 17,
                services: JSON.stringify(['basic', 'deep', 'windows', 'maintenance']),
                languages: JSON.stringify(['ar', 'fr', 'en']),
                availability: JSON.stringify({
                    monday: ['09:00', '17:00'],
                    tuesday: ['09:00', '17:00'],
                    wednesday: ['09:00', '17:00'],
                    thursday: ['09:00', '17:00'],
                    friday: ['09:00', '16:00'],
                    saturday: ['10:00', '14:00']
                }),
                isActive: true,
                isVerified: true
            }
        }),
        // Agadir cleaners
        prisma.cleaner.create({
            data: {
                name: 'Youssef Idrissi',
                slug: 'youssef-idrissi',
                phoneE164: '+212664234567',
                email: 'youssef@cleanmorocco.com',
                bio: 'Specialist in vakantiehuizen en resorts. Flexibele tijden voor toeristische accommodaties.',
                photoUrl: '/images/cleaners/youssef.jpg',
                cityId: cities[5].id,
                rating: 4.9,
                reviewCount: 203,
                pricePerHour: 16,
                services: JSON.stringify(['basic', 'deep', 'windows']),
                languages: JSON.stringify(['ar', 'fr', 'en', 'es']),
                availability: JSON.stringify({
                    monday: ['08:00', '20:00'],
                    tuesday: ['08:00', '20:00'],
                    wednesday: ['08:00', '20:00'],
                    thursday: ['08:00', '20:00'],
                    friday: ['08:00', '20:00'],
                    saturday: ['08:00', '20:00'],
                    sunday: ['10:00', '18:00']
                }),
                isActive: true,
                isVerified: true
            }
        }),
        // Rabat cleaners
        prisma.cleaner.create({
            data: {
                name: 'Khadija Alaoui',
                slug: 'khadija-alaoui',
                phoneE164: '+212665234567',
                email: 'khadija@cleanmorocco.com',
                bio: 'Ervaren in diplomatieke residencies en luxe woningen in Rabat.',
                photoUrl: '/images/cleaners/khadija.jpg',
                cityId: cities[2].id,
                rating: 4.8,
                reviewCount: 94,
                pricePerHour: 19,
                services: JSON.stringify(['basic', 'deep', 'windows', 'maintenance']),
                languages: JSON.stringify(['ar', 'fr', 'en']),
                availability: JSON.stringify({
                    monday: ['09:00', '17:00'],
                    tuesday: ['09:00', '17:00'],
                    wednesday: ['09:00', '17:00'],
                    thursday: ['09:00', '17:00'],
                    friday: ['09:00', '15:00']
                }),
                isActive: true,
                isVerified: true
            }
        }),
        // Fes cleaners
        prisma.cleaner.create({
            data: {
                name: 'Omar Benjelloun',
                slug: 'omar-benjelloun',
                phoneE164: '+212666234567',
                email: 'omar@cleanmorocco.com',
                bio: 'Specialist in historische gebouwen en traditionele architectuur van Fes.',
                photoUrl: '/images/cleaners/omar.jpg',
                cityId: cities[3].id,
                rating: 4.6,
                reviewCount: 67,
                pricePerHour: 14,
                services: JSON.stringify(['basic', 'deep', 'maintenance']),
                languages: JSON.stringify(['ar', 'fr']),
                availability: JSON.stringify({
                    monday: ['08:00', '16:00'],
                    tuesday: ['08:00', '16:00'],
                    wednesday: ['08:00', '16:00'],
                    thursday: ['08:00', '16:00'],
                    saturday: ['09:00', '15:00']
                }),
                isActive: true,
                isVerified: true
            }
        }),
        // Tanger cleaners
        prisma.cleaner.create({
            data: {
                name: 'Samira Tazi',
                slug: 'samira-tazi',
                phoneE164: '+212667234567',
                email: 'samira@cleanmorocco.com',
                bio: 'Internationale ervaring, perfect voor expats en vakantiehuizen in Tanger.',
                photoUrl: '/images/cleaners/samira.jpg',
                cityId: cities[4].id,
                rating: 4.9,
                reviewCount: 178,
                pricePerHour: 17,
                services: JSON.stringify(['basic', 'deep', 'windows', 'garden']),
                languages: JSON.stringify(['ar', 'fr', 'en', 'es']),
                availability: JSON.stringify({
                    monday: ['09:00', '18:00'],
                    tuesday: ['09:00', '18:00'],
                    wednesday: ['09:00', '18:00'],
                    thursday: ['09:00', '18:00'],
                    friday: ['09:00', '17:00'],
                    saturday: ['10:00', '16:00']
                }),
                isActive: true,
                isVerified: true
            }
        }),
        // Extra cleaners voor variety
        prisma.cleaner.create({
            data: {
                name: 'Rachid Mansouri',
                slug: 'rachid-mansouri',
                phoneE164: '+212668234567',
                bio: 'Gespecialiseerd in grote villa\'s en complexe schoonmaakklussen.',
                cityId: cities[0].id, // Marrakech
                rating: 4.5,
                reviewCount: 45,
                pricePerHour: 20,
                services: JSON.stringify(['deep', 'maintenance', 'garden']),
                languages: JSON.stringify(['ar', 'fr', 'en']),
                availability: JSON.stringify({
                    tuesday: ['08:00', '16:00'],
                    wednesday: ['08:00', '16:00'],
                    thursday: ['08:00', '16:00'],
                    friday: ['08:00', '16:00'],
                    saturday: ['08:00', '16:00']
                }),
                isActive: true,
                isVerified: true
            }
        })
    ]);

    // 5. Create Reviews
    console.log('⭐ Creating reviews...');
    const reviews = await Promise.all([
        // Reviews for Fatima
        prisma.review.create({
            data: {
                cleanerId: cleaners[0].id,
                userId: customers[0].id,
                rating: 5,
                comment: 'Fantastische service! Fatima heeft ons riad perfect schoongemaakt. Zeer betrouwbaar en professioneel.'
            }
        }),
        prisma.review.create({
            data: {
                cleanerId: cleaners[0].id,
                userId: customers[1].id,
                rating: 5,
                comment: 'Uitstekend werk, communiceert goed in het Engels. Ons huis was brandschoon bij aankomst.'
            }
        }),
        // Reviews for Aicha
        prisma.review.create({
            data: {
                cleanerId: cleaners[2].id,
                userId: customers[2].id,
                rating: 5,
                comment: 'Aicha is zeer professioneel en let op elk detail. Parfait service!'
            }
        }),
        // Reviews for Youssef
        prisma.review.create({
            data: {
                cleanerId: cleaners[3].id,
                userId: customers[1].id,
                rating: 5,
                comment: 'Youssef is super flexibel en spreekt goed Engels en Spaans. Zeer aan te bevelen!'
            }
        })
    ]);

    // 6. Create some booking requests
    console.log('📅 Creating sample booking requests...');
    const bookings = await Promise.all([
        prisma.bookingRequest.create({
            data: {
                userId: customers[0].id,
                houseId: houses[0].id,
                cleanerId: cleaners[0].id,
                cityId: cities[0].id,
                fullName: customers[0].name,
                phoneE164: customers[0].phone!,
                email: customers[0].email,
                preferredDate: new Date('2024-03-15T10:00:00Z'),
                serviceType: ServiceType.BASIC,
                duration: 4,
                totalPrice: 6000, // 60 euro in cents
                message: 'Graag een grondige schoonmaak voor aankomst van gasten.',
                status: 'CONFIRMED'
            }
        }),
        prisma.bookingRequest.create({
            data: {
                userId: customers[1].id,
                houseId: houses[1].id,
                cleanerId: cleaners[3].id,
                cityId: cities[5].id,
                fullName: customers[1].name,
                phoneE164: customers[1].phone!,
                email: customers[1].email,
                preferredDate: new Date('2024-03-20T14:00:00Z'),
                serviceType: ServiceType.DEEP,
                duration: 6,
                totalPrice: 9600, // 96 euro in cents
                message: 'Deep cleaning needed after renovation work.',
                status: 'PENDING'
            }
        })
    ]);

    console.log('✅ Database seeding completed!');
    console.log(`📍 Created ${cities.length} cities`);
    console.log(`👤 Created ${customers.length} customers`);
    console.log(`🏠 Created ${houses.length} houses`);
    console.log(`🧽 Created ${cleaners.length} cleaners`);
    console.log(`⭐ Created ${reviews.length} reviews`);
    console.log(`📅 Created ${bookings.length} bookings`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });