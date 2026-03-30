"use server";

import { paymentService } from "@/service/server/payment.server.service";
import { buildQueryString } from "@/utils/buildQueryString";


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


export async function getMyPaymentsAction(page?: number, limit?: number) {
  try {
    const query = buildQueryString({
          page,
          limit,
     });
    const res = await paymentService.getMyPayments(query);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch Payments",
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

export async function getOrganizerPaymentsAction(page?: number, limit?: number) {
  try {
    const query = buildQueryString({
          page,
          limit,
     });
    const res = await paymentService.getOrganizerPayments(query);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch Payments",
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

export async function getAllPaymentsAction(page?: number, limit?: number) {
  try {
    const query = buildQueryString({
          page,
          limit,
     });
    const res = await paymentService.getAllPayments(query);

    if (!res?.ok) {
      return {
        ok: false,
        message: res?.message || "Failed to fetch Payments",
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