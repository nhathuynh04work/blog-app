"use client";

import { Feather } from "lucide-react";
import LogoutButton from "./logout-button";
import { useUser } from "@/app/providers/user-provider";
import UserAvatar from "./user-avatar";

export default function TopBar() {
	const { user } = useUser();

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
				{user ? (
					<>
						<UserAvatar
							name={`${user.firstName} ${user.lastName}`}
						/>
						<span className="text-sm font-medium">
							{user.firstName} {user.lastName}
						</span>
						<LogoutButton />
					</>
				) : (
					<span className="text-sm text-muted-foreground">
						Loading...
					</span>
				)}
			</div>
		</div>
	);
}
