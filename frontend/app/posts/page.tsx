import BlogList from "@/components/features/post/post-list";
import { getPosts } from "./actions";
import CreatePostDialog from "@/components/features/post/create-post-dialog";

export default async function BlogsPage() {
	const posts = await getPosts();

	return (
		<main className="max-w-3xl mx-auto py-10 px-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
				<CreatePostDialog />
			</div>
			<BlogList posts={posts} />
		</main>
	);
}
