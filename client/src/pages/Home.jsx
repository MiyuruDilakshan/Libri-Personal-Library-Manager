import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';

const Home = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    
    // Filters
    const [printType, setPrintType] = useState('all');
    const [isFreeEbook, setIsFreeEbook] = useState(false);

    const searchBooks = async (isNewSearch = true) => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const index = isNewSearch ? 0 : startIndex;
            const filterParam = isFreeEbook ? 'free-ebooks' : undefined;
            
            const response = await axios.get('http://localhost:5000/api/books/search', {
                params: {
                    q: query,
                    startIndex: index,
                    maxResults: 12, // Increased for better grid layout
                    printType: printType,
                    filter: filterParam
                }
            });

            if (isNewSearch) {
                setBooks(response.data.items || []);
                setStartIndex(12);
            } else {
                setBooks(prev => [...prev, ...(response.data.items || [])]);
                setStartIndex(prev => prev + 12);
            }
            setTotalItems(response.data.totalItems || 0);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch books. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchBooks(true);
    };

    const handleLoadMore = () => {
        searchBooks(false);
    };

    // Initial load check or empty state - we can leave it empty or fetch generic 'javascript' or 'fiction' 
    // But per requirements "Search Page: A landing page with a search bar", we can start empty.

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
                            <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl relative shadow-xl shadow-primary/5 rounded-xl">
                                <div className="flex items-center w-full h-14 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all overflow-hidden">
                                    <div className="pl-4 text-slate-400">
                                        <span className="material-symbols-outlined">search</span>
                                    </div>
                                    <input 
                                        className="w-full h-full px-4 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 text-base" 
                                        placeholder="Search by title, author, or keyword..." 
                                        type="text" 
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <button type="submit" className="h-[calc(100%-8px)] mr-1 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors flex items-center gap-2">
                                        <span>Search</span>
                                    </button>
                                </div>
                            </form>
                            {/* Quick Tags (Optional helper updates) */}
                            <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span>Popular:</span>
                                {['Sci-Fi', 'Biographies', 'Design', 'History'].map((tag) => (
                                    <button 
                                        key={tag}
                                        onClick={() => { setQuery(tag); setTimeout(() => searchBooks(true), 0); }} // Quick hack to set query then search. Better to useEffect on query but only when triggered.
                                        className="hover:text-primary underline decoration-dotted underline-offset-4 bg-transparent border-None cursor-pointer"
                                    >
                                        {tag}
                                    </button>
                                ))}
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
                            {/* Mobile toggle not implemented fully for brevity, keeping structure */}
                            <button className="text-primary flex items-center gap-1">
                                <span className="material-symbols-outlined">filter_list</span>
                                Filter
                            </button>
                        </div>
                        {/* Desktop/Open Filter Container */}
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">Filters</h3>
                                <button 
                                    onClick={() => { setPrintType('all'); setIsFreeEbook(false); }}
                                    className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors uppercase tracking-wider"
                                >
                                    Reset
                                </button>
                            </div>
                            
                            {/* Filter Group: Print Type */}
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
                                            <input 
                                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" 
                                                type="radio" 
                                                name="printType"
                                                checked={printType === 'all'}
                                                onChange={() => setPrintType('all')}
                                            />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">All Types</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input 
                                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" 
                                                type="radio" 
                                                name="printType"
                                                checked={printType === 'books'}
                                                onChange={() => setPrintType('books')}
                                            />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Books</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input 
                                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" 
                                                type="radio" 
                                                name="printType"
                                                checked={printType === 'magazines'}
                                                onChange={() => setPrintType('magazines')}
                                            />
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
                                            <input 
                                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" 
                                                type="checkbox" 
                                                checked={isFreeEbook}
                                                onChange={(e) => setIsFreeEbook(e.target.checked)}
                                            />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Free E-books</span>
                                        </label>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <div className="flex-grow">
                        {/* Results Header */}
                        {books.length > 0 && (
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Search Results</h2>
                                <span className="text-sm text-slate-500 dark:text-slate-400">{totalItems} results found</span>
                            </div>
                        )}

                        {loading && books.length === 0 && (
                            <div className="flex justify-center p-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        {!loading && !error && books.length === 0 && query && (
                             <div className="text-center py-12 text-slate-500">
                                <span className="material-symbols-outlined text-6xl mb-4 opacity-20">search_off</span>
                                <p className="text-lg">No books found matching "{query}"</p>
                            </div>
                        )}

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {books.map((book) => {
                                const volumeInfo = book.volumeInfo;
                                const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover';
                                
                                // High res image fix (Google books sometimes returns small thumbnails)
                                const highResImage = thumbnail.replace('zoom=1', 'zoom=2'); 

                                return (
                                    <article key={book.id} className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                                        <div className="relative w-full aspect-[2/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                            {!volumeInfo.imageLinks && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400">
                                                    <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                                                </div>
                                            )}
                                            <img 
                                                alt={`Cover of ${volumeInfo.title}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10" 
                                                src={highResImage} 
                                            />
                                            {/* Hover Action */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px] z-20">
                                                <a href={volumeInfo.previewLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg" title="View on Google Books">
                                                    <span className="material-symbols-outlined text-[20px] block">visibility</span>
                                                </a>
                                            </div>
                                            {/* Badge for E-book */}
                                            {volumeInfo.saleInfo && volumeInfo.saleInfo.isEbook && (
                                                <div className="absolute top-3 left-3 z-20">
                                                    <span className="px-2 py-1 text-xs font-bold bg-emerald-500 text-white rounded shadow-sm">E-book</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-1 gap-2">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">{volumeInfo.title}</h3>
                                                {/* Average Rating if available */}
                                                {volumeInfo.averageRating && (
                                                    <div className="flex text-yellow-500 text-[14px] flex-shrink-0">
                                                        <span className="material-symbols-outlined text-[16px] filled">star</span>
                                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">{volumeInfo.averageRating}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium text-primary dark:text-primary/80">
                                                {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                                                {volumeInfo.description || 'No description available.'}
                                            </p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {/* Pagination / Load More */}
                        {books.length > 0 && books.length < totalItems && (
                            <div className="mt-12 flex justify-center">
                                <button 
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="px-8 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:border-primary hover:text-primary transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                                            Loading...
                                        </>
                                    ) : (
                                        'Load More Results'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;