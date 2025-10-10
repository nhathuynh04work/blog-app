"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";

const titleMap: Record<string, string> = {
	"/auth/login": "Sign in to your account",
	"/auth/signup": "Create an account",
};

export default function Layout({ children }: { children: ReactNode }) {
	const pathName = usePathname();
	const title = titleMap[pathName] ?? "Welcome back";

	return (
		<div className="flex flex-1 h-screen items-center justify-center p-6 bg-background">
			<Card className="w-full max-w-md shadow-md">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold text-center">
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
			</Card>
		</div>
	);
}
