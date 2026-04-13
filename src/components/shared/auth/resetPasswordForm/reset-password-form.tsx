"use client"

import { useEffect, useState } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { resendOTPAction, resetPasswordAction } from "@/actions/auth.action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ShieldCheck, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Minimum 6 characters"),
  confirmPassword: z.string().min(6, "Minimum 6 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const [showPassword, setShowPassword] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else {
      setCanResend(true)
    }
    return () => clearInterval(timer)
  }, [countdown, canResend])

  const handleResend = async () => {
    if (!canResend || isResending) return

    setIsResending(true)
    const toastId = toast.loading("Resending reset code…")
    
    try {
      const result = await resendOTPAction({ 
        email, 
        type: "forget-password" 
      })
      
      if (!result.ok) {
        toast.error(result.message || "Failed to resend code", { id: toastId })
        return
      }
      
      toast.success("New code sent successfully!", { id: toastId })
      setCountdown(60)
      setCanResend(false)
    } catch {
      toast.error("Something went wrong", { id: toastId })
    } finally {
      setIsResending(false)
    }
  }

  const form = useForm({
    defaultValues: { otp: "", newPassword: "", confirmPassword: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      if (!email) {
        toast.error("Email is missing. Please start over.")
        return
      }
      const toastId = toast.loading("Resetting password…")
      try {
        const result = await resetPasswordAction({ 
          email, 
          otp: value.otp, 
          newPassword: value.newPassword 
        })
        if (!result.ok) {
          toast.error(result.message || "Reset failed", { id: toastId })
          return
        }
        toast.success(result.message, { id: toastId })
        router.push("/login?reset=success")
      } catch {
        toast.error("Something went wrong", { id: toastId })
      }
    },
  })

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
        <div className="flex flex-col items-center text-center">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{ background: "rgba(114, 92, 173, 0.1)", color: "#725CAD" }}
          >
            <ShieldCheck size={32} />
          </div>
          
          <h1 className="text-3xl font-bold mb-3" style={{ color: "#1a1a1a" }}>
            Set new password
          </h1>
          <p className="text-sm font-light mb-8 max-w-[320px]" style={{ color: "#888" }}>
            Enter the 6-digit code sent to your email and choose a new password.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="w-full flex flex-col gap-5 text-left"
          >
            <form.Field name="otp">
              {(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                      Verification Code
                    </Label>
                    <Input
                      maxLength={6}
                      placeholder="6-digit code"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                      className="h-12 text-center text-xl tracking-[0.3em] font-bold rounded"
                      style={{
                        background: "#fff",
                        border: invalid ? "1px solid #e55" : "1px solid rgba(0,0,0,0.12)",
                      }}
                    />
                  </div>
                )
              }}
            </form.Field>

            <form.Field name="newPassword">
              {(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-12 rounded pr-12"
                        style={{
                          background: "#fff",
                          border: invalid ? "1px solid #e55" : "1px solid rgba(0,0,0,0.12)",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                        style={{ color: "#aaa" }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )
              }}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                      Confirm Password
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
                otp: state.values.otp,
                newPassword: state.values.newPassword,
                confirmPassword: state.values.confirmPassword,
                formSubmitting: state.isSubmitting,
              })}
            >
              {({ otp, newPassword, confirmPassword, formSubmitting }) => (
                <Button
                  type="submit"
                  disabled={
                    formSubmitting ||
                    otp.length !== 6 ||
                    newPassword.length < 6 ||
                    confirmPassword !== newPassword
                  }
                  className="w-full h-[54px] mt-2 rounded text-sm font-medium tracking-wide transition-all"
                  style={{
                    background: "#725CAD",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  {formSubmitting && (
                    <Loader2 size={18} className="animate-spin mr-2" />
                  )}
                  {formSubmitting ? "Resetting…" : "Reset Password"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <div className="mt-8 flex flex-col gap-4 text-center">
            <p className="text-[13px]" style={{ color: "#999" }}>
              Didn't receive the code?{" "}
              {canResend ? (
                <button
                  type="button"
                  disabled={isResending}
                  onClick={handleResend}
                  className="font-medium transition-colors hover:underline"
                  style={{ color: "#725CAD" }}
                >
                  {isResending ? "Resending…" : "Resend code"}
                </button>
              ) : (
                <span className="font-medium" style={{ color: "#725CAD" }}>
                  Resend in {countdown}s
                </span>
              )}
            </p>

            <Link 
              href="/forget-password" 
              className="flex items-center justify-center gap-2 text-[13px] font-medium transition-colors hover:opacity-80"
              style={{ color: "#666" }}
            >
              <ArrowLeft size={14} />
              Try another email
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
