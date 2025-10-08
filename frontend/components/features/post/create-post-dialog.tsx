"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CreatePostForm from "./create-post-form";

export default function CreatePostDialog() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">New post</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new blog</DialogTitle>
					<DialogDescription>
						Fill in the details for your new blog.
					</DialogDescription>
				</DialogHeader>

				<CreatePostForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
