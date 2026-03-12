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
        </div>
    );
};

export default Products;
