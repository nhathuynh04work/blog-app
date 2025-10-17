"use server";

import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMe } from "../actions/auth";
import UserProvider from "../providers/user-provider";
import TopBar from "@/components/features/layout/top-bar";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const token = cookieStore.get(ACCESS_TOKEN_KEY);

	if (!token) {
		redirect("/auth/login");
	}

	const user = await getMe();

	return (
		<UserProvider user={user}>
			<TopBar />
			{children}
		</UserProvider>
	);
}
