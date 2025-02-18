export interface PostType {
    id: number;
    title: string;
    content: string;
    category: string;
    authorId: number;
    excerpt?: string;
    // add other fields as needed
}