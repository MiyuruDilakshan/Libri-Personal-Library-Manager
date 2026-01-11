import React from 'react';

const LibraryBookCard = ({ book, onEdit, onDelete, onClick }) => {
    const { title, authors, imageLinks } = book.volumeInfo || {};
    const { status, userReview, userRating } = book.userData || {};

    const getStatusColor = (status) => {
        switch (status) {
            case 'Reading': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
            case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
            case 'Want to Read': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        }
    };

    return (
        <div 
            onClick={() => onClick(book)}
            className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer group"
        >
            <div className="flex p-4 gap-4">
                {/* Thumbnail */}
                <div className="w-24 h-36 flex-shrink-0 bg-slate-200 dark:bg-slate-700 rounded-md overflow-hidden relative shadow-sm group-hover:shadow transition-all">
                    {imageLinks?.thumbnail ? (
                        <img 
                            src={imageLinks.thumbnail.replace('http:', 'https:')} 
                            alt={title} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            <span className="material-symbols-outlined">image_not_supported</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                            {title}
                        </h3>
                        <div className="flex items-center gap-1">
                             <button 
                                onClick={(e) => { e.stopPropagation(); onEdit(book); }}
                                className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                                title="Edit Status/Review"
                            >
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDelete(book); }}
                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                title="Remove from Library"
                            >
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                        {authors?.join(', ') || 'Unknown Author'}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(status)}`}>
                            {status || 'Want to Read'}
                        </span>
                        {userRating && (
                            <span className="flex items-center text-xs font-bold text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 px-2 rounded-full">
                                <span className="material-symbols-outlined text-[14px] mr-1 filled">star</span>
                                {userRating}
                            </span>
                        )}
                    </div>

                    {userReview && (
                        <p className="text-xs text-slate-500 dark:text-slate-500 line-clamp-2 mt-auto pt-2 border-t border-slate-100 dark:border-slate-800 italic">
                            "{userReview}"
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LibraryBookCard;
