import React, { useState, useEffect } from 'react';

const EditBookModal = ({ book, isOpen, onClose, onSave }) => {
    const [status, setStatus] = useState('Want to Read');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    useEffect(() => {
        if (book && book.userData) {
            setStatus(book.userData.status || 'Want to Read');
            setRating(book.userData.userRating || 0);
            setReview(book.userData.userReview || '');
        } else {
             // Defaults if no user data yet (though typically there would be if it's in library)
             setStatus('Want to Read');
             setRating(0);
             setReview('');
        }
    }, [book, isOpen]);

    if (!isOpen || !book) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...book,
            userData: {
                ...book.userData,
                status,
                userRating: rating,
                userReview: review,
                updatedAt: new Date().toISOString()
            }
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">Edit Personal Entry</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Reading Status</label>
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                            {['Want to Read', 'Reading', 'Completed'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setStatus(s)}
                                    className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-md transition-all ${
                                        status === s 
                                        ? 'bg-white dark:bg-slate-600 text-primary shadow-sm' 
                                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <span className={`material-symbols-outlined text-3xl ${star <= rating ? 'filled text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}>
                                        star
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Personal Review</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your thoughts about this book..."
                            className="w-full h-24 p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                        ></textarea>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-lg shadow-lg shadow-primary/30 transition-all hover:translate-y-[-1px]"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookModal;
