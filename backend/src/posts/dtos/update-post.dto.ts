import z from "zod";

export const UpdatePostSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export type UpdatePostDTO = z.infer<typeof UpdatePostSchema>;
