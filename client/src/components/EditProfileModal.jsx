import React, { useState, useEffect } from 'react';
import api from '../services/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const EditProfileModal = ({ isOpen, onClose }) => {
    const { user, login } = useAuth();     
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [changePassword, setChangePassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (changePassword) {
            if (formData.newPassword !== formData.confirmNewPassword) {
                addToast("New passwords do not match", "error");
                setLoading(false);
                return;
            }
            if (!formData.currentPassword) {
                addToast("Current password is required to set a new one", "error");
                setLoading(false);
                return;
            }
        }

        try {
            const payload = {
                name: formData.name,
                email: formData.email
            };

            if (changePassword) {
                payload.currentPassword = formData.currentPassword;
                payload.newPassword = formData.newPassword;
            }

            const response = await api.put('/auth/profile', payload);
            
            // Response contains updated user and token
            const updatedUser = response.data;
            
            // Update Local Storage
            localStorage.setItem('user', JSON.stringify(updatedUser));
            if(updatedUser.token) {
                 localStorage.setItem('token', updatedUser.token);
            }
            
            addToast("Profile updated successfully! Please refresh to see changes.", "success");
            // A page reload or context update is best here.
            // Since I don't have direct access to 'setUser' from AuthContext (I haven't checked yet), 
            // a reload is a safe brute-force way to ensure all state is consistent.
            // Or I can just close modal and let user see changes if I update UI locally.
            
            window.location.reload(); 
            
            onClose();
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to update profile";
            addToast(msg, "error");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div 
                className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-2xl overflow-hidden" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Edit Profile</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Change Password Toggle */}
                    <div className="pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={changePassword} 
                                onChange={(e) => setChangePassword(e.target.checked)}
                                className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Change Password</span>
                        </label>
                    </div>

                    {/* Password Fields */}
                    {changePassword && (
                        <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 animate-fade-in">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                                    placeholder="Required to set new password"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    value={formData.confirmNewPassword}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                                />
                            </div>
                        </div>
                    )}

                    <div className="pt-4 flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;