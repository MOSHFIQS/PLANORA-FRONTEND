"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ImageMagnifier from "../imageMagnifier/ImageMagnifier";
import DescriptionViwer from "../descriptionViwer/DescriptionViwer";
import { AppImage } from "../appImage/AppImage";

export type EventType = "ONLINE" | "OFFLINE";
export type Visibility = "PUBLIC" | "PRIVATE";
export type InvitationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface IUser {
     id: string;
     name: string;
     email: string;
     image?: string | null;
     role: string;
     status: string;
     isDeleted: boolean;
     emailVerified: boolean;
     createdAt: string;
     updatedAt: string;
     deletedAt?: string | null;
}

export interface IInvitation {
     id: string;
     eventId: string;
     userId: string;
     status: InvitationStatus;
     createdAt: string;
}

export interface IParticipation {
     id: string;
     eventId: string;
     userId: string;
     createdAt: string;
}

export interface IReview {
     id: string;
     rating: number;
     comment: string;
     userId: string;
     eventId: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface IEvent {
     id: string;
     title: string;
     description: string;
     venue: string | null;
     meetingLink: string | null;
     type: EventType;
     visibility: Visibility;
     fee: number;
     isFeatured: boolean;
     categoryId: string;
     organizerId: string;
     dateTime: string;

     images: string[];

     createdAt: string;
     updatedAt: string;

     organizer: IUser;

     invitations: IInvitation[];
     participations: IParticipation[];
     reviews: IReview[];
}

const EventDetails = ({ event }: { event: IEvent }) => {
     return (
          <div className="p-6 space-y-6">

               {/* HEADER */}
               <Card>
                    <CardHeader className="space-y-4">
                         {/* Title */}
                         <div>
                              <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
                                   {event?.title}
                              </CardTitle>


                         </div>

                         {/* Organizer Section */}
                         <div className="flex items-center gap-4 p-4 rounded-xl border bg-[#f7f7f7] ">

                              {/* Avatar */}
                              <AppImage
                                   src={event?.organizer?.image}
                                   className="w-12 h-12 rounded-full object-cover border"
                              />

                              {/* Info */}
                              <div className="flex flex-col">
                                   <p className="font-semibold text-sm md:text-base">
                                        {event?.organizer?.name}
                                   </p>
                                   <p className="text-xs text-muted-foreground">
                                        {event?.organizer?.email}
                                   </p>
                              </div>
                         </div>
                    </CardHeader>

                    <CardContent className="space-y-5">

                         {/* Images */}
                         <ImageMagnifier images={[...(event.images || [])]} />

                         {/* Basic Info */}
                         <div className="flex flex-wrap gap-3">
                              <Badge variant="outline">{event?.type}</Badge>
                              <Badge variant="secondary">{event?.visibility}</Badge>
                              {event?.isFeatured && <Badge>Featured</Badge>}
                              {event?.fee > 0 && <Badge>Fee: {event?.fee}</Badge>}
                              {event?.fee === 0 && <Badge>Free</Badge>}
                         </div>

                         {/* Date & Time */}
                         <p className="text-sm text-muted-foreground">
                              {new Date(event?.dateTime).toLocaleString()}
                         </p>

                         {/* Venue / Meeting Link */}
                         {event?.type === "OFFLINE" ? (
                              <p>
                                   <span className="font-medium"> Venue:</span>{" "}
                                   {event?.venue || "N/A"}
                              </p>
                         ) : event?.meetingLink ? (
                              <p>
                                   <span className="font-medium">🔗 Meeting:</span>{" "}
                                   <a
                                        href={event.meetingLink}
                                        target="_blank"
                                        className="text-blue-500 underline"
                                   >
                                        Join Link
                                   </a>
                              </p>
                         ) : (
                              <p className="text-muted-foreground">No meeting link available</p>
                         )}


                        <div className="text-xs text-muted-foreground space-y-1">
                              <p>Created: {new Date(event?.createdAt).toLocaleString()}</p>
                              <p>Updated: {new Date(event?.updatedAt).toLocaleString()}</p>
                         </div>

                         {/* Stats */}
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              <div className="border p-3 rounded text-center font-extrabold bg-[#f7f7f7]">
                                   Invitations: {event?.invitations?.length || 0}
                              </div>
                              <div className="border p-3 rounded text-center font-extrabold bg-[#f7f7f7]">
                                   Participants: {event?.participations?.length || 0}
                              </div>
                              <div className="border p-3 rounded text-center font-extrabold bg-[#f7f7f7]">
                                   Reviews: {event?.reviews?.length || 0}
                              </div>
                         </div>

                         {/* Created / Updated */}
                         
                    </CardContent>
               </Card>

               {/* DESCRIPTION */}
               <Card>
                    <CardHeader>
                         <CardTitle>Description</CardTitle>
                    </CardHeader>

                    <CardContent>
                         <DescriptionViwer
                              description={event.description}
                              height="30px"
                         />
                    </CardContent>
               </Card>



          </div>
     );
};

export default EventDetails;