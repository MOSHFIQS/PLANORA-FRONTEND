"use client";

import { Menu, LayoutDashboard, Ticket, Settings, LogOut, User, Store } from "lucide-react";
import NotificationBell from "@/components/home/notification/NotificationBell";
import { Button } from "@/components/ui/button";
import {
     Sheet,
     SheetContent,
     SheetHeader,
     SheetTitle,
     SheetTrigger,
} from "@/components/ui/sheet";
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../../ui/input";
import { useRef, useState, useEffect } from "react";
import { MapPin, Calendar, Loader2, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { apiFetchClient } from "@/lib/apiFetchClient";

type NavEvent = {
     id: string;
     title: string;
     venue?: string;
     dateTime: string;
     fee: number;
     images: string[];
};

function formatDate(dateStr: string) {
     return new Date(dateStr).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
     });
}

// ─── Search Dropdown ───────────────────────────────────────────────────────────
function SearchDropdown({
     searchQuery,
     searchResults,
     searchLoading,
     onNavigate,
     onClose,
}: {
     searchQuery: string;
     searchResults: NavEvent[];
     searchLoading: boolean;
     onNavigate: (id: string) => void;
     onClose: () => void;
}) {
     if (!searchQuery.trim()) return null;

     return (
          <div className="absolute top-full mt-2 left-0 z-[999] w-full">
               <Card className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-xl">

                    {/* Header */}
                    <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100 bg-gray-50/80">
                         <div className="flex items-center gap-2">
                              <Search size={12} className="text-orange-400" />
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                   Search Results
                              </span>
                              {!searchLoading && searchResults.length > 0 && (
                                   <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600">
                                        {searchResults.length} found
                                   </span>
                              )}
                         </div>
                         {searchLoading && (
                              <Loader2 size={11} className="animate-spin text-orange-500" />
                         )}
                    </div>

                    {/* Results list */}
                    <div className="p-2 flex flex-col gap-1 max-h-80 overflow-y-auto [scrollbar-width:none] bg-white">
                         {searchLoading ? (
                              <div className="flex flex-col items-center justify-center py-10 gap-2">
                                   <Loader2 size={20} className="animate-spin text-orange-400" />
                                   <span className="text-xs text-gray-400">Searching events…</span>
                              </div>
                         ) : searchResults.length > 0 ? (
                              searchResults.map((event) => (
                                   <button
                                        key={event.id}
                                        onClick={() => { onNavigate(event.id); onClose(); }}
                                        className="flex items-center gap-3 px-3 py-3 rounded-xl w-full text-left border  hover:border-orange-100 hover:bg-orange-50/60 transition-all duration-150 group"
                                   >
                                        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 bg-gray-100">
                                             {event.images?.[0] ? (
                                                  <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                                             ) : (
                                                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                                                       <Calendar size={20} className="text-white/70" />
                                                  </div>
                                             )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                             <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                                                  {event.title}
                                             </p>
                                             <p className="text-[11px] flex items-center gap-1 truncate mt-0.5 text-gray-400">
                                                  {event.venue ? (
                                                       <><MapPin size={10} className="flex-shrink-0" />{event.venue}</>
                                                  ) : (
                                                       <><Calendar size={10} className="flex-shrink-0" />{formatDate(event.dateTime)}</>
                                                  )}
                                             </p>
                                             <p className="text-[10px] text-gray-300 mt-0.5">
                                                  {formatDate(event.dateTime)}
                                             </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                             <span className={`text-[11px] font-bold px-2 py-1 rounded-lg border ${event.fee === 0
                                                  ? "bg-green-50 text-green-700 border-green-200"
                                                  : "bg-orange-50 text-orange-700 border-orange-200"
                                                  }`}>
                                                  {event.fee === 0 ? "Free" : `৳${event.fee}`}
                                             </span>
                                        </div>
                                   </button>
                              ))
                         ) : (
                              <div className="flex flex-col items-center justify-center py-10 gap-2">
                                   <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Search size={18} className="text-gray-300" />
                                   </div>
                                   <p className="text-sm font-medium text-gray-400">No events found</p>
                                   <p className="text-xs text-gray-300">
                                        Try searching &quot;{searchQuery}&quot; differently
                                   </p>
                              </div>
                         )}
                    </div>

                    {/* Footer */}
                    {searchResults.length > 0 && (
                         <div className="border-t border-gray-100 bg-gray-50/50">
                              <Link href={`/events?search=${searchQuery}`}
                                   onClick={onClose}
                                   className="w-full px-4 py-2.5 text-xs font-semibold text-center text-orange-500 hover:bg-orange-50 transition-colors flex items-center justify-center gap-1"
                              >
                                   View all results for &quot;{searchQuery}&quot; →
                              </Link>
                         </div>
                    )}
               </Card>
          </div>
     );
}
// ─── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
     const { user, logout, loading } = useAuth();
     const router = useRouter();
     const pathname = usePathname();

     const basePath =
          user?.role === "ADMIN"
               ? "/admin-dashboard"
               : user?.role === "ORGANIZER"
                    ? "/organizer-dashboard"
                    : user?.role === "SUPERADMIN"
                         ? "/super-admin-dashboard"
                         : user?.role === "USER"
                              ? "/dashboard"
                              : "/";

     const [search, setSearch] = useState("");
     const [searchQuery, setSearchQuery] = useState("");
     const [searchResults, setSearchResults] = useState<NavEvent[]>([]);
     const [searchLoading, setSearchLoading] = useState(false);
     const [dropdownOpen, setDropdownOpen] = useState(false);
     const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

     const desktopSearchRef = useRef<HTMLDivElement>(null);
     const mobileSearchRef = useRef<HTMLDivElement>(null);

     // ── Fetch search results with debounce ──────────────────────────────────
     useEffect(() => {
          if (!searchQuery.trim()) {
               setSearchResults([]);
               return;
          }
          const controller = new AbortController();
          async function fetchSearch() {
               setSearchLoading(true);
               try {
                    const res = await apiFetchClient(
                         `/event?searchTerm=${encodeURIComponent(searchQuery.trim())}&limit=5`
                    );
                    if (res.ok && res.data) {
                         const dataPayload = res.data?.data;
                         const eventArray = Array.isArray(dataPayload)
                              ? dataPayload
                              : Array.isArray(dataPayload?.data)
                                   ? dataPayload.data
                                   : [];
                         setSearchResults(eventArray.slice(0, 5));
                    }
               } catch (e) {
                    if (!controller.signal.aborted) console.error("Navbar search failed", e);
               } finally {
                    if (!controller.signal.aborted) setSearchLoading(false);
               }
          }
          const timer = setTimeout(fetchSearch, 400);
          return () => { clearTimeout(timer); controller.abort(); };
     }, [searchQuery]);

     // ── Outside click handler ───────────────────────────────────────────────
     useEffect(() => {
          const handler = (e: MouseEvent) => {
               if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target as Node)) {
                    setDropdownOpen(false);
               }
               if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)) {
                    setMobileDropdownOpen(false);
               }
          };
          document.addEventListener("mousedown", handler);
          return () => document.removeEventListener("mousedown", handler);
     }, []);

     const handleLogout = () => {
          logout();
          router.push("/");
     };

     const menu = [
          { title: "Home", url: "/" },
          { title: "Events", url: "/events" },
          { title: "Contact", url: "/contact" },
          { title: "About", url: "/about-us" },
          { title: "Help", url: "/help" },
     ];

     const handleSearch = (value: string) => {
          setSearch(value);
          setSearchQuery(value);
          setDropdownOpen(!!value.trim());
     };

     const handleMobileSearch = (value: string) => {
          setSearch(value);
          setSearchQuery(value);
          setMobileDropdownOpen(!!value.trim());
     };

     // ── Navigate to event — redirect to login if not logged in ──────────────
     const navigateToEvent = (id: string) => {
          setDropdownOpen(false);
          setMobileDropdownOpen(false);
          setSearch("");
          setSearchQuery("");
          if (!user?.id) {
               router.push(`/login?redirect=/events/${id}`);
          } else {
               router.push(`/events/${id}`);
          }
     };

     // ── Nav link click — protect event links for guests ─────────────────────


     const isActive = (url: string) => {
          if (url === "/") return pathname === "/";
          return pathname === url || pathname.startsWith(url + "/");
     };

     if (loading) {
          return (
               <section className="py-4">
                    <div className="h-10" />
               </section>
          );
     }

     return (
          <section className="py-6 sticky top-0 z-50 bg-[#F3F2EC]">
               <div>
                    {/* ================= DESKTOP ================= */}
                    {/* ================= DESKTOP ================= */}
                    <nav className="hidden items-center justify-between lg:flex px-4">
                         <div className="flex items-center justify-center gap-10">
                              {/* Logo */}
                              <Link href="/" className="flex items-center gap-2">
                                   <img src="/logo/logo.png" className="max-h-8" />
                                   <span className="text-lg font-semibold text-gray-900">PLANORA</span>
                              </Link>

                              {/* Menu */}
                              <div className="flex items-center gap-1">
                                   {menu.map((item) => (
                                        <Link
                                             key={item.title}
                                             href={item.url}
                                             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${isActive(item.url)
                                                  ? "bg-[#FE7743] text-white"
                                                  : "text-gray-600 bg-white hover:text-gray-900"
                                                  }`}
                                        >
                                             {item.title}
                                        </Link>
                                   ))}
                              </div>
                         </div>

                         {/* Search + Auth */}
                         <div className="flex items-center gap-1">

                              {user?.id ? (
                                   // ── LOGGED IN: search + profile ──────────────────────────────
                                   <>
                                        <div ref={desktopSearchRef} className="relative">
                                             <Input
                                                  placeholder="Search Events..."
                                                  value={search}
                                                  onChange={(e) => handleSearch(e.target.value)}
                                                  onFocus={() => search.trim() && setDropdownOpen(true)}
                                                  className="w-64 bg-white border-gray-200 rounded-full pl-5 text-sm focus:border-orange-300 focus:ring-orange-100"
                                             />
                                             {dropdownOpen && (
                                                  <SearchDropdown
                                                       searchQuery={searchQuery}
                                                       searchResults={searchResults}
                                                       searchLoading={searchLoading}
                                                       onNavigate={navigateToEvent}
                                                       onClose={() => setDropdownOpen(false)}
                                                  />
                                             )}
                                        </div>

                                        {/* Notification Bell */}
                                        <NotificationBell />

                                        <DropdownMenu>
                                             <DropdownMenuTrigger asChild>
                                                  <button className="relative flex items-center gap-2 rounded-full pl-2 pr-3 py-1 border border-gray-200 bg-white hover:bg-gray-50 shadow-sm transition-all hover:shadow-md group focus:outline-none">
                                                       <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#FE7743]/30 group-hover:border-[#FE7743]/60 transition-colors">
                                                            <img
                                                                 src={user.image || "https://i.ibb.co.com/LhN7fmfM/5578a3db8b5f1101c971bdf120e63784.jpg"}
                                                                 alt="User avatar"
                                                                 className="w-full h-full object-cover"
                                                                 onError={(e) => { e.currentTarget.src = "https://i.ibb.co.com/LhN7fmfM/5578a3db8b5f1101c971bdf120e63784.jpg"; }}
                                                            />
                                                       </div>
                                                       <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                                                            {user.name?.split(" ")[0] || "My Account"}
                                                       </span>
                                                       <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FE7743] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                       </svg>
                                                  </button>
                                             </DropdownMenuTrigger>

                                             <DropdownMenuContent align="end" sideOffset={8} className="w-64 p-0 overflow-hidden rounded-2xl shadow-xl border-2 border-gray-200">
                                                  <DropdownMenuLabel className="p-0">
                                                       <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-br from-[#FE7743]/10 to-[#FE7743]/5 border-b border-gray-100">
                                                            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#FE7743]/40 shrink-0">
                                                                 <img
                                                                      src={user.image || "https://i.ibb.co.com/LhN7fmfM/5578a3db8b5f1101c971bdf120e63784.jpg"}
                                                                      alt="avatar"
                                                                      className="w-full h-full object-cover"
                                                                      onError={(e) => { e.currentTarget.src = "https://i.ibb.co.com/LhN7fmfM/5578a3db8b5f1101c971bdf120e63784.jpg"; }}
                                                                 />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                 <p className="text-sm font-semibold text-gray-900 truncate">{user.name || "User"}</p>
                                                                 <p className="text-xs text-gray-500 truncate">{user.email || ""}</p>
                                                                 <span className="inline-flex items-center mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FE7743]/15 text-[#FE7743]">
                                                                      {user.role || "Member"}
                                                                 </span>
                                                            </div>
                                                       </div>
                                                  </DropdownMenuLabel>

                                                  <div className="p-1.5">
                                                       <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 group" onClick={() => router.push(`${basePath}/my/profile`)}>
                                                            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                                                 <User className="w-4 h-4 text-purple-500" />
                                                            </div>
                                                            <div>
                                                                 <p className="text-sm font-medium text-gray-800">My Profile</p>
                                                                 <p className="text-xs text-gray-400">View & edit profile</p>
                                                            </div>
                                                       </DropdownMenuItem>

                                                       <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 group" onClick={() => router.push(`${basePath}`)}>
                                                            <div className="w-8 h-8 rounded-lg bg-[#FE7743]/10 flex items-center justify-center group-hover:bg-[#FE7743]/20 transition-colors">
                                                                 <LayoutDashboard className="w-4 h-4 text-[#FE7743]" />
                                                            </div>
                                                            <div>
                                                                 <p className="text-sm font-medium text-gray-800">Dashboard</p>
                                                                 <p className="text-xs text-gray-400">Manage your account</p>
                                                            </div>
                                                       </DropdownMenuItem>

                                                       <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 group" onClick={() => router.push(`${basePath}/my/tickets`)}>
                                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                                                 <Ticket className="w-4 h-4 text-blue-500" />
                                                            </div>
                                                            <div>
                                                                 <p className="text-sm font-medium text-gray-800">My Tickets</p>
                                                                 <p className="text-xs text-gray-400">View your tickets</p>
                                                            </div>
                                                       </DropdownMenuItem>

                                                       <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 group" onClick={() => router.push(`${basePath}/my/participated-events`)}>
                                                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                                                 <Store className="w-4 h-4 text-green-500" />
                                                            </div>
                                                            <div>
                                                                 <p className="text-sm font-medium text-gray-800">My Participated Events</p>
                                                                 <p className="text-xs text-gray-400">View your participated events</p>
                                                            </div>
                                                       </DropdownMenuItem>


                                                  </div>

                                                  <DropdownMenuSeparator className="my-0" />

                                                  <div className="p-1.5">
                                                       <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-red-50 group" onClick={handleLogout}>
                                                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                                                 <LogOut className="w-4 h-4 text-red-500" />
                                                            </div>
                                                            <p className="text-sm font-medium text-red-600">Logout</p>
                                                       </DropdownMenuItem>
                                                  </div>
                                             </DropdownMenuContent>
                                        </DropdownMenu>
                                   </>
                              ) : (
                                   // ── GUEST: search + login + register ─────────────────────────
                                   <>
                                        {/* Search wrapper — right-aligned so dropdown opens leftward */}
                                        <div ref={desktopSearchRef} className="relative">
                                             <Input
                                                  placeholder="Search Events..."
                                                  value={search}
                                                  onChange={(e) => handleSearch(e.target.value)}
                                                  onFocus={() => search.trim() && setDropdownOpen(true)}
                                                  className="w-64 bg-white border-gray-200 rounded-full pl-5 text-sm focus:border-orange-300 focus:ring-orange-100"
                                             />
                                             {dropdownOpen && (
                                                  <SearchDropdown
                                                       searchQuery={searchQuery}
                                                       searchResults={searchResults}
                                                       searchLoading={searchLoading}
                                                       onNavigate={navigateToEvent}
                                                       onClose={() => setDropdownOpen(false)}
                                                  />
                                             )}
                                        </div>

                                        <Button asChild variant="outline" className="rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                                             <Link href={`/login?redirect=${pathname}`}>Login</Link>
                                        </Button>
                                        <Button asChild className="rounded-full bg-[#FE7743] hover:bg-orange-500 text-white border-0">
                                             <Link href="/register">Register</Link>
                                        </Button>
                                   </>
                              )}
                         </div>
                    </nav>

                    {/* ================= MOBILE ================= */}
                    <div className="flex items-center justify-between lg:hidden px-4">
                         <Link href="/" className="flex items-center gap-2">
                              <img src="/logo/logo.png" className="h-8" />
                              <span className="font-semibold text-gray-900">PLANORA</span>
                         </Link>

                         <Sheet>
                              <SheetTrigger asChild>
                                   <Button variant="outline" size="icon" className="bg-white border-gray-200">
                                        <Menu className="w-5 h-5 text-gray-600" />
                                   </Button>
                              </SheetTrigger>

                              <SheetContent
                                   side="right"
                                   className="w-[300px] bg-white flex flex-col h-screen"
                              >
                                   {/* Header (fixed) */}
                                   <SheetHeader className="px-3 py-3 border-b border-gray-100">
                                        <SheetTitle className="text-center text-xl font-bold text-gray-900">
                                             PLANORA
                                        </SheetTitle>
                                   </SheetHeader>

                                   {/* Scrollable content */}
                                   <div className="flex-1 overflow-y-auto px-3 pb-4">
                                        <div className="flex flex-col gap-4 mt-4">
                                             {/* Mobile Search */}
                                             <div ref={mobileSearchRef} className="relative w-full">
                                                  <Input
                                                       placeholder="Search Events..."
                                                       value={search}
                                                       onChange={(e) => handleMobileSearch(e.target.value)}
                                                       onFocus={() => search.trim() && setMobileDropdownOpen(true)}
                                                       className="w-full bg-white border-gray-200"
                                                  />
                                                  {mobileDropdownOpen && (
                                                       <SearchDropdown
                                                            searchQuery={searchQuery}
                                                            searchResults={searchResults}
                                                            searchLoading={searchLoading}
                                                            onNavigate={navigateToEvent}
                                                            onClose={() => setMobileDropdownOpen(false)}
                                                       />
                                                  )}
                                             </div>

                                             {/* Mobile user card */}
                                             {user?.id && (
                                                  <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-gradient-to-br from-[#FE7743]/10 to-[#FE7743]/5 border border-orange-100">
                                                       <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FE7743]/30">
                                                            <img
                                                                 src={
                                                                      user.image ||
                                                                      "https://i.ibb.co.com/LhN7fmfM/5578a3db8b5f1101c971bdf120e63784.jpg"
                                                                 }
                                                                 alt="avatar"
                                                                 className="w-full h-full object-cover"
                                                                 onError={(e) => {
                                                                      e.currentTarget.src =
                                                                           "https://i.ibb.co.com/LhN7fmfM/5578a3db8b5f1101c971bdf120e63784.jpg";
                                                                 }}
                                                            />
                                                       </div>
                                                       <div className="min-w-0">
                                                            <p className="text-xs font-semibold text-gray-900 truncate">
                                                                 {user.name || "User"}
                                                            </p>
                                                            <p className="text-[10px] text-gray-400 truncate">
                                                                 {user.email || ""}
                                                            </p>
                                                            <span className="inline-flex items-center mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-medium bg-[#FE7743]/15 text-[#FE7743]">
                                                                 {user.role || "Member"}
                                                            </span>
                                                       </div>
                                                  </div>
                                             )}

                                             {/* Menu */}
                                             <div className="flex flex-col gap-1.5">
                                                  {menu.map((item) => (
                                                       <Link
                                                            key={item.title}
                                                            href={item.url}
                                                       >
                                                            <button
                                                                 className={`w-full text-left px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive(item.url)
                                                                      ? "bg-[#FE7743] text-white"
                                                                      : "text-gray-600 border border-gray-200 bg-white hover:bg-gray-50"
                                                                      }`}
                                                            >
                                                                 {item.title}
                                                            </button>
                                                       </Link>
                                                  ))}
                                             </div>

                                             {/* Notification Bell — mobile */}
                                             {user?.id && (
                                                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 bg-white">
                                                       <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                                                            <NotificationBell />
                                                       </div>
                                                       <span className="text-sm font-medium text-gray-700">Notifications</span>
                                                  </div>
                                             )}

                                             <div className="border-t border-gray-100 my-1" />

                                             {/* Auth */}
                                             <div className="flex flex-col gap-2">
                                                  {user?.id ? (
                                                       <>
                                                            <Link href={`${basePath}/my/profile`}>
                                                                 <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm border border-gray-100 bg-white hover:bg-gray-50 transition-colors group">
                                                                      <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                                                                           <User size={13} className="text-purple-500" />
                                                                      </div>
                                                                      <span className="font-medium text-gray-700">
                                                                           My Profiles
                                                                      </span>
                                                                 </button>
                                                            </Link>

                                                            <Link href={`${basePath}`}>
                                                                 <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm border border-gray-100 bg-white hover:bg-orange-50 transition-colors group">
                                                                      <div className="w-7 h-7 rounded-lg bg-[#FE7743]/10 flex items-center justify-center">
                                                                           <LayoutDashboard size={13} className="text-[#FE7743]" />
                                                                      </div>
                                                                      <span className="font-medium text-gray-700">
                                                                           Dashboard
                                                                      </span>
                                                                 </button>
                                                            </Link>

                                                            <Link href={`${basePath}/my/tickets`}>
                                                                 <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm border border-gray-100 bg-white hover:bg-blue-50 transition-colors">
                                                                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                                                                           <Ticket size={13} className="text-blue-500" />
                                                                      </div>
                                                                      <span className="font-medium text-gray-700">
                                                                           My Tickets
                                                                      </span>
                                                                 </button>
                                                            </Link>

                                                            <Link href={`${basePath}/my/participated-events`}>
                                                                 <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm border border-gray-100 bg-white hover:bg-blue-50 transition-colors">
                                                                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                                                                           <Ticket size={13} className="text-blue-500" />
                                                                      </div>
                                                                      <span className="font-medium text-gray-700">
                                                                           My Participated Events
                                                                      </span>
                                                                 </button>
                                                            </Link>

                                                            <button
                                                                 onClick={handleLogout}
                                                                 className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
                                                            >
                                                                 <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                                                                      <LogOut size={13} className="text-red-500" />
                                                                 </div>
                                                                 <span className="font-medium text-red-600">Logout</span>
                                                            </button>
                                                       </>
                                                  ) : (
                                                       <>
                                                            <Button
                                                                 asChild
                                                                 variant="outline"
                                                                 className="w-full rounded-full border-gray-300 bg-white"
                                                            >
                                                                 <Link href={`/login?redirect=${pathname}`}>Login</Link>
                                                            </Button>

                                                            <Button
                                                                 asChild
                                                                 className="w-full rounded-full bg-[#FE7743] hover:bg-orange-500 text-white border-0"
                                                            >
                                                                 <Link href="/register">Register</Link>
                                                            </Button>
                                                       </>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              </SheetContent>
                         </Sheet>
                    </div>
               </div>
          </section>
     );
};

export { Navbar };