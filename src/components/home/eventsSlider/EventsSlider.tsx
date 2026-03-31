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
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { Locate, LocateIcon, Map } from "lucide-react";

type Props = {
  events: Event[];
};

export default function EventsSlider({ events }: Props) {
  console.log(events);

  const router = useRouter();
  const { user } = useAuth();

  const handleViewEvent = (eventId: string) => {
    if (!user) {
      router.push(`/login?redirect=/events/${eventId}`);
    } else {
      router.push(`/events/${eventId}`);
    }
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
          {visibleEvents.map((event) => {
            const date = event?.dateTime ? new Date(event.dateTime) : null;
            return (
              <Card
                key={event.id}
                className="p-3 rounded-4xl bg-muted/40 border shadow flex flex-col gap-3"
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
                    <Card
                      key={event.id}
                      className="p-3 rounded-4xl bg-muted/40 border-2  border-gray-300 flex flex-col gap-3"
                    >
                      {/* Image Section */}
                      <Link
                        href={`/events/${event.id}`}
                        className="relative h-50 xl:h-55 w-full overflow-hidden rounded-2xl group"
                      >
                        {event?.images?.[0] && (
                          <AppImage
                            src={event.images[0]}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}

                        {/* Black Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent pointer-events-none" />

                        {/* Type Badge */}
                        {event.type && (
                          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 text-xs rounded-full font-medium">
                            {event.type}
                          </span>
                        )}

                        {/* Status */}
                        <span className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 text-xs rounded-full flex items-center gap-1">
                          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                          Active
                        </span>
                      </Link>

                      {/* Content */}
                      <CardContent className="pl-2 flex items-center justify-between gap-3">
                        <div className="space-y-1">
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

                        {/* Price */}
                        <span className="text-lg font-bold text-purple-500 whitespace-nowrap">
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