import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialSection from "../components/TestimonialSection";
import FAQSection from "../components/FAQSection";
import { commonAPI } from "../lib/api";
import { getImageUrl } from "../lib/utils";

const About = () => {
    const [settings, setSettings] = useState(null);
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, teamRes] = await Promise.all([
                    commonAPI.getAboutSettings(),
                    commonAPI.getTeam()
                ]);
                if (settingsRes.success) setSettings(settingsRes.settings);
                if (teamRes.success) setTeam(teamRes.teamMembers);
            } catch (error) {
                console.error("Failed to fetch about data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const trustedLogos = [
        "1495155934_LUMIVE LOGO - medium - 03 (1).png",
        "Frame 270.png",
        "WhatsApp Image 2026-02-19 at 2.09.26 PM (2).jpeg",
        "cipl_logo (1).webp",
        "efiling logo.jpg (1).jpeg",
        "logo (2).svg",
    ];

    const teamToShow = team.length > 0 ? team : [
        { _id: 1, name: "Kapil Singh", position: "Founder & CEO", photo: "/images/team/Kapil_Singh.png" },
        { _id: 2, name: "Divyadarshan Das", position: "MERN Stack Developer", photo: "/images/team/profile-img.png" }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl font-medium text-slate-600 animate-pulse">Loading about us...</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-[url('/images/Bg2.png')] bg-no-repeat bg-cover bg-center pb-10">
                <Header />

                <div className="relative z-10 flex flex-col items-center justify-center pt-40 pb-16 px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-medium text-slate-900 font-clash-display tracking-tight leading-[1.1]">
                        {settings?.hero?.heading || "About Us"}
                    </h1>
                    <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-gray-500 leading-relaxed">
                        {settings?.hero?.subheading || "We empower brands with technology and strategy to build products faster, smarter & stronger."}
                    </p>
                </div>
            </section>

            {/* ═══════════════ SCROLLING TICKER ═══════════════ */}
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

            {/* ═══════════════ BUILDING THE DIGITAL FUTURE ═══════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    {/* Section Title */}
                    <div className="flex flex-col items-center mb-14">
                        <div className="w-16 h-[2px] bg-slate-900 mb-6"></div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 text-center tracking-tight font-clash-display">
                            {settings?.story?.title || "Building the Digital Future"}
                        </h2>
                    </div>

                    <div
                        className="max-w-4xl mx-auto space-y-6 text-gray-600 text-base md:text-lg leading-relaxed text-center"
                        dangerouslySetInnerHTML={{ __html: settings?.story?.content || `<p>At Zaploom, we are on a mission to redefine the digital experience...</p>` }}
                    />

                    {/* ── Mission/Vision ── */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-clash-display">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed">{settings?.mission || "To provide groundbreaking products that bring value to businesses."}</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-clash-display">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed">{settings?.vision || "To be the most trusted technology partner for brands worldwide."}</p>
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
                </div>
                <div className="w-full overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <div className="strip-left flex gap-16 items-center px-8">
                        {[...trustedLogos, ...trustedLogos].map((logo, index) => (
                            <img
                                key={index}
                                src={`/images/trustedby/${logo}`}
                                alt={`Trusted Brand ${index}`}
                                className={`${logo.includes('efiling') || logo.includes('1495155934_LUMIVE')
                                    ? 'h-16 md:h-24'
                                    : 'h-10 md:h-12'
                                    } w-auto object-contain flex-shrink-0`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ TEAM BEHIND WONDERS ═══════════════ */}
            <section className="py-24 bg-white overflow-hidden" id="team">
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
                        {teamToShow.map((member) => (
                            <div
                                key={member._id}
                                className="group relative rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden bg-slate-100 rounded-[2rem]">
                                    <img
                                        src={getImageUrl(member.photo || member.image)}
                                        alt={member.name}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="backdrop-blur-md bg-white/80 border border-white/40 p-4 md:p-5 rounded-2xl shadow-xl transform transition-all duration-500 group-hover:bg-white/95 group-hover:px-6">
                                            <h3 className="text-sm md:text-lg font-bold text-slate-900 mb-0.5 tracking-tight truncate">
                                                {member.name}
                                            </h3>
                                            <p className="text-slate-600 text-xs md:text-sm font-medium tracking-wide truncate">
                                                {member.position || member.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TestimonialSection />
            <FAQSection />
            <Footer />
        </div>
    );
};

export default About;
