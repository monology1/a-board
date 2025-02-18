"use client";

import { useState } from "react";

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

export default function PostDetail({ post }: PostDetailProps) {
    // Example: local state for "Add Comment" or any other client-side interaction
    const [commentText, setCommentText] = useState("");

    const handleAddComment = () => {
        // Example: you'd call your API to add a new comment, then update the UI
        console.log("Add comment:", commentText);
    };

    return (
        <div className="p-4 flex-1">
            {/* Post Header */}
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center mb-4">
                <img
                    src="/images/avatar.png"
                    alt={post.author}
                    className="w-10 h-10 rounded-full mr-2"
                />
                <p className="text-sm text-gray-600">Author: {post.author}</p>
            </div>

            {/* Post Content */}
            <div className="text-gray-700 mb-6">{post.content}</div>

            {/* Comments */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Comments ({post.comments?.length ?? 0})
                </h2>
                <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    onClick={handleAddComment}
                >
                    Add Comment
                </button>
            </div>

            {post.comments && post.comments.length > 0 ? (
                <div className="space-y-4">
                    {post.comments.map((comment) => (
                        <div key={comment.id} className="border rounded p-3">
                            <p className="text-sm font-semibold text-gray-800 mb-1">
                                {comment.author}
                            </p>
                            <p className="text-sm text-gray-600">{comment.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500">No comments yet.</p>
            )}

            {/* Example comment input */}
            <div className="mt-6">
                <label htmlFor="newComment" className="block mb-1 font-medium">
                    Write a comment:
                </label>
                <textarea
                    id="newComment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full border rounded p-2 text-sm"
                    rows={3}
                />
            </div>
        </div>
    );
}