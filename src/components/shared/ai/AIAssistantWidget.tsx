"use client";

import { useState } from "react";
import {
  X, Search, Compass, ArrowRight,
  LayoutDashboard, Ticket, Loader2, Star, MapPin, Calendar,
  Wifi, Flame,
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

  // ── Shared card style (light) ──
  const card =
    "rounded-xl border border-[#e8e3f0] bg-white hover:bg-[#f7f4ff] transition-all duration-150 shadow-sm hover:shadow-md";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">

      {/* ── Panel ── */}
      <div
        className={[
          "w-[340px] flex flex-col overflow-hidden rounded-2xl pointer-events-auto",
          "transition-all duration-200 ease-out origin-bottom-right shadow border-2",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-3 pointer-events-none",
        ].join(" ")}
        style={{
          height: 520,
          background: "#ffffff",          // warm off-white matching login page BG
          // border: "2px solid black",
          // boxShadow: "0 20px 60px rgba(109,40,217,0.10), 0 4px 16px rgba(0,0,0,0.07)",
        }}
      >
        {/* Subtle top tint strip */}
        {/* <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, #7c3aed, #a855f7)" }}
        /> */}

        {/* ── Header ── */}
        <div
          className="relative flex items-center justify-between px-4 pt-4 pb-3"
          style={{ borderBottom: "1px solid #e8e3f0" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden p-1"
              style={{
                background: "linear-gradient(135deg,#ede9fe,#ddd6fe)",
                border: "1px solid #c4b5fd",
              }}
            >
              <img src="/logo/logo.png" alt="Planora Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">Planora AI</span>
                <span
                  className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded-full"
                  style={{ background: "#ede9fe", color: "#7c3aed", border: "1px solid #c4b5fd" }}
                >
                  BETA
                </span>
              </div>
              <p className="text-[10px] mt-0.5 text-gray-400 leading-none">
                Your intelligent event guide
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex px-3 pt-2.5 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-[10.5px] font-semibold transition-all duration-150"
              style={
                activeTab === tab.id
                  ? {
                    background: "#FE7743",
                    color: "#fff"
                  }
                  : { color: "#9ca3af", background: "transparent" }
              }
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div
          className="flex-1 overflow-y-auto mt-2 px-3 pb-3"
          style={{ scrollbarWidth: "none" }}
        >
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-400">
              <Loader2 size={20} className="animate-spin text-violet-600" />
              <span className="text-xs">Loading events…</span>
            </div>
          ) : (
            <>

              {/* ── SEARCH ── */}
              {activeTab === "search" && (
                <div className="flex flex-col gap-3">
                  <div className="relative mt-1">
                    <Search
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search events, venues, types…"
                      className="w-full pl-8 pr-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none rounded-xl bg-white border border-[#ddd6f3] focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    />
                  </div>

                  {searchQuery.trim() ? (
                    <>
                      <p className="text-[9.5px] font-bold uppercase tracking-widest text-gray-400">Results</p>
                      {searchLoading ? (
                        <div className="flex items-center justify-center py-8 gap-2 text-gray-400">
                          <Loader2 size={15} className="animate-spin text-violet-500" />
                          <span className="text-xs">Searching…</span>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="flex flex-col gap-1.5">
                          {searchResults.map((event) => (
                            <button
                              key={event.id}
                              onClick={() => navigate(`/events/${event.id}`)}
                              className={`${card} flex items-center gap-3 px-3 py-2.5 w-full text-left group`}
                            >
                              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-violet-50 border border-violet-100">
                                {event.images?.[0] && (
                                  <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-900 truncate">{event.title}</p>
                                <p className="text-[10px] flex items-center gap-1 text-gray-400 truncate mt-0.5">
                                  <MapPin size={9} />{event.venue ?? event.type}
                                </p>
                              </div>
                              <span className={`text-[10px] font-bold flex-shrink-0 ${event.fee === 0 ? "text-emerald-600" : "text-violet-600"}`}>
                                {event.fee === 0 ? "Free" : `৳${event.fee}`}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-center py-8 text-gray-400">No events found.</p>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "#ede9fe", border: "1px solid #c4b5fd" }}
                      >
                        <Search size={17} className="text-violet-600" />
                      </div>
                      <p className="text-xs max-w-[180px] leading-relaxed text-gray-400">
                        Find events by name, venue, or type.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── FOR YOU ── */}
              {activeTab === "foryou" && (
                <div className="flex flex-col gap-2 mt-1">
                  <p className="text-[9.5px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    Curated for you
                  </p>
                  {personalizedRecommendations.length > 0 ? (
                    personalizedRecommendations.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => navigate(`/events/${event.id}`)}
                        className={`${card} flex items-center gap-3 p-3 w-full text-left`}
                      >
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border border-violet-100">
                          {event.images?.[0]
                            ? <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
                            : <div className="w-full h-full" style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }} />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ background: "#dcfce7", color: "#16a34a", border: "1px solid #bbf7d0" }}
                            >
                              ✦ Recommended
                            </span>
                            {event.type === "ONLINE" && (
                              <span
                                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
                                style={{ background: "#ede9fe", color: "#7c3aed", border: "1px solid #c4b5fd" }}
                              >
                                <Wifi size={8} /> Online
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-gray-900 truncate">{event.title}</p>
                          <p className="text-[10px] flex items-center gap-1 text-gray-400 mt-0.5">
                            <Calendar size={9} />{formatDate(event.dateTime)}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-center py-8 text-gray-400">No recommendations yet.</p>
                  )}

                  {!user?.id && (
                    <div
                      className="mt-1 rounded-xl p-3 text-center"
                      style={{ background: "#ede9fe", border: "1px solid #c4b5fd" }}
                    >
                      <p className="text-[10px] mb-2 text-violet-500">
                        Sign in for personalized picks
                      </p>
                      <button
                        onClick={() => navigate("/login")}
                        className="text-[10px] font-bold px-3 py-1 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                      >
                        Sign in →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── TRENDING ── */}
              {activeTab === "trending" && (
                <div className="flex flex-col gap-2 mt-1">
                  <p className="text-[9.5px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    Upcoming &amp; popular
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {trendingItems.map((event, idx) => (
                      <button
                        key={event.id}
                        onClick={() => navigate(`/events/${event.id}`)}
                        className={`${card} flex flex-col p-2.5 text-left`}
                      >
                        <div className="flex items-center gap-1 mb-1.5">
                          <Flame size={10} className="text-orange-500" />
                          <span className="text-[9px] font-bold text-orange-500">
                            {idx === 0 ? "Hot" : `#${idx + 1}`}
                          </span>
                          {event.isFeatured && <span className="text-[9px] text-amber-500">★</span>}
                        </div>
                        <div
                          className="w-full h-14 rounded-lg overflow-hidden mb-2 border border-gray-100"
                        >
                          {event.images?.[0]
                            ? <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
                            : <div className="w-full h-full" style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }} />
                          }
                        </div>
                        <p className="text-[10px] font-semibold text-gray-900 truncate">{event.title}</p>
                        <p className={`text-[9px] mt-0.5 font-bold ${event.fee === 0 ? "text-emerald-600" : "text-violet-600"}`}>
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
                  <p className="text-[9.5px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    Quick actions
                  </p>
                  {smartShortcuts.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(s.url)}
                      className={`${card} flex items-center justify-between px-3 py-2.5 w-full group`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-violet-600"
                          style={{ background: "#ede9fe" }}
                        >
                          {s.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-800">{s.title}</span>
                      </div>
                      <ArrowRight
                        size={13}
                        className="text-gray-300 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all"
                      />
                    </button>
                  ))}

                  <div
                    className="mt-1 px-3 py-2.5 rounded-xl"
                    style={{ background: "#f0ecff", border: "1px solid #e0d9f8" }}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                      Current page
                    </p>
                    <p className="text-[10px] font-mono text-gray-500 truncate">{pathname}</p>
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
        className={`
          w-12 h-12 rounded-full flex items-center justify-center pointer-events-auto
          transition-all duration-200 focus:outline-none
          ${isOpen
            ? "bg-white border-2 border-violet-300 rotate-90 shadow-lg shadow-violet-100"
            : "bg-white border border-gray-200 shadow-md hover:shadow-lg hover:border-violet-200"
          }
        `}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? (
          <X size={18} className="text-violet-600" />
        ) : (
          <img
            src="/logo/logo.png"
            alt="Planora Logo"
            className="w-8 h-8 object-contain rounded-full"
          />
        )}
      </button>
    </div>
  );
}