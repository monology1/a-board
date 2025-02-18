"use client";

import {useEffect, useState} from "react";
import {SearchBar} from "@/components/common/SearchBar";
import {CommunityDropdown} from "@/components/common/CommunityDropdown";
import {CreateButton} from "@/components/common/CreateButton";
import {ApiClient} from "@/api/client";
import {API} from "@/constants/constants";
import {useRouter} from "next/navigation";

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

function highlightMatch(text: string, query: string) {
    if (!query) return text; // no highlight if empty

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text; // no match, return original

    const start = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const end = text.substring(index + query.length);

    return (
        <>
            {start}
            <span className="bg-yellow-200">{match}</span>
            {end}
        </>
    );
}

export default function Post() {
    const router = useRouter();

    const handleClick = (post: Post) => {
        // Navigate to /post/[id]
        router.push(`/post/${post.id}`);
    };

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    // State for filters
    const [titleFilter, setTitleFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const fetchPosts = async (author?: string, category?: string) => {
        setLoading(true);
        try {
            // Build query parameters
            let url = API.posts;
            const params = new URLSearchParams();

            if (author) params.append("author", author);
            if (category) params.append("category", category);

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            // Fetch from your API
            const response: any = await ApiClient.getInstance().get(url);
            setPosts(response);
            console.log("Posts fetched successfully");
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearch = (title: string) => {
        if (title.length < 2) {
            setTitleFilter("");
            return;
        }

        setTitleFilter(title);
    };


    // Callback when user selects a category
    const handleCategoryChange = (category: string) => {
        setCategoryFilter(category);
        fetchPosts(category);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl px-[25px] md:ml-[50px] h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 my-4">
                <div className="flex-1">
                    <SearchBar onSearch={handleSearch}/>
                </div>
                <CommunityDropdown onCategorySelect={handleCategoryChange}/>
                <CreateButton/>
            </div>

            {/* Main Content */}
            <div
                className="bg-white flex-1 rounded-lg shadow-sm overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {posts.map((post) => (
                    <article key={post.id} className="p-4 border-b cursor-pointer"  onClick={() => handleClick(post)}>
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
                        <h2 className="text-black font-medium mb-2">
                            {highlightMatch(post.title, titleFilter)}
                        </h2>

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