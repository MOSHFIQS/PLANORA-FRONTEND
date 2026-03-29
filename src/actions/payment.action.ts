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


export async function getMyPaymentsAction() {
  try {
    const res = await paymentService.getMyPayments();

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

export async function getOrganizerPaymentsAction() {
  try {
    const res = await paymentService.getOrganizerPayments();

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

export async function getAllPaymentsAction() {
  try {
    const res = await paymentService.getAllPayments();

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