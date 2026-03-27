import { Route } from "@/types/routes.type";


export const adminRoutes: Route[] = [
     {
          title: "admin sidebar",
          items: [
               {
                    title: "Analytics",
                    url: "/admin-dashboard",
               },
               {
                    title: "Profile",
                    url: "/admin-dashboard/profile",
               },
               {
                    title: "All Users",
                    url: "/admin-dashboard/users",
               },
               {
                    title: "Home",
                    url: "/",
               }
          ],
     }
]