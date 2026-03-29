// "use client";

// import React, { useTransition } from "react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Pencil, Trash2, Eye, Plus, MessageSquareText } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
// } from "@/components/ui/alert-dialog";
// import { AppImage } from "../appImage/AppImage";
// import { deleteEventAction } from "@/actions/event.action";
// import { Event } from "@/types/event.types";
// import Link from "next/link";

// // import your actions later
// // import { deleteEventAction } from "@/actions/event.action";



// export default function MyEventsList({ myEvents }: { myEvents: Event[] }) {
//   const router = useRouter();
//   const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);
//   const [isPending, startTransition] = useTransition();

//   const handleDelete = (id: string) => {
//     startTransition(async () => {
//       try {
//         const res = await deleteEventAction(id);

//         if (!res?.ok) throw new Error(res?.message);

//         toast.success("Event deleted successfully");
//       } catch (err: any) {
//         toast.error(err?.message || "Failed to delete event");
//       }

//       setOpenDialogId(null);
//     });
//   };

//   return (
//     <Card>
//       <CardHeader className="flex justify-between items-center">
//         <CardTitle>My Events</CardTitle>

//         <Button onClick={() => router.push("/dashboard/event/create")}>
//           <Plus className="w-4 h-4 mr-2" />
//           Create Event
//         </Button>
//       </CardHeader>

//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Image</TableHead>
//               <TableHead>Title</TableHead>
//               <TableHead>Date & Time</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Visibility</TableHead>
//               <TableHead>Fee</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {myEvents?.length > 0 ? (
//               myEvents.map((event) => (
//                 <TableRow key={event?.id}>
//                   {/* IMAGE */}
//                   <TableCell>
//                     {event?.images?.[0] ? (
//                       <AppImage src={event.images[0]} width={50} height={50} className="h-12 w-12 object-cover rounded border" />
//                     ) : (
//                       <div className="h-12 w-12 border rounded flex items-center justify-center" >
//                         N/A
//                       </div>
//                     )}
//                   </TableCell>

//                   {/* TITLE */}
//                   <TableCell>{event?.title}</TableCell>

//                   {/* DATE */}
//                   <TableCell>
//                     {new Date(event?.dateTime).toLocaleString()}
//                   </TableCell>

//                   {/* TYPE */}
//                   <TableCell>{event?.type}</TableCell>

//                   {/* VISIBILITY */}
//                   <TableCell>{event?.visibility}</TableCell>

//                   {/* FEE */}
//                   <TableCell>{event?.fee} tk</TableCell>

//                   {/* ACTIONS */}
//                   <TableCell className="text-right space-x-2">
//                     {/* VIEW */}
//                     <Button
//                       size="icon"
//                       variant="outline"
//                       onClick={() =>
//                         router.push(`/dashboard/event/${event?.id}`)
//                       }
//                     >
//                       <Eye className="w-4 h-4" />
//                     </Button>

//                     {/* EDIT */}
//                     <Button
//                       size="icon"
//                       variant="outline"
//                       onClick={() =>
//                         router.push(`/dashboard/event/update/${event?.id}`)
//                       }
//                     >
//                       <Pencil className="w-4 h-4" />
//                     </Button>
//                     {/* reviews */}
//                     <Button asChild>
//                       <Link href={`/dashboard/review/event/${event.id}`}>  <MessageSquareText size={30} /></Link>
//                     </Button>

//                     {/* DELETE */}
//                     <AlertDialog
//                       open={openDialogId === event?.id}
//                       onOpenChange={(isOpen) =>
//                         !isOpen && setOpenDialogId(null)
//                       }
//                     >
//                       <AlertDialogTrigger asChild>
//                         <Button
//                           size="icon"
//                           variant="destructive"
//                           onClick={() => setOpenDialogId(event?.id)}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </AlertDialogTrigger>

//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>
//                             Delete Event?
//                           </AlertDialogTitle>

//                           <AlertDialogDescription>
//                             Are you sure you want to delete "
//                             {event?.title}"?
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>

//                         <AlertDialogFooter>
//                           <Button
//                             variant="outline"
//                             onClick={() => setOpenDialogId(null)}
//                           >
//                             Cancel
//                           </Button>

//                           <Button
//                             variant="destructive"
//                             onClick={() => handleDelete(event?.id)}
//                             disabled={isPending}
//                           >
//                             Delete
//                           </Button>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center py-4">
//                   No events found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }



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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, Plus, MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { AppImage } from "../appImage/AppImage";
import { deleteEventAction } from "@/actions/event.action";
import { Event } from "@/types/event.types";

export default function MyEventsList({ myEvents }: { myEvents: Event[] }) {
  const router = useRouter();
  const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [viewMode, setViewMode] = useState<"card" | "table">("table");

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        const res = await deleteEventAction(id);

        if (!res?.ok) throw new Error(res?.message);

        toast.success("Event deleted successfully");
      } catch (err: any) {
        toast.error(err?.message || "Failed to delete event");
      }

      setOpenDialogId(null);
    });
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>My Events</CardTitle>

          <div className="flex gap-2">
            {/* TOGGLE */}
            <Button
              variant="outline"
              onClick={() =>
                setViewMode((prev) =>
                  prev === "table" ? "card" : "table"
                )
              }
            >
              {viewMode === "table"
                ? "Switch to Card View"
                : "Switch to Table View"}
            </Button>

            {/* CREATE */}
            <Button onClick={() => router.push("/dashboard/event/create")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* ================= CARD VIEW ================= */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents?.map((event) => (
            <Card key={event.id} className="flex flex-col overflow-hidden pt-0">
              {/* IMAGE */}
              <div className="h-52 w-full overflow-hidden border-b">
                {event?.images?.[0] ? (
                  <AppImage
                    src={event.images[0]}
                    className="h-full w-full object-cover hover:scale-105 duration-300"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <CardContent className="space-y-2 pt-4">
                <h3 className="font-semibold line-clamp-1">
                  {event.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {new Date(event.dateTime).toLocaleString()}
                </p>

                <div className="flex justify-between text-sm">
                  <span>{event.type}</span>
                  <span>{event.fee} tk</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  {event.visibility}
                </p>
              </CardContent>

              {/* FOOTER */}
              <CardFooter className="mt-auto flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    router.push(`/dashboard/event/${event.id}`)
                  }
                >
                  <Eye className="w-4 h-4" />
                </Button>

                <Button
                  size="icon"
                  className="flex-1"
                  onClick={() =>
                    router.push(`/dashboard/event/update/${event.id}`)
                  }
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button asChild className="flex-1" variant={"violet"}>
                  <Link href={`/dashboard/review/event/${event.id}`}>
                    <MessageSquareText size={18} />
                  </Link>
                </Button>

                {/* DELETE */}
                <AlertDialog
                  open={openDialogId === event.id}
                  onOpenChange={(isOpen) =>
                    !isOpen && setOpenDialogId(null)
                  }
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      className="flex-1"
                      variant="destructive"
                      onClick={() => setOpenDialogId(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete Event?
                      </AlertDialogTitle>

                      <AlertDialogDescription>
                        Are you sure you want to delete "
                        {event.title}"?
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setOpenDialogId(null)}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(event.id)}
                        disabled={isPending}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* ================= TABLE VIEW (UNCHANGED) ================= */}
      {viewMode === "table" && (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {myEvents?.length > 0 ? (
                  myEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        {event?.images?.[0] ? (
                          <AppImage
                            src={event.images[0]}
                            width={50}
                            height={50}
                            className="h-12 w-12 object-cover rounded border"
                          />
                        ) : (
                          <div className="h-12 w-12 border rounded flex items-center justify-center">
                            N/A
                          </div>
                        )}
                      </TableCell>

                      <TableCell>{event.title}</TableCell>
                      <TableCell>
                        {new Date(event.dateTime).toLocaleString()}
                      </TableCell>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>{event.visibility}</TableCell>
                      <TableCell>{event.fee} tk</TableCell>

                      <TableCell className="text-right space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            router.push(`/dashboard/event/${event.id}`)
                          }
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          size="icon"
                          onClick={() =>
                            router.push(`/dashboard/event/update/${event.id}`)
                          }
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>

                        <Button asChild variant={"violet"}>
                          <Link href={`/dashboard/review/event/${event.id}`}>
                            <MessageSquareText size={18} />
                          </Link>
                        </Button>

                        {/* DELETE same as before */}
                        <AlertDialog
                          open={openDialogId === event.id}
                          onOpenChange={(isOpen) =>
                            !isOpen && setOpenDialogId(null)
                          }
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => setOpenDialogId(event.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Event?
                              </AlertDialogTitle>

                              <AlertDialogDescription>
                                Are you sure you want to delete "
                                {event.title}"?
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setOpenDialogId(null)}
                              >
                                Cancel
                              </Button>

                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(event.id)}
                                disabled={isPending}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No events found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}