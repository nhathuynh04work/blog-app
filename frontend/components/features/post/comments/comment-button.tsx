"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentButtonProps {
	count?: number;
	onClick?: () => void;
}

export function CommentButton({ count = 0, onClick }: CommentButtonProps) {
	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={onClick}
			className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
			<MessageSquare className="h-4 w-4" />
			<span className="text-sm">{count}</span>
		</Button>
	);
}
