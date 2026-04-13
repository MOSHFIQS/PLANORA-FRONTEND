import { VerifyEmailForm } from "@/components/shared/auth/verifyEmailForm/verify-email-form";

export const metadata = {
  title: "Verify Email | Planora",
  description: "Verify your email address to get started with Planora.",
};

export default function VerifyEmailPage() {
  return (
    <div className="py-20 flex min-h-[70vh] items-center justify-center">
      <VerifyEmailForm />
    </div>
  );
}
