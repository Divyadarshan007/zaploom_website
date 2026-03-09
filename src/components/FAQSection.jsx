import { useState } from "react";

const faqData = [
    {
        question: "What services does Zaploom offer?",
        answer: "Zaploom offers end-to-end digital solutions including custom website development, mobile app development (Android & iOS), SaaS product development, UI/UX design, and digital strategy consulting. We build everything from scratch, tailored specifically to your business needs."
    },
    {
        question: "How long does it take to build a custom website or app?",
        answer: "The timeline depends on the project's scope and complexity. A standard website typically takes 2–4 weeks, while a full-featured mobile app or SaaS platform can take 6–12 weeks. We always provide a detailed project timeline before starting."
    },
    {
        question: "Do you provide post-launch support and maintenance?",
        answer: "Absolutely! We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, performance optimization, security updates, and feature enhancements to keep your product running at its best."
    },
    {
        question: "What technologies do you use for development?",
        answer: "We use modern, industry-leading technologies including React, Next.js, Node.js, Flutter, React Native, MongoDB, PostgreSQL, and cloud services like AWS and Firebase. We choose the best tech stack based on your project requirements."
    },
    {
        question: "Can I see progress during the development process?",
        answer: "Yes! We follow an agile development approach with regular updates and demo sessions. You'll have full visibility into the project progress through shared dashboards, weekly reviews, and a dedicated project manager."
    },
    {
        question: "How do I get started with Zaploom?",
        answer: "Getting started is easy! Simply reach out to us through our contact form, email, or phone. We'll schedule a free consultation call to understand your requirements and provide a detailed proposal with timeline and cost estimate."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                    {faqData.map((faq, index) => (
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
