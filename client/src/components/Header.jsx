import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-md' : 'bg-transparent border-b border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
                        <div className="text-primary">
                            <span className="material-symbols-outlined text-3xl">local_library</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Libri</h1>
                    </Link>
                    
                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Theme Toggle (Visual) */}
                        <button className="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined text-[20px]">dark_mode</span>
                        </button>
                        {/* login,signup */}
                        <Link className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" to="/login">Log In</Link>
                        <Link className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" 
                        to="/signup"> Sign Up </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
