"use client";

import { useAuth } from "@/app/providers/auth-provider";
import { type Comment } from "@/types/comment";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useComment } from "@/app/hooks/useComment";
import { timeSince } from "@/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CommentItem({ comment }: { comment: Comment }) {
	const { user } = useAuth();
	const { handleDeleteComment, isDeleting } = useComment(comment.postId);
	const isOwner = user?.id === comment.userId;

	return (
		<div className="flex items-start gap-3 mb-3">
			{/* Avatar */}
			<Avatar className="h-8 w-8">
				<AvatarImage src={undefined} alt={comment.author} />
				<AvatarFallback>
					{comment.author.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>

			{/* Comment bubble */}
			<div className="flex flex-col">
				<div className="bg-muted rounded-xl px-3 py-2 max-w-[500px]">
					<p className="font-medium text-sm text-foreground leading-tight">
						{comment.author}
					</p>
					<p className="text-sm text-foreground/90 break-words leading-relaxed">
						{comment.content}
					</p>
				</div>

				{/* Footer actions */}
				<div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground pl-2">
					<p>{timeSince(comment.createdAt)}</p>

					{isOwner && (
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 text-muted-foreground hover:text-destructive"
							onClick={() => handleDeleteComment(comment.id)}
							disabled={isDeleting}>
							<Trash2 className="h-3 w-3" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
