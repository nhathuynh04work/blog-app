import { CommentDTO } from "src/comments/dtos/comment.dto";

export type PostDTO = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    userId: string;
    author: string;
};

export type PostWithSummary = PostDTO & {
    likeCount: number;
    likedByCurrentUser: boolean;
    commentCount: number;
};
