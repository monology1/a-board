import Link from "next/link";
import {
    ArrowForward,
    ArticleOutlined,
    HomeOutlined, Logout, LogoutOutlined,

} from "@mui/icons-material";
import {ApiClient} from "@/api/client";
import {API} from "@/constants/constants";

export const Sidebar = ({isOpen, onClose}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    function logout() {
        ApiClient.getInstance().post(API.logout, {})
    }

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Mobile Sidebar */}
                <nav className={`
                    md:hidden fixed top-0 left-[95px] h-full w-10/12 bg-green-500 z-[100]
                    transform transition-transform duration-200 ease-in-out rounded-bl-[12px] rounded-tl-[12px]
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}>
                    <div className="p-[16px] h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-6">
                                <button
                                    onClick={onClose}
                                    className="text-white p-1"
                                >
                                    <ArrowForward/>
                                </button>
                            </div>
                            {/* Navigation Links - Mobile */}
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href="/"
                                        className="flex items-center space-x-2 text-white"
                                    >
                                        <HomeOutlined className="h-5 w-5"/>
                                        <span>Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/our-blog"
                                        className="flex items-center space-x-2 text-white"
                                    >
                                        <ArticleOutlined className="h-5 w-5"/>
                                        <span>Our Blog</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Logout at bottom */}
                        <div className="mb-4">
                            <button
                                onClick={() => {
                                    localStorage.removeItem('userProfile');
                                    logout()
                                    window.location.href = '/signin';
                                }}
                                className="flex items-center space-x-2 text-white"
                            >
                                <LogoutOutlined className="h-5 w-5"/>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </nav>

            {/* Desktop Sidebar */}
            <nav className="hidden md:block static w-[280px] bg-gray-100 p-[32px]">
                <div className="h-full flex flex-col justify-between">
                    <div className="space-y-4">
                        {/* Navigation Links - Desktop */}
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                                >
                                    <HomeOutlined className="h-4 w-4"/>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/our-blog"
                                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                                >
                                    <ArticleOutlined className="h-4 w-4"/>
                                    <span>Our Blog</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Logout button for desktop */}
                    <div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('userProfile');
                                logout()
                                window.location.href = '/signin';
                            }}
                            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                        >
                            <LogoutOutlined className="h-4 w-4"/>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

// Sample data for posts
const posts = [
    {
        id: 1,
        title: "The Beginning of the End of the World",
        author: "Writer01",
        avatar: "/api/placeholder/32/32",
        category: "History",
        excerpt: "The afterlife vision The Good Place comes to its culmination, the show's two protagonists...",
        commentsCount: 12
    },
    {
        id: 2,
        title: "The Big Short War",
        author: "Zach",
        avatar: "/api/placeholder/32/32",
        category: "History",
        excerpt: "The afterlife, beforetime and certain eyes, he was the kind of hyper-ambitious kid...",
        commentsCount: 4
    },
    {
        id: 3,
        title: "The Mental Health Benefits of Exercise",
        author: "Nicholas",
        avatar: "/api/placeholder/32/32",
        category: "Exercise",
        excerpt: "You already know that exercise is good for your body. But did you know it can also boost your mood...",
        commentsCount: 32
    }
];