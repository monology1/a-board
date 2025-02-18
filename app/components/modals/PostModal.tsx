"use client";

import {Close as CloseIcon} from "@mui/icons-material";
import {useState, useEffect} from "react";
import {ApiClient} from "@/api/client";
import {API} from "@/constants/constants";
import {CreatePostCommunityDropdown} from "@/components/common/CreatePostCommunityDropdown";
import {PostType} from "@/app/types/post";

export type PostModalProps = {
    isOpen: boolean;
    onClose: () => void;
    /**
     * onSuccess is called after successfully creating or updating a post
     * and fetching its updated details.
     */
    onSuccess: (updatedPost: PostType) => void;
    /**
     * If provided, the modal works in edit mode and initializes fields with this data.
     * If not provided, the modal works in create mode.
     */
    initialData?: PostType;
};

export function PostModal({isOpen, onClose, onSuccess, initialData}: PostModalProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [category, setCategory] = useState(initialData?.category || "");

    // When the modal opens (or initialData changes), update our state.
    useEffect(() => {
        setTitle(initialData?.title || "");
        setContent(initialData?.content || "");
        setCategory(initialData?.category || "");
    }, [initialData, isOpen]);

    const handleSubmit = async () => {
        try {
            // Retrieve userProfile from localStorage
            const storedProfile = localStorage.getItem("userProfile");
            if (!storedProfile) {
                throw new Error("User profile not found in localStorage");
            }
            const userProfile = JSON.parse(storedProfile);
            const authorId = userProfile.id;

            const api = ApiClient.getInstance();

            let createdOrUpdatedPost: any;
            if (initialData) {
                // Edit mode: update the post using PUT
                createdOrUpdatedPost = await api.put(`${API.posts}/${initialData.id}`, {
                    title,
                    content,
                    category,
                    authorId,
                });
            } else {
                // Create mode: create a new post using POST
                createdOrUpdatedPost = await api.post(API.posts, {
                    title,
                    content,
                    category,
                    authorId,
                });
            }

            // Check that the response has an id
            if (!createdOrUpdatedPost?.id) {
                throw new Error("No 'id' found in response. Check API response.");
            }

            // Fetch updated post details (common for both modes)
            const updatedPost: PostType = await api.get(`${API.posts}/${createdOrUpdatedPost.id}/details`);
            onSuccess(updatedPost);

            // Reset the form and close modal
            setTitle("");
            setContent("");
            setCategory("");
            onClose();
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const handleCategorySelect = (selectedCategory: string) => {
        setCategory(selectedCategory);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg mx-4">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-lg font-semibold text-[#101828]">
                        {initialData ? "Edit Post" : "Create Post"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500">
                        <CloseIcon/>
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div className="md:w-3/6">
                        <CreatePostCommunityDropdown onCategorySelect={handleCategorySelect}
                                                     initialCategory={category} />
                    </div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full p-2 border rounded-lg text-gray-500 focus:outline-none focus:border-green-500"
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind..."
                        className="w-full h-32 p-2 border rounded-lg resize-none text-gray-500 focus:outline-none focus:border-green-500"
                    />

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-success border border-success rounded-lg hover:bg-gray-50 w-[105px]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-[105px]"
                        >
                            {initialData ? "Save" : "Post"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}