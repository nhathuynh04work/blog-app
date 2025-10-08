"use client";

import { createBlogSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CreateBlogForm() {
	const form = useForm<z.infer<typeof createBlogSchema>>({
		resolver: zodResolver(createBlogSchema),
		defaultValues: {
			title: "Blog title",
			content: "Blog content",
		},
	});

	function onSubmit(values: z.infer<typeof createBlogSchema>) {
		console.log(values);
	}
    
	return <div>CreateBlogForm</div>;
}
