"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Post } from "@/types/post";
import { format } from "date-fns";

export default function PostCard({ post }: { post: Post }) {

	return (
		<Card className="transition hover:shadow-md">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
				<p className="text-sm text-muted-foreground">
					{format(post.createdAt, "PPpp")}
				</p>
			</CardHeader>

			<CardContent>
				<p className="text-sm leading-relaxed">{post.content}</p>
			</CardContent>
		</Card>
	);
}
