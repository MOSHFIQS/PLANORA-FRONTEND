import { apiFetchServerMain } from "@/lib/apiFetchServer"



export const authService = {

     logIn: (payload: { email: string; password: string }) =>
          apiFetchServerMain("/auth/login", {
               method: "POST",
               body: JSON.stringify(payload),
          }),
          
     register: (payload: { email: string; password: string, name: string, image?: string, role: "USER" | "ORGANIZER" }) =>
          apiFetchServerMain("/auth/register", {
               method: "POST",
               body: JSON.stringify(payload),
          }),
     
     googleLogin: (redirect: string, role: string) => 
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login/google?redirect=${encodeURIComponent(redirect)}&role=${encodeURIComponent(role)}`,




}