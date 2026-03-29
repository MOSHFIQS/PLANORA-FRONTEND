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
import ImageUploader from "@/components/imageUploader/ImageUploader";
import { useImageUpload } from "@/hooks/useImageUpload";
import { updateBannerAction, } from "@/actions/banner.action";
import { format } from "date-fns";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Popover } from '@/components/ui/popover';
import { PopoverContent } from '@/components/ui/popover';
import { Calendar } from "@/components/ui/calendar";
import { PopoverTrigger } from '@/components/ui/popover';


export default function UpdateBanner({ banner }: { banner: any }) {
     const [loading, setLoading] = useState(false);
     const bannerImages = useImageUpload({ max: 1, defaultImages: [banner.image] });
     console.log(bannerImages.images);
     const router = useRouter();


     const existingDate = banner?.dateTime ? new Date(banner.dateTime) : undefined;

     const [selectedDate, setSelectedDate] = useState<Date | undefined>(
          existingDate
     );

     const [selectedTime, setSelectedTime] = useState(
          existingDate
               ? format(existingDate, "HH:mm:ss")
               : "10:30:00"
     );

     const [datePickerOpen, setDatePickerOpen] = useState(false);

     const combineDateTime = (date?: Date, time?: string) => {
          if (!date || !time) return "";

          const [h, m, s] = time.split(":").map(Number);
          const d = new Date(date);
          d.setHours(h || 0, m || 0, s || 0);

          return d.toISOString();
     };


     const form = useForm({
          defaultValues: {
               title: banner?.title ?? "",
               description: banner?.description ?? "",
               redirectUrl: banner?.redirectUrl ?? "",
               position: banner?.position ?? "MAIN",
               positionOrder: banner?.positionOrder ?? 1,
               dateTime: banner?.dateTime
                    ? new Date(banner.dateTime).toISOString()
                    : "",
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
                         image: bannerImages.images[0]?.img,
                         redirectUrl: value.redirectUrl,
                         position: value.position,
                         type: value.type,
                         dateTime: new Date(value.dateTime),
                         positionOrder: Number(value.positionOrder),
                         buttonText: value.buttonText,
                         altText: value.altText,
                         isActive: value.isActive,
                    };

                    console.log(bannerPayload);
                    const res = await updateBannerAction(banner.id, bannerPayload);

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
                         <CardTitle className="text-xl font-semibold text-gray-800">Update Banner</CardTitle>
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


                                   <form.Field name="type">
                                        {(field) => (
                                             <Field>
                                                  <FieldLabel>Type</FieldLabel>
                                                  <Select
                                                       value={field.state.value}
                                                       onValueChange={(val: any) =>
                                                            field.handleChange(val)
                                                       }
                                                  >
                                                       <SelectTrigger>
                                                            <SelectValue />
                                                       </SelectTrigger>
                                                       <SelectContent>
                                                            <SelectItem value="ONLINE">
                                                                 Online
                                                            </SelectItem>
                                                            <SelectItem value="OFFLINE">
                                                                 Offline
                                                            </SelectItem>
                                                       </SelectContent>
                                                  </Select>
                                             </Field>
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
                              {/* DATE TIME */}
                              <form.Field name="dateTime">
                                   {(field) => (
                                        <FieldGroup className="flex-col">
                                             <div className="flex gap-4">
                                                  <Field>
                                                       <FieldLabel>Date</FieldLabel>
                                                       <Popover
                                                            open={datePickerOpen}
                                                            onOpenChange={
                                                                 setDatePickerOpen
                                                            }
                                                       >
                                                            <PopoverTrigger asChild>
                                                                 <Button variant="outline">
                                                                      {selectedDate
                                                                           ? format(
                                                                                selectedDate,
                                                                                "PPP"
                                                                           )
                                                                           : "Select"}
                                                                 </Button>
                                                            </PopoverTrigger>

                                                            <PopoverContent>
                                                                 <Calendar
                                                                      mode="single"
                                                                      selected={
                                                                           selectedDate
                                                                      }
                                                                      onSelect={(
                                                                           date
                                                                      ) => {
                                                                           setSelectedDate(
                                                                                date
                                                                           );
                                                                           const combined =
                                                                                combineDateTime(
                                                                                     date,
                                                                                     selectedTime
                                                                                );
                                                                           if (
                                                                                combined
                                                                           )
                                                                                field.handleChange(
                                                                                     combined
                                                                                );
                                                                      }}
                                                                 />
                                                            </PopoverContent>
                                                       </Popover>
                                                  </Field>

                                                  <Field>
                                                       <FieldLabel>Time</FieldLabel>
                                                       <Input
                                                            type="time"
                                                            step="1"
                                                            value={selectedTime}
                                                            onChange={(e) => {
                                                                 const time =
                                                                      e.target.value;
                                                                 setSelectedTime(
                                                                      time
                                                                 );

                                                                 const combined =
                                                                      combineDateTime(
                                                                           selectedDate,
                                                                           time
                                                                      );
                                                                 if (combined)
                                                                      field.handleChange(
                                                                           combined
                                                                      );
                                                            }}
                                                       />
                                                  </Field>
                                             </div>
                                        </FieldGroup>
                                   )}
                              </form.Field>

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
                                   {loading ? "Updating..." : "Update Banner"}
                              </Button>
                         </form>
                    </CardContent>
               </Card>
          </div>
     );
}