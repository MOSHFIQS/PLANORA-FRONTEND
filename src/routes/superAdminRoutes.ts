import { Route } from "@/types/routes.type";
import {
     LayoutDashboard,
     User,
     Users,
     Shield,
     Tags,
     Image as ImageIcon,
     Home,
     CreditCard,
     List,
     Mail,
     MapPin,
     Ticket,
     Star,
     Heart,
} from "lucide-react";

export const superAdminRoutes: Route[] = [
     {
          title: "Dashboard",
          items: [
               {
                    title: "Analytics",
                    url: "/super-admin-dashboard",
                    icon: LayoutDashboard,
               },
          ],
     },

     {
          title: "Account",
          items: [
               {
                    title: "Profile",
                    url: "/super-admin-dashboard/my/profile",
                    icon: User,
               },
          ],
     },

     {
          title: "User Management",
          items: [
               {
                    title: "All Users",
                    url: "/super-admin-dashboard/users",
                    icon: Users,
               },
               {
                    title: "All Admins",
                    url: "/super-admin-dashboard/admins",
                    icon: Shield,
               },
               {
                    title: "Audit Logs",
                    url: "/super-admin-dashboard/audit",
                    icon: Shield,
               },
          ],
     },

     {
          title: "Content Management",
          items: [
               {
                    title: "All Categories",
                    url: "/super-admin-dashboard/category",
                    icon: Tags,
               },
               {
                    title: "All Banners",
                    url: "/super-admin-dashboard/banner",
                    icon: ImageIcon,
               },
               {
                    title: "Manage Events",
                    url: "/super-admin-dashboard/events",
                    icon: List,
               },
          ],
     },

     {
          title: "Payments",
          items: [
               {
                    title: "All Payments",
                    url: "/super-admin-dashboard/payments",
                    icon: CreditCard,
               },
               {
                    title: "My Payments",
                    url: "/super-admin-dashboard/my/payments",
                    icon: CreditCard,
               }
          ],
     },

     {
          title: "My Events",
          items: [
               {
                    title: "Participated Events",
                    url: "/super-admin-dashboard/my/participated-events",
                    icon: Heart,
               },
          ],
     },



     {
          title: "Tickets",
          items: [
               {
                    title: "My Tickets",
                    url: "/super-admin-dashboard/my/tickets",
                    icon: Ticket,
               }
          ],
     },

     {
          title: "Engagement",
          items: [
               {
                    title: "My Invitations",
                    url: "/super-admin-dashboard/my/invitations",
                    icon: Mail,
               },
               {
                    title: "My Reviews",
                    url: "/super-admin-dashboard/my/reviews",
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