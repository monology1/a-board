import {notFound} from "next/navigation";
import {ApiClient} from "@/api/client";
import {API} from "@/constants/constants";
import PostDetail, {Post} from "@/components/PostDetai";

type PostPageProps = {
    params: { id: string };
};

export default async function PostPage({params}: PostPageProps) {
    const {id} = params;

    let post: Post;

    try {
        post = (await ApiClient.getInstance().get(`${API.posts}/${id}/details`)) as Post;
        console.log(post)
        if (!post) {
            return notFound();
        }
    } catch (error) {
        console.error("Error fetching post details:", error);
        return notFound(); // or handle the error differently
    }

    // Pass the post data to your client component
    return (
        <div className="min-h-screen flex flex-col">
            <PostDetail post={post}/>
        </div>
    );
}