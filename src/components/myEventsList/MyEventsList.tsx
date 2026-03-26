"use client";

import React, { useTransition } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
import Link from "next/link";

// import your actions later
// import { deleteEventAction } from "@/actions/event.action";



export default function MyEventsList({ myEvents }: { myEvents: Event[] }) {
  const router = useRouter();
  const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>My Events</CardTitle>

        <Button onClick={() => router.push("/dashboard/event/create")}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </CardHeader>

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
                <TableRow key={event?.id}>
                  {/* IMAGE */}
                  <TableCell>
                    {event?.images?.[0] ? (
                      <AppImage src={event.images[0]} width={50} height={50} className="h-12 w-12 object-cover rounded border" />
                    ) : (
                      <div className="h-12 w-12 border rounded flex items-center justify-center" >
                        N/A
                      </div>
                    )}
                  </TableCell>

                  {/* TITLE */}
                  <TableCell>{event?.title}</TableCell>

                  {/* DATE */}
                  <TableCell>
                    {new Date(event?.dateTime).toLocaleString()}
                  </TableCell>

                  {/* TYPE */}
                  <TableCell>{event?.type}</TableCell>

                  {/* VISIBILITY */}
                  <TableCell>{event?.visibility}</TableCell>

                  {/* FEE */}
                  <TableCell>{event?.fee} tk</TableCell>

                  {/* ACTIONS */}
                  <TableCell className="text-right space-x-2">
                    {/* VIEW */}
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/event/${event?.id}`)
                      }
                    >
                      <Eye className="w-4 h-4" />
                    </Button>

                    {/* EDIT */}
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/event/update/${event?.id}`)
                      }
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    {/* reviews */}
                    <Button asChild>
                      <Link href={`/dashboard/review/event/${event.id}`}></Link>
                    </Button>

                    {/* DELETE */}
                    <AlertDialog
                      open={openDialogId === event?.id}
                      onOpenChange={(isOpen) =>
                        !isOpen && setOpenDialogId(null)
                      }
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => setOpenDialogId(event?.id)}
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
                            {event?.title}"?
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
                            onClick={() => handleDelete(event?.id)}
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
  );
}