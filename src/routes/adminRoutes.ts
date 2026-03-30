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
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
        icon: User,
      },
    ],
  },

  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin-dashboard/users",
        icon: Users,
      },
      {
        title: "All Admins",
        url: "/admin-dashboard/admins",
        icon: Shield,
      },
    ],
  },

  {
    title: "Content Management",
    items: [
      {
        title: "All Categories",
        url: "/admin-dashboard/category",
        icon: Tags,
      },
      {
        title: "All Banners",
        url: "/admin-dashboard/banner",
        icon: ImageIcon,
      },
      {
        title: "Manage Events",
        url: "/admin-dashboard/events",
        icon: List,
      },
    ],
  },

  {
    title: "Payments",
    items: [
      {
        title: "All Payments",
        url: "/admin-dashboard/payments",
        icon: CreditCard,
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