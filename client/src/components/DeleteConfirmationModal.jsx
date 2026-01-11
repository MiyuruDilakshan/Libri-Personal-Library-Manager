import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, bookTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-surface-dark w-full max-w-sm rounded-xl shadow-2xl p-6 animate-scale-in text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl">delete</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Remove from Library?</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Are you sure you want to remove <span className="font-semibold text-slate-700 dark:text-slate-200">"{bookTitle}"</span>? This action cannot be undone.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-colors"
                    >
                        Yes, Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
