"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50/70 border-t border-slate-200/80 text-slate-800 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          
          {/* Brand Info (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-md border border-slate-800 text-white relative group-hover:scale-105 transition-transform">
                <Sparkles size={16} className="text-indigo-400" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 tracking-tight">PLANORA</span>
                <span className="block text-[9.5px] font-bold text-indigo-600 tracking-widest uppercase">
                  Intelligent Event Hub
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Discover, organize, and experience world-class conferences, summits, and workshops with instant digital passes and AI-powered scheduling.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
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
                  className="w-9 h-9 rounded-md bg-white border border-slate-200/90 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 shadow-2xs flex items-center justify-center transition-all duration-150"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { name: "Explore Events", href: "/events" },
                { name: "Categories", href: "/events" },
                { name: "About Planora", href: "/about-us" },
                { name: "Contact Team", href: "/contact" },
                { name: "Help & FAQ", href: "/help" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-indigo-600 hover:translate-x-0.5 inline-flex items-center gap-1.5 transition-all duration-150"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Hosts (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Community
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { name: "Become a Host", href: "/register" },
                { name: "Organizer Portal", href: "/organizer-dashboard" },
                { name: "User Dashboard", href: "/dashboard" },
                { name: "Digital Tickets", href: "/dashboard/my/tickets" },
                { name: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-indigo-600 hover:translate-x-0.5 inline-flex items-center gap-1.5 transition-all duration-150"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar-style Capsule Newsletter (col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-1.5">
              <Zap size={13} className="text-indigo-600" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Weekly Briefing
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Receive curated event invites, exclusive early-bird ticket releases, and organizer spotlights.
            </p>

            {/* Pill Capsule Input (Exact Sidebar Pattern) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to Planora updates!");
              }}
              className="flex items-center gap-2 p-1.5 pl-3.5 rounded-full border border-slate-200 bg-white hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all shadow-2xs"
            >
              <Mail size={15} className="text-slate-400 shrink-0" />
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-[#4F46E5] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition shrink-0 active:scale-95"
              >
                <span>Join</span>
                <ArrowRight size={12} />
              </button>
            </form>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck size={12} className="text-emerald-600" />
              <span>Zero spam. Strict adherence to our</span>
              <Link href="/privacy-policy" className="text-indigo-600 hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Sub-Footer Meta Bar (Harmonized with Sidebar v2.0 Sub-bar) */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()} Planora Inc. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-slate-400">Planora AI v2.0</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>

            <Link href="/privacy-policy" className="hover:text-indigo-600 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-indigo-600 transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
