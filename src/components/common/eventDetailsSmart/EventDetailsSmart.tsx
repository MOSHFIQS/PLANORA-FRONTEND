"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QRCodeCanvas } from "qrcode.react";
import DescriptionViwer from "../../shared/descriptionViwer/DescriptionViwer";
import { usePayment } from "@/hooks/usePayment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import {
  Download,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Video,
  ArrowLeft,
  Share2,
  Ticket,
  ShieldCheck,
  ExternalLink,
  Check,
  Globe,
  Sparkles,
  Mail,
  UserCheck,
} from "lucide-react";
import ImageMagnifier from "@/components/shared/imageUtils/imageMagnifier/ImageMagnifier";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

type Props = {
  type: "FULL" | "PUBLIC";
  data: any;
};

const EventDetailsSmart = ({ type, data }: Props) => {
  const { handlePayment, loadingId } = usePayment();
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const [copiedLink, setCopiedLink] = useState(false);

  const isFull = type === "FULL";

  const event = isFull ? data?.event : data;
  const ticket = isFull ? data?.ticket : null;
  const payment = isFull ? data?.payment : [];
  const user = isFull ? data?.user : null;
  const status = isFull ? data?.status : null;
  const isJoined = isFull || !!data?.isJoined || status === "APPROVED";
  const isPending = data?.myParticipation?.status === "PENDING";
  const isOrganizer = currentUser?.id && event?.organizerId && currentUser.id === event.organizerId;

  const date = event?.dateTime ? new Date(event.dateTime) : null;
  const isFree = event?.fee === 0;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      toast.success("Event link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]/80 pb-20 pt-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* ── Top Navigation Bar ────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors bg-white px-4 py-2 rounded-md border border-slate-200/90 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white px-4 py-2 rounded-md border border-slate-200/90 shadow-2xs transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Top Airbnb / Luxury Showcase Gallery Grid ──────────────────── */}
      {event?.images?.length > 0 && (
        <div className="w-full">
          <ImageMagnifier images={[...event.images].filter(Boolean)} />
        </div>
      )}

      {/* ── 2-Column Content Flow (Reference Pattern) ──────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Left Column (Content Cards - 8 cols) ─────────────────────── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Header & Pricing Card (Like Reference Header) */}
          <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Big Price */}
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                  Admission
                </span>
                <div className="flex items-baseline gap-1.5">
                  {isFree ? (
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Free</span>
                  ) : (
                    <>
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        ৳{event?.fee}
                      </span>
                      <span className="text-sm font-bold text-slate-500">BDT</span>
                    </>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Active
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  {event?.type || "EVENT"}
                </span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="pt-2 border-t border-slate-100">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {event?.title}
              </h1>
              {event?.subtitle && (
                <p className="mt-1 text-sm sm:text-base text-slate-500">
                  {event.subtitle}
                </p>
              )}
            </div>

            {/* Quick Summary Pill Line */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 flex-wrap pt-2">
              {date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {format(date, "MMM dd, yyyy")}
                </span>
              )}
              {event?.venue && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {event.venue}
                </span>
              )}
              {event?.visibility && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {event.visibility}
                </span>
              )}
            </div>
          </div>

          {/* Card 2: About / Description (Like Reference "About" Card) */}
          <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              About
            </h2>

            {event?.description ? (
              <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
                <DescriptionViwer description={event.description} height="auto" />
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No detailed description available for this event.</p>
            )}
          </div>

          {/* Card 3: Key Details (Exact Reference 3x2 Grid Pattern) */}
          <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Key Details
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-1">
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1">Event Type</span>
                <span className="text-sm sm:text-base font-bold text-slate-800">{event?.type || "N/A"}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1">Admission Fee</span>
                <span className="text-sm sm:text-base font-bold text-slate-800">
                  {isFree ? "Free Entry" : `৳${event?.fee} BDT`}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1">Date</span>
                <span className="text-sm sm:text-base font-bold text-slate-800">
                  {date ? format(date, "MMM dd, yyyy") : "TBA"}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1">Time</span>
                <span className="text-sm sm:text-base font-bold text-slate-800">
                  {date ? format(date, "p") : "TBA"}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1">Location / Venue</span>
                <span className="text-sm sm:text-base font-bold text-slate-800 truncate block">
                  {event?.type === "ONLINE" ? "Online Stream / Meet" : event?.venue || "To be announced"}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block mb-1">Visibility</span>
                <span className="text-sm sm:text-base font-bold text-slate-800">{event?.visibility || "PUBLIC"}</span>
              </div>
            </div>
          </div>

          {/* Card 4: Online Meeting Link (if ONLINE) */}
          {event?.type === "ONLINE" && event?.meetingLink && (
            <div className="bg-linear-to-r from-blue-50 to-indigo-50/50 rounded-md p-6 sm:p-8 border border-blue-200/70 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-blue-950 font-bold text-lg">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span>Live Stream & Meeting Link</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Online Event</Badge>
              </div>

              {isJoined || isOrganizer ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <a
                    href={event.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-sm transition"
                  >
                    <span>Launch Meeting</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <span className="text-xs text-slate-600 font-mono break-all px-3 py-2 bg-white/80 rounded-md border border-blue-100">
                    {event.meetingLink}
                  </span>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-blue-700/80 leading-relaxed">
                  Join or get your ticket to reveal private conference details and meeting access.
                </p>
              )}
            </div>
          )}

          {/* Card 5: Payment & Invoice History (FULL Mode only) */}
          {isFull && payment?.length > 0 && (
            <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Payment & Invoices</span>
              </h2>

              <div className="overflow-x-auto rounded-md border border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="text-center font-semibold text-slate-700">Amount</TableHead>
                      <TableHead className="text-center font-semibold text-slate-700">Status</TableHead>
                      <TableHead className="text-center font-semibold text-slate-700">Transaction ID</TableHead>
                      <TableHead className="text-center font-semibold text-slate-700">Invoice</TableHead>
                      <TableHead className="text-center font-semibold text-slate-700">Paid At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-slate-800 text-sm">
                    {payment.map((p: any) => (
                      <TableRow key={p.id}>
                        <TableCell className="text-center font-semibold">{p.amount} tk</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={
                              p.status === "SUCCESS"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                : p.status === "PENDING"
                                  ? "bg-amber-100 text-amber-800 border-amber-200"
                                  : "bg-rose-100 text-rose-800 border-rose-200"
                            }
                          >
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {p.transactionId ? (
                            <button
                              onClick={() => {
                                const blob = new Blob([p.transactionId], { type: "text/plain" });
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = `transaction-${p.id}.txt`;
                                a.click();
                                window.URL.revokeObjectURL(url);
                              }}
                              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition inline-flex items-center gap-1 text-xs"
                              title="Download Transaction ID"
                            >
                              <Download className="w-3.5 h-3.5 text-slate-600" />
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {p.invoiceUrl ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <a
                                href={p.invoiceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 text-xs rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition"
                              >
                                View
                              </a>
                              <a
                                href={p.invoiceUrl}
                                download
                                target="_blank"
                                className="p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell className="text-center text-xs text-slate-600">
                          {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Card 6: Listing Host / Organizer Card (Exact "Listing Agent" Style) */}
          {event?.organizer && (
            <div className="bg-white rounded-md p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                Listing Host
              </span>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                    {event.organizer.name?.[0] || "O"}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                      {event.organizer.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      {event.organizer.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {event.organizer.email}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        Verified Organizer
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toast.info(`Organizer contact: ${event.organizer.email || "support@planora.com"}`)}
                  className="px-5 py-2 rounded-md border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-100 transition shadow-2xs"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right Column: Sticky Booking / Showing Card (4 cols) ────── */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-md p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-100 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Request to Join
            </h2>

            {/* Quick Pricing Summary */}
            <div className="p-4 rounded-md bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                  Total Due
                </span>
                <span className="text-2xl font-black text-slate-900">
                  {isFree ? "Free" : `৳${event?.fee}`}
                </span>
              </div>
              <div className="px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                General Admission
              </div>
            </div>

            {/* Event Time Pill */}
            {date && (
              <div className="p-3.5 rounded-md bg-violet-50/70 border border-violet-100 flex items-center gap-3 text-xs">
                <Calendar className="w-4 h-4 text-[#4F46E5] shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">{format(date, "EEEE, MMMM d, yyyy")}</p>
                  <p className="text-slate-500">{format(date, "h:mm a")}</p>
                </div>
              </div>
            )}

            {/* Attendee Info (if logged in) */}
            {currentUser && (
              <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200/70 flex items-center gap-3 text-xs">
                <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 truncate">{currentUser.name}</p>
                  <p className="text-slate-500 truncate">{currentUser.email}</p>
                </div>
              </div>
            )}

            {/* Main Action Button (Black Pill Button matching Reference) */}
            <div>
              {isOrganizer ? (
                <div className="w-full py-3.5 text-center bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-md text-xs uppercase tracking-wider">
                  You are the host
                </div>
              ) : isJoined ? (
                <div className="space-y-3">
                  <div className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>You are registered for this event!</span>
                  </div>
                  <button
                    onClick={() => router.push("/dashboard/my/tickets")}
                    className="w-full py-3.5 px-6 rounded-md font-bold text-sm text-white bg-slate-950 hover:bg-slate-800 transition shadow-md"
                  >
                    View My Ticket
                  </button>
                </div>
              ) : isPending ? (
                <div className="w-full py-3.5 text-center bg-amber-50 border border-amber-200 text-amber-800 font-bold rounded-md text-xs flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Registration Pending Approval</span>
                </div>
              ) : !currentUser ? (
                <button
                  onClick={() => {
                    toast.info("Please sign in to join this event");
                    router.push(`/login?redirect=${encodeURIComponent(`/events/${event?.id}`)}`);
                  }}
                  className="w-full py-3.5 px-6 rounded-md font-bold text-sm text-white bg-slate-950 hover:bg-slate-800 transition shadow-md"
                >
                  {isFree ? "Sign In to Join" : `Sign In & Pay (৳${event?.fee})`}
                </button>
              ) : (
                <button
                  disabled={loadingId === event?.id || !event?.id}
                  onClick={() => {
                    if (!event?.id) return;
                    handlePayment({
                      eventId: event.id,
                    });
                  }}
                  className="w-full py-3.5 px-6 rounded-md font-bold text-sm text-white bg-slate-950 hover:bg-slate-800 transition shadow-md disabled:opacity-60"
                >
                  {loadingId === event?.id
                    ? "Processing..."
                    : isFree
                      ? "Join Event Free"
                      : `Request Ticket (৳${event?.fee})`}
                </button>
              )}
            </div>

            {/* Trust Points */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant digital ticket generation & QR pass</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                <span>100% verified organizer on Planora</span>
              </div>
            </div>

            {/* QR Pass (if joined and ticket exists) */}
            {isFull && ticket?.qrCode && (
              <div className="border-t border-slate-100 pt-5 text-center space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Your Digital Ticket Pass
                </span>
                <div className="inline-block p-3 bg-white rounded-md border border-slate-200 shadow-2xs">
                  <QRCodeCanvas value={ticket.qrCode} size={150} />
                </div>
                <p className="text-xs font-semibold text-slate-600">
                  Status: <span className="font-bold text-emerald-600">{ticket.status}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSmart;
