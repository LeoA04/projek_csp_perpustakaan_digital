"use client";
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const AddBookPage = ({ onAddBook, onBack }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [isFree, setIsFree] = useState(true);
    const [price, setPrice] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = {
            id: Date.now(),
            title,
            author,
            description,
            coverUrl: coverUrl || 'https://placehold.co/300x450/ccc/white?text=No+Image',
            isFree,
            price: isFree ? 0 : Number(price),
            reviews: [],
            content: `Ini adalah konten default untuk buku ${title}.`
        };
        onAddBook(newBook);
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tambah Buku Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Penulis</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL Cover</label>
                        <input type="text" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Gratis</label>
                    </div>
                    {!isFree && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga (Rp)</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
                        </div>
                    )}

                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Simpan Buku
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBookPage;