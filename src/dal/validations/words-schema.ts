import { z } from "zod";

export const WordSchema = z.object({
    id: z.string(),
    word: z.string(),
    definition: z.string(),
    isReal: z.boolean(),
    level: z.number(),
});