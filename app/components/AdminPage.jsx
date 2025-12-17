// app/components/AdminPage.jsx
"use client";
import React, { useEffect, useState, useCallback } from 'react';
import RequestItem from './RequestItem'; // Pastikan Anda sudah membuat komponen RequestItem.jsx

// Menerima properti 'totalBooks' dan 'fetchRequests'
const AdminPage = ({ onAddBook, fetchRequests, totalBooks }) => { 
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk memuat data request buku dari Supabase
    const loadRequests = useCallback(async () => {
        setLoading(true);
        // fetchRequests adalah fungsi yang diteruskan dari page.jsx 
        const fetchedRequests = await fetchRequests(); 
        setRequests(fetchedRequests);
        setLoading(false);
    }, [fetchRequests]); 

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white border-b pb-2">
                ⚙️ Dashboard Admin Perpustakaan
            </h1>
            
            {/* Kartu Aksi Cepat / Statistik */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                
                {/* Kartu Tambah Buku (Klikable) */}
                <div 
                    onClick={onAddBook} 
                    className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl shadow-xl cursor-pointer transition duration-300 transform hover:scale-[1.02]"
                >
                    <h2 className="text-2xl font-bold">➕ Tambah Buku Baru</h2>
                    <p className="mt-2 text-sm opacity-90">Langsung input detail buku ke koleksi utama.</p>
                </div>

                {/* Kartu Total Buku (Menampilkan Total Buku dari props) */}
                <div className="bg-blue-600 text-white p-6 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-bold">📚 Total Buku (Tersedia)</h2>
                    <p className="mt-2 text-4xl font-extrabold">
                        {totalBooks} 
                    </p>
                    <p className="text-sm opacity-80">Total koleksi yang terdaftar.</p>
                </div>
                
                {/* Kartu Request Pending */}
                <div className="bg-yellow-600 text-white p-6 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-bold">⏳ Request Pending</h2>
                    <p className="mt-2 text-4xl font-extrabold">
                        {requests.filter(r => r.status === 'pending').length}
                    </p>
                    <p className="text-sm opacity-80">Menunggu review/aksi.</p>
                </div>
                
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-5 text-gray-800 dark:text-gray-200">
                Daftar Request Buku ({requests.length} Total)
            </h2>

            {loading && (
                <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
                    <p className="text-lg">Memuat data request dari Supabase...</p>
                </div>
            )}

            {!loading && requests.length === 0 && (
                <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
                    <p className="text-lg text-gray-500">🎉 Tidak ada request buku saat ini.</p>
                </div>
            )}

            {!loading && requests.length > 0 && (
                <div className="space-y-4">
                    {requests.map(request => (
                        <RequestItem 
                            key={request.id} 
                            request={request}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPage;