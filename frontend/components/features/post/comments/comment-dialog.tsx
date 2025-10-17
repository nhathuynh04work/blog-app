"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommentButton } from "./comment-button";
import { useComment } from "@/app/hooks/useComment";
import { CommentItem } from "./comment-item";

interface CommentDialogProps {
	postId: string;
	commentCount?: number;
}

export function CommentDialog({ postId, commentCount }: CommentDialogProps) {
	const {
		comments,
		isPending,
		isError,
		isSubmitting,
		newComment,
		setNewComment,
		handleAddComment,
	} = useComment(postId);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<CommentButton count={commentCount} />
			</DialogTrigger>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Comments</DialogTitle>
				</DialogHeader>

				{/* Comments list */}
				<ScrollArea className="max-h-80 pr-2">
					{isPending ? (
						<p className="text-sm text-muted-foreground">
							Loading...
						</p>
					) : isError ? (
						<p className="text-sm text-destructive">
							Failed to load comments.
						</p>
					) : comments.length ? (
						comments.map((c) => (
							<CommentItem comment={c} key={c.id} />
						))
					) : (
						<p className="text-sm text-muted-foreground">
							No comments yet.
						</p>
					)}
				</ScrollArea>

				{/* Add comment input */}
				<div className="flex items-center gap-2 mt-4">
					<Input
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="Add a comment..."
						disabled={isSubmitting}
					/>
					<Button onClick={handleAddComment} disabled={isSubmitting}>
						{isSubmitting ? "Sending..." : "Send"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
