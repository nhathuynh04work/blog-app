"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPost, updatePost, deletePost } from "@/app/actions/post";
import { CreatePostDTO } from "../(protected)/posts/dtos/create-post.dto";
import { UpdatePostDTO } from "../(protected)/posts/dtos/update-post.dto";

export function usePostMutations() {
	const queryClient = useQueryClient();

	const handleSuccess = (msg: string) => {
		toast.success(msg);
		queryClient.invalidateQueries({ queryKey: ["posts"] });
	};

	const handleError = (msg: string) => {
		toast.error(msg);
	};

	const create = useMutation({
		mutationFn: (data: CreatePostDTO) => createPost(data),
		onSuccess: () => handleSuccess("Post created!"),
		onError: () => handleError("Failed to create post"),
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdatePostDTO }) =>
			updatePost(id, data),
		onSuccess: () => handleSuccess("Post updated!"),
		onError: () => handleError("Failed to update post"),
	});

	const remove = useMutation({
		mutationFn: (id: string) => deletePost(id),
		onSuccess: () => handleSuccess("Post deleted!"),
		onError: () => handleError("Failed to delete post"),
	});

	return { create, update, remove };
}
