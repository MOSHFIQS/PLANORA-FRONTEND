import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const profileService = {
  // Get current user's profile
  getMyProfile: () =>
    apiFetchServerMain("/profile/me", {
      method: "GET",
    }),

  // Update current user's profile
  updateProfile: (payload: { name?: string; email?: string; [key: string]: any }) =>
    apiFetchServerMain("/profile/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
};