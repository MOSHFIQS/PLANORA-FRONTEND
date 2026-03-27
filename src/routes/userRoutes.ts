import { Route } from "@/types/routes.type";

export const userRoutes: Route[] = [
     {
          title: "Account",
          items: [
               {
                    title: "Profile",
                    url: "/seller-dashboard/profile",
               },
          ],
     },
     {
          title: "Events",
          items: [
               {
                    title: "Create Event",
                    url: "/dashboard/event/create",
               },
               {
                    title: "My Events",
                    url: "/dashboard/event",
               },
               {
                    title: "Participants",
                    url: "/dashboard/participants",
               },
               {
                    title: "My Participated Events",
                    url: "/dashboard/participants/my-participated-events",
               },
          ],
     },
     {
          title: "Engagement",
          items: [
               {
                    title: "My Invitations",
                    url: "/dashboard/invitations",
               },
               {
                    title: "My Reviews",
                    url: "/dashboard/review",
               },
          ],
     },
     {
          title: "General",
          items: [
               {
                    title: "Home",
                    url: "/",
               },
          ],
     },
];