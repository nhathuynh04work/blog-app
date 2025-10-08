"use server";

import { Blog } from "@/types/blog";
import { revalidatePath } from "next/cache";

const blogs: Blog[] = [
	{
		id: 1,
		title: "The fate of Ophelia",
		content: "A lovelorn girl",
		createdAt: new Date(),
	},
	{
		id: 2,
		title: "The fate of Taylor",
		content: "A lovelorn star",
		createdAt: new Date(),
	},
	{
		id: 3,
		title: "The fate of Noah",
		content: "A lovelorn boy",
		createdAt: new Date(),
	},
];

export async function getBlogs(): Promise<Blog[]> {
	return blogs;
}

export async function createBlog(formData: FormData): Promise<void> {
	const title = formData.get("title") as string;
	const content = formData.get("content") as string;

	const newBlog: Blog = {
		id: blogs.length + 1,
		title,
		content,
		createdAt: new Date(),
	};

	blogs.push(newBlog);

	revalidatePath("/blogs");
}
