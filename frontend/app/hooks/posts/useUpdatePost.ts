// hooks/useUpdatePost.ts
"use client";

import { updatePost } from "@/app/posts/actions";
import { UpdatePostDTO } from "@/app/posts/dtos/update-post.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
