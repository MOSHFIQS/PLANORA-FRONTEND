"use client";

import { useState } from "react";
import { initiatePaymentAction } from "@/actions/payment.action";
import { toast } from "sonner";

type PaymentPayload = {
  eventId?: string;
  invitationId?: string;
};

export const usePayment = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handlePayment = async (payload: PaymentPayload) => {
    const key = payload?.eventId || payload?.invitationId || "";

    if (!key) {
      toast.error("Invalid payment request");
      return;
    }

    setLoadingId(key);

    const toastId = toast.loading("Redirecting to payment...");

    try {
      const res = await initiatePaymentAction(payload);

      if (!res?.ok) {
        toast.error(res?.message, { id: toastId });
        setLoadingId(null);
        return;
      }

      toast.success("Redirecting...", { id: toastId });

      // redirect to stripe
      window.location.href = res.data.paymentUrl;
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong", {
        id: toastId,
      });
      setLoadingId(null);
    }
  };

  return {
    handlePayment,
    loadingId,
  };
};