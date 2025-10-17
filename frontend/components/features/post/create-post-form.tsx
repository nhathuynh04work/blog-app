"use client";

import {
	CreatePostDTO,
	CreatePostSchema,
} from "@/app/(protected)/posts/dtos/create-post.dto";
import { usePostMutations } from "@/app/hooks/usePostMutations";
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

interface CreatePostFormProps {
	onSuccess?: () => void;
}

export default function CreatePostForm({ onSuccess }: CreatePostFormProps) {
	const form = useForm<CreatePostDTO>({
		resolver: zodResolver(CreatePostSchema),
		defaultValues: { title: "", content: "" },
	});

	const { create } = usePostMutations();
	const { mutateAsync: createPost, isPending } = create;

	async function onSubmit(values: CreatePostDTO) {
		await createPost(values);
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
								<Input
									placeholder="The title of your blog"
									{...field}
									disabled={isPending}
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
						{isPending ? "Creating..." : "Create"}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
