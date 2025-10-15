"use client";

import { type Comment } from "@/types/comment";
import { format } from "date-fns";

export function CommentItem({ comment }: { comment: Comment }) {
	return (
		<div key={comment.id} className="flex flex-col gap-1 pb-4 last:pb-0">
			<div className="flex items-center justify-between">
				<p className="font-medium text-sm text-foreground">
					{comment.author}
				</p>

				<p className="text-xs text-muted-foreground">
					{format(new Date(comment.createdAt), "PPpp")}
				</p>
			</div>

			<p className="text-sm text-foreground/80 break-words">
				{comment.content}
			</p>
		</div>
	);
}
