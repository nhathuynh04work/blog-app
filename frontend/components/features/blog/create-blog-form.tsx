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
import { createBlogSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBlog } from "../../../app/blogs/actions";

export default function CreateBlogForm({
	onSuccess,
}: {
	onSuccess?: () => void;
}) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<z.infer<typeof createBlogSchema>>({
		resolver: zodResolver(createBlogSchema),
		defaultValues: { title: "", content: "" },
	});

	async function onSubmit(values: z.infer<typeof createBlogSchema>) {
		setLoading(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("content", values.content);

			await createBlog(formData);

			form.reset();
			onSuccess?.(); // Notify parent to close the dialog or refresh list
		} catch (err) {
			setError("Failed to create blog. Please try again.");
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
