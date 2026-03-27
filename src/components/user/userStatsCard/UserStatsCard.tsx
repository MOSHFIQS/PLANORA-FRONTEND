"use client";

import React from "react";
import {
  Users,
  Mail,
  ClipboardList,
  CreditCard,
  Star,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Card } from "@/components/ui/card";

type Props = {
  data: any;
};

const iconMap: Record<string, React.ReactNode> = {
  // invitations
  acceptedInvites: <Mail className="text-green-700 w-6 h-6" />,
  pendingInvites: <Mail className="text-yellow-700 w-6 h-6" />,
  totalInvitesReceived: <Mail className="text-purple-700 w-6 h-6" />,

  // organizer
  totalEventsCreated: <Calendar className="text-indigo-700 w-6 h-6" />,
  totalInvitesSent: <Mail className="text-blue-700 w-6 h-6" />,
  acceptedInvitesOnMyEvents: <Mail className="text-green-700 w-6 h-6" />,
  totalParticipantsInMyEvents: (
    <ClipboardList className="text-orange-700 w-6 h-6" />
  ),
  totalReviewsOnMyEvents: <Star className="text-yellow-700 w-6 h-6" />,

  // participation
  totalJoined: <ClipboardList className="text-orange-700 w-6 h-6" />,
  approvedJoined: <ClipboardList className="text-green-700 w-6 h-6" />,
  pendingJoined: <ClipboardList className="text-yellow-700 w-6 h-6" />,

  // payments
  totalPayments: <CreditCard className="text-amber-700 w-6 h-6" />,
  successfulPayments: <CreditCard className="text-green-700 w-6 h-6" />,
  totalSpent: <CreditCard className="text-blue-700 w-6 h-6" />,

  // reviews
  totalReviews: <Star className="text-yellow-700 w-6 h-6" />,
};

const EnhancedStatCard = ({
  title,
  value,
  icon,
  bgColor,
  accentColor = "#64748b",
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bgColor: string;
  accentColor?: string;
}) => {
  const formatValue = (val: number | string) => {
    if (typeof val === "number") {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
      return val.toString();
    }
    return val;
  };

  return (
    <Card
      className={`relative overflow-hidden p-5 ${bgColor} border-2 border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all`}
    >
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative flex gap-4 items-center z-10">
        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl border shadow-sm">
          {icon}
        </div>

        <div>
          <p className="text-sm text-slate-600 font-medium">{title}</p>
          <h3 className="text-lg font-bold text-slate-900">
            {formatValue(value)}
          </h3>
        </div>
      </div>
    </Card>
  );
};

const UserStatsCard = ({ data }: Props) => {
  // Flatten nested data
  const flattenStats = (obj: any): any[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return flattenStats(value);
      }

      return [{ key, title: key, value }];
    });
  };

  const stats = flattenStats(data);

  const getBgColor = (key: string) => {
    if (key.toLowerCase().includes("user"))
      return "bg-gradient-to-br from-blue-100 to-blue-200";
    if (key.toLowerCase().includes("invite"))
      return "bg-gradient-to-br from-purple-100 to-purple-200";
    if (key.toLowerCase().includes("join") || key.toLowerCase().includes("participant"))
      return "bg-gradient-to-br from-orange-100 to-orange-200";
    if (key.toLowerCase().includes("payment") || key.toLowerCase().includes("spent"))
      return "bg-gradient-to-br from-amber-100 to-amber-200";
    if (key.toLowerCase().includes("review"))
      return "bg-gradient-to-br from-yellow-100 to-yellow-200";

    return "bg-gradient-to-br from-slate-100 to-slate-200";
  };

  const getAccentColor = (key: string) => {
    if (key.toLowerCase().includes("invite")) return "#7c3aed";
    if (key.toLowerCase().includes("payment")) return "#b45309";
    if (key.toLowerCase().includes("join")) return "#ea580c";
    if (key.toLowerCase().includes("review")) return "#a16207";
    return "#64748b";
  };

  return (
    <div className="space-y-6 mb-6">
      <Card className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl shadow-none">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6">
          Dashboard Stats
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <EnhancedStatCard
              key={i}
              title={stat.title}
              value={stat.value}
              icon={
                iconMap[stat.key] || (
                  <TrendingUp className="w-6 h-6 text-slate-700" />
                )
              }
              bgColor={getBgColor(stat.key)}
              accentColor={getAccentColor(stat.key)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserStatsCard;