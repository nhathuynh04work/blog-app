import z from "zod";

export const SignupSchema = z.object({
	email: z.email("Invalid email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
});

export type SignupDTO = z.infer<typeof SignupSchema>;
