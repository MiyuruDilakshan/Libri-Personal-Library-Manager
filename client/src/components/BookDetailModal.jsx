import React, { useState, useEffect } from 'react';

const BookDetailModal = ({ book, isOpen, onClose }) => {
    const [fullDetails, setFullDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && book) {
            const fetchGoogleDetails = async () => {
                setLoading(true);
                try {
                    // Extract Google Book ID. 
                    // In MyLibrary, we mapped it to volumeInfo.industryIdentifiers[0].identifier or it's just in the root depending on how we formatted it.
                    // Looking at MyLibrary.jsx: industryIdentifiers: [{ identifier: book.googleBookId }]
                    const googleId = book.volumeInfo?.industryIdentifiers?.[0]?.identifier;

                    if (googleId) {
                        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${googleId}`);
                        const data = await response.json();
                        setFullDetails(data.volumeInfo);
                    }
                } catch (error) {
                    console.error("Failed to fetch details from Google", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchGoogleDetails();
        } else {
            setFullDetails(null);
        }
    }, [isOpen, book]);

    if (!isOpen || !book) return null;

    // Merge displayed info (prefer Google data if loaded, else fallback to local)
    const displayTitle = fullDetails?.title || book.volumeInfo.title;
    const displayAuthors = fullDetails?.authors || book.volumeInfo.authors;
    const displayImage = fullDetails?.imageLinks?.thumbnail || book.volumeInfo.imageLinks?.thumbnail;
    const description = fullDetails?.description ? fullDetails.description.replace(/<[^>]+>/g, '') : 'No description available.'; // Simple HTML strip
    
    // User Data
    const { status, userRating, userReview } = book.userData;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div 
                className="bg-white dark:bg-surface-dark w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]" 
                onClick={e => e.stopPropagation()}
            >
                {/* Left: Image & Key Stats */}
                <div className="bg-slate-100 dark:bg-slate-800 p-8 flex flex-col items-center justify-center md:w-1/3 border-r border-slate-200 dark:border-slate-700">
                    <div className="w-48 shadow-lg rounded-lg overflow-hidden mb-6">
                        {displayImage ? (
                            <img src={displayImage.replace('http:', 'https:')} alt={displayTitle} className="w-full h-auto object-cover" />
                        ) : (
                            <div className="h-64 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400">No Image</div>
                        )}
                    </div>

                    <div className="w-full space-y-3">
                        <div className="bg-white dark:bg-slate-700 p-3 rounded-lg text-center">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">Status</span>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                                status === 'Reading' ? 'bg-blue-100 text-blue-800' :
                                'bg-amber-100 text-amber-800'
                            }`}>
                                {status}
                            </span>
                        </div>
                        
                        {userRating > 0 && (
                            <div className="bg-white dark:bg-slate-700 p-3 rounded-lg text-center">
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">Your Rating</span>
                                <div className="flex justify-center text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined text-[20px] fill-current">
                                            {i < userRating ? 'star' : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Details & Review */}
                <div className="p-8 md:w-2/3 overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-start mb-6">
                         <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{displayTitle}</h2>
                            <p className="text-lg text-primary font-medium">{displayAuthors?.join(', ')}</p>
                            {fullDetails?.publishedDate && (
                                <p className="text-sm text-slate-500 mt-1">Published: {fullDetails.publishedDate}</p>
                            )}
                         </div>
                         <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                             <span className="material-symbols-outlined">close</span>
                         </button>
                    </div>

                    <div className="space-y-6">
                        {loading ? (
                            <div className="space-y-3 animate-pulse">
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide mb-2">Description</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    {description}
                                </p>
                            </div>
                        )}

                        {/* Page Count & Categories */}
                        {!loading && fullDetails && (
                            <div className="flex flex-wrap gap-4">
                                {fullDetails.pageCount && (
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                        <span className="material-symbols-outlined text-[18px]">menu_book</span>
                                        {fullDetails.pageCount} pages
                                    </div>
                                )}
                                {fullDetails.categories && (
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                        <span className="material-symbols-outlined text-[18px]">category</span>
                                        {fullDetails.categories.join(', ')}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* User Review */}
                        {userReview && (
                             <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">rate_review</span>
                                    Your Review
                                </h3>
                                <p className="text-slate-700 dark:text-slate-300 italic">"{userReview}"</p>
                             </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailModal;