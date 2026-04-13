import { ResetPasswordForm } from "@/components/shared/auth/resetPasswordForm/reset-password-form";
import { Suspense } from "react";

export const metadata = {
  title: "Reset Password | Planora",
  description: "Set a new password for your Planora account.",
};

export default function ResetPasswordPage() {
  return (
    <div className="py-20 flex min-h-[70vh] items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
