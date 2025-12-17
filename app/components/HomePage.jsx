"use client";
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import BookCard from './BookCard';

const HomePage = ({ books, onBookClick, onSearch, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        onFilter(value);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Cari judul atau penulis..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="all">Semua Buku</option>
                        <option value="free">Gratis</option>
                        <option value="paid">Berbayar</option>
                    </select>
                    <button
                        type="submit"
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        <Filter size={16} className="mr-2" />
                        Cari
                    </button>
                </form>
            </div>

            {books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map(book => (
                        <BookCard key={book.id} book={book} onClick={() => onBookClick(book.id)} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 dark:text-gray-400">
                    <p className="text-lg">Tidak ada buku yang ditemukan.</p>
                    <p>Coba ubah kata kunci pencarian atau filter Anda.</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;