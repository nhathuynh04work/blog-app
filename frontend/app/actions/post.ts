"use server";

import { Post, PostWithSummary } from "@/types/post";
import { revalidatePath } from "next/cache";
import serverApi from "@/app/actions/serverApi";
import { CreatePostDTO } from "../(protected)/posts/dtos/create-post.dto";
import { UpdatePostDTO } from "../(protected)/posts/dtos/update-post.dto";

export async function getPosts(): Promise<PostWithSummary[]> {
	const { data } = await serverApi.get("/posts");
	return data;
}

export async function createPost(data: CreatePostDTO): Promise<Post> {
	const res = await serverApi.post("/posts", data);
	revalidatePath("/posts");
	return res.data;
}

export async function updatePost(
	id: string,
	data: UpdatePostDTO
): Promise<Post> {
	const res = await serverApi.patch(`/posts/${id}`, data);
	revalidatePath("/posts");
	return res.data;
}

export async function deletePost(id: string): Promise<void> {
	await serverApi.delete(`posts/${id}`);
	revalidatePath("/posts");
}
