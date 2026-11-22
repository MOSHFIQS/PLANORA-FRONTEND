"use server";

import { cookies } from "next/headers";
import { authService } from "@/service/server/auth.server.service";

export async function logInAction(data: { email: string; password: string }) {
     try {
          const res = await authService.logIn(data);

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Login failed",
               };
          }

          return {
               ok: true,
               message: res?.message || "Login successful",
               data: res.data,
          };
     } catch (error) {
          return {
               ok: false,
               message: "Something went wrong",
          };
     }
}


export async function registerAction(data: { email: string; password: string, name: string, image?: string, role: "USER" | "ORGANIZER" }) {
     try {
          const res = await authService.register(data);

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Sign up failed",
               };
          }

          // revalidatePath("/admin-dashboard");

          return {
               ok: true,
               message: res?.message || "Sign up successful",
               data: res.data,
               status: res.status,
          };
     } catch (error) {
          return {
               ok: false,
               message: "Something went wrong",
          };
     }
}
export async function getGoogleLoginUrlAction(redirect: string, role: string) {
     try {
          const url = authService.googleLogin(redirect, role);
          console.log(url);
          return {
               ok: true,
               url,
          };
     } catch (error) {
          return {
               ok: false,
               message: "Failed to generate Google login URL",
          };
     }
}

export async function logoutAction() {
     try {
          await authService.logout();
     } catch (error) {
          console.error("Backend logout error:", error);
     }

     try {
          const cookieStore = await cookies();
          const targetCookies = [
               "accessToken",
               "refreshToken",
               "better-auth.session_token",
               "better-auth.session_data",
               "better-auth.csrf_token",
               "better-auth.state",
               "better-auth.pkce_code_verifier",
               "user",
          ];

          for (const name of targetCookies) {
               cookieStore.delete(name);
               cookieStore.set(name, "", {
                    path: "/",
                    expires: new Date(0),
                    maxAge: 0,
               });
          }

          // Also scan all cookies and remove any better-auth related cookies
          for (const cookie of cookieStore.getAll()) {
               if (cookie.name.startsWith("better-auth")) {
                    cookieStore.delete(cookie.name);
                    cookieStore.set(cookie.name, "", {
                         path: "/",
                         expires: new Date(0),
                         maxAge: 0,
                    });
               }
          }
     } catch (err) {
          console.error("Failed to delete cookies in server action:", err);
     }

     return { ok: true, message: "Logged out successful" };
}

export async function verifyEmailAction(data: { email: string; otp: string }) {
     try {
          const res = await authService.verifyEmail(data);
          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Verification failed",
               };
          }
          return { ok: true, message: "Email verified successful" };
     } catch (error) {
          return { ok: false, message: "Something went wrong" };
     }
}

export async function forgetPasswordAction(data: { email: string }) {
     try {
          const res = await authService.forgetPassword(data);
          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Failed to send reset code",
               };
          }
          return { ok: true, message: "Reset code sent to your email" };
     } catch (error) {
          return { ok: false, message: "Something went wrong" };
     }
}

export async function resetPasswordAction(data: {
     email: string
     otp: string
     newPassword: string
}) {
     try {
          const res = await authService.resetPassword(data);
          if (!res?.ok) {
               return { ok: false, message: res?.message || "Reset failed" };
          }
          return { ok: true, message: "Password reset successful" };
     } catch (error) {
          return { ok: false, message: "Something went wrong" };
     }
}

export async function changePasswordAction(data: {
     currentPassword: string
     newPassword: string
}) {
     try {
          const res = await authService.changePassword(data);
          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Failed to change password",
               };
          }
          return { ok: true, message: "Password updated successful" };
     } catch (error) {
          return { ok: false, message: "Something went wrong" };
     }
}

export async function resendOTPAction(data: {
     email: string
     type: "email-verification" | "forget-password"
}) {
     try {
          const res = await authService.resendOTP(data);
          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Failed to resend code",
               };
          }
          return { ok: true, message: "New code sent to your email" };
     } catch (error) {
          return { ok: false, message: "Something went wrong" };
     }
}
