"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePost } from "../actions";

export function useDeletePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deletePost(id),

		onSuccess: () => {
			toast.success("Post deleted!");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},

		onError: () => {
			toast.error("Failed to delete post.");
		},
	});
}
