"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addComment, getComments } from "@/app/(protected)/posts/actions";
import { Comment } from "@/types/comment";
import { useState } from "react";

export function useComment(postId: string) {
	const [newComment, setNewComment] = useState("");
	const queryClient = useQueryClient();

	const {
		data: comments = [],
		isPending,
		isError,
	} = useQuery<Comment[]>({
		queryKey: ["comments", postId],
		queryFn: () => getComments(postId),
	});

	const { mutateAsync: createComment, isPending: isSubmitting } = useMutation(
		{
			mutationFn: (content: string) => addComment(postId, content),
			onSuccess: () => {
				setNewComment("");
				queryClient.invalidateQueries({
					queryKey: ["comments", postId],
				});
			},
		}
	);

	async function handleAddComment() {
		if (!newComment.trim()) return;
		await createComment(newComment);
	}

	return {
		comments,
		isPending,
		isError,
		isSubmitting,
		newComment,
		setNewComment,
		handleAddComment,
	};
}
