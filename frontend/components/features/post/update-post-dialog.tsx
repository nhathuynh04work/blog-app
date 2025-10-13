"use client";

import { ReactNode, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import UpdatePostForm from "./update-post-form";
import { Post } from "@/types/post";

interface UpdatePostDialogProps {
	children: ReactNode;
	post: Post;
}

export default function UpdatePostDialog({
	children,
	post,
}: UpdatePostDialogProps) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className="w-full text-left">{children}</button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update your post</DialogTitle>
					<DialogDescription>
						Change the details of your post.
					</DialogDescription>
				</DialogHeader>

				<UpdatePostForm onSuccess={() => setOpen(false)} post={post} />
			</DialogContent>
		</Dialog>
	);
}
