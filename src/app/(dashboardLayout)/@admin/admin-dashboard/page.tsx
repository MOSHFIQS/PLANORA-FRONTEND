// "use client";

import React from "react";
import {
  ShoppingCart,
  Truck,
  X,
  Package,
  Users,
  Star,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Minus,
  Banknote,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type StatItem = {
  value: number;
  label: string;
  weeklyChange: number;
  additionalInfo: string;
};

const EnhancedStatCard = ({
  title,
  value,
  weeklyChange,
  additionalInfo,
  icon,
  bgColor,
  accentColor,
  url,
}: {
  title: string;
  value: number | string;
  weeklyChange: number;
  additionalInfo: string;
  icon: React.ReactNode;
  bgColor: string;
  accentColor: string;
  url: string;
}) => {
  const formatValue = (val: number | string) => {
    if (typeof val === "number") {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
      return val.toString();
    }
    return val;
  };

  const getChangeColor = (change: number) => {
    if (change > 0)
      return "text-emerald-800 bg-emerald-100 border border-emerald-300";
    if (change < 0) return "text-red-800 bg-red-100 border border-red-300";
    return "text-slate-800 bg-slate-100 border border-slate-300";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTooltipText = (change: number) => {
    const changeType =
      change > 0 ? "increase" : change < 0 ? "decrease" : "no change";
    return `${Math.abs(change)}% ${changeType} from last week`;
  };

  return (
    <Link href={url}>
      <Card
        className={`relative p-5 ${bgColor} border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 group cursor-pointer overflow-hidden rounded-xl min-h-[140px] max-h-[160px] shadow-sm hover:shadow-md`}
      >
        {/* Background Pattern */}
        {/* <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div> */}

        {/* Change Indicator */}
        

        {/* Content */}
        <div className="relative flex flex-row  gap-6 z-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white border-2 border-white/60 rounded-xl mb-4 shadow-sm">
            {icon}
          </div>

          {/* Value */}
          <div>
            {/* Title */}
            <p className="text-xl font-bold text-slate-800">{title}</p>

            {/* Info */}
            <p className="text-sm text-slate-700 font-semibold">
              {additionalInfo}
            </p>
            <h3 className="text-base lg:text-xl font-bold mt-1.5  text-slate-900">
              {formatValue(value)}
            </h3>

          </div>
        </div>
      </Card>
    </Link>
  );
};

const AdminStats = () => {
  const fakeStats: StatItem[] = [
    {
      value: 125000,
      label: "Pending Sale",
      weeklyChange: 12,
      additionalInfo: "32 sales waiting",
    },
    {
      value: 58,
      label: "Pending Orders",
      weeklyChange: -5,
      additionalInfo: "Need confirmation",
    },
    {
      value: 342,
      label: "Total Products",
      weeklyChange: 8,
      additionalInfo: "15 added this week",
    },
    {
      value: 210,
      label: "Total Customers",
      weeklyChange: 6,
      additionalInfo: "New signups growing",
    },
    {
      value: 875000,
      label: "Complete Sale",
      weeklyChange: 15,
      additionalInfo: "Best week yet",
    },
    {
      value: 176,
      label: "Total Delivery",
      weeklyChange: 4,
      additionalInfo: "Delivered successfully",
    },
    {
      value: 94,
      label: "Reviews",
      weeklyChange: 9,
      additionalInfo: "Customer feedback",
    },
    {
      value: 12,
      label: "Cancelled Orders",
      weeklyChange: -2,
      additionalInfo: "Reduced cancellations",
    },
  ];

  const statsConfig = [
    {
      icon: <Banknote className="text-blue-700 w-6 h-6" />,
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
      accentColor: "#1d4ed8",
      url: "#",
    },
    {
      icon: <ShoppingCart className="text-indigo-700 w-6 h-6" />,
      bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-200",
      accentColor: "#3730a3",
      url: "#",
    },
    {
      icon: <Package className="text-purple-700 w-6 h-6" />,
      bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
      accentColor: "#5b21b6",
      url: "#",
    },
    {
      icon: <Users className="text-emerald-700 w-6 h-6" />,
      bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      accentColor: "#047857",
      url: "#",
    },
    {
      icon: <Banknote className="text-amber-700 w-6 h-6" />,
      bgColor: "bg-gradient-to-br from-amber-100 to-amber-200",
      accentColor: "#b45309",
      url: "#",
    },
    {
      icon: <Truck className="text-orange-700 w-6 h-6" />,
      bgColor: "bg-gradient-to-br from-orange-100 to-orange-200",
      accentColor: "#c2410c",
      url: "#",
    },
    {
      icon: <Star className="text-yellow-700 w-6 h-6" />,
      bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-200",
      accentColor: "#a16207",
      url: "#",
    },
    {
      icon: <X className="text-red-700 w-6 h-6" />,
      bgColor: "bg-gradient-to-br from-red-100 to-red-200",
      accentColor: "#b91c1c",
      url: "#",
    },
  ];

  return (
    <div className="space-y-6 mb-6">
      <Card className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl shadow-none">
        <h4 className="text-lg sm:text-xl lg:text-2xl text-slate-900 font-bold mb-6">
          Dashboard
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {fakeStats.map((stat, i) => (
            <EnhancedStatCard
              key={i}
              title={stat.label}
              value={stat.value}
              weeklyChange={stat.weeklyChange}
              additionalInfo={stat.additionalInfo}
              icon={statsConfig?.[i]?.icon}
              bgColor={statsConfig?.[i]?.bgColor}
              accentColor={statsConfig?.[i]?.accentColor}
              url={statsConfig?.[i]?.url}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminStats;