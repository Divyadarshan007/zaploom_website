import { useState, useEffect } from "react";
import { commonAPI } from "../lib/api";

const FAQSection = ({ product }) => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (product && product.faqs && product.faqs.length > 0) {
            setFaqs(product.faqs);
            setLoading(false);
        } else {
            const fetchGlobalFAQs = async () => {
                try {
                    const res = await commonAPI.getFAQs();
                    if (res.success) {
                        setFaqs(res.faqs);
                    }
                } catch (error) {
                    console.error("Failed to fetch FAQs", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchGlobalFAQs();
        }
    }, [product]);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (loading || faqs.length === 0) return null;

    return (
        <section className="py-20 bg-slate-50/50">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                {/* Badge */}
                <div className="flex flex-col items-center mb-14">
                    <span className="px-5 py-2 mb-8 text-xs font-semibold tracking-widest uppercase text-slate-500 bg-white border border-slate-200 rounded-full shadow-sm">
                        FAQ
                    </span>
                    <h2 className="text-3xl md:text-4xl font-medium text-slate-900 text-center tracking-tight font-clash-display">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-center text-gray-500 max-w-xl text-sm md:text-base leading-relaxed">
                        Find answers to common questions about our services, process, and how we can help bring your vision to life.
                    </p>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl border transition-all duration-300 ${openIndex === index
                                ? "border-slate-300 shadow-md"
                                : "border-slate-200 shadow-sm hover:shadow-md"
                                }`}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                            >
                                <span className="text-sm md:text-base font-semibold text-slate-800 pr-4">
                                    {faq.question}
                                </span>
                                <span
                                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${openIndex === index
                                        ? "bg-slate-900 text-white rotate-45"
                                        : "bg-slate-100 text-slate-500"
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
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
