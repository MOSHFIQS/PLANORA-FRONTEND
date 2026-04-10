import { Route } from "@/types/routes.type";
import {
     LayoutDashboard,
     User,
     CalendarPlus,
     Calendar,
     Users,
     Heart,
     Mail,
     Star,
     Home,
     List,
     CreditCard,
     Wallet,
     Ticket,
     ScanLine,
     MapPin,
} from "lucide-react";

export const userRoutes: Route[] = [
     {
          title: "Dashboard",
          items: [
               {
                    title: "Analytics",
                    url: "/dashboard",
                    icon: LayoutDashboard,
               },
          ],
     },
     {
          title: "Account",
          items: [
               {
                    title: "Profile",
                    url: "/dashboard/my/profile",
                    icon: User,
               },
          ],
     },
     {
          title: "My Events",
          items: [
               {
                    title: "Participated Events",
                    url: "/dashboard/my/participated-events",
                    icon: Heart,
               },
          ],
     },

     {
          title: "Payments",
          items: [
               {
                    title: "My Payments",
                    url: "/dashboard/my/payments",
                    icon: CreditCard,
               }
          ],
     },

     {
          title: "Tickets",
          items: [
               {
                    title: "My Tickets",
                    url: "/dashboard/my/tickets",
                    icon: Ticket,
               }
          ],
     },

     {
          title: "Engagement",
          items: [
               {
                    title: "My Invitations",
                    url: "/dashboard/my/invitations",
                    icon: Mail,
               },
               {
                    title: "My Reviews",
                    url: "/dashboard/my/reviews",
                    icon: Star,
               },
          ],
     },
     {
          title: "Navigation",
          items: [
               {
                    title: "Home",
                    url: "/",
                    icon: Home,
               },
               {
                    title: "Browse Events",
                    url: "/events",
                    icon: List,
               },
               {
                    title: "Contact Us",
                    url: "/contact",
                    icon: Mail,
               },
               {
                    title: "Find Us",
                    url: "/find-us",
                    icon: MapPin,
               },
          ],
     },
];