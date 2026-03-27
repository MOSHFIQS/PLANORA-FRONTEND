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
                    title: "All Categories",
                    url: "/admin-dashboard/category",
               },
               {
                    title: "Home",
                    url: "/",
               }
          ],
     }
]