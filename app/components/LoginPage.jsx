"use client";
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

const LoginPage = ({ onLogin, onGoToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Email dan password harus diisi");
            return;
        }
        onLogin(email, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <div className="flex justify-center">
                    <BookOpen size={48} className="text-blue-600 dark:text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                    Login ke Perpustakaan
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Belum punya akun?{' '}
                    <button onClick={onGoToRegister} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                        Register di sini
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;