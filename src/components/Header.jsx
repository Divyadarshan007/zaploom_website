import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commonAPI } from "../lib/api";

const Header = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // Check if settings are cached in sessionStorage
                const cachedSettings = sessionStorage.getItem("globalSettings");
                if (cachedSettings) {
                    setSettings(JSON.parse(cachedSettings));
                }

                // Still fetch in background or if cache is empty to ensure freshness
                const res = await commonAPI.getGlobalSettings();
                if (res.success) {
                    setSettings(res.settings);
                    sessionStorage.setItem("globalSettings", JSON.stringify(res.settings));
                }
            } catch (error) {
                console.error("Failed to fetch header settings", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <header className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
            <nav className=" flex justify-center items-center py-6 bg-transparent ">
                <div className="hidden md:grid grid-cols-3 items-center rounded-full px-12 py-4 border border-gray-200 min-w-[800px] bg-white shadow-sm">
                    <div className="flex justify-center space-x-12">
                        <Link to="/products" className="hover:text-blue-600 font-medium">Products</Link>
                        <Link to="/customized" className="hover:text-blue-600 font-medium">Customized</Link>
                    </div>
                    <div className="flex justify-center">
                        <Link className="" to={'/'}>
                            <img
                                src={settings?.branding?.logo || "/images/zaploom-logo.svg"}
                                width={'100px'}
                                alt={settings?.branding?.siteName || "Zaploom"}
                            />
                        </Link>
                    </div>
                    <div className="flex justify-center space-x-12">
                        <Link to="/about" className="hover:text-blue-600 font-medium">
                            About Us
                        </Link>
                        <Link to="/contact" className="hover:text-blue-600 font-medium">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </nav>

            <button className="md:hidden p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
            </button>

        </header>
    )
}

export default Header