import {Logo} from "@/components/AboardLogo";
import {SignIn} from "@/components/SignIn";


export default function SignInPage() {
    return (
        <main className="min-h-screen bg-green-500 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <Logo />
                <SignIn />
            </div>
        </main>
    );
}