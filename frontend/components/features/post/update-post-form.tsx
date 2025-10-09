"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createPost, updatePost } from "@/app/posts/actions";
import {
	UpdatePostDTO,
	UpdatePostSchema,
} from "@/app/posts/dtos/update-post.dto";
import { Post } from "@/types/post";

interface UpdatePostFormProps {
	onSuccess?: () => void;
	post: Post;
}

export default function UpdatePostForm({
	onSuccess,
	post,
}: UpdatePostFormProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<UpdatePostDTO>({
		resolver: zodResolver(UpdatePostSchema),
		defaultValues: { title: post.title, content: post.content },
	});

	async function onSubmit(values: UpdatePostDTO) {
		setLoading(true);
		setError(null);

		try {
			await updatePost(post.id, values);

			toast.success("Blog updated!");
			onSuccess?.(); // Close the dialog
		} catch {
			setError("Failed to create blog. Please try again.");
			toast.error("Fail to create blog.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input {...field} disabled={loading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className="resize-none"
									rows={10}
									disabled={loading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{error && <p className="text-destructive text-sm">{error}</p>}

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" disabled={loading}>
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" disabled={loading}>
						{loading ? "Updating..." : "Update"}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
