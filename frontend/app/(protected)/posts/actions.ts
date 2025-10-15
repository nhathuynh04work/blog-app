"use server";

import { Post } from "@/types/post";
import { revalidatePath } from "next/cache";
import { UpdatePostDTO } from "./dtos/update-post.dto";
import { CreatePostDTO } from "./dtos/create-post.dto";
import serverApi from "@/lib/serverApi";

export async function getPosts() {
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
