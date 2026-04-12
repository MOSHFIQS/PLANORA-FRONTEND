import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const statServiceServer = {
    getSuperAdminStats: () => apiFetchServerMain("/stat/superadmin"),

    getAdminStats: () => apiFetchServerMain("/stat/admin"),

    getOrganizerStats: () => apiFetchServerMain("/stat/organizer"),

    getUserStats: () => apiFetchServerMain("/stat/user"),

    getPublicStats: () => apiFetchServerMain("/stat/public"),
};