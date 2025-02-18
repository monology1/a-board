import {Close as CloseIcon} from "@mui/icons-material";
import {useState} from "react";
import {ApiClient} from "@/api/client";
import {API} from "@/constants/constants";
import {CreatePostCommunityDropdown} from "@/components/common/CreatePostCommunityDropdown";
import {PostType} from "@/app/types/post";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    /**
     * onSuccess is called after successfully creating a post
     * and fetching its updated details.
     */
    onSuccess: (updatedPost: PostType) => void;
}

export function CreatePostModal({
                                    isOpen,
                                    onClose,
                                    onSuccess,
                                }: CreatePostModalProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async () => {
        try {
            // Retrieve userProfile from localStorage and parse it.
            const storedProfile = localStorage.getItem("userProfile");
            if (!storedProfile) {
                throw new Error("User profile not found in localStorage");
            }
            const userProfile = JSON.parse(storedProfile);
            const authorId = userProfile.id;

            const api = ApiClient.getInstance();

            // Create the post with the required request body format.
            const createdPost = await api.post<PostType>(API.posts, {
                title,
                content,
                category,
                authorId,
            });


            // Ensure createdPost has an id
            if (!createdPost?.id) {
                throw new Error("No 'id' found in createdPost. Check API response.");
            }

            // 3. Fetch updated post details
            const updatedPost = await api.get<PostType>(
                `${API.posts}/${createdPost.id}/details`
            );

            // Call onSuccess with the updated post
            onSuccess(updatedPost);

            // Reset the form and close modal
            setTitle("");
            setContent("");
            setCategory("");
            onClose();
        } catch (error) {
            console.error("Error creating post:", error);
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
                    <h2 className="text-lg font-semibold text-[#101828]">Create Post</h2>
                    <button onClick={onClose} className="text-gray-500">
                        <CloseIcon/>
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div className="md:w-3/6">
                        <CreatePostCommunityDropdown onCategorySelect={handleCategorySelect}/>
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
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}