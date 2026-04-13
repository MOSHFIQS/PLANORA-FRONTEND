import { ChangePasswordForm } from "@/components/shared/auth/changePasswordForm/change-password-form";

export const metadata = {
  title: "Change Password | Planora",
  description: "Update your Planora account password.",
};

export default function ChangePasswordPage() {
  return (
    <div className="py-20 flex min-h-[70vh] items-center justify-center">
      <ChangePasswordForm />
    </div>
  );
}
