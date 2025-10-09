import z from "zod";

export const CreateUserSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(1, "First name is requires"),
    lastName: z.string().min(1, "Last name is requires"),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
