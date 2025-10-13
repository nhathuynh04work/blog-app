"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Post } from "@/types/post";
import { format } from "date-fns";
import { getNameInitials } from "@/lib/format";

export default function PostCard({ post }: { post: Post }) {
	const initials = getNameInitials(post.author);

	return (
		<Card className="transition hover:shadow-md">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>{post.title}</CardTitle>
						<p className="text-sm text-muted-foreground">
							{format(post.createdAt, "PPpp")}
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8">
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
						<span className="text-sm font-medium">
							{post.author}
						</span>
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<p className="text-sm leading-relaxed">{post.content}</p>
			</CardContent>
		</Card>
	);
}
