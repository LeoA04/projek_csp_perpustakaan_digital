"use client";
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const RequestBookPage = ({ onRequestBook, onBack }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRequestBook(title, author);
        setTitle('');
        setAuthor('');
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={onBack}
                className="flex items-center mb-6 text-blue-600 dark:text-blue-400 hover:underline"
            >
                <ChevronLeft size={20} />
                Kembali
            </button>
            <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Request Buku Baru</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Tidak menemukan buku yang Anda cari? Beri tahu kami!
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul Buku</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Penulis (Opsional)</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Kirim Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestBookPage;