import { EntityType } from "src/common/enums/entity-type.enum";
import z from "zod";

export const ToggleLikeSchema = z.object({
    entityType: z.enum(EntityType),
    entityId: z.string(),
});

export type ToggleLikeDTO = z.infer<typeof ToggleLikeSchema>;
