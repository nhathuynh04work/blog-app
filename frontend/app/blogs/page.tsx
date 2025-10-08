// app/blogs/page.tsx
import BlogList from "@/components/features/blog/blog-list";
import { Button } from "@/components/ui/button";
import { Blog } from "@/types/blog";

const blogs: Blog[] = [
	{
		id: 1,
		title: "The fate of Ophelia",
		content: "A lovelorn girl",
		createdAt: new Date(),
	},
	{
		id: 2,
		title: "The fate of Taylor",
		content: "A lovelorn star",
		createdAt: new Date(),
	},
	{
		id: 3,
		title: "The fate of Noah",
		content: "A lovelorn boy",
		createdAt: new Date(),
	},
];

export default function BlogsPage() {
	return (
		<main className="max-w-3xl mx-auto py-10 px-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold tracking-tight">Blogs</h1>
				<Button variant="outline">New blog</Button>
			</div>
			<BlogList blogs={blogs} />
		</main>
	);
}
