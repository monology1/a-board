import {Logo} from "@/components/AboardLogo";
import {SignIn} from "@/components/SignIn";


export default function SignInPage() {
    return (
        <main className="min-h-screen bg-green-500">
            {/* Mobile View */}
            <div className="md:hidden flex flex-col min-h-screen p-8">
                <div className="mb-auto">
                    <Logo className="mb-10" />
                    <h1 className="text-white font-castoro text-3xl mb-6">Sign in</h1>
                    <SignIn />
                </div>
                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto" />
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex min-h-screen items-center justify-center">
                <div className="max-w-md w-full px-8">
                    <h1 className="text-white font-castoro text-3xl mb-6">Sign in</h1>
                    <SignIn />
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <Logo className="transform scale-150" /> {/* Larger logo for desktop */}
                </div>
            </div>
        </main>
    );
}