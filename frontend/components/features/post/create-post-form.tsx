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
import { CreatePostDTO, CreatePostSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createPost } from "@/app/posts/actions";

interface CreatePostFormProps {
	onSuccess?: () => void;
}

export default function CreatePostForm({ onSuccess }: CreatePostFormProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<CreatePostDTO>({
		resolver: zodResolver(CreatePostSchema),
		defaultValues: { title: "", content: "" },
	});

	async function onSubmit(values: CreatePostDTO) {
		setLoading(true);
		setError(null);

		try {
			const newPost = await createPost(values);
			console.log(newPost);

			toast.success("Blog created!");
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
								<Input
									placeholder="The title of your blog"
									{...field}
									disabled={loading}
								/>
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
									placeholder="Tell people something about your day"
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
						{loading ? "Creating..." : "Create"}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
