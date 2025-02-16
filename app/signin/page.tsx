import {Logo} from "@/components/AboardLogo";
import {SignIn} from "@/components/SignIn";


export default function SignInPage() {
    return (
        <main className="min-h-screen bg-green-500">
            {/* Mobile View */}
            <div className="md:hidden flex flex-col min-h-screen">
                <div className="bg-green-300 rounded-b-[36px] h-[362px] flex items-center justify-center">
                    <div className="text-center">
                        <Logo />
                    </div>
                </div>
                <div className="flex-1 bg-green-500 px-6 pt-16">
                    <h1 className="text-white font-castoro text-4xl mb-8">Sign in</h1>
                    <SignIn />
                </div>
                {/* Home indicator */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
                    <div className="w-32 h-1 bg-white/20 rounded-full" />
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex md:h-screen">
                <div className="flex-1 flex items-center justify-center px-8">
                    <div className="w-[384px]">
                        <h1 className="text-white font-castoro text-3xl mb-6">Sign in</h1>
                        <SignIn/>
                    </div>
                </div>
                <div
                    className="flex-1 flex justify-center items-center bg-green-300 rounded-[36px] h-full max-w-[632px]">
                    <Logo className="transform scale-150"/>
                </div>
            </div>
        </main>
    );
}