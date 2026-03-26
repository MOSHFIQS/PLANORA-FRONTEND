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
                    title: "Create Event",
                    url: "/dashboard/event/create",
               },
               {
                    title: "My Events",
                    url: "/dashboard/event",
               },
               {
                    title: "My Events Participants",
                    url: "/dashboard/participants",
               },

               {
                    title: "My Participated Events",
                    url: "/dashboard/participants/my-participated-events",
               },
               {
                    title: "My Invitations",
                    url: "/dashboard/invitations",
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