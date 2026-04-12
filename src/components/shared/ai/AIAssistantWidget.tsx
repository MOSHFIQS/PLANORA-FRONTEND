"use client";

import { useState } from "react";
import {
  Sparkles, X, Search, TrendingUp, Compass, ArrowRight,
  LayoutDashboard, Ticket, Loader2, Star, MapPin, Calendar,
  Wifi, Flame, Zap,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useAIFeatures } from "@/hooks/useAiFeatures";

type Tab = "search" | "foryou" | "trending" | "nav";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "search", label: "Search", icon: <Search size={12} /> },
  { id: "foryou", label: "For You", icon: <Star size={12} /> },
  { id: "trending", label: "Trending", icon: <Flame size={12} /> },
  { id: "nav", label: "Navigate", icon: <Compass size={12} /> },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

// Glassmorphism card style
const glassCard = "rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-150";

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("search");

  const {
    searchQuery, setSearchQuery,
    searchResults, searchLoading,
    personalizedRecommendations, trendingItems, loading,
  } = useAIFeatures();

  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const hiddenRoutes = ["/dashboard", "/seller-dashboard", "/admin-dashboard"];
  if (hiddenRoutes.some((r) => pathname.startsWith(r))) return null;

  // Auth-aware navigation: redirect to login if not logged in
  const navigate = (url: string) => {
    setIsOpen(false);
    if (!user?.id) {
      router.push(`/login?redirect=${encodeURIComponent(url)}`);
    } else {
      router.push(url);
    }
  };

  const smartShortcuts = [
    ...(user?.id
      ? [
          { title: "My Dashboard", url: "/dashboard", icon: <LayoutDashboard size={14} /> },
          { title: "My Tickets", url: "/dashboard/my/tickets", icon: <Ticket size={14} /> },
        ]
      : [{ title: "Sign in to continue", url: "/login", icon: <ArrowRight size={14} /> }]),
    ...(!pathname.includes("/events")
      ? [{ title: "Browse Events", url: "/events", icon: <Search size={14} /> }]
      : []),
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">

      {/* ── Panel ── */}
      <div
        className={[
          "w-[340px] flex flex-col overflow-hidden rounded-2xl",
          "pointer-events-auto",
          "transition-all duration-200 ease-out origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-3 pointer-events-none",
        ].join(" ")}
        style={{
          height: 520,
          background: "linear-gradient(160deg, #0f0a1e 0%, #1a1035 60%, #120d2a 100%)",
          border: "1px solid rgba(139,92,246,0.25)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)" }} />

        {/* Header */}
        <div className="relative flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
              <Zap size={14} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Planora AI</span>
                <span className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}>
                  BETA
                </span>
              </div>
              <p className="text-[10px] mt-0.5 leading-none" style={{ color: "rgba(255,255,255,0.35)" }}>
                Your intelligent event guide
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)}
            className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
            <X size={14} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-2 pt-2 gap-1">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10.5px] font-semibold transition-all duration-150"
              style={
                activeTab === tab.id
                  ? { background: "rgba(139,92,246,0.25)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.35)" }
                  : { color: "rgba(255,255,255,0.35)", border: "1px solid transparent" }
              }>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto mt-2 px-3 pb-3"
          style={{ scrollbarWidth: "none" }}>

          {loading ? (
            <div className="h-full flex flex-col items-center justify-center gap-3" style={{ color: "rgba(255,255,255,0.3)" }}>
              <Loader2 size={20} className="animate-spin" style={{ color: "#7c3aed" }} />
              <span className="text-xs">Loading events…</span>
            </div>
          ) : (
            <>
              {/* ── SEARCH ── */}
              {activeTab === "search" && (
                <div className="flex flex-col gap-3">
                  <div className="relative mt-1">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "rgba(255,255,255,0.3)" }} />
                    <input type="text" value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search events, venues, types…"
                      className="w-full pl-8 pr-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }} />
                  </div>

                  {searchQuery.trim() ? (
                    <>
                      <p className="text-[9.5px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
                        Results
                      </p>
                      {searchLoading ? (
                        <div className="flex items-center justify-center py-8 gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                          <Loader2 size={15} className="animate-spin" style={{ color: "#7c3aed" }} />
                          <span className="text-xs">Searching…</span>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="flex flex-col gap-1.5">
                          {searchResults.map((event) => (
                            <button key={event.id} onClick={() => navigate(`/events/${event.id}`)}
                              className={`${glassCard} flex items-center gap-3 px-3 py-2.5 w-full text-left group`}>
                              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0"
                                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                {event.images?.[0] && <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-white truncate">{event.title}</p>
                                <p className="text-[10px] flex items-center gap-1 truncate mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                                  <MapPin size={9} />{event.venue ?? event.type}
                                </p>
                              </div>
                              <span className="text-[10px] font-bold flex-shrink-0"
                                style={{ color: event.fee === 0 ? "#4ade80" : "#a78bfa" }}>
                                {event.fee === 0 ? "Free" : `৳${event.fee}`}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-center py-8" style={{ color: "rgba(255,255,255,0.25)" }}>No events found.</p>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)" }}>
                        <Search size={17} style={{ color: "#7c3aed" }} />
                      </div>
                      <p className="text-xs max-w-[180px] leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
                        Find events by name, venue, or type.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── FOR YOU ── */}
              {activeTab === "foryou" && (
                <div className="flex flex-col gap-2 mt-1">
                  <p className="text-[9.5px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Curated for you
                  </p>
                  {personalizedRecommendations.length > 0 ? (
                    personalizedRecommendations.map((event) => (
                      <button key={event.id} onClick={() => navigate(`/events/${event.id}`)}
                        className={`${glassCard} flex items-center gap-3 p-3 w-full text-left`}>
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0"
                          style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                          {event.images?.[0]
                            ? <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
                            : <div className="w-full h-full" style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }} />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ background: "rgba(52,211,153,0.15)", color: "#4ade80", border: "1px solid rgba(52,211,153,0.2)" }}>
                              ✦ Recommended
                            </span>
                            {event.type === "ONLINE" && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                                style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
                                <Wifi size={8} /> Online
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-white truncate">{event.title}</p>
                          <p className="text-[10px] flex items-center gap-1 mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                            <Calendar size={9} />{formatDate(event.dateTime)}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-center py-8" style={{ color: "rgba(255,255,255,0.25)" }}>No recommendations yet.</p>
                  )}

                  {!user?.id && (
                    <div className="mt-1 rounded-xl p-3 text-center"
                      style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                      <p className="text-[10px] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Sign in for personalized picks
                      </p>
                      <button onClick={() => navigate("/login")}
                        className="text-[10px] font-bold px-3 py-1 rounded-full"
                        style={{ background: "rgba(139,92,246,0.3)", color: "#c4b5fd" }}>
                        Sign in →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── TRENDING ── */}
              {activeTab === "trending" && (
                <div className="flex flex-col gap-2 mt-1">
                  <p className="text-[9.5px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Upcoming &amp; popular
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {trendingItems.map((event, idx) => (
                      <button key={event.id} onClick={() => navigate(`/events/${event.id}`)}
                        className={`${glassCard} flex flex-col p-2.5 text-left`}>
                        <div className="flex items-center gap-1 mb-1.5">
                          <Flame size={10} className="text-orange-400" />
                          <span className="text-[9px] font-bold text-orange-400">{idx === 0 ? "Hot" : `#${idx + 1}`}</span>
                          {event.isFeatured && <span className="text-[9px] text-yellow-400">★</span>}
                        </div>
                        <div className="w-full h-14 rounded-lg overflow-hidden mb-2"
                          style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                          {event.images?.[0]
                            ? <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
                            : <div className="w-full h-full" style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }} />
                          }
                        </div>
                        <p className="text-[10px] font-semibold text-white truncate">{event.title}</p>
                        <p className="text-[9px] mt-0.5 font-bold"
                          style={{ color: event.fee === 0 ? "#4ade80" : "#a78bfa" }}>
                          {event.fee === 0 ? "Free" : `৳${event.fee}`}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── NAVIGATE ── */}
              {activeTab === "nav" && (
                <div className="flex flex-col gap-2 mt-1">
                  <p className="text-[9.5px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Quick actions
                  </p>
                  {smartShortcuts.map((s, idx) => (
                    <button key={idx} onClick={() => navigate(s.url)}
                      className={`${glassCard} flex items-center justify-between px-3 py-2.5 w-full group`}>
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}>
                          {s.icon}
                        </div>
                        <span className="text-xs font-medium text-white">{s.title}</span>
                      </div>
                      <ArrowRight size={13} style={{ color: "rgba(255,255,255,0.25)" }}
                        className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}

                  <div className="mt-1 px-3 py-2.5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                      Current page
                    </p>
                    <p className="text-[10px] font-mono truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{pathname}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-12 h-12 rounded-2xl flex items-center justify-center pointer-events-auto transition-all duration-200 focus:outline-none"
        style={{
          background: isOpen
            ? "#0db8c4"
            : "#0db8c4",
          // boxShadow: "0 8px 24px rgba(109,40,217,0.5)",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 32px rgba(109,40,217,0.7)")}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(109,40,217,0.5)")}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen
          ? <X size={18} className="text-white" />
          : <Sparkles size={18} className="text-white" />
        }
      </button>
    </div>
  );
}