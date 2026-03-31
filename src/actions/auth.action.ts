"use server";

import { authService } from "@/service/server/auth.server.service";
import { revalidatePath } from "next/cache";

export async function logInAction(data: { email: string; password: string }) {
     try {
          const res = await authService.logIn(data);

          if (!res?.ok) {
               return {
                    ok: false,
                    message: res?.message || "Login failed",
               };
          }

          // revalidatePath("/admin-dashboard");

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


export async function registerAction(data: { email: string; password: string }) {
     try {
          const res = await authService.register(data);
          // console.log(res);

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
