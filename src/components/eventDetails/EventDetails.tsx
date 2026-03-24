"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "../appImage/AppImage";
import ImageMagnifier from "../imageMagnifier/ImageMagnifier";
import DescriptionViwer from "../descriptionViwer/DescriptionViwer";

type Event = {
     id: string;
     title: string;
     description: string;
     venue?: string;
     dateTime: string;
     visibility: "PUBLIC" | "PRIVATE";
     type: "ONLINE" | "OFFLINE";
     meetingLink?: string;
     fee: number;
     images: string[];
};

const EventDetails = ({ event }: { event: Event }) => {
     return (
          <div className="p-6 space-y-6">

               {/* HEADER */}
               <Card>
                    <CardHeader>
                         <CardTitle className="text-2xl font-bold">
                              {event?.title}
                         </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                         {/* Image */}
                         <div className="w-full">
                              <ImageMagnifier
                                   images={[...event.images].filter(Boolean)}
                              />
                         </div>

                         {/* Meta Info */}
                         <div className="flex flex-wrap gap-3">
                              <Badge variant="outline">{event?.type}</Badge>
                              <Badge variant="secondary">{event?.visibility}</Badge>
                              {event?.fee > 0 && (
                                   <Badge>Fee: {event?.fee}</Badge>
                              )}
                         </div>

                         {/* Date */}
                         <p className="text-sm text-muted-foreground">
                               {new Date(event?.dateTime).toLocaleString()}
                         </p>

                         {/* Venue / Meeting */}
                         {event?.type === "OFFLINE" ? (
                              <p>
                                   <span className="font-medium">Venue:</span>{" "}
                                   {event?.venue || "N/A"}
                              </p>
                         ) : (
                              <p>
                                    <span className="font-medium">Meeting Link:</span>{" "}
                                   {event?.meetingLink || "N/A"}
                              </p>
                         )}
                    </CardContent>
               </Card>

               {/* DESCRIPTION */}
               <Card>
                    <CardHeader>
                         <CardTitle>Description</CardTitle>
                    </CardHeader>

                    <CardContent>
                         <div>
                              <DescriptionViwer
                                   description={event.description}
                                   height="300px"
                              />
                         </div>
                    </CardContent>
               </Card>

               {/* ACTIONS (optional) */}
               <div className="flex gap-3">
                    <Button>Join Event</Button>
                    <Button variant="outline">Share</Button>
               </div>
          </div>
     );
};

export default EventDetails;