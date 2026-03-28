"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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


// import {
//      Select,
//      SelectContent,
//      SelectItem,
//      SelectTrigger,
//      SelectValue,
// } from "@/components/ui/select";
import ImageUploader from "@/components/imageUploader/ImageUploader";
import { useImageUpload } from "@/hooks/useImageUpload";
import { createBannerAction } from "@/actions/banner.action";


export default function CreateBanner() {
     const [loading, setLoading] = useState(false);
     const bannerImages = useImageUpload({ max: 1 });
     console.log(bannerImages.images);
     const router = useRouter();



     const form = useForm({
          defaultValues: {
               title: "",
               position: "MAIN",
               description: "",
               redirectUrl: "",
               positionOrder: 1,
               buttonText: "",
               altText: "",
               isActive: true,
          },

          onSubmit: async ({ value }) => {
               setLoading(true);
               try {

                    const bannerPayload = {
                         title: value.title,
                         description: value.description,
                         image: bannerImages.images[0]?.img,
                         redirectUrl: value.redirectUrl,
                         position: value.position,
                         positionOrder: Number(value.positionOrder),
                         buttonText: value.buttonText,
                         altText: value.altText,
                         isActive: value.isActive,
                    };

                    console.log(bannerPayload);
                    const res = await createBannerAction(bannerPayload);

                    if (!res?.ok) throw new Error(res?.message);

                    toast.success(res.message);

                    router.push("/admin-dashboard/banner");
                    form.reset();
               } catch (err: any) {
                    toast.error(err.message);
               } finally {
                    setLoading(false);
               }
          },
     });

     
     return (
          <div className="">
               <Card className="pt-0">
                    <CardHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white rounded-md">
                         <CardTitle className="text-xl font-semibold text-gray-800">Create Banner</CardTitle>
                         <CardDescription>
                              Add a Banner to Your HomePage
                         </CardDescription>
                    </CardHeader>

                    <CardContent>
                         <form
                              onSubmit={(e) => {
                                   e.preventDefault();
                                   e.stopPropagation();
                                   form.handleSubmit();
                              }}
                              className="flex gap-6 flex-col"
                         >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   {/* TITLE */}
                                   <form.Field name="title">
                                        {(field) => (
                                             <div className="space-y-2">
                                                  <Label>Title</Label>
                                                  <Input
                                                       value={field.state.value}
                                                       onChange={(e) =>
                                                            field.handleChange(e.target.value)
                                                       }
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
                                                       onChange={(e) =>
                                                            field.handleChange(e.target.value)
                                                       }
                                                  />
                                             </div>
                                        )}
                                   </form.Field>

                                   {/* REDIRECT URL */}
                                   <form.Field name="redirectUrl">
                                        {(field) => (
                                             <div className="space-y-2">
                                                  <Label>Redirect URL</Label>
                                                  <Input
                                                       type="url"
                                                       value={field.state.value}
                                                       onChange={(e) =>
                                                            field.handleChange(e.target.value)
                                                       }
                                                  />
                                             </div>
                                        )}
                                   </form.Field>

                                   {/* POSITION */}
                                   {/* <form.Field name="position">
                                        {(field) => (
                                             <div className="space-y-2 w-full">
                                                  <Label>Position</Label>

                                                  <Select
                                                       value={field.state.value}
                                                       onValueChange={(value) =>
                                                            field.handleChange(value)
                                                       }
                                                  >
                                                       <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select position" />
                                                       </SelectTrigger>

                                                       <SelectContent>
                                                            <SelectItem value="MAIN">MAIN</SelectItem>
                                                            <SelectItem value="SECONDARY">SECOND</SelectItem>
                                                            <SelectItem value="THIRD">THIRD</SelectItem>
                                                       </SelectContent>
                                                  </Select>
                                             </div>
                                        )}
                                   </form.Field> */}

                                   {/* POSITION ORDER */}
                                   <form.Field name="positionOrder">
                                        {(field) => (
                                             <div className="space-y-2">
                                                  <Label>Position Order</Label>
                                                  <Input
                                                       type="number"
                                                       value={field.state.value}
                                                       onChange={(e) =>
                                                            field.handleChange(Number(e.target.value))
                                                       }
                                                  />
                                             </div>
                                        )}
                                   </form.Field>

                                   {/* BUTTON TEXT */}
                                   <form.Field name="buttonText">
                                        {(field) => (
                                             <div className="space-y-2">
                                                  <Label>Button Text</Label>
                                                  <Input
                                                       value={field.state.value}
                                                       onChange={(e) =>
                                                            field.handleChange(e.target.value)
                                                       }
                                                  />
                                             </div>
                                        )}
                                   </form.Field>

                                   {/* ALT TEXT */}
                                   <form.Field name="altText">
                                        {(field) => (
                                             <div className="space-y-2 col-span-1 md:col-span-2">
                                                  <Label>Alt Text</Label>
                                                  <Input
                                                       value={field.state.value}
                                                       onChange={(e) =>
                                                            field.handleChange(e.target.value)
                                                       }
                                                  />
                                             </div>
                                        )}
                                   </form.Field>
                              </div>

                              {/* IMAGE UPLOAD — FULL WIDTH */}
                              <div className="space-y-3 ">

                                   <ImageUploader
                                        label="Banner Image"
                                        images={bannerImages.images}
                                        onUpload={bannerImages.upload}
                                        onDelete={bannerImages.remove}
                                        multiple={false}
                                   />
                              </div>

                              {/* SUBMIT BUTTON — FULL WIDTH */}
                              <Button
                                   type="submit"
                                   className="w-full md:col-span-2"
                                   disabled={loading}
                              >
                                   {loading ? "Creating..." : "Create Banner"}
                              </Button>
                         </form>
                    </CardContent>
               </Card>
          </div>
     );
}