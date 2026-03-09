import { Link } from "react-router-dom";

const Header = () => {
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
                            <img src="/images/Zaploom-logo.png" width={'100px'} alt="" />
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