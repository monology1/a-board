'use client';

import {useState} from 'react';
import {KeyboardArrowDown} from "@mui/icons-material";

interface Category {
    id: string;
    name: string;
}

export const CommunityDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

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
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 text-black text-sm"
            >
                <span>Community</span>
                <KeyboardArrowDown/>
            </button>

            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-1 w-48 bg-white rounded-[8px] shadow-lg py-[10px] px-[16px]">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                                // Handle category selection
                                setIsOpen(false);
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};