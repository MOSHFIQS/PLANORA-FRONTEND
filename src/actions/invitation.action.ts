"use server";

import { invitationService } from "@/service/server/invitation.server.service";
import { buildQueryString } from "@/utils/buildQueryString";
import { revalidatePath } from "next/cache";

// 1. Send Invitation
export async function sendInvitationAction(payload: {
  eventId: string;
  userId: string;
}) {
  try {
    const res = await invitationService.sendInvitation(payload);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to send invitation",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err?.message || "Something went wrong",
    };
  }
}

// 2. Get Event Invitations
export async function getEventInvitationsAction(eventId: string) {
  try {
    const res = await invitationService.getEventInvitations(eventId);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch invitations",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err?.message || "Something went wrong",
    };
  }
}

// 3. Cancel Invitation
export async function cancelInvitationAction(id: string) {
  try {
    const res = await invitationService.cancelInvitation(id);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to cancel invitation",
      };
    }

    revalidatePath("/dashboard/invitations")

    return {
      ok: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err?.message || "Something went wrong",
    };
  }
}

// 4. Get My Invitations
export async function getMyInvitationsAction(page?: number, limit?: number, searchTerm?: string) {
  try {
    const query = buildQueryString({
      page,
      limit,
      searchTerm,
    });
    const res = await invitationService.getMyInvitations(query);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch invitations",
      };
    }

    return {
      ok: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err?.message || "Something went wrong",
    };
  }
}