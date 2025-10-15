"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PostWithSummary } from "@/types/post";
import { format } from "date-fns";
import { getNameInitials } from "@/lib/format";
import { Separator } from "@/components/ui/separator";
import LikeButton from "./like-button";
import { CommentDialog } from "./comment-dialog";

export default function PostCard({ post }: { post: PostWithSummary }) {
	const initials = getNameInitials(post.author);

	return (
		<Card className="transition-shadow hover:shadow-lg rounded-2xl border border-muted/30">
			<CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
				<div className="space-y-1">
					<CardTitle className="text-lg font-semibold">
						{post.title}
					</CardTitle>
					<p className="text-xs text-muted-foreground">
						{format(post.createdAt, "PPpp")}
					</p>
				</div>

				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarFallback className="text-xs">
							{initials}
						</AvatarFallback>
					</Avatar>
					<span className="text-sm font-medium text-foreground/90">
						{post.author}
					</span>
				</div>
			</CardHeader>

			<CardContent className="pt-2">
				<p className="text-sm text-foreground/80 leading-relaxed">
					{post.content}
				</p>
			</CardContent>

			<Separator orientation="horizontal" />

			<CardFooter className="flex justify-end items-center gap-4 px-4">
				<LikeButton post={post} />
				<CommentDialog
					postId={post.id}
					commentCount={post.commentCount}
				/>
			</CardFooter>
		</Card>
	);
}
