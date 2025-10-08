import * as z from "zod";

export const createBlogSchema = z.object({
	title: z
		.string()
		.min(2, { message: "Title must be at least 3 characters" }),
	content: z
		.string()
		.min(10, { message: "Content must be at least 10 characters" }),
});
