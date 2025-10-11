"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginDTO, LoginSchema } from "@/app/auth/dtos/login.dto";
import { login } from "@/app/auth/login/actions";
import { toast } from "sonner";

export default function LoginForm() {
	const form = useForm<LoginDTO>({
		resolver: zodResolver(LoginSchema),
		defaultValues: { email: "", password: "" },
	});

	async function onSubmit(values: LoginDTO) {
		try {
			await login(values);
			toast.success("Login successfully!");
			window.location.href = "/posts";
		} catch (err) {
			console.log(err);
			toast.error("Failed to log you in.");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your email"
									type="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Enter your password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Login
				</Button>

				<p className="text-sm text-center text-muted-foreground">
					Don’t have an account?{" "}
					<Link
						href="signup"
						className="font-medium text-primary hover:underline">
						Sign up
					</Link>
				</p>
			</form>
		</Form>
	);
}
