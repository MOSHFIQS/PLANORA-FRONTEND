import { apiFetchClient } from "@/lib/apiFetchClient";

export const eventServiceClient = {
    // get all events (public)
    getAllEvents: (query?: string) =>
        apiFetchClient(`/event?${query || ""}`, {
            method: "GET",
        }),
};