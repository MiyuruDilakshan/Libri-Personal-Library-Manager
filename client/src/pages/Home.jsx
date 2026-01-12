import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api/axiosInstance';

const Home = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [query, setQuery] = useState('');
    const [activeQuery, setActiveQuery] = useState(''); // Stores the actual query used for API
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalItems, setTotalItems] = useState(0);
    const [viewMode, setViewMode] = useState('trending'); // 'trending' | 'search'
    
    // Filters
    const [printType, setPrintType] = useState('all');
    const [isFreeEbook, setIsFreeEbook] = useState(false);
    const [orderBy, setOrderBy] = useState('relevance');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Refs
    const resultsRef = useRef(null);
    // Removed observerTarget ref

    const fetchBooks = useCallback(async (searchQuery, pageC = 1, currentPrintType, currentIsFreeEbook, currentOrderBy = 'relevance', shouldScroll = false) => {
        if (!searchQuery && !searchQuery.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const filterParam = currentIsFreeEbook ? 'free-ebooks' : undefined;
            const startIndexVal = (pageC - 1) * itemsPerPage;

            const params = {
                q: searchQuery,
                startIndex: startIndexVal,
                maxResults: itemsPerPage,
                printType: currentPrintType,
                filter: filterParam,
                orderBy: currentOrderBy
            };
            
            const response = await api.get('/books/search', { params });
            const newBooks = response.data.items || [];
            
            setBooks(newBooks); // Always replace items for pagination
            setTotalItems(response.data.totalItems || 0);
            
            if (shouldScroll) {
                 setTimeout(() => {
                    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 }, 10);
            }

        } catch (err) {
            console.error('[Frontend] Search Error:', err);
            setError('Failed to fetch books. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [itemsPerPage]);

    // Initial Trending Load
    useEffect(() => {
        const loadTrending = async () => {
            setViewMode('trending');
            setActiveQuery('subject:fiction'); // Internal query for trending
            setOrderBy('newest');
            setCurrentPage(1);
            // Fetch trending (recent fiction is a good proxy for trending content)
            await fetchBooks('subject:fiction', 1, 'all', false, 'newest', false);
        };
        loadTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Instant Filter Apply & Pagination
    useEffect(() => {
        if (activeQuery && (viewMode === 'search' || viewMode === 'trending')) {
            const shouldScroll = viewMode === 'search';
            fetchBooks(activeQuery, currentPage, printType, isFreeEbook, orderBy, shouldScroll);
        }
    }, [printType, isFreeEbook, activeQuery, viewMode, fetchBooks, orderBy, currentPage]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setViewMode('search');
        setActiveQuery(query);
        setOrderBy('relevance');
        setCurrentPage(1);
        // fetchBooks triggered by useEffect when activeQuery/currentPage changes
    };

    const handleCategoryClick = (displayName, apiQuery, sortOrder = 'relevance') => {
        setQuery(displayName); 
        setActiveQuery(apiQuery); 
        setViewMode(displayName === 'Trending' ? 'trending' : 'search');
        setPrintType('all');
        setOrderBy(sortOrder);
        setCurrentPage(1);
    };
    
    const resetFilters = () => {
        setPrintType('all');
        setIsFreeEbook(false);
        setOrderBy('relevance');
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalItems / itemsPerPage)) {
            setCurrentPage(newPage);
            // Scroll to top of results
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleSaveBook = async (book) => {
        if (!user) {
            addToast("Please log in to save books to your library!", "error");
            return;
        }
        
        try {
            const payload = {
                googleBookId: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors || [],
                thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
                previewLink: book.volumeInfo.previewLink
            };
            
            await api.post('/library', payload);
            addToast(`Saved "${book.volumeInfo.title}" to your library!`, "success");
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Failed to save book (it might already be in your library).';
            addToast(msg, "info");
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col">
                {/* Hero Section */}
                <div className="relative w-full overflow-hidden bg-slate-900">
                    {/* Background Image & Overlay */}
                    <div className="absolute inset-0 z-0">
                         <img 
                            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2670&auto=format&fit=crop" 
                            alt="Library Background" 
                            className="w-full h-full object-cover blur-[2px] opacity-80"
                        />
                        {/* Gradient: Dark around text, fading to the page background at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-background-light dark:to-background-dark"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-36 lg:pb-20 relative z-10">
                        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
                                    Curate Your <span className="text-emerald-400">Intellectual</span> Journey
                                </h2>
                                <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-md">
                                    Manage your personal library, track your reading habits, and discover new favorites with data powered by Google Books.
                                </p>
                            </div>
                            
                            <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl relative shadow-2xl shadow-black/20 rounded-xl">
                                <div className="flex items-center w-full h-14 bg-white/95 dark:bg-surface-dark/95 backdrop-blur rounded-xl border border-white/20 dark:border-border-dark focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all overflow-hidden">
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
                                {['Fantasy', 'Classic', 'Romance', 'Technology', 'History'].map((tag) => (
                                    <button 
                                        key={tag}
                                        onClick={() => handleCategoryClick(tag, `subject:${tag.toLowerCase()}`, 'relevance')}
                                        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                                            query === tag 
                                            ? 'bg-primary text-white shadow-md' 
                                            : 'bg-white text-slate-900 shadow-sm hover:bg-slate-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 backdrop-blur-sm border border-transparent dark:border-white/20'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div ref={resultsRef} className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto no-scrollbar pb-4">
                        {/* Mobile Filter Toggle Button */}
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg shadow-sm hover:shadow-md transition-all"
                        >
                            <span className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                                <span className="material-symbols-outlined">tune</span>
                                Filters & Sorting
                            </span>
                            <span className={`material-symbols-outlined transition-transform ${
                                isFilterOpen ? 'rotate-180' : ''
                            }`}>
                                expand_more
                            </span>
                        </button>
                        
                        <div className={`flex-col gap-5 ${
                            isFilterOpen ? 'flex' : 'hidden lg:flex'
                        }`}>
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">Filters</h3>
                                <button 
                                    onClick={resetFilters}
                                    className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors uppercase tracking-wider"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Filter Group: Sort By */}
                            <div className="border-b border-border-light dark:border-border-dark pb-3">
                                <details className="group" open>
                                    <summary className="flex cursor-pointer items-center justify-between font-bold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 list-none mb-2 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <span>Sort By</span>
                                        <span className="transition-transform duration-300 group-open:rotate-180">
                                            <span className="material-symbols-outlined text-lg">expand_more</span>
                                        </span>
                                    </summary>
                                    <div className="space-y-2 pl-1">
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input 
                                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" 
                                                type="radio" 
                                                name="orderBy"
                                                checked={orderBy === 'relevance'}
                                                onChange={() => setOrderBy('relevance')}
                                            />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Relevance</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group/item">
                                            <input 
                                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600 focus:ring-offset-0" 
                                                type="radio" 
                                                name="orderBy"
                                                checked={orderBy === 'newest'}
                                                onChange={() => setOrderBy('newest')}
                                            />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover/item:text-primary transition-colors">Newest</span>
                                        </label>
                                    </div>
                                </details>
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
                                <p className="text-lg">
                                    {isFreeEbook 
                                        ? `No free e-books found for "${query}"` 
                                        : printType !== 'all' 
                                            ? `No ${printType} found for "${query}"`
                                            : `No books found matching "${query}"`
                                    }
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {books.map((book, idx) => {
                                const volumeInfo = book.volumeInfo;
                                // Robust image handling: check varying sizes, force HTTPS, generic fallback
                                let initialImage = volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail;
                                if (initialImage) {
                                    initialImage = initialImage.replace('http:', 'https:');
                                }
                                
                                return (
                                    <article key={`${book.id}-${idx}`} className="group relative flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                                        <div className="relative w-full aspect-[2/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                            {/* Fallback pattern if image is missing or fails to load */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400 z-0">
                                                <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                                            </div>
                                            
                                            {initialImage && (
                                                <img 
                                                    alt={`Cover of ${volumeInfo.title}`} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10 bg-slate-100 dark:bg-slate-800" 
                                                    src={initialImage}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none'; // Hide broken image so generic fallback shows
                                                    }}
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px] z-20">
                                                <button 
                                                    onClick={() => handleSaveBook(book)}
                                                    className="p-3 bg-white text-slate-900 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg" 
                                                    title={user ? "Save to My Library" : "Login to Save"}
                                                >
                                                    <span className="material-symbols-outlined text-[20px] block">bookmark_add</span>
                                                </button>
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
                        
                        {/* Pagination - Only valid in search mode */}
                        {viewMode === 'search' && totalItems > 0 && (
                            <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || loading}
                                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 transition-colors font-medium text-sm flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                    Previous
                                </button>
                                
                                <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                                    Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
                                </span>
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) || loading}
                                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 transition-colors font-medium text-sm flex items-center gap-2"
                                >
                                    Next
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
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

                <Footer />
            </main>
        </div>
    );
};

export default Home;
