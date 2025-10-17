"use client";

import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/format";

type UserAvatarProps = {
	url?: string;
	name: string | undefined;
};

export default function UserAvatar({ url, name = "U" }: UserAvatarProps) {
	const initials = getNameInitials(name);

	return (
		<Avatar className="h-8 w-8">
			<AvatarImage src={url} alt={`${name}'s avatar`} />
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	);
}
