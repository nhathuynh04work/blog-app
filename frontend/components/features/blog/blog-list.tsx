"use client";

import { Blog } from "@/types/blog";
import BlogCard from "./blog-card";

export default function BlogList({ blogs }: { blogs: Blog[] }) {
	if (!blogs.length)
		return (
			<p className="text-muted-foreground text-sm">No blogs available.</p>
		);

	return (
		<div className="flex flex-col gap-4">
			{blogs.map((blog) => (
				<BlogCard key={blog.id} blog={blog} />
			))}
		</div>
	);
}
