"use client";

import clientApi from "@/lib/api/clientApi";
import { type EntityType } from "@/types/entity-type.enum";
import { useState } from "react";

export function useLike(
	entityType: EntityType,
	entityId: string,
	initialLiked: boolean,
	initialCount: number
) {
	const [liked, setLiked] = useState(initialLiked);
	const [likeCount, setLikeCount] = useState(initialCount);
	const [isPending, setIsPending] = useState(false);

	async function toggleLike() {
		if (isPending) return;
		const prevLiked = liked;
		const prevLikeCount = likeCount;

		setLiked(!liked);
		setLikeCount(likeCount + (liked ? -1 : 1));
		setIsPending(true);

		try {
			await clientApi.patch(`/likes`, {
				entityType: entityType,
				entityId: entityId,
			});
		} catch {
			setLiked(prevLiked);
			setLikeCount(prevLikeCount);
		} finally {
			setIsPending(false);
		}
	}

	return { liked, likeCount, toggleLike, isPending };
}
