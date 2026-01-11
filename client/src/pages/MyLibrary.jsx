import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LibraryBookCard from '../components/LibraryBookCard';
import EditBookModal from '../components/EditBookModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const MyLibrary = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [libraryBooks, setLibraryBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    
    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    // Mock Data Fetching
    useEffect(() => {
        if (!user) {
            // If strictly protected, navigate('/login');
            // For UI demo, maybe just return;
            return;
        }

        // Simulate API delay
        setTimeout(() => {
            const mockLibrary = [
                {
                    id: '1',
                    volumeInfo: {
                        title: 'The Great Gatsby',
                        authors: ['F. Scott Fitzgerald'],
                        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=iO5pApw2JycC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }
                    },
                    userData: {
                        status: 'Completed',
                        userRating: 5,
                        userReview: 'A mesmerizing tale of obsession and decadence. Fitzgerald’s prose is unmatched.'
                    }
                },
                {
                    id: '2',
                    volumeInfo: {
                        title: 'Dune',
                        authors: ['Frank Herbert'],
                        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }
                    },
                    userData: {
                        status: 'Reading',
                        userRating: 0,
                        userReview: ''
                    }
                },
                {
                    id: '3',
                    volumeInfo: {
                        title: 'Atomic Habits',
                        authors: ['James Clear'],
                        imageLinks: { thumbnail: 'https://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' }
                    },
                    userData: {
                        status: 'Want to Read',
                        userRating: 0,
                        userReview: ''
                    }
                }
            ];
            setLibraryBooks(mockLibrary);
            setLoading(false);
        }, 800);
    }, [user]);

    // Handlers
    const handleEditClick = (book) => {
        setSelectedBook(book);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (book) => {
        setSelectedBook(book);
        setIsDeleteModalOpen(true);
    };

    const handleSaveEdit = (updatedBook) => {
        setLibraryBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
        // In real app, API call here
    };

    const handleConfirmDelete = () => {
        setLibraryBooks(prev => prev.filter(b => b.id !== selectedBook.id));
        setIsDeleteModalOpen(false);
        setSelectedBook(null);
        // In real app, API call here
    };

    // Filter Logic
    const filteredBooks = activeTab === 'All' 
        ? libraryBooks 
        : libraryBooks.filter(book => book.userData.status === activeTab);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-center p-4">
                 <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">lock</span>
                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Access Restricted</h2>
                 <p className="text-slate-500 mb-6">Please log in to view your personal library.</p>
                 <Link to="/login" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark">
                    Log In
                 </Link>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            <Header />
            
            <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Library</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Manage your collection and track your reading journey.
                        </p>
                    </div>
                    
                    {/* Stats or Action (Optional) */}
                    <div className="flex gap-2">
                        <div className="bg-white dark:bg-surface-dark px-4 py-2 rounded-lg border border-border-light dark:border-border-dark shadow-sm">
                            <span className="text-xs font-bold uppercase text-slate-400 block">Total Books</span>
                            <span className="text-lg font-bold text-primary">{libraryBooks.length}</span>
                        </div>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 pb-2 border-b border-border-light dark:border-border-dark">
                    {['All', 'Reading', 'Completed', 'Want to Read'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                activeTab === tab
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Library Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                         {[1,2,3].map(i => (
                             <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                         ))}
                    </div>
                ) : filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBooks.map(book => (
                            <LibraryBookCard 
                                key={book.id} 
                                book={book} 
                                onEdit={handleEditClick} 
                                onDelete={handleDeleteClick} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-4">
                             <span className="material-symbols-outlined text-4xl">auto_stories</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No books found</h3>
                         <p className="text-slate-500 max-w-xs mx-auto">
                            {activeTab === 'All' 
                                ? "Your library is empty. Go discover some books!" 
                                : `You don't have any books marked as "${activeTab}" yet.`}
                        </p>
                        {activeTab === 'All' && (
                             <Link to="/" className="mt-6 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
                                Discover Books
                             </Link>
                        )}
                    </div>
                )}
            </main>

            <Footer />

            {/* Modals */}
            <EditBookModal 
                book={selectedBook} 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                onSave={handleSaveEdit} 
            />
            
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                bookTitle={selectedBook?.volumeInfo?.title}
            />
        </div>
    );
};

export default MyLibrary;
