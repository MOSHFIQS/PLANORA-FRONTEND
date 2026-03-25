"use client";

import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "../appImage/AppImage";
import { usePayment } from "@/hooks/usePayment";
import { Event } from "@/types/event.types";

type Props = {
  events: Event[];
};

const HomePageEvents = ({ events }: Props) => {
  const { handlePayment, loadingId } = usePayment();

  if (!events?.length) {
    return (
      <p className="p-6 text-center text-muted-foreground">
        You haven't joined any events yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => {
        const date = event?.dateTime ? new Date(event.dateTime) : null;

        return (
          <Card key={event.id} className="overflow-hidden flex flex-col pt-0">
            {/* IMAGE */}
            <div className="relative h-44 w-full">
              {event?.images?.[0] && (
                <AppImage
                  src={event.images[0]}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* CONTENT */}
            <CardContent className="space-y-3 pt-4">
              <h3 className="font-semibold text-base line-clamp-1">
                {event.title}
              </h3>

              {date && (
                <p className="text-sm text-muted-foreground">
                  {format(date, "PPP • p")}
                </p>
              )}

              <div className="flex items-center justify-between text-sm">
                {event.type && <Badge variant="outline">{event.type}</Badge>}
                <span className="font-medium">{event.fee} tk</span>
              </div>

             
            </CardContent>

            {/* FOOTER */}
            <CardFooter className="mt-auto">
              <Button
                variant="secondary"
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
          </Card>
        );
      })}
    </div>
  );
};

export default HomePageEvents;