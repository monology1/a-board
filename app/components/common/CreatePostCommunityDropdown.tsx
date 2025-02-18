"use client";

import { useState } from "react";
import { Check, KeyboardArrowDown } from "@mui/icons-material";

interface Category {
    id: string;
    name: string;
}

interface CreatePostCommunityDropdownProps {
    onCategorySelect: (category: string) => void;
}

export const CreatePostCommunityDropdown = ({ onCategorySelect }: CreatePostCommunityDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    const categories: Category[] = [
        { id: "history", name: "History" },
        { id: "food", name: "Food" },
        { id: "pets", name: "Pets" },
        { id: "health", name: "Health" },
        { id: "fashion", name: "Fashion" },
        { id: "exercise", name: "Exercise" },
        { id: "others", name: "Others" },
    ];

    const handleSelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setIsOpen(false);
        onCategorySelect(categoryId);
    };

    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 text-center text-success border border-success rounded-lg flex justify-center items-center"
            >
                <span>
                    {selectedCategory ?
                        categories.find(cat => cat.id === selectedCategory)?.name :
                        'Choose a community'
                    }
                </span>
                <KeyboardArrowDown />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className="w-full px-4 py-3 text-left hover:bg-green-50 flex justify-between items-center"
                            onClick={() => handleSelect(category.id)}
                            onMouseEnter={() => setHoveredCategory(category.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <span className="text-black">{category.name}</span>
                            {(selectedCategory === category.id || hoveredCategory === category.id) && (
                                <Check className="h-[20px] w-[20px] text-green-500" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};