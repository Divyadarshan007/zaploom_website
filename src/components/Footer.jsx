const Footer = () => {
    return (
        <footer className="bg-white pt-16 pb-8 px-4 md:px-12 lg:px-24 w-full">
            {/* Top Section: Contact & Links */}
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-10 max-w-7xl mx-auto">
                {/* Left: Contact & Newsletter */}
                <div className="flex-1 max-w-md">
                    <p className="text-slate-400 text-sm mb-2">Contact us at</p>
                    <p className="text-xl font-semibold mb-8">info@zaploom.in</p>

                    <div className="relative flex items-center w-full max-w-sm">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full py-5 pl-6 pe-36 rounded-full border border-slate-100 bg-slate-50/30 focus:outline-none focus:ring-1 focus:ring-slate-200 placeholder:text-slate-300 text-sm"
                        />
                        <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-black text-white px-7 rounded-full font-medium text-sm hover:bg-slate-900 transition-all active:scale-95">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Right: Links Columns */}
                <div className="flex flex-row gap-20 md:gap-32">
                    {/* Column 1: Links */}
                    <div>
                        <h4 className="text-slate-400 text-sm font-medium mb-6">Links</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-900">
                            <li><a href="/" className="hover:text-slate-400 transition-colors">Home</a></li>
                            <li><a href="/prebuilt" className="hover:text-slate-400 transition-colors">Prebuilt</a></li>
                            <li><a href="/customized" className="hover:text-slate-400 transition-colors">Customized</a></li>
                            <li><a href="/about" className="hover:text-slate-400 transition-colors">About Us</a></li>
                            <li><a href="/contact" className="hover:text-slate-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 2: More Resources */}
                    <div>
                        <h4 className="text-slate-400 text-sm font-medium mb-6">More Resources</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-900">
                            <li><a href="/blogs" className="hover:text-slate-400 transition-colors">Blogs</a></li>
                            <li><a href="/terms" className="hover:text-slate-400 transition-colors">Terms & Conditions</a></li>
                            <li><a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section: ZAPLOOM Background Text */}
            <div className="relative mb-4 select-none overflow-hidden text-center">
                <h1 className="text-[14vw] leading-none font-clash-display font-medium text-[#f0f0f0] uppercase tracking-wider inline-block">
                    Zaploom
                </h1>
            </div>
        </footer>
    );
};

export default Footer;