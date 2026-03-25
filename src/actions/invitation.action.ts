"use server";

import { invitationService } from "@/service/invitation.server.service";

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
export async function getMyInvitationsAction() {
  try {
    const res = await invitationService.getMyInvitations();

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