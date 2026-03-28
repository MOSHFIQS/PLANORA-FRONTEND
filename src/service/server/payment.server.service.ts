
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
};