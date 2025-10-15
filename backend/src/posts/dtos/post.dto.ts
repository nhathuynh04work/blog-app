import { CommentDTO } from "src/comments/dtos/comment.dto";

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

export type PostWithDetails = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    userId: string;
    author: string;
    likeCount: number;
    likedByCurrentUser: boolean;
    comments: CommentDTO[];
};
