"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "../appImage/AppImage";
import { Event } from "@/types/event.types";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
};

type Props = {
  events: Event[];
  categories: Category[];
};

const HomePageEvents = ({ events, categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const categoryFromUrl = searchParams.get("categoryId");

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // sync state from URL
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("ALL");
    }
  }, [categoryFromUrl]);

  // category click
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    const params = new URLSearchParams(searchParams.toString());

    // remove search
    params.delete("search");

    if (categoryId === "ALL") {
      params.delete("categoryId");
    } else {
      params.set("categoryId", categoryId);
    }

    router.push(`?${params.toString()}`);
  };

  // ALL click
  const handleAllCategory = () => {
    setSelectedCategory("ALL");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");
    params.delete("categoryId");

    router.push(`?${params.toString()}`);
  };

  // active category from URL (source of truth)
  const activeCategory = categoryFromUrl || selectedCategory;

  // filtering
  const filteredEvents = events?.filter((event) => {
    const matchCategory =
      activeCategory === "ALL"
        ? true
        : event.categoryId === activeCategory;

    return matchCategory;
  });

  return (
    <div className="space-y-6 mt-6">
      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === "ALL" ? "default" : "outline"}
          onClick={handleAllCategory}
        >
          All
        </Button>

        {categories?.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* GRID */}
      {!filteredEvents?.length ? (
        <p className="text-center text-muted-foreground">
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => {
            const date = event?.dateTime
              ? new Date(event.dateTime)
              : null;

            return (
              <Card
                key={event.id}
                className="overflow-hidden flex flex-col p-0 rounded"
              >
                <Link
                  href={`/event/${event.id}`}
                  className="relative h-50 xl:h-55 w-full overflow-hidden border-b-1"
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