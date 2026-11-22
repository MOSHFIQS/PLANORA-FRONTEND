"use client";

import { useState } from "react";
import {
  X, Search, Sparkles, Flame, Calendar, Ticket,
  PenSquare, Mic, ArrowRight, Loader2, MapPin,
  Grip, Paperclip, ChevronDown, Zap, Compass, RotateCcw
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useAIFeatures } from "@/hooks/useAiFeatures";

type ViewMode = "welcome" | "search" | "trending" | "recommendations" | "schedule";

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("welcome");

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
    if (!user?.id && !url.startsWith("/events/")) {
      router.push(`/login?redirect=${encodeURIComponent(url)}`);
    } else {
      router.push(url);
    }
  };

  const userName = user?.name ? user.name.split(" ")[0] : "Amélie";

  const handlePromptClick = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setViewMode("search");
    }
  };

  return (
    <>
      {/* ── BACKDROP (when sidebar is open) ── */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/15 backdrop-blur-[2px] z-[9998] transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* ── SIDEBAR PANEL (Matching Screenshot Pattern) ── */}
      <div
        className={`fixed top-3 right-3 bottom-3 w-[360px] sm:w-[410px] max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-[9999] flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out origin-right ${
          isOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-[110%] opacity-0 pointer-events-none"
        }`}
      >
        {/* TOP HEADER CONTROLS */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-1.5 text-slate-400">
            {viewMode !== "welcome" && (
              <button
                onClick={() => {
                  setViewMode("welcome");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition"
              >
                <RotateCcw size={11} />
                <span>Home</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition"
              title="Options"
            >
              <Grip size={17} />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              title="Close Assistant"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* SCROLLABLE MAIN BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-2 [scrollbar-width:none]">
          {loading ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 size={24} className="animate-spin text-indigo-600" />
              <span className="text-xs">Preparing your event workspace…</span>
            </div>
          ) : viewMode === "welcome" ? (
            /* ── PATTERN FROM SCREENSHOT: Centered Emblem, Welcome Salutation, Prompts ── */
            <div className="flex flex-col items-center text-center pt-3 pb-4">
              {/* Glossy Circular Orb Emblem */}
              <div className="relative w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center shadow-lg border border-slate-800 text-white mb-5 group">
                <div
                  className="w-8 h-8 rounded-full border-2 border-slate-500 border-t-white animate-spin"
                  style={{ animationDuration: "7s" }}
                />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-xs" />
              </div>

              {/* Salutation & Welcome */}
              <p className="text-sm font-medium text-slate-500 mb-1">
                Hi {userName},
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                Welcome back! How can I help?
              </h2>
              <p className="text-xs text-slate-500 mt-2 max-w-[290px] leading-relaxed">
                I&apos;m here to help you tackle your events. Choose from the prompts below or just tell me what you need!
              </p>

              {/* Quick Prompts Grid (Matching pills layout in screenshot) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full mt-6">
                <button
                  onClick={() => handlePromptClick("recommendations")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 text-[11px] font-medium text-slate-700 transition shadow-2xs group text-left"
                >
                  <Compass size={13} className="text-indigo-600 shrink-0" />
                  <span className="truncate">Discover events</span>
                </button>

                <button
                  onClick={() => handlePromptClick("trending")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 text-[11px] font-medium text-slate-700 transition shadow-2xs group text-left"
                >
                  <Flame size={13} className="text-indigo-600 shrink-0" />
                  <span className="truncate">Analyze trends</span>
                </button>

                <button
                  onClick={() => handlePromptClick("schedule")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 text-[11px] font-medium text-slate-700 transition shadow-2xs group text-left"
                >
                  <Calendar size={13} className="text-indigo-600 shrink-0" />
                  <span className="truncate">Make a plan</span>
                </button>

                <button
                  onClick={() => navigate(user?.id ? "/dashboard/my/tickets" : "/login")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 text-[11px] font-medium text-slate-700 transition shadow-2xs group text-left"
                >
                  <Ticket size={13} className="text-indigo-600 shrink-0" />
                  <span className="truncate">Find tickets</span>
                </button>

                <button
                  onClick={() => navigate(user?.role === "ORGANIZER" || user?.role === "ADMIN" ? "/organizer-dashboard/events/create" : "/events")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 text-[11px] font-medium text-slate-700 transition shadow-2xs group text-left"
                >
                  <PenSquare size={13} className="text-indigo-600 shrink-0" />
                  <span className="truncate">Host an event</span>
                </button>

                <button
                  onClick={() => navigate("/events")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 text-[11px] font-medium text-slate-700 transition shadow-2xs group text-left"
                >
                  <Sparkles size={13} className="text-indigo-600 shrink-0" />
                  <span className="truncate">Explore all</span>
                </button>
              </div>
            </div>
          ) : viewMode === "search" ? (
            /* ── SEARCH RESULTS ── */
            <div className="py-2 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <p className="text-xs font-bold text-slate-700">Search Results</p>
                <span className="text-[10px] text-slate-400">{searchResults.length} events found</span>
              </div>
              {searchLoading ? (
                <div className="flex items-center justify-center py-12 gap-2 text-slate-400">
                  <Loader2 size={16} className="animate-spin text-indigo-600" />
                  <span className="text-xs">Searching events…</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-md border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-2xs text-left transition group"
                    >
                      <div className="w-11 h-11 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                        {event.images?.[0] ? (
                          <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                          <div className="w-full h-full bg-slate-200" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                          {event.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5 flex items-center gap-1">
                          <MapPin size={9} /> {event.venue || event.type}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-indigo-600 shrink-0">
                        {event.fee === 0 ? "Free" : `৳${event.fee}`}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No matching events found for &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          ) : viewMode === "trending" ? (
            /* ── TRENDING VIEW ── */
            <div className="py-2 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <p className="text-xs font-bold text-slate-700">Trending Summits</p>
                <span className="text-[10px] text-slate-400">Popular right now</span>
              </div>
              <div className="space-y-2">
                {trendingItems.map((event, idx) => (
                  <button
                    key={event.id}
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-md border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-2xs text-left transition group"
                  >
                    <div className="w-11 h-11 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                      {event.images?.[0] ? (
                        <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full bg-slate-200" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[9px] font-bold text-indigo-600">#{idx + 1}</span>
                        {event.isFeatured && <span className="text-[9px] text-emerald-600 font-semibold">• Featured</span>}
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                        {event.title}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 shrink-0">
                      {event.fee === 0 ? "Free" : `৳${event.fee}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : viewMode === "recommendations" ? (
            /* ── RECOMMENDATIONS ── */
            <div className="py-2 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <p className="text-xs font-bold text-slate-700">Curated For You</p>
                <span className="text-[10px] text-slate-400">Personalized</span>
              </div>
              <div className="space-y-2">
                {personalizedRecommendations.length > 0 ? (
                  personalizedRecommendations.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-md border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-2xs text-left transition group"
                    >
                      <div className="w-11 h-11 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                        {event.images?.[0] ? (
                          <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                          <div className="w-full h-full bg-slate-200" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                          {event.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {new Date(event.dateTime).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-indigo-600 shrink-0">
                        {event.fee === 0 ? "Free" : `৳${event.fee}`}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-center py-8 text-slate-400">No suggestions found.</p>
                )}
              </div>
            </div>
          ) : (
            /* ── SCHEDULE & SHORTCUTS ── */
            <div className="py-2 space-y-3">
              <p className="text-xs font-bold text-slate-700">Quick Navigation</p>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(user?.id ? "/dashboard" : "/login")}
                  className="w-full flex items-center justify-between p-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition text-xs font-semibold text-slate-800"
                >
                  <span>My Dashboard</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </button>
                <button
                  onClick={() => navigate(user?.id ? "/dashboard/my/tickets" : "/login")}
                  className="w-full flex items-center justify-between p-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition text-xs font-semibold text-slate-800"
                >
                  <span>My Tickets</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </button>
                <button
                  onClick={() => navigate("/events")}
                  className="w-full flex items-center justify-between p-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition text-xs font-semibold text-slate-800"
                >
                  <span>All Events Directory</span>
                  <ArrowRight size={13} className="text-slate-400" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── BOTTOM INPUT SECTION (Matching Screenshot Exact Pattern) ── */}
        <div className="p-4 border-t border-slate-100 bg-white space-y-2">
          {/* Pill Input Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-slate-200 bg-white hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all shadow-2xs"
          >
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
            />
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 transition shrink-0"
              title="Voice Prompt"
            >
              <Mic size={15} />
            </button>
          </form>

          {/* Sub-Footer Meta Controls */}
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-400 pt-0.5">
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-slate-600 font-medium transition cursor-pointer"
            >
              <span>Planora AI v2.0</span>
              <ChevronDown size={11} />
            </button>

            <div className="flex items-center gap-3 text-slate-500">
              <button
                type="button"
                onClick={() => handlePromptClick("schedule")}
                className="inline-flex items-center gap-1 hover:text-indigo-600 font-medium transition cursor-pointer"
              >
                <Zap size={11} />
                <span>Shortcuts</span>
              </button>
              <button
                type="button"
                onClick={() => navigate("/events")}
                className="inline-flex items-center gap-1 hover:text-indigo-600 font-medium transition cursor-pointer"
              >
                <Paperclip size={11} />
                <span>Events</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── LAUNCHER TRIGGER BUTTON (FAB) ── */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-[9990] w-12 h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 focus:outline-none shadow-lg border border-slate-200/90 ${
          isOpen
            ? "bg-slate-900 text-white rotate-90 scale-95"
            : "bg-white hover:scale-105 hover:shadow-xl"
        }`}
        aria-label={isOpen ? "Close AI Sidebar" : "Open Planora AI Sidebar"}
      >
        {isOpen ? (
          <X size={18} className="text-white" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center text-white relative shadow-inner">
            <Sparkles size={13} className="text-indigo-400" />
          </div>
        )}
      </button>
    </>
  );
}
