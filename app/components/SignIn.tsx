'use client';

import {useState} from 'react';
import {ApiClient} from "@/api/client";
import {API} from "@/constants/constants";

interface LoginRequest {
    username: string;
}

interface LoginResponse {
    access_token: string
    user: {
        id: number,
        username: string,
        createdAt: string,
        updatedAt: string
    }
}

export const SignIn = () => {
    const [username, setUsername] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const reqBody: LoginRequest = {
            username: username
        }
        try {
            const response: LoginResponse = await ApiClient.getInstance().post(API.signin, reqBody);
            localStorage.setItem("userProfile", JSON.stringify(response.user));
        } catch (error) {
            console.error(error);
        }
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
                className="w-full py-3 bg-success text-white rounded-md"
            >
                Sign In
            </button>
        </form>
    );
};