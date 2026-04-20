"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { forgetPasswordAction } from "@/actions/auth.action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, KeyRound, ArrowLeft } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("Invalid email"),
})

export function ForgetPasswordForm() {
  const router = useRouter()

  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Sending reset code…")
      try {
        const result = await forgetPasswordAction(value)
        if (!result.ok) {
          toast.error(result.message || "Email not found", { id: toastId })
          return
        }
        toast(result.message, { id: toastId })
        router.push(`/reset-password?email=${encodeURIComponent(value.email)}`)
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
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "4px",
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{ background: "rgba(114, 92, 173, 0.1)", color: "#725CAD" }}
          >
            <KeyRound size={32} />
          </div>
          
          <h1 className="text-3xl font-bold mb-3" style={{ color: "#1a1a1a" }}>
            Forgot password?
          </h1>
          <p className="text-sm font-light mb-8 max-w-[320px]" style={{ color: "#888" }}>
            No worries, we'll send you reset instructions.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="w-full flex flex-col gap-6"
          >
            <form.Field name="email">
              {(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <div className="flex flex-col gap-2 text-left w-full">
                    <Label
                      className="text-[11px] font-medium tracking-wide border-0 uppercase"
                      style={{ color: "#666" }}
                    >
                      Email address
                    </Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-13 rounded px-4"
                      style={{
                        background: "#fff",
                        border: invalid ? "1px solid #e55" : "1px solid rgba(0,0,0,0.12)",
                        color: "#1a1a1a",
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
                email: state.values.email,
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ email, isSubmitting }) => (
                <Button
                  type="submit"
                  disabled={isSubmitting || !email.includes("@")}
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
                  {isSubmitting ? "Sending Reset Link…" : "Reset Password"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <div className="mt-8">
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
