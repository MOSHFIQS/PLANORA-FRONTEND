import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const userService = {
     // Get user stats
     getStats: () =>
          apiFetchServerMain("/user/stats", {
               method: "GET",
          }),
};