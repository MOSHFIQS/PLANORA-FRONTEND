"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowUp,
  CheckCircle2,
  Calendar,
  Ticket,
  Bot,
  ChevronRight,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-slate-200/90 text-slate-800 relative overflow-hidden transition-colors">
      {/* ── Top Subtle Animated Gradient Beam ── */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent animate-pulse" />

      {/* ── Full-Width Interactive Feature Bar (Like Navbar Flow) ── */}
      <div className="w-full border-b border-slate-200/70 bg-white/60 backdrop-blur-xs px-4 sm:px-8 lg:px-12 xl:px-16 py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <Ticket size={13} />
            </div>
            <span className="font-medium text-slate-700">
              Instant Digital Passes &amp; QR Verify
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 group cursor-default">
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <Bot size={13} />
            </div>
            <span className="font-medium text-slate-700">
              AI-Powered Assistant &amp; Smart Schedule
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 group cursor-default">
            <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <ShieldCheck size={13} />
            </div>
            <span className="font-medium text-slate-700">
              Stripe 256-Bit SSL Encrypted Checkout
            </span>
          </div>

          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center transition-transform group-hover:rotate-45">
              <Globe2 size={13} />
            </div>
            <span className="font-medium text-slate-700">
              Global Summits in 40+ Tech Hubs
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Footer Body (Full Width Edge-to-Edge like Navbar) ── */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12">
          
          {/* Brand & Mission (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-md border border-slate-800 text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/20">
                  <Sparkles size={17} className="text-indigo-400 animate-pulse" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600" />
                </span>
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                  PLANORA
                  <span className="text-[10px] font-bold text-white bg-indigo-600 px-1.5 py-0.2 rounded-full tracking-wider">
                    PRO
                  </span>
                </span>
                <span className="block text-[9.5px] font-bold text-indigo-600 tracking-widest uppercase">
                  Next-Gen Event Architecture
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Discover, organize, and experience high-impact summits, tech conferences, and curated workshops with real-time pass issuance and AI intelligence.
            </p>

            {/* Social Icons with animated hover lifts */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-md bg-white border border-slate-200/90 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/60 hover:-translate-y-1 shadow-2xs flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 size={12} className="text-emerald-600" />
                <span>Verified Event Platform</span>
              </span>
              <span className="text-[11px] text-slate-400">★ 4.9/5 Rating</span>
            </div>
          </div>

          {/* Quick Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span>Platform</span>
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Explore Events", href: "/events", badge: "Live" },
                { name: "Categories", href: "/events" },
                { name: "About Planora", href: "/about-us" },
                { name: "Contact Support", href: "/contact" },
                { name: "FAQs & Guide", href: "/help" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1.5 transition-all duration-150 group"
                  >
                    <ChevronRight size={13} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 ml-1">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Organizers (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Community
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Become a Host", href: "/register", badge: "Earn" },
                { name: "Organizer Dashboard", href: "/organizer-dashboard" },
                { name: "Attendee Passes", href: "/dashboard/my/tickets" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy-policy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1.5 transition-all duration-150 group"
                  >
                    <ChevronRight size={13} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ml-1">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Animated Newsletter Card (col-span-4 - Sidebar Pattern) */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all duration-300 space-y-3.5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Zap size={12} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Weekly Briefing
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Curated
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Receive curated event invites, early-bird VIP drops, and exclusive speaker recordings delivered every Sunday.
              </p>

              {/* Capsule Input Bar (AI Sidebar Pattern) */}
              <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-2 p-1.5 pl-3.5 rounded-full border border-slate-200 bg-white hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all shadow-2xs relative z-10"
              >
                <Mail size={15} className="text-slate-400 shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#4F46E5] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all shrink-0 active:scale-95 group/btn"
                >
                  <span>{subscribed ? "Subscribed!" : "Join"}</span>
                  <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Status indicators */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-600" />
                  <span>No spam ever</span>
                </span>
                <span>•</span>
                <span>1-Click Unsubscribe</span>
                <span>•</span>
                <Link href="/privacy-policy" className="text-indigo-600 hover:underline">
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sub-Footer Meta Bar (Full Width like Navbar) ── */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-medium text-slate-700">
              © {new Date().getFullYear()} Planora Inc. All rights reserved.
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-[11px] text-slate-400">
              Engineered with Next.js &amp; Tailwind
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Live Operational Status with Animated Ping */}
            <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>

            {/* Back to Top Floating Button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="group flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-2xs transition-all text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
