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
    getMyEvents: () =>
        apiFetchServerMain("/event/me/events", {
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
    getAllEventsAdmin: () =>
        apiFetchServerMain("/event/admin/all", {
            method: "GET",
        }),
};