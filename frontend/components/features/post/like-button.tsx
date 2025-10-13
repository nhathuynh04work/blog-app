"use client";

import { Button } from "@/components/ui/button";
import clientApi from "@/lib/clientApi";
import { Post } from "@/types/post";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LikeButton({ post }: { post: Post }) {
	const [liked, setLiked] = useState(post.likedByCurrentUser);
	const [likeCount, setLikeCount] = useState(post.likeCount);
	const [isPending, setIsPending] = useState(false);

	async function toggleLike() {
		if (isPending) return;

		// Optimistic update
		setLiked(!liked);
		setLikeCount(likeCount + (liked ? -1 : 1));
		setIsPending(true);

		try {
			if (liked) await clientApi.delete(`/posts/${post.id}/likes`);
			else await clientApi.post(`/posts/${post.id}/likes`);
		} catch {
			// Revert on error
			setLiked(liked);
			setLikeCount(likeCount);
			toast.error(liked ? "Fail to unlike post" : "Fail to like post");
		} finally {
			setIsPending(false);
		}
	}

	return (
		<Button
			size="sm"
			variant="ghost"
			className={`flex items-center gap-1 text-muted-foreground ${
				liked ? "text-red-500" : ""
			}`}
			aria-pressed={liked}
			disabled={isPending}
			onClick={toggleLike}>
			<Heart
				className={`w-4 h-4 ${
					liked ? "fill-red-500 text-red-500" : "hover:text-red-500"
				}`}
			/>
			<span>{likeCount}</span>
		</Button>
	);
}
