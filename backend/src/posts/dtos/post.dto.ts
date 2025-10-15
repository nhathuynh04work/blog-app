export type PostDTO = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    userId: string;
    author: string;
};

export type PostWithLikes = PostDTO & {
    likeCount: number;
    likedByCurrentUser: boolean;
};
