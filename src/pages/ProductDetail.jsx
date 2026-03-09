import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import FAQSection from "../components/FAQSection";
import { products } from "../data/products";

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = products.find((p) => p.slug === slug);
        setProduct(foundProduct);
        window.scrollTo(0, 0);
    }, [slug]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-medium text-slate-600">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            <Header />

            {/* ====== Hero Section ====== */}
            <section className="relative pt-32 pb-20 px-4 bg-grid">
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-clash-display max-w-4xl tracking-tight leading-tight">
                        {product.title} <br />
                        <span className="text-slate-800">Complete Solution</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
                        Launch your own {product.title.toLowerCase()} marketplace with our fully customizable solution from Zaploom.
                    </p>

                    <div className="mt-12 relative max-w-xs md:max-w-sm mx-auto">
                        <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="relative z-10 w-full h-auto drop-shadow-2xl animate-float"
                        />
                    </div>
                </div>
            </section>

            {/* ====== Scrolling Ticker ====== */}
            <div className="w-full bg-slate-900 py-4 overflow-hidden relative z-20">
                <div className="animate-ticker flex items-center whitespace-nowrap">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex items-center mx-10">
                            <span className="text-white text-lg font-medium tracking-wider uppercase">
                                Develop it from Best • Develop it Once
                            </span>
                            <span className="mx-6 text-slate-500">•</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ====== Enquiry Form Section ====== */}
            <section className="py-20 bg-slate-50 relative">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 flex flex-col items-center">
                        <h2 className="text-3xl font-bold text-slate-900 font-clash-display mb-8">
                            Send us your Enquiry
                        </h2>
                        <form className="w-full max-w-2xl space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-slate-700">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                                    />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-slate-700">Email Address *</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-sm font-medium text-slate-700">Phone</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your number"
                                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                                />
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-sm font-medium text-slate-700">Message</label>
                                <textarea
                                    rows="1"
                                    placeholder="Enter your message"
                                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                                ></textarea>
                            </div>
                            <button className="w-full py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors uppercase tracking-widest text-sm">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* ====== What We Offer Section ====== */}
            <section className="py-24 bg-white px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <span className="px-5 py-1.5 mb-5 text-sm font-medium tracking-wide text-blue-600 bg-blue-50 border border-blue-100 rounded-full inline-block">
                        What All We Offer
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-clash-display mb-12">
                        Features we offer in our App and System
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {product.features.map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 text-left">{feature.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed text-left mb-6">
                                    {feature.desc}
                                </p>
                                <button className="w-full py-2 bg-slate-900 text-white rounded-full text-xs font-semibold uppercase tracking-wider group-hover:bg-blue-600 transition-colors">
                                    Read More
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== Why Choose Section ====== */}
            <section className="py-24 bg-slate-50 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <span className="px-5 py-1.5 text-sm font-medium tracking-wide text-blue-600 bg-blue-50 border border-blue-100 rounded-full inline-block">
                                Why Choose
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-clash-display">
                                Why Choose Zaploom?
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Curate an engaging customer experience. At Zaploom, we provide the best solutions for your business.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-100 shadow-sm">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-slate-900">Customize According to Need</h4>
                                    <p className="text-slate-500 text-xs">Modify the software to match your specific business goals.</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-100 shadow-sm">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-slate-900">Quick Deployment</h4>
                                    <p className="text-slate-500 text-xs">Launch your business in weeks, not years.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-white rounded-3xl p-4 shadow-2xl relative z-10">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-auto rounded-2xl"
                                />
                            </div>
                            <div className="absolute -top-10 -right-10 w-2/3 bg-white rounded-3xl p-2 shadow-2xl z-20 hidden md:block border-4 border-white">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-auto rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== Tech Stack Section ====== */}
            <section className="py-24 bg-white px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-clash-display mb-8">
                        Built with Modern Technology for Cross Platform Performance
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto mb-16">
                        Our software is built with the latest technology stacks to ensure smooth performance across all devices and platforms.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mt-12 max-w-4xl mx-auto">
                        {product.techStack.map((tech, idx) => (
                            <div
                                key={idx}
                                className="group relative flex flex-col items-center justify-center"
                            >
                                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                                    {tech.icon ? (
                                        <img
                                            src={tech.icon}
                                            alt={tech.name}
                                            className="w-10 h-10 object-contain p-1"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                    ) : null}
                                    <span className={`text-[10px] font-bold text-slate-400 uppercase tracking-tighter text-center px-2 ${tech.icon ? 'hidden' : 'block'}`}>
                                        {tech.name}
                                    </span>
                                </div>
                                <span className="mt-3 text-xs font-semibold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== Testimonials ====== */}
            <TestimonialSection />

            {/* ====== FAQ Section ====== */}
            <FAQSection product={product} />

            <Footer />
        </div>
    );
};

export default ProductDetail;