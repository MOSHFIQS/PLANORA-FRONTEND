"use client";

import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "../appImage/AppImage";
import { Event } from "@/types/event.types";
import { usePayment } from "@/hooks/usePayment";

type Props = {
  event: Event;
};

const HomePageEventDetails = ({ event }: Props) => {
  const { handlePayment, loadingId } = usePayment();

  const date = event?.dateTime ? new Date(event.dateTime) : null;
  const isFree = event?.fee === 0;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Event Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {event.images?.map((img, index) => (
          <AppImage
            key={index}
            src={img}
            className="w-full h-48 object-cover rounded-md"
          />
        ))}
      </div>

      {/* Event Info */}
      <Card className="mb-6">
        <CardContent className="space-y-3">
          <h2 className="text-2xl font-bold">{event.title}</h2>

          {date && (
            <p className="text-sm text-muted-foreground">
              {format(date, "PPP • p")}
            </p>
          )}

          {event.venue && (
            <p className="text-sm text-muted-foreground">{event.venue}</p>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline">{event.type}</Badge>
            <span className="font-medium">{event.fee} tk</span>
          </div>

          {event.organizer && (
            <p className="text-sm text-muted-foreground">
              Organized by: {event.organizer.name}
            </p>
          )}

          {event.description && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          )}
        </CardContent>

        {/* Footer Pay Button */}
        {!isFree && (
          <CardFooter className="mt-4">
            <Button
              className="w-full"
              disabled={loadingId === event.id}
              onClick={() =>
                handlePayment({
                  eventId: event.id,
                })
              }
            >
              {loadingId === event.id ? "Processing..." : "Pay Now"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default HomePageEventDetails;