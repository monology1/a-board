"use client";

import {useEffect, useState} from "react";
import {
    ArrowBack,
    ChatBubbleOutlineRounded,
    Close as CloseIcon,
} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {ApiClient} from "@/api/client";
import {API} from "@/constants/constants";

interface UserProfile {
    id: number;
    name: string;
    updatedAt: Date;
    createdAt: Date;
}

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
    const [currentPost, setCurrentPost] = useState<Post>(post);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentText, setCommentText] = useState("");
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedProfile = localStorage.getItem("userProfile");

        // Update authentication state
        setIsAuthenticated(!!storedProfile);

        // Update user profile if available
        if (storedProfile) {
            try {
                setUserProfile(JSON.parse(storedProfile));
            } catch (error) {
                console.error("Error parsing user profile:", error);
                localStorage.removeItem("userProfile");
            }
        }
    }, []);

    // Add function to fetch updated post data
    const fetchUpdatedPost = async () => {
        try {
            const api = ApiClient.getInstance();
            const updatedPost = await api.get<Post>(`${API.posts}/${post.id}/details`);
            setCurrentPost(updatedPost);
        } catch (error) {
            console.error("Error fetching updated post:", error);
        }
    };

    const handleAddComment = async () => {
        if (!isAuthenticated) {
            console.log("Please login first");
            return;
        }
        if (!commentText.trim()) return;

        try {
            const requestBody = {
                content: commentText,
                postId: post.id,
                authorId: userProfile?.id,
            };

            const api = ApiClient.getInstance();
            const response = await api.post('/comments', requestBody);

            if (response) {
                // Fetch updated post data after successful comment creation
                await fetchUpdatedPost();
                setCommentText("");
                setIsModalOpen(false);
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Authentication error - please login again");
            } else {
                console.error("Error adding comment:", error);
            }
        }
    };

    const formatTimeAgo = (date: string) => {
        const now = new Date();
        const postDate = new Date(date);
        const diffMs = now.getTime() - postDate.getTime();

        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffMonths = (now.getFullYear() - postDate.getFullYear()) * 12 + (now.getMonth() - postDate.getMonth());

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

    const handleClick = () => {
        router.replace("/");
    };

    return (
        <div className="flex flex-col md:pl-28 h-full bg-white">
            {/* Header */}
            <div className="flex items-center p-4">
                <div
                    className="flex items-center justify-center rounded-full w-[44px] h-[44px] bg-green-100 cursor-pointer">
                    <ArrowBack className="text-gray-600" onClick={handleClick}/>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Author Info */}
                <div className="flex items-center space-x-2 mb-1 relative">
                    <div className="relative">
                        <img
                            src="/images/avatar.png"
                            alt={currentPost.author}
                            className="w-[48px] h-[48px] rounded-full"
                        />
                        <div
                            className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-success rounded-full border-2 border-white"/>
                    </div>
                    <span className="text-sm text-black font-medium">{currentPost.author}</span>
                    <span className="text-sm text-gray-500">{formatTimeAgo(currentPost.createdAt)}</span>
                </div>

                {/* Post Title and Content */}
                <div className="text-gray-500 text-xs my-3">{currentPost.category}</div>
                <h1 className="text-black font-semibold text-[28px] mb-2">{currentPost.title}</h1>
                <p className="text-gray-700 mb-6">{currentPost.content}</p>

                {/* Comments Section */}
                <div className="space-y-6">
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500">
                            <ChatBubbleOutlineRounded/> {currentPost.commentsCount} Comments
                        </span>
                    </div>

                    {/* Desktop "Add Comments" button and input */}
                    <div className="hidden md:block">
                        {isAuthenticated ? (
                            <>
                                {!isModalOpen ? (
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-4 py-1 text-sm text-green-600 border border-green-600 rounded-[8px] w-[132px] h-[40px] hover:bg-green-50"
                                    >
                                        Add Comments
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="What's on your mind..."
                            className="w-full h-32 p-3 border rounded-lg resize-none text-gray-300 focus:outline-none focus:border-green-500"
                        />
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                onClick={() => {
                                                    setIsModalOpen(false);
                                                    setCommentText('');
                                                }}
                                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleAddComment}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={() => router.push('/signin')}
                                className="px-4 py-1 text-sm text-green-600 border border-green-600 rounded-[8px] w-[132px] h-[40px] hover:bg-green-50"
                            >
                                Add Comments
                            </button>
                        )}
                    </div>

                    {/* Mobile "Add Comments" button and modal */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => {
                                if (isAuthenticated) {
                                    setIsModalOpen(true);
                                } else {
                                    router.push('/signin');
                                }
                            }}
                            className="px-4 py-1 text-sm text-green-600 border border-green-600 rounded-[8px] w-[132px] h-[40px] hover:bg-green-50"
                        >
                            Add Comments
                        </button>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4 md:pl-4">
                        {currentPost.comments?.map((comment) => (
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

            {/* Mobile Comment Modal */}
            {isModalOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-full max-w-lg mx-4">
                        <div className="flex justify-between items-center p-4">
                            <h2 className="text-lg font-normal text-black">Add Comments</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500">
                                <CloseIcon/>
                            </button>
                        </div>
                        <div className="p-4">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="What's on your mind..."
                                className="w-full h-32 p-3 border rounded-lg resize-none text-gray-300 focus:outline-none focus:border-green-500"
                            />
                            <div className="space-y-4">
                                <div className="flex-1">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 border border-success rounded-lg hover:text-gray-800 w-full"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <button
                                        onClick={handleAddComment}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}