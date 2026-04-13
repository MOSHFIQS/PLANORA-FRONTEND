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

import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";

import { updateBannerAction } from "@/actions/banner.action";
import { AppImage } from "@/components/appImage/AppImage";
import { Field } from "@/components/ui/field";
import { useAuth } from "@/context/AuthProvider";

export default function UpdateBanner({ banner }: { banner: any }) {
     const [loading, setLoading] = useState(false);
     const router = useRouter();
     const { user } = useAuth();




     const [selectedImage, setSelectedImage] = useState<string>(
          banner?.image || ""
     );

     const form = useForm({
          defaultValues: {
               title: banner?.title ?? "",
               description: banner?.description ?? "",
               redirectUrl: banner?.redirectUrl ?? "",
               position: banner?.position ?? "MAIN",
               positionOrder: banner?.positionOrder ?? 1,
               type: banner?.type || "ONLINE",
               buttonText: banner?.buttonText ?? "",
               altText: banner?.altText ?? "",
               isActive: banner?.isActive ?? true,
          },

          onSubmit: async ({ value }) => {
               setLoading(true);
               try {
                    const bannerPayload = {
                         title: value.title,
                         description: value.description,
                         image: selectedImage,
                         redirectUrl: value.redirectUrl,
                         position: value.position,
                         type: value.type,
                         positionOrder: Number(value.positionOrder),
                         buttonText: value.buttonText,
                         altText: value.altText,
                         isActive: value.isActive,
                    };

                    // console.log(bannerPayload);

                    const res = await updateBannerAction(banner.id, bannerPayload);

                    if (!res?.ok) throw new Error(res?.message);

                    toast(res.message);
                    if (user?.role === "ADMIN") {
                         router.push("/admin-dashboard/banner");
                    } else if (user?.role === "SUPERADMIN") {
                         router.push("/super-admin-dashboard/banner");
                    }
                    form.reset();
               } catch (err: any) {
                    toast.error(err.message);
               } finally {
                    setLoading(false);
               }
          },
     });

     return (
          <div>
               <Card className="pt-0">
                    <CardHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white rounded-md">
                         <CardTitle className="text-xl font-semibold text-gray-800">
                              Update Banner
                         </CardTitle>
                         <CardDescription>
                              Update your homepage banner
                         </CardDescription>
                    </CardHeader>

                    <CardContent>
                         <form
                              onSubmit={(e) => {
                                   e.preventDefault();
                                   e.stopPropagation();
                                   form.handleSubmit();
                              }}
                              className="flex flex-col gap-6"
                         >

                              <div className="space-y-4">
                                   <Label>Banner Image</Label>

                                   

                                   {/* Event Images */}
                                   {banner?.event?.images?.length ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                                             {banner.event.images.map((img: string) => (
                                                  <div
                                                       key={img}
                                                       onClick={() => setSelectedImage(img)}
                                                       className={`cursor-pointer rounded p-1 border-2 transition ${selectedImage === img
                                                            ? "border-orange-500 scale-95 border-4"
                                                            : "border-gray-50 hover:border-orange-300 border-4"
                                                            }`}
                                                  >
                                                       <AppImage
                                                            src={img}
                                                            alt="event"
                                                            className="w-full h-24 object-cover rounded"
                                                       />
                                                  </div>
                                             ))}
                                        </div>
                                   ) : null}


                              </div>
                              {/* FORM FIELDS */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   {/* TITLE */}
                                   <form.Field name="title">
                                        {(field) => (
                                             <div className="space-y-2">
                                                  <Label>Title</Label>
                                                  <Input disabled value={field.state.value} />
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
                                                  <Input disabled value={field.state.value} />
                                             </div>
                                        )}
                                   </form.Field>

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

                                   {/* TYPE */}
                                   <form.Field name="type">
                                        {(field) => (
                                             <Field className="gap-2">
                                                  <Label>Type</Label>
                                                  <Select
                                                       disabled
                                                       value={field.state.value}
                                                       onValueChange={(val: any) =>
                                                            field.handleChange(val)
                                                       }
                                                  >
                                                       <SelectTrigger>
                                                            <SelectValue />
                                                       </SelectTrigger>
                                                       <SelectContent>
                                                            <SelectItem value="ONLINE">Online</SelectItem>
                                                            <SelectItem value="OFFLINE">Offline</SelectItem>
                                                       </SelectContent>
                                                  </Select>
                                             </Field>
                                        )}
                                   </form.Field>

                                   {/* ALT TEXT */}
                                   <form.Field name="altText">
                                        {(field) => (
                                             <div className="space-y-2 md:col-span-2">
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
                                   {selectedImage && (
                                        <div className="col-span-2">
                                             <Label className="text-sm font-medium text-gray-700">
                                                  Selected Image Preview
                                             </Label>

                                             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 pt-2">

                                                  <div className="p-1 border-4 border-orange-500 rounded">
                                                       <AppImage
                                                            src={selectedImage}
                                                            alt="banner"
                                                            className="w-full h-24 object-cover rounded"
                                                       />
                                                  </div>

                                             </div>
                                        </div>
                                   )}
                              </div>



                              {/* SUBMIT */}
                              <Button type="submit" disabled={loading}>
                                   {loading ? "Updating..." : "Update Banner"}
                              </Button>
                         </form>
                    </CardContent>
               </Card>
          </div>
     );
}