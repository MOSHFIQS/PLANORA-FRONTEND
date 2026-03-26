// // "use client";

// // import { format } from "date-fns";
// // import { Card, CardContent, CardFooter } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { AppImage } from "../appImage/AppImage";
// // import Link from "next/link";
// // import { Invitation } from "@/types/invitation.types";
// // import { usePayment } from "@/hooks/usePayment";
// // import { useTransition } from "react";
// // import { cancelInvitationAction } from "@/actions/invitation.action";
// // import { toast } from "sonner";





// // const MyInvitationsCard = ({ invitations }: { invitations: Invitation[] }) => {

// //      const { handlePayment, loadingId } = usePayment();
// //      const [isPendingReject, startRejectTransition] = useTransition();

// //      console.log(invitations);
// //      if (!invitations?.length) {
// //           return (
// //                <p className="p-6 text-center text-muted-foreground">
// //                     No invitations found.
// //                </p>
// //           );
// //      }

// //      const handleReject = (id: string) => {
// //           startRejectTransition(async () => {
// //                const res = await cancelInvitationAction(id);
// //                console.log(res);

// //                if (!res.ok) {
// //                     toast.error(res.message);
// //                     return;
// //                }

// //                toast.success("Invitation rejected");

// //           });
// //      };

// //      return (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                {invitations.map((item) => {
// //                     const { event, status } = item;

// //                     const date = event?.dateTime ? new Date(event.dateTime) : null;

// //                     const isPending = status === "PENDING";
// //                     const isAccepted = status === "ACCEPTED";

// //                     return (
// //                          <Card key={item.id} className="overflow-hidden flex flex-col pt-0">
// //                               {/* IMAGE */}
// //                               <div className="relative h-60 w-full">
// //                                    {event?.images?.[0] && (
// //                                         <AppImage
// //                                              src={event.images[0]}
// //                                              className="h-full w-full object-cover"
// //                                         />
// //                                    )}

// //                                    <div className="absolute top-3 right-3">
// //                                         <Badge variant={isAccepted ? "default" : "secondary"}>
// //                                              {isAccepted ? "Accepted" : isPending ? "Pending" : "Rejected"}
// //                                         </Badge>
// //                                    </div>
// //                               </div>

// //                               {/* CONTENT */}
// //                               <CardContent className="space-y-3 pt-4">
// //                                    <h3 className="font-semibold text-base line-clamp-1">
// //                                         {event?.title}
// //                                    </h3>

// //                                    {date && (
// //                                         <p className="text-sm text-muted-foreground">
// //                                              {format(date, "PPP • p")}
// //                                         </p>
// //                                    )}

// //                                    <div className="flex items-center justify-between text-sm">
// //                                         {event?.type && (
// //                                              <Badge variant="outline">{event.type}</Badge>
// //                                         )}

// //                                         <span className="font-medium">{event?.fee} tk</span>
// //                                    </div>
// //                               </CardContent>

// //                               {/* FOOTER */}
// //                               <CardFooter className="w-full">
// //                                    {isAccepted ? (
// //                                         <Button className="flex-1">
// //                                              <Link href={`invitations/${event.id}`}>
// //                                                   View Event
// //                                              </Link>
// //                                         </Button>
// //                                    ) : (
// //                                         <div className="flex w-full gap-2">
// //                                              {event.fee === 0 ? (
// //                                                   <Button
// //                                                        className="flex-1"
// //                                                        onClick={() =>
// //                                                             handlePayment({
// //                                                                  invitationId: item.id,
// //                                                             })
// //                                                        }
// //                                                   >
// //                                                        Join Free
// //                                                   </Button>
// //                                              ) : (
// //                                                   <Button
// //                                                        variant="secondary"
// //                                                        className="flex-1"
// //                                                        disabled={loadingId === item.eventId}
// //                                                        onClick={() =>
// //                                                             handlePayment({
// //                                                                  invitationId: item.id,
// //                                                             })
// //                                                        }
// //                                                   >
// //                                                        {loadingId === item.eventId
// //                                                             ? "Processing..."
// //                                                             : `Pay ${event.fee} tk`}
// //                                                   </Button>
// //                                              )}

// //                                              <Button
// //                                                   variant="destructive"
// //                                                   className="flex-1"
// //                                                   disabled={isPendingReject}
// //                                                   onClick={() => handleReject(item.id)}
// //                                              >
// //                                                   {isPendingReject ? "Rejecting..." : "Reject"}
// //                                              </Button>
// //                                         </div>
// //                                    )}
// //                               </CardFooter>
// //                          </Card>
// //                     );
// //                })}
// //           </div>
// //      );
// // };

// // export default MyInvitationsCard;



















// "use client";

// import { format } from "date-fns";
// import Link from "next/link";
// import { useState, useTransition } from "react";
// import { toast } from "sonner";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { AppImage } from "../appImage/AppImage";

// import { Invitation } from "@/types/invitation.types";
// import { usePayment } from "@/hooks/usePayment";
// import { cancelInvitationAction } from "@/actions/invitation.action";

// const MyInvitationsCard = ({ invitations }: { invitations: Invitation[] }) => {
//   const { handlePayment, loadingId } = usePayment();

//   // Track which invitation is being rejected
//   const [rejectingId, setRejectingId] = useState<string | null>(null);
//   const [isPendingReject, startRejectTransition] = useTransition();

//   if (!invitations?.length) {
//     return (
//       <p className="p-6 text-center text-muted-foreground">
//         No invitations found.
//       </p>
//     );
//   }

//   const handleReject = (id: string) => {
//     setRejectingId(id);

//     startRejectTransition(async () => {
//       const res = await cancelInvitationAction(id);

//       if (!res.ok) {
//         toast.error(res.message);
//         setRejectingId(null);
//         return;
//       }

//       toast.success("Invitation rejected");
//       setRejectingId(null);
//     });
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>My Invitations</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Event</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Fee</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {invitations.map((item) => {
//               const { event, status } = item;

//               const date = event?.dateTime
//                 ? new Date(event.dateTime)
//                 : null;

//               const isPending = status === "PENDING";
//               const isAccepted = status === "ACCEPTED";

//               return (
//                 <TableRow key={item.id}>
//                   {/* EVENT */}
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       {event?.images?.[0] && (
//                         <AppImage
//                           src={event.images[0]}
//                           className="h-12 w-16 rounded-md object-cover"
//                         />
//                       )}
//                       <span className="font-medium line-clamp-1">
//                         {event?.title}
//                       </span>
//                     </div>
//                   </TableCell>

//                   {/* DATE */}
//                   <TableCell>
//                     {date ? format(date, "PPP • p") : "-"}
//                   </TableCell>

//                   {/* TYPE */}
//                   <TableCell>
//                     {event?.type && (
//                       <Badge variant="outline">{event.type}</Badge>
//                     )}
//                   </TableCell>

//                   {/* FEE */}
//                   <TableCell>{event?.fee} tk</TableCell>

//                   {/* STATUS */}
//                   <TableCell>
//                     <Badge variant={isAccepted ? "default" : "secondary"}>
//                       {isAccepted
//                         ? "Accepted"
//                         : isPending
//                         ? "Pending"
//                         : "Rejected"}
//                     </Badge>
//                   </TableCell>

//                   {/* ACTIONS */}
//                   <TableCell className="text-right">
//                     {isAccepted ? (
//                       <Button>
//                         <Link href={`invitations/${event.id}`}>
//                           View Event
//                         </Link>
//                       </Button>
//                     ) : (
//                       <div className="flex justify-end gap-2">
//                         {event.fee === 0 ? (
//                           <Button
//                             onClick={() =>
//                               handlePayment({
//                                 invitationId: item.id,
//                               })
//                             }
//                           >
//                             Join Free
//                           </Button>
//                         ) : (
//                           <Button
//                             variant="secondary"
//                             disabled={loadingId === item.eventId}
//                             onClick={() =>
//                               handlePayment({
//                                 invitationId: item.id,
//                               })
//                             }
//                           >
//                             {loadingId === item.eventId
//                               ? "Processing..."
//                               : `Pay ${event.fee} tk`}
//                           </Button>
//                         )}

//                         <Button
//                           variant="destructive"
//                           disabled={rejectingId === item.id}
//                           onClick={() => handleReject(item.id)}
//                         >
//                           {rejectingId === item.id ? "Rejecting..." : "Reject"}
//                         </Button>
//                       </div>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default MyInvitationsCard;



















"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppImage } from "../appImage/AppImage";

import { Invitation } from "@/types/invitation.types";
import { usePayment } from "@/hooks/usePayment";
import { cancelInvitationAction } from "@/actions/invitation.action";

const MyInvitationsCard = ({ invitations }: { invitations: Invitation[] }) => {
  const { handlePayment, loadingId } = usePayment();

  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [isPendingReject, startRejectTransition] = useTransition();

  if (!invitations?.length) {
    return (
      <p className="p-6 text-center text-muted-foreground">
        No invitations found.
      </p>
    );
  }

  const handleReject = (id: string) => {
    setRejectingId(id);
    startRejectTransition(async () => {
      const res = await cancelInvitationAction(id);

      if (!res.ok) {
        toast.error(res.message);
        setRejectingId(null);
        return;
      }

      toast.success("Invitation rejected");
      setRejectingId(null);
    });
  };

  return (
    <div className="space-y-4">
      {/* Toggle button */}
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

      {/* CARD VIEW */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map((item) => {
            const { event, status } = item;
            const date = event?.dateTime ? new Date(event.dateTime) : null;
            const isPending = status === "PENDING";
            const isAccepted = status === "ACCEPTED";

            return (
              <Card key={item.id} className="overflow-hidden flex flex-col pt-0">
                {/* IMAGE */}
                <div className="relative h-60 w-full border-b overflow-hidden">
                  {event?.images?.[0] && (
                    <AppImage
                      src={event.images[0]}
                      className="h-full w-full object-cover hover:scale-105 duration-300"
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
                    {event?.type && <Badge variant="outline">{event.type}</Badge>}
                    <span className="font-medium">{event?.fee} tk</span>
                  </div>
                </CardContent>

                {/* FOOTER */}
                <CardFooter className="w-full">
                  {isAccepted ? (
                    <Button className="flex-1">
                      <Link href={`invitations/${event.id}`}>View Event</Link>
                    </Button>
                  ) : (
                    <div className="flex w-full gap-2">
                      {event.fee === 0 ? (
                        <Button
                          className="flex-1"
                          onClick={() =>
                            handlePayment({ invitationId: item.id })
                          }
                        >
                          Join Free
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          className="flex-1"
                          disabled={loadingId === item.eventId}
                          onClick={() =>
                            handlePayment({ invitationId: item.id })
                          }
                        >
                          {loadingId === item.eventId
                            ? "Processing..."
                            : `Pay ${event.fee} tk`}
                        </Button>
                      )}

                      <Button
                        variant="destructive"
                        className="flex-1"
                        disabled={rejectingId === item.id}
                        onClick={() => handleReject(item.id)}
                      >
                        {rejectingId === item.id ? "Rejecting..." : "Reject"}
                      </Button>
                    </div>
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
            <CardTitle>My Invitations</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {invitations.map((item) => {
                  const { event, status } = item;
                  const date = event?.dateTime ? new Date(event.dateTime) : null;
                  const isPending = status === "PENDING";
                  const isAccepted = status === "ACCEPTED";

                  return (
                    <TableRow key={item.id}>
                      {/* EVENT */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {event?.images?.[0] && (
                            <AppImage
                              src={event.images[0]}
                              className="h-12 w-16 rounded-md object-cover"
                            />
                          )}
                          <span className="font-medium line-clamp-1">
                            {event?.title}
                          </span>
                        </div>
                      </TableCell>

                      {/* DATE */}
                      <TableCell>{date ? format(date, "PPP • p") : "-"}</TableCell>

                      {/* TYPE */}
                      <TableCell>
                        {event?.type && <Badge variant="outline">{event.type}</Badge>}
                      </TableCell>

                      {/* FEE */}
                      <TableCell>{event?.fee} tk</TableCell>

                      {/* STATUS */}
                      <TableCell>
                        <Badge variant={isAccepted ? "default" : "secondary"}>
                          {isAccepted
                            ? "Accepted"
                            : isPending
                            ? "Pending"
                            : "Rejected"}
                        </Badge>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell className="text-right">
                        {isAccepted ? (
                          <Button asChild size={"sm"}>
                            <Link href={`invitations/${event.id}`}>View Event</Link>
                          </Button>
                        ) : (
                          <div className="flex justify-end gap-2">
                            {event.fee === 0 ? (
                              <Button size={"sm"}
                                onClick={() =>
                                  handlePayment({ invitationId: item.id })
                                }
                              >
                                Join Free
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size={"sm"}
                                disabled={loadingId === item.eventId}
                                onClick={() =>
                                  handlePayment({ invitationId: item.id })
                                }
                              >
                                {loadingId === item.eventId
                                  ? "Processing..."
                                  : `Pay ${event.fee} tk`}
                              </Button>
                            )}

                            <Button
                            size={"sm"}
                              variant="destructive"
                              disabled={rejectingId === item.id}
                              onClick={() => handleReject(item.id)}
                            >
                              {rejectingId === item.id ? "Rejecting..." : "Reject"}
                            </Button>
                          </div>
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

export default MyInvitationsCard;