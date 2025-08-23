"use client";

const steps = [
    {
        number: 1,
        title: "Formulier invullen",
        description: "Vul je gegevens en wensen in",
        icon: "📝",
        status: "active" // current step
    },
    {
        number: 2,
        title: "Matching proces",
        description: "Wij zoeken de perfecte schoonmaker",
        icon: "🔍",
        status: "pending"
    },
    {
        number: 3,
        title: "Contact & Planning",
        description: "Direct contact binnen 2 uur",
        icon: "📞",
        status: "pending"
    },
    {
        number: 4,
        title: "Schoonmaak",
        description: "Professionele uitvoering",
        icon: "✨",
        status: "pending"
    }
];

export default function BookingSteps() {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 lg:p-8">

            {/* Mobile version */}
            <div className="block lg:hidden">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Stap 1 van 4: Formulier invullen
                    </h2>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                </div>
            </div>

            {/* Desktop version */}
            <div className="hidden lg:block">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <div key={step.number} className="flex items-center">

                            {/* Step */}
                            <div className="flex flex-col items-center text-center">

                                {/* Circle */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold mb-3 ${
                                    step.status === 'active'
                                        ? 'bg-primary-600 text-white'
                                        : step.status === 'completed'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
                                }`}>
                                    {step.status === 'completed' ? '✓' : step.icon}
                                </div>

                                {/* Text */}
                                <div className="max-w-[120px]">
                                    <h3 className={`font-medium text-sm mb-1 ${
                                        step.status === 'active'
                                            ? 'text-primary-600'
                                            : 'text-neutral-900 dark:text-neutral-100'
                                    }`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-tight">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-600 mx-4 mt-[-20px]"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}