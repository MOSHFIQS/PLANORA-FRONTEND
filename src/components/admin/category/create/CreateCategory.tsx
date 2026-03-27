"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
     Card,
     CardContent,
     CardHeader,
     CardTitle,
     CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createCategoryAction } from "@/actions/category.action";
import { useImageUpload } from "@/hooks/useImageUpload";
import ImageUploader from "@/components/imageUploader/ImageUploader";

export default function CreateCategory() {
     const [loading, setLoading] = useState(false);
     const categoryImages = useImageUpload({ max: 1 });
     console.log(categoryImages);

     const router = useRouter();

     const form = useForm({
          defaultValues: {
               name: "",
               description: "",
          },

          onSubmit: async ({ value }) => {
               try {
                    // setLoading(true);
                    console.log(value);


                   
                    // const res = await createCategoryAction();

                    // if (!res.ok) {
                    //      throw new Error(res.message);
                    // }
                    // router.push("/admin-dashboard/category");
                    // toast.success(res.message);
                    // form.reset();
               } catch (err: any) {
                    console.log(err);
                    toast.error(err.message);
               } finally {
                    setLoading(false);
               }
          },
     });

     return (
          <div >
               <Card className="pt-0">
                    <CardHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white rounded-md">
                         <CardTitle className="text-xl font-semibold text-gray-800">Create Category</CardTitle>
                         <CardDescription>
                              Add a Category
                         </CardDescription>
                    </CardHeader>

                    <CardContent>
                         <form
                              onSubmit={(e) => {
                                   e.preventDefault();
                                   e.stopPropagation();
                                   form.handleSubmit();
                              }}
                              className="space-y-6"
                         >

                              {/* NAME */}
                              <form.Field name="name">
                                   {(field) => (
                                        <div className="space-y-2">
                                             <Label>Name</Label>
                                             <Input
                                                  value={field.state.value}
                                                  onChange={(e) => field.handleChange(e.target.value)}
                                             />
                                        </div>
                                   )}
                              </form.Field>

                              {/* DESCRIPTION */}
                              <form.Field name="description">
                                   {(field) => (
                                        <div className="space-y-2">
                                             <Label>Description</Label>
                                             <Input
                                                  value={field.state.value}
                                                  onChange={(e) => field.handleChange(e.target.value)}
                                             />
                                        </div>
                                   )}
                              </form.Field>

                              {/* IMAGE */}
                              <ImageUploader
                                   label="Event Images"
                                   images={categoryImages.images}
                                   onUpload={categoryImages.upload}
                                   onDelete={categoryImages.remove}
                                   multiple
                              />

                              <Button type="submit" className="w-full" disabled={loading}>
                                   {loading ? "Creating..." : "Create Category"}
                              </Button>

                         </form>
                    </CardContent>
               </Card>
          </div>
     );
}