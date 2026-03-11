import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import FAQSection from "../components/FAQSection";
import { commonAPI } from "../lib/api";

const tabs = ["Websites", "Applications"];

const Customized = () => {
    const [activeTab, setActiveTab] = useState("Websites");
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await commonAPI.getProducts();
                if (res.success) setProjects(res.products);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter((p) =>
        activeTab === "Websites"
            ? p.category === "website"
            : p.category === "app"
    );

    return (
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            <Header />
            <main className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-[url('/images/Bg2.png')] bg-no-repeat bg-cover bg-center pb-10">

                {/* Hero Section */}
                <div className="relative z-10 flex flex-col items-center gap-5 justify-center pt-40 pb-16 px-4 text-center">
                    <h1 className="text-5xl md:text-5xl lg:text-7xl font-medium text-slate-900 leading-[1.1] font-clash-display tracking-tight">
                        Customized Development <br />
                        <span className="text-slate-800">From Scratch</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl md:text-xl lg:text-lg text-gray-500 leading-relaxed font-clash-display opacity-80">
                        We transform your unique ideas into powerful, scalable applications. Our team crafts tailor-made software solutions designed specifically for your business needs, from the first line of code to the final launch.
                    </p>
                </div>
            </main>

            {/* Scrolling Ticker */}
            <div className="w-full bg-slate-900 py-4 md:py-5 overflow-hidden relative z-20">
                <div className="animate-ticker flex items-center whitespace-nowrap">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            <span className="text-white text-xl md:text-2xl font-medium tracking-wider uppercase font-clash-display mx-6 md:mx-10">
                                RAPID DEVELOPMENT • CONTINUOUS SUPPORT
                            </span>
                            <span className="text-slate-500 text-xl md:text-2xl">
                                •
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ====== Our Top Projects Section ====== */}
            <section className="py-20 bg-white relative z-10">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    {/* Section Header */}
                    <div className="flex flex-col items-center mb-14">
                        <span className="px-5 py-1.5 mb-8 text-sm font-medium tracking-wide text-slate-600 bg-white border border-slate-200 rounded-full shadow-sm">
                            Projects
                        </span>
                        <h2 className="text-4xl md:text-5xl font-medium text-slate-900 font-clash-display tracking-tight">
                            Our Top Projects
                        </h2>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center justify-center gap-3 mb-16">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-7 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border ${activeTab === tab
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Project Cards - Alternating Zigzag Layout */}
                    <div className="space-y-20">
                        {filteredProjects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={project.title}
                                    className={`flex flex-col ${isEven
                                        ? "md:flex-row"
                                        : "md:flex-row-reverse"
                                        } items-center gap-8 md:gap-14`}
                                >
                                    {/* Image Side */}
                                    <div className="w-full md:w-1/2 group">
                                        <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-auto object-cover transition-transform duration-700 "
                                            />
                                        </div>
                                    </div>

                                    {/* Text Side */}
                                    <div className="w-full md:w-1/2">
                                        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 font-clash-display">
                                            {project.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            {project.features.map(
                                                (feature, pIdx) => (
                                                    <li
                                                        key={pIdx}
                                                        className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
                                                    >
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                                                        {feature.desc}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <div className="mt-6 flex items-center gap-3">
                                            {project.category === "website" ? (
                                                <a
                                                    href={project.detailLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-3 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 cursor-pointer border border-gray-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                    </svg>
                                                    <div className="flex flex-col leading-tight">
                                                        <span className="text-[10px] text-gray-300 font-normal">VISIT US ON</span>
                                                        <span className="text-sm font-semibold">Website</span>
                                                    </div>
                                                </a>
                                            ) : (
                                                <>
                                                    <a
                                                        href={project.androidLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-3 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 cursor-pointer border border-gray-700"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" viewBox="0 0 512 512" fill="currentColor">
                                                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l2.6 1.5 247.1-247v-5.8L47 0zm425 225L371.7 173l-61.8 61.8 61.8 61.8L472 244c12.7-7.3 12.7-19.5 0-19z" fill="#EA4335"/>
                                                            <path d="M325.3 234.3L104.6 13l-57.6 57.6 278.3 163.7z" fill="#FBBC04"/>
                                                            <path d="M47 512c13 6.8 29.6 5.8 47-5.8L371.7 305.5l-46.4-46.4L47 512z" fill="#34A853"/>
                                                            <path d="M472 244l-100.3-57.6-61.8 61.8 61.8 61.8L472 252c6.3-3.6 9.7-8.5 9.7-14s-3.4-10.4-9.7-14z" fill="#4285F4"/>
                                                        </svg>
                                                        <div className="flex flex-col leading-tight">
                                                            <span className="text-[10px] text-gray-300 font-normal">GET IT ON</span>
                                                            <span className="text-sm font-semibold">Google Play</span>
                                                        </div>
                                                    </a>
                                                    <a
                                                        href={project.iosLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-3 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 cursor-pointer border border-gray-700"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                                        </svg>
                                                        <div className="flex flex-col leading-tight">
                                                            <span className="text-[10px] text-gray-300 font-normal">Download on the</span>
                                                            <span className="text-sm font-semibold">App Store</span>
                                                        </div>
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <TestimonialSection />
            <FAQSection />

            <Footer />
        </div>
    );
};

export default Customized;