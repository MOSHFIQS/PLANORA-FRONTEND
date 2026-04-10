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

export const organizerRoutes: Route[] = [
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
                    url: "/dashboard/profile",
                    icon: User,
               },
          ],
     },
     {
          title: "Events",
          items: [
               {
                    title: "Create Event",
                    url: "/dashboard/event/create",
                    icon: CalendarPlus,
               },
               {
                    title: "Manage Events",
                    url: "/dashboard/event",
                    icon: Calendar,
               },
               {
                    title: "Participants",
                    url: "/dashboard/participants",
                    icon: Users,
               },
               {
                    title: "Participated Events",
                    url: "/dashboard/participants/my-participated-events",
                    icon: Heart,
               },
          ],
     },

     {
          title: "Payments",
          items: [
               {
                    title: "My Payments",
                    url: "/dashboard/payments",
                    icon: CreditCard,
               },
               {
                    title: "Event Payments",
                    url: "/dashboard/payments/event-payments",
                    icon: Wallet,
               },
          ],
     },

     {
          title: "Tickets",
          items: [
               {
                    title: "My Tickets",
                    url: "/dashboard/tickets",
                    icon: Ticket,
               },
               {
                    title: "Scan Tickets",
                    url: "/dashboard/tickets/scan",
                    icon: ScanLine,
               },
          ],
     },

     {
          title: "Engagement",
          items: [
               {
                    title: "My Invitations",
                    url: "/dashboard/invitations",
                    icon: Mail,
               },
               {
                    title: "My Reviews",
                    url: "/dashboard/review",
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