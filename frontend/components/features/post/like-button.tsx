"use client";

import { useLike } from "@/app/hooks/useLike";
import { Button } from "@/components/ui/button";
import { EntityType } from "@/types/entity-type.enum";
import { Post } from "@/types/post";
import { Heart } from "lucide-react";

export default function LikeButton({ post }: { post: Post }) {
	const { liked, likeCount, toggleLike, isPending } = useLike(
		EntityType.POST,
		post.id,
		post.likedByCurrentUser,
		post.likeCount
	);

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
