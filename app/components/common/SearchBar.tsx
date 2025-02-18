'use client';

import { Search } from '@mui/icons-material';

export const SearchBar = () => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search"
                className="w-full border border-green-100 bg-gray-100/50 rounded-md py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500"
            />
        </div>
    );
};