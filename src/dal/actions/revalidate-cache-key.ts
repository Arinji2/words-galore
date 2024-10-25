"use server";

import { revalidateTag } from "next/cache";
import { cache } from "react";

export default async function revalidateCacheKeyAction(cacheKey: string) {
  "use server";
  await cache(async () => {
    await revalidateTag(cacheKey);
    return {
      success: true,
    };
  })();
}
