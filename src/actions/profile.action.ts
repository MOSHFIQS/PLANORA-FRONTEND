"use server";

import { profileService } from "@/service/profile.server.service";
import { revalidatePath } from "next/cache";

export async function getMyProfileAction() {
  try {
    const res = await profileService.getMyProfile();

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch profile",
      };
    }

    return {
      ok: true,
      data: res.data,
      message: res?.message || "Profile fetched successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}

export async function updateProfileAction(data: { name?: string; email?: string; [key: string]: any }) {
  try {
    const res = await profileService.updateProfile(data);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to update profile",
      };
    }

    // Optionally revalidate cache for profile page
    revalidatePath("/dashboard/profile");

    return {
      ok: true,
      data: res.data,
      message: res?.message || "Profile updated successfully",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
}