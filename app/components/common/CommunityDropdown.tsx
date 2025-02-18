'use client';

import {useState} from 'react';
import {Check, KeyboardArrowDown} from "@mui/icons-material";

interface Category {
    id: string;
    name: string;
}

export const CommunityDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    const categories: Category[] = [
        {id: 'history', name: 'History'},
        {id: 'food', name: 'Food'},
        {id: 'pets', name: 'Pets'},
        {id: 'health', name: 'Health'},
        {id: 'fashion', name: 'Fashion'},
        {id: 'exercise', name: 'Exercise'},
        {id: 'others', name: 'Others'},
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className="relative z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-1 text-black text-sm"
                >
                    <span>Community</span>
                    <KeyboardArrowDown/>
                </button>

                {isOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-[8px] shadow-lg py-[10px]">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className="flex justify-between w-full items-center text-left px-4 py-2 text-sm text-black hover:bg-green-100"
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    setIsOpen(false);
                                }}
                                onMouseEnter={() => setHoveredCategory(category.id)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                {category.name}
                                {(selectedCategory === category.id || hoveredCategory === category.id) && (
                                    <Check className="h-[20px] w-[20px] text-green-500"/>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};