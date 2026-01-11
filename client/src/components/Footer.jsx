import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full mt-20 py-8 border-t border-border-light dark:border-border-dark text-center bg-background-light dark:bg-background-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                    <span className="material-symbols-outlined text-2xl">local_library</span>
                    <span className="font-bold text-lg text-slate-600 dark:text-slate-300">Libri</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} Miyuru Dilakshan. All rights reserved. <br />
                    Libri - Personal Library Manager. Powered by Google Books.
                </p>
                <div className="flex gap-4 text-sm font-medium text-primary">
                    <a href="https://portfolio.miyuru.dev" target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>
                    <a href="https://www.linkedin.com/in/miyurudilakshan" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                    <a href="https://github.com/MiyuruDilakshan" target="_blank" rel="noopener noreferrer" className="hover:underline">Github</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;