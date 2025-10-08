"use server";

import api from "@/lib/axios";
import { CreatePostDTO } from "@/lib/validations";
import { Post } from "@/types/post";
import { revalidatePath } from "next/cache";

export async function getPosts(): Promise<Post[]> {
	const res = await api.get("/posts");
	return res.data;
}

export async function createPost(data: CreatePostDTO): Promise<Post> {
	const res = await api.post("/posts", data);
	revalidatePath("/posts");
	return res.data;
}
