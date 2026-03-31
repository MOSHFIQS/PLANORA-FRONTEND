// "use client";

// import { format } from "date-fns";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { MyJoinedEvent } from "@/types/joinedEvent.types";
// import { AppImage } from "../appImage/AppImage";
// import Link from "next/link";
// import { usePayment } from "@/hooks/usePayment";

// type Props = {
//   myEvents: MyJoinedEvent[];
// };

// const MyParticipatedEventsCard = ({ myEvents }: Props) => {
//   const { handlePayment, loadingId } = usePayment();

//   console.log(myEvents);

//   if (!myEvents?.length) {
//     return (
//       <p className="p-6 text-center text-muted-foreground">
//         You haven't joined any events yet.
//       </p>
//     );
//   }



//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {myEvents.map((item) => {
//         const { event, payment, status } = item;
//         console.log(item?.event?.id);

//         const date = event?.dateTime ? new Date(event.dateTime) : null;

//         const isPaid =
//           payment?.some((p) => p.status === "SUCCESS") || false;

//         const isApproved = status === "APPROVED" || isPaid;

//         return (
//           <Card key={item.id} className="overflow-hidden flex flex-col pt-0">
//             {/* IMAGE */}
//             <div className="relative h-60 w-full">
//               {event?.images?.[0] && (
//                 <AppImage
//                   src={event.images[0]}
//                   className="h-full w-full object-cover"
//                 />
//               )}

//               <div className="absolute top-3 right-3">
//                 <Badge variant={isApproved ? "default" : "secondary"}>
//                   {isApproved ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//             </div>

//             {/* CONTENT */}
//             <CardContent className="space-y-3 pt-4">
//               <h3 className="font-semibold text-base line-clamp-1">
//                 {event?.title}
//               </h3>

//               {date && (
//                 <p className="text-sm text-muted-foreground">
//                   {format(date, "PPP • p")}
//                 </p>
//               )}

//               <div className="flex items-center justify-between text-sm">
//                 {event?.type && (
//                   <Badge variant="outline">{event.type}</Badge>
//                 )}

//                 <span className="font-medium">{event?.fee} tk</span>
//               </div>

//               {event?.venue && (
//                 <p className="text-sm text-muted-foreground line-clamp-1">
//                   {event.venue}
//                 </p>
//               )}
//             </CardContent>

//             {/* FOOTER */}
//             <CardFooter className="mt-auto">
//               {isApproved ? (
//                 <Button className="w-full">
//                   <Link href={`/dashboard/participants/my-participated-events/${item?.event?.id}`}>
//                     View Event
//                   </Link>
//                 </Button>
//               ) : (
//                 <Button
//                   variant="secondary"
//                   className="w-full"
//                   disabled={loadingId === item.eventId}
//                   onClick={() =>
//                     handlePayment({
//                       eventId: item.eventId,
//                     })
//                   }
//                 >
//                   {loadingId === item.eventId ? "Processing..." : "Pay Now"}
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default MyParticipatedEventsCard;


















"use client";

import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { MyJoinedEvent } from "@/types/joinedEvent.types";
import { AppImage } from "../appImage/AppImage";
import Link from "next/link";
import { usePayment } from "@/hooks/usePayment";
import { useState } from "react";
import ReviewDialog from "../reviewDialog/ReviewDialog";
import { Map } from "lucide-react";

type Props = {
  myEvents: MyJoinedEvent[];
};

const MyParticipatedEventsCard = ({ myEvents }: Props) => {
  console.log(myEvents);
  const { handlePayment, loadingId } = usePayment();
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  if (!myEvents?.length) {
    return (
      <p className="p-6 text-center text-muted-foreground">
        You haven't joined any events yet.
      </p>
    );
  }


  return (
    <div className="space-y-4">
      {/* Toggle Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() =>
            setViewMode((prev) => (prev === "card" ? "table" : "card"))
          }
        >
          {viewMode === "card" ? "Switch to Table View" : "Switch to Card View"}
        </Button>
      </div>

      {/* CARD / GRID VIEW */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myEvents.map((item) => {
            const { event, payment, status } = item;
            const date = event?.dateTime ? new Date(event.dateTime) : null;
            const isPaid = payment?.some((p) => p.status === "SUCCESS") || false;
            const isApproved = status === "APPROVED" || isPaid;
            const isReviewed = event?.reviews && event.reviews.length > 0;

            return (
              <Card
                key={item.id}
                className="p-3 rounded-4xl bg-muted/40 border-2 border-gray-300 flex flex-col gap-3"
              >
                {/* Image Section */}
                <div className="relative h-60 w-full overflow-hidden rounded-2xl group">
                  {event?.images?.[0] && (
                    <AppImage
                      src={event.images[0]}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  {/* Black Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent pointer-events-none" />

                  {/* Status Badge (top right) */}
                  <span className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 text-xs rounded-full">
                    {isApproved ? "Approved" : "Pending"}
                  </span>

                  {/* Optional Type Badge (top left) */}
                  {event?.type && (
                    <span className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 text-xs rounded-full font-medium">
                      {event.type}
                    </span>
                  )}
                </div>

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
                      {event?.title}
                    </h3>

                    {/* Location */}
                    {event?.venue && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 line-clamp-1">
                        <Map className="w-4 h-4" />
                        {event.venue}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <span className="text-lg font-bold text-purple-500 whitespace-nowrap">
                    {event?.fee === 0 ? "Free" : `$${event?.fee}`}
                  </span>
                </CardContent>

                {/* Footer / Actions */}
                <CardFooter className="mt-auto p-0">
                  {isApproved ? (
                    <div className="flex gap-2 w-full">
                      <Button asChild className="flex-1 rounded-4xl" variant="violet">
                        <Link href={`/dashboard/participants/my-participated-events/${event?.id}`}>
                          View Event
                        </Link>
                      </Button>

                      {event?.id && (
                        <ReviewDialog eventId={event.id}>
                          <Button
                            disabled={isReviewed}
                            className="flex-1 rounded-4xl"
                          >
                            {isReviewed ? "Reviewed" : "Review"}
                          </Button>
                        </ReviewDialog>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      className="w-full rounded-4xl"
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
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <Card>
          <CardHeader>
            <CardTitle>My Participated Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {myEvents.map((item) => {
                  const { event, payment, status } = item;
                  const date = event?.dateTime ? new Date(event.dateTime) : null;
                  const isPaid = payment?.some((p) => p.status === "SUCCESS") || false;
                  const isApproved = status === "APPROVED" || isPaid;
                  const isReviewed = event?.reviews && event.reviews.length > 0;

                  return (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center gap-2">
                        {event?.images?.[0] && (
                          <AppImage
                            src={event.images[0]}
                            alt={event.title}
                            width={40}
                            height={40}
                            className="h-10 w-10 object-cover rounded"
                          />
                        )}
                        {event?.title}
                      </TableCell>
                      <TableCell>{date ? format(date, "PPP • p") : "-"}</TableCell>
                      <TableCell>{event?.type || "-"}</TableCell>
                      <TableCell>{event?.fee} tk</TableCell>
                      <TableCell>{event?.venue || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={isApproved ? "default" : "secondary"}>
                          {isApproved ? "Approved" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {isApproved ? (
                          <div className="flex items-end justify-end gap-2 ">
                            <Button variant={"violet"} asChild size="xs">
                              <Link href={`/dashboard/participants/my-participated-events/${event?.id}`}>
                                View Event
                              </Link>
                            </Button>
                            {event?.id && (
                              <ReviewDialog eventId={event.id}>
                                <Button disabled={isReviewed} size={"xs"}>
                                  {isReviewed ? "Reviewed" : "Review"}
                                </Button>
                              </ReviewDialog>
                            )}
                          </div>
                        ) : (
                          <Button
                            size="xs"
                            disabled={loadingId === item.eventId}
                            onClick={() =>
                              handlePayment({ eventId: item.eventId })
                            }
                          >
                            {loadingId === item.eventId ? "Processing..." : "Pay Now"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyParticipatedEventsCard;