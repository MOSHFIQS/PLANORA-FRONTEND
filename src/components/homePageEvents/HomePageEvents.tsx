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
import { useAuth } from "@/context/AuthProvider";
import { Meta } from "@/types/meta.types";

type Category = {
  id: string;
  name: string;
};



type Props = {
  events: Event[];
  categories: Category[];
  meta: Meta;
};

const HomePageEvents = ({ events, categories, meta }: Props) => {
  console.log(events);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("categoryId") || "ALL";
  const limitFromUrl =
    Number(searchParams.get("limit")) || meta?.limit || 10;

  const [activeCategory, setActiveCategory] =
    useState<string>("ALL");

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;

  const handleViewEvent = (eventId: string) => {
    if (!user) {
      router.push(`/login?redirect=/events/${eventId}`);
    } else {
      router.push(`/events/${eventId}`);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");
    params.delete("page"); // reset page

    if (categoryId === "ALL") {
      params.delete("categoryId");
    } else {
      params.set("categoryId", categoryId);
    }

    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (type: "next" | "prev") => {
    const params = new URLSearchParams(searchParams.toString());

    let newPage = currentPage;

    if (type === "next" && currentPage < totalPages) {
      newPage = currentPage + 1;
    }

    if (type === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    }

    params.set("page", String(newPage));

    router.push(`?${params.toString()}`);
  };

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", String(newLimit));
    params.set("page", "1"); // reset page when limit changes

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6 mt-6">
      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === "ALL" ? "orange" : "outline"}
          onClick={() => handleCategoryChange("ALL")}
        >
          All
        </Button>

        {categories?.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "orange" : "outline"}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* EVENTS GRID */}
      {!events?.length ? (
        <p className="text-center text-muted-foreground">
          No events found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => {
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

                  <Button
                    variant={"violet"}
                    className="w-full"
                    onClick={() => handleViewEvent(event.id)}
                  >
                    View Event Info
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* PAGINATION + LIMIT */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            
            {/* LIMIT SELECTOR */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Show:
              </span>

              {[5, 10, 20, 50].map((l) => (
                <Button
                  key={l}
                  size="sm"
                  variant={
                    limitFromUrl === l ? "orange" : "outline"
                  }
                  onClick={() => handleLimitChange(l)}
                >
                  {l}
                </Button>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => handlePageChange("prev")}
              >
                Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange("next")}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePageEvents;