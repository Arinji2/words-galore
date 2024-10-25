"use server";
import { cookies } from "next/headers";
import { cache } from "react";

export async function isDevMode() {
  return await cache(async () => {
    const cookieStore = await cookies();
    const isEnabled = cookieStore.get("devMode")?.value === "true";
    return isEnabled;
  })();
}

export async function setDevMode(isEnabled: boolean) {
  return await cache(async () => {
    const cookieStore = await cookies();
    cookieStore.set("devMode", isEnabled ? "true" : "false", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "strict",
    });
    return {
      success: true,
    };
  })();
}
