import React from 'react';
import Header from '../components/Header';

const Home = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col">
            {/* Navigation */}
            <Header />
            {/* Main Content */}
            <main className="flex-grow flex flex-col">
                {/* Hero Section */}
                <div className="relative w-full bg-background-light dark:bg-background-dark overflow-hidden">
                    {/* Abstract Background Pattern */}
                    <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#3e7879 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-36 lg:pb-20 relative z-10">
                        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                                    Curate Your <span className="text-primary">Intellectual</span> Journey
                                </h2>
                                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                                    Manage your personal library, track your reading habits, and discover new favorites with data powered by Google Books.
                                </p>
                            </div>
                            {/* Large Hero Search */}
                            <div className="w-full max-w-2xl relative shadow-xl shadow-primary/5 rounded-xl">
                                <div className="flex items-center w-full h-14 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all overflow-hidden">
                                    <div className="pl-4 text-slate-400">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input className="w-full h-full px-4 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 text-base" placeholder="Search by title, author, or ISBN..." type="text" />
                                    <button className="h-[calc(100%-8px)] mr-1 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2">
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div>
                            {/* Quick Tags */}
                            <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span>Popular:</span>
                                <a className="hover:text-primary underline decoration-dotted underline-offset-4" href="/search?genre=sci-fi">Sci-Fi</a>
                                <a className="hover:text-primary underline decoration-dotted underline-offset-4" href="/search?genre=biographies">Biographies</a>
                                <a className="hover:text-primary underline decoration-dotted underline-offset-4" href="/search?genre=design">Design</a>
                                <a className="hover:text-primary underline decoration-dotted underline-offset-4" href="/search?genre=history">History</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Content Area: Sidebar + Grid */}
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters (Desktop) */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto no-scrollbar pb-4">
                        <div className="flex items-center justify-between lg:hidden pb-4 border-b border-border-light dark:border-border-dark">
                            <span className="font-bold text-lg">Filters</span>
                            <button className="text-primary flex items-center gap-1">
                                <span className="material-symbols-outlined">filter_list</span>
                                Toggle
                            </button>
                        </div>
                        {/* Desktop/Open Filter Container */}
                        <div className="hidden lg:flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">Filters</h3>
                                <button className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors uppercase tracking-wider">Reset</button>
                            </div>
                            
                            {/* Filter Group: Categories */}
                            <div className="border-b border-border-light dark:border-border-dark pb-3">
                                <details className="group" open>
                                    <summary className="flex cursor-pointer items-center justify-between font-bold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 list-none mb-2 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <span>Print Type</span>
                                        <span className="transition-transform duration-300 group-open:rotate-180">
                                            <span className="material-symbols-outlined text-lg">expand_more</span>
                                        </span>
                                    </summary>
                                    <div className="space-y-2 pl-1">
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" type="checkbox" />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">All Types</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input defaultChecked className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" type="checkbox" />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Books</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" type="checkbox" />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Magazines</span>
                                        </label>
                                    </div>
                                </details>
                            </div>

                            {/* Filter Group: Availability */}
                            <div className="border-b border-border-light dark:border-border-dark pb-3">
                                <details className="group" open>
                                    <summary className="flex cursor-pointer items-center justify-between font-bold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 list-none mb-2 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <span>Availability</span>
                                        <span className="transition-transform duration-300 group-open:rotate-180">
                                            <span className="material-symbols-outlined text-lg">expand_more</span>
                                        </span>
                                    </summary>
                                    <div className="space-y-2 pl-1">
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" type="checkbox" />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Free E-books</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" type="checkbox" />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Paid</span>
                                        </label>
                                    </div>
                                </details>
                            </div>

                            {/* Filter Group: Sorting (Last one, no border) */}
                            <div>
                                <details className="group" open>
                                    <summary className="flex cursor-pointer items-center justify-between font-bold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 list-none mb-2 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <span>Sorting</span>
                                        <span className="transition-transform duration-300 group-open:rotate-180">
                                            <span className="material-symbols-outlined text-lg">expand_more</span>
                                        </span>
                                    </summary>
                                    <div className="space-y-2 pl-1">
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input defaultChecked className="w-4 h-4 border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" name="sort" type="radio" />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Relevance</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input className="w-4 h-4 border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" name="sort" type="radio" />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Newest</span>
                                        </label>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </aside>
                    {/* Results Grid */}
                    <section className="flex-1 flex flex-col gap-6">
                        {/* Section Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Trending Now</h2>
                            
                        </div>
                        {/* Book Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {/* Book Card 1 */}
                            <article className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                                <div className="relative w-full aspect-[2/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <img alt="Book cover showing a minimalist abstract design in black and white" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Book cover showing a minimalist abstract design in black and white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCUFvcW3Xe3l59CAkDH3K4v-Dg6nXmU_r22qO1kmY32KvTquT4c4B3zOcMIDF7Rhjf-JOBkafeZ5xJQk0XkcOpGpr-5-dZxgEMi4XSnQsTimTKCD_ndGl79hC60uQxDFWrfmvLMUOjOPxnNvthvou07CjcXb1AuRyMmLPV8P9t8eOS3RvzJlP59vMFWrw8aPt1f0ICdh_iEWoH204jphE_YNrIk_RfojxAUFKVb-NHWsbh20r-S0UjKYkIkPeB6TDcMDm5KrRG6CQ" />
                                    {/* Hover Action */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                        <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg" title="Add to Library">
                                            <span className="material-symbols-outlined text-[20px] block">bookmark_add</span>
                                        </button>
                                        <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg" title="Quick View">
                                            <span className="material-symbols-outlined text-[20px] block">visibility</span>
                                        </button>
                                    </div>
                                    {/* Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 text-xs font-bold bg-primary text-white rounded shadow-sm">Bestseller</span>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1 gap-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">The Design of Everyday Things</h3>
                                        <div className="flex text-yellow-500 text-[14px]">
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">4.8</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary dark:text-primary/80">Don Norman</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                                        A powerful and accessible guide to the principles of human-centered design, showing how good design is actually harder to notice than poor design.
                                    </p>
                                </div>
                            </article>
                            {/* Book Card 2 */}
                            <article className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                                <div className="relative w-full aspect-[2/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400">
                                        <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                                    </div>
                                    <img alt="Close up of old textured book spine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10" data-alt="Close up of old textured book spine" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm6EJPVptSRc8uPLkZWzeCMzvFRPuHsIqJCt0dZ5QVkLvj8F7FppnM95wEj7Tq42FeoLDZ3xMid7S0uMkAgkRu1yP7n-Xf0fVleiP0Q70j6VwhB7eNaD15-xNgatQR1cQA1NsJ3B_klgeGuoeFR4GyCHE1V72b4vUrTShFiRiqibTP_G1FP45coihIN64HCNeGKST-x6d-hOSd089My3L3jfktr7kpLroHeQMghzoTiO9qxoZmNUfPSyA4OMAyRgpE40czMjrIGjo" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px] z-20">
                                        <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                                            <span className="material-symbols-outlined text-[20px] block">bookmark_add</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1 gap-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">Thinking, Fast and Slow</h3>
                                        <div className="flex text-yellow-500 text-[14px]">
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">4.5</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary dark:text-primary/80">Daniel Kahneman</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                                        The major work of the Nobel Prize winner, explaining the two systems that drive the way we think.
                                    </p>
                                </div>
                            </article>
                            {/* Book Card 3 */}
                            <article className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                                <div className="relative w-full aspect-[2/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <img alt="Stacks of colorful books in a bright library" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Stacks of colorful books in a bright library" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_slJcfOGUoipT2Th5tWB47T23ElwbsIEKUGHuWOvXBhe6t4W_PIBP8OT160ZfWeScOblk3unebd8jg2stHSQ3JJjxGGvPjhJ5Nkl9Iikij73Y4sI4AZ5VLdgKWWKKbpvZWlGooHKbbx2P8GRlDEFSVhmS-CUSgJ0ERZe0KMDHSOQI5jyjd-GUGdy7odEw58nN6ReuXS8m2CkvxezxJH8mhrJgocahsm4YschrsBDoCaCruWXTGe22Yb9KtXq-eP7nDmCPFyyUxc8" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                        <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                                            <span className="material-symbols-outlined text-[20px] block">bookmark_add</span>
                                        </button>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 text-xs font-bold bg-emerald-500 text-white rounded shadow-sm">Free E-book</span>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1 gap-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">Clean Code</h3>
                                        <div className="flex text-yellow-500 text-[14px]">
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">4.9</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary dark:text-primary/80">Robert C. Martin</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                                        A Handbook of Agile Software Craftsmanship. Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.
                                    </p>
                                </div>
                            </article>
                            {/* Book Card 4 */}
                            <article className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                                <div className="relative w-full aspect-[2/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <img alt="Minimalist book cover with bold typography" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Minimalist book cover with bold typography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJQptt7HoeHedjETRmHLEPYpNXNSib9_jKFFcpP7usVDehGadD-F0JKd3_0gWOCCryzJbU5JHfP0fj1K83MYfHWpKeynkfdkx2239amWu2LoHUrGNUIOcodo8f17YKbzpZb1Mku6JlxzHLow70q2ftY3ZN9XjSPi0yR6regYkXnpsG2V1XGqHkXsHAIjtr0q-thCsho0OtkynBZa_gG9dy74wAcM4VfXG3VdZY0LbKBZ0yXLbb9zq7xY26vKu8JUTStxNyABm7vjw" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                        <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                                            <span className="material-symbols-outlined text-[20px] block">bookmark_add</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1 gap-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">Atomic Habits</h3>
                                        <div className="flex text-yellow-500 text-[14px]">
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">4.7</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary dark:text-primary/80">James Clear</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                                        No matter your goals, Atomic Habits offers a proven framework for improving--every day.
                                    </p>
                                </div>
                            </article>
                            {/* Book Card 5 */}
                            <article className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                                <div className="relative w-full aspect-[2/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <img alt="Open book on a wooden table with coffee" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Open book on a wooden table with coffee" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn06EUhpypskppu3fVs4LoE_4YIi0kOwzaSVus4DTzWSkUDybmgM9kgqQ_CwVJq0LftmwDVzuMLUY1DqB-7DaLCeYRt1cfjyPPovJWhdX24_zFCLA4OyhP9h4r-HshYcpjivaGMhWJU_HdcKScERBE6Rmg6mjlS_gAu1yk5-MvMquYAX1bhewxuxR5jCRITPP4x1lrTgiBpwgUpC4F2IVj-dmO00x0-chwgeFXuX7uDzPqwLI7mQ9TqMans5pWAQB9zpGrSv41Qoo" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                        <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                                            <span className="material-symbols-outlined text-[20px] block">bookmark_add</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1 gap-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">Sapiens</h3>
                                        <div className="flex text-yellow-500 text-[14px]">
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">4.6</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary dark:text-primary/80">Yuval Noah Harari</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                                        From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution.
                                    </p>
                                </div>
                            </article>
                            {/* Book Card 6 (Placeholder / No Image) */}
                            <article className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                                <div className="relative w-full aspect-[2/3] bg-slate-100 dark:bg-slate-800 overflow-hidden flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">menu_book</span>
                                    <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">No Cover</span>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                        <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                                            <span className="material-symbols-outlined text-[20px] block">bookmark_add</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1 gap-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">Refactoring</h3>
                                        <div className="flex text-yellow-500 text-[14px]">
                                            <span className="material-symbols-outlined text-[16px] filled">star</span>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">4.3</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary dark:text-primary/80">Martin Fowler</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                                        Improving the Design of Existing Code. This book is about improving the design of existing code.
                                    </p>
                                </div>
                            </article>
                        </div>
                        {/* Pagination / Load More */}
                        <div className="mt-8 flex justify-center">
                            <button className="flex items-center gap-2 px-6 py-3 border border-border-light dark:border-border-dark rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-surface-dark hover:shadow-md transition-all">
                                Load More Results
                                <span className="material-symbols-outlined text-lg">expand_more</span>
                            </button>
                        </div>
                    </section>
                </div>
            </main>
            {/* Simple Footer */}
            <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">local_library</span>
                        <span class="font-bold text-slate-900 dark:text-white">Libri</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-right">
                        Libri - Personal Library Manager. <br className="hidden md:inline" />Powered by Google Books API. <br className="hidden md:inline" /> © 2026 Miyuru Dilakshan. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
