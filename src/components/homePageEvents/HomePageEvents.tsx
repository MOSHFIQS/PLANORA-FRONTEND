"use client";

import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "../appImage/AppImage";
import { Event } from "@/types/event.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Map } from "lucide-react";

type Props = {
  events: Event[];
};

const HomePageEvents = ({ events }: Props) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleViewEvent = (eventId: string) => {
    if (!user) {
      router.push(`/login?redirect=/events/${eventId}`);
    } else {
      router.push(`/events/${eventId}`);
    }
  };

  if (!events?.length) {
    return (
      <p className="text-center text-muted-foreground py-10">
        No events found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-10">
      {events.map((event) => {
        const date = event?.dateTime
          ? new Date(event.dateTime)
          : null;

        return (
          // <Card
          //   key={event.id}
          //   className="overflow-hidden flex flex-col p-0 rounded hover:shadow-md transition "
          // >
          //   {/* IMAGE */}
          //   <Link
          //     href={`/event/${event.id}`}
          //     className="relative h-48 w-full overflow-hidden"
          //   >
          //     {event?.images?.[0] && (
          //       <AppImage
          //         src={event.images[0]}
          //         alt={event.title}
          //         className="h-full w-full object-cover hover:scale-105 duration-300"
          //       />
          //     )}
          //   </Link>

          //   {/* CONTENT */}
          //   <CardContent className="space-y-3 pt-4 flex-1">
          //     <h3 className="font-semibold text-base line-clamp-1">
          //       {event.title}
          //     </h3>

          //     {date && (
          //       <p className="text-sm text-muted-foreground">
          //         {format(date, "PPP • p")}
          //       </p>
          //     )}

          //     <div className="flex items-center justify-between text-sm">
          //       {event.type && (
          //         <Badge variant="outline">{event.type}</Badge>
          //       )}

          //       {event.fee === 0 ? (
          //         <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          //           Free
          //         </span>
          //       ) : (
          //         <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          //           {event.fee} tk
          //         </span>
          //       )}
          //     </div>
          //   </CardContent>

          //   {/* BUTTON */}
          //   <div className="p-4 pt-0">
          //     <Button
          //       variant="violet"
          //       className="w-full"
          //       onClick={() => handleViewEvent(event.id)}
          //     >
          //       View Event Info
          //     </Button>
          //   </div>
          // </Card>

          <Card
            key={event.id}
            className="p-3 rounded-4xl  border shadow flex flex-col gap-3"
          >
            {/* Image Section */}
            <Link
              href={`/events/${event.id}`}
              className="relative h-52 xl:h-64 w-full overflow-hidden rounded-2xl group"
            >
              {event?.images?.[0] && (
                <AppImage
                  src={event.images[0]}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}

              {/* 🔥 Black Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent pointer-events-none" />

              {/* Top Left Badge */}
              {event.type && (
                <span className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 text-xs rounded-full font-medium">
                  {event.type}
                </span>
              )}

              {/* Top Right Status */}
              <span className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 text-xs rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                Active
              </span>
            </Link>

            {/* Content */}
            <CardContent className="pl-2 space-y-2 flex gap-2 justify-between items-center">
              <div>
                {/* Date */}
                {date && (
                  <p className="text-sm text-muted-foreground">
                    {format(date, "PPP • p")}
                  </p>
                )}

                {/* Title */}
                <h3 className="font-semibold text-base line-clamp-1">
                  {event.title}
                </h3>

                {/* Location */}
                {event.venue && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Map className="w-4 h-4" />
                    {event.venue}
                  </p>
                )}
              </div>
              <span className="text-lg font-bold text-purple-500">
                {event.fee === 0 ? "Free" : `$${event.fee}`}
              </span>


            </CardContent>

            {/* Button */}
            <Button
              className="w-full rounded-4xl"
              variant="violet"
              onClick={() => handleViewEvent(event.id)}
            >
              View Event Info
            </Button>
          </Card>

        );
      })}
    </div>
  );
};

export default HomePageEvents;