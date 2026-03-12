import { useState, useEffect } from "react";
import { commonAPI } from "../lib/api";
import { Link } from "react-router-dom";

const Footer = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await commonAPI.getGlobalSettings();
                if (res.success) setSettings(res.settings);
            } catch (error) {
                console.error("Failed to fetch footer settings", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="bg-white pt-16 pb-8 px-4 md:px-12 lg:px-24 w-full">
            {/* Top Section: Contact & Links */}
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-10 max-w-7xl mx-auto">
                {/* Left: Contact & Newsletter */}
                <div className="flex-1 max-w-md">
                    <p className="text-slate-400 text-sm mb-6">Contact us</p>

                    <div className="flex flex-col gap-3 text-sm text-slate-700 mb-8">
                        <div className="flex items-start gap-2">
                            <span className="mt-0.5 text-slate-400">&#9675;</span>
                            <div>
                                <p className="font-semibold text-slate-900">406, Square One Commercial, Bhimrad-Althan Rd</p>
                                <p>Apcha Nagar, Surat, Gujarat 395017</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400">✉</span>
                            <a href="mailto:info@zaploom.in" className="text-blue-500 hover:underline">{settings?.contactInfo?.email || "info@zaploom.in"}</a>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-slate-400">✆</span>
                            <div>
                                <p>+91 8200923860</p>
                                <p>+91 9033608708</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-slate-400">&#9679;</span>
                            <div>
                                <p className="font-semibold text-slate-900">Office Hours</p>
                                <p>Mon - Fri: 9:00 AM – 6:00 PM</p>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-5 mt-6 ml-8">
                            <a 
                                href={settings?.socialLinks?.linkedin || "https://linkedin.com/company/zaploom"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#0077B5]"
                                title="LinkedIn"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                            <a 
                                href={settings?.socialLinks?.instagram || "https://instagram.com/zaploom"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#E4405F]"
                                title="Instagram"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                            <a 
                                href={settings?.socialLinks?.whatsapp || `https://wa.me/${settings?.contactInfo?.phone?.replace(/[^0-9]/g, '') || '918200923860'}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#25D366]"
                                title="WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Right: Links Columns */}
                <div className="flex flex-row gap-20 md:gap-32">
                    {/* Column 1: Links */}
                    <div>
                        <h4 className="text-slate-400 text-sm font-medium mb-6">Links</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-900">
                            <li><Link to="/" className="hover:text-slate-400 transition-colors">Home</Link></li>
                            <li><Link to="/products" className="hover:text-slate-400 transition-colors">Products</Link></li>
                            <li><Link to="/customized" className="hover:text-slate-400 transition-colors">Customized</Link></li>
                            <li><Link to="/about" className="hover:text-slate-400 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-slate-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: More Resources */}
                    {/* <div>
                        <h4 className="text-slate-400 text-sm font-medium mb-6">More Resources</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-900">
                            <li><Link to="/blogs" className="hover:text-slate-400 transition-colors">Blogs</Link></li>
                            <li><Link to="/terms" className="hover:text-slate-400 transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div> */}
                </div>
            </div>

            {/* Bottom Section: ZAPLOOM Background Text */}
            <div className="relative mb-4 select-none overflow-hidden text-center">
                <h1 className="text-[14vw] leading-none font-clash-display font-medium text-[#f0f0f0] uppercase tracking-wider inline-block">
                    {settings?.branding?.siteName || "Zaploom"}
                </h1>
            </div>
        </footer>
    );
};

export default Footer;
