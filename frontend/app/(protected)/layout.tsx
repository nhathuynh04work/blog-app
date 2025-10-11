import { ACCESS_TOKEN_KEY } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

	return <>{children}</>;
}
