"use server";

import { revalidatePath } from "next/cache";
import { eventService } from "@/service/event.server.service";


export async function getAllEventsAction() {
    try {
        const res = await eventService.getAllEvents();

        if (!res?.ok) {
            return {
                ok: false,
                message: res?.message || "Failed to fetch events",
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


export async function getSingleEventAction(id: string) {
    try {
        const res = await eventService.getSingleEvent(id);

        if (!res?.ok) {
            return {
                ok: false,
                message: res?.message || "Failed to fetch event",
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


export async function createEventAction(payload: any) {
    try {
        const res = await eventService.createEvent(payload);
        console.log(res);

        if (!res?.ok) {
            return {
                ok: false,
                message: res?.message || "Event creation failed",
            };
        }

        revalidatePath("/events");

        return {
            ok: true,
            message: res.message || "Event created successfully",
            data: res.data

        };
    } catch {
        return {
            ok: false,
            message: "Something went wrong",
        };
    }
}


export async function getMyEventsAction() {
    try {
        const res = await eventService.getMyEvents();

        if (!res?.ok) {
            return {
                ok: false,
                message: res?.message || "Failed to fetch my events",
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


export async function updateEventAction(id: string, payload: any) {
    try {
        const res = await eventService.updateEvent(id, payload);

        if (!res?.ok) {
            return {
                ok: false,
                message: res?.message || "Update failed",
            };
        }

        revalidatePath("/events");
        revalidatePath(`/events/${id}`);

        return {
            ok: true,
            message: res.message || "Event updated successfully",
        };
    } catch {
        return {
            ok: false,
            message: "Something went wrong",
        };
    }
}


export async function deleteEventAction(id: string) {
    try {
        const res = await eventService.deleteEvent(id);

        if (!res?.ok) {
            return {
                ok: false,
                message: res?.message || "Delete failed",
            };
        }

        revalidatePath("/events");

        return {
            ok: true,
            message: res.message || "Event deleted successfully",
        };
    } catch {
        return {
            ok: false,
            message: "Something went wrong",
        };
    }
}


export async function getAllEventsAdminAction() {
    try {
        const res = await eventService.getAllEventsAdmin();

        if (!res?.ok) {
            return {
                ok: false,
                message: res?.message || "Failed to fetch admin events",
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