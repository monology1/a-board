"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "@/components/common/SearchBar";
import { CommunityDropdown } from "@/components/common/CommunityDropdown";
import { CreateButton } from "@/components/common/CreateButton";
import { ApiClient } from "@/api/client";
import { API } from "@/constants/constants";

interface Post {
    id: number;
    author: string;
    category: string;
    title: string;
    excerpt: string;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
}

export default function Post() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                // Call your API endpoint to fetch posts.
                const response: any = await ApiClient.getInstance().get(API.posts);
                // Assuming the API returns an object with a "posts" property that is an array.
                setPosts(response);
                console.log("Posts fetched successfully");
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl px-[25px] md:ml-[50px] h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 my-4">
                <div className="flex-1 max-w-xl">
                    <SearchBar />
                </div>
                <CommunityDropdown />
                <CreateButton />
            </div>

            {/* Main Content */}
            <div className="bg-white flex-1 rounded-lg shadow-sm overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {posts.map((post) => (
                    <article key={post.id} className="p-4">
                        {/* Author and Avatar */}
                        <div className="flex items-center space-x-2 mb-1">
                            <img
                                src="/images/avatar.png"
                                alt={post.author}
                                className="w-[31px] h-[31px] rounded-full"
                            />
                            <span className="text-sm text-gray-300">{post.author}</span>
                        </div>

                        {/* Category */}
                        <div className="text-gray-500 text-xs my-3">{post.category}</div>

                        {/* Title */}
                        <h2 className="text-black font-medium mb-2">{post.title}</h2>

                        {/* Excerpt */}
                        <p className="text-sm text-black mb-2">{post.excerpt}</p>

                        {/* Comments count */}
                        <div className="flex items-center text-gray-300 text-xs">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1">
                                <path
                                    fill="currentColor"
                                    d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                                />
                            </svg>
                            {post.commentsCount} Comments
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}