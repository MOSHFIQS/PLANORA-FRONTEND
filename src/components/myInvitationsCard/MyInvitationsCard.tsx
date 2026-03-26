"use client";

import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "../appImage/AppImage";
import Link from "next/link";
import { Invitation } from "@/types/invitation.types";





const MyInvitationsCard = ({ invitations }: { invitations: Invitation[] }) => {
     if (!invitations?.length) {
          return (
               <p className="p-6 text-center text-muted-foreground">
                    No invitations found.
               </p>
          );
     }

     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {invitations.map((item) => {
                    const { event, status } = item;

                    const date = event?.dateTime ? new Date(event.dateTime) : null;

                    const isPending = status === "PENDING";
                    const isAccepted = status === "ACCEPTED";

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
                                        <Badge variant={isAccepted ? "default" : "secondary"}>
                                             {isAccepted ? "Accepted" : isPending ? "Pending" : "Rejected"}
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
                              </CardContent>

                              {/* FOOTER */}
                              <CardFooter className="flex w-full gap-2">
                                   <Button className="flex-1">
                                        <Link href={`invitations/${event.id}`}>
                                             View Event
                                        </Link>
                                   </Button>

                                   <Button variant="destructive" className="flex-1">
                                        Reject
                                   </Button>

                              </CardFooter>
                         </Card>
                    );
               })}
          </div>
     );
};

export default MyInvitationsCard;