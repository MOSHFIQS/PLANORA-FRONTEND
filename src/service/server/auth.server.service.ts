import { apiFetchServerMain } from "@/lib/apiFetchServer"



export const authService = {
     logIn: (payload: { email: string; password: string }) =>
          apiFetchServerMain("/auth/login", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     register: (payload: {
          email: string
          password: string
          name: string
          image?: string
          role: "USER" | "ORGANIZER"
     }) =>
          apiFetchServerMain("/auth/register", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     googleLogin: (redirect: string, role: string) =>
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/google?redirect=${encodeURIComponent(redirect)}&role=${encodeURIComponent(role)}`,

     logout: () =>
          apiFetchServerMain("/auth/logout", {
               method: "POST",
          }),

     verifyEmail: (payload: { email: string; otp: string }) =>
          apiFetchServerMain("/auth/verify-email", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     forgetPassword: (payload: { email: string }) =>
          apiFetchServerMain("/auth/forget-password", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     resetPassword: (payload: {
          email: string
          otp: string
          newPassword: string
     }) =>
          apiFetchServerMain("/auth/reset-password", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     changePassword: (payload: {
          currentPassword: string
          newPassword: string
     }) =>
          apiFetchServerMain("/auth/change-password", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     resendOTP: (payload: {
          email: string
          type: "email-verification" | "forget-password"
     }) =>
          apiFetchServerMain("/auth/resend-otp", {
               method: "POST",
               body: JSON.stringify(payload),
          }),
}