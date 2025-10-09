"use client";

import { createPost } from "@/app/posts/actions";
import { CreatePostDTO } from "@/app/posts/dtos/create-post.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreatePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreatePostDTO) => createPost(data),

		onSuccess: () => {
			toast.success("Post created!");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},

		onError: () => {
			toast.error("Failed to create post");
		},
	});
}
