import { Route } from "@/types/routes.type";


export const userRoutes: Route[] = [
     {
          title: "user sidebar",
          items: [
               {
                    title: "Profile",
                    url: "/seller-dashboard/profile",
               },
               {
                    title: "Create Medicine",
                    url: "/seller-dashboard/create-medicine",
               },
               {
                    title: "All Medicine",
                    url: "/seller-dashboard/seller-medicines",
               },

               {
                    title: "My Orders",
                    url: "/seller-dashboard/my-orders",
               },
               {
                    title: "Home",
                    url: "/",
               },
               {
                    title: "Shop",
                    url: "/medicines",
               }
          ],
     }
]