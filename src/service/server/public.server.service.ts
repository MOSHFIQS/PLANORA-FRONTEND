import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const publicService = {
     // Get public stats
     getStats: () =>
          apiFetchServerMain("/public/stats", {
               method: "GET",
          }),
};