const Portfolio = () => {
    const portfolioItems = [
        {
            title: "Pran Spandan App",
            description: "Modern sweets store with responsive design for smooth shopping.",
            image: "/images/productImage/PranSpandan.png",
            logo: "/images/portfolio/lal-logo.png",

        },
        {
            title: "True Bite App",
            description: "TrueBite AI is a smart food companion app designed to help users decode the health impact of packaged food.",
            image: "/images/productImage/True_Bite_App.png",

        },
        {
            title: "BDEA: Bhartiya Driver Ekta Association App",
            description: "The Bhartiya Driver Ekta Association (BDEA) app was created for a community-driven organization dedicated to Indian drivers.",
            image: "/images/productImage/bdea.png",

        },
        {
            title: "Nursing Career & Community App",
            description: "It is a cross-platform mobile app built specifically for nursing professionals in Germany.",
            image: "/images/productImage/nursing.png",

        },
        {
            title: "Smart Vending & Food Ordering App",
            description: "This project involved building a complete cross-platform mobile solution (Android & iOS) for a vending business.",
            image: "/images/productImage/vending.png",

        },
        {
            title: "Cipl Perfume",
            description: "White-Label Perfume Manufacturing for Global Brands.",
            image: "/images/productImage/ciplperfume.png",
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <span className="px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-slate-600 bg-slate-50 border border-slate-100 rounded-full shadow-sm hover:bg-slate-100 transition-colors cursor-default">
                        Social Presence
                    </span>
                    <h2 className="text-3xl md:text-4xl font-medium text-slate-900 leading-tight">
                        Turning Visions Into Digital Reality
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {portfolioItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative shadow-md rounded-3xl border border-slate-100 p-6 md:p-8 transition-all duration-500 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden flex flex-col"
                        >
                            {/* Card Top: Mockup Area */}
                            <div className="relative rounded-2xl overflow-hidden border border-slate-100/50 shadow-sm bg-white mb-6">

                                {/* Background Image with Zoom Effect */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-contain transform transition-transform duration-700 "
                                />

                                {/* Color Overlay on Hover (optional, but adds premium feel) */}
                                <div className={`absolute inset-0 ${item.overlayColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                            </div>

                            {/* Card Bottom: Content */}
                            <div className="flex flex-col">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
