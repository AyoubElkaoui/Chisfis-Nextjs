import * as React from 'react';

interface Props {
    fullName: string;
    phoneE164: string;
    cityName: string;
    preferredDate: string;
    cleanerName?: string | null;
    message?: string | null;
}

export default function BookingRequestEmail({
                                                fullName,
                                                phoneE164,
                                                cityName,
                                                preferredDate,
                                                cleanerName,
                                                message
                                            }: Props) {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '24px',
                textAlign: 'center',
                borderRadius: '8px 8px 0 0'
            }}>
                <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>
                    🧽 Nieuwe Boekingsaanvraag
                </h1>
                <p style={{ margin: '8px 0 0', opacity: '0.9' }}>
                    CleanMorocco - Schoonmaakdiensten
                </p>
            </div>

            {/* Content */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '32px',
                borderRadius: '0 0 8px 8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>

                <h2 style={{ color: '#374151', marginBottom: '24px', fontSize: '20px' }}>
                    📋 Aanvraagdetails
                </h2>

                <div style={{ marginBottom: '32px' }}>

                    <div style={{ marginBottom: '16px' }}>
                        <strong style={{ color: '#374151' }}>👤 Klant:</strong><br />
                        <span style={{ fontSize: '18px', color: '#059669' }}>{fullName}</span>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <strong style={{ color: '#374151' }}>📞 Telefoon:</strong><br />
                        <a href={`tel:${phoneE164}`} style={{
                            color: '#3B82F6',
                            textDecoration: 'none',
                            fontSize: '16px'
                        }}>
                            {phoneE164}
                        </a>
                        {' '} | {' '}
                        <a href={`https://wa.me/${phoneE164.replace(/\D/g, '')}`} style={{
                            color: '#10B981',
                            textDecoration: 'none'
                        }}>
                            WhatsApp
                        </a>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <strong style={{ color: '#374151' }}>📍 Locatie:</strong><br />
                        <span style={{ fontSize: '16px' }}>{cityName}</span>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <strong style={{ color: '#374151' }}>📅 Gewenste Datum:</strong><br />
                        <span style={{ fontSize: '16px', color: '#7C2D12' }}>
                            {new Date(preferredDate).toLocaleDateString('nl-NL', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    {cleanerName && (
                        <div style={{ marginBottom: '16px' }}>
                            <strong style={{ color: '#374151' }}>🧽 Gevraagde Schoonmaker:</strong><br />
                            <span style={{ fontSize: '16px', color: '#7C2D12', fontWeight: '600' }}>
                                {cleanerName}
                            </span>
                        </div>
                    )}

                    {message && (
                        <div style={{ marginBottom: '16px' }}>
                            <strong style={{ color: '#374151' }}>💬 Bericht:</strong><br />
                            <div style={{
                                backgroundColor: '#F9FAFB',
                                padding: '12px',
                                borderRadius: '6px',
                                borderLeft: '4px solid #3B82F6',
                                marginTop: '8px',
                                fontStyle: 'italic'
                            }}>
                                {message}
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div style={{ textAlign: 'center', marginTop: '32px' }}>

                    <a href={`tel:${phoneE164}`} style={{
                        display: 'inline-block',
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        padding: '12px 24px',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        margin: '0 8px 8px'
                    }}>
                        📞 Bel Klant
                    </a>

                    <a href={`https://wa.me/${phoneE164.replace(/\D/g, '')}`} style={{
                        display: 'inline-block',
                        backgroundColor: '#10B981',
                        color: 'white',
                        padding: '12px 24px',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        margin: '0 8px 8px'
                    }}>
                        💬 WhatsApp
                    </a>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: '40px',
                    paddingTop: '24px',
                    borderTop: '1px solid #E5E7EB',
                    textAlign: 'center',
                    color: '#6B7280',
                    fontSize: '14px'
                }}>
                    <p>🏠 <strong>CleanMorocco</strong> - Professionele schoonmaakdiensten</p>
                    <p style={{ margin: '8px 0' }}>
                        Aanvraag ontvangen op {new Date().toLocaleDateString('nl-NL', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                    </p>
                </div>
            </div>
        </div>
    );
}