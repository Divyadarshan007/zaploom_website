import { useState, useEffect } from "react";
import { commonAPI } from "../lib/api";

const Feature = () => {
    const [services, setServices] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, servicesRes] = await Promise.all([
                    commonAPI.getHomeSettings(),
                    commonAPI.getServices(true)
                ]);
                
                if (settingsRes.success) setSettings(settingsRes.settings);
                if (servicesRes.success) setServices(servicesRes.services);
            } catch (error) {
                console.error("Failed to fetch features", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const displayServices = services.length > 0 ? services : [
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

    const getImageUrl = (url) => {
        if (!url) return "";
        if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("/images/") || url.startsWith("/gifs/")) return url;
        const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:5000";
        return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
    };

    if (loading && !settings) return null;

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col items-center mb-16">
                    <span className="px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-slate-600 bg-slate-50 border border-slate-100 rounded-full shadow-sm hover:bg-slate-100 transition-colors cursor-default">
                        Features
                    </span>
                    <h2 className="text-3xl md:text-4xl font-medium text-slate-900 text-center max-w-2xl leading-tight font-clash-display">
                        {settings?.features?.heading || "End-to-End Technology Solutions for Your Growing Business"}
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {displayServices.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#F8FDF9] rounded-3xl border border-slate-100 p-8 md:p-10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden flex flex-col"
                        >
                            {/* Card Content */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium text-sm">
                                    {service.description}
                                </p>
                            </div>

                            {/* Image Container with Zoom Effect */}
                            <div className="mt-auto relative rounded-2xl overflow-hidden border border-slate-100/50 shadow-sm bg-white aspect-video flex items-center justify-center">
                                {service.image ? (
                                    <img
                                        src={getImageUrl(service.image)}
                                        alt={service.alt || service.title}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="text-slate-300">No Image</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Feature
