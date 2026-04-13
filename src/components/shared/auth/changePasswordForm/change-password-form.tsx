"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { changePasswordAction } from "@/actions/auth.action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, Eye, EyeOff } from "lucide-react"

const formSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Minimum 6 characters"),
  confirmPassword: z.string().min(6, "Minimum 6 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function ChangePasswordForm({ isModal = false }: { isModal?: boolean }) {
  const router = useRouter()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const form = useForm({
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating password…")
      try {
        const result = await changePasswordAction(value)
        if (!result.ok) {
          toast.error(result.message || "Failed to update password", { id: toastId })
          return
        }
        toast.success(result.message, { id: toastId })
        if (!isModal) {
          router.push("/dashboard")
        }
      } catch {
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })

  const formContent = (
    <div className="flex flex-col items-center text-center">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: "rgba(114, 92, 173, 0.1)", color: "#725CAD" }}
      >
        <Lock size={32} />
      </div>
      
      <h1 className="text-3xl font-bold mb-3" style={{ color: "#1a1a1a" }}>
        Change password
      </h1>
      <p className="text-sm font-light mb-8 max-w-[320px]" style={{ color: "#888" }}>
        Maintain your account security by updating your password regularly.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="w-full flex flex-col gap-5 text-left"
      >
        <form.Field name="currentPassword">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                Current Password
              </Label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  placeholder="••••••••"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-12 rounded pr-12"
                  style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.12)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#aaa" }}
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="newPassword">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-12 rounded pr-12"
                  style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.12)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#aaa" }}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => {
            const invalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <div className="flex flex-col gap-1.5">
                <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                  Confirm New Password
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="h-12 rounded"
                  style={{
                    background: "#fff",
                    border: invalid ? "1px solid #e55" : "1px solid rgba(0,0,0,0.12)",
                  }}
                />
                {invalid && (
                  <span className="text-xs" style={{ color: "#c0392b" }}>
                    {field.state.meta.errors[0]?.toString()}
                  </span>
                )}
              </div>
            )
          }}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            currentPassword: state.values.currentPassword,
            newPassword: state.values.newPassword,
            confirmPassword: state.values.confirmPassword,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({
            currentPassword,
            newPassword,
            confirmPassword,
            isSubmitting,
          }) => (
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !currentPassword ||
                newPassword.length < 6 ||
                confirmPassword !== newPassword
              }
              className="w-full h-[54px] rounded text-sm font-medium tracking-wide transition-all"
              style={{
                background: "#725CAD",
                color: "#fff",
                border: "none",
              }}
            >
              {isSubmitting && (
                <Loader2 size={18} className="animate-spin mr-2" />
              )}
              {isSubmitting ? "Updating…" : "Update Password"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )

  if (isModal) {
    return <div className="p-2">{formContent}</div>
  }

  return (
    <div className="flex items-center justify-center p-6">
      <div
        className="relative w-full max-w-[500px] overflow-hidden p-10"
        style={{
          background: "#f8f6f0",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "4px",
        }}
      >
        {formContent}
      </div>
    </div>
  )
}
