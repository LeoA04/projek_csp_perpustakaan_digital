"use client";
import React, { useState } from 'react';
import { ChevronLeft, BookOpen, ShoppingCart, Send } from 'lucide-react';
import StarRating from './StarRating';

const BookDetailPage = ({ book, user, onBack, onBuy, onAddReview }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    const hasAccess = book.isFree || (user.purchasedBooks && user.purchasedBooks.includes(book.id));

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Silakan berikan rating (bintang) terlebih dahulu.');
            return;
        }
        onAddReview(book.id, {
            id: Date.now(),
            userId: user.id,
            rating,
            comment,
            userEmail: user.email
        });
        setRating(0);
        setComment('');
    };
    
    const getAverageRating = () => {
        if (!book.reviews || book.reviews.length === 0) return { avg: 0, count: 0 };
        const total = book.reviews.reduce((acc, review) => acc + review.rating, 0);
        return { 
            avg: (total / book.reviews.length).toFixed(1),
            count: book.reviews.length 
        };
    };
    
    const { avg, count } = getAverageRating();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={onBack}
                className="flex items-center mb-6 text-blue-600 dark:text-blue-400 hover:underline"
            >
                <ChevronLeft size={20} />
                Kembali ke Daftar Buku
            </button>

            <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full md:w-1/3 h-auto object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x600/333/white?text=Image+Error'; }}
                />
                <div className="p-6 md:p-8 flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">{book.author}</p>
                    
                    <div className="flex items-center my-4">
                        <StarRating rating={avg} />
                        <span className="ml-2 text-gray-600 dark:text-gray-400">{avg} ({count} review)</span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{book.description}</p>
                    
                    <div className="mt-6">
                        {hasAccess ? (
                            <button className="w-full sm:w-auto py-3 px-6 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 flex items-center justify-center">
                                <BookOpen size={20} className="mr-2" />
                                Baca Sekarang
                            </button>
                        ) : (
                            <button
                                onClick={() => onBuy(book)}
                                className="w-full sm:w-auto py-3 px-6 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                            >
                                <ShoppingCart size={20} className="mr-2" />
                                Beli (Rp{book.price.toLocaleString('id-ID')})
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {hasAccess && (
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Isi Buku</h2>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {book.content}
                    </p>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Review Pengguna</h2>
                
                {hasAccess && (
                    <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tulis Review Anda</h3>
                        <div className="my-2">
                            <StarRating rating={rating} setRating={setRating} />
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="3"
                            placeholder="Bagikan pendapat Anda tentang buku ini..."
                            className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                        >
                            <Send size={16} className="mr-2" />
                            Kirim Review
                        </button>
                    </form>
                )}
                
                <div className="space-y-4">
                    {book.reviews.length > 0 ? (
                        book.reviews.map(review => (
                            <div key={review.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                                        {review.userEmail || `User ${review.userId}`}
                                    </span>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">Belum ada review untuk buku ini.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;