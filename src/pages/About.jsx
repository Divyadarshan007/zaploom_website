import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import FAQSection from "../components/FAQSection";

const teamMembers = [
    { name: "Kapil Singh", role: "Founder & CEO", image: "/images/team/Kapil_Singh.png" },
    { name: "Divyadarshan Das", role: "MERN Stack Developer", image: "/images/team/profile-img.png" },
    { name: "Aastha Negi", role: "UI/UX Designer", image: "/images/team/aastha_negi_1772693133049.png" },
    { name: "Aditya Agarwal", role: "Chief Operations Head", image: "/images/team/aditya_agarwal_1772693154919.png" },
    { name: "Utkarsh Rajoriya", role: "Full Stack Developer", image: "/images/team/utkarsh_rajoriya_1772693174230.png" },
    { name: "Tushar Rawat", role: "Frontend Dev", image: "/images/team/tushar_rawat_1772693116302.png" },
    { name: "Team Member", role: "Product Designer", image: "/images/team/team_member_5_1772693192902.png" },
    { name: "Team Member", role: "Backend Engineer", image: "/images/team/team_member_6_1772693214213.png" },
    { name: "Team Member", role: "Marketing Head", image: "/images/team/team_member_7_1772693230716.png" },
    { name: "Team Member", role: "Frontend Developer", image: "/images/team/team_member_8_1772693246406.png" },
];


const trustedLogos = [
    "1495155934_LUMIVE LOGO - medium - 03 (1).png",
    "Frame 270.png",
    "WhatsApp Image 2026-02-19 at 2.09.26 PM (2).jpeg",
    "cipl_logo (1).webp",
    "efiling logo.jpg (1).jpeg",
    "logo (2).svg",
];

const About = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-[url('/images/Bg2.png')] bg-no-repeat bg-cover bg-center pb-10">
                <Header />

                <div className="relative z-10 flex flex-col items-center justify-center pt-40 pb-16 px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-medium text-slate-900 font-clash-display tracking-tight leading-[1.1]">
                        About Us
                    </h1>
                    <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-gray-500 leading-relaxed">
                        We empower brands with technology and strategy to build products faster, smarter & stronger.
                        This is who we are and what drives us.
                    </p>
                </div>
            </section>

            {/* ═══════════════ SCROLLING TICKER ═══════════════ */}
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

            {/* ═══════════════ BUILDING THE DIGITAL FUTURE ═══════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    {/* Section Title */}
                    <div className="flex flex-col items-center mb-14">
                        <div className="w-16 h-[2px] bg-slate-900 mb-6"></div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 text-center tracking-tight font-clash-display">
                            Building the Digital Future
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-base md:text-lg leading-relaxed text-center">
                        <p>
                            At Zaploom, we are on a mission to redefine the digital experience. As a technology-first company, our focus is on creating groundbreaking products that bring value to businesses and individuals alike. Whether it's building custom websites, mobile apps, or enterprise-grade SaaS platforms, we combine innovation with excellence at every step.
                        </p>
                        <p>
                            Founded with a vision to deliver technology at its finest, Zaploom has quickly evolved into a trusted partner for brands across India and beyond. From startups to established enterprises, we help our clients harness the power of digital to drive growth, engagement, and impact.
                        </p>
                    </div>

                    {/* ── Who We Are ── */}
                    <div className="mt-20">
                        <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-8 font-clash-display italic">
                            Who We Are
                        </h3>
                        <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-base md:text-lg leading-relaxed text-center">
                            <p>
                                We are a team of passionate developers, designers, strategists, and creators who believe in the power of technology to transform businesses. Our team blends creativity with technical expertise — crafting solutions that are not just functional, but beautiful and scalable.
                            </p>
                            <p>
                                Our philosophy is simple: <strong className="text-slate-900">Develop it from Best. Develop it Once.</strong> We ensure that every project we take on is built on a foundation of quality, scalability, and modern best practices. From pixel-perfect UIs to robust backend architectures, we deliver end-to-end excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ TRUSTED BY 130K+ PEOPLE ═══════════════ */}
            <section className="py-10 bg-slate-50/50">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col items-center mb-14">
                        <span className="px-5 py-2 mb-6 text-xs font-semibold tracking-widest uppercase text-slate-500 bg-white border border-slate-200 rounded-full shadow-sm">
                            Our Reach
                        </span>
                        <h2 className="text-3xl md:text-4xl font-medium text-slate-900 text-center tracking-tight font-clash-display">
                            Trusted by companies worldwide
                        </h2>
                    </div>

                    {/* Logo carousel */}
                </div>
                <div className="w-full overflow-hidden rounded-2xl bg-white border border-slate-100  shadow-sm">
                    <div className="strip-left flex gap-16 items-center px-8">
                        {[...trustedLogos, ...trustedLogos].map((logo, index) => (
                            <img
                                key={index}
                                src={`/images/trustedby/${logo}`}
                                alt={`Trusted Brand ${index}`}
                                className={`${logo.includes('efiling') || logo.includes('1495155934_LUMIVE')
                                    ? 'h-16 md:h-24'
                                    : 'h-10 md:h-12'
                                    } w-auto object-contain flex-shrink-0  hover:grayscale-0 transition-all duration-300`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ TEAM BEHIND WONDERS ═══════════════ */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-20">
                        <span className="px-5 py-2 mb-8 text-xs font-semibold tracking-widest uppercase text-slate-500 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-default">
                            Our Team
                        </span>
                        <h2 className="text-3xl md:text-4xl font-medium text-slate-900 text-center tracking-tight leading-[1.1]">
                            Team Behind Wonders
                        </h2>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="group relative rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Image Container */}
                                <div className="aspect-[4/5] relative overflow-hidden bg-slate-100 rounded-[2rem]">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay Shadow */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                                    {/* Content Badge - Glassmorphism */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="backdrop-blur-md bg-white/80 border border-white/40 p-4 md:p-5 rounded-2xl shadow-xl transform transition-all duration-500 group-hover:bg-white/95 group-hover:px-6">
                                            <h3 className="text-sm md:text-lg font-bold text-slate-900 mb-0.5 tracking-tight truncate">
                                                {member.name}
                                            </h3>
                                            <p className="text-slate-600 text-xs md:text-sm font-medium tracking-wide truncate">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Shadow Effect */}
                                <div className="absolute inset-0 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ TESTIMONIALS ═══════════════ */}
            <TestimonialSection />

            {/* ═══════════════ FAQ ═══════════════ */}
            <FAQSection />

            {/* ═══════════════ FOOTER ═══════════════ */}
            <Footer />
        </div>
    );
};

export default About;