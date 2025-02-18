import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import {Article, Home} from "@mui/icons-material";

export const Topbar = ({onMenuClick, isAuthenticated}: {
    onMenuClick: () => void;
    isAuthenticated: boolean;
}) => {
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
                    <button className="hidden md:block bg-success hover:bg-success/90 text-white px-[16px] py-[10px] rounded text-sm">
                        Sign In
                    </button>
                    <div className="md:hidden" >
                        <button onClick={onMenuClick} className="text-white">
                            <MenuIcon className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};