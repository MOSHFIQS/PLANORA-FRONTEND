import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const eventService = {
    // get all events (public)
    getAllEvents: () =>
        apiFetchServerMain("/events", {
            method: "GET",
        }),

    // get single event
    getSingleEvent: (id: string) =>
        apiFetchServerMain(`/events/${id}`, {
            method: "GET",
        }),

    // create event
    createEvent: (payload: any) =>
        apiFetchServerMain("/events", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    // my events
    getMyEvents: () =>
        apiFetchServerMain("/events/me/events", {
            method: "GET",
        }),

    // update event
    updateEvent: (id: string, payload: any) =>
        apiFetchServerMain(`/events/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        }),

    // delete event
    deleteEvent: (id: string) =>
        apiFetchServerMain(`/events/${id}`, {
            method: "DELETE",
        }),

    // admin all events
    getAllEventsAdmin: () =>
        apiFetchServerMain("/events/admin/all", {
            method: "GET",
        }),
};