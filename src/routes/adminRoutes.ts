import { Route } from "@/types/routes.type";


export const adminRoutes: Route[] = [
     {
          title: "admin sidebar",
          items: [
               {
                    title: "Analytics",
                    url: "/admin-dashboard",
               },
               // {
               //      title: "Profile",
               //      url: "/admin-dashboard/profile",
               // },
               {
                    title: "All Admins",
                    url: "/admin-dashboard/admin",
               },
               {
                    title: "All Products",
                    url: "/admin-dashboard/product",
               },
               // {
               //      title: "Create Category",
               //      url: "/admin-dashboard/category/create",
               // },
               {
                    title: "All Category",
                    url: "/admin-dashboard/category",
               },
               {
                    title: "All Orders",
                    url: "/admin-dashboard/order",
               },
               {
                    title: "All Banners",
                    url: "/admin-dashboard/banner",
               },
               {
                    title: "Create FAQ",
                    url: "/admin-dashboard/faq/create",
               },
               
               {
                    title: "Home",
                    url: "/",
               }
          ],
     }
]