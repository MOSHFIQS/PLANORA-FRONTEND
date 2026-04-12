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

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Analytics", url: "/admin-dashboard", icon: LayoutDashboard },
    ],
  },

  {
    title: "Account",
    items: [
      { title: "Profile", url: "/admin-dashboard/my/profile", icon: User },
    ],
  },

  {
    title: "User Management",
    items: [
      { title: "All Users", url: "/admin-dashboard/users", icon: Users },
    ],
  },

  {
    title: "Content Management",
    items: [
      { title: "All Categories", url: "/admin-dashboard/category", icon: Tags },
      { title: "All Banners", url: "/admin-dashboard/banner", icon: ImageIcon },
      { title: "Manage Events", url: "/admin-dashboard/events", icon: List },
    ],
  },

  {
    title: "Payments",
    items: [
      { title: "All Payments", url: "/admin-dashboard/payments", icon: CreditCard },
    ],
  },

  {
    title: "My Activity",
    items: [
      { title: "My Payments", url: "/admin-dashboard/my/payments", icon: CreditCard },
      { title: "Participated Events", url: "/admin-dashboard/my/participated-events", icon: Heart },
      { title: "My Tickets", url: "/admin-dashboard/my/tickets", icon: Ticket },
      { title: "My Invitations", url: "/admin-dashboard/my/invitations", icon: Mail },
      { title: "My Reviews", url: "/admin-dashboard/my/reviews", icon: Star },
    ],
  },

  {
    title: "Navigation",
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "Browse Events", url: "/events", icon: List },
      { title: "Contact Us", url: "/contact", icon: Mail },
      { title: "Find Us", url: "/find-us", icon: MapPin },
    ],
  },
];