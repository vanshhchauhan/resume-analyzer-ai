import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { to: "#features", label: "Features" },
        { to: "#pricing", label: "Pricing" },
        { to: "#about", label: "About" },
        { to: "#contact", label: "Contact" },
    ];

    const isActive = (href: string) => {
        if (href.startsWith("#")) {
            return location.hash === href;
        }
        return location.pathname === href;
    };

    return (
        <nav className={`navbar-dark ${scrolled ? "navbar-scrolled" : ""} animate-slide-down`}>
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="flex items-center transition-transform duration-200 hover:scale-105 active:scale-95"
                    >
                        <p className="text-xl font-bold text-white tracking-tight">Scanalyze</p>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, index) => {
                            const active = isActive(link.to);
                            return (
                                <a
                                    key={link.to}
                                    href={link.to}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        active
                                            ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/20"
                                            : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                                    }`}
                                    style={{ animationDelay: `${index * 100 + 300}ms` }}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Link
                            to="/upload"
                            className="primary-button inline-flex items-center justify-center px-5 md:px-6 py-2.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl shadow-blue-500/20"
                        >
                            Start Analyzing
                        </Link>
                        <div className="flex items-center">
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
