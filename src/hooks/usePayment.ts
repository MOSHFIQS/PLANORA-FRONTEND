"use client";

import { useState } from "react";
import { initiatePaymentAction } from "@/actions/payment.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PaymentPayload = {
  eventId?: string;
  invitationId?: string;
};

export const usePayment = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = async (payload: PaymentPayload) => {
    const key = payload?.eventId ?? payload?.invitationId;

    if (!key) {
      toast.error("Invalid request");
      return;
    }

    setLoadingId(key);
    const toastId = toast.loading("Processing...");

    try {
      const res = await initiatePaymentAction(payload);

      // console.log(res);
      if (!res?.ok) {
        toast.error(res?.message || "Failed", { id: toastId });
        setLoadingId(null);
        return;
      }

      const data = res?.data;

      // CASE 1: FREE EVENT
      if (!data?.paymentUrl) {
        toast.success(data?.message || "Joined successfully", {
          id: toastId,
        });

       
        router.refresh()

        return;
      }

      // CASE 2: PAID EVENT
      toast.success("Redirecting to payment...", { id: toastId });

      window.location.href = data.paymentUrl;
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