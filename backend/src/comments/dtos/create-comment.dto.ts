import z from "zod";

export const CreateCommentSchema = z.object({
    content: z.string().min(1, "Content is required"),
});

export type CreateCommentDTO = z.infer<typeof CreateCommentSchema>;
