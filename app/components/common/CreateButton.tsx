'use client';

interface CreateButtonProps {
    onClick: () => void;
}

export function CreateButton({ onClick }: CreateButtonProps) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
            Create Post
        </button>
    );
}
