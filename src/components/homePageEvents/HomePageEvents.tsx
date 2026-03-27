"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "../appImage/AppImage";
import { Event } from "@/types/event.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = {
  id: string;
  name: string;
};

type Props = {
  events: Event[];
  search: string;
  categories: Category[];
};

const HomePageEvents = ({ events, search = "", categories }: Props) => {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredEvents = events?.filter((event) => {
    const matchSearch = event.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "ALL"
        ? true
        : event.categoryId === selectedCategory;

    return matchSearch && matchCategory;
  });

  const visibleEvents =
    pathname === "/" ? filteredEvents.slice(0, 8) : filteredEvents;

  return (
    <div className="space-y-6 mt-6">
      
      {/* ✅ CATEGORY BUTTONS ONLY ON NON-HOME ROUTES */}
      {pathname !== "/" && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "ALL" ? "default" : "outline"}
            onClick={() => setSelectedCategory("ALL")}
          >
            All
          </Button>

          {categories?.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      )}

      {/* GRID / NO DATA */}
      {!visibleEvents?.length ? (
        <p className="text-center text-muted-foreground">
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleEvents.map((event) => {
            const date = event?.dateTime
              ? new Date(event.dateTime)
              : null;

            return (
              <Card key={event.id} className="overflow-hidden flex flex-col p-0">
                <Link
                  href={`/event/${event.id}`}
                  className="relative h-70 w-full overflow-hidden border-b-1"
                >
                  {event?.images?.[0] && (
                    <AppImage
                      src={event.images[0]}
                      className="h-full w-full object-cover hover:scale-105 duration-300"
                    />
                  )}
                </Link>

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
                    {event.type && (
                      <Badge variant="outline">{event.type}</Badge>
                    )}

                    {event.fee === 0 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Free
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {event.fee} tk
                      </span>
                    )}
                  </div>
                </CardContent>

                <Button className="w-full" asChild>
                  <Link href={`/events/${event.id}`}>
                    View Event Info
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default HomePageEvents;