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
        url: "/seller-dashboard/profile",
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
        title: "My Events",
        url: "/dashboard/event",
        icon: Calendar,
      },
      {
        title: "Participants",
        url: "/dashboard/participants",
        icon: Users,
      },
      {
        title: "My Participated Events",
        url: "/dashboard/participants/my-participated-events",
        icon: Heart,
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
        title: "All Events",
        url: "/events",
        icon: List,
      },
    ],
  },
];