"use client";

import { Button } from "@/components/ui/button";
import clientApi from "@/lib/api/clientApi";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
	const router = useRouter();

	async function logout() {
		try {
			await clientApi.get("/auth/logout");
			toast.success("Logged out successfully");
			router.push("/auth/login");
		} catch {
			toast.error("Failed to log out");
		}
	}

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={logout}
			className="flex items-center gap-1 text-muted-foreground hover:text-destructive">
			<LogOut className="h-4 w-4" />
		</Button>
	);
}
