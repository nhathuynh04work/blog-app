export type Post = {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	userId: string;
	author: string;
};

export type PostWithSummary = Post & {
	likeCount: number;
	likedByCurrentUser: boolean;
	commentCount: number;
};
