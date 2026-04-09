"use client";

import React from "react";
import {
  Users, UserCheck, UserX, Calendar, Mail,
  ClipboardList, CreditCard, Star, TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadialBarChart, RadialBar,
} from "recharts";

type Props = { data: any };

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="text-blue-700 w-5 h-5" />,
  activeUsers: <UserCheck className="text-emerald-700 w-5 h-5" />,
  suspendedUsers: <UserX className="text-red-700 w-5 h-5" />,
  totalAdmins: <Users className="text-indigo-700 w-5 h-5" />,
  totalNormalUsers: <Users className="text-slate-700 w-5 h-5" />,
  events: <Calendar className="text-indigo-700 w-5 h-5" />,
  totalEvents: <Calendar className="text-indigo-700 w-5 h-5" />,
  upcomingEvents: <TrendingUp className="text-green-700 w-5 h-5" />,
  invitations: <Mail className="text-purple-700 w-5 h-5" />,
  totalInvites: <Mail className="text-purple-700 w-5 h-5" />,
  acceptedInvites: <Mail className="text-green-700 w-5 h-5" />,
  participation: <ClipboardList className="text-orange-700 w-5 h-5" />,
  totalParticipants: <ClipboardList className="text-orange-700 w-5 h-5" />,
  approvedParticipants: <ClipboardList className="text-green-700 w-5 h-5" />,
  payments: <CreditCard className="text-amber-700 w-5 h-5" />,
  totalPayments: <CreditCard className="text-amber-700 w-5 h-5" />,
  successfulPayments: <CreditCard className="text-green-700 w-5 h-5" />,
  totalRevenue: <CreditCard className="text-blue-700 w-5 h-5" />,
  reviews: <Star className="text-yellow-700 w-5 h-5" />,
  totalReviews: <Star className="text-yellow-700 w-5 h-5" />,
};

// ── palette helpers ────────────────────────────────────────────
const getBgColor = (key: string) => {
  if (key.toLowerCase().includes("user")) return "bg-blue-50 border-blue-200";
  if (key.toLowerCase().includes("event")) return "bg-indigo-50 border-indigo-200";
  if (key.toLowerCase().includes("payment") || key.toLowerCase().includes("revenue"))
    return "bg-amber-50 border-amber-200";
  if (key.toLowerCase().includes("review")) return "bg-yellow-50 border-yellow-200";
  if (key.toLowerCase().includes("invite")) return "bg-purple-50 border-purple-200";
  if (key.toLowerCase().includes("particip")) return "bg-orange-50 border-orange-200";
  return "bg-slate-50 border-slate-200";
};

// ── Stat Card ──────────────────────────────────────────────────
const StatCard = ({ title, value, icon, bgBorder }: {
  title: string; value: number | string; icon: React.ReactNode; bgBorder: string;
}) => {
  const fmt = (v: number | string) => {
    if (typeof v === "number") {
      if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
      if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
      return v.toString();
    }
    return v;
  };
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border ${bgBorder}`}>
      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-white/80 shadow-sm flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 font-medium truncate">{title}</p>
        <p className="text-xl font-bold text-slate-900 leading-tight">{fmt(value)}</p>
      </div>
    </div>
  );
};

// ── Tooltip ────────────────────────────────────────────────────
const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm px-3 py-2 text-xs">
      {label && <p className="text-slate-500 mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-semibold text-slate-800">{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

// ── Section title ──────────────────────────────────────────────
const SecTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold text-slate-600 mb-3">{children}</h3>
);

// ── Main ───────────────────────────────────────────────────────
const AdminStatsCard = ({ data }: Props) => {

  // flatten
  const flattenStats = (obj: any): { key: string; value: number | string }[] =>
    Object.entries(obj).flatMap(([key, value]) =>
      typeof value === "object" && value !== null
        ? flattenStats(value)
        : [{ key, value: value as number | string }]
    );

  const stats = flattenStats(data);
  const get = (key: string) => (stats.find(s => s.key === key)?.value ?? 0) as number;

  // ── Chart data ─────────────────────────────────────────────
  const userPieData = [
    { name: "Active", value: get("activeUsers"), color: "#10B981" },
    { name: "Suspended", value: get("suspendedUsers"), color: "#EF4444" },
    { name: "Admins", value: get("totalAdmins"), color: "#6366F1" },
    { name: "Normal", value: get("totalNormalUsers"), color: "#3B82F6" },
  ].filter(d => d.value > 0);

  const inviteBarData = [
    { name: "Total", value: get("totalInvites") || get("invitations"), color: "#A855F7" },
    { name: "Accepted", value: get("acceptedInvites"), color: "#10B981" },
  ].filter(d => d.name === "Total" ? true : true);

  const participationData = [
    { name: "Total", value: get("totalParticipants") || get("participation"), color: "#F97316" },
    { name: "Approved", value: get("approvedParticipants"), color: "#10B981" },
  ];

  const paymentBarData = [
    { name: "Total", value: get("totalPayments") || get("payments"), color: "#F59E0B" },
    { name: "Successful", value: get("successfulPayments"), color: "#10B981" },
  ];

  const eventData = [
    { name: "Total", value: get("totalEvents") || get("events"), color: "#6366F1" },
    { name: "Upcoming", value: get("upcomingEvents"), color: "#10B981" },
  ];

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl shadow-none">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6">Dashboard Stats</h4>

        {/* ── Stat cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {stats.map((s, i) => (
            <StatCard
              key={i}
              title={s.key}
              value={s.value}
              icon={iconMap[s.key] || <TrendingUp className="w-5 h-5 text-slate-700" />}
              bgBorder={getBgColor(s.key)}
            />
          ))}
        </div>

        {/* ── Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Users Donut */}
          {userPieData.length > 0 && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <SecTitle>User Breakdown</SecTitle>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={userPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                      paddingAngle={3} dataKey="value">
                      {userPieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip content={<ChartTip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {userPieData.map(d => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    {d.name}: <span className="font-bold text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events + Invitations bar */}
          <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
            <SecTitle>Events & Invitations</SecTitle>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Events", Total: get("totalEvents") || get("events"), Upcoming: get("upcomingEvents") },
                  { name: "Invitations", Total: get("totalInvites") || get("invitations"), Accepted: get("acceptedInvites") },
                ]} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="Total" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Upcoming" fill="#A5B4FC" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Accepted" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payments bar */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <SecTitle>Payments & Participation</SecTitle>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Payments", Total: get("totalPayments") || get("payments"), Success: get("successfulPayments") },
                  { name: "Participants", Total: get("totalParticipants") || get("participation"), Approved: get("approvedParticipants") },
                ]} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="Total" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Success" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Approved" fill="#34D399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Bottom row: Reviews radial + overview bar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

          {/* Reviews */}
          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
            <SecTitle>Reviews</SecTitle>
            <div className="flex items-center gap-6">
              <div style={{ width: 120, height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%"
                    data={[{ name: "Reviews", value: get("totalReviews") || get("reviews"), fill: "#EAB308" }]}
                    startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={8} />
                    <Tooltip content={<ChartTip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-800">
                  {get("totalReviews") || get("reviews")}
                </p>
                <p className="text-sm text-yellow-600 mt-1">Total Reviews</p>
              </div>
            </div>
          </div>

          {/* Overall overview bar */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <SecTitle>Platform Overview</SecTitle>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={[
                  { name: "Users", value: get("users") || get("activeUsers") },
                  { name: "Events", value: get("totalEvents") || get("events") },
                  { name: "Payments", value: get("totalPayments") || get("payments") },
                  { name: "Reviews", value: get("totalReviews") || get("reviews") },
                ].filter(d => d.value > 0)} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }}
                    axisLine={false} tickLine={false} width={60} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[0, 6, 6, 0]}>
                    {["#3B82F6", "#6366F1", "#F59E0B", "#EAB308"].map((c, i) => (
                      <Cell key={i} fill={c} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </Card>
    </div>
  );
};

export default AdminStatsCard;