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

import { useImageUpload } from "@/hooks/useImageUpload";
import { createBannerAction } from "@/actions/banner.action";
import { Field } from "@/components/ui/field";

import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";

import { Event } from "@/types/event.types";
import { AppImage } from "@/components/appImage/AppImage";

export default function CreateBanner({
     featuredEvents,
}: {
     featuredEvents: Event[];
}) {
     const [loading, setLoading] = useState(false);
     const router = useRouter();

     const bannerImages = useImageUpload({ max: 1 });

     const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
     const [selectedImage, setSelectedImage] = useState<string>("");

     const [selectedDate, setSelectedDate] = useState<Date | undefined>();
     const [selectedTime, setSelectedTime] = useState("10:30:00");

     const BASE_URL = "https://assignment-5-frontend-nu.vercel.app";

     const form = useForm({
          defaultValues: {
               title: "",
               position: "MAIN",
               description: "", // ✅ manual input
               redirectUrl: "",
               positionOrder: 1,
               buttonText: "",
               altText: "",
               dateTime: "",
               type: "ONLINE",
               isActive: true,
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
                         positionOrder: Number(value.positionOrder),
                         buttonText: value.buttonText,
                         dateTime: new Date(value.dateTime).toISOString(),
                         type: value.type,
                         altText: value.altText,
                         isActive: value.isActive,
                         eventId: selectedEvent?.id,
                    };

                    console.log(bannerPayload);

                    const res = await createBannerAction(bannerPayload);
                    console.log(res);

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
          <div>
               <Card className="pt-0">
                    <CardHeader className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white rounded-md">
                         <CardTitle className="text-xl font-semibold text-gray-800">
                              Create Banner
                         </CardTitle>
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
                              {/* EVENT SELECT */}
                              <div className="space-y-2">
                                   <Label>Select Event</Label>
                                   <Select
                                        onValueChange={(eventId) => {
                                             const event = featuredEvents.find((e) => e.id === eventId);
                                             if (!event) return;

                                             setSelectedEvent(event);

                                             form.setFieldValue("title", event.title);
                                             form.setFieldValue("type", event.type);

                                             // ✅ AUTO redirect only
                                             const redirect = `${BASE_URL}/events/${event.id}`;
                                             form.setFieldValue("redirectUrl", redirect);

                                             // ❌ NO auto description now

                                             form.setFieldValue(
                                                  "dateTime",
                                                  new Date(event.dateTime).toISOString()
                                             );

                                             setSelectedDate(new Date(event.dateTime));
                                             setSelectedTime("10:30:00");

                                             setSelectedImage(event.images?.[0] || "");
                                        }}
                                   >
                                        <SelectTrigger>
                                             <SelectValue placeholder="Select an event" />
                                        </SelectTrigger>
                                        <SelectContent>
                                             {featuredEvents.map((event) => (
                                                  <SelectItem key={event.id} value={event.id}>
                                                       {event.title}
                                                  </SelectItem>
                                             ))}
                                        </SelectContent>
                                   </Select>
                              </div>

                              {/* EVENT IMAGES */}
                              {selectedEvent?.images?.length ? (
                                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                                        <Label className="col-span-full">Select Image</Label>
                                        {selectedEvent.images.map((img) => (
                                             <div
                                                  key={img}
                                                  onClick={() => setSelectedImage(img)}
                                                  className={`cursor-pointer border h-full rounded-md p-1 ${selectedImage === img
                                                            ? "border-orange-400 border-4"
                                                            : "border-gray-50 border-4"
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

                              {/* FORM FIELDS */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <form.Field name="title">
                                        {(field) => (
                                             <div className="space-y-2">
                                                  <Label>Title</Label>
                                                  <Input value={field.state.value} disabled />
                                             </div>
                                        )}
                                   </form.Field>

                                   <form.Field name="redirectUrl">
                                        {(field) => (
                                             <div className="space-y-2">
                                                  <Label>Redirect URL</Label>
                                                  <Input
                                                       value={field.state.value} disabled
                                                       onChange={(e) =>
                                                            field.handleChange(e.target.value)
                                                       }
                                                  />
                                             </div>
                                        )}
                                   </form.Field>

                                   {/* ✅ MANUAL DESCRIPTION */}
                                   <form.Field name="description">
                                        {(field) => (
                                             <div className="space-y-2 col-span-2">
                                                  <Label>Description</Label>
                                                  <Input
                                                       value={field.state.value}
                                                       onChange={(e) =>
                                                            field.handleChange(e.target.value)
                                                       }
                                                       placeholder="Write banner description manually..."
                                                  />
                                             </div>
                                        )}
                                   </form.Field>

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
                                             <Field className="gap-2">
                                                  <Label>Event Type</Label>
                                                  <Select
                                                       value={field.state.value}
                                                       disabled
                                                       onValueChange={(val: "ONLINE" | "OFFLINE") =>
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

                                   <form.Field name="altText">
                                        {(field) => (
                                             <div className="space-y-2 ">
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

                              {/* SUBMIT */}
                              <Button type="submit" disabled={loading}>
                                   {loading ? "Creating..." : "Create Banner"}
                              </Button>
                         </form>
                    </CardContent>
               </Card>
          </div>
     );
}