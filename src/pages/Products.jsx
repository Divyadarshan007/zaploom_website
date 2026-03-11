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
                if (prodRes.success) setProducts(prodRes.products);
                if (faqRes.success) setFaqs(faqRes.faqs);
            } catch (error) {
                console.error("Failed to fetch products page data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                    <div className="space-y-20 md:space-y-28">
                        {loading ? (
                            <div className="text-center py-20 text-slate-400">Loading our products...</div>
                        ) : products.map((product, index) => (
                            <div
                                key={product._id || index}
                                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } items-center gap-10 md:gap-16 group`}
                            >
                                {/* Text Content */}
                                <div className="flex-1 space-y-5">
                                    <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 font-clash-display group-hover:text-blue-600 transition-colors duration-300">
                                        {product.title}
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                                        {product.description || product.tagline}
                                    </p>
                                    <Link
                                        target="blank"
                                        to={``}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all duration-300 active:scale-95 group/btn"
                                    >
                                        Learn More
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </Link>
                                </div>

                                {/* Image */}
                                <div className="flex-1 relative w-full">
                                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 aspect-video flex items-center justify-center">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain transition-transform duration-700 "
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
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

            {/* ====== Floating Social Icons ====== */}
            <a
                href="https://www.instagram.com/zaploom"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 left-6 z-50 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-transform"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
            </a>

            <a
                href="https://wa.me/918509068030"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
            </a>
        </div>
    );
};

export default Products;
