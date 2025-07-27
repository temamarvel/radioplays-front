import { z } from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_BACKEND_URL: z.url(),
});

const parsed = envSchema.safeParse({
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

if (!parsed.success) {
    console.error("Error! The validation of env parameters is failed!:", z.treeifyError(parsed.error));
    throw new Error("Wrong env parameters:", parsed.error);
}

type Env = z.infer<typeof envSchema>;

export const env: Env = parsed.data;