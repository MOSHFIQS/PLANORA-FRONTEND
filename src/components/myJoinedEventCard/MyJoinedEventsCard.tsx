"use client";

import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MyJoinedEvent } from "@/types/joinedEvent.types";
import { AppImage } from "../appImage/AppImage";
import Link from "next/link";
import { usePayment } from "@/hooks/usePayment";

type Props = {
  myEvents: MyJoinedEvent[];
};

const MyJoinedEventsCard = ({ myEvents }: Props) => {
  const { handlePayment, loadingId } = usePayment();

  if (!myEvents?.length) {
    return (
      <p className="p-6 text-center text-muted-foreground">
        You haven't joined any events yet.
      </p>
    );
  }



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myEvents.map((item) => {
        const { event, payment, status } = item;

        const date = event?.dateTime ? new Date(event.dateTime) : null;

        const isPaid =
          payment?.some((p) => p.status === "SUCCESS") || false;

        const isApproved = status === "APPROVED" || isPaid;

        return (
          <Card key={item.id} className="overflow-hidden flex flex-col pt-0">
            {/* IMAGE */}
            <div className="relative h-60 w-full">
              {event?.images?.[0] && (
                <AppImage
                  src={event.images[0]}
                  className="h-full w-full object-cover"
                />
              )}

              <div className="absolute top-3 right-3">
                <Badge variant={isApproved ? "default" : "secondary"}>
                  {isApproved ? "Approved" : "Pending"}
                </Badge>
              </div>
            </div>

            {/* CONTENT */}
            <CardContent className="space-y-3 pt-4">
              <h3 className="font-semibold text-base line-clamp-1">
                {event?.title}
              </h3>

              {date && (
                <p className="text-sm text-muted-foreground">
                  {format(date, "PPP • p")}
                </p>
              )}

              <div className="flex items-center justify-between text-sm">
                {event?.type && (
                  <Badge variant="outline">{event.type}</Badge>
                )}

                <span className="font-medium">{event?.fee} tk</span>
              </div>

              {event?.venue && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {event.venue}
                </p>
              )}
            </CardContent>

            {/* FOOTER */}
            <CardFooter className="mt-auto">
              {isApproved ? (
                <Button className="w-full">
                  <Link href={`/dashboard/participate/${item.id}`}>
                    View Event
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full"
                  disabled={loadingId === item.eventId}
                  onClick={() =>
                    handlePayment({
                      eventId: item.eventId,
                    })
                  }
                >
                  {loadingId === item.eventId ? "Processing..." : "Pay Now"}
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default MyJoinedEventsCard;