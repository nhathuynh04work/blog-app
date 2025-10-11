"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreatePostDTO } from "../dtos/create-post.dto";
import { createPost } from "../actions";

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
