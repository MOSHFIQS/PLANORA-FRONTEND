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
// import { deleteEventByAdminAction } from "@/actions/event.action";
// import { Event } from "@/types/event.types";
// import Link from "next/link";

// // import your actions later
// // import { deleteEventByAdminAction } from "@/actions/event.action";



// export default function AllEventsList({ myEvents }: { myEvents: Event[] }) {
//   const router = useRouter();
//   const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);
//   const [isPending, startTransition] = useTransition();

//   const handleDelete = (id: string) => {
//     startTransition(async () => {
//       try {
//         const res = await deleteEventByAdminAction(id);

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
import { Pencil, Trash2, Eye, Plus, MessageSquareText, Map } from "lucide-react";
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

import { deleteEventByAdminAction, updateFeaturedStatusAction } from "@/actions/event.action";
import { Event } from "@/types/event.types";
import { AppImage } from "@/components/appImage/AppImage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function AllEventsList({ myEvents }: { myEvents: Event[] }) {
     const router = useRouter();
     const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);
     const [isPending, startTransition] = useTransition();
     const [loading, setLoading] = useState<string | null>(null);

     const [viewMode, setViewMode] = useState<"card" | "table">("table");

     const handleDelete = (id: string) => {
          startTransition(async () => {
               try {
                    const res = await deleteEventByAdminAction(id);

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


                         </div>
                    </CardHeader>
               </Card>

               {/* ================= CARD VIEW ================= */}
               {viewMode === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {myEvents?.map((event) => (
                              <Card key={event.id} className="p-3 rounded-4xl border  flex flex-col gap-3  ">
                                   {/* IMAGE + OVERLAY + BADGES */}
                                   <div className="relative h-52 xl:h-64 w-full overflow-hidden rounded-2xl group">
                                        {event?.images?.[0] ? (
                                             <AppImage
                                                  src={event.images[0]}
                                                  alt={event.title}
                                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                             />
                                        ) : (
                                             <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                                                  No Image
                                             </div>
                                        )}

                                        {/* Black Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent pointer-events-none" />

                                        {/* Top Left Badge */}
                                        {event.type && (
                                             <span className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 text-xs rounded-full font-medium">
                                                  {event.type}
                                             </span>
                                        )}

                                        {/* Top Right Status */}
                                        <span className="absolute top-3 right-3 bg-white/80 backdrop-blur px-3 py-1 text-xs rounded-full flex items-center gap-1">
                                             <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                             Active
                                        </span>
                                   </div>

                                   {/* CONTENT */}
                                   <CardContent className="pl-2 space-y-2 flex flex-col justify-between">
                                        {/* Date */}
                                        {event.dateTime && (
                                             <p className="text-sm text-muted-foreground">
                                                  {new Date(event.dateTime).toLocaleString()}
                                             </p>
                                        )}

                                        {/* Title */}
                                        <h3 className="font-semibold text-base line-clamp-1">{event.title}</h3>

                                        {/* Location */}
                                        {event.venue && (
                                             <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                  <Map className="w-4 h-4" />
                                                  {event.venue}
                                             </p>
                                        )}

                                        {/* Type + Fee */}
                                        <div className="flex justify-between items-center mt-1">
                                             {event.type && (
                                                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                                                       {event.type}
                                                  </span>
                                             )}
                                             <span className="text-lg font-bold text-purple-500">
                                                  {event.fee === 0 ? "Free" : `${event.fee} tk`}
                                             </span>
                                        </div>

                                        {/* View Event Button */}

                                   </CardContent>

                                   {/* ADMIN FOOTER */}
                                   <CardFooter className="flex gap-3 px-0">
                                        {/* VIEW BUTTON */}
                                        <Button
                                             className="flex-1 rounded-4xl"
                                             variant="violet"
                                             onClick={() => router.push(`/admin-dashboard/events/${event.id}`)}
                                        >
                                             View Event Info
                                        </Button>

                                        {/* DELETE BUTTON */}
                                        <AlertDialog
                                             open={openDialogId === event.id}
                                             onOpenChange={(isOpen) => !isOpen && setOpenDialogId(null)}
                                        >
                                             <AlertDialogTrigger asChild>
                                                  <Button
                                                       className="flex-1 rounded-4xl"
                                                       variant="destructive"
                                                       onClick={() => setOpenDialogId(event.id)}
                                                  >
                                                       Delete Event
                                                  </Button>
                                             </AlertDialogTrigger>

                                             <AlertDialogContent>
                                                  <AlertDialogHeader>
                                                       <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                                                       <AlertDialogDescription>
                                                            Are you sure you want to delete "{event.title}"?
                                                       </AlertDialogDescription>
                                                  </AlertDialogHeader>

                                                  <AlertDialogFooter className="flex justify-end gap-2">
                                                       <Button variant="outline" onClick={() => setOpenDialogId(null)}>
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
                                             <TableHead>Featured</TableHead>
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
                                                       <TableCell>
                                                            <Switch
                                                                 checked={event.isFeatured}
                                                                 disabled={loading === event.id}
                                                                 onCheckedChange={async (checked) => {
                                                                      setLoading(event.id);

                                                                      const res = await updateFeaturedStatusAction(event.id, checked);

                                                                      if (!res?.ok) {
                                                                           toast.error(res?.message || "Failed to update");
                                                                      } else {
                                                                           toast.success("Featured updated");
                                                                      }

                                                                      setLoading(null);
                                                                 }}
                                                            />
                                                       </TableCell>
                                                       <TableCell>{event.visibility}</TableCell>
                                                       <TableCell>{event.fee} tk</TableCell>

                                                       <TableCell className="text-right space-x-2">
                                                            <Button
                                                                 size="icon"
                                                                 variant="outline"
                                                                 onClick={() =>
                                                                      router.push(`/admin-dashboard/events/${event.id}`)
                                                                 }
                                                            >
                                                                 <Eye className="w-4 h-4" />
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