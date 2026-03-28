"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { format } from "date-fns";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "@/components/appImage/AppImage";
import { Event } from "@/types/event.types";
import SectionHeader from "@/components/sectionHeader/SectionHeader";

type Props = {
  events: Event[];
};

export default function EventsSlider({ events }: Props) {
  const autoplay = useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

  if (!events?.length) {
    return <p className="text-center text-muted-foreground">No events found.</p>;
  }

  // Show only first 8 events (for homepage behavior)
  const visibleEvents = events.slice(0, 6);

  return (
    <div>
      <SectionHeader
      align="center"
        title="Explore Events"
        description="Discover events based on your interests and join amazing experiences."
      />
      <div className="space-y-6 mt-6">
        {/* GRID FOR SMALL SCREENS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
          {visibleEvents.map((event) => {
            const date = event?.dateTime ? new Date(event.dateTime) : null;
            return (
              <Card key={event.id} className="overflow-hidden flex flex-col p-0 rounded">
                <Link href={`/events/${event.id}`} className="relative  h-50 xl:h-70 w-full overflow-hidden border-b-1">
                  {event?.images?.[0] && (
                    <AppImage
                      src={event.images[0]}
                      className="h-full w-full object-cover hover:scale-105 duration-300"
                    />
                  )}
                </Link>
                <CardContent className="space-y-3 pt-4">
                  <h3 className="font-semibold text-base line-clamp-1">{event.title}</h3>
                  {date && <p className="text-sm text-muted-foreground">{format(date, "PPP • p")}</p>}
                  <div className="flex items-center justify-between text-sm">
                    {event.type && <Badge variant="outline">{event.type}</Badge>}
                    {event.fee === 0 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Free</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{event.fee} tk</span>
                    )}
                  </div>
                </CardContent>
                <Button className="w-full" asChild>
                  <Link href={`/events/${event.id}`}>View Event Info</Link>
                </Button>
              </Card>
            );
          })}
        </div>

        {/* CAROUSEL FOR LARGE SCREENS */}
        <div className="hidden lg:block">
          <Carousel
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            opts={{
              align: "start",
              loop: true,
              containScroll: "trimSnaps",
            }}
          >
            <CarouselContent className="-ml-3 ">
              {events.map((event) => {
                const date = event?.dateTime ? new Date(event.dateTime) : null;
                return (
                  <CarouselItem key={event.id} className="pl-3 basis-1/1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 ">
                    <Card className="overflow-hidden flex flex-col p-0 rounded">
                      <Link href={`/events/${event.id}`} className="relative h-50 xl:h-55 w-full overflow-hidden border-b-1">
                        {event?.images?.[0] && (
                          <AppImage
                            src={event.images[0]}
                            className="h-full w-full object-cover hover:scale-105 duration-300"
                          />
                        )}
                      </Link>
                      <CardContent className="space-y-3 pt-4">
                        <h3 className="font-semibold text-base line-clamp-1">{event.title}</h3>
                        {date && <p className="text-sm text-muted-foreground">{format(date, "PPP • p")}</p>}
                        <div className="flex items-center justify-between text-sm">
                          {event.type && <Badge variant="outline">{event.type}</Badge>}
                          {event.fee === 0 ? (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Free</span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{event.fee} tk</span>
                          )}
                        </div>
                      </CardContent>
                      <Button className="w-full" asChild>
                        <Link href={`/events/${event.id}`}>View Event Info</Link>
                      </Button>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}