"use client";

import { useAuth } from "@/app/providers/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Feather } from "lucide-react";

export default function TopBar() {
	const { user, loading } = useAuth();

	return (
		<div className="flex items-center justify-between w-full px-4 py-3 border-b">
			{/* Logo */}
			<div className="flex items-center gap-2">
				<Feather className="h-5 w-5 text-primary" />
				<span className="text-lg font-semibold tracking-tight">
					MyApp
				</span>
			</div>

			{/* User Info */}
			<div className="flex items-center gap-3">
				{loading ? (
					<div className="flex items-center gap-2">
						<Skeleton className="h-8 w-8 rounded-full" />
						<Skeleton className="h-4 w-24" />
					</div>
				) : (
					<>
						<Avatar className="h-8 w-8">
							<AvatarFallback>
								{user?.firstName?.[0]}
								{user?.lastName?.[0]}
							</AvatarFallback>
						</Avatar>
						<span className="text-sm font-medium">
							{user?.firstName} {user?.lastName}
						</span>
					</>
				)}
			</div>
		</div>
	);
}
