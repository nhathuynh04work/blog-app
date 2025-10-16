"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	addComment,
	getComments,
	deleteComment,
} from "@/app/(protected)/posts/actions";
import { Comment } from "@/types/comment";
import { useState } from "react";

export function useComment(postId: string) {
	const [newComment, setNewComment] = useState("");
	const queryClient = useQueryClient();

	// Fetch all comments for this post
	const {
		data: comments = [],
		isPending,
		isError,
	} = useQuery<Comment[]>({
		queryKey: ["comments", postId],
		queryFn: () => getComments(postId),
	});

	// Add comment mutation
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

	// Delete comment mutation
	const { mutateAsync: removeComment, isPending: isDeleting } = useMutation({
		mutationFn: (commentId: string) => deleteComment(commentId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
		},
	});

	// Handlers
	async function handleAddComment() {
		if (!newComment.trim()) return;
		await createComment(newComment);
	}

	async function handleDeleteComment(commentId: string) {
		await removeComment(commentId);
	}

	return {
		comments,
		isPending,
		isError,
		isSubmitting,
		isDeleting,
		newComment,
		setNewComment,
		handleAddComment,
		handleDeleteComment,
	};
}
