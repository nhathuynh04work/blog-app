"use client";

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
import { Post } from "@/types/post";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
	UpdatePostDTO,
	UpdatePostSchema,
} from "@/app/(protected)/posts/dtos/update-post.dto";
import { useUpdatePost } from "@/app/(protected)/posts/hooks/useUpdatePost";
import { useDeletePost } from "@/app/(protected)/posts/hooks/useDeletePost";
import { useAuth } from "@/app/providers/auth-provider";

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

	const [isPending, startTransition] = useTransition();
	const { mutateAsync: updatePost } = useUpdatePost();
	const { mutateAsync: deletePost } = useDeletePost();
	const { user } = useAuth();

	const isOwner = user?.id === post.userId;

	function onSubmit(values: UpdatePostDTO) {
		if (!isOwner) return;
		startTransition(async () => {
			await updatePost({ id: post.id, data: values });
			onSuccess?.(); // close the dialog
		});
	}

	function onDelete() {
		if (!isOwner) return;
		startTransition(async () => {
			await deletePost(post.id);
			onSuccess?.(); // close the dialog
		});
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
									{...field}
									disabled={!isOwner || isPending}
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
									{...field}
									className="resize-none"
									rows={10}
									disabled={!isOwner || isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{isOwner && (
					<DialogFooter>
						<DialogClose asChild>
							<Button
								variant="outline"
								disabled={isPending}
								onClick={onDelete}>
								{isPending ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Delete"
								)}
							</Button>
						</DialogClose>

						<Button type="submit" disabled={isPending}>
							{isPending ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								"Update"
							)}
						</Button>
					</DialogFooter>
				)}
			</form>
		</Form>
	);
}
