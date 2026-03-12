import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useState, useEffect } from "react"
import { commonAPI } from "../lib/api"

const Hero = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await commonAPI.getHomeSettings();
                if (res.success) {
                    setSettings(res.settings);
                }
            } catch (error) {
                console.error("Failed to fetch hero settings", error);
            }
        };
        fetchSettings();
    }, []);

    const heroData = settings?.hero || {
        heading: "Launch, Build, and Grow Your Business with Zaploom",
        subheading: "",
        primaryCTA: { label: "Let's Explore", href: "/customized" },
        secondaryCTA: { label: "Contact Us", href: "/contact" }
    };

    return (
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-[url('/images/Bg2.png')] bg-no-repeat bg-cover bg-center">
                <Header />
                <div className="relative z-10 flex flex-col items-center gap-5 justify-center pt-40  px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-medium text-center max-w-4xl">
                        {heroData.heading}
                    </h1>
                    {heroData.subheading && (
                        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mt-4">
                            {heroData.subheading}
                        </p>
                    )}

                    <div className="mt-10 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex gap-4">
                            <button onClick={() => navigate(heroData.primaryCTA?.href || '/customized')} className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-colors">
                                {heroData.primaryCTA?.label || "Let's Explore"}
                            </button>
                            <button onClick={() => navigate(heroData.secondaryCTA?.href || '/contact')} className="border border-neutral-300 px-8 py-4 rounded-full font-medium hover:bg-neutral-50 transition-colors">
                                {heroData.secondaryCTA?.label || "Contact Us"}
                            </button>
                        </div>
                    </div>
                    <div className="mt-16 flex items-center gap-4">
                        <p className="text-neutral-600 font-medium">
                            Trusted by companies worldwide
                        </p>
                    </div>
                </div>
            </section>
            <div className="flex flex-col items-center space-y-6 w-full ">
                <div className="w-full overflow-hidden">
                    <div className="strip-left flex gap-12 items-center">
                        {[
                            "1495155934_LUMIVE LOGO - medium - 03 (1).png",
                            "Frame 270.png",
                            "WhatsApp Image 2026-02-19 at 2.09.26 PM (2).jpeg",
                            "cipl_logo (1).webp",
                            "efiling logo.jpg (1).jpeg",
                            "logo (2).svg",
                            "1495155934_LUMIVE LOGO - medium - 03 (1).png",
                            "Frame 270.png",
                            "WhatsApp Image 2026-02-19 at 2.09.26 PM (2).jpeg",
                            "cipl_logo (1).webp",
                            "efiling logo.jpg (1).jpeg",
                            "logo (2).svg",
                        ].map((logo, index) => (
                            <img
                                key={index}
                                src={`/images/trustedby/${logo}`}
                                alt={`Trusted Brand ${index}`}
                                loading="lazy"
                                decoding="async"
                                className={`${logo.includes('efiling') || logo.includes('1495155934_LUMIVE') ? 'h-16 md:h-24' : 'h-10 md:h-12'} w-auto object-contain`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
