const Feature = () => {
    const features = [
        {
            title: "Custom Development",
            description: "Monitor your finances live with clear, intuitive dashboards.",
            image: "/images/feature-custom.png",
            alt: "Custom Development Mockup"
        },
        {
            title: "SaaS Prebuilt @ 50,000 /-",
            description: "Monitor your finances live with clear, intuitive dashboards.",
            image: "/images/feature-saas.png",
            alt: "SaaS Prebuilt Mockup"
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16">
                    <span className="px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-slate-600 bg-slate-50 border border-slate-100 rounded-full shadow-sm hover:bg-slate-100 transition-colors cursor-default">
                        Features
                    </span>
                    <h2 className="text-3xl md:text-4xl font-medium text-slate-900 text-center max-w-2xl leading-tight">
                        Streamline Business with our Flexible Options
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#F8FDF9] rounded-3xl border border-slate-100 p-8 md:p-10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden flex flex-col"
                        >
                            {/* Card Content */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Image Container with Zoom Effect */}
                            <div className="mt-auto relative rounded-2xl overflow-hidden border border-slate-100/50 shadow-sm bg-white">
                                <img
                                    src={feature.image}
                                    alt={feature.alt}
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Feature