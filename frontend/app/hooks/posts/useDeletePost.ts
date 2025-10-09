"use client";

import { deletePost } from "@/app/posts/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
