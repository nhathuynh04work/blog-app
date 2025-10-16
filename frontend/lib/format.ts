import { formatDistanceToNow, isToday, isYesterday } from "date-fns";

export function getNameInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
}

export function timeSince(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date;

	const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

	if (seconds < 5) return "now";
	if (seconds < 60) return `1m`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
	if (isToday(d)) return "today";
	if (isYesterday(d)) return "yesterday";

	return formatDistanceToNow(d, { addSuffix: true });
}
