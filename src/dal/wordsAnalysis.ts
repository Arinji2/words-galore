import { isRedirectError } from "next/dist/client/components/redirect";
import "server-only";
import { DictonarySchema } from "./validations/words-schema";

export async function getWordAnalysis({ word }: { word: string }) {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
    );
    const json = await res.json();
    if (!Array.isArray(json)) throw new Error("Invalid JSON");
    const parsed = DictonarySchema.parse(json[0]);
    parsed.meanings = parsed.meanings.filter((meaning) => meaning !== null);
    return parsed;
  } catch (error) {
    console.log(error);
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
    };
  }
}
