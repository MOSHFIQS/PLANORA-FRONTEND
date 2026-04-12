"use client";

import React from "react";
import {
  Users, UserCheck, UserX, Calendar, Mail,
  ClipboardList, CreditCard, Star, TrendingUp,
  ShieldCheck, Ticket, Bell, Globe, Lock,
  BarChart2, Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar,
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (v: number | string) => {
  if (typeof v === "number") {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
    return v.toLocaleString();
  }
  return v;
};

const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm px-3 py-2 text-xs">
      {label && <p className="text-slate-500 mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-semibold text-slate-800">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const SecTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold text-slate-600 mb-3">{children}</h3>
);

const StatCard = ({
  title, value, icon, bg,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bg: string;
}) => (
  <div className={`flex items-center gap-3 p-4 rounded-xl border ${bg}`}>
    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-white/80 shadow-sm flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-slate-500 font-medium truncate">{title}</p>
      <p className="text-xl font-bold text-slate-900 leading-tight">{fmt(value)}</p>
    </div>
  </div>
);

const ChartBox = ({
  title, bg, children,
}: {
  title: string;
  bg: string;
  children: React.ReactNode;
}) => (
  <div className={`${bg} rounded-xl border p-4`}>{/* border color comes from bg string */}
    <SecTitle>{title}</SecTitle>
    {children}
  </div>
);

const Legend = ({ items }: { items: { label: string; color: string; value?: number }[] }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
    {items.map((d) => (
      <div key={d.label} className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
        {d.label}{d.value !== undefined && <>: <span className="font-bold text-slate-800 ml-0.5">{d.value}</span></>}
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 1. SUPER ADMIN STATS CARD
// ─────────────────────────────────────────────────────────────────────────────
// Matches getSuperAdminStats():
//   users.{ total, byRole.{ admins, organizers, users }, byStatus.{ active, suspended, deleted } }
//   events.{ total, byVisibility.{ public, private }, byType.{ online, offline }, featured, upcoming, past }
//   participations.{ total, byStatus.{ pending, approved, rejected, banned } }
//   invitations.{ total, byStatus.{ pending, accepted, declined } }
//   payments.{ total, byStatus.{ successful, failed, refunded }, totalRevenue }
//   tickets.{ total, byStatus.{ valid, used, canceled } }
//   reviews.{ total, averageRating }
//   notifications.{ total, unread }
//   auditLogs.{ total }

export const SuperAdminStatsCard = ({ data }: { data: any }) => {
  const u = data?.users ?? {};
  const e = data?.events ?? {};
  const pa = data?.participations ?? {};
  const inv = data?.invitations ?? {};
  const pay = data?.payments ?? {};
  const ti = data?.tickets ?? {};
  const rev = data?.reviews ?? {};
  const not = data?.notifications ?? {};
  const aud = data?.auditLogs ?? {};

  const statCards = [
    { title: "Total Users", value: u.total ?? 0, icon: <Users className="text-blue-700 w-5 h-5" />, bg: "bg-blue-50 border-blue-200" },
    { title: "Active Users", value: u.byStatus?.active ?? 0, icon: <UserCheck className="text-emerald-700 w-5 h-5" />, bg: "bg-emerald-50 border-emerald-200" },
    { title: "Suspended Users", value: u.byStatus?.suspended ?? 0, icon: <UserX className="text-red-700 w-5 h-5" />, bg: "bg-red-50 border-red-200" },
    { title: "Admins", value: u.byRole?.admins ?? 0, icon: <ShieldCheck className="text-indigo-700 w-5 h-5" />, bg: "bg-indigo-50 border-indigo-200" },
    { title: "Organizers", value: u.byRole?.organizers ?? 0, icon: <Users className="text-purple-700 w-5 h-5" />, bg: "bg-purple-50 border-purple-200" },
    { title: "Total Events", value: e.total ?? 0, icon: <Calendar className="text-indigo-700 w-5 h-5" />, bg: "bg-indigo-50 border-indigo-200" },
    { title: "Upcoming Events", value: e.upcoming ?? 0, icon: <TrendingUp className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Total Revenue", value: `$${fmt(pay.totalRevenue ?? 0)}`, icon: <CreditCard className="text-amber-700 w-5 h-5" />, bg: "bg-amber-50 border-amber-200" },
    { title: "Total Payments", value: pay.total ?? 0, icon: <CreditCard className="text-amber-700 w-5 h-5" />, bg: "bg-amber-50 border-amber-200" },
    { title: "Total Tickets", value: ti.total ?? 0, icon: <Ticket className="text-teal-700 w-5 h-5" />, bg: "bg-teal-50 border-teal-200" },
    { title: "Total Reviews", value: rev.total ?? 0, icon: <Star className="text-yellow-700 w-5 h-5" />, bg: "bg-yellow-50 border-yellow-200" },
    { title: "Avg Rating", value: Number(rev.averageRating ?? 0).toFixed(1), icon: <Star className="text-yellow-600 w-5 h-5" />, bg: "bg-yellow-50 border-yellow-200" },
    { title: "Notifications", value: not.total ?? 0, icon: <Bell className="text-slate-600 w-5 h-5" />, bg: "bg-slate-50 border-slate-200" },
    { title: "Unread Notifs", value: not.unread ?? 0, icon: <Bell className="text-orange-600 w-5 h-5" />, bg: "bg-orange-50 border-orange-200" },
    { title: "Audit Logs", value: aud.total ?? 0, icon: <Activity className="text-slate-600 w-5 h-5" />, bg: "bg-slate-50 border-slate-200" },
    { title: "Participations", value: pa.total ?? 0, icon: <ClipboardList className="text-orange-700 w-5 h-5" />, bg: "bg-orange-50 border-orange-200" },
  ];

  const userRolePie = [
    { name: "Users", value: u.byRole?.users ?? 0, color: "#3B82F6" },
    { name: "Organizers", value: u.byRole?.organizers ?? 0, color: "#8B5CF6" },
    { name: "Admins", value: u.byRole?.admins ?? 0, color: "#6366F1" },
  ].filter((d) => d.value > 0);

  const userStatusPie = [
    { name: "Active", value: u.byStatus?.active ?? 0, color: "#10B981" },
    { name: "Suspended", value: u.byStatus?.suspended ?? 0, color: "#EF4444" },
    { name: "Deleted", value: u.byStatus?.deleted ?? 0, color: "#9CA3AF" },
  ].filter((d) => d.value > 0);

  const eventVisData = [
    { name: "Public", value: e.byVisibility?.public ?? 0, color: "#6366F1" },
    { name: "Private", value: e.byVisibility?.private ?? 0, color: "#A855F7" },
  ].filter((d) => d.value > 0);

  const eventBarData = [
    { name: "Total", Total: e.total ?? 0, Upcoming: e.upcoming ?? 0, Past: e.past ?? 0, Featured: e.featured ?? 0 },
  ];

  const payBarData = [
    { name: "Payments", Total: pay.total ?? 0, Successful: pay.byStatus?.successful ?? 0, Failed: pay.byStatus?.failed ?? 0 },
  ];

  const participationBarData = [
    { name: "Pending", value: pa.byStatus?.pending ?? 0, color: "#F59E0B" },
    { name: "Approved", value: pa.byStatus?.approved ?? 0, color: "#10B981" },
    { name: "Rejected", value: pa.byStatus?.rejected ?? 0, color: "#EF4444" },
    { name: "Banned", value: pa.byStatus?.banned ?? 0, color: "#9CA3AF" },
  ].filter((d) => d.value > 0);

  const invBarData = [
    { name: "Pending", value: inv.byStatus?.pending ?? 0, color: "#A855F7" },
    { name: "Accepted", value: inv.byStatus?.accepted ?? 0, color: "#10B981" },
    { name: "Declined", value: inv.byStatus?.declined ?? 0, color: "#EF4444" },
  ].filter((d) => d.value > 0);

  const ticketPie = [
    { name: "Valid", value: ti.byStatus?.valid ?? 0, color: "#10B981" },
    { name: "Used", value: ti.byStatus?.used ?? 0, color: "#6366F1" },
    { name: "Canceled", value: ti.byStatus?.canceled ?? 0, color: "#9CA3AF" },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl shadow-none">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6">Super Admin — Platform Overview</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* Row 1: User role pie / User status pie / Event visibility pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <ChartBox title="Users by Role" bg="bg-blue-50 border-blue-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={userRolePie} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={3} dataKey="value">
                    {userRolePie.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={userRolePie.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>

          <ChartBox title="Users by Status" bg="bg-emerald-50 border-emerald-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={userStatusPie} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={3} dataKey="value">
                    {userStatusPie.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={userStatusPie.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>

          <ChartBox title="Event Visibility" bg="bg-indigo-50 border-indigo-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={eventVisData} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={3} dataKey="value">
                    {eventVisData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={eventVisData.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>
        </div>

        {/* Row 2: Payments bar / Participation bar / Invitations bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <ChartBox title="Payments" bg="bg-amber-50 border-amber-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Total", value: pay.total ?? 0, fill: "#F59E0B" },
                  { name: "Successful", value: pay.byStatus?.successful ?? 0, fill: "#10B981" },
                  { name: "Failed", value: pay.byStatus?.failed ?? 0, fill: "#EF4444" },
                  { name: "Refunded", value: pay.byStatus?.refunded ?? 0, fill: "#9CA3AF" },
                ]} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {["#F59E0B", "#10B981", "#EF4444", "#9CA3AF"].map((c, i) => <Cell key={i} fill={c} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>

          <ChartBox title="Participations" bg="bg-orange-50 border-orange-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participationBarData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FFEDD5" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {participationBarData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>

          <ChartBox title="Invitations" bg="bg-purple-50 border-purple-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={invBarData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FE" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {invBarData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>
        </div>

        {/* Row 3: Ticket pie / Reviews radial / Event types bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <ChartBox title="Tickets" bg="bg-teal-50 border-teal-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ticketPie} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={3} dataKey="value">
                    {ticketPie.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={ticketPie.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>

          <ChartBox title="Reviews" bg="bg-yellow-50 border-yellow-200">
            <div className="flex items-center gap-8 h-[190px]">
              <div style={{ width: 130, height: 130 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%"
                    data={[{ name: "Reviews", value: rev.total ?? 0, fill: "#EAB308" }]}
                    startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={8} />
                    <Tooltip content={<ChartTip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-800">{rev.total ?? 0}</p>
                <p className="text-sm text-yellow-600 mt-1">Total Reviews</p>
                <p className="text-2xl font-bold text-yellow-700 mt-3">{Number(rev.averageRating ?? 0).toFixed(1)}</p>
                <p className="text-sm text-yellow-500">Avg Rating</p>
              </div>
            </div>
          </ChartBox>

          <ChartBox title="Event Types" bg="bg-indigo-50 border-indigo-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Online", value: e.byType?.online ?? 0, fill: "#6366F1" },
                  { name: "Offline", value: e.byType?.offline ?? 0, fill: "#A5B4FC" },
                  { name: "Featured", value: e.featured ?? 0, fill: "#F59E0B" },
                  { name: "Upcoming", value: e.upcoming ?? 0, fill: "#10B981" },
                  { name: "Past", value: e.past ?? 0, fill: "#9CA3AF" },
                ]} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {["#6366F1", "#A5B4FC", "#F59E0B", "#10B981", "#9CA3AF"].map((c, i) => <Cell key={i} fill={c} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>
        </div>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. ADMIN STATS CARD
// ─────────────────────────────────────────────────────────────────────────────
// Matches getAdminStats():
//   users.{ total, active, suspended, organizers }
//   events.{ total, upcoming, past, featured }
//   participations.{ total, approved }
//   invitations.{ total, accepted }
//   payments.{ total, successful, failed, totalRevenue }
//   tickets.{ total, used }
//   reviews.{ total, averageRating }

export const AdminStatsCard = ({ data }: { data: any }) => {
  const u = data?.users ?? {};
  const e = data?.events ?? {};
  const pa = data?.participations ?? {};
  const inv = data?.invitations ?? {};
  const pay = data?.payments ?? {};
  const ti = data?.tickets ?? {};
  const rev = data?.reviews ?? {};

  const statCards = [
    { title: "Total Users", value: u.total ?? 0, icon: <Users className="text-blue-700 w-5 h-5" />, bg: "bg-blue-50 border-blue-200" },
    { title: "Active Users", value: u.active ?? 0, icon: <UserCheck className="text-emerald-700 w-5 h-5" />, bg: "bg-emerald-50 border-emerald-200" },
    { title: "Suspended Users", value: u.suspended ?? 0, icon: <UserX className="text-red-700 w-5 h-5" />, bg: "bg-red-50 border-red-200" },
    { title: "Organizers", value: u.organizers ?? 0, icon: <Users className="text-purple-700 w-5 h-5" />, bg: "bg-purple-50 border-purple-200" },
    { title: "Total Events", value: e.total ?? 0, icon: <Calendar className="text-indigo-700 w-5 h-5" />, bg: "bg-indigo-50 border-indigo-200" },
    { title: "Upcoming Events", value: e.upcoming ?? 0, icon: <TrendingUp className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Past Events", value: e.past ?? 0, icon: <Calendar className="text-slate-600 w-5 h-5" />, bg: "bg-slate-50 border-slate-200" },
    { title: "Featured Events", value: e.featured ?? 0, icon: <Star className="text-amber-600 w-5 h-5" />, bg: "bg-amber-50 border-amber-200" },
    { title: "Total Payments", value: pay.total ?? 0, icon: <CreditCard className="text-amber-700 w-5 h-5" />, bg: "bg-amber-50 border-amber-200" },
    { title: "Successful Pays", value: pay.successful ?? 0, icon: <CreditCard className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Total Revenue", value: `$${fmt(pay.totalRevenue ?? 0)}`, icon: <CreditCard className="text-blue-700 w-5 h-5" />, bg: "bg-blue-50 border-blue-200" },
    { title: "Total Reviews", value: rev.total ?? 0, icon: <Star className="text-yellow-700 w-5 h-5" />, bg: "bg-yellow-50 border-yellow-200" },
  ];

  const userStatusPie = [
    { name: "Active", value: u.active ?? 0, color: "#10B981" },
    { name: "Suspended", value: u.suspended ?? 0, color: "#EF4444" },
  ].filter((d) => d.value > 0);

  const eventBarData = [
    { name: "Upcoming", value: e.upcoming ?? 0 },
    { name: "Past", value: e.past ?? 0 },
    { name: "Featured", value: e.featured ?? 0 },
  ];

  const payBarData = [
    { name: "Total", value: pay.total ?? 0, color: "#F59E0B" },
    { name: "Successful", value: pay.successful ?? 0, color: "#10B981" },
    { name: "Failed", value: pay.failed ?? 0, color: "#EF4444" },
  ].filter((d) => d.value > 0);

  const participationData = [
    { name: "Total", value: pa.total ?? 0, color: "#F97316" },
    { name: "Approved", value: pa.approved ?? 0, color: "#10B981" },
  ].filter((d) => d.value > 0);

  const invData = [
    { name: "Total", value: inv.total ?? 0, color: "#A855F7" },
    { name: "Accepted", value: inv.accepted ?? 0, color: "#10B981" },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl shadow-none">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6">Admin — Dashboard Stats</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <ChartBox title="User Status" bg="bg-blue-50 border-blue-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={userStatusPie} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={3} dataKey="value">
                    {userStatusPie.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={userStatusPie.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>

          <ChartBox title="Events Breakdown" bg="bg-indigo-50 border-indigo-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventBarData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {["#10B981", "#9CA3AF", "#F59E0B"].map((c, i) => <Cell key={i} fill={c} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>

          <ChartBox title="Payments" bg="bg-amber-50 border-amber-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payBarData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {payBarData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <ChartBox title="Participation & Invitations" bg="bg-orange-50 border-orange-200">
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Particip. Total", value: pa.total ?? 0 },
                  { name: "Particip. Approved", value: pa.approved ?? 0 },
                  { name: "Invites Total", value: inv.total ?? 0 },
                  { name: "Invites Accepted", value: inv.accepted ?? 0 },
                ]} margin={{ top: 0, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FFEDD5" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {["#F97316", "#10B981", "#A855F7", "#34D399"].map((c, i) => <Cell key={i} fill={c} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>

          <ChartBox title="Reviews" bg="bg-yellow-50 border-yellow-200">
            <div className="flex items-center gap-8 h-[180px]">
              <div style={{ width: 120, height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%"
                    data={[{ name: "Reviews", value: rev.total ?? 0, fill: "#EAB308" }]}
                    startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={8} />
                    <Tooltip content={<ChartTip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-800">{rev.total ?? 0}</p>
                <p className="text-sm text-yellow-600 mt-1">Total Reviews</p>
                <p className="text-2xl font-bold text-yellow-700 mt-3">{Number(rev.averageRating ?? 0).toFixed(1)}</p>
                <p className="text-xs text-yellow-500">Avg Rating ⭐</p>
              </div>
            </div>
          </ChartBox>
        </div>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. ORGANIZER STATS CARD
// ─────────────────────────────────────────────────────────────────────────────
// Matches getOrganizerStats():
//   events.{ total, upcoming, past, featured, byVisibility.{ public, private } }
//   participations.{ total, byStatus.{ pending, approved } }
//   invitations.{ total, accepted }
//   revenue.{ totalPayments, successfulPayments, totalRevenue }
//   tickets.{ total, valid, used }
//   reviews.{ total, averageRating }

export const OrganizerStatsCard = ({ data }: { data: any }) => {
  const e = data?.events ?? {};
  const pa = data?.participations ?? {};
  const inv = data?.invitations ?? {};
  const rev = data?.revenue ?? {};
  const ti = data?.tickets ?? {};
  const reviews = data?.reviews ?? {};

  const statCards = [
    { title: "My Events", value: e.total ?? 0, icon: <Calendar className="text-indigo-700 w-5 h-5" />, bg: "bg-indigo-50 border-indigo-200" },
    { title: "Upcoming Events", value: e.upcoming ?? 0, icon: <TrendingUp className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Past Events", value: e.past ?? 0, icon: <Calendar className="text-slate-600 w-5 h-5" />, bg: "bg-slate-50 border-slate-200" },
    { title: "Featured Events", value: e.featured ?? 0, icon: <Star className="text-amber-600 w-5 h-5" />, bg: "bg-amber-50 border-amber-200" },
    { title: "Public Events", value: e.byVisibility?.public ?? 0, icon: <Globe className="text-blue-700 w-5 h-5" />, bg: "bg-blue-50 border-blue-200" },
    { title: "Private Events", value: e.byVisibility?.private ?? 0, icon: <Lock className="text-purple-700 w-5 h-5" />, bg: "bg-purple-50 border-purple-200" },
    { title: "Total Participants", value: pa.total ?? 0, icon: <ClipboardList className="text-orange-700 w-5 h-5" />, bg: "bg-orange-50 border-orange-200" },
    { title: "Approved", value: pa.byStatus?.approved ?? 0, icon: <UserCheck className="text-emerald-700 w-5 h-5" />, bg: "bg-emerald-50 border-emerald-200" },
    { title: "Pending", value: pa.byStatus?.pending ?? 0, icon: <ClipboardList className="text-yellow-700 w-5 h-5" />, bg: "bg-yellow-50 border-yellow-200" },
    { title: "Invites Sent", value: inv.total ?? 0, icon: <Mail className="text-purple-700 w-5 h-5" />, bg: "bg-purple-50 border-purple-200" },
    { title: "Invites Accepted", value: inv.accepted ?? 0, icon: <Mail className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Revenue", value: `$${fmt(rev.totalRevenue ?? 0)}`, icon: <CreditCard className="text-blue-700 w-5 h-5" />, bg: "bg-blue-50 border-blue-200" },
    { title: "Successful Pays", value: rev.successfulPayments ?? 0, icon: <CreditCard className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Total Tickets", value: ti.total ?? 0, icon: <Ticket className="text-teal-700 w-5 h-5" />, bg: "bg-teal-50 border-teal-200" },
    { title: "Valid Tickets", value: ti.valid ?? 0, icon: <Ticket className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Used Tickets", value: ti.used ?? 0, icon: <Ticket className="text-slate-600 w-5 h-5" />, bg: "bg-slate-50 border-slate-200" },
  ];

  const visibilityPie = [
    { name: "Public", value: e.byVisibility?.public ?? 0, color: "#6366F1" },
    { name: "Private", value: e.byVisibility?.private ?? 0, color: "#A855F7" },
  ].filter((d) => d.value > 0);

  const eventTimelineData = [
    { name: "Upcoming", value: e.upcoming ?? 0, color: "#10B981" },
    { name: "Past", value: e.past ?? 0, color: "#9CA3AF" },
    { name: "Featured", value: e.featured ?? 0, color: "#F59E0B" },
  ].filter((d) => d.value > 0);

  const participationData = [
    { name: "Total", value: pa.total ?? 0, color: "#F97316" },
    { name: "Approved", value: pa.byStatus?.approved ?? 0, color: "#10B981" },
    { name: "Pending", value: pa.byStatus?.pending ?? 0, color: "#F59E0B" },
  ].filter((d) => d.value > 0);

  const invData = [
    { name: "Sent", value: inv.total ?? 0, color: "#A855F7" },
    { name: "Accepted", value: inv.accepted ?? 0, color: "#10B981" },
  ].filter((d) => d.value > 0);

  const ticketData = [
    { name: "Valid", value: ti.valid ?? 0, color: "#10B981" },
    { name: "Used", value: ti.used ?? 0, color: "#6366F1" },
  ].filter((d) => d.value > 0);

  const payData = [
    { name: "Total Pays", value: rev.totalPayments ?? 0, color: "#F59E0B" },
    { name: "Successful", value: rev.successfulPayments ?? 0, color: "#10B981" },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl shadow-none">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6">Organizer — Dashboard Stats</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* Row 1: Event visibility / Event timeline / Participations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <ChartBox title="Event Visibility" bg="bg-indigo-50 border-indigo-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={visibilityPie} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={4} dataKey="value">
                    {visibilityPie.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={visibilityPie.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>

          <ChartBox title="Events Timeline" bg="bg-green-50 border-green-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventTimelineData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1FAE5" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {eventTimelineData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>

          <ChartBox title="Participations" bg="bg-orange-50 border-orange-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participationData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FFEDD5" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {participationData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>
        </div>

        {/* Row 2: Invitations / Tickets / Revenue & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <ChartBox title="Invitations" bg="bg-purple-50 border-purple-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={invData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDE9FE" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {invData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartBox>

          <ChartBox title="Tickets" bg="bg-teal-50 border-teal-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ticketData} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={4} dataKey="value">
                    {ticketData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={ticketData.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>

          <ChartBox title="Revenue & Reviews" bg="bg-amber-50 border-amber-200">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Payments</p>
                <div style={{ height: 90 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={payData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<ChartTip />} />
                      <Bar dataKey="value" name="Count" radius={[4, 4, 0, 0]}>
                        {payData.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2 border-t border-amber-200">
                <div>
                  <p className="text-xl font-bold text-amber-800">{reviews.total ?? 0}</p>
                  <p className="text-xs text-amber-600">Reviews</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-amber-700">{Number(reviews.averageRating ?? 0).toFixed(1)} ⭐</p>
                  <p className="text-xs text-amber-500">Avg Rating</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-blue-700">${fmt(rev.totalRevenue ?? 0)}</p>
                  <p className="text-xs text-blue-500">Revenue</p>
                </div>
              </div>
            </div>
          </ChartBox>
        </div>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. USER STATS CARD
// ─────────────────────────────────────────────────────────────────────────────
// Matches getUserStats():
//   participations.{ total, byStatus.{ pending, approved, rejected } }
//   invitations.{ total, byStatus.{ pending, accepted } }
//   payments.{ total, successful, totalSpent }
//   tickets.{ total, valid, used }
//   reviews.{ total }
//   notifications.{ unread }

export const UserStatsCard = ({ data }: { data: any }) => {
  const pa = data?.participations ?? {};
  const inv = data?.invitations ?? {};
  const pay = data?.payments ?? {};
  const ti = data?.tickets ?? {};
  const rev = data?.reviews ?? {};
  const not = data?.notifications ?? {};

  const statCards = [
    { title: "Events Joined", value: pa.total ?? 0, icon: <ClipboardList className="text-orange-700 w-5 h-5" />, bg: "bg-orange-50 border-orange-200" },
    { title: "Approved", value: pa.byStatus?.approved ?? 0, icon: <UserCheck className="text-emerald-700 w-5 h-5" />, bg: "bg-emerald-50 border-emerald-200" },
    { title: "Pending", value: pa.byStatus?.pending ?? 0, icon: <ClipboardList className="text-yellow-700 w-5 h-5" />, bg: "bg-yellow-50 border-yellow-200" },
    { title: "Rejected", value: pa.byStatus?.rejected ?? 0, icon: <UserX className="text-red-700 w-5 h-5" />, bg: "bg-red-50 border-red-200" },
    { title: "Invites Received", value: inv.total ?? 0, icon: <Mail className="text-purple-700 w-5 h-5" />, bg: "bg-purple-50 border-purple-200" },
    { title: "Invites Accepted", value: inv.byStatus?.accepted ?? 0, icon: <Mail className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Invites Pending", value: inv.byStatus?.pending ?? 0, icon: <Mail className="text-yellow-700 w-5 h-5" />, bg: "bg-yellow-50 border-yellow-200" },
    { title: "Total Payments", value: pay.total ?? 0, icon: <CreditCard className="text-amber-700 w-5 h-5" />, bg: "bg-amber-50 border-amber-200" },
    { title: "Successful Pays", value: pay.successful ?? 0, icon: <CreditCard className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Total Spent", value: `$${fmt(pay.totalSpent ?? 0)}`, icon: <CreditCard className="text-blue-700 w-5 h-5" />, bg: "bg-blue-50 border-blue-200" },
    { title: "My Tickets", value: ti.total ?? 0, icon: <Ticket className="text-teal-700 w-5 h-5" />, bg: "bg-teal-50 border-teal-200" },
    { title: "Valid Tickets", value: ti.valid ?? 0, icon: <Ticket className="text-green-700 w-5 h-5" />, bg: "bg-green-50 border-green-200" },
    { title: "Used Tickets", value: ti.used ?? 0, icon: <Ticket className="text-slate-600 w-5 h-5" />, bg: "bg-slate-50 border-slate-200" },
    { title: "My Reviews", value: rev.total ?? 0, icon: <Star className="text-yellow-700 w-5 h-5" />, bg: "bg-yellow-50 border-yellow-200" },
    { title: "Unread Notifs", value: not.unread ?? 0, icon: <Bell className="text-orange-600 w-5 h-5" />, bg: "bg-orange-50 border-orange-200" },
  ];

  const participationPie = [
    { name: "Approved", value: pa.byStatus?.approved ?? 0, color: "#10B981" },
    { name: "Pending", value: pa.byStatus?.pending ?? 0, color: "#F59E0B" },
    { name: "Rejected", value: pa.byStatus?.rejected ?? 0, color: "#EF4444" },
  ].filter((d) => d.value > 0);

  const invitePie = [
    { name: "Accepted", value: inv.byStatus?.accepted ?? 0, color: "#10B981" },
    { name: "Pending", value: inv.byStatus?.pending ?? 0, color: "#F59E0B" },
  ].filter((d) => d.value > 0);

  const ticketPie = [
    { name: "Valid", value: ti.valid ?? 0, color: "#10B981" },
    { name: "Used", value: ti.used ?? 0, color: "#6366F1" },
  ].filter((d) => d.value > 0);

  const payBarData = [
    { name: "Total", value: pay.total ?? 0, color: "#F59E0B" },
    { name: "Successful", value: pay.successful ?? 0, color: "#10B981" },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl shadow-none">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6">My Dashboard Stats</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* Row 1: Participation pie / Invite pie / Ticket pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <ChartBox title="My Participations" bg="bg-orange-50 border-orange-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={participationPie} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={3} dataKey="value">
                    {participationPie.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={participationPie.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>

          <ChartBox title="My Invitations" bg="bg-purple-50 border-purple-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={invitePie} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={3} dataKey="value">
                    {invitePie.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={invitePie.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>

          <ChartBox title="My Tickets" bg="bg-teal-50 border-teal-200">
            <div style={{ height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ticketPie} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={3} dataKey="value">
                    {ticketPie.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={ticketPie.map(d => ({ label: d.name, color: d.color, value: d.value }))} />
          </ChartBox>
        </div>

        {/* Row 2: Payments bar / Reviews + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <ChartBox title="Payments" bg="bg-amber-50 border-amber-200">
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payBarData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {payBarData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {(pay.totalSpent ?? 0) > 0 && (
              <p className="text-center text-sm text-amber-700 font-semibold mt-2">
                Total Spent: ${fmt(pay.totalSpent)}
              </p>
            )}
          </ChartBox>

          <ChartBox title="Reviews & Notifications" bg="bg-yellow-50 border-yellow-200">
            <div className="flex items-center gap-8 h-[180px]">
              <div style={{ width: 120, height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%"
                    data={[{ name: "Reviews", value: rev.total ?? 0, fill: "#EAB308" }]}
                    startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={8} />
                    <Tooltip content={<ChartTip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-yellow-800">{rev.total ?? 0}</p>
                  <p className="text-sm text-yellow-600">Reviews Written</p>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="text-orange-500 w-4 h-4" />
                  <p className="text-xl font-bold text-orange-700">{not.unread ?? 0}</p>
                  <p className="text-sm text-orange-500">Unread</p>
                </div>
              </div>
            </div>
          </ChartBox>
        </div>
      </Card>
    </div>
  );
};