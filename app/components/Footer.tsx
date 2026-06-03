import { Link } from "react-router";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-gray-300 dark:bg-gray-950 mt-auto border-t border-gray-800 dark:border-gray-700">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4 animate-fade-in-up">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Scanalyze</h3>
                            <p className="text-sm text-gray-400">AI-powered resume analysis and feedback to help you land your dream job.</p>
                        </div>
                        <div className="flex gap-4 mt-4">
                            {/* Social Icons */}
                            {[
                                { name: "Twitter", path: "M22.46 6c-.77.34-1.6.56-2.46.66.88-.53 1.56-1.37 1.88-2.37-.83.49-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.4 7.5 3.53 4.7c-.36.62-.56 1.35-.56 2.14 0 1.48.75 2.79 1.88 3.56-.69-.02-1.34-.21-1.91-.53v.03c0 2.08 1.48 3.82 3.44 4.22-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.71 2.14 2.95 4.03 2.98-1.47 1.15-3.33 1.84-5.36 1.84-.35 0-.7-.02-1.04-.06C2.9 19.59 5.05 20 7.31 20c8.75 0 13.54-7.25 13.54-13.54 0-.2-.01-.4-.02-.6.93-.67 1.74-1.5 2.37-2.45z" },
                                { name: "LinkedIn", path: "M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0zM7.27 20.4H3.65V9.24h3.62V20.4zM5.47 7.75c-1.2 0-2.18-.98-2.18-2.18 0-1.2.98-2.18 2.18-2.18 1.2 0 2.18.98 2.18 2.18 0 1.2-.98 2.18-2.18 2.18zm15.36 12.65h-3.62V14.5c0-1.3-.47-2.18-1.62-2.18-1.18 0-1.88.85-1.88 2.18v5.9H10.5V9.24h3.62v1.57c.5-.92 1.66-1.57 3.04-1.57 2.2 0 3.87 1.43 3.87 4.5v6.66z" },
                                { name: "GitHub", path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57v-2.22c-3.33.72-4.035-1.605-4.035-1.605-.54-.99-1.32-1.255-1.32-1.255-1.08-.735.075-.72.075-.72 1.2.09 1.83 1.23 1.83 1.23 1.065 1.83 2.79 1.305 3.47.99.105-.78.41-1.305.75-1.605-2.655-.3-5.46-1.32-5.46-5.91 0-1.305.465-2.37 1.23-3.21-.12-.3-1.065-3.03.105-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405.99 0 2.01.135 3 .405 2.295-1.545 3.3-1.23 3.3-1.23 1.17 0 .225 2.88.105 3.18.765.84 1.23 1.905 1.23 3.21 0 4.605-2.805 5.61-5.46 5.91.42.36.81 1.05.81 2.115v3.105c0 .315.225.675.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z" },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    aria-label={social.name}
                                    className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-125 hover:-translate-y-1"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="animate-fade-in-up animation-delay-100">
                        <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
                        <nav className="flex flex-col gap-3">
                            {[
                                { to: "#features", label: "Features" },
                                { to: "#pricing", label: "Pricing" },
                                { to: "/upload", label: "Start Analyzing", isLink: true },
                                { to: "#demo", label: "Demo" },
                            ].map((link, idx) => (
                                <div key={idx} className="transition-transform duration-200 hover:translate-x-1">
                                    {link.isLink ? (
                                        <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a href={link.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                                            {link.label}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Company Links */}
                    <div className="animate-fade-in-up animation-delay-200">
                        <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
                        <nav className="flex flex-col gap-3">
                            {[
                                { to: "#about", label: "About Us" },
                                { to: "#contact", label: "Contact" },
                                { to: "/activity", label: "Activity Log", isLink: true },
                            ].map((link, idx) => (
                                <div key={idx} className="transition-transform duration-200 hover:translate-x-1">
                                    {link.isLink ? (
                                        <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a href={link.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                                            {link.label}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Legal Links */}
                    <div className="animate-fade-in-up animation-delay-300">
                        <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
                        <nav className="flex flex-col gap-3">
                            {[
                                { to: "#", label: "Privacy Policy" },
                                { to: "#", label: "Terms of Service" },
                                { to: "#", label: "Cookie Policy" },
                            ].map((link, idx) => (
                                <div key={idx} className="transition-transform duration-200 hover:translate-x-1">
                                    <a href={link.to} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </a>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © {currentYear} Scanalyze. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500">
                        Secure & Private: Resumes auto-deleted after 30 mins.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
