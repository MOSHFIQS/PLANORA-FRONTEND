
import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const paymentService = {
  initiatePayment: (payload: {
    eventId?: string;
    invitationId?: string;
  }) =>
    apiFetchServerMain("/payment/pay", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

     getMyPayments: (query?: string) =>
          apiFetchServerMain(`/payment/my?${query || ""}`, {
               method: "GET",
          }),

     getOrganizerPayments: (query?: string) =>
          apiFetchServerMain(`/payment/organizer?${query || ""}`, {
               method: "GET",
          }),
     getAllPayments: (query?: string) =>
          apiFetchServerMain(`/payment/admin?${query || ""}`, {
               method: "GET",
          }),
};