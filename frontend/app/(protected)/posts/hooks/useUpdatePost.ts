"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdatePostDTO } from "../dtos/update-post.dto";
import { updatePost } from "../actions";

export function useUpdatePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdatePostDTO }) =>
			updatePost(id, data),

		onSuccess: () => {
			toast.success("Post updated!");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},

		onError: () => {
			toast.error("Failed to update post.");
		},
	});
}
