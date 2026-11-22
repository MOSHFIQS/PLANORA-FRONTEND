"use client";

import { Badge } from "@/components/ui/badge";
import DescriptionViwer from "../shared/descriptionViwer/DescriptionViwer";
import ImageMagnifier from "../shared/imageUtils/imageMagnifier/ImageMagnifier";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Globe,
  Video,
  ExternalLink,
  Users,
  MailCheck,
  Star,
  Clock,
  ArrowLeft,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

export type EventType = "ONLINE" | "OFFLINE";
export type Visibility = "PUBLIC" | "PRIVATE";
export type InvitationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
  status: string;
  isDeleted: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface IInvitation {
  id: string;
  eventId: string;
  userId: string;
  status: InvitationStatus;
  createdAt: string;
}

export interface IParticipation {
  id: string;
  eventId: string;
  userId: string;
  createdAt: string;
}

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  eventId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  venue: string | null;
  meetingLink: string | null;
  type: EventType;
  visibility: Visibility;
  fee: number;
  isFeatured: boolean;
  categoryId: string;
  organizerId: string;
  dateTime: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  organizer: IUser;
  invitations: IInvitation[];
  participations: IParticipation[];
  reviews: IReview[];
}

const EventDetails = ({ event }: { event: IEvent }) => {
  const router = useRouter();
  const date = event?.dateTime ? new Date(event.dateTime) : null;
  const isFree = event?.fee === 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC]/80 pb-20 pt-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors bg-white px-4 py-2 rounded-md border border-slate-200/90 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          {event?.isFeatured && (
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">Featured Event</Badge>
          )}
          <a
            href={`/events/${event?.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white px-4 py-2 rounded-md border border-slate-200/90 shadow-2xs transition-colors"
          >
            <span>View Public Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ── Top Interactive Gallery (Left Hero + Right 2x2 Grid) ──────── */}
      {event?.images?.length > 0 && (
        <div className="w-full">
          <ImageMagnifier images={[...event.images].filter(Boolean)} />
        </div>
      )}

      {/* ── 2-Column Split Details Flow ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Header & Pricing Card */}
          <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                  Admission Fee
                </span>
                <div className="flex items-baseline gap-1.5">
                  {isFree ? (
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Free</span>
                  ) : (
                    <>
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        ৳{event?.fee}
                      </span>
                      
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Active
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  {event?.type || "EVENT"}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {event?.title}
              </h1>
            </div>

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

          {/* Card 2: About / Description */}
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

          {/* Card 3: Key Details Grid */}
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
                  {isFree ? "Free Entry" : `৳${event?.fee}`}
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
                  <span>Online Meeting Access</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Online Stream</Badge>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-sm transition"
                >
                  <span>Launch Link</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-xs text-slate-600 font-mono break-all px-3 py-2 bg-white/80 rounded-md border border-blue-100">
                  {event.meetingLink}
                </span>
              </div>
            </div>
          )}

          {/* Card 5: Listing Host / Organizer */}
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
                        Organizer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols - Sticky Metrics & Info) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-md p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-100 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Event Management
            </h2>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200/70 text-center">
                <MailCheck className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                <span className="text-lg font-black text-slate-900 block leading-tight">
                  {event?.invitations?.length || 0}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Invites</span>
              </div>
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200/70 text-center">
                <Users className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-lg font-black text-slate-900 block leading-tight">
                  {event?.participations?.length || 0}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Joined</span>
              </div>
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200/70 text-center">
                <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <span className="text-lg font-black text-slate-900 block leading-tight">
                  {event?.reviews?.length || 0}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Reviews</span>
              </div>
            </div>

            {/* Event Timing Reminder */}
            {date && (
              <div className="p-3.5 rounded-md bg-indigo-50/70 border border-indigo-100 flex items-center gap-3 text-xs">
                <Calendar className="w-4 h-4 text-[#4F46E5] shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">{format(date, "EEEE, MMMM d, yyyy")}</p>
                  <p className="text-slate-500">{format(date, "h:mm a")}</p>
                </div>
              </div>
            )}

            {/* Timestamp Meta */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-500">
              <div className="flex items-center justify-between">
                <span>Created:</span>
                <span className="font-semibold text-slate-700">
                  {event?.createdAt ? new Date(event.createdAt).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Updated:</span>
                <span className="font-semibold text-slate-700">
                  {event?.updatedAt ? new Date(event.updatedAt).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>

            {/* Trust points */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Synchronized with Planora Public Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
