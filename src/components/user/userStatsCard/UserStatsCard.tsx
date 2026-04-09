"use client";

import React from "react";
import {
  Users, Mail, ClipboardList, CreditCard, Star, TrendingUp, Calendar,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, RadialBarChart, RadialBar,
} from "recharts";

type Props = { data: any };

const iconMap: Record<string, React.ReactNode> = {
  acceptedInvites:             <Mail className="text-green-700 w-5 h-5" />,
  pendingInvites:              <Mail className="text-yellow-700 w-5 h-5" />,
  totalInvitesReceived:        <Mail className="text-purple-700 w-5 h-5" />,
  totalEventsCreated:          <Calendar className="text-indigo-700 w-5 h-5" />,
  totalInvitesSent:            <Mail className="text-blue-700 w-5 h-5" />,
  acceptedInvitesOnMyEvents:   <Mail className="text-green-700 w-5 h-5" />,
  totalParticipantsInMyEvents: <ClipboardList className="text-orange-700 w-5 h-5" />,
  totalReviewsOnMyEvents:      <Star className="text-yellow-700 w-5 h-5" />,
  totalJoined:                 <ClipboardList className="text-orange-700 w-5 h-5" />,
  approvedJoined:              <ClipboardList className="text-green-700 w-5 h-5" />,
  pendingJoined:               <ClipboardList className="text-yellow-700 w-5 h-5" />,
  totalPayments:               <CreditCard className="text-amber-700 w-5 h-5" />,
  successfulPayments:          <CreditCard className="text-green-700 w-5 h-5" />,
  totalSpent:                  <CreditCard className="text-blue-700 w-5 h-5" />,
  totalReviews:                <Star className="text-yellow-700 w-5 h-5" />,
};

const getBgBorder = (key: string) => {
  if (key.toLowerCase().includes("invite") || key.toLowerCase().includes("sent"))
    return "bg-purple-50 border-purple-200";
  if (key.toLowerCase().includes("event"))
    return "bg-indigo-50 border-indigo-200";
  if (key.toLowerCase().includes("join") || key.toLowerCase().includes("participant"))
    return "bg-orange-50 border-orange-200";
  if (key.toLowerCase().includes("payment") || key.toLowerCase().includes("spent"))
    return "bg-amber-50 border-amber-200";
  if (key.toLowerCase().includes("review"))
    return "bg-yellow-50 border-yellow-200";
  return "bg-slate-50 border-slate-200";
};

// ── Stat Card ──────────────────────────────────────────────────
const StatCard = ({ title, value, icon, bgBorder }: {
  title: string; value: number | string; icon: React.ReactNode; bgBorder: string;
}) => {
  const fmt = (v: number | string) => {
    if (typeof v === "number") {
      if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
      if (v >= 1_000)     return `${(v / 1_000).toFixed(1)}K`;
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

const SecTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold text-slate-600 mb-3">{children}</h3>
);

// ── Main ───────────────────────────────────────────────────────
const UserStatsCard = ({ data }: Props) => {

  const flattenStats = (obj: any): { key: string; value: number | string }[] =>
    Object.entries(obj).flatMap(([key, value]) =>
      typeof value === "object" && value !== null
        ? flattenStats(value)
        : [{ key, value: value as number | string }]
    );

  const stats = flattenStats(data);
  const get = (key: string) => (stats.find(s => s.key === key)?.value ?? 0) as number;

  // ── Invites pie ────────────────────────────────────────────
  const invitesPieData = [
    { name: "Accepted", value: get("acceptedInvites"),      color: "#10B981" },
    { name: "Pending",  value: get("pendingInvites"),       color: "#F59E0B" },
  ].filter(d => d.value > 0);

  // If organizer data present – sent vs accepted
  const orgInviteData = [
    { name: "Sent",     value: get("totalInvitesSent"),             color: "#6366F1" },
    { name: "Accepted", value: get("acceptedInvitesOnMyEvents"),    color: "#10B981" },
  ].filter(d => d.value > 0);

  // Participation pie
  const participationPie = [
    { name: "Approved", value: get("approvedJoined"), color: "#10B981" },
    { name: "Pending",  value: get("pendingJoined"),  color: "#F59E0B" },
  ].filter(d => d.value > 0);

  // Payments bar
  const paymentsBarData = [
    { name: "Payments", Total: get("totalPayments"), Successful: get("successfulPayments") },
  ];

  // Organizer overview bar
  const orgBarData = [
    { name: "Events Created",   value: get("totalEventsCreated") },
    { name: "Participants",     value: get("totalParticipantsInMyEvents") },
    { name: "Reviews on events",value: get("totalReviewsOnMyEvents") },
  ].filter(d => d.value > 0);

  // Joined vs total summary
  const joinedData = [
    { name: "Joined",   value: get("totalJoined"),    color: "#F97316" },
    { name: "Approved", value: get("approvedJoined"), color: "#10B981" },
    { name: "Pending",  value: get("pendingJoined"),  color: "#F59E0B" },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-5 mb-6">
      <Card className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl shadow-none">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6">Dashboard Stats</h4>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
          {stats.map((s, i) => (
            <StatCard
              key={i}
              title={s.key}
              value={s.value}
              icon={iconMap[s.key] || <TrendingUp className="w-5 h-5 text-slate-700" />}
              bgBorder={getBgBorder(s.key)}
            />
          ))}
        </div>

        {/* ── Charts row 1 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Invitations received – donut */}
          {invitesPieData.length > 0 && (
            <div className="bg-purple-50 rounded-xl border border-purple-200 p-4">
              <SecTitle>Invitations Received</SecTitle>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={invitesPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={72}
                      paddingAngle={3} dataKey="value">
                      {invitesPieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip content={<ChartTip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-3 mt-2 justify-center">
                {invitesPieData.map(d => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    {d.name}: <span className="font-bold text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Organizer invites bar */}
          {orgInviteData.length > 0 && (
            <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
              <SecTitle>My Events — Invites</SecTitle>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orgInviteData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTip />} />
                    <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                      {orgInviteData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Participation donut */}
          {participationPie.length > 0 && (
            <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
              <SecTitle>Participation Status</SecTitle>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={participationPie} cx="50%" cy="50%" outerRadius={72}
                      paddingAngle={2} dataKey="value">
                      {participationPie.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip content={<ChartTip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-3 mt-2 justify-center">
                {participationPie.map(d => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    {d.name}: <span className="font-bold text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Charts row 2 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

          {/* Payments grouped bar */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <SecTitle>Payments</SecTitle>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Total",      value: get("totalPayments"),      color: "#F59E0B" },
                  { name: "Successful", value: get("successfulPayments"), color: "#10B981" },
                ]} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FDE68A" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {[<Cell key={0} fill="#F59E0B" />, <Cell key={1} fill="#10B981" />]}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {get("totalSpent") > 0 && (
              <p className="text-center text-sm text-amber-700 font-semibold mt-2">
                Total Spent: {get("totalSpent").toLocaleString()}
              </p>
            )}
          </div>

          {/* Organizer overview OR joined summary */}
          {orgBarData.length > 0 ? (
            <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
              <SecTitle>Organizer Summary</SecTitle>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orgBarData} layout="vertical"
                    margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#6B7280" }}
                      axisLine={false} tickLine={false} width={110} />
                    <Tooltip content={<ChartTip />} />
                    <Bar dataKey="value" name="Count" radius={[0, 6, 6, 0]}>
                      {["#6366F1", "#F97316", "#EAB308"].map((c, i) => <Cell key={i} fill={c} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
              <SecTitle>Joined Events</SecTitle>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={joinedData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#FFEDD5" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTip />} />
                    <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                      {joinedData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* ── Reviews radial ── */}
        {(get("totalReviews") > 0 || get("totalReviewsOnMyEvents") > 0) && (
          <div className="mt-5 bg-yellow-50 rounded-xl border border-yellow-200 p-4">
            <SecTitle>Reviews</SecTitle>
            <div className="flex items-center gap-8">
              <div style={{ width: 120, height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%"
                    data={[
                      { name: "My Reviews",     value: get("totalReviews"),           fill: "#EAB308" },
                      { name: "On My Events",   value: get("totalReviewsOnMyEvents"), fill: "#F97316" },
                    ].filter(d => d.value > 0)}
                    startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={6} />
                    <Tooltip content={<ChartTip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {get("totalReviews") > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span className="text-sm text-slate-600">My reviews:</span>
                    <span className="text-sm font-bold text-slate-900">{get("totalReviews")}</span>
                  </div>
                )}
                {get("totalReviewsOnMyEvents") > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400 flex-shrink-0" />
                    <span className="text-sm text-slate-600">On my events:</span>
                    <span className="text-sm font-bold text-slate-900">{get("totalReviewsOnMyEvents")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </Card>
    </div>
  );
};

export default UserStatsCard;