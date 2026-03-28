"use server";

import { paymentService } from "@/service/server/payment.server.service";


export async function initiatePaymentAction(payload: {
  eventId?: string;
  invitationId?: string;
}) {
  try {
    const res = await paymentService.initiatePayment(payload);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Payment failed",
      };
    }
    return {
      ok: true,
      data: res.data, // { paymentId, paymentUrl }
    };
  } catch (err: any) {
    return {
      ok: false,
      message: err?.message || "Something went wrong",
    };
  }
}