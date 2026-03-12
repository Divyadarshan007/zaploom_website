import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Testimonial from "./Testimonial";
import { commonAPI } from "../lib/api";

const Products = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [products, setProducts] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, faqRes] = await Promise.all([
                    commonAPI.getProducts(),
                    commonAPI.getFAQs()
                ]);
                if (prodRes.success) {
                    const ownProducts = prodRes.products.filter(p => p.isOwnProduct);
                    setProducts(ownProducts);
                }
                if (faqRes.success) setFaqs(faqRes.faqs);
            } catch (error) {
                console.error("Failed to fetch products page data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getImageUrl = (url) => {
        if (!url) return "";
        if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("/images/")) return url;
        const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:5000";
        return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
    };

    const defaultFaqs = [
        {
            question: "What kind of SaaS products do you offer?",
            answer: "We offer a wide range of prebuilt SaaS solutions including grocery delivery, food ordering, ride sharing, eCommerce, on-demand services, pharmacy management, and restaurant ordering systems — all ready to deploy and fully customizable.",
        },
        {
            question: "Can I customize the prebuilt software to match my brand?",
            answer: "Absolutely! All our prebuilt solutions are fully customizable.",
        }
    ];

    const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

    return (
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            <Header />

            {/* ====== Hero Section ====== */}
            <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-[url('/images/Bg2.png')] bg-no-repeat bg-cover bg-center pb-10">
                <div className="relative z-10 flex flex-col items-center justify-center pt-40 pb-16 px-4 text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900 font-clash-display tracking-tight leading-[1.1]">
                       Turning Ideas into Scalable
                    </h1>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900 font-clash-display tracking-tight leading-[1.1] mt-2">
                        Products
                    </h1>
                    <p className="mt-5 max-w-lg mx-auto text-base md:text-lg text-gray-400 leading-relaxed">
                        Transform your ideas into powerful, scalable digital products with rapid development and reliable support.
                    </p>
                </div>
            </section>

            {/* ====== Scrolling Ticker ====== */}
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

            {/* ====== Products Section ====== */}
            <section className="py-20 md:py-28 bg-white relative z-10">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    {/* Section Header */}
                    <div className="flex flex-col items-center mb-20">
                        <span className="px-5 py-1.5 mb-5 text-sm font-medium tracking-wide text-slate-600 bg-slate-50 border border-slate-100 rounded-full shadow-sm">
                            Our Products
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 text-center font-clash-display leading-tight">
                            Check our Products
                        </h2>
                    </div>

                    {/* Product Cards */}
                    <div className="space-y-24 md:space-y-32">
                        {loading ? (
                            <div className="text-center py-20 text-slate-400">Loading our products...</div>
                        ) : products.map((product, index) => {
                            const isEven = index % 2 === 0;
                            const isTrueBite = product.title?.toLowerCase().includes("true bite") || product.slug?.includes("true-bite");
                            const learnMoreLink = isTrueBite 
                                ? "https://medium.com/@singhkapil/truebite-ai-smart-food-scanner-health-analyzer-3614cac4015e"
                                : (product.detailLink || "#");

                            return (
                                <div
                                    key={product._id || index}
                                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                        } items-center gap-10 md:gap-16 group`}
                                >
                                    {/* Image Side */}
                                    <div className="w-full md:w-1/2">
                                        <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                                            <img
                                                src={getImageUrl(product.image)}
                                                alt={product.title}
                                                className="w-full h-auto object-cover transition-transform duration-700 "
                                            />
                                        </div>
                                    </div>

                                    {/* Text Side */}
                                    <div className="w-full md:w-1/2">
                                        <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4 font-clash-display">
                                            {product.title}
                                        </h3>
                                        
                                        {product.features && product.features.length > 0 ? (
                                            <ul className="space-y-3 mb-8">
                                                {product.features.map((feature, fIdx) => (
                                                    <li key={fIdx} className="flex items-start gap-3 text-slate-600 text-sm md:text-base leading-relaxed">
                                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                                                        {feature.desc}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-8">
                                                {product.description || product.tagline}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap items-center gap-4">
                                            {product.category === "website" ? (
                                                <a
                                                    href={learnMoreLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 cursor-pointer border border-gray-700 shadow-sm"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                    </svg>
                                                    <div className="flex flex-col leading-tight">
                                                        <span className="text-[10px] text-gray-400 font-normal">VISIT US ON</span>
                                                        <span className="text-sm font-semibold">Website</span>
                                                    </div>
                                                </a>
                                            ) : (
                                                <div className="flex flex-wrap gap-3">
                                                    {product.androidLink && (
                                                        <a
                                                            href={product.androidLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 cursor-pointer border border-gray-700 shadow-sm"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" viewBox="0 0 512 512" fill="currentColor">
                                                                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l2.6 1.5 247.1-247v-5.8L47 0zm425 225L371.7 173l-61.8 61.8 61.8 61.8L472 244c12.7-7.3 12.7-19.5 0-19z" fill="#EA4335" />
                                                                <path d="M325.3 234.3L104.6 13l-57.6 57.6 278.3 163.7z" fill="#FBBC04" />
                                                                <path d="M47 512c13 6.8 29.6 5.8 47-5.8L371.7 305.5l-46.4-46.4L47 512z" fill="#34A853" />
                                                                <path d="M472 244l-100.3-57.6-61.8 61.8 61.8 61.8L472 252c6.3-3.6 9.7-8.5 9.7-14s-3.4-10.4-9.7-14z" fill="#4285F4" />
                                                            </svg>
                                                            <div className="flex flex-col leading-tight">
                                                                <span className="text-[10px] text-gray-400 font-normal">GET IT ON</span>
                                                                <span className="text-sm font-semibold">Google Play</span>
                                                            </div>
                                                        </a>
                                                    )}
                                                    {product.iosLink && (
                                                        <a
                                                            href={product.iosLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-3 px-5 py-2.5 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 cursor-pointer border border-gray-700 shadow-sm"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                                            </svg>
                                                            <div className="flex flex-col leading-tight">
                                                                <span className="text-[10px] text-gray-400 font-normal">Download on the</span>
                                                                <span className="text-sm font-semibold">App Store</span>
                                                            </div>
                                                        </a>
                                                    )}
                                                    {isTrueBite && (
                                                        <Link
                                                            target="_blank"
                                                            to={learnMoreLink}
                                                            className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 cursor-pointer border border-slate-700 shadow-sm"
                                                        >
                                                            <div className="flex flex-col leading-tight">
                                                                <span className="text-[10px] text-gray-400 font-normal">READ MORE ON</span>
                                                                <span className="text-sm font-semibold">Medium</span>
                                                            </div>
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <Testimonial />


            {/* ====== FAQ Section ====== */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col items-start mb-12">
                        <h2 className="text-3xl md:text-4xl font-medium text-slate-900 font-clash-display leading-tight">
                            Frequently Asked
                        </h2>
                        <h2 className="text-3xl md:text-4xl font-medium text-slate-900 font-clash-display leading-tight">
                            Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {displayFaqs.map((faq, index) => (
                            <div
                                key={faq._id || index}
                                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-300"
                            >
                                <button
                                    onClick={() =>
                                        setOpenFaq(openFaq === index ? null : index)
                                    }
                                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                                >
                                    <span className="text-sm md:text-base font-medium text-slate-800 pr-4">
                                        {faq.question}
                                    </span>
                                    <span
                                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index
                                            ? "bg-slate-900 text-white rotate-45"
                                            : "bg-slate-100 text-slate-600"
                                            }`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                            />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openFaq === index
                                        ? "max-h-60 opacity-100"
                                        : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== Footer ====== */}
            <Footer />
        </div>
    );
};

export default Products;
