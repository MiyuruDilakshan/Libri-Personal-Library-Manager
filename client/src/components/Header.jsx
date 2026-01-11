import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();
    
    // Check if we are on an auth page (Login or Signup)
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const isHomePage = location.pathname === '/';
    // Only Home page uses fully transparent/white header (for Hero)
    const isTransparent = !isScrolled && isHomePage;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        // Theme Initialization - Default to Dark if no preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || !savedTheme) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background-light/50 dark:bg-background-dark/70 backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-md' : 'bg-transparent border-b border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
                        <div className="text-primary">
                            <span className="material-symbols-outlined text-3xl">local_library</span>
                        </div>
                        {/* 
                            Logo Text Logic:
                            - Home Hero: Always White.
                            - Auth Pages (Unscrolled): 
                                - Desktop: White (on dark image).
                                - Mobile: Standard (on light background).
                            - Default: Standard Theme Colors.
                         */}
                        <h1 className={`text-xl font-bold tracking-tight ${
                            isTransparent ? 'text-white' : 
                            (isAuthPage && !isScrolled) ? 'text-slate-900 dark:text-white lg:text-white' : 
                            'text-slate-900 dark:text-white'
                        }`}>
                            Libri
                        </h1>
                    </Link>
                    
                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme}
                            className={`p-2 transition-colors rounded-full ${isTransparent ? 'text-white hover:bg-white/20' : 'text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {isDark ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>
                        
                        {/* Login Button - Hide if on Login page */}
                        {location.pathname !== '/login' && (
                            <Link className={`text-sm font-semibold transition-colors ${isTransparent ? 'text-white hover:text-white/80' : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white'}`} to="/login">
                                Log In
                            </Link>
                        )}
                        
                        {/* Sign Up Button - Hide if on Signup page */}
                        {location.pathname !== '/signup' && (
                            <Link className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" to="/signup"> 
                                Sign Up 
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
