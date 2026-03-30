import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const eventService = {
    // get all events (public)
    getAllEvents: (query?: string) =>
        apiFetchServerMain(`/event?${query || ""}`, {
            method: "GET",
        }),

    // get organizers single event
    getSingleEventPublic: (id: string) =>
        apiFetchServerMain(`/event/public/${id}`, {
            method: "GET",
        }),

    // get organizers single event
    getOrganizersEventById: (id: string) =>
        apiFetchServerMain(`/event/${id}`, {
            method: "GET",
        }),

    // create event
    createEvent: (payload: any) =>
        apiFetchServerMain("/event", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    // my events
    getMyEvents: (query?: string) =>
        apiFetchServerMain(`/event/me/events?${query || ""}`, {
            method: "GET",
        }),

    // update event
    updateEvent: (id: string, payload: any) =>
        apiFetchServerMain(`/event/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        }),

    // delete event
    deleteEvent: (id: string) =>
        apiFetchServerMain(`/event/${id}`, {
            method: "DELETE",
        }),

    // admin all events
    getAllEventsAdmin: (query?: string) =>
        apiFetchServerMain(`/event/admin/all?${query || ""}`, {
            method: "GET",
        }),

    // admin delete event
    deleteEventByAdmin: (id: string) =>
        apiFetchServerMain(`/event/admin/${id}`, {
            method: "DELETE",
        }),

    // update featured status
    updateFeaturedStatus: (id: string, isFeatured: boolean) =>
        apiFetchServerMain(`/event/admin/feature/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ isFeatured }),
        }),

    getFeaturedEvents: () =>
        apiFetchServerMain("/event/featured", {
            method: "GET",
        }),
};