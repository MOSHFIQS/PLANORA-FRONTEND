"use client";

import { useState } from "react";
import { initiatePaymentAction } from "@/actions/payment.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const usePayment = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handlePayment = async (payload: { eventId?: string; invitationId?: string }) => {
    const key = payload?.eventId ?? payload?.invitationId;
    if (!key) return toast.error("Invalid payment request");

    setLoadingId(key);
    const toastId = toast.loading("Processing payment...");

    try {
      const res = await initiatePaymentAction(payload);
      if (!res?.ok) {
        toast.error(res?.message || "Payment initiation failed", { id: toastId });
        return;
      }

      const { paymentUrl, message } = res?.data || {};

      if (paymentUrl) {
        toast.success("Redirecting to checkout...", { id: toastId });
        window.location.href = paymentUrl;
      } else {
        toast.success(message || "Joined event successfully!", { id: toastId });
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong", { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  return { handlePayment, loadingId };
};
