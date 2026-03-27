import { Route } from "@/types/routes.type";

export const adminRoutes: Route[] = [
     {
          title: "Dashboard",
          items: [
               {
                    title: "Analytics",
                    url: "/admin-dashboard",
               },
          ],
     },

     {
          title: "User Management",
          items: [
               {
                    title: "All Users",
                    url: "/admin-dashboard/users",
               },
               {
                    title: "All Admins",
                    url: "/admin-dashboard/admins",
               },
          ],
     },

     {
          title: "Content Management",
          items: [
               {
                    title: "All Categories",
                    url: "/admin-dashboard/category",
               },
               {
                    title: "All Banners",
                    url: "/admin-dashboard/banner",
               },
          ],
     },

     {
          title: "Account",
          items: [
               {
                    title: "Profile",
                    url: "/admin-dashboard/profile",
               },
          ],
     },

     {
          title: "Navigation",
          items: [
               {
                    title: "Home",
                    url: "/",
               },
          ],
     },
];