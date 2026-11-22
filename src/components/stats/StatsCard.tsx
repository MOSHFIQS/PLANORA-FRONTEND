"use client";

import React from "react";
import {
  Users, UserCheck, UserX, Calendar, Mail,
  ClipboardList, CreditCard, Star, TrendingUp,
  ShieldCheck, Ticket, Bell, Globe, Lock,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar,
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// Design System: 3-Color Strict Palette
// 1. Indigo (#4F46E5) - Primary Brand
// 2. Slate (#64748B / #0F172A) - Neutral Structure & Typography
// 3. Emerald (#10B981) - Accent / Success / Approved
// (Rose #E11D48 used strictly for failed/suspended/rejected states)
// ─────────────────────────────────────────────────────────────────────────────

const COLOR_PRIMARY = "#4F46E5";
const COLOR_ACCENT = "#10B981";
const COLOR_SLATE = "#64748B";
const COLOR_MUTED = "#94A3B8";
const COLOR_ROSE = "#E11D48";
const COLOR_LIGHT_INDIGO = "#818CF8";

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
    <div className="bg-white border border-slate-200 rounded-md shadow-xs px-3 py-2 text-xs">
      {label && <p className="text-slate-500 mb-1 font-medium">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-semibold text-slate-800">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

const SecTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold text-slate-700 mb-3">{children}</h3>
);

const StatCard = ({
  title, value, icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bg?: string;
}) => (
  <div className="flex items-center gap-3 p-4 rounded-md border border-slate-200/90 bg-white hover:border-indigo-200/80 hover:shadow-2xs transition-all duration-200">
    <div className="w-10 h-10 flex items-center justify-center bg-indigo-50/80 text-indigo-600 rounded-md border border-indigo-100/70 shadow-2xs flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-slate-500 font-medium truncate">{title}</p>
      <p className="text-xl font-bold text-slate-900 leading-tight">{fmt(value)}</p>
    </div>
  </div>
);

const ChartBox = ({
  title, children,
}: {
  title: string;
  bg?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-slate-50/50 rounded-md border border-slate-200/80 p-4">
    <SecTitle>{title}</SecTitle>
    {children}
  </div>
);

const Legend = ({ items }: { items: { label: string; color: string; value?: number }[] }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
    {items.map((d) => (
      <div key={d.label} className="flex items-center gap-1.5 text-xs text-slate-600">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
        {d.label}{d.value !== undefined && <>: <span className="font-bold text-slate-800 ml-0.5">{d.value}</span></>}
      </div>
    ))}
  </div>
);

const DonutBox = ({
  title,
  data,
  height = 190,
  innerRadius = 52,
  outerRadius = 76,
}: {
  title: string;
  bg?: string;
  data: { name: string; value: number; color: string }[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}) => (
  <ChartBox title={title}>
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={innerRadius} outerRadius={outerRadius} paddingAngle={3} dataKey="value">
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <Tooltip content={<ChartTip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <Legend items={data.map((d) => ({ label: d.name, color: d.color, value: d.value }))} />
  </ChartBox>
);

const BarBox = ({
  title,
  gridStroke = "#E2E8F0",
  data,
  height = 190,
  fontSize = 10,
  footer,
}: {
  title: string;
  bg?: string;
  gridStroke?: string;
  data: { name: string; value: number; fill?: string; color?: string }[];
  height?: number;
  fontSize?: number;
  footer?: React.ReactNode;
}) => (
  <ChartBox title={title}>
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis dataKey="name" tick={{ fontSize, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTip />} />
          <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.fill || d.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    {footer}
  </ChartBox>
);

// ─────────────────────────────────────────────────────────────────────────────
// 1. SUPER ADMIN STATS CARD
// ─────────────────────────────────────────────────────────────────────────────
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
    { title: "Total Users", value: u.total ?? 0, icon: <Users className="w-5 h-5" /> },
    { title: "Active Users", value: u.byStatus?.active ?? 0, icon: <UserCheck className="w-5 h-5 text-emerald-600" /> },
    { title: "Suspended Users", value: u.byStatus?.suspended ?? 0, icon: <UserX className="w-5 h-5 text-rose-600" /> },
    { title: "Admins", value: u.byRole?.admins ?? 0, icon: <ShieldCheck className="w-5 h-5" /> },
    { title: "Organizers", value: u.byRole?.organizers ?? 0, icon: <Users className="w-5 h-5" /> },
    { title: "Total Events", value: e.total ?? 0, icon: <Calendar className="w-5 h-5" /> },
    { title: "Upcoming Events", value: e.upcoming ?? 0, icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
    { title: "Total Revenue", value: `৳${fmt(pay.totalRevenue ?? 0)}`, icon: <CreditCard className="w-5 h-5 text-emerald-600" /> },
    { title: "Total Payments", value: pay.total ?? 0, icon: <CreditCard className="w-5 h-5" /> },
    { title: "Total Tickets", value: ti.total ?? 0, icon: <Ticket className="w-5 h-5" /> },
    { title: "Total Reviews", value: rev.total ?? 0, icon: <Star className="w-5 h-5 text-indigo-600" /> },
    { title: "Avg Rating", value: Number(rev.averageRating ?? 0).toFixed(1), icon: <Star className="w-5 h-5 text-indigo-600" /> },
    { title: "Notifications", value: not.total ?? 0, icon: <Bell className="w-5 h-5" /> },
    { title: "Unread Notifs", value: not.unread ?? 0, icon: <Bell className="w-5 h-5 text-indigo-600" /> },
    { title: "Audit Logs", value: aud.total ?? 0, icon: <Activity className="w-5 h-5" /> },
    { title: "Participations", value: pa.total ?? 0, icon: <ClipboardList className="w-5 h-5" /> },
  ];

  const userRolePie = [
    { name: "Users", value: u.byRole?.users ?? 0, color: COLOR_PRIMARY },
    { name: "Organizers", value: u.byRole?.organizers ?? 0, color: COLOR_LIGHT_INDIGO },
    { name: "Admins", value: u.byRole?.admins ?? 0, color: COLOR_SLATE },
  ].filter((d) => d.value > 0);

  const userStatusPie = [
    { name: "Active", value: u.byStatus?.active ?? 0, color: COLOR_ACCENT },
    { name: "Suspended", value: u.byStatus?.suspended ?? 0, color: COLOR_ROSE },
    { name: "Deleted", value: u.byStatus?.deleted ?? 0, color: COLOR_MUTED },
  ].filter((d) => d.value > 0);

  const eventVisData = [
    { name: "Public", value: e.byVisibility?.public ?? 0, color: COLOR_PRIMARY },
    { name: "Private", value: e.byVisibility?.private ?? 0, color: COLOR_SLATE },
  ].filter((d) => d.value > 0);

  const payBarData = [
    { name: "Total", value: pay.total ?? 0, fill: COLOR_PRIMARY },
    { name: "Successful", value: pay.byStatus?.successful ?? 0, fill: COLOR_ACCENT },
    { name: "Failed", value: pay.byStatus?.failed ?? 0, fill: COLOR_ROSE },
    { name: "Refunded", value: pay.byStatus?.refunded ?? 0, fill: COLOR_MUTED },
  ];

  const participationBarData = [
    { name: "Approved", value: pa.byStatus?.approved ?? 0, fill: COLOR_ACCENT },
    { name: "Pending", value: pa.byStatus?.pending ?? 0, fill: COLOR_PRIMARY },
    { name: "Rejected", value: pa.byStatus?.rejected ?? 0, fill: COLOR_ROSE },
    { name: "Banned", value: pa.byStatus?.banned ?? 0, fill: COLOR_MUTED },
  ].filter((d) => d.value > 0);

  const invBarData = [
    { name: "Accepted", value: inv.byStatus?.accepted ?? 0, fill: COLOR_ACCENT },
    { name: "Pending", value: inv.byStatus?.pending ?? 0, fill: COLOR_PRIMARY },
    { name: "Declined", value: inv.byStatus?.declined ?? 0, fill: COLOR_ROSE },
  ].filter((d) => d.value > 0);

  const ticketPie = [
    { name: "Valid", value: ti.byStatus?.valid ?? 0, color: COLOR_ACCENT },
    { name: "Used", value: ti.byStatus?.used ?? 0, color: COLOR_PRIMARY },
    { name: "Canceled", value: ti.byStatus?.canceled ?? 0, color: COLOR_MUTED },
  ].filter((d) => d.value > 0);

  const eventTypesBar = [
    { name: "Online", value: e.byType?.online ?? 0, fill: COLOR_PRIMARY },
    { name: "Offline", value: e.byType?.offline ?? 0, fill: COLOR_LIGHT_INDIGO },
    { name: "Featured", value: e.featured ?? 0, fill: COLOR_ACCENT },
    { name: "Upcoming", value: e.upcoming ?? 0, fill: COLOR_SLATE },
    { name: "Past", value: e.past ?? 0, fill: COLOR_MUTED },
  ];

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-slate-200 p-4 sm:p-6 bg-white rounded-md shadow-2xs">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-6">Super Admin — Platform Overview</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* Row 1: Pies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <DonutBox title="Users by Role" data={userRolePie} />
          <DonutBox title="Users by Status" data={userStatusPie} />
          <DonutBox title="Event Visibility" data={eventVisData} />
        </div>

        {/* Row 2: Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <BarBox title="Payments" data={payBarData} />
          <BarBox title="Participations by Status" data={participationBarData} />
          <BarBox title="Invitations by Status" data={invBarData} />
        </div>

        {/* Row 3: Tickets / Reviews / Event Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <DonutBox title="Tickets by Status" data={ticketPie} />

          <ChartBox title="Platform Reviews">
            <div className="flex items-center gap-6 h-[190px]">
              <div style={{ width: 130, height: 130 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%"
                    data={[{ name: "Rating", value: Number(rev.averageRating ?? 0) * 20, fill: COLOR_PRIMARY }]}
                    startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={8} />
                    <Tooltip content={<ChartTip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{rev.total ?? 0}</p>
                <p className="text-xs text-slate-500 mt-1">Total Reviews</p>
                <p className="text-2xl font-bold text-indigo-600 mt-3">{Number(rev.averageRating ?? 0).toFixed(1)} / 5.0</p>
                <p className="text-xs text-slate-400">Average Rating</p>
              </div>
            </div>
          </ChartBox>

          <BarBox title="Event Types" data={eventTypesBar} />
        </div>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. ADMIN STATS CARD
// ─────────────────────────────────────────────────────────────────────────────
export const AdminStatsCard = ({ data }: { data: any }) => {
  const u = data?.users ?? {};
  const e = data?.events ?? {};
  const pa = data?.participations ?? {};
  const inv = data?.invitations ?? {};
  const pay = data?.payments ?? {};
  const rev = data?.reviews ?? {};

  const statCards = [
    { title: "Total Users", value: u.total ?? 0, icon: <Users className="w-5 h-5" /> },
    { title: "Active Users", value: u.active ?? 0, icon: <UserCheck className="w-5 h-5 text-emerald-600" /> },
    { title: "Suspended Users", value: u.suspended ?? 0, icon: <UserX className="w-5 h-5 text-rose-600" /> },
    { title: "Organizers", value: u.organizers ?? 0, icon: <Users className="w-5 h-5" /> },
    { title: "Total Events", value: e.total ?? 0, icon: <Calendar className="w-5 h-5" /> },
    { title: "Upcoming Events", value: e.upcoming ?? 0, icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
    { title: "Past Events", value: e.past ?? 0, icon: <Calendar className="w-5 h-5 text-slate-400" /> },
    { title: "Featured Events", value: e.featured ?? 0, icon: <Star className="w-5 h-5 text-indigo-600" /> },
    { title: "Total Payments", value: pay.total ?? 0, icon: <CreditCard className="w-5 h-5" /> },
    { title: "Successful Pays", value: pay.successful ?? 0, icon: <CreditCard className="w-5 h-5 text-emerald-600" /> },
    { title: "Total Revenue", value: `৳${fmt(pay.totalRevenue ?? 0)}`, icon: <CreditCard className="w-5 h-5 text-emerald-600" /> },
    { title: "Total Reviews", value: rev.total ?? 0, icon: <Star className="w-5 h-5 text-indigo-600" /> },
  ];

  const userStatusPie = [
    { name: "Active", value: u.active ?? 0, color: COLOR_ACCENT },
    { name: "Suspended", value: u.suspended ?? 0, color: COLOR_ROSE },
  ].filter((d) => d.value > 0);

  const eventBarData = [
    { name: "Upcoming", value: e.upcoming ?? 0, fill: COLOR_ACCENT },
    { name: "Featured", value: e.featured ?? 0, fill: COLOR_PRIMARY },
    { name: "Past", value: e.past ?? 0, fill: COLOR_MUTED },
  ];

  const payBarData = [
    { name: "Total", value: pay.total ?? 0, fill: COLOR_PRIMARY },
    { name: "Successful", value: pay.successful ?? 0, fill: COLOR_ACCENT },
    { name: "Failed", value: pay.failed ?? 0, fill: COLOR_ROSE },
  ].filter((d) => d.value > 0);

  const partInvData = [
    { name: "Particip. Total", value: pa.total ?? 0, fill: COLOR_PRIMARY },
    { name: "Approved", value: pa.approved ?? 0, fill: COLOR_ACCENT },
    { name: "Invites Total", value: inv.total ?? 0, fill: COLOR_SLATE },
    { name: "Invites Accepted", value: inv.accepted ?? 0, fill: COLOR_LIGHT_INDIGO },
  ];

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-slate-200 p-4 sm:p-6 bg-white rounded-md shadow-2xs">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-6">Admin — Dashboard Stats</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <DonutBox title="User Status" data={userStatusPie} />
          <BarBox title="Events Breakdown" data={eventBarData} fontSize={11} />
          <BarBox title="Payments" data={payBarData} fontSize={11} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <BarBox title="Participation & Invitations" data={partInvData} height={180} fontSize={9} />

          <ChartBox title="Reviews">
            <div className="flex items-center gap-8 h-[180px]">
              <div style={{ width: 120, height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%"
                    data={[{ name: "Reviews", value: rev.total ?? 0, fill: COLOR_PRIMARY }]}
                    startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={8} />
                    <Tooltip content={<ChartTip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{rev.total ?? 0}</p>
                <p className="text-xs text-slate-500 mt-1">Total Reviews</p>
                <p className="text-2xl font-bold text-indigo-600 mt-3">{Number(rev.averageRating ?? 0).toFixed(1)} / 5.0</p>
                <p className="text-xs text-slate-400">Average Rating</p>
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
export const OrganizerStatsCard = ({ data }: { data: any }) => {
  const e = data?.events ?? {};
  const pa = data?.participations ?? {};
  const inv = data?.invitations ?? {};
  const rev = data?.revenue ?? {};
  const ti = data?.tickets ?? {};

  const statCards = [
    { title: "My Events", value: e.total ?? 0, icon: <Calendar className="w-5 h-5" /> },
    { title: "Upcoming Events", value: e.upcoming ?? 0, icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
    { title: "Past Events", value: e.past ?? 0, icon: <Calendar className="w-5 h-5 text-slate-400" /> },
    { title: "Featured Events", value: e.featured ?? 0, icon: <Star className="w-5 h-5 text-indigo-600" /> },
    { title: "Public Events", value: e.byVisibility?.public ?? 0, icon: <Globe className="w-5 h-5" /> },
    { title: "Private Events", value: e.byVisibility?.private ?? 0, icon: <Lock className="w-5 h-5 text-slate-500" /> },
    { title: "Total Participants", value: pa.total ?? 0, icon: <ClipboardList className="w-5 h-5" /> },
    { title: "Approved", value: pa.byStatus?.approved ?? 0, icon: <UserCheck className="w-5 h-5 text-emerald-600" /> },
    { title: "Pending", value: pa.byStatus?.pending ?? 0, icon: <ClipboardList className="w-5 h-5 text-indigo-600" /> },
    { title: "Invites Sent", value: inv.total ?? 0, icon: <Mail className="w-5 h-5" /> },
    { title: "Invites Accepted", value: inv.accepted ?? 0, icon: <Mail className="w-5 h-5 text-emerald-600" /> },
    { title: "Revenue", value: `৳${fmt(rev.totalRevenue ?? 0)}`, icon: <CreditCard className="w-5 h-5 text-emerald-600" /> },
    { title: "Successful Pays", value: rev.successfulPayments ?? 0, icon: <CreditCard className="w-5 h-5 text-emerald-600" /> },
    { title: "Total Tickets", value: ti.total ?? 0, icon: <Ticket className="w-5 h-5" /> },
    { title: "Valid Tickets", value: ti.valid ?? 0, icon: <Ticket className="w-5 h-5 text-emerald-600" /> },
    { title: "Used Tickets", value: ti.used ?? 0, icon: <Ticket className="w-5 h-5 text-slate-400" /> },
  ];

  const visibilityPie = [
    { name: "Public", value: e.byVisibility?.public ?? 0, color: COLOR_PRIMARY },
    { name: "Private", value: e.byVisibility?.private ?? 0, color: COLOR_SLATE },
  ].filter((d) => d.value > 0);

  const eventTimelineData = [
    { name: "Upcoming", value: e.upcoming ?? 0, fill: COLOR_ACCENT },
    { name: "Featured", value: e.featured ?? 0, fill: COLOR_PRIMARY },
    { name: "Past", value: e.past ?? 0, fill: COLOR_MUTED },
  ].filter((d) => d.value > 0);

  const participationData = [
    { name: "Total", value: pa.total ?? 0, fill: COLOR_PRIMARY },
    { name: "Approved", value: pa.byStatus?.approved ?? 0, fill: COLOR_ACCENT },
    { name: "Pending", value: pa.byStatus?.pending ?? 0, fill: COLOR_LIGHT_INDIGO },
  ].filter((d) => d.value > 0);

  const invData = [
    { name: "Sent", value: inv.total ?? 0, fill: COLOR_PRIMARY },
    { name: "Accepted", value: inv.accepted ?? 0, fill: COLOR_ACCENT },
  ].filter((d) => d.value > 0);

  const ticketData = [
    { name: "Valid", value: ti.valid ?? 0, color: COLOR_ACCENT },
    { name: "Used", value: ti.used ?? 0, color: COLOR_PRIMARY },
  ].filter((d) => d.value > 0);

  const payData = [
    { name: "Total Pays", value: rev.totalPayments ?? 0, fill: COLOR_PRIMARY },
    { name: "Successful", value: rev.successfulPayments ?? 0, fill: COLOR_ACCENT },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-slate-200 p-4 sm:p-6 bg-white rounded-md shadow-2xs">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-6">Organizer — Dashboard Stats</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <DonutBox title="Event Visibility" data={visibilityPie} />
          <BarBox title="Events Timeline" data={eventTimelineData} fontSize={11} />
          <BarBox title="Participations" data={participationData} fontSize={11} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          <BarBox title="Invitations" data={invData} fontSize={11} />
          <DonutBox title="Tickets" data={ticketData} />

          <ChartBox title="Revenue Overview">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Payments Volume</p>
                <div style={{ height: 90 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={payData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<ChartTip />} />
                      <Bar dataKey="value" name="Count" radius={[4, 4, 0, 0]}>
                        {payData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <p className="text-xs text-slate-500">Live metrics sync automatically with Stripe and Neon PostgreSQL.</p>
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
export const UserStatsCard = ({ data }: { data: any }) => {
  const pa = data?.participations ?? {};
  const inv = data?.invitations ?? {};
  const pay = data?.payments ?? {};
  const ti = data?.tickets ?? {};
  const rev = data?.reviews ?? {};
  const not = data?.notifications ?? {};

  const statCards = [
    { title: "Participations", value: pa.total ?? 0, icon: <ClipboardList className="w-5 h-5" /> },
    { title: "Approved", value: pa.byStatus?.approved ?? 0, icon: <UserCheck className="w-5 h-5 text-emerald-600" /> },
    { title: "Pending Approval", value: pa.byStatus?.pending ?? 0, icon: <ClipboardList className="w-5 h-5 text-indigo-600" /> },
    { title: "Invitations", value: inv.total ?? 0, icon: <Mail className="w-5 h-5" /> },
    { title: "Accepted Invites", value: inv.byStatus?.accepted ?? 0, icon: <Mail className="w-5 h-5 text-emerald-600" /> },
    { title: "Payments Made", value: pay.total ?? 0, icon: <CreditCard className="w-5 h-5" /> },
    { title: "Total Spent", value: `৳${fmt(pay.totalSpent ?? 0)}`, icon: <CreditCard className="w-5 h-5 text-emerald-600" /> },
    { title: "My Tickets", value: ti.total ?? 0, icon: <Ticket className="w-5 h-5" /> },
    { title: "Valid Tickets", value: ti.valid ?? 0, icon: <Ticket className="w-5 h-5 text-emerald-600" /> },
    { title: "Used Tickets", value: ti.used ?? 0, icon: <Ticket className="w-5 h-5 text-slate-400" /> },
    { title: "Reviews Written", value: rev.total ?? 0, icon: <Star className="w-5 h-5 text-indigo-600" /> },
    { title: "Unread Notifs", value: not.unread ?? 0, icon: <Bell className="w-5 h-5 text-indigo-600" /> },
  ];

  const participationPie = [
    { name: "Approved", value: pa.byStatus?.approved ?? 0, color: COLOR_ACCENT },
    { name: "Pending", value: pa.byStatus?.pending ?? 0, color: COLOR_PRIMARY },
    { name: "Rejected", value: pa.byStatus?.rejected ?? 0, color: COLOR_ROSE },
  ].filter((d) => d.value > 0);

  const invitePie = [
    { name: "Accepted", value: inv.byStatus?.accepted ?? 0, color: COLOR_ACCENT },
    { name: "Pending", value: inv.byStatus?.pending ?? 0, color: COLOR_PRIMARY },
  ].filter((d) => d.value > 0);

  const ticketPie = [
    { name: "Valid", value: ti.valid ?? 0, color: COLOR_ACCENT },
    { name: "Used", value: ti.used ?? 0, color: COLOR_PRIMARY },
  ].filter((d) => d.value > 0);

  const payBarData = [
    { name: "Total", value: pay.total ?? 0, fill: COLOR_PRIMARY },
    { name: "Successful", value: pay.successful ?? 0, fill: COLOR_ACCENT },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-slate-200 p-4 sm:p-6 bg-white rounded-md shadow-2xs">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-6">My Dashboard — Overview</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <DonutBox title="Participation Status" data={participationPie} />
          <DonutBox title="My Invitations" data={invitePie} />
          <DonutBox title="My Tickets" data={ticketPie} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <BarBox
            title="Payments"
            data={payBarData}
            height={180}
            fontSize={11}
            footer={
              (pay.totalSpent ?? 0) > 0 ? (
                <p className="text-center text-sm text-slate-700 font-semibold mt-2">
                  Total Spent: ৳{fmt(pay.totalSpent)}
                </p>
              ) : undefined
            }
          />

          <ChartBox title="Reviews & Notifications">
            <div className="flex items-center gap-8 h-[180px]">
              <div style={{ width: 120, height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%"
                    data={[{ name: "Reviews", value: rev.total ?? 0, fill: COLOR_PRIMARY }]}
                    startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={8} />
                    <Tooltip content={<ChartTip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-slate-900">{rev.total ?? 0}</p>
                  <p className="text-xs text-slate-500">Reviews Written</p>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="text-indigo-600 w-4 h-4" />
                  <p className="text-xl font-bold text-slate-900">{not.unread ?? 0}</p>
                  <p className="text-xs text-indigo-600 font-medium">Unread Notifications</p>
                </div>
              </div>
            </div>
          </ChartBox>
        </div>
      </Card>
    </div>
  );
};
