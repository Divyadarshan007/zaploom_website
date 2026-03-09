import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import FAQSection from "../components/FAQSection";

const projects = [
    {
        title: "Pran Spandan App",
        category: "app",
        image: "/images/productImage/PranSpandan.png",
        points: [
            "Modern sweets store with responsive design for smooth shopping.",
            "Intuitive product catalog with categories and search functionality.",
            "Seamless ordering system with real-time order tracking.",
            "Integrated payment gateway for secure transactions.",
        ],
    },
    {
        title: "True Bite App",
        category: "app",
        image: "/images/productImage/True_Bite_App.png",
        points: [
            "TrueBite AI is a smart food companion app designed to help users decode the health impact of packaged food.",
            "AI-powered food label scanner with instant health insights.",
            "Personalized dietary recommendations based on user preferences.",
            "Comprehensive nutritional database with detailed breakdowns.",
        ],
    },
    {
        title: "BDEA: Bhartiya Driver Ekta Association App",
        category: "app",
        image: "/images/productImage/bdea.png",
        points: [
            "Community-driven organization app dedicated to Indian drivers.",
            "Member registration, ID cards, and community networking features.",
            "Emergency assistance and grievance redressal system.",
            "News feed and event management for driver community updates.",
        ],
    },
    {
        title: "Nursing Career & Community App",
        category: "app",
        image: "/images/productImage/nursing.png",
        points: [
            "Cross-platform mobile app built specifically for nursing professionals in Germany.",
            "Job listing aggregation with smart filters and notifications.",
            "Professional networking and community forum features.",
            "Career guidance tools and certification tracking dashboard.",
        ],
    },
    {
        title: "Smart Vending & Food Ordering App",
        category: "app",
        image: "/images/productImage/vending.png",
        points: [
            "Complete cross-platform mobile solution for a vending business (Android & iOS).",
            "Real-time vending machine inventory monitoring and management.",
            "QR-code based contactless payment and ordering system.",
            "Admin dashboard with sales analytics and restock alerts.",
        ],
    },
    {
        title: "Cipl Perfume",
        category: "website",
        image: "/images/productImage/ciplperfume.png",
        points: [
            "White-Label Perfume Manufacturing for Global Brands.",
            "Elegant product showcase with immersive visual experience.",
            "Custom inquiry and bulk order management system.",
            "SEO-optimized pages for global brand visibility.",
        ],
    },
];

const tabs = ["Websites", "Applications"];

const Customized = () => {
    const [activeTab, setActiveTab] = useState("Websites");

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
            <div className="w-full overflow-hidden relative z-20">
                <div className="animate-ticker flex items-center whitespace-nowrap">
                    {[...Array(6)].map((_, i) => (
                        <img
                            key={i}
                            src="/images/Developer.png"
                            alt="Develop it from Best • Develop it Once"
                            className="h-[70px] md:h-[80px] w-auto flex-shrink-0"
                        />
                    ))}
                    {[...Array(6)].map((_, i) => (
                        <img
                            key={`dup-${i}`}
                            src="/images/Developer.png"
                            alt="Develop it from Best • Develop it Once"
                            className="h-[70px] md:h-[80px] w-auto flex-shrink-0"
                        />
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
                                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            />
                                        </div>
                                    </div>

                                    {/* Text Side */}
                                    <div className="w-full md:w-1/2">
                                        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 font-clash-display">
                                            {project.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            {project.points.map(
                                                (point, pIdx) => (
                                                    <li
                                                        key={pIdx}
                                                        className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
                                                    >
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                                                        {point}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <button className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all duration-300 hover:gap-3 cursor-pointer">
                                            {project.category === "website" ? "View Website" : "View App"}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
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