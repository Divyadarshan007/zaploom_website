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
                    <div>
                        <h4 className="text-slate-400 text-sm font-medium mb-6">More Resources</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-900">
                            <li><Link to="/blogs" className="hover:text-slate-400 transition-colors">Blogs</Link></li>
                            <li><Link to="/terms" className="hover:text-slate-400 transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
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
