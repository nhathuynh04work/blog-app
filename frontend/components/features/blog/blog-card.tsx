"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types/blog";
import { format } from "date-fns";

export default function BlogCard({ blog }: { blog: Blog }) {
	return (
		<Card className="transition hover:shadow-md">
			<CardHeader>
				<CardTitle>{blog.title}</CardTitle>
				<p className="text-sm text-muted-foreground">
					{format(blog.createdAt, "PPpp")}
				</p>
			</CardHeader>
			<CardContent>
				<p className="text-sm leading-relaxed">{blog.content}</p>
			</CardContent>
		</Card>
	);
}
