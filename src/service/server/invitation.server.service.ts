import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const invitationService = {
  // send invitation (organizer/admin)
  sendInvitation: (payload: {
    eventId: string;
    userId: string;
  }) =>
    apiFetchServerMain("/invitation/send", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // get invitations of a specific event
  getEventInvitations: (eventId: string) =>
    apiFetchServerMain(`/invitation/event/${eventId}`, {
      method: "GET",
    }),

  // cancel invitation
  cancelInvitation: (id: string) =>
    apiFetchServerMain(`/invitation/${id}`, {
      method: "DELETE",
    }),

  // get my invitations
  getMyInvitations: () =>
    apiFetchServerMain("/invitation/my", {
      method: "GET",
    }),
};