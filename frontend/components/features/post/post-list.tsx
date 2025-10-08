"use client";

import { Post } from "@/types/post";
import BlogCard from "./post-card";

export default function BlogList({ posts }: { posts: Post[] }) {
	if (!posts.length)
		return (
			<p className="text-muted-foreground text-sm">No posts available.</p>
		);

	return (
		<div className="flex flex-col gap-4">
			{posts.map((blog) => (
				<BlogCard key={blog.id} blog={blog} />
			))}
		</div>
	);
}
