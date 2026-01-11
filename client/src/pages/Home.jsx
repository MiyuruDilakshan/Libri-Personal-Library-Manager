import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../components/Header';
import axios from 'axios';

const Home = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [viewMode, setViewMode] = useState('trending'); // 'trending' | 'search'
    
    // Filters
    const [printType, setPrintType] = useState('all');
    const [isFreeEbook, setIsFreeEbook] = useState(false);

    // Refs
    const resultsRef = useRef(null);
    const observerTarget = useRef(null);

    const fetchBooks = useCallback(async (searchQuery, isNewSearch = true, currentStartIndex = 0, currentPrintType, currentIsFreeEbook) => {
        if (!searchQuery && !searchQuery.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const filterParam = currentIsFreeEbook ? 'free-ebooks' : undefined;
            
            const params = {
                q: searchQuery,
                startIndex: currentStartIndex,
                maxResults: 12,
                printType: currentPrintType,
                filter: filterParam
            };
            
            // console.log('[Frontend] Fetching:', params);
            const response = await axios.get('http://localhost:5000/api/books/search', { params });
            const newBooks = response.data.items || [];
            
            if (isNewSearch) {
                setBooks(newBooks);
                setStartIndex(12);
                // Scroll to results only if it's an active search (not initial trending load)
                if (viewMode === 'search' && newBooks.length > 0) {
                     // We use a timeout to let the DOM render the results section first
                     setTimeout(() => {
                        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     }, 100);
                }
            } else {
                setBooks(prev => [...prev, ...newBooks]);
                setStartIndex(prev => prev + 12);
            }
            setTotalItems(response.data.totalItems || 0);

        } catch (err) {
            console.error('[Frontend] Search Error:', err);
            setError('Failed to fetch books. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [viewMode]);

    // Initial Trending Load
    useEffect(() => {
        // Fetch trending (using a generic "trending" or "subject:fiction" query sorted by newest if possible, 
        // but Google Books API relies on 'orderBy' parameter. Let's just search for a popular topic)
        const loadTrending = async () => {
            setViewMode('trending');
            // Using a broad query for trending/popular
            await fetchBooks('subject:fiction', true, 0, 'all', false);
        };
        loadTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Instant Filter Apply
    useEffect(() => {
        // Only trigger if we have an active search or are looking at results
        if (query && viewMode === 'search') {
            fetchBooks(query, true, 0, printType, isFreeEbook);
        }
    }, [printType, isFreeEbook, query, viewMode, fetchBooks]);

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading && viewMode === 'search' && books.length < totalItems) {
                    fetchBooks(query, false, startIndex, printType, isFreeEbook);
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [loading, viewMode, books.length, totalItems, query, startIndex, printType, isFreeEbook, fetchBooks]);


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setViewMode('search'); // Switch to search mode
        fetchBooks(query, true, 0, printType, isFreeEbook);
    };

    const handleCategoryClick = (category) => {
        setQuery(category); // Update search bar
        setViewMode('search');
        setPrintType('all'); // Reset filters optionally
        fetchBooks(category, true, 0, 'all', isFreeEbook);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col">
                {/* Hero Section */}
                <div className="relative w-full bg-background-light dark:bg-background-dark overflow-hidden">
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

                            {/* Quick Categories / Trending Buttons */}
                            <div className="flex flex-wrap justify-center gap-3">
                                {['Trending', 'Classic', 'Romance', 'Technology', 'History'].map((tag) => {
                                    // Map 'Trending' to a specific query if needed, strictly speaking trending isn't a category in the API without sorting, but 'most_popular' isn't a valid q without context. 
                                    const searchQuery = tag === 'Trending' ? 'subject:fiction' : `subject:${tag.toLowerCase()}`;
                                    
                                    return (
                                        <button 
                                            key={tag}
                                            onClick={() => handleCategoryClick(searchQuery)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                                query === searchQuery 
                                                ? 'bg-primary text-white shadow-md' 
                                                : 'bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div ref={resultsRef} className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto no-scrollbar pb-4">
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
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                {viewMode === 'trending' ? 'Popular Books' : 'Search Results'}
                            </h2>
                            {viewMode === 'search' && (
                                <span className="text-sm text-slate-500 dark:text-slate-400">{totalItems} results found</span>
                            )}
                        </div>

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
                        
                        {!loading && !error && books.length === 0 && viewMode === 'search' && query && (
                             <div className="text-center py-12 text-slate-500">
                                <span className="material-symbols-outlined text-6xl mb-4 opacity-20">search_off</span>
                                <p className="text-lg">No books found matching "{query}"</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {books.map((book, idx) => {
                                const volumeInfo = book.volumeInfo;
                                const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover';
                                const highResImage = thumbnail.replace('zoom=1', 'zoom=2'); 
                                
                                return (
                                    <article key={`${book.id}-${idx}`} className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
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
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px] z-20">
                                                <a href={volumeInfo.previewLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg" title="View on Google Books">
                                                    <span className="material-symbols-outlined text-[20px] block">visibility</span>
                                                </a>
                                            </div>
                                            {volumeInfo.saleInfo && volumeInfo.saleInfo.isEbook && (
                                                <div className="absolute top-3 left-3 z-20">
                                                    <span className="px-2 py-1 text-xs font-bold bg-emerald-500 text-white rounded shadow-sm">E-book</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-1 gap-2">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">{volumeInfo.title}</h3>
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
                        
                        {/* Sentinel for Infinite Scroll - Only valid in search mode */}
                        {viewMode === 'search' && books.length > 0 && books.length < totalItems && (
                            <div ref={observerTarget} className="h-20 w-full flex items-center justify-center mt-8">
                                {loading && (
                                     <div className="flex items-center gap-2 text-slate-500">
                                        <span className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></span>
                                        <span>Loading more...</span>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* Footer for Trending Mode */}
                        {viewMode === 'trending' && !loading && (
                            <div className="mt-12 text-center text-slate-500">
                                <p>Search above to explore more books.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
