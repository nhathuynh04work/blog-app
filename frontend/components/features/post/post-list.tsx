"use client";

import { Post } from "@/types/post";
import UpdatePostDialog from "./update-post-dialog";
import PostCard from "./post-card";

export default function PostList({ posts }: { posts: Post[] }) {
	if (!posts.length)
		return (
			<p className="text-muted-foreground text-sm">No posts available.</p>
		);

	return (
		<div className="flex flex-col gap-4">
			{posts.map((post) => (
				<UpdatePostDialog key={post.id} post={post}>
					<PostCard post={post} />
				</UpdatePostDialog>
			))}
		</div>
	);
}
