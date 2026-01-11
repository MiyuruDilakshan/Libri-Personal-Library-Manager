import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const profileRef = useRef(null);
    
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

        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
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
                    {/* LEFT: Logo & Main Nav (Logged In) */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
                             <div className={`${isTransparent ? 'text-white' : 'text-primary'}`}>
                                <span className="material-symbols-outlined text-3xl">local_library</span>
                            </div>
                            <h1 className={`text-xl font-bold tracking-tight ${
                                isTransparent ? 'text-white' : 
                                (isAuthPage && !isScrolled) ? 'text-slate-900 dark:text-white lg:text-white' : 
                                'text-slate-900 dark:text-white'
                            }`}>
                                Libri
                            </h1>
                        </Link>

                        {/* Desktop Nav - User Logged In */}
                        {user && (
                            <nav className="hidden md:flex items-center gap-1">
                                <Link 
                                    to="/" 
                                    className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${
                                        isTransparent 
                                        ? 'text-white/80 hover:text-white hover:bg-white/10' 
                                        : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    Discover
                                </Link>
                                <Link 
                                    to="/my-library" 
                                    className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${
                                        isTransparent 
                                        ? 'text-white/80 hover:text-white hover:bg-white/10' 
                                        : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    My Library
                                </Link>
                            </nav>
                        )}
                    </div>
                    
                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                         {/* Search Icon (Mobile or Quick Access) */}
                         <Link to="/" className={`p-2 rounded-full transition-colors ${
                              isTransparent 
                              ? 'text-white hover:bg-white/20' 
                              : 'text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800'
                         }`}>
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </Link>

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
                        
                        {/* Auth Buttons vs Profile Dropdown */}
                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 focus:outline-none"
                                >
                                    <img 
                                        src={user.avatar || "https://ui-avatars.com/api/?name=User&background=random"} 
                                        alt="Profile" 
                                        className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-border-light dark:border-border-dark py-1 animation-fade-in origin-top-right overflow-hidden">
                                        <div className="px-4 py-3 border-b border-border-light dark:border-border-dark">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                        </div>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                            Profile Settings
                                        </Link>
                                        <button 
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">logout</span>
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Login Button - Hide if on Login page */}
                                {location.pathname !== '/login' && (
                                    <Link className={`text-sm font-semibold transition-colors ${
                                        isTransparent 
                                        ? 'text-white hover:text-white/80' 
                                        : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white'
                                    }`} to="/login">
                                        Log In
                                    </Link>
                                )}
                                
                                {/* Sign Up Button - Hide if on Signup page */}
                                {location.pathname !== '/signup' && (
                                    <Link className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" to="/signup"> 
                                        Sign Up 
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
