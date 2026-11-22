"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthProvider"
import { logInAction } from "@/actions/auth.action"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useEffect } from "react"
import GoogleLoginButton from "../GoogleLoginButton"
import { jwtDecode } from "jwt-decode"
import { User } from "@/types/user.types"

const formSchema = z.object({
  password: z.string().min(6, "Minimum length is 6"),
  email: z.string().email("Invalid email"),
})

export function LoginForm() {
  const { setAuthData, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/"
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !searchParams.get("google_login")) {
      const dashboardMap: Record<string, string> = {
        ADMIN: "/admin-dashboard",
        ORGANIZER: "/organizer-dashboard",
        SUPERADMIN: "/super-admin-dashboard",
        USER: "/dashboard",
      }
      const dest =
        redirectUrl && redirectUrl !== "/" && redirectUrl !== "/login"
          ? redirectUrl
          : dashboardMap[user.role] || "/dashboard"
      window.location.href = dest
    }
  }, [user, searchParams, redirectUrl])

  // Handle Specific Success States or Auth Requirements
  useEffect(() => {
    // Handle Google OAuth callback from backend
    const isGoogleSuccess = searchParams.get("google_login") === "success"
    const accessToken = searchParams.get("accessToken")
    const refreshToken = searchParams.get("refreshToken")
    const sessionToken = searchParams.get("sessionToken")
    const targetRedirect = searchParams.get("redirect") || "/dashboard"

    if (isGoogleSuccess && accessToken && refreshToken && sessionToken) {
      try {
        const decoded = jwtDecode<any>(accessToken)
        const userData: User = {
          id: decoded.userId || decoded.id,
          name: decoded.name || "",
          email: decoded.email || "",
          role: decoded.role,
          image: decoded.image || "",
          status: decoded.status || "ACTIVE",
          needPasswordChange: decoded.needPasswordChange ?? false,
          emailVerified: decoded.emailVerified ?? true,
          isDeleted: decoded.isDeleted ?? false,
          deletedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        setAuthData(userData, accessToken, refreshToken, sessionToken)
        toast.dismiss()
        toast.success("Signed in with Google successfully!")

        const dashboardMap: Record<string, string> = {
          ADMIN: "/admin-dashboard",
          ORGANIZER: "/organizer-dashboard",
          SUPERADMIN: "/super-admin-dashboard",
          USER: "/dashboard",
        }
        const destination =
          targetRedirect && targetRedirect !== "/" && targetRedirect !== "/login"
            ? targetRedirect
            : dashboardMap[userData.role] || "/dashboard"

        window.location.href = destination
        return
      } catch (err) {
        console.error("Google sign-in callback error:", err)
        toast.error("Failed to complete Google authentication")
      }
    }

    const verified = searchParams.get("verified")
    const reset = searchParams.get("reset")
    if (verified) toast.success("Email verified successfully! Please sign in.")
    if (reset === "success") toast.success("Password reset successfully! Please sign in.")

    const error = searchParams.get("error")
    if (error) {
      const messages: Record<string, string> = {
        oauth_failed: "Google login failed. Please try again.",
        google_session_not_found: "Google session could not be established. Please try again.",
        no_session_found: "Session could not be established.",
        no_user_found: "User data not found in Google response.",
        oauth_callback_failed: "Error occurred during Google callback.",
      }
      toast.error(messages[error] || "An authentication error occurred")
      // Clean up the URL
      const params = new URLSearchParams(searchParams.toString())
      params.delete("error")
      params.delete("verified")
      params.delete("reset")
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`
      window.history.replaceState({}, "", newUrl)
    }
  }, [searchParams])

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)

      const toastId = toast.loading("Signing in…")

      try {
        const result = await logInAction(value)

        if (!result.ok) {
          toast.error(result.message, { id: toastId }) // replaces loading

          if (result.message === "Email not verified") {
            router.push(`/verify-email?email=${encodeURIComponent(value.email)}`)
          }

          return { form: result.message }
        }

        const userData = result.data?.user

        if (userData) {
          if (!userData.emailVerified) {
            toast.error("Please verify your email address", { id: toastId })
            router.push(`/verify-email?email=${encodeURIComponent(userData.email)}`)
            return
          }

          if (userData.needPasswordChange) {
            toast.info("Password reset required", { id: toastId })
            router.push("/change-password")
            return
          }

          setAuthData(
            userData,
            result.data.accessToken,
            result.data.refreshToken,
            result.data.token
          )
        }

        toast.success(result.message, { id: toastId })
        const dashboardMap: Record<string, string> = {
          ADMIN: "/admin-dashboard",
          ORGANIZER: "/organizer-dashboard",
          SUPERADMIN: "/super-admin-dashboard",
          USER: "/dashboard",
        }
        const destination =
          redirectUrl && redirectUrl !== "/" && redirectUrl !== "/login"
            ? redirectUrl
            : dashboardMap[userData?.role || "USER"] || "/dashboard"

        window.location.href = destination

      } catch {
        toast.error("Something went wrong", { id: toastId })
      } finally {
        setIsSubmitting(false)
      }
    }
  })

  return (
    <div className="flex items-center justify-center px-6 py-30">
      <div
        className="relative w-full max-w-[960px] overflow-hidden"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "4px",
        }}
      >
        <div className="grid md:grid-cols-2 min-h-[560px]">
          {/* LEFT: FORM */}
          <div className="flex flex-col justify-center px-14 py-14">
            <p
              className="flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase mb-5"
              style={{ color: "#4F46E5" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: "#4F46E5",
                }}
              />
              Welcome back
            </p>
            <h1
              className="text-[clamp(30px,4vw,40px)] font-bold leading-tight tracking-tight mb-2"
              style={{ color: "#1a1a1a" }}
            >
              Sign in to <span style={{ color: "#4F46E5" }}>Planora</span>
            </h1>
            <p className="text-sm font-light mb-10" style={{ color: "#888" }}>
              Your next event is waiting for you.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="flex flex-col gap-5"
            >
              <form.Field name="email">
                {(field) => {
                  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <div className="flex flex-col gap-1.5">
                      <Label
                        className="text-[11px] font-medium tracking-wide uppercase"
                        style={{ color: "#666" }}
                      >
                        Email address
                      </Label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-12 rounded"
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

              <form.Field name="password">
                {(field) => {
                  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <Label
                          className="text-[11px] font-medium tracking-wide uppercase"
                          style={{ color: "#666" }}
                        >
                          Password
                        </Label>
                        <Link
                          href="/forget-password"
                          className="text-[11px] font-medium transition-colors hover:text-[#4F46E5]"
                          style={{ color: "#888" }}
                        >
                          Forgot Password?
                        </Link>
                      </div>
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
                            color: "#1a1a1a",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                          style={{ color: "#aaa" }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {invalid && (
                        <span className="text-xs" style={{ color: "#c0392b" }}>
                          {field.state.meta.errors[0]?.toString()}
                        </span>
                      )}
                    </div>
                  )
                }}
              </form.Field>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[50px] mt-2 rounded text-sm font-medium tracking-wide transition-all"
                style={{
                  background: "#4F46E5",
                  color: "#fff",
                  border: "none",
                }}
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin mr-2" />}
                {isSubmitting ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-black/10" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                <span className="bg-[#f8f6f0] px-4 text-black/40">Or continue with</span>
              </div>
            </div>

            <GoogleLoginButton redirectUrl={redirectUrl} />

            <p className="text-center text-[13px] mt-6" style={{ color: "#999" }}>
              New to Planora?{" "}
              <Link
                href={`/register?redirect=${encodeURIComponent(redirectUrl)}`}
                className="font-medium transition-colors"
                style={{ color: "#4F46E5" }}
              >
                Create an account
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
              className="inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[11px] font-medium tracking-widest uppercase w-fit mb-1"
              style={{
                background: "rgba(13,184,196,0.15)",
                border: "1px solid rgba(13,184,196,0.3)",
                color: "#4F46E5",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4F46E5",
                  display: "inline-block",
                }}
              />
              Live events
            </div>
            <h2
              className="text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-tight m-0"
              style={{ color: "#f0ede4" }}
            >
              Discover events <br />
              worth <em style={{ color: "#4F46E5", fontStyle: "italic" }}>remembering</em>
            </h2>
            <p className="text-[13px] leading-relaxed max-w-[280px] font-light m-0" style={{ color: "#888" }}>
              Connect with organisers, secure your spot, and experience moments that matter.
            </p>
            <div
              className="flex gap-7 mt-2 pt-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[
                { num: "12k+", label: "Events" },
                { num: "84k+", label: "Members" },
                { num: "98%", label: "Satisfaction" },
              ].map(({ num, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[22px] font-bold leading-none" style={{ color: "#f0ede4" }}>
                    {num}
                  </span>
                  <span
                    className="text-[11px] tracking-wide uppercase"
                    style={{ color: "#666" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}