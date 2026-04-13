"use client";

import React, { useTransition } from "react";
import {
     Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
     AlertDialog, AlertDialogTrigger, AlertDialogContent,
     AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { deleteCategoryAction } from "@/actions/category.action";
import { AppImage } from "@/components/appImage/AppImage";

export default function AllCategories({ categories }: any) {
     // console.log(categories);
     const router = useRouter();
     const [openDialogId, setOpenDialogId] = React.useState<string | null>(null);
     const [isPending, startTransition] = useTransition();

     const handleDelete = (id: string) => {
          startTransition(async () => {
               try {
                    const res = await deleteCategoryAction(id);
                    // console.log(res.ok);
                    if (!res.ok) {
                         throw new Error(res.message);
                    }
                    toast(res.message);
               } catch (err: any) {
                    toast.error(err.message || "Failed to delete category");
               }
               setOpenDialogId(null);
          });
     };

     return (
          <Card>
               <CardHeader className="flex justify-between items-center">
                    <CardTitle>All Categories</CardTitle>
                    <Button onClick={() => router.push("/admin-dashboard/category/create")}>
                         <Plus className="w-4 h-4 mr-2" />
                         Add Category
                    </Button>
               </CardHeader>

               <CardContent>
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   <TableHead>Image</TableHead>
                                   <TableHead>Name</TableHead>
                                   <TableHead>Description</TableHead>
                                   <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                         </TableHeader>

                         <TableBody>
                              {
                                   categories.length > 0 ?
                                        (categories?.map((cat: any) => (
                                             <TableRow key={cat.id}>
                                                  <TableCell>
                                                       <AppImage
                                                            src={cat.image}
                                                            width={50}
                                                            height={50}
                                                            className="h-12 w-12 object-cover rounded border"
                                                       />
                                                  </TableCell>
                                                  <TableCell>{cat.name}</TableCell>
                                                  <TableCell>{cat.description || "—"}</TableCell>
                                                  <TableCell className="text-right space-x-2">
                                                       <Button size="icon" variant="outline"
                                                            onClick={() => router.push(`/admin-dashboard/category/update/${cat.id}`)}>
                                                            <Pencil className="w-4 h-4" />
                                                       </Button>

                                                       <AlertDialog open={openDialogId === cat.id}
                                                            onOpenChange={(isOpen) => !isOpen && setOpenDialogId(null)}>
                                                            <AlertDialogTrigger asChild>
                                                                 <Button size="icon" variant="destructive"
                                                                      onClick={() => setOpenDialogId(cat.id)}>
                                                                      <Trash2 className="w-4 h-4" />
                                                                 </Button>
                                                            </AlertDialogTrigger>

                                                            <AlertDialogContent>
                                                                 <AlertDialogHeader>
                                                                      <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                                                                      <AlertDialogDescription>
                                                                           Are you sure you want to delete "{cat.name}"?
                                                                      </AlertDialogDescription>
                                                                 </AlertDialogHeader>

                                                                 <AlertDialogFooter>
                                                                      <Button variant="outline" onClick={() => setOpenDialogId(null)}>
                                                                           Cancel
                                                                      </Button>
                                                                      <Button variant="destructive"
                                                                           onClick={() => handleDelete(cat.id)}
                                                                           disabled={isPending}>
                                                                           Delete
                                                                      </Button>
                                                                 </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                       </AlertDialog>
                                                  </TableCell>
                                             </TableRow>
                                        ))) :
                                        <TableRow>
                                             <TableCell colSpan={3} className="text-center py-4">
                                                  No categories found.
                                             </TableCell>
                                        </TableRow>
                              }
                         </TableBody>
                    </Table>
               </CardContent>
          </Card>
     );
}