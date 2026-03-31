"use client";

import React, { useTransition } from "react";
import {
     Table, TableHeader, TableRow, TableHead,
     TableBody, TableCell,
} from "@/components/ui/table";

import {
     Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
     AlertDialog, AlertDialogTrigger, AlertDialogContent,
     AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
     AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { deleteBannerAction, updateBannerStatusAction } from "@/actions/banner.action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppImage } from "@/components/appImage/AppImage";
import { format } from "date-fns";

export default function AllBanners({ banners }: any) {
     // console.log(banners);
     const router = useRouter();

     const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);
     const [isPending, startTransition] = useTransition();

     const handleDelete = (id: string) => {
          startTransition(async () => {
               try {
                    const res = await deleteBannerAction(id);

                    if (!res?.ok) {
                         throw new Error(res.message);
                    }

                    toast.success(res.message);
               } catch (err: any) {
                    toast.error(err.message || "Failed to delete banner");
               }

               setOpenDialogId(null);
          });
     };

     return (
          <Card>

               {/* HEADER */}

               <CardHeader className="flex justify-between items-center">
                    <CardTitle>All Banners</CardTitle>

                    <Button
                         onClick={() =>
                              router.push("/admin-dashboard/banner/create")
                         }
                    >
                         <Plus className="w-4 h-4 mr-2" />
                         Add Banner
                    </Button>
               </CardHeader>

               {/* TABLE */}

               <CardContent>
                    <Table>

                         <TableHeader>
                              <TableRow>
                                   <TableHead>Image</TableHead>
                                   <TableHead>Title</TableHead>
                                   <TableHead>Position</TableHead>
                                   <TableHead>Order</TableHead>
                                   <TableHead>Status</TableHead>
                                   <TableHead>Date</TableHead>
                                   <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                         </TableHeader>

                         <TableBody>
                              {banners?.length > 0 ? (
                                   banners.map((banner: any) => (
                                        <TableRow key={banner.id}>

                                             {/* IMAGE */}
                                             <TableCell>
                                                  <AppImage
                                                       src={banner.image}
                                                       alt={banner.altText || banner.title}
                                                       className="w-20 h-12 object-cover rounded border"
                                                       loading="eager"
                                                  />
                                             </TableCell>

                                             {/* TITLE */}
                                             <TableCell>{banner.title}</TableCell>

                                             {/* POSITION */}
                                             <TableCell>{banner.position}</TableCell>

                                             {/* ORDER */}
                                             <TableCell>{banner.positionOrder}</TableCell>

                                             {/* STATUS */}
                                             <TableCell>
                                                  <Select
                                                       value={banner.isActive ? "true" : "false"}
                                                       onValueChange={(value) => {
                                                            const isActive = value === "true";

                                                            startTransition(async () => {
                                                                 try {
                                                                      // console.log(isActive);
                                                                      const res = await updateBannerStatusAction(
                                                                           banner.id,
                                                                           isActive
                                                                      );

                                                                      if (!res?.ok) {
                                                                           throw new Error(res.message);
                                                                      }

                                                                      toast.success(res.message);
                                                                 } catch (err: any) {
                                                                      toast.error(err.message || "Update failed");
                                                                 }
                                                            });
                                                       }}
                                                  >
                                                       <SelectTrigger className="w-[130px]">
                                                            <SelectValue placeholder="Select status" />
                                                       </SelectTrigger>

                                                       <SelectContent>
                                                            <SelectItem value="true">Active</SelectItem>
                                                            <SelectItem value="false">Inactive</SelectItem>
                                                       </SelectContent>
                                                  </Select>
                                             </TableCell>

                                             <TableCell>{format(new Date(banner.dateTime), "PPP 'at' p")}</TableCell>

                                             {/* ACTIONS */}

                                             <TableCell className="text-right space-x-2">
                                                  {/* EDIT */}
                                                  <Button
                                                       size="icon"
                                                       variant="outline"
                                                       onClick={() =>
                                                            router.push(
                                                                 `/admin-dashboard/banner/update/${banner.id}`
                                                            )
                                                       }
                                                  >
                                                       <Pencil className="w-4 h-4" />
                                                  </Button>

                                                  {/* DELETE */}

                                                  <AlertDialog
                                                       open={openDialogId === banner.id}
                                                       onOpenChange={(isOpen) =>
                                                            !isOpen && setOpenDialogId(null)
                                                       }
                                                  >
                                                       <AlertDialogTrigger asChild>
                                                            <Button
                                                                 size="icon"
                                                                 variant="destructive"
                                                                 onClick={() =>
                                                                      setOpenDialogId(banner.id)
                                                                 }
                                                            >
                                                                 <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                       </AlertDialogTrigger>

                                                       <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                 <AlertDialogTitle>
                                                                      Delete Banner?
                                                                 </AlertDialogTitle>
                                                                 <AlertDialogDescription>
                                                                      Are you sure you want to delete "
                                                                      {banner.title}"?
                                                                 </AlertDialogDescription>
                                                            </AlertDialogHeader>

                                                            <AlertDialogFooter>
                                                                 <Button
                                                                      variant="outline"
                                                                      onClick={() =>
                                                                           setOpenDialogId(null)
                                                                      }
                                                                 >
                                                                      Cancel
                                                                 </Button>

                                                                 <Button
                                                                      variant="destructive"
                                                                      onClick={() =>
                                                                           handleDelete(banner.id)
                                                                      }
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
                                        <TableCell
                                             colSpan={6}
                                             className="text-center py-4"
                                        >
                                             No banners found.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>

                    </Table>
               </CardContent>
          </Card>
     );
}