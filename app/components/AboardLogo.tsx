import Image from "next/image";
import LogoImage from "@/public/images/a-board.png"
export const Logo = () => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <Image
                src={LogoImage}
                alt="a Board"
                width={120}
                height={120}
                className="relative w-auto h-auto"
            />
            <span className="text-custom-white font-castoro text-xl">a Board</span>
        </div>
    )
};