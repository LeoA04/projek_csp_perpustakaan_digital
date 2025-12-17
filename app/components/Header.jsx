// app/components/Header.jsx
import React from 'react';

const Header = ({ user, onLogout, onGoHome, onGoToRequest, onGoToAddBook, onGoToAdmin, isAdmin }) => { 
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 onClick={onGoHome} className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer">
                    Perpustakaan Digital
                </h1>
                
                <nav className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">
                        Halo, {user?.email || 'Guest'}
                    </span>
                    
                    {/* Tampilkan Tombol Admin dan Tambah Buku HANYA jika isAdmin TRUE */}
                    {isAdmin && (
                        <>
                            <button 
                                onClick={onGoToAdmin} 
                                className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 transition"
                                title="Halaman Admin (Request Buku)"
                            >
                                Admin
                            </button>
                        </>
                    )}

                    {/* Tombol Request Buku (Tersedia untuk semua user yang login) */}
                    <button 
                        onClick={onGoToRequest} 
                        className="px-3 py-1 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600 transition"
                        title="Request Buku"
                    >
                        Request
                    </button>

                    <button 
                        onClick={onLogout} 
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;