"use client";

import {useState} from "react";
import {ArrowBack} from "@mui/icons-material";

interface Comment {
    id: number;
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    category: string;
    excerpt?: string | null;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
    comments?: Comment[];
}

type PostDetailProps = {
    post: Post;
};

export default function PostDetail({post}: PostDetailProps) {
    // Example: local state for "Add Comment" or any other client-side interaction
    const [commentText, setCommentText] = useState("");

    const handleAddComment = () => {
        // Example: you'd call your API to add a new comment, then update the UI
        console.log("Add comment:", commentText);
    };

    const formatTimeAgo = (date: string) => {
        const now = new Date();
        const postDate = new Date(date);
        const diffMs = now.getTime() - postDate.getTime();

        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffMonths = (now.getFullYear() - postDate.getFullYear()) * 12 +
            (now.getMonth() - postDate.getMonth());

        switch (true) {
            case diffMonths >= 1:
                return `${diffMonths}mo. ago`;
            case diffDays >= 1:
                return `${diffDays}d ago`;
            case diffHours >= 1:
                return `${diffHours}h ago`;
            case diffMinutes >= 1:
                return `${diffMinutes}m ago`;
            case diffSeconds >= 30:
                return `${diffSeconds}s ago`;
            default:
                return "Just now";
        }
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex items-center p-4">
                <div className="flex items-center justify-center rounded-full w-[44px] h-[44px] bg-green-100">
                    <ArrowBack className="text-gray-600"/>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Author Info */}
                <div className="flex items-center space-x-2 mb-1 relative">
                    <div className="relative">
                        <img
                            src="/images/avatar.png"
                            alt={post.author}
                            className="w-[48px] h-[48px] rounded-full"
                        />
                        <div
                            className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-success rounded-full border-2 border-white"/>
                    </div>
                    <span className="text-sm text-black font-medium">{post.author}</span>
                    <span className="text-sm text-gray-500">{formatTimeAgo(post.createdAt)}</span>
                </div>

                {/* Post Title and Content */}
                {/* Category */}
                <div className="text-gray-500 text-xs my-3">{post.category}</div>

                {/* Title */}
                <h1 className="text-black font-semibold text-[28px] mb-2">
                    {post.title}
                </h1>
                <p className="text-gray-700 mb-6">{post.content}</p>

                {/* Comments Section */}
                <div className="space-y-6">
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500">{post.commentsCount} Comments</span>
                    </div>

                    <div className="flex items-center">
                        <button
                            className="px-4 py-1 text-sm text-green-600 border border-green-600 rounded-[8px] w-[132px] h-[40px] hover:bg-green-50">
                            Add Comments
                        </button>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {post.comments?.map((comment) => (
                            <div key={comment.id} className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex-shrink-0"/>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-sm text-black font-medium">{comment.author}</span>
                                        <span
                                            className="text-sm text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}