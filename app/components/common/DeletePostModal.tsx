"use client";

import {Close as CloseIcon} from "@mui/icons-material";
import {useState} from "react";
import {ApiClient} from "@/api/client";
import {API} from "@/constants/constants";

interface DeletePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    /** The ID of the post to delete */
    postId: number | null;
    /**
     * Called after the post has been successfully deleted,
     * e.g., to refresh the post list.
     */
    onSuccess: () => void;
}

export function DeletePostModal({
                                    isOpen,
                                    onClose,
                                    postId,
                                    onSuccess,
                                }: DeletePostModalProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!postId) return; // No postId means nothing to delete
        setLoading(true);

        try {
            const api = ApiClient.getInstance();
            await api.delete(`${API.posts}/${postId}`);
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error deleting post:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Container */}
            <div className="bg-white rounded-lg w-full max-w-md mx-4">
                {/* Header */}
                <div className="p-4">
                    <div className="flex justify-center items-center">
                        <h2 className="text-lg font-semibold text-[#101828]">
                            Please confirm if you wish to
                        </h2>
                    </div>
                    <div className="flex justify-center items-center">
                        <h2 className="text-lg font-semibold text-[#101828]">
                            delete the post
                        </h2>
                    </div>
                </div>

                {/* Body */}
                <div className="px-4 pb-4 text-center">
                    <p className="text-sm text-[#475467]">
                        Are you sure you want to delete the post?
                    </p>
                    <p className="text-sm text-[#475467]">
                        Once deleted, it cannot be recovered.
                    </p>
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row px-4 pb-4 space-y-2 md:space-y-0 md:gap-x-3">
                    {/* Delete button first on mobile, second on desktop */}
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="
                          order-1 md:order-2
                          bg-red-600 text-white rounded-lg hover:bg-red-700
                          px-4 py-2
                          w-full md:w-1/2
                        "
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                    {/* Cancel button second on mobile, first on desktop */}
                    <button
                        onClick={onClose}
                        className="
                          order-2 md:order-1
                          text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50
                          px-4 py-2
                          w-full md:w-1/2
                        "
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}