"use client"

import { useState, useEffect } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { verifyEmailAction, resendOTPAction } from "@/actions/auth.action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, MailCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})

export function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  useEffect(() => {
    if (!email) {
      toast.error("No email provided for verification")
      router.push("/login")
    }
  }, [email, router])

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
    const toastId = toast.loading("Resending verification code…")
    
    try {
      const result = await resendOTPAction({ 
        email, 
        type: "email-verification" 
      })
      
      if (!result.ok) {
        toast.error(result.message || "Failed to resend code", { id: toastId })
        return
      }
      
      toast("New code sent successfully!", { id: toastId })
      setCountdown(60)
      setCanResend(false)
    } catch {
      toast.error("Something went wrong", { id: toastId })
    } finally {
      setIsResending(false)
    }
  }

  const form = useForm({
    defaultValues: { otp: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Verifying code…")
      try {
        const result = await verifyEmailAction({ email, otp: value.otp })
        if (!result.ok) {
          toast.error(result.message || "Invalid or expired code", { id: toastId })
          return
        }
        toast(result.message, { id: toastId })
        router.push("/login?verified=true")
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
            <MailCheck size={32} />
          </div>
          
          <h1 className="text-3xl font-bold mb-3" style={{ color: "#1a1a1a" }}>
            Verify your email
          </h1>
          <p className="text-sm font-light mb-8 max-w-[320px]" style={{ color: "#888" }}>
            We've sent a 6-digit verification code to <br />
            <span className="font-medium" style={{ color: "#1a1a1a" }}>{email}</span>
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="w-full flex flex-col gap-6"
          >
            <form.Field name="otp">
              {(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <div className="flex flex-col gap-2">
                    <Label
                      className="text-[11px] font-medium tracking-wide border-0 uppercase sr-only"
                    >
                      Verification Code
                    </Label>
                    <Input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit code"
                      value={field.state.value}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "")
                        field.handleChange(val)
                      }}
                      className="h-14 text-center text-2xl tracking-[0.5em] font-bold rounded"
                      style={{
                        background: "#fff",
                        border: invalid ? "1px solid #e55" : "1px solid rgba(0,0,0,0.12)",
                        color: "#1a1a1a",
                      }}
                    />
                    {invalid && (
                      <span className="text-xs mt-1" style={{ color: "#c0392b" }}>
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
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ otp, isSubmitting }) => (
                <Button
                  type="submit"
                  disabled={isSubmitting || otp.length !== 6}
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
                  {isSubmitting ? "Verifying…" : "Verify Email"}
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
              href="/login" 
              className="flex items-center justify-center gap-2 text-[13px] font-medium transition-colors hover:opacity-80"
              style={{ color: "#666" }}
            >
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
