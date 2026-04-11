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
                    url: "/organizer-dashboard",
                    icon: LayoutDashboard,
               },
          ],
     },
     {
          title: "Account",
          items: [
               {
                    title: "Profile",
                    url: "/organizer-dashboard/my/profile",
                    icon: User,
               },
          ],
     },
     {
          title: "Events",
          items: [
               {
                    title: "Create Event",
                    url: "/organizer-dashboard/events/create",
                    icon: CalendarPlus,
               },
               {
                    title: "Manage Events",
                    url: "/organizer-dashboard/events",
                    icon: Calendar,
               },
               {
                    title: "Participants",
                    url: "/organizer-dashboard/participants",
                    icon: Users,
               },
               {
                    title: "Participated Events",
                    url: "/organizer-dashboard/my/participated-events",
                    icon: Heart,
               },
          ],
     },

     {
          title: "Payments",
          items: [
               {
                    title: "My Payments",
                    url: "/organizer-dashboard/my/payments",
                    icon: CreditCard,
               },
               {
                    title: "Event Payments",
                    url: "/organizer-dashboard/payments/event-payments",
                    icon: Wallet,
               },
          ],
     },

     {
          title: "Tickets",
          items: [
               {
                    title: "My Tickets",
                    url: "/organizer-dashboard/my/tickets",
                    icon: Ticket,
               },
               {
                    title: "Scan Tickets",
                    url: "/organizer-dashboard/tickets/scan",
                    icon: ScanLine,
               },
          ],
     },

     {
          title: "Engagement",
          items: [
               {
                    title: "My Invitations",
                    url: "/organizer-dashboard/my/invitations",
                    icon: Mail,
               },
               {
                    title: "My Reviews",
                    url: "/organizer-dashboard/my/reviews",
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