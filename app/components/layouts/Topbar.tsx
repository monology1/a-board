import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import {Article, Home} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

interface UserProfile {
    firstName: string;
    lastName: string;
    avatar?: string;
}

export const Topbar = ({onMenuClick, isAuthenticated}: {
    onMenuClick: () => void;
    isAuthenticated: boolean;
}) => {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            const profile = localStorage.getItem('userProfile');
            if (profile) {
                setUserProfile(JSON.parse(profile));
            }
        }
    }, [isAuthenticated]);

    const handleSignin = async () => {
        router.push('/signin');
    };

    return (
        <header className="bg-green-500">
            <div className="h-14 px-4 flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-white text-lg font-castoro">
                        <span className="size-[24px] italic font-normal">a Board</span>
                    </Link>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-3">
                    {isAuthenticated && userProfile ? (
                        <div className="hidden md:flex items-center space-x-2">
                            <span className="text-white text-sm">{userProfile.firstName}</span>
                            <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
                                <img
                                    src="/images/avatar.png"
                                    alt={userProfile.firstName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleSignin}
                            className="hidden md:block bg-success hover:bg-success/90 text-white px-[16px] py-[10px] rounded text-sm"
                        >
                            Sign In
                        </button>
                    )}
                    <div className="md:hidden">
                        <button onClick={onMenuClick} className="text-white">
                            <MenuIcon className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};