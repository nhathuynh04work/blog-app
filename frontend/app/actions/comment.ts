"use server";

import serverApi from "@/app/actions/serverApi";
import { Comment } from "@/types/comment";

export async function getComments(postId: string): Promise<Comment[]> {
	const { data } = await serverApi.get(`posts/${postId}/comments`);
	return data;
}

export async function addComment(
	postId: string,
	content: string
): Promise<Comment> {
	const { data } = await serverApi.post(`posts/${postId}/comments`, {
		content,
	});

	return data;
}

export async function deleteComment(commentId: string) {
	await serverApi.delete(`/comments/${commentId}`);
}
