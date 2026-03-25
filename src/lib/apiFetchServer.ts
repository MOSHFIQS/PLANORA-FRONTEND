import { cookies } from "next/headers";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetchServerMain(
     endpoint: string,
     options?: RequestInit,
) {
     const cookieStore = await cookies();
     const cookieHeader = cookieStore.toString();

     const isFormData = options?.body instanceof FormData;

     try {
          const res = await fetch(`${API_BASE}${endpoint}`, {
               method: options?.method || "GET",
               headers: {
                    ...(isFormData
                         ? {}
                         : { "Content-Type": "application/json" }),
                    Cookie: cookieHeader,
                    ...(options?.headers || {}),
               },
               body: options?.body,
               cache: "no-store",
          });
          // console.log(res);

          let data: any = {};
          try {
               data = await res.json();
          } catch {
               data = {};
          }
          // console.log("data 33",data);

          if (!res.ok) {
               return {
                    ok: false,
                    status: res.status,
                    data: data || null,
                    message: data?.message || "API request failed",
               };
          }

          return {
               ok: true,
               status: res.status,
               data: data.data || null,
               message: data?.message || "",
          };
     } catch (err: any) {
          return {
               ok: false,
               status: 500,
               data: null,
               message: err?.message || "Unexpected error occurred",
          };
     }
}
