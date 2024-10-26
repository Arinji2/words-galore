import Pocketbase from "pocketbase";
import "server-only";
import { WordSchema } from "./validations/words-schema";

export async function getRandomIDs({
  count,
  isReal,
  level,
}: {
  count: number;
  isReal: boolean;
  level?: number;
}) {
  const pb = new Pocketbase(process.env.POCKETBASE_URL);

  const data = await pb
    .collection(isReal ? "real_words" : "fake_words")
    .getList(1, count, {
      sort: "@random",
      filter: `level=${level ?? 1}`,
      fields: "id",
    });
  if (!data || data.totalItems === 0 || !data.items) {
    throw new Error("No data found");
  }
  return data.items.map((item) => item.id);
}

export async function getRandomWord({
  id,
  isReal,
}: {
  id?: string;
  isReal: boolean;
}) {
  const pb = new Pocketbase(process.env.POCKETBASE_URL);
  let data;
  if (!id) {
    data = await pb
      .collection(isReal ? "real_words" : "fake_words")
      .getFirstListItem("", {
        sort: "@random",
      });
  } else {
    data = await pb
      .collection(isReal ? "real_words" : "fake_words")
      .getOne(id, {});
  }
  if (!data || !data.id || !data.word || !data.definition) {
    throw new Error("No data found");
  }
  const formattedWord = {
    id: data.id,
    word: data.word,
    definition: data.definition,
    isReal: false,
    level: 1,
  };
  const parsedWord = WordSchema.safeParse(formattedWord);
  if (!parsedWord.success) {
    throw new Error(parsedWord.error.message);
  }

  return parsedWord.data;
}
