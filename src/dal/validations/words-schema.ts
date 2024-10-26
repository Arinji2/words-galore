import { z } from "zod";

export const WordSchema = z.object({
  id: z.string(),
  word: z.string(),
  definition: z.string(),
  isReal: z.boolean(),
  level: z.number(),
});

export const DictonarySchema = z.object({
  word: z.string(),
  phonetic: z.string().optional(),
  meanings: z.array(
    z.object({
      partOfSpeech: z.string(),
      definitions: z.array(
        z
          .object({
            definition: z.string(),
            example: z.string().optional(),
          })
          .optional()
      ),
    })
  ),
});
