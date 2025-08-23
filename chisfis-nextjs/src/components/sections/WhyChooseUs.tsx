
import {
    ShieldCheckIcon,
    ClockIcon,
    CurrencyEuroIcon,
    ChatBubbleLeftRightIcon,
    HeartIcon,
    StarIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        icon: ShieldCheckIcon,
        title: "Volledig Gescreend",
        description: "Alle schoonmakers zijn gecontroleerd en hebben uitstekende referenties."
    },
    {
        icon: StarIcon,
        title: "Top Beoordelingen",
        description: "Alleen professionals met bewezen track record en 4.5+ sterren."
    },
    {
        icon: CurrencyEuroIcon,
        title: "Transparante Prijzen",
        description: "Geen verborgen kosten. Je weet precies wat je betaalt vooraf."
    },
    {
        icon: ClockIcon,
        title: "Flexibele Planning",
        description: "Boek wanneer het jou uitkomt, ook last-minute afspraken mogelijk."
    },
    {
        icon: ChatBubbleLeftRightIcon,
        title: "Meertalige Service",
        description: "Communicatie in Nederlands, Frans, Engels en Arabisch."
    },
    {
        icon: HeartIcon,
        title: "Klanttevredenheid",
        description: "98% van onze klanten is zeer tevreden en boekt opnieuw."
    }
];

export default function WhyChooseUs() {
    return (
        <div className="relative py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    Waarom CleanMorocco?
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                    De voordelen die onze klanten het meest waarderen
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="text-center group">
                        <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
                            <feature.icon className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}