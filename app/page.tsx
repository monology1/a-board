import {SearchBar} from "@/components/common/SearchBar";
import {CommunityDropdown} from "@/components/common/CommunityDropdown";
import {CreateButton} from "@/components/common/CreateButton";

interface Post {
    id: number;
    author: string;
    category: string;
    title: string;
    excerpt: string;
    commentsCount: number;
}

export default async function Home() {
    // This would typically come from an API
    const posts: Post[] = [
        {
            id: 1,
            author: "Writesel",
            category: "History",
            title: "The Beginning of the End of the World",
            excerpt: "The afterlife vision The Good Place comes to its culmination, the show's two protagonists, Eleanor and Chidi, contemplate their future, having lived thousands upon thousands of lifetimes together, and having experienced virtually everything this life has to offe...",
            commentsCount: 32
        },
        {
            id: 2,
            author: "Zach",
            category: "History",
            title: "The Big Short War",
            excerpt: "The afterlife, beforetime and certain eyes, he was the kind of hyper-ambitious kid other kids tend to hate and just the type to make the school more difficult for everyone. But on the night before the L.A.P.D, his father took pity on him and cancelled the trip. \"You'll ne...",
            commentsCount: 14
        },
        {
            id: 3,
            author: "Nicholas",
            category: "Exercise",
            title: "The Mental Health Benefits of Exercise",
            excerpt: "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
            commentsCount: 32
        },
        {
            id: 4,
            author: "Nicholas",
            category: "Exercise",
            title: "The Mental Health Benefits of Exercise",
            excerpt: "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
            commentsCount: 32
        },
        {
            id: 5,
            author: "Nicholas",
            category: "Exercise",
            title: "The Mental Health Benefits of Exercise",
            excerpt: "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
            commentsCount: 32
        },
        {
            id: 6,
            author: "Nicholas",
            category: "Exercise",
            title: "The Mental Health Benefits of Exercise",
            excerpt: "You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep, and help you deal with depression, anxiety, stress, and more?",
            commentsCount: 32
        }
    ];

    return (
        <div className="max-w-3xl px-[25px] md:ml-[50px] h-screen flex flex-col">
            {/*header contain*/}
            {/*desktop version*/}
            <div className="flex items-center space-x-4 my-4">
                <div className="flex-1 max-w-xl">
                    <SearchBar/>
                </div>
                <CommunityDropdown/>
                <CreateButton/>
            </div>
            {/*main contain*/}
            <div className="bg-white flex-1 rounded-lg shadow-sm overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {posts.map((post) => (
                    <article key={post.id} className="p-6 border-b last:border-b-0">
                        <div className="flex items-start space-x-4">
                            {/* Author Avatar */}
                            <div className="flex-shrink-0">
                                <img
                                    src={`/api/placeholder/40/40`}
                                    alt={post.author}
                                    className="w-10 h-10 rounded-full"
                                />
                            </div>

                            {/* Post Content */}
                            <div className="flex-1 min-w-0">
                                {/* Category */}
                                <p className="text-sm text-gray-500 mb-1">
                                    {post.category}
                                </p>

                                {/* Title */}
                                <h2 className="text-lg font-medium text-gray-900 mb-2">
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-gray-700 text-sm mb-2">
                                    {post.excerpt}
                                </p>

                                {/* Comments count */}
                                <div className="text-sm text-gray-500">
                                    {post.commentsCount} Comments
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
