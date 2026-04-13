import { ForgetPasswordForm } from "@/components/shared/auth/forgetPasswordForm/forget-password-form";

export const metadata = {
  title: "Forget Password | Planora",
  description: "Recover your Planora account password.",
};

export default function ForgetPasswordPage() {
  return (
    <div className="py-20 flex min-h-[70vh] items-center justify-center">
      <ForgetPasswordForm />
    </div>
  );
}
