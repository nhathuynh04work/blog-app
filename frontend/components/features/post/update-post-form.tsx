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
import { updatePost } from "@/app/posts/actions";
import {
	UpdatePostDTO,
	UpdatePostSchema,
} from "@/app/posts/dtos/update-post.dto";
import { Post } from "@/types/post";
import { useUpdatePost } from "@/app/hooks/posts/useUpdatePost";

interface UpdatePostFormProps {
	onSuccess?: () => void;
	post: Post;
}

export default function UpdatePostForm({
	onSuccess,
	post,
}: UpdatePostFormProps) {
	const form = useForm<UpdatePostDTO>({
		resolver: zodResolver(UpdatePostSchema),
		defaultValues: { title: post.title, content: post.content },
	});

	const { mutateAsync, isPending } = useUpdatePost();

	async function onSubmit(values: UpdatePostDTO) {
		await mutateAsync({ id: post.id, data: values });
		onSuccess?.(); //Close the dialog
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
								<Input {...field} disabled={isPending} />
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
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" disabled={isPending}>
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" disabled={isPending}>
						{isPending ? "Updating..." : "Update"}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
