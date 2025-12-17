"use client";
import React from 'react';
import { Star } from 'lucide-react';

const BookCard = ({ book, onClick }) => {
    const getAverageRating = () => {
        if (!book.reviews || book.reviews.length === 0) return 0;
        const total = book.reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / book.reviews.length).toFixed(1);
    };

    const avgRating = getAverageRating();

    return (
        <div 
            onClick={onClick}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
            <img 
                src={book.coverUrl} 
                alt={book.title}
                className="w-full h-64 object-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/300x450/333/white?text=Image+Error'; }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{book.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
                <div className="flex justify-between items-center mt-3">
                    {book.isFree ? (
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">Gratis</span>
                    ) : (
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            Rp{book.price.toLocaleString('id-ID')}
                        </span>
                    )}
                    <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            {avgRating} ({book.reviews.length})
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;