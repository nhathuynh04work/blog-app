export const EntityType = {
	POST: "post",
	COMMENT: "comment",
} as const;

export type EntityType = (typeof EntityType)[keyof typeof EntityType];
