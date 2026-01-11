import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import api from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

import EditProfileModal from '../components/EditProfileModal';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        reading: 0,
        completed: 0,
        wantToRead: 0
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const response = await api.get('/library');
                const books = response.data;
                
                const newStats = {
                    total: books.length,
                    reading: books.filter(b => b.status === 'Reading').length,
                    completed: books.filter(b => b.status === 'Completed').length,
                    wantToRead: books.filter(b => b.status === 'Want to Read').length
                };
                setStats(newStats);
            } catch (error) {
                console.error("Failed to fetch library stats", error);
            }
        };

        fetchStats();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="bg-slate-50 dark:bg-background-dark min-h-screen font-display flex flex-col">
            <Header />
            
            <main className="flex-grow">
                {/* Hero / Cover Section */}
                <div className="relative h-64 bg-slate-900 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2428&auto=format&fit=crop" 
                        alt="Profile Cover" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                {/* Profile Content Container */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-12">
                    
                    {/* Centered Profile Card */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800 mb-8">
                        <div className="p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                             {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 rounded-full p-1 bg-white dark:bg-slate-700 shadow-md">
                                     <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-5xl font-bold uppercase">
                                        {user.name.charAt(0)}
                                     </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left space-y-2">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                                <p className="text-lg text-slate-500 dark:text-slate-400">{user.email}</p>
                                
                                <div className="flex items-center justify-center md:justify-start gap-4 pt-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                                        Joined 2026
                                    </span>
                                    <span className="flex items-center gap-1">
                                         <span className="material-symbols-outlined text-[18px]">verified</span>
                                         Free Tier
                                    </span>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex flex-col gap-3 min-w-[160px]">
                                <button 
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                    Edit Profile
                                </button>
                                <button 
                                    onClick={logout} 
                                    className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[20px]">logout</span>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard icon="library_books" label="Total Books" value={stats.total} color="bg-indigo-500" />
                        <StatCard icon="menu_book" label="Reading" value={stats.reading} color="bg-blue-500" />
                        <StatCard icon="check_circle" label="Completed" value={stats.completed} color="bg-emerald-500" />
                        <StatCard icon="bookmark" label="Wishlist" value={stats.wantToRead} color="bg-amber-500" />
                    </div>

                </div>
            </main>

            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
            />
        </div>
    );
};

// Helper Components
const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-all">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white shadow-md mb-1`}>
            <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</p>
        </div>
    </div>
);

export default Profile;