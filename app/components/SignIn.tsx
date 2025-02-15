'use client';

import { useState } from 'react';

export const SignIn = () => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign in logic
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white text-custom-text mb-4"
            />
            <button
                type="submit"
                className="w-full py-3 bg-green-300 text-white rounded-md"
            >
                Sign In
            </button>
        </form>
    );
};