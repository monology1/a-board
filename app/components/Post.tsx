"use client";

import {useEffect, useState} from "react";
import {SearchBar} from "@/components/common/SearchBar";
import {CommunityDropdown} from "@/components/common/CommunityDropdown";
import {CreateButton} from "@/components/common/CreateButton";
import {ApiClient} from "@/api/client";
import {API} from "@/constants/constants";
import {useRouter} from "next/navigation";
import {BorderColorOutlined, ChatBubbleOutlineRounded, DeleteOutlined} from "@mui/icons-material";
import {PostModal} from "@/components/modals/PostModal";
import {PostType} from "@/app/types/post";
import {DeletePostModal} from "@/components/common/DeletePostModal";

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

interface PostProps {
    showOurBlogActions?: boolean;
}

function highlightMatch(text: string, query: string) {
    if (!query) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
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

export default function Post({showOurBlogActions = false}: PostProps) {
    const router = useRouter();

    // CREATE
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // EDIT
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState<PostType | null>(null);

    // DELETE
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [titleFilter, setTitleFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const fetchPosts = async (author?: string, category?: string) => {
        setLoading(true);
        try {
            let url = API.posts;
            const params = new URLSearchParams();

            if (author) params.append("author", author);
            if (category) params.append("category", category);

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const api = ApiClient.getInstance();
            const response: any = await api.get(url);
            setPosts(response);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

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

    const handleCategoryChange = (category: string) => {
        setCategoryFilter(category);
        fetchPosts("", category);
    };

    const handleClick = (post: Post) => {
        router.push(`/post/${post.id}`);
    };

    // EDIT
    const handleEdit = (post: PostType, e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("Edit post:", post.id);
        setPostToEdit(post);
        setIsEditModalOpen(true);
    };

    // DELETE
    const handleDelete = (post: Post, e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("Delete post:", post.id);
        setPostToDelete(post);
        setIsDeleteModalOpen(true);
    };

    // If still loading data
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
                <CreateButton onClick={() => setIsCreateModalOpen(true)}/>
            </div>

            {/* Main Content */}
            <div
                className="bg-white flex-1 rounded-lg shadow-sm overflow-auto
                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {posts.map((post: any) => (
                    <article
                        key={post.id}
                        className="p-4 border-b"
                    >
                        {/* Conditionally show Edit/Delete if showOurBlogActions = true */}
                        {showOurBlogActions && (
                            <div className="flex justify-end items-center space-x-2">
                                <BorderColorOutlined
                                    className="text-green-300 cursor-pointer"
                                    onClick={(e) => handleEdit(post, e)}
                                />
                                <DeleteOutlined
                                    className="text-green-300 cursor-pointer"
                                    onClick={(e) => handleDelete(post, e)}
                                />
                            </div>
                        )}
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

                        {/* Comments */}
                        <div
                            className="flex items-center justify-between text-gray-300 cursor-pointer"
                            onClick={() => handleClick(post)}
                        >
                            <div className="flex items-center">
                                <ChatBubbleOutlineRounded className="mr-2"/>
                                {post.commentsCount} Comments
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Create Post Modal (for creating new posts) */}
            <PostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={() => {
                    fetchPosts();
                }}
            />

            {/* Edit Post Modal (for editing an existing post) */}
            {postToEdit && (
                <PostModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setPostToEdit(null);
                    }}
                    onSuccess={() => {
                        fetchPosts();
                    }}
                    initialData={postToEdit}
                />
            )}

            {/* Delete Post Modal */}
            <DeletePostModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setPostToDelete(null);
                }}
                postId={postToDelete?.id || null}
                onSuccess={() => {
                    // Once deletion is successful, refresh the post list
                    fetchPosts();
                }}
            />
        </div>
    );
}