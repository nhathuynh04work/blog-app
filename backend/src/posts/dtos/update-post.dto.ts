import z from "zod";

export const UpdatePostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
});

export type UpdatePostDTO = z.infer<typeof UpdatePostSchema>;
