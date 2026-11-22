"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  Copy,
  Check,
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
    <div className="min-h-screen bg-[#faf8f5]/60 pb-16 pt-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-xs transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
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

      {/* Main 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Showcase & In-Depth Details (7 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Main Showcase / Image Gallery */}
          {event?.images?.length > 0 && (
            <div className="w-full">
              <ImageMagnifier images={[...event.images].filter(Boolean)} />
            </div>
          )}

          {/* About Event / Description Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span>About this event</span>
            </h2>

            {event?.description ? (
              <div className="text-slate-700 leading-relaxed">
                <DescriptionViwer description={event.description} height="auto" />
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No detailed description provided for this event.</p>
            )}
          </div>

          {/* Online Meeting Link (If Online & available) */}
          {event?.type === "ONLINE" && event?.meetingLink && (
            <div className="bg-linear-to-r from-blue-50 to-indigo-50/50 rounded-3xl p-6 border border-blue-200/70 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span>Online Meeting Link</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Live Access</Badge>
              </div>

              {isJoined || isOrganizer ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={event.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-sm transition"
                  >
                    <span>Join Meeting</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <span className="text-xs text-slate-500 font-mono break-all px-2 py-1 bg-white/70 rounded-md border border-blue-100">
                    {event.meetingLink}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-blue-700/80">
                  Meeting link and access instructions will be unlocked upon joining this event.
                </p>
              )}
            </div>
          )}

          {/* Payment & Invoice Details (FULL Mode only) */}
          {isFull && payment?.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Payment & Invoices</span>
              </h2>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
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
        </div>

        {/* Right Column: Sticky Ticket & Action Sidebar (5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg shadow-slate-100 space-y-6">
            {/* Badges Header */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={`font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                  event?.type === "ONLINE"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {event?.type || "EVENT"}
              </Badge>

              {event?.visibility && (
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {event.visibility}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {event?.title}
              </h1>
              {event?.subtitle && (
                <p className="text-sm text-slate-500 leading-snug">
                  {event.subtitle}
                </p>
              )}
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-orange-100/80 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                  Admission Fee
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  {isFree ? (
                    <span className="text-2xl font-black text-emerald-600">Free</span>
                  ) : (
                    <>
                      <span className="text-2xl font-black text-[#725CAD]">৳{event?.fee}</span>
                      <span className="text-xs font-semibold text-slate-500">BDT</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-600 text-xs font-medium border border-orange-200/50 shadow-2xs">
                <Ticket className="w-3.5 h-3.5 text-[#725CAD]" />
                <span>Standard Entry</span>
              </div>
            </div>

            {/* Main Action Button */}
            <div className="pt-1">
              {isOrganizer ? (
                <div className="w-full py-3.5 text-center bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-2xl text-sm">
                  You are the organizer of this event
                </div>
              ) : isJoined ? (
                <div className="space-y-3">
                  <div className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>You are registered for this event!</span>
                  </div>
                  <Button
                    variant="violet"
                    className="w-full rounded-2xl h-12 text-sm font-semibold shadow-md"
                    onClick={() => router.push("/dashboard/my/tickets")}
                  >
                    View My Ticket
                  </Button>
                </div>
              ) : isPending ? (
                <div className="w-full py-3.5 text-center bg-amber-50 border border-amber-200 text-amber-800 font-semibold rounded-2xl text-sm flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Registration Pending Approval</span>
                </div>
              ) : !currentUser ? (
                <Button
                  variant="violet"
                  className="w-full rounded-2xl h-12 text-sm font-semibold shadow-md"
                  onClick={() => {
                    toast.info("Please sign in to join this event");
                    router.push(`/login?redirect=${encodeURIComponent(`/events/${event?.id}`)}`);
                  }}
                >
                  {isFree ? "Sign In to Join (Free)" : `Sign In to Pay & Join (৳${event?.fee})`}
                </Button>
              ) : (
                <Button
                  variant="violet"
                  className="w-full rounded-2xl h-12 text-sm font-semibold shadow-md"
                  disabled={loadingId === event?.id || !event?.id}
                  onClick={() => {
                    if (!event?.id) return;
                    handlePayment({
                      eventId: event.id,
                    });
                  }}
                >
                  {loadingId === event?.id
                    ? "Processing..."
                    : isFree
                      ? "Join Event (Free)"
                      : `Get Ticket — ৳${event?.fee}`}
                </Button>
              )}
            </div>

            {/* Key Event Details List */}
            <div className="border-t border-slate-100 pt-5 space-y-4 text-sm">
              {/* Date & Time */}
              {date && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 text-[#725CAD] flex items-center justify-center shrink-0 border border-violet-100">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{format(date, "EEEE, MMMM d, yyyy")}</p>
                    <p className="text-xs text-slate-500">{format(date, "h:mm a")}</p>
                  </div>
                </div>
              )}

              {/* Venue */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    {event?.type === "ONLINE" ? "Online Event" : event?.venue || "Venue to be announced"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {event?.type === "ONLINE" ? "Web / Virtual Conferencing" : "Physical location"}
                  </p>
                </div>
              </div>

              {/* Organizer Info */}
              {event?.organizer && (
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-[#725CAD] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    {event.organizer.name?.[0] || "O"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                      Hosted by
                    </span>
                    <p className="font-semibold text-slate-900 text-sm truncate">
                      {event.organizer.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Participant info in FULL mode */}
              {isFull && user && (
                <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-2xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold text-xs shrink-0">
                    {user?.name?.[0] || "P"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase tracking-wider text-purple-600 font-bold block">
                      Ticket Holder
                    </span>
                    <p className="font-semibold text-slate-900 text-xs truncate">{user?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* QR Ticket Preview (FULL Mode only) */}
            {isFull && ticket?.qrCode && (
              <div className="border-t border-slate-100 pt-5 text-center space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Your Digital Ticket Pass
                </span>
                <div className="inline-block p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <QRCodeCanvas value={ticket.qrCode} size={160} />
                </div>
                <p className="text-xs font-medium text-slate-600">
                  Status: <span className="font-semibold text-emerald-600">{ticket.status}</span>
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
