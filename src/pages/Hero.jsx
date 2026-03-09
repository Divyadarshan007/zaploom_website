import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-[url('/images/Bg2.png')] bg-no-repeat bg-cover bg-center">
                <Header />
                <div className="relative z-10 flex flex-col items-center gap-5 justify-center pt-40  px-4 text-center">
                    <h1 className="text-4xl md:text-7xl font-medium text-center">Build your Business </h1>
                    <h1 className="text-4xl md:text-7xl font-medium text-center">with Zaploom</h1>

                    <div className="mt-10 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex gap-4">
                            <button onClick={() => navigate('/customized')} className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-colors">
                                Let&apos;s Explore
                            </button>
                            <button onClick={() => navigate('/contact')} className="border border-neutral-300 px-8 py-4 rounded-full font-medium hover:bg-neutral-50 transition-colors">
                                Contact Us
                            </button>
                        </div>
                    </div>
                    <div className="mt-16 flex items-center gap-4">
                        <p className="text-neutral-600 font-medium">
                            Trusted by companies <span className="text-blue-600 font-bold">worldwide</span>
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
                            // Duplicating for seamless loop if needed, or just single pass
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