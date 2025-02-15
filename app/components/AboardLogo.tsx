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
                width={120}
                height={120}
                className="mx-auto mb-2"
            />
            <h2 className="text-white font-castoro text-xl">a Board</h2>
        </div>
    );
};