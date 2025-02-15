'use client';

import { useState } from 'react';

export const SignIn = () => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign in logic
    };

    return (
        <div className="w-full max-w-md space-y-4">
            <h2 className="text-2xl font-castoro text-custom-white text-center mb-8">
                Sign in
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-custom-white text-custom-text placeholder-gray-300 focus:outline-none"
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-green-300 text-custom-white rounded-md hover:bg-green-500 transition-colors"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};