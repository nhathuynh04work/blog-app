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
import CreateBlogForm from "./create-blog-form";

export default function CreateBlogDialog() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">New blog</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create new blog</DialogTitle>
					<DialogDescription>
						Fill in the details for your new blog.
					</DialogDescription>
				</DialogHeader>

				<CreateBlogForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
