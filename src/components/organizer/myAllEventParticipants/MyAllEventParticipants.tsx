// "use client";

// import React, { useTransition, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
// } from "@/components/ui/alert-dialog";
// import { toast } from "sonner";
// import { Event, Participant, } from "@/types/event.types";
// import { sendInvitationAction } from "@/actions/invitation.action";
// import { Check, Clock } from "lucide-react";

// export default function MyAllEventParticipants({
//   participants,
//   events,
// }: {
//   participants: Participant[];
//   events: Event[];
// }) {
//   const [openDialogId, setOpenDialogId] = useState<string | null>(null);
//   const [selectedEventId, setSelectedEventId] = useState<string>("");
//   const [isPending, startTransition] = useTransition();

//   // Only private events
//   const privateEvents = events.filter((event) => event.visibility === "PRIVATE");

//   const handleSendInvite = (participantId: string) => {
//     if (!selectedEventId || selectedEventId === "no-events") {
//       toast.error("Please select an event");
//       return;
//     }

//     startTransition(async () => {
//       try {
//         const res = await sendInvitationAction({
//           userId: participantId,
//           eventId: selectedEventId,
//         });

//         if (!res.ok) throw new Error(res.message);

//         toast.success("Invitation sent successfully!");

//         // Optimistic UI update: add invite to participant's events
//         const participant = participants.find((p) => p.id === participantId);
//         if (participant) {
//           participant.events.push({
//             eventId: selectedEventId,
//             title: privateEvents.find((e) => e.id === selectedEventId)?.title || "",
//             invited: true,
//             participationStatus: null,
//             invitationStatus: "PENDING",
//           });
//         }
//       } catch (err: any) {
//         toast.error(err?.message || "Failed to send invitation");
//       } finally {
//         setOpenDialogId(null);
//         setSelectedEventId("");
//       }
//     });
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>All Participants</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>User</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Events Joined / Invited</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {participants.length > 0 ? (
//               participants.map((p) => (
//                 <TableRow key={p.id}>
//                   {/* USER */}
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={p.image ?? "/default-avatar.png"}
//                         alt={p.name}
//                         className="h-10 w-10 rounded-full object-cover border"
//                       />
//                       <span className="font-medium">{p.name}</span>
//                     </div>
//                   </TableCell>

//                   {/* EMAIL */}
//                   <TableCell>{p.email}</TableCell>

//                   {/* EVENTS */}
//                   <TableCell>
//                     <div className="flex flex-wrap gap-2">
//                       {p.events?.map((e, index) => (
//                         <span
//                           key={`${e.eventId}-${index}`}
//                           className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${e.invited ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
//                             }`}
//                           title={e.invited ? `Invitation Status: ${e.invitationStatus}` : `Participation Status: ${e.participationStatus}`}
//                         >
//                           {e.invited ? <Clock size={12} /> : <Check size={12} />} {e.title}
//                         </span>
//                       ))}
//                     </div>
//                   </TableCell>

//                   {/* ACTIONS */}
//                   <TableCell>
//                     <AlertDialog
//                       open={openDialogId === p.id}
//                       onOpenChange={(isOpen) => !isOpen && setOpenDialogId(null)}
//                     >
//                       {/* Trigger button */}
//                       <AlertDialogTrigger asChild>
//                         <Button
//                           variant="outline"
//                           onClick={() => setOpenDialogId(p.id)}
//                           disabled={privateEvents.length === 0}
//                         >
//                           Send Invite
//                         </Button>
//                       </AlertDialogTrigger>

//                       {/* Dialog content */}
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>Send Invitation</AlertDialogTitle>
//                           <AlertDialogDescription>
//                             Select an event to send invitation to{" "}
//                             <span className="font-medium">{p.name}</span>
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>

//                         {/* Select Event */}
//                         <div className="mt-2">
//                           <Select
//                             value={selectedEventId}
//                             onValueChange={(val) => setSelectedEventId(val)}
//                           >
//                             <SelectTrigger className="w-full">
//                               <SelectValue placeholder="Select event" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {privateEvents.length > 0 ? (
//                                 privateEvents.map((event) => {
//                                   const isDisabled = p.events.some(
//                                     (e) =>
//                                       e.eventId === event.id &&
//                                       (e.invited || e.participationStatus === "APPROVED")
//                                   );
//                                   return (
//                                     <SelectItem
//                                       key={event.id}
//                                       value={event.id}
//                                       disabled={isDisabled}
//                                     >
//                                       {event.title}
//                                     </SelectItem>
//                                   );
//                                 })
//                               ) : (
//                                 <SelectItem value="no-events" disabled>
//                                   No events found
//                                 </SelectItem>
//                               )}
//                             </SelectContent>
//                           </Select>
//                         </div>

//                         {/* Buttons */}
//                         <AlertDialogFooter className="mt-4 flex justify-end gap-2">
//                           <Button
//                             variant="outline"
//                             onClick={() => setOpenDialogId(null)}
//                           >
//                             Cancel
//                           </Button>
//                           <Button
//                             onClick={() => handleSendInvite(p.id)}
//                             disabled={isPending || !selectedEventId}
//                           >
//                             Send
//                           </Button>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} className="text-center py-4">
//                   No participants found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }














// // "use client";

// // import { useTransition, useState } from "react";
// // import { toast } from "sonner";
// // import { sendInvitationAction } from "@/actions/invitation.action";
// // import { Participant, Event } from "@/types/event.types";

// // import { Button } from "@/components/ui/button";
// // import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// // import {
// //   AlertDialog,
// //   AlertDialogTrigger,
// //   AlertDialogContent,
// //   AlertDialogHeader,
// //   AlertDialogTitle,
// //   AlertDialogDescription,
// //   AlertDialogFooter,
// // } from "@/components/ui/alert-dialog";

// // import { UserPlus, Mail, Calendar, Check, Clock, X } from "lucide-react";
// // import { AppImage } from "../appImage/AppImage";

// // export default function MyAllEventParticipants({ participants, events }: { participants: Participant[]; events: Event[] }) {
// //   console.log(participants);
// //   const [openDialogId, setOpenDialogId] = useState<string | null>(null);
// //   const [selectedEventId, setSelectedEventId] = useState<string>("");
// //   const [isPending, startTransition] = useTransition();

// //   const privateEvents = events.filter((event) => event.visibility === "PRIVATE");

// //   const handleSendInvite = (participantId: string) => {
// //     if (!selectedEventId || selectedEventId === "no-events") {
// //       toast.error("Please select an event");
// //       return;
// //     }

// //     startTransition(async () => {
// //       try {
// //         const res = await sendInvitationAction({
// //           userId: participantId,
// //           eventId: selectedEventId,
// //         });

// //         if (!res.ok) throw new Error(res.message);

// //         toast.success("Invitation sent successfully!");

// //         // Optimistic UI update
// //         const participant = participants.find((p) => p.id === participantId);
// //         if (participant) {
// //           participant.events.push({
// //             eventId: selectedEventId,
// //             title: privateEvents.find((e) => e.id === selectedEventId)?.title || "",
// //             invited: true,
// //             participationStatus: null,
// //             invitationStatus: "PENDING",
// //           });
// //         }
// //       } catch (err: any) {
// //         toast.error(err?.message || "Failed to send invitation");
// //       } finally {
// //         setOpenDialogId(null);
// //         setSelectedEventId("");
// //       }
// //     });
// //   };

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //       {participants.length === 0 && <p className="col-span-full text-center text-muted-foreground">No participants found.</p>}

// //       {participants.map((p) => (
// //         <div key={p.id} className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition-shadow flex flex-col justify-between">
// //           <div className="flex flex-col gap-2">
// //             {/* Header: Avatar + Name */}
// //             <div className="flex items-center gap-4 mb-4">
// //               <AppImage src={p.image} alt={p.name} width={50} height={50} className="h-12 w-12 rounded-full border object-cover" />
// //               <div>
// //                 <h3 className="font-semibold text-lg">{p.name}</h3>
// //                 <p className="text-sm text-muted-foreground flex items-center gap-1">
// //                   <Mail size={14} /> {p.email}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Events */}
// //             <div className="mb-4">
// //               <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-2">
// //                 <Calendar size={16} /> Events
// //               </h4>
// //               <div className="flex flex-wrap gap-2">
// //                 {p.events.map((e, index) => (
// //                   <span
// //                     key={`${e.eventId}-${index}`}
// //                     className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${e.invited ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
// //                       }`}
// //                     title={e.invited ? `Invitation Status: ${e.invitationStatus}` : `Participation Status: ${e.participationStatus}`}
// //                   >
// //                     {e.invited ? <Clock size={12} /> : <Check size={12} />} {e.title}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Actions */}
// //           <AlertDialog open={openDialogId === p.id} onOpenChange={(isOpen) => !isOpen && setOpenDialogId(null)}>
// //             <AlertDialogTrigger asChild>
// //               <div>
// //                 <Button
// //                   className="w-full flex items-center justify-center gap-2"
// //                   variant="outline"
// //                   disabled={privateEvents.length === 0}
// //                   onClick={() => setOpenDialogId(p.id)} // make sure click sets the dialog id
// //                 >
// //                   <UserPlus size={16} /> Send Invite
// //                 </Button>
// //               </div>
// //             </AlertDialogTrigger>

// //             <AlertDialogContent>
// //               <AlertDialogHeader>
// //                 <AlertDialogTitle>Send Invitation</AlertDialogTitle>
// //                 <AlertDialogDescription>
// //                   Select an event to send invitation to <span className="font-medium">{p.name}</span>
// //                 </AlertDialogDescription>
// //               </AlertDialogHeader>

// //               <div className="mt-4">
// //                 <Select value={selectedEventId} onValueChange={(val) => setSelectedEventId(val)}>
// //                   <SelectTrigger className="w-full">
// //                     <SelectValue placeholder="Select event" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {privateEvents.length > 0 ? (
// //                       privateEvents.map((event) => {
// //                         const isDisabled = p.events.some(
// //                           (e) => e.eventId === event.id && (e.invited || e.participationStatus === "APPROVED")
// //                         );
// //                         return (
// //                           <SelectItem key={event.id} value={event.id} disabled={isDisabled}>
// //                             {event.title}
// //                           </SelectItem>
// //                         );
// //                       })
// //                     ) : (
// //                       <SelectItem value="no-events" disabled>
// //                         No events found
// //                       </SelectItem>
// //                     )}
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               <AlertDialogFooter className="mt-4 flex justify-end gap-2">
// //                 <Button variant="outline" onClick={() => setOpenDialogId(null)}>
// //                   <X size={14} /> Cancel
// //                 </Button>
// //                 <Button onClick={() => handleSendInvite(p.id)} disabled={isPending || !selectedEventId}>
// //                   Send
// //                 </Button>
// //               </AlertDialogFooter>
// //             </AlertDialogContent>
// //           </AlertDialog>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }





























"use client";

import React, { useTransition, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Event, Participant } from "@/types/event.types";
import { sendInvitationAction } from "@/actions/invitation.action";
import { Check, Clock, X } from "lucide-react";
import { AppImage } from "../../appImage/AppImage";

export default function MyAllEventParticipants({
  participants,
  events,
}: {
  participants: Participant[];
  events: Event[];
}) {
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  // Only private events
  const privateEvents = events.filter((event) => event.visibility === "PRIVATE");

  const handleSendInvite = (participantId: string) => {
    if (!selectedEventId || selectedEventId === "no-events") {
      toast.error("Please select an event");
      return;
    }

    startTransition(async () => {
      try {
        const res = await sendInvitationAction({
          userId: participantId,
          eventId: selectedEventId,
        });

        if (!res.ok) throw new Error(res.message);

        toast.success("Invitation sent successfully!");

        // Optimistic UI update
        const participant = participants.find((p) => p.id === participantId);
        if (participant) {
          participant.events.push({
            eventId: selectedEventId,
            title: privateEvents.find((e) => e.id === selectedEventId)?.title || "",
            invited: true,
            participationStatus: null,
            invitationStatus: "PENDING",
          });
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to send invitation");
      } finally {
        setOpenDialogId(null);
        setSelectedEventId("");
      }
    });
  };

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
          {participants.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">
              No participants found.
            </p>
          )}

          {participants.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-4xl  border-2 border-gray-300 flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <AppImage
                    src={p.image ?? "/default-avatar.png"}
                    alt={p.name}
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
                  />

                  <div>
                    <h3 className="font-semibold text-base">{p.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {p.email}
                    </p>
                  </div>
                </div>

                {/* Events */}
                <div>
                  <h4 className="text-xs text-muted-foreground mb-2">
                    Events
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {p.events?.map((e, index) => (
                      <span
                        key={`${e.eventId}-${index}`}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${e.invited
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                          }`}
                        title={
                          e.invited
                            ? `Invitation Status: ${e.invitationStatus}`
                            : `Participation Status: ${e.participationStatus}`
                        }
                      >
                        {e.invited ? (
                          <Clock className="w-3 h-3" />
                        ) : (
                          <Check className="w-3 h-3" />
                        )}
                        {e.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <AlertDialog
                open={openDialogId === p.id}
                onOpenChange={(isOpen) => !isOpen && setOpenDialogId(null)}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="violet"
                    className="w-full rounded-4xl"
                    disabled={privateEvents.length === 0}
                    onClick={() => setOpenDialogId(p.id)}
                  >
                    Send Invite
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Send Invitation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Select an event to send invitation to{" "}
                      <span className="font-medium">{p.name}</span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  {/* Select */}
                  <div className="mt-4">
                    <Select
                      value={selectedEventId}
                      onValueChange={(val) => setSelectedEventId(val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>

                      <SelectContent>
                        {privateEvents.length > 0 ? (
                          privateEvents.map((event) => {
                            const isDisabled = p.events.some(
                              (e) =>
                                e.eventId === event.id &&
                                (e.invited ||
                                  e.participationStatus === "APPROVED")
                            );

                            return (
                              <SelectItem
                                key={event.id}
                                value={event.id}
                                disabled={isDisabled}
                              >
                                {event.title}
                              </SelectItem>
                            );
                          })
                        ) : (
                          <SelectItem value="no-events" disabled>
                            No events found
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <AlertDialogFooter className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialogId(null)}
                    >
                      <X size={14} /> Cancel
                    </Button>

                    <Button
                      variant="violet"
                      onClick={() => handleSendInvite(p.id)}
                      disabled={isPending || !selectedEventId}
                    >
                      Send
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === "table" && (
        <Card>
          <CardHeader>
            <CardTitle>All Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Events Joined / Invited</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {participants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No participants found.
                    </TableCell>
                  </TableRow>
                )}

                {participants.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <AppImage
                          src={p.image ?? "/default-avatar.png"}
                          alt={p.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full border object-cover"
                        />
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </TableCell>

                    <TableCell>{p.email}</TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {p.events?.map((e, index) => (
                          <span
                            key={`${e.eventId}-${index}`}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${e.invited
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                              }`}
                            title={
                              e.invited
                                ? `Invitation Status: ${e.invitationStatus}`
                                : `Participation Status: ${e.participationStatus}`
                            }
                          >
                            {e.invited ? <Clock size={12} /> : <Check size={12} />}{" "}
                            {e.title}
                          </span>
                        ))}
                      </div>
                    </TableCell>

                    <TableCell>
                      <AlertDialog
                        open={openDialogId === p.id}
                        onOpenChange={(isOpen) => !isOpen && setOpenDialogId(null)}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="violet"
                            disabled={privateEvents.length === 0}
                            onClick={() => setOpenDialogId(p.id)}
                          >
                            Send Invite
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Send Invitation</AlertDialogTitle>
                            <AlertDialogDescription>
                              Select an event to send invitation to{" "}
                              <span className="font-medium">{p.name}</span>
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          {/* Select Event */}
                          <div className="mt-4">
                            <Select
                              value={selectedEventId}
                              onValueChange={(val) => setSelectedEventId(val)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select event" />
                              </SelectTrigger>
                              <SelectContent>
                                {privateEvents.length > 0 ? (
                                  privateEvents.map((event) => {
                                    const isDisabled = p.events.some(
                                      (e) =>
                                        e.eventId === event.id &&
                                        (e.invited ||
                                          e.participationStatus === "APPROVED")
                                    );
                                    return (
                                      <SelectItem
                                        key={event.id}
                                        value={event.id}
                                        disabled={isDisabled}
                                      >
                                        {event.title}
                                      </SelectItem>
                                    );
                                  })
                                ) : (
                                  <SelectItem value="no-events" disabled>
                                    No events found
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </div>

                          <AlertDialogFooter className="mt-4 flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setOpenDialogId(null)}
                            >
                              <X size={14} /> Cancel
                            </Button>
                            <Button
                              variant="violet"
                              onClick={() => handleSendInvite(p.id)}
                              disabled={isPending || !selectedEventId}
                            >
                              Send
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}