"use server";

import { Post } from "@/types/post";
import { revalidatePath } from "next/cache";
import { UpdatePostDTO } from "./dtos/update-post.dto";
import { CreatePostDTO } from "./dtos/create-post.dto";
import {
	serverApiDelete,
	serverApiGet,
	serverApiPatch,
	serverApiPost,
} from "@/lib/serverApi";

export async function getPosts() {
	const { data } = await serverApiGet("/posts");
	return data;
}

export async function createPost(data: CreatePostDTO): Promise<Post> {
	const res = await serverApiPost("/posts", data);
	revalidatePath("/posts");
	return res.data;
}

export async function updatePost(
	id: string,
	data: UpdatePostDTO
): Promise<Post> {
	const res = await serverApiPatch(`/posts/${id}`, data);
	revalidatePath("/posts");
	return res.data;
}

export async function deletePost(id: string): Promise<void> {
	await serverApiDelete(`posts/${id}`);
	revalidatePath("/posts");
}
