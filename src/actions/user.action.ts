"use server"

import { userService } from "@/service/server/user.server.service";


//  Get user stats
export async function getUserStatsAction() {
  try {
    const res = await userService.getStats();

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