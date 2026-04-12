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




}