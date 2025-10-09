"use server";

import api from "@/lib/axios";
import { CreatePostDTO } from "@/app/posts/dtos/create-post.dto";
import { Post } from "@/types/post";
import { revalidatePath } from "next/cache";
import { UpdatePostDTO } from "./dtos/update-post.dto";

export async function getPosts(): Promise<Post[]> {
	const res = await api.get("/posts");
	return res.data;
}

export async function createPost(data: CreatePostDTO): Promise<Post> {
	const res = await api.post("/posts", data);
	revalidatePath("/posts");
	return res.data;
}

export async function updatePost(
	id: string,
	data: UpdatePostDTO
): Promise<Post> {
	const res = await api.patch(`/posts/${id}`, data);
	revalidatePath("/posts");
	return res.data;
}
