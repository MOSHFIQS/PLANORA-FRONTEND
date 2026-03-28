"use server";

import { authService } from "@/service/server/auth.server.service";
import { revalidatePath } from "next/cache";

export async function signInAction(data: { email: string; password: string }) {
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
