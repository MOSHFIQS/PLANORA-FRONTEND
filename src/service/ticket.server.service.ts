import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const ticketService = {
  // Get my tickets
  getMyTickets: () =>
    apiFetchServerMain("/ticket/my", {
      method: "GET",
    }),

  // Get tickets for specific event
  getEventTickets: (eventId: string) =>
    apiFetchServerMain(`/ticket/event/${eventId}`, {
      method: "GET",
    }),

  // Check-in ticket (QR)
  checkInTicket: (qrCode: string) =>
    apiFetchServerMain("/ticket/check-in", {
      method: "POST",
      body: JSON.stringify({ qrCode }),
    }),
};