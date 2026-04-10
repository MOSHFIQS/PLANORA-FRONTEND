"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthProvider"
import { registerAction } from "@/actions/auth.action"
import ImageUploader from "@/components/imageUploader/ImageUploader"
import { useImageUpload } from "@/hooks/useImageUpload"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, User, CalendarDays, Ticket, Bell, Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Minimum length is 2"),
  password: z.string().min(6, "Minimum length is 6"),
  email: z.string().email("Invalid email"),
  role: z.enum(["USER", "ORGANIZER"]),
})

export function RegisterForm() {
  const { setAuthData } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/"
  const registerImages = useImageUpload({ max: 1 })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", role: "USER" as "USER" | "ORGANIZER" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      const toastId = toast.loading("Creating account…")
      try {
        const result = await registerAction({ ...value, image: registerImages.images[0]?.img })
        if (!result.ok) {
          toast.error(result.message || "Registration failed", { id: toastId })
          return { form: "Registration failed" }
        }
        if (result.data?.user)
          setAuthData(result.data.user, result.data.accessToken, result.data.refreshToken, result.data.token)
        toast.success(result.message, { id: toastId })
        router.push(redirectUrl)
      } catch {
        toast.error("Something went wrong", { id: toastId })
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <div
      className="flex items-center justify-center p-6"
     
    >
      <div
        className="relative w-full max-w-[1040px] overflow-hidden"
        style={{
          background: "#f8f6f0",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "4px",
          // boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        }}
      >
        <div className="grid md:grid-cols-2 min-h-[640px]">

          {/* LEFT: FORM */}
          <div className="flex flex-col justify-center px-12 py-12 overflow-y-auto">
            <p
              className="flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase mb-4"
              style={{ color: "#0db8c4" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: "#0db8c4",
                }}
              />
              Get started
            </p>
            <h1
              className="text-[clamp(26px,3.5vw,36px)] font-bold leading-tight tracking-tight mb-1.5"
              style={{ color: "#1a1a1a" }}
            >
              Create your{" "}
              <span style={{ color: "#0db8c4" }}>Planora</span> account
            </h1>
            <p className="text-sm font-light mb-8" style={{ color: "#888" }}>
              Join thousands discovering events that matter.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}>
              <div className="grid grid-cols-2 gap-x-5">

                <form.Field name="name">
                  {(field) => {
                    const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <div className="flex flex-col gap-1.5 mb-4">
                        <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                          Full name
                        </Label>
                        <Input
                          placeholder="Alex Chen"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="h-[46px] rounded"
                          style={{
                            background: "#fff",
                            border: invalid ? "1px solid #e55" : "1px solid rgba(0,0,0,0.12)",
                            color: "#1a1a1a",
                          }}
                        />
                        {invalid && (
                          <span className="text-[11.5px]" style={{ color: "#c0392b" }}>
                            {field.state.meta.errors[0]?.toString()}
                          </span>
                        )}
                      </div>
                    )
                  }}
                </form.Field>

                <form.Field name="email">
                  {(field) => {
                    const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <div className="flex flex-col gap-1.5 mb-4">
                        <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                          Email
                        </Label>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="h-[46px] rounded"
                          style={{
                            background: "#fff",
                            border: invalid ? "1px solid #e55" : "1px solid rgba(0,0,0,0.12)",
                            color: "#1a1a1a",
                          }}
                        />
                        {invalid && (
                          <span className="text-[11.5px]" style={{ color: "#c0392b" }}>
                            {field.state.meta.errors[0]?.toString()}
                          </span>
                        )}
                      </div>
                    )
                  }}
                </form.Field>

                <form.Field name="password">
                  {(field) => {
                    const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <div className="flex flex-col gap-1.5 mb-4">
                        <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Min. 6 characters"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="h-[46px] rounded pr-11"
                            style={{
                              background: "#fff",
                              border: invalid ? "1px solid #e55" : "1px solid rgba(0,0,0,0.12)",
                              color: "#1a1a1a",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                            style={{ color: "#aaa" }}
                          >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                        {invalid && (
                          <span className="text-[11.5px]" style={{ color: "#c0392b" }}>
                            {field.state.meta.errors[0]?.toString()}
                          </span>
                        )}
                      </div>
                    )
                  }}
                </form.Field>

                <form.Field name="role">
                  {(field) => (
                    <div className="flex flex-col gap-1.5 mb-4">
                      <Label className="text-[11px] font-medium tracking-wide uppercase" style={{ color: "#666" }}>
                        Account type
                      </Label>
                      <div
                        className="grid grid-cols-2 h-[46px] p-1 gap-1 rounded"
                        style={{
                          background: "#fff",
                          border: "1px solid rgba(0,0,0,0.12)",
                        }}
                      >
                        {(["USER", "ORGANIZER"] as const).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => field.handleChange(r)}
                            className="flex items-center justify-center gap-1.5 rounded text-[13px] transition-all"
                            style={
                              field.state.value === r
                                ? {
                                    background: "rgba(13,184,196,0.12)",
                                    color: "#0a9ea8",
                                    border: "1px solid rgba(13,184,196,0.3)",
                                    fontWeight: 500,
                                  }
                                : { color: "#999" }
                            }
                          >
                            {r === "USER" ? <User size={12} /> : <CalendarDays size={12} />}
                            {r === "USER" ? "Participant" : "Organizer"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </form.Field>

                <div className="col-span-2 mb-4">
                  <ImageUploader
                    label="Profile photo (optional)"
                    images={registerImages.images}
                    onUpload={registerImages.upload}
                    onDelete={registerImages.remove}
                    multiple={false}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[50px] rounded text-sm font-medium tracking-wide transition-all"
                style={{
                  background: "#0db8c4",
                  color: "#fff",
                  border: "none",
                }}
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin mr-2" />}
                {isSubmitting ? "Creating account…" : "Create account"}
              </Button>
            </form>

            <p className="text-center text-[13px] mt-5" style={{ color: "#999" }}>
              Already have an account?{" "}
              <Link href="/login" className="font-medium transition-colors" style={{ color: "#0db8c4" }}>
                Sign in
              </Link>
            </p>
          </div>

          {/* RIGHT: VISUAL */}
          <div
            className="hidden md:flex flex-col justify-end p-12 gap-4"
            style={{
              borderLeft: "1px solid rgba(0,0,0,0.08)",
              background: "#1a1a1a",
            }}
          >
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-widest uppercase w-fit mb-1"
              style={{
                background: "rgba(13,184,196,0.15)",
                border: "1px solid rgba(13,184,196,0.3)",
                color: "#0db8c4",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#0db8c4",
                  display: "inline-block",
                }}
              />
              Free to join
            </div>
            <h2
              className="text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-tight m-0"
              style={{ color: "#f0ede4" }}
            >
              Your events,{" "}
              <br />
              your <em style={{ color: "#0db8c4", fontStyle: "italic" }}>community</em>
            </h2>
            <p className="text-[13px] leading-relaxed max-w-[280px] font-light m-0" style={{ color: "#888" }}>
              Whether you attend or organise, Planora puts you at the centre of every experience.
            </p>
            <div
              className="flex flex-col gap-2.5 mt-2 pt-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[
                { icon: Ticket, text: "Book and manage tickets in one place" },
                { icon: CalendarDays, text: "Create events in minutes" },
                { icon: Bell, text: "Never miss what matters" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-[13px]"
                  style={{ color: "#888" }}
                >
                  <div
                    className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(13,184,196,0.1)",
                      border: "1px solid rgba(13,184,196,0.2)",
                      color: "#0db8c4",
                    }}
                  >
                    <Icon size={13} />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}