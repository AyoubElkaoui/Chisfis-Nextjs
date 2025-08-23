import {
    UserGroupIcon,
    ClipboardDocumentListIcon,
    MapPinIcon,
    ClockIcon,
    ArrowTrendingUpIcon  // ← GEWIJZIGD: van TrendingUpIcon naar ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

interface Stats {
    totalCleaners: number;
    activeCleaners: number;
    totalBookings: number;
    pendingBookings: number;
    totalCities: number;
}

interface Props {
    stats: Stats;
}

export default function StatsCards({ stats }: Props) {
    const cards = [
        {
            title: 'Totaal Schoonmakers',
            value: stats.totalCleaners,
            subtitle: `${stats.activeCleaners} actief`,
            icon: UserGroupIcon,
            color: 'blue',
            trend: '+12%'
        },
        {
            title: 'Boekingen',
            value: stats.totalBookings,
            subtitle: `${stats.pendingBookings} wachtend`,
            icon: ClipboardDocumentListIcon,
            color: 'green',
            trend: '+8%'
        },
        {
            title: 'Steden',
            value: stats.totalCities,
            subtitle: 'Actieve locaties',
            icon: MapPinIcon,
            color: 'purple',
            trend: '+2%'
        },
        {
            title: 'Response Tijd',
            value: '2.4u',
            subtitle: 'Gemiddeld',
            icon: ClockIcon,
            color: 'orange',
            trend: '-15%'
        }
    ];

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'blue':
                return {
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                    icon: 'text-blue-600 dark:text-blue-400',
                    trend: 'text-blue-600'
                };
            case 'green':
                return {
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    icon: 'text-green-600 dark:text-green-400',
                    trend: 'text-green-600'
                };
            case 'purple':
                return {
                    bg: 'bg-purple-50 dark:bg-purple-900/20',
                    icon: 'text-purple-600 dark:text-purple-400',
                    trend: 'text-purple-600'
                };
            case 'orange':
                return {
                    bg: 'bg-orange-50 dark:bg-orange-900/20',
                    icon: 'text-orange-600 dark:text-orange-400',
                    trend: 'text-orange-600'
                };
            default:
                return {
                    bg: 'bg-neutral-50 dark:bg-neutral-800',
                    icon: 'text-neutral-600 dark:text-neutral-400',
                    trend: 'text-neutral-600'
                };
        }
    };

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
                const colors = getColorClasses(card.color);

                return (
                    <div
                        key={index}
                        className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                                <card.icon className={`w-6 h-6 ${colors.icon}`} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${colors.trend}`}>
                                <ArrowTrendingUpIcon className="w-4 h-4" />
                                {card.trend}
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                                {card.title}
                            </h3>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                {card.value}
                            </div>
                            <p className="text-sm text-neutral-500">
                                {card.subtitle}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}