import Image from "next/image";
import LogoImage from "@/public/images/a-board.png"

interface LogoProps {
    className?: string;
}

export const Logo = ({ className = '' }: LogoProps) => {
    return (
        <div className={`text-center ${className}`}>
            <Image
                src={LogoImage}
                alt="a Board"
                className="mx-auto mb-2 md:max-w-[171.46px] max-w-[299.61px]"
            />
            <h2 className="text-white font-castoro text-[28px] italic">a Board</h2>
        </div>
    );
};