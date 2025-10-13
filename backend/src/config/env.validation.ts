import { z } from "zod";

export const envSchema = z.object({
    NODE_ENV: z.enum(["production", "development", "test"]),
    PORT: z.string().default("4000"),
    MONGO_URI: z.string(),
    DB_NAME: z.string(),
});

export function validate(config: Record<string, any>): Record<string, any> {
    const result = envSchema.safeParse(config);

    if (!result.success) {
        throw new Error(`Config validation error: ${result.error.message}`);
    }

    return result.data;
}
