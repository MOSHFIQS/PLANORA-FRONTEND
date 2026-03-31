"use client";

import { QRCodeCanvas } from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Ticket = {
  id: string;
  qrCode: string;
  status: string;
  event: {
    title: string;
  };
};

type Props = {
  data: Ticket[];
};

export default function MyTickets({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <p className="p-6 text-center text-muted-foreground">
        No tickets found.
      </p>
    );
  }

  return (
    <div className="p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((ticket) => (
        <Card
  key={ticket.id}
  className="p-4 rounded-4xl bg-muted/40 border-2 border-gray-300 flex flex-col items-center justify-center gap-4"
>
  <CardContent className="p-0 flex flex-col items-center gap-4">
    
    {/* Event Name */}
    <h2 className="text-base font-semibold text-center line-clamp-2">
      {ticket.event?.title}
    </h2>

    {/* QR Wrapper (styled like image container) */}
    <div className="relative p-3 rounded-2xl bg-white border shadow-sm">
      <QRCodeCanvas value={ticket.qrCode} size={140} />
    </div>

    {/* Status */}
    <span
      className={`px-4 py-1 rounded-full text-xs font-medium ${
        ticket.status === "VALID"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {ticket.status}
    </span>
  </CardContent>
</Card>
      ))}
    </div>
  );
}