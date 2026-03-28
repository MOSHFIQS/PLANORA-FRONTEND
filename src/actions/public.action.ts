"use server"

import { publicService } from "@/service/server/public.server.service";


//  Get user stats
export async function getPublicStatsAction() {
  try {
    const res = await publicService.getStats();

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch stats",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}