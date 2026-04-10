"use server";

import { statServiceServer } from "@/service/server/stat.server.service";


// Super Admin Stats
export async function getSuperAdminStatsAction() {
    try {
        const res = await statServiceServer.getSuperAdminStats();

        if (!res?.ok) {
            return { ok: false, message: res?.message || "Failed to fetch super admin stats", data: null };
        }

        return {
            ok: true,
            message: res?.message || "Super admin stats fetched successfully",
            data: res?.data || null,
        };
    } catch (err: any) {
        return {
            ok: false,
            message: err?.message || "Something went wrong while fetching super admin stats",
            data: null,
        };
    }
}

// Admin Stats
export async function getAdminStatsAction() {
    try {
        const res = await statServiceServer.getAdminStats();

        if (!res?.ok) {
            return { ok: false, message: res?.message || "Failed to fetch admin stats", data: null };
        }

        return {
            ok: true,
            message: res?.message || "Admin stats fetched successfully",
            data: res?.data || null,
        };
    } catch (err: any) {
        return {
            ok: false,
            message: err?.message || "Something went wrong while fetching admin stats",
            data: null,
        };
    }
}

// Organizer Stats
export async function getOrganizerStatsAction() {
    try {
        const res = await statServiceServer.getOrganizerStats();

        if (!res?.ok) {
            return { ok: false, message: res?.message || "Failed to fetch organizer stats", data: null };
        }

        return {
            ok: true,
            message: res?.message || "Organizer stats fetched successfully",
            data: res?.data || null,
        };
    } catch (err: any) {
        return {
            ok: false,
            message: err?.message || "Something went wrong while fetching organizer stats",
            data: null,
        };
    }
}

// User Stats
export async function getUserStatsAction() {
    try {
        const res = await statServiceServer.getUserStats();

        if (!res?.ok) {
            return { ok: false, message: res?.message || "Failed to fetch user stats", data: null };
        }

        return {
            ok: true,
            message: res?.message || "User stats fetched successfully",
            data: res?.data || null,
        };
    } catch (err: any) {
        return {
            ok: false,
            message: err?.message || "Something went wrong while fetching user stats",
            data: null,
        };
    }
}

// Public Stats
export async function getPublicStatsAction() {
    try {
        const res = await statServiceServer.getPublicStats();

        if (!res?.ok) {
            return { ok: false, message: res?.message || "Failed to fetch public stats", data: null };
        }

        return {
            ok: true,
            message: res?.message || "Public stats fetched successfully",
            data: res?.data || null,
        };
    } catch (err: any) {
        return {
            ok: false,
            message: err?.message || "Something went wrong while fetching public stats",
            data: null,
        };
    }
}