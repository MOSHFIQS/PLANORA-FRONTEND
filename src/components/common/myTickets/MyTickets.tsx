"use client";

import { AppImage } from "@/components/appImage/AppImage";
import { QRCodeCanvas } from "qrcode.react";

type Ticket = {
  id: string;
  qrCode: string;
  status: string;
  checkedInAt?: string | null;
  createdAt?: string;
  eventId?: string;
  participationId?: string;
  userId?: string;
  updatedAt?: string;
  event: {
    title: string;
    description?: string;
    dateTime?: string;
    venue?: string;
    type?: string;
    fee?: number;
    images?: string[];
    meetingLink?: string;
  };
};

type Props = { data: Ticket[] };

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: "9px" }} className="font-semibold uppercase tracking-wide text-white/40 leading-none">{label}</p>
      <p style={{ fontSize: "10px" }} className="font-medium text-white mt-0.5 leading-tight">{value}</p>
    </div>
  );
}

export default function MyTickets({ data }: Props) {
  if (!data || data.length === 0)
    return <p className="p-6 text-center text-muted-foreground">No tickets found.</p>;

  return (
    <div className="p-3 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
      {data.map((ticket) => {
        const eventImage = ticket.event?.images?.[0];
        const isValid = ticket.status === "VALID";

        return (
          <div
            key={ticket.id}
            className="flex rounded-xl overflow-visible"
            style={{ background: "#355872", fontFamily: "'Inter','Segoe UI',sans-serif" }}
          >
            {/* LEFT: Image */}
            <div className="relative flex-shrink-0" style={{ width: "80px", minHeight: "110px" }}>
              <div className="absolute inset-0 p-1.5">
                {eventImage ? (
                  <AppImage src={eventImage} alt={ticket.event.title} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-full rounded-lg" style={{ background: "linear-gradient(135deg,#6b21a8,#3b82f6)" }} />
                )}
                <div
                  className="absolute inset-1.5 rounded-lg flex flex-col justify-end p-1.5"
                  style={{ background: "linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 60%)" }}
                >
                  <p className="text-white font-bold leading-tight line-clamp-3" style={{ fontSize: "9px" }}>
                    {ticket.event.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="relative flex-shrink-0" style={{ width: "12px" }}>
              {["-6px", "auto"].map((t, i) => (
                <div key={i} className="absolute rounded-full z-10" style={{ width: "12px", height: "12px", background: "#f3f2ec", top: i === 0 ? "-6px" : "auto", bottom: i === 1 ? "-6px" : "auto", left: "50%", transform: "translateX(-50%)" }} />
              ))}
              <div className="h-full mx-auto" style={{ borderLeft: "1.5px dashed rgba(255,255,255,0.2)", width: "0" }} />
            </div>

            {/* MIDDLE: Details */}
            <div className="flex-1 py-2 pr-1 flex flex-col justify-center gap-1.5 min-w-0">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                <Info label="ID" value={ticket.id.slice(0, 8).toUpperCase()} />
                <Info
                  label="Status"
                  value={
                    <span className="inline-block px-1.5 py-px rounded-full font-semibold" style={{ fontSize: "9px", background: isValid ? "#dcfce7" : "#fee2e2", color: isValid ? "#15803d" : "#dc2626" }}>
                      {ticket.status}
                    </span>
                  }
                />
                <Info label="Type" value={ticket.event.type || "—"} />
                <Info label="Fee" value={ticket.event.fee != null ? `$${ticket.event.fee}` : "Free"} />
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }} />
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                <Info label="Venue" value={ticket.event.venue || "—"} />
                <Info label="Date" value={formatDate(ticket.event.dateTime)} />
                <Info label="Time" value={formatTime(ticket.event.dateTime)} />
              </div>
            </div>

            {/* Separator */}
            <div className="relative flex-shrink-0" style={{ width: "12px" }}>
              {["-6px", "auto"].map((t, i) => (
                <div key={i} className="absolute rounded-full z-10" style={{ width: "12px", height: "12px", background: "#f3f2ec", top: i === 0 ? "-6px" : "auto", bottom: i === 1 ? "-6px" : "auto", left: "50%", transform: "translateX(-50%)" }} />
              ))}
              <div className="h-full mx-auto" style={{ borderLeft: "1.5px dashed rgba(255,255,255,0.2)", width: "0" }} />
            </div>

            {/* RIGHT: QR */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center p-2  gap-1" style={{ width: "68px" }}>
              <p className="font-bold text-white/70 text-center leading-tight" style={{ fontSize: "9px" }}>Scan to Enter</p>
              <div className="bg-white p-1 rounded-md">
                <QRCodeCanvas value={ticket.qrCode} size={48} />
              </div>
              <p className="text-white/35 text-center leading-tight" style={{ fontSize: "8px" }}>Thank you!</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}