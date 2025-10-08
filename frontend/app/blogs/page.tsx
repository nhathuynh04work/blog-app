import { getBlogs } from "@/app/blogs/actions";
import BlogList from "@/components/features/blog/blog-list";
import CreateBlogDialog from "@/components/features/blog/create-blog-dialog";

export default async function BlogsPage() {
	const blogs = await getBlogs();

	return (
		<main className="max-w-3xl mx-auto py-10 px-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold tracking-tight">Blogs</h1>
				<CreateBlogDialog />
			</div>
			<BlogList blogs={blogs} />
		</main>
	);
}
