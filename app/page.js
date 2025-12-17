// app/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient'; 

// Import komponen UI dari folder components
import Header from './components/Header';
import Modal from './components/Modal';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import BookDetailPage from './components/BookDetailPage';
import AddBookPage from './components/AddBookPage';
import RequestBookPage from './components/RequestBookPage';
import AdminPage from './components/AdminPage'; 

// Admin ID
const ADMIN_USER_ID = "28f596ed-0f36-4c57-b789-5b1de56b7ecf"; 

export default function Home() {
    // --- Inisialisasi Supabase ---
    const [supabase] = useState(() => createClient());

    // --- State Aplikasi ---
    const [page, setPage] = useState('login'); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // State Admin
    
    // State Data
    const [books, setBooks] = useState([]); 
    const [totalBooks, setTotalBooks] = useState(0); // State Total Buku
    const [selectedBook, setSelectedBook] = useState(null);
    
    // State Lokal untuk Pembelian Sementara
    const [purchasedBookIds, setPurchasedBookIds] = useState([]);

    // State Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // --- 1. Auth Listener (Cek User Login & Otorisasi Admin) ---
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                // Logika Otorisasi Admin
                const isCurrentUserAdmin = session.user.id === ADMIN_USER_ID;
                setIsAdmin(isCurrentUserAdmin);

                // Format user
                const formattedUser = {
                    ...session.user,
                    purchasedBooks: purchasedBookIds 
                };
                setCurrentUser(formattedUser);
                setIsAuthenticated(true);
                setPage('home');
                fetchBooks(); 
            }
        };

        checkUser();

        // Listener jika status auth berubah
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setIsAuthenticated(true);
                setIsAdmin(session.user.id === ADMIN_USER_ID);
                setCurrentUser(prev => ({ ...session.user, purchasedBooks: prev?.purchasedBooks || [] }));
            } else {
                setIsAuthenticated(false);
                setIsAdmin(false);
                setCurrentUser(null);
                setPage('login');
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase]); 

    // Update currentUser jika ada pembelian baru (state lokal)
    useEffect(() => {
        if (currentUser) {
            setCurrentUser(prev => ({ ...prev, purchasedBooks: purchasedBookIds }));
        }
    }, [purchasedBookIds]);


    // --- 2. Fungsi Fetch Data (Ambil Buku & Total) ---
    const fetchBooks = async (searchQuery = '', filterType = 'all') => {
        try {
            let query = supabase
                .from('books')
                // Mengambil data dan count total baris
                .select('*, reviews(*)', { count: 'exact' }); 

            // Logika Search
            if (searchQuery) {
                query = query.or(`title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`);
            }

            // Logika Filter
            if (filterType === 'free') {
                query = query.eq('is_free', true);
            } else if (filterType === 'paid') {
                query = query.eq('is_free', false);
            }

            const { data, error, count } = await query;

            if (error) throw error;
            
            setTotalBooks(count); // Menyimpan total buku

            // Sanitasi Data
            const sanitizedBooks = data.map(b => ({
                ...b,
                coverUrl: b.cover_url || 'https://placehold.co/300x450/ccc/white?text=No+Image',
                price: b.price || 0,
                isFree: b.is_free,
                reviews: b.reviews || []
            }));

            setBooks(sanitizedBooks);

        } catch (error) {
            console.error("Gagal mengambil buku:", error.message);
        }
    };

    // --- Fungsi Fetch Data (Ambil Request untuk Admin) ---
    const fetchRequests = async () => {
        try {
            const { data, error } = await supabase
                .from('requests')
                .select('*')
                .order('created_at', { ascending: false }); 

            if (error) throw error;
            return data;
        } catch (error) {
            console.error("Gagal mengambil requests:", error.message);
            alert("Gagal mengambil requests: " + error.message);
            return []; 
        }
    };


    // --- Fungsi Helper UI ---
    const showModal = (message) => {
        setModalMessage(message);
        setModalOpen(true);
    };

    // --- 3. Implementasi Fitur (Handlers) ---

    const handleLogin = async (email, password) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            
            showModal("Login berhasil!");
        } catch (error) {
            alert("Login Gagal: " + error.message);
        }
    };

    const handleRegister = async (email, password) => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;

            showModal("Registrasi berhasil! Cek email Anda (jika konfirmasi aktif) atau silakan login.");
            setPage('login');
        } catch (error) {
            alert("Registrasi Gagal: " + error.message);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setPage('login');
    };

    const handleSearch = (searchTerm) => {
        fetchBooks(searchTerm, 'all'); 
    };

    const handleFilter = (filterType) => {
        fetchBooks('', filterType); 
    };
    
    const handleBookClick = (bookId) => {
        const book = books.find(b => b.id === bookId);
        setSelectedBook(book);
        setPage('detail');
    };
    
    const handleBackToHome = () => {
        setSelectedBook(null);
        setPage('home');
        fetchBooks();
    };

    const handleBuyBook = (book) => {
        setPurchasedBookIds(prev => [...prev, book.id]);
        showModal(`Pembelian buku "${book.title}" berhasil! Sekarang Anda bisa membacanya.`);
    };

    const handleAddReview = async (bookId, reviewData) => {
        try {
            const { error } = await supabase
                .from('reviews')
                .insert({
                    book_id: bookId,
                    user_id: currentUser.id,
                    rating: reviewData.rating,
                    comment: reviewData.comment
                });

            if (error) throw error;

            showModal("Review Anda telah ditambahkan!");
            
            // Update UI lokal (Optimistic UI)
            const updatedBooks = books.map(b => {
                if (b.id === bookId) {
                    const newReview = {
                        ...reviewData,
                        id: Date.now(),
                        user_id: currentUser.id
                    };
                    return { ...b, reviews: [newReview, ...(b.reviews || [])] };
                }
                return b;
            });
            setBooks(updatedBooks);
            setSelectedBook(updatedBooks.find(b => b.id === bookId));

        } catch (error) {
            console.error(error);
            alert("Gagal mengirim review: " + error.message);
        }
    };
    
    const handleAddBook = async (newBook) => {
        try {
            const { error } = await supabase
                .from('books')
                .insert({
                    title: newBook.title,
                    author: newBook.author,
                    description: newBook.description,
                    cover_url: newBook.coverUrl,
                    is_free: newBook.isFree,
                    price: newBook.price,
                });

            if (error) throw error;

            showModal(`Buku "${newBook.title}" berhasil disimpan ke Database!`);
            setPage('home');
            fetchBooks(); 
        } catch (error) {
            alert("Gagal menambah buku: " + error.message);
        }
    };
    
    const handleRequestBook = async (title, author) => {
        try {
            const { error } = await supabase
                .from('requests')
                .insert({
                    user_id: currentUser.id,
                    title: title,
                    author: author,
                    status: 'pending'
                });

            if (error) throw error;

            showModal("Request Anda telah dikirim ke Database. Terima kasih!");
            setPage('home');
        } catch (error) {
            alert("Gagal request buku: " + error.message);
        }
    };

    // --- Render Logika (Router Sederhana) ---

    if (!isAuthenticated) {
        if (page === 'register') {
            return <RegisterPage onRegister={handleRegister} onGoToLogin={() => setPage('login')} />;
        }
        return <LoginPage onLogin={handleLogin} onGoToRegister={() => setPage('register')} />;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header 
                user={currentUser} 
                isAdmin={isAdmin} // Kirim status Admin
                onLogout={handleLogout} 
                onGoHome={handleBackToHome}
                onGoToRequest={() => setPage('requestBook')}
                onGoToAddBook={() => setPage('addBook')}
                onGoToAdmin={() => setPage('admin')} 
            />
            
            <main>
                {page === 'home' && (
                    <HomePage 
                        books={books} 
                        onBookClick={handleBookClick}
                        onSearch={handleSearch}
                        onFilter={handleFilter}
                    />
                )}
                
                {page === 'detail' && selectedBook && (
                    <BookDetailPage 
                        book={selectedBook} 
                        user={currentUser}
                        onBack={handleBackToHome}
                        onBuy={handleBuyBook}
                        onAddReview={handleAddReview}
                    />
                )}
                
                {page === 'addBook' && isAdmin && ( // Hanya Admin yang bisa AddBook
                    <AddBookPage 
                        onAddBook={handleAddBook} 
                        onBack={handleBackToHome} 
                    />
                )}

                {page === 'requestBook' && (
                    <RequestBookPage 
                        onRequestBook={handleRequestBook}
                        onBack={handleBackToHome}
                    />
                )}

                {page === 'admin' && isAdmin && ( 
                    <AdminPage
                        onAddBook={() => setPage('addBook')} 
                        fetchRequests={fetchRequests} 
                        totalBooks={totalBooks} // Kirim total buku
                    />
                )}
                
                {/* Pesan Akses Ditolak untuk Non-Admin yang mencoba AddBook/Admin Page */}
                {(page === 'admin' || page === 'addBook') && !isAdmin && ( 
                    <div className="container mx-auto p-6 text-center mt-20">
                        <h2 className="text-3xl font-bold text-red-600">Akses Ditolak</h2>
                        <p className="mt-4">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
                        <button onClick={handleBackToHome} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">Kembali ke Home</button>
                    </div>
                )}
            </main>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Notifikasi"
            >
                <p>{modalMessage}</p>
                <button
                    onClick={() => setModalOpen(false)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
                >
                    Tutup
                </button>
            </Modal>
        </div>
    );
}