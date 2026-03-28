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
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((ticket) => (
        <Card
          key={ticket.id}
          className="shadow-md border rounded flex flex-col items-center justify-center "
        >
          <CardContent className="flex flex-col items-center gap-4">
            
            {/* Event Name */}
            <h2 className="text-lg font-semibold text-center">
              {ticket.event?.title}
            </h2>

            {/* QR Code */}
            <QRCodeCanvas value={ticket.qrCode} size={160} />

            {/* Status */}
            <Badge
              variant="outline"
              className={
                ticket.status === "VALID"
                  ? "text-green-600 border-green-600"
                  : "text-red-500 border-red-500"
              }
            >
              {ticket.status}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}