"use server";

import { eventService } from "@/service/server/event.server.service";
import { revalidatePath } from "next/cache";


import { buildQueryString } from "@/utils/buildQueryString";

export async function getAllEventsAction(searchTerm?: string, categoryId?: string , page?: number, limit?: number) {
    try {
        const query = buildQueryString({
            searchTerm,
            categoryId,
            page,
            limit
        });

        const res = await eventService.getAllEvents(query);

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


export async function getSingleEventPublicAction(id: string) {
    try {
        const res = await eventService.getSingleEventPublic(id);
        console.log("res",res);

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


export async function getOrganizersEventByIdAction(id: string) {
    try {
        const res = await eventService.getOrganizersEventById(id);

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

        revalidatePath("/dashboard/event");

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

        revalidatePath("/dashboard/event");

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

        revalidatePath("/dashboard/event");

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