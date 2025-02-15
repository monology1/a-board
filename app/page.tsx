import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function Home() {
    // Check if user is authenticated by looking for the token in cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    // If no token found, redirect to signin page
    if (!token) {
        redirect('/signin');
    }

    // If authenticated, show the home page content
    return (
        <main className="min-h-screen bg-green-500">
            {/* Mobile view */}
            <div className="md:hidden">
                <header className="p-4 bg-green-500 flex justify-between items-center">
                    <h1 className="text-white font-castoro">a Board</h1>
                    <button className="text-white">
                        <span className="sr-only">Menu</span>
                        {/* Menu icon */}
                    </button>
                </header>
                <div className="bg-white min-h-screen p-4">
                    {/* Post list for mobile */}
                </div>
            </div>

            {/* Desktop view */}
            <div className="hidden md:flex min-h-screen">
                <nav className="w-64 bg-green-500 p-4 fixed h-full">
                    <h1 className="text-white font-castoro text-2xl mb-8">a Board</h1>
                    <ul className="space-y-4">
                        <li>
                            <Link href="/" className="text-white">Home</Link>
                        </li>
                        <li>
                            <Link href="/our-blog" className="text-white">Our Blog</Link>
                        </li>
                    </ul>
                </nav>
                <main className="ml-64 flex-1 bg-white p-8">
                    {/* Post list for desktop */}
                </main>
            </div>
        </main>
    );
}
